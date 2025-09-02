import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Star, Globe, User, Briefcase, Code, Palette } from "lucide-react";
import { Link } from "wouter";

export default function Examples() {
  const portfolios = [
    {
      id: "vaibhav-selukar",
      name: "Vaibhav Selukar",
      title: "Tech Leader & Strategy Consultant",
      template: "Professional",
      category: "Business",
      preview: "🎯",
      featured: true,
      description: "Comprehensive portfolio showcasing leadership experience, strategic consulting, and technology expertise",
      features: ["Blog System", "Project Showcase", "Community Features", "Contact Forms"]
    },
    {
      id: "sarah-designer",
      name: "Sarah Chen",
      title: "UX/UI Designer",
      template: "Creative",
      category: "Design",
      preview: "🎨",
      featured: false,
      description: "Creative portfolio highlighting design process, case studies, and visual storytelling",
      features: ["Design Portfolio", "Case Studies", "Client Testimonials", "Process Documentation"]
    },
    {
      id: "alex-developer",
      name: "Alex Rodriguez",
      title: "Full Stack Developer",
      template: "Tech Focused",
      category: "Technology",
      preview: "💻",
      featured: false,
      description: "Developer portfolio with interactive code demos, technical blog, and open source contributions",
      features: ["Code Demos", "Technical Blog", "GitHub Integration", "Skill Showcase"]
    },
    {
      id: "maria-consultant",
      name: "Maria Johnson",
      title: "Business Consultant",
      template: "Executive",
      category: "Business",
      preview: "📊",
      featured: false,
      description: "Executive portfolio demonstrating consulting expertise, client success stories, and industry insights",
      features: ["Case Studies", "Client Results", "Industry Insights", "Consulting Services"]
    },
    {
      id: "david-photographer",
      name: "David Kim",
      title: "Professional Photographer",
      template: "Visual",
      category: "Creative",
      preview: "📸",
      featured: false,
      description: "Visual portfolio showcasing photography work, client galleries, and creative vision",
      features: ["Photo Galleries", "Client Showcase", "Booking System", "Visual Stories"]
    },
    {
      id: "lisa-writer",
      name: "Lisa Thompson",
      title: "Content Writer & Blogger",
      template: "Minimal",
      category: "Writing",
      preview: "✍️",
      featured: false,
      description: "Clean writing portfolio with published articles, blog posts, and writing samples",
      features: ["Writing Samples", "Published Articles", "Blog Integration", "Client Work"]
    }
  ];

  const categories = ["All", "Business", "Design", "Technology", "Creative", "Writing"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" data-testid="button-signin">Sign In</Button>
            <Button data-testid="button-get-started">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Portfolio Examples
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium max-w-3xl mx-auto">
            Get inspired by these amazing portfolios created with our platform. Each one showcases unique styles, 
            features, and approaches to professional presentation.
          </p>
          <Button size="lg" className="text-lg px-8" data-testid="button-create-yours">
            Create Your Portfolio
            <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
          </Button>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Featured Portfolio</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              This comprehensive portfolio demonstrates the full capabilities of our platform.
            </p>
          </div>
          
          {portfolios.filter(p => p.featured).map((portfolio) => (
            <Card key={portfolio.id} className="shadow-2xl max-w-4xl mx-auto">
              <CardHeader className="text-center bg-gradient-to-r from-primary to-blue-600 text-white">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <Badge variant="secondary" className="bg-white/20 text-white">Featured</Badge>
                </div>
                <CardTitle className="text-3xl">{portfolio.name}</CardTitle>
                <p className="text-primary-foreground/90 text-lg">{portfolio.title}</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">{portfolio.preview}</div>
                        <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Live Portfolio Preview</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{portfolio.template} Template</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">{portfolio.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {portfolio.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button className="flex-1" data-testid={`button-view-${portfolio.id}`}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live Portfolio
                        </Button>
                        <Button variant="outline" className="flex-1" data-testid={`button-use-template-${portfolio.id}`}>
                          Use This Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* More Examples */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">More Portfolio Examples</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
              Explore portfolios across different industries and use cases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.filter(p => !p.featured).map((portfolio) => (
              <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{portfolio.preview}</div>
                    <Badge variant="outline" className="mb-2">{portfolio.category}</Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{portfolio.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">{portfolio.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{portfolio.description}</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full" data-testid={`button-view-${portfolio.id}`}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button size="sm" variant="outline" className="w-full" data-testid={`button-template-${portfolio.id}`}>
                      Use {portfolio.template} Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Portfolio?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Choose from these templates and many more. Start building your professional presence today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-start-creating">
              <User className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-back-home-cta">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}