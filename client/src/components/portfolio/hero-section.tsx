import { Button } from "@/components/ui/button";
import { Download, Briefcase, Award, TrendingUp, Users, Star } from "lucide-react";
import profileImage from "@assets/vs_1756632353606.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/50 to-background"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-accent/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse-glow delay-1000"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Achievement Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full card-modern border border-accent/30 text-accent font-bold text-sm backdrop-blur-xl">
              <Award className="h-5 w-5 mr-3" />
              10+ Years Excellence
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-playfair font-bold leading-tight">
              Hello, I am <br />
              <span className="gradient-text animate-pulse-glow">Vaibhav Selukar</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-inter max-w-4xl">
              A visionary leader, bridging the gap between technology and business to create meaningful impact.
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-elevated p-6 text-center group">
                <div className="text-4xl font-bold gradient-text mb-3">500+</div>
                <div className="text-sm text-muted-foreground font-semibold">Projects</div>
              </div>
              <div className="card-elevated p-6 text-center group">
                <div className="text-4xl font-bold gradient-text mb-3">98%</div>
                <div className="text-sm text-muted-foreground font-semibold">Satisfaction</div>
              </div>
              <div className="card-elevated p-6 text-center group">
                <div className="text-4xl font-bold text-purple-400 mb-3">5K+</div>
                <div className="text-sm text-muted-foreground font-semibold">Ideas</div>
              </div>
              <div className="card-elevated p-6 text-center group">
                <div className="text-4xl font-bold text-purple-400 mb-3">4</div>
                <div className="text-sm text-muted-foreground font-semibold">Products</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-accent to-orange-500 text-accent-foreground font-bold text-xl px-10 py-6 hover:from-orange-400 hover:to-accent hover:shadow-2xl hover:shadow-accent/30 transition-all duration-500 transform hover:scale-105 rounded-2xl"
                data-testid="button-view-work"
              >
                <Briefcase className="mr-3 h-7 w-7" />
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-accent/50 text-foreground card-modern font-bold text-xl px-10 py-6 hover:border-accent hover:bg-accent/10 hover:shadow-xl transition-all duration-500 transform hover:scale-105 rounded-2xl"
                data-testid="button-download-resume"
              >
                <Download className="mr-3 h-7 w-7" />
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Modern Animated Border */}
              <div className="absolute -inset-8 bg-gradient-to-r from-accent via-orange-400 to-purple-500 rounded-full opacity-20 animate-pulse-glow group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-500 via-pink-500 to-accent rounded-full opacity-15 animate-pulse-glow delay-700 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              <div className="relative card-elevated p-8 rounded-full shadow-2xl">
                <img 
                  src={profileImage} 
                  alt="Vaibhav Selukar professional headshot" 
                  className="relative w-96 h-96 rounded-full object-cover shadow-2xl border-4 border-accent/30 group-hover:border-accent/70 transition-all duration-500" 
                  data-testid="img-hero-profile"
                />
                
                {/* Modern Achievement Badges */}
                <div className="absolute -top-4 -left-4 card-elevated bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 card-elevated bg-gradient-to-r from-accent to-orange-500 text-accent-foreground p-5 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10" />
                </div>
                
                <div className="absolute -top-4 -right-4 card-elevated text-foreground p-4 rounded-2xl shadow-2xl border border-accent/30 hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
