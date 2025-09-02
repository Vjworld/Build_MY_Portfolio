import React from 'react';
import { ExternalLink, Code, Zap } from 'lucide-react';

interface ReplitReferralButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export function ReplitReferralButton({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  showText = true 
}: ReplitReferralButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl focus:ring-orange-500",
    secondary: "bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50 focus:ring-orange-500",
    minimal: "text-orange-600 hover:text-orange-700 hover:bg-orange-50 focus:ring-orange-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return (
    <a
      href="https://replit.com/refer/vjvaibhu"
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      data-testid="replit-referral-button"
    >
      <div className="flex items-center gap-1">
        <Zap className={`${iconSizes[size]} text-yellow-400`} />
        <Code className={iconSizes[size]} />
      </div>
      {showText && (
        <>
          <span className="font-semibold">Built with Replit</span>
          <ExternalLink className={`${iconSizes[size]} opacity-70`} />
        </>
      )}
    </a>
  );
}

// Floating button for bottom-right corner
export function FloatingReplitButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="floating-replit-button">
      <ReplitReferralButton 
        variant="primary" 
        size="lg"
        className="shadow-2xl animate-pulse hover:animate-none"
      />
    </div>
  );
}

// Header version for navigation
export function HeaderReplitButton() {
  return (
    <ReplitReferralButton 
      variant="secondary" 
      size="sm"
      className="hidden md:inline-flex"
    />
  );
}

// Footer version 
export function FooterReplitButton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
      <div className="text-sm text-orange-800 font-medium text-center">
        ✨ Create your own portfolio like this
      </div>
      <ReplitReferralButton 
        variant="primary" 
        size="md"
        className="whitespace-nowrap"
      />
      <div className="text-xs text-orange-600 text-center max-w-xs">
        Join thousands of developers building amazing projects on Replit
      </div>
    </div>
  );
}

// Banner version for landing page
export function BannerReplitButton() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Zap className="w-6 h-6 text-yellow-200" />
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold text-lg">Ready to build your portfolio?</div>
            <div className="text-orange-100">Join the platform that powers this site</div>
          </div>
        </div>
        <ReplitReferralButton 
          variant="secondary" 
          size="lg"
          className="bg-white text-orange-600 hover:bg-orange-50 border-0 shadow-lg whitespace-nowrap"
          showText={true}
        />
      </div>
    </div>
  );
}