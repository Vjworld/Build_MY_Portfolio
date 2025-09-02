import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { storage } from './storage';
import type { UserSignUp, UserSignIn } from '@shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export interface AuthResult {
  success: boolean;
  user?: any;
  token?: string;
  message?: string;
}

export class AuthService {
  // Hash password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Verify password
  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate JWT token
  private generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  // Verify JWT token
  public verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  // Generate reset password token
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  // Sign up new user
  async signUp(userData: UserSignUp): Promise<AuthResult> {
    try {
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        };
      }

      // Hash password
      const hashedPassword = await this.hashPassword(userData.password);

      // Create user
      const newUser = await storage.createLocalUser({
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isEmailVerified: false
      });

      // Generate token
      const token = this.generateToken(newUser.id);

      return {
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          isEmailVerified: newUser.isEmailVerified
        },
        token
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        success: false,
        message: 'Failed to create account'
      };
    }
  }

  // Sign in user
  async signIn(credentials: UserSignIn): Promise<AuthResult> {
    try {
      // Get user by email
      const user = await storage.getUserByEmail(credentials.email);
      if (!user || !user.password) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Verify password
      const isValidPassword = await this.verifyPassword(credentials.password, user.password);
      if (!isValidPassword) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Update last login
      await storage.updateUserLastLogin(user.id);

      // Generate token
      const token = this.generateToken(user.id);

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isEmailVerified: user.isEmailVerified,
          isAdmin: user.isAdmin
        },
        token
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: 'Failed to sign in'
      };
    }
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<AuthResult> {
    try {
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not for security
        return {
          success: true,
          message: 'If an account with this email exists, you will receive a password reset link'
        };
      }

      // Generate reset token
      const resetToken = this.generateResetToken();
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      // Save reset token
      await storage.savePasswordResetToken(user.id, resetToken, resetExpires);

      // Send email (integrate with SendGrid)
      try {
        const { sendEmail } = await import('./sendgrid');
        await sendEmail({
          to: email,
          from: 'noreply@ruvab.it.com',
          subject: 'Password Reset Request',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Password Reset Request</h2>
              <p>Hi ${user.firstName},</p>
              <p>You requested a password reset for your account. Click the link below to reset your password:</p>
              <p><a href="${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}" 
                     style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Reset Password
              </a></p>
              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          `,
          text: `
            Hi ${user.firstName},
            
            You requested a password reset for your account. Visit this link to reset your password:
            ${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}
            
            This link will expire in 1 hour.
            
            If you didn't request this, please ignore this email.
          `
        });
      } catch (emailError) {
        console.error('Error sending reset email:', emailError);
      }

      return {
        success: true,
        message: 'If an account with this email exists, you will receive a password reset link'
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        message: 'Failed to process password reset request'
      };
    }
  }

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<AuthResult> {
    try {
      // Get user by reset token
      const user = await storage.getUserByResetToken(token);
      if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
        return {
          success: false,
          message: 'Invalid or expired reset token'
        };
      }

      // Hash new password
      const hashedPassword = await this.hashPassword(newPassword);

      // Update password and clear reset token
      await storage.updateUserPassword(user.id, hashedPassword);

      return {
        success: true,
        message: 'Password updated successfully'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: 'Failed to reset password'
      };
    }
  }

  // Get user from token
  async getUserFromToken(token: string): Promise<any | null> {
    try {
      const decoded = this.verifyToken(token);
      if (!decoded) return null;

      const user = await storage.getUser(decoded.userId);
      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
        isAdmin: user.isAdmin
      };
    } catch (error) {
      console.error('Get user from token error:', error);
      return null;
    }
  }
}

export const authService = new AuthService();