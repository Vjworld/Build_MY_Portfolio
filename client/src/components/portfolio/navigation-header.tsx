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
    <nav className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <h1 className="text-xl font-playfair font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                Vaibhav Selukar
              </h1>
            </Link>
            <span className="hidden md:block text-sm text-gray-400 font-medium">
              Visionary Leader & AI Expert
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#portfolio" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-portfolio">
              Portfolio
            </a>
            <a href="#product-hunt" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-products">
              Products
            </a>
            <a href="#product-videos" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-videos">
              Videos
            </a>
            <a href="#blog" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-blog">
              Blog
            </a>
            <a href="#community" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-community">
              Community
            </a>
            <a href="#contact" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium hover:scale-105" data-testid="link-contact">
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
          <div className="md:hidden border-t border-slate-700/50 py-4 bg-slate-800/50 backdrop-blur-xl">
            <div className="flex flex-col space-y-4">
              <a href="#portfolio" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Portfolio
              </a>
              <a href="#product-hunt" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Products
              </a>
              <a href="#product-videos" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Videos
              </a>
              <a href="#blog" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Blog
              </a>
              <a href="#community" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Community
              </a>
              <a href="#contact" className="text-gray-300 hover:text-gold transition-all duration-300 font-medium px-2 py-1 rounded hover:bg-slate-700/50">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
