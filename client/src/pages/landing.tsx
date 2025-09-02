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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <header className="border-b border-blue-700 bg-blue-800/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-white">Portfolio Builder</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white hover:text-blue-200 transition-colors font-semibold" data-testid="link-home">Home</Link>
            <Link href="/examples" className="text-white hover:text-blue-200 transition-colors font-semibold" data-testid="link-examples">Examples</Link>
            <Link href="#contact" className="text-white hover:text-blue-200 transition-colors font-semibold" data-testid="link-contact">Contact</Link>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-800" onClick={() => window.location.href = '/api/login'} data-testid="button-signin">Sign In</Button>
            <Button className="bg-white text-blue-800 hover:bg-blue-100" onClick={() => window.location.href = '/api/login'} data-testid="button-get-started">Get Started</Button>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-700 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-700 rounded-full opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">✨ New Platform Launch</Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                Build Your Professional Portfolio
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed font-medium">
                Create stunning portfolio websites like this one. Choose from 10+ templates, 
                customize your theme, and showcase your work to the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 bg-white text-blue-800 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200" onClick={() => window.location.href = '/api/login'} data-testid="button-create-portfolio">
                  Create Your Portfolio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link href="/examples">
                  <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-blue-800 transition-all duration-200" data-testid="button-view-example">
                    <User className="w-5 h-5 mr-2" />
                    View Example Portfolio
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">No coding required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300" />
                  <span className="font-semibold">Ready in minutes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-2xl border border-blue-600 bg-blue-800">
                <CardHeader className="text-center bg-blue-700 text-white">
                  <CardTitle className="text-2xl font-bold">Featured Portfolio</CardTitle>
                  <p className="text-white/90 font-medium">Vaibhav Selukar - Tech Leader</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="aspect-video bg-blue-700 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                      <p className="text-white font-bold">Portfolio Preview</p>
                      <p className="text-sm text-blue-100 font-semibold">Complete with blog, projects & more</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-bold text-white">Professional Template</span>
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
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Choose Your Perfect Template</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
              Start with a professionally designed template and customize it to match your unique style and brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 border bg-blue-800 ${
                  selectedTemplate === template.id ? 'ring-2 ring-blue-300 shadow-lg shadow-blue-400' : 'shadow-md border-blue-600'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
                data-testid={`template-${template.id}`}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{template.preview}</div>
                  <h3 className="font-bold text-lg mb-2 text-white">{template.name}</h3>
                  <p className="text-blue-100 text-sm mb-4 font-medium">{template.description}</p>
                  <Button 
                    size="sm" 
                    variant={selectedTemplate === template.id ? "default" : "outline"} 
                    className={`w-full transition-all duration-200 ${
                      selectedTemplate === template.id 
                        ? 'bg-white text-blue-800 hover:bg-blue-50' 
                        : 'border-white text-white hover:bg-white hover:text-blue-800'
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
      <section className="py-20 bg-blue-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Everything You Need to Succeed</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto font-medium">
              Our platform provides all the tools and features you need to create a professional online presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-blue-600 shadow-md hover:shadow-lg transition-all duration-200 bg-blue-900">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-4 text-blue-200">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                  <p className="text-blue-100 font-medium">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who have already created their portfolios with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200" onClick={() => window.location.href = '/api/login'} data-testid="button-start-building">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
            </Button>
            <Link href="/examples">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all duration-200" data-testid="button-view-examples">
                View More Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-blue-300" />
                <span className="text-lg font-bold text-white">Portfolio Builder</span>
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
          <div className="border-t border-blue-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-blue-200">&copy; 2024 Portfolio Builder. All rights reserved. Built with ❤️ on Replit.</p>
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
