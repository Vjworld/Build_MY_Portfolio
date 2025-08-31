import { Button } from "@/components/ui/button";
import { Download, Briefcase, Award, TrendingUp, Users, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-professional text-primary-foreground overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-achievement/20 rounded-full blur-2xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Achievement Badge */}
            <div className="achievement-badge mb-6 w-fit">
              <Award className="h-4 w-4 mr-2" />
              10+ Years Excellence
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight">
              Hello, I am <br />
              <span className="premium-gradient">Vaibhav Selukar</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              A visionary leader, bridging the gap between technology and business to create meaningful impact.
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="stats-card">
                <div className="text-2xl font-bold text-gold mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="stats-card">
                <div className="text-2xl font-bold text-gold mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
              <div className="stats-card">
                <div className="text-2xl font-bold text-achievement mb-1">5K+</div>
                <div className="text-sm text-muted-foreground">Ideas</div>
              </div>
              <div className="stats-card">
                <div className="text-2xl font-bold text-achievement mb-1">4</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-gold text-professional font-semibold hover:shadow-lg transition-all duration-300 achievement-highlight"
                data-testid="button-view-work"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 professional-card"
                data-testid="button-download-resume"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative achievement-highlight">
              {/* Professional Border */}
              <div className="absolute -inset-4 bg-gradient-gold rounded-3xl opacity-20 animate-pulse"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                alt="Vaibhav Selukar professional headshot" 
                className="relative w-80 h-80 rounded-2xl object-cover shadow-2xl border-4 border-gold/30" 
                data-testid="img-hero-profile"
              />
              
              {/* Achievement Badges */}
              <div className="absolute -top-3 -left-3 bg-gradient-achievement text-white p-3 rounded-xl shadow-lg">
                <Star className="w-6 h-6" />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-gold text-professional p-4 rounded-2xl shadow-lg">
                <TrendingUp className="w-8 h-8" />
              </div>
              
              <div className="absolute -top-3 -right-3 bg-gradient-professional text-white p-3 rounded-xl shadow-lg">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
