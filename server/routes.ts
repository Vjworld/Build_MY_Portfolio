import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { authService } from "./auth";
import { 
  insertPortfolioSectionSchema,
  insertBlogPostSchema,
  insertCommentSchema,
  insertForumPostSchema,
  insertForumReplySchema,
  insertContestSchema,
  insertFaqSchema,
  insertContactMessageSchema,
  userSignUpSchema,
  userSignInSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Middleware for both auth types
  const authMiddleware = async (req: any, res: any, next: any) => {
    // Try Replit auth first
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    // Try JWT auth
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const user = await authService.getUserFromToken(token);
      if (user) {
        req.user = { claims: { sub: user.id }, localAuth: true, ...user };
        return next();
      }
    }

    return res.status(401).json({ message: "Unauthorized" });
  };

  // Local auth routes
  app.post('/api/auth/signup', async (req, res) => {
    try {
      const validatedData = userSignUpSchema.parse(req.body);
      const result = await authService.signUp(validatedData);
      
      if (result.success) {
        res.json({
          success: true,
          user: result.user,
          token: result.token
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create account"
      });
    }
  });

  app.post('/api/auth/signin', async (req, res) => {
    try {
      const validatedData = userSignInSchema.parse(req.body);
      const result = await authService.signIn(validatedData);
      
      if (result.success) {
        res.json({
          success: true,
          user: result.user,
          token: result.token
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error("Sign in error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to sign in"
      });
    }
  });

  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const validatedData = resetPasswordSchema.parse(req.body);
      const result = await authService.requestPasswordReset(validatedData.email);
      
      res.json({
        success: true,
        message: result.message
      });
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process password reset request"
      });
    }
  });

  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const validatedData = newPasswordSchema.parse(req.body);
      const result = await authService.resetPassword(validatedData.token, validatedData.password);
      
      if (result.success) {
        res.json({
          success: true,
          message: result.message
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to reset password"
      });
    }
  });

  // Auth routes (supporting both Replit and local auth)
  app.get('/api/auth/user', authMiddleware, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Portfolio routes
  app.get('/api/portfolio/sections', async (req, res) => {
    try {
      const sections = await storage.getPortfolioSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching portfolio sections:", error);
      res.status(500).json({ message: "Failed to fetch portfolio sections" });
    }
  });

  app.post('/api/portfolio/sections', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertPortfolioSectionSchema.parse(req.body);
      const section = await storage.createPortfolioSection(validatedData);
      res.json(section);
    } catch (error) {
      console.error("Error creating portfolio section:", error);
      res.status(500).json({ message: "Failed to create portfolio section" });
    }
  });

  app.put('/api/portfolio/sections/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const section = await storage.updatePortfolioSection(id, req.body);
      res.json(section);
    } catch (error) {
      console.error("Error updating portfolio section:", error);
      res.status(500).json({ message: "Failed to update portfolio section" });
    }
  });

  app.delete('/api/portfolio/sections/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deletePortfolioSection(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting portfolio section:", error);
      res.status(500).json({ message: "Failed to delete portfolio section" });
    }
  });

  app.patch('/api/portfolio/sections/:id/toggle-visibility', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const section = await storage.togglePortfolioSectionVisibility(id);
      res.json(section);
    } catch (error) {
      console.error("Error toggling portfolio section visibility:", error);
      res.status(500).json({ message: "Failed to toggle visibility" });
    }
  });

  // Blog routes
  app.get('/api/blog/posts', async (req, res) => {
    try {
      const { published } = req.query;
      const posts = await storage.getBlogPosts(published === 'true');
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Increment view count
      await storage.incrementBlogPostViews(id);
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get('/api/blog/posts/slug/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post by slug:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post('/api/blog/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put('/api/blog/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const post = await storage.updateBlogPost(id, req.body);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/blog/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  app.post('/api/blog/posts/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.likeBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error liking blog post:", error);
      res.status(500).json({ message: "Failed to like blog post" });
    }
  });

  // Comment routes
  app.get('/api/blog/posts/:postId/comments', async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await storage.getComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post('/api/blog/posts/:postId/comments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { postId } = req.params;
      
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        postId,
        authorId: userId,
      });
      
      const comment = await storage.createComment(validatedData);
      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  app.post('/api/comments/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.likeComment(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error liking comment:", error);
      res.status(500).json({ message: "Failed to like comment" });
    }
  });

  // Forum routes
  app.get('/api/forum/posts', async (req, res) => {
    try {
      const posts = await storage.getForumPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
      res.status(500).json({ message: "Failed to fetch forum posts" });
    }
  });

  app.get('/api/forum/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getForumPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Forum post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching forum post:", error);
      res.status(500).json({ message: "Failed to fetch forum post" });
    }
  });

  app.post('/api/forum/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const validatedData = insertForumPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      
      const post = await storage.createForumPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating forum post:", error);
      res.status(500).json({ message: "Failed to create forum post" });
    }
  });

  app.get('/api/forum/posts/:postId/replies', async (req, res) => {
    try {
      const { postId } = req.params;
      const replies = await storage.getForumReplies(postId);
      res.json(replies);
    } catch (error) {
      console.error("Error fetching forum replies:", error);
      res.status(500).json({ message: "Failed to fetch forum replies" });
    }
  });

  app.post('/api/forum/posts/:postId/replies', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { postId } = req.params;
      
      const validatedData = insertForumReplySchema.parse({
        ...req.body,
        postId,
        authorId: userId,
      });
      
      const reply = await storage.createForumReply(validatedData);
      res.json(reply);
    } catch (error) {
      console.error("Error creating forum reply:", error);
      res.status(500).json({ message: "Failed to create forum reply" });
    }
  });

  // Contest routes
  app.get('/api/contests', async (req, res) => {
    try {
      const contests = await storage.getContests();
      res.json(contests);
    } catch (error) {
      console.error("Error fetching contests:", error);
      res.status(500).json({ message: "Failed to fetch contests" });
    }
  });

  app.post('/api/contests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertContestSchema.parse(req.body);
      const contest = await storage.createContest(validatedData);
      res.json(contest);
    } catch (error) {
      console.error("Error creating contest:", error);
      res.status(500).json({ message: "Failed to create contest" });
    }
  });

  // FAQ routes
  app.get('/api/faqs', async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.post('/api/faqs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(validatedData);
      res.json(faq);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      res.status(500).json({ message: "Failed to create FAQ" });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification using SendGrid
      try {
        const { sendEmail, createContactFormNotificationEmail } = await import('./sendgrid');
        const emailTemplate = createContactFormNotificationEmail({
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject || null,
          message: validatedData.message,
          submittedAt: new Date().toLocaleString()
        });
        
        await sendEmail({
          to: 'support@ruvab.it.com',
          from: 'noreply@ruvab.it.com',
          subject: emailTemplate.subject,
          html: emailTemplate.html,
          text: emailTemplate.text
        });
      } catch (emailError) {
        console.error("Error sending notification email:", emailError);
        // Don't fail the contact form submission if email fails
      }
      
      res.json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  app.get('/api/contact/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Professional Data Routes
  
  // Employment Experience routes
  app.get('/api/employment-experience', async (req, res) => {
    try {
      const experience = await storage.getEmploymentExperience();
      res.json(experience);
    } catch (error) {
      console.error('Error fetching employment experience:', error);
      res.status(500).json({ error: 'Failed to fetch employment experience' });
    }
  });

  app.post('/api/employment-experience', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const experience = await storage.createEmploymentExperience(req.body);
      res.json(experience);
    } catch (error) {
      console.error('Error creating employment experience:', error);
      res.status(500).json({ error: 'Failed to create employment experience' });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = req.query.featured === 'true' 
        ? await storage.getFeaturedProjects()
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Certifications routes
  app.get('/api/certifications', async (req, res) => {
    try {
      const certifications = req.query.featured === 'true'
        ? await storage.getFeaturedCertifications()
        : await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      res.status(500).json({ error: 'Failed to fetch certifications' });
    }
  });

  // Skills routes
  app.get('/api/skills', async (req, res) => {
    try {
      const skills = req.query.featured === 'true'
        ? await storage.getFeaturedSkills()
        : req.query.byCategory === 'true'
        ? await storage.getSkillsByCategory()
        : await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  // Achievements routes
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = req.query.featured === 'true'
        ? await storage.getFeaturedAchievements()
        : await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  // Education routes
  app.get('/api/education', async (req, res) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      console.error('Error fetching education:', error);
      res.status(500).json({ error: 'Failed to fetch education' });
    }
  });

  // Social Links routes
  app.get('/api/social-links', async (req, res) => {
    try {
      const socialLinks = req.query.featured === 'true'
        ? await storage.getFeaturedSocialLinks()
        : req.query.byCategory === 'true'
        ? await storage.getSocialLinksByCategory()
        : await storage.getSocialLinks();
      res.json(socialLinks);
    } catch (error) {
      console.error('Error fetching social links:', error);
      res.status(500).json({ error: 'Failed to fetch social links' });
    }
  });

  app.post('/api/social-links', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const socialLink = await storage.createSocialLink(req.body);
      res.json(socialLink);
    } catch (error) {
      console.error('Error creating social link:', error);
      res.status(500).json({ error: 'Failed to create social link' });
    }
  });

  app.put('/api/social-links/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const socialLink = await storage.updateSocialLink(id, req.body);
      res.json(socialLink);
    } catch (error) {
      console.error('Error updating social link:', error);
      res.status(500).json({ error: 'Failed to update social link' });
    }
  });

  app.delete('/api/social-links/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deleteSocialLink(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting social link:', error);
      res.status(500).json({ error: 'Failed to delete social link' });
    }
  });

  // Weekly summary email endpoint
  app.post('/api/contact/weekly-summary', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await sendWeeklySummaryEmail();
      res.json({ success: true, message: "Weekly summary email sent successfully" });
    } catch (error) {
      console.error("Error sending weekly summary:", error);
      res.status(500).json({ message: "Failed to send weekly summary" });
    }
  });

  // Function to send weekly summary email
  async function sendWeeklySummaryEmail() {
    try {
      const { sendEmail, createWeeklySummaryEmail } = await import('./sendgrid');
      
      // Get contact submissions from the last 7 days
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const contactSubmissions = await storage.getContactMessagesInDateRange(weekAgo, new Date());
      
      const weekStartDate = weekAgo.toLocaleDateString();
      const weekEndDate = new Date().toLocaleDateString();
      
      const emailTemplate = createWeeklySummaryEmail(
        contactSubmissions,
        weekStartDate,
        weekEndDate
      );
      
      await sendEmail({
        to: 'support@ruvab.it.com',
        from: 'noreply@ruvab.it.com',
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      });
      
      console.log(`Weekly summary email sent successfully for period ${weekStartDate} to ${weekEndDate}`);
    } catch (error) {
      console.error("Error sending weekly summary email:", error);
      throw error;
    }
  }

  // Initialize weekly email schedule (runs every Monday at 9 AM)
  function initializeWeeklyEmailSchedule() {
    const scheduleWeeklyEmail = () => {
      const now = new Date();
      const nextMonday = new Date();
      nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
      nextMonday.setHours(9, 0, 0, 0); // 9 AM
      
      if (nextMonday <= now) {
        nextMonday.setDate(nextMonday.getDate() + 7);
      }
      
      const timeUntilNextMonday = nextMonday.getTime() - now.getTime();
      
      setTimeout(async () => {
        try {
          await sendWeeklySummaryEmail();
        } catch (error) {
          console.error("Scheduled weekly email failed:", error);
        }
        // Schedule next week
        scheduleWeeklyEmail();
      }, timeUntilNextMonday);
      
      console.log(`Next weekly summary email scheduled for: ${nextMonday.toLocaleString()}`);
    };
    
    scheduleWeeklyEmail();
  }

  // Start the weekly email schedule
  initializeWeeklyEmailSchedule();

  const httpServer = createServer(app);
  return httpServer;
}
