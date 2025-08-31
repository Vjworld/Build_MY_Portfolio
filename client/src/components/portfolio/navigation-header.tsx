import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, Eye, User, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const isAdminView = location === "/admin";

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <h1 className="text-xl font-playfair font-semibold text-primary">
                Vaibhav Selukar
              </h1>
            </Link>
            <span className="hidden md:block text-sm text-muted-foreground">
              Visionary Leader & AI Expert
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors" data-testid="link-portfolio">
              Portfolio
            </a>
            <a href="#product-hunt" className="text-foreground hover:text-primary transition-colors" data-testid="link-products">
              Products
            </a>
            <a href="#product-videos" className="text-foreground hover:text-primary transition-colors" data-testid="link-videos">
              Videos
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors" data-testid="link-blog">
              Blog
            </a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors" data-testid="link-community">
              Community
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors" data-testid="link-contact">
              Contact
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && user?.isAdmin && (
              <Link href={isAdminView ? "/" : "/admin"} data-testid="link-admin-toggle">
                <Button variant="outline" size="sm">
                  {isAdminView ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Public View
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4 mr-2" />
                      Admin View
                    </>
                  )}
                </Button>
              </Link>
            )}
            
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/logout'}
                data-testid="button-logout"
              >
                <User className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#product-hunt" className="text-foreground hover:text-primary transition-colors">
                Products
              </a>
              <a href="#product-videos" className="text-foreground hover:text-primary transition-colors">
                Videos
              </a>
              <a href="#blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </a>
              <a href="#community" className="text-foreground hover:text-primary transition-colors">
                Community
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
