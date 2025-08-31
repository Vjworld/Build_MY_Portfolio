import { Button } from "@/components/ui/button";
import { Download, Briefcase, Award, TrendingUp, Users, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-gold/30 to-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Achievement Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-yellow-400/20 border border-gold/30 text-gold mb-6 font-semibold text-sm">
              <Award className="h-4 w-4 mr-2" />
              10+ Years Excellence
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-playfair font-bold mb-6 leading-tight">
              Hello, I am <br />
              <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent animate-pulse">Vaibhav Selukar</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed font-inter max-w-3xl">
              A visionary leader, bridging the gap between technology and business to create meaningful impact.
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:border-gold/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-gray-400 font-medium">Projects</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:border-gold/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-gold mb-2">98%</div>
                <div className="text-sm text-gray-400 font-medium">Satisfaction</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-purple-400 mb-2">5K+</div>
                <div className="text-sm text-gray-400 font-medium">Ideas</div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-600/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
                <div className="text-sm text-gray-400 font-medium">Products</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-gold to-yellow-500 text-slate-900 font-bold text-lg px-8 py-4 hover:from-yellow-400 hover:to-gold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
                data-testid="button-view-work"
              >
                <Briefcase className="mr-3 h-6 w-6" />
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-500 text-white bg-slate-800/50 backdrop-blur-sm font-semibold text-lg px-8 py-4 hover:border-gold hover:bg-slate-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                data-testid="button-download-resume"
              >
                <Download className="mr-3 h-6 w-6" />
                Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Animated Border */}
              <div className="absolute -inset-6 bg-gradient-to-r from-gold via-yellow-400 to-purple-500 rounded-3xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-gold rounded-3xl opacity-20 animate-pulse delay-500 group-hover:opacity-40 transition-opacity duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400" 
                  alt="Vaibhav Selukar professional headshot" 
                  className="relative w-80 h-80 rounded-2xl object-cover shadow-xl border-4 border-slate-600 group-hover:border-gold/50 transition-all duration-300" 
                  data-testid="img-hero-profile"
                />
                
                {/* Achievement Badges */}
                <div className="absolute -top-2 -left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-gold to-yellow-500 text-slate-900 p-4 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-slate-700 to-slate-600 text-white p-3 rounded-xl shadow-lg border border-slate-500 hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
