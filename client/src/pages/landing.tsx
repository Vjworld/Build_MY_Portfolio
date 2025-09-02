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
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">Portfolio Builder</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/api/login'} data-testid="button-signin">Sign In</Button>
            <Button onClick={() => window.location.href = '/api/login'} data-testid="button-get-started">Get Started</Button>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 border border-blue-200">✨ New Platform Launch</Badge>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                Build Your Professional Portfolio
              </h1>
              <p className="text-xl text-gray-800 mb-8 leading-relaxed font-semibold">
                Create stunning portfolio websites like this one. Choose from 10+ templates, 
                customize your theme, and showcase your work to the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8" onClick={() => window.location.href = '/api/login'} data-testid="button-create-portfolio">
                  Create Your Portfolio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link href="/examples">
                  <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-view-example">
                    <User className="w-5 h-5 mr-2" />
                    View Example Portfolio
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">No coding required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold">Ready in minutes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="shadow-2xl">
                <CardHeader className="text-center bg-gradient-to-r from-primary to-blue-600 text-white">
                  <CardTitle className="text-2xl">Featured Portfolio</CardTitle>
                  <p className="text-white/90">Vaibhav Selukar - Tech Leader</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-gray-800 font-semibold">Portfolio Preview</p>
                      <p className="text-sm text-gray-700 font-medium">Complete with blog, projects & more</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">Professional Template</span>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Choose Your Perfect Template</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">
              Start with a professionally designed template and customize it to match your unique style and brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
                data-testid={`template-${template.id}`}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{template.preview}</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{template.name}</h3>
                  <p className="text-gray-800 text-sm mb-4 font-semibold">{template.description}</p>
                  <Button 
                    size="sm" 
                    variant={selectedTemplate === template.id ? "default" : "outline"} 
                    className="w-full"
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-semibold">
              Our platform provides all the tools and features you need to create a professional online presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-800 font-semibold">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Portfolio?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of professionals who have already created their portfolios with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => window.location.href = '/api/login'} data-testid="button-start-building">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Building Now
            </Button>
            <Link href="/examples">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-view-examples">
                View More Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
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
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm">&copy; 2024 Portfolio Builder. All rights reserved. Built with ❤️ on Replit.</p>
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
