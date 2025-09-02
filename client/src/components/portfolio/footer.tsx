import { Github, Linkedin, Twitter } from "lucide-react";
import { FooterReplitButton } from "@/components/replit-referral-button";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <FooterReplitButton />
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-2xl font-playfair font-bold mb-4">Vaibhav Selukar</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Empowering businesses through strategic technology leadership and innovative solutions. 
              Let's build the future together.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#portfolio" className="hover:text-primary-foreground transition-colors">Portfolio</a></li>
              <li><a href="#blog" className="hover:text-primary-foreground transition-colors">Blog</a></li>
              <li><a href="#community" className="hover:text-primary-foreground transition-colors">Community</a></li>
              <li><a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Strategy Consulting</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Project Management</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">AI Integration</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            &copy; 2024 Vaibhav Selukar. All rights reserved. Built with passion for innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
