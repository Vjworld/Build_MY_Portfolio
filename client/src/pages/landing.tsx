import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BannerReplitButton, HeaderReplitButton } from "@/components/replit-referral-button";
import { 
  Sparkles, 
  Palette, 
  User, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Code2, 
  Smartphone,
  Layout,
  Users,
  Trophy
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Landing() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const templates = [
    { id: "modern", name: "Modern Professional", description: "Clean and contemporary design", preview: "🎯" },
    { id: "creative", name: "Creative Portfolio", description: "Bold and artistic layout", preview: "🎨" },
    { id: "minimal", name: "Minimal Elegance", description: "Simple and sophisticated", preview: "✨" },
    { id: "tech", name: "Tech Focused", description: "Perfect for developers", preview: "💻" },
    { id: "business", name: "Business Executive", description: "Corporate and professional", preview: "📊" },
  ];

  const features = [
    { icon: <Layout className="w-6 h-6" />, title: "10+ Templates", description: "Choose from professionally designed templates" },
    { icon: <Palette className="w-6 h-6" />, title: "Theme Customization", description: "Personalize colors and styles to match your brand" },
    { icon: <Smartphone className="w-6 h-6" />, title: "Mobile Responsive", description: "Looks perfect on all devices" },
    { icon: <Globe className="w-6 h-6" />, title: "Custom Domain", description: "Use your own domain or get a free subdomain" },
    { icon: <Users className="w-6 h-6" />, title: "User Management", description: "Complete user authentication and management" },
    { icon: <Trophy className="w-6 h-6" />, title: "Built with Replit", description: "Powered by the platform you love" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-purple-100 bg-gradient-to-r from-purple-50 via-white to-pink-50 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Portfolio Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/api/login'} data-testid="button-signin">Sign In</Button>
            <Button onClick={() => window.location.href = '/api/login'} data-testid="button-get-started">Get Started</Button>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">✨ New Platform Launch</Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                Build Your Professional Portfolio
              </h1>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed font-medium">
                Create stunning portfolio websites like this one. Choose from 10+ templates, 
                customize your theme, and showcase your work to the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200" onClick={() => window.location.href = '/api/login'} data-testid="button-create-portfolio">
                  Create Your Portfolio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link href="/examples">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200" data-testid="button-view-example">
                    <User className="w-5 h-5 mr-2" />
                    View Example Portfolio
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">No coding required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">Ready in minutes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
                  <CardTitle className="text-2xl font-bold">Featured Portfolio</CardTitle>
                  <p className="text-white/90 font-medium">Vaibhav Selukar - Tech Leader</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                      <p className="text-slate-800 font-semibold">Portfolio Preview</p>
                      <p className="text-sm text-slate-600 font-medium">Complete with blog, projects & more</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-slate-800">Professional Template</span>
                    </div>
                    <Link href="/examples">
                      <Button size="sm" variant="outline" data-testid="button-preview-portfolio">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">Choose Your Perfect Template</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto font-medium">
              Start with a professionally designed template and customize it to match your unique style and brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border-0 bg-white/70 backdrop-blur-sm ${
                  selectedTemplate === template.id ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-200' : 'shadow-md'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
                data-testid={`template-${template.id}`}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{template.preview}</div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800">{template.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 font-medium">{template.description}</p>
                  <Button 
                    size="sm" 
                    variant={selectedTemplate === template.id ? "default" : "outline"} 
                    className={`w-full transition-all duration-200 ${
                      selectedTemplate === template.id 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Preview'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">Everything You Need to Succeed</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto font-medium">
              Our platform provides all the tools and features you need to create a professional online presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                  <p className="text-slate-600 font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of professionals who have already created their portfolios with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-white text-purple-700 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200" onClick={() => window.location.href = '/api/login'} data-testid="button-start-building">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
            </Button>
            <Link href="/examples">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-purple-700 transition-all duration-200" data-testid="button-view-examples">
                View More Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-purple-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Portfolio Builder</span>
              </div>
              <p className="text-sm">
                Create professional portfolios with ease. Built for creators, by creators.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/examples" className="hover:text-white transition-colors">Templates</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#contact" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-400">&copy; 2024 Portfolio Builder. All rights reserved. Built with ❤️ on Replit.</p>
              <div className="flex items-center gap-4">
                <BannerReplitButton />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
