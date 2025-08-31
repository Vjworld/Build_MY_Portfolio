import { ExternalLink, Globe, Award, Phone, Bot, TrendingUp, Languages, GraduationCap, QrCode, Instagram, Facebook, Youtube, Linkedin, Twitter, PenTool, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { SocialLink } from "@shared/schema";

export default function SocialLinksSection() {
  const { data: socialLinksByCategory = {}, isLoading } = useQuery<Record<string, SocialLink[]>>({
    queryKey: ['/api/social-links', 'byCategory'],
    queryFn: async () => {
      const response = await fetch('/api/social-links?byCategory=true');
      return response.json();
    }
  });

  const { data: featuredLinks = [] } = useQuery<SocialLink[]>({
    queryKey: ['/api/social-links', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/social-links?featured=true');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Connect With Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading social links...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow">
                  <div className="h-6 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded w-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const getIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'linkedin': return Linkedin;
      case 'award': return Award;
      case 'pen-tool': return PenTool;
      case 'youtube': return Youtube;
      case 'facebook': return Facebook;
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'pinterest': return Hash;
      case 'phone': return Phone;
      case 'bot': return Bot;
      case 'globe': return Globe;
      case 'trending-up': return TrendingUp;
      case 'languages': return Languages;
      case 'graduation-cap': return GraduationCap;
      case 'qr-code': return QrCode;
      default: return ExternalLink;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'professional':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'social':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'communication':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300';
      case 'ai tools':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300';
      case 'websites':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const handleLinkClick = (url: string) => {
    if (url.startsWith('skype:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const categoryOrder = ['Professional', 'Social', 'Websites', 'AI Tools', 'Communication'];
  const sortedCategories = categoryOrder.filter(cat => socialLinksByCategory[cat]);
  const otherCategories = Object.keys(socialLinksByCategory).filter(cat => !categoryOrder.includes(cat));
  const allCategories = [...sortedCategories, ...otherCategories];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Connect With Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's connect across various platforms! Find me on social media, explore my projects, try my AI tools, and get in touch through your preferred channel.
          </p>
        </div>

        {/* Featured Links */}
        {featuredLinks.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <Award className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Featured Links</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredLinks.slice(0, 8).map((link) => {
                const IconComponent = getIcon(link.icon);
                return (
                  <Card 
                    key={link.id} 
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5"
                    onClick={() => handleLinkClick(link.url)}
                    data-testid={`featured-link-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                          <IconComponent className="h-6 w-6 text-accent" />
                        </div>
                        <h4 className="font-bold text-foreground text-sm mb-1">
                          {link.platform}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {link.username || link.displayName}
                        </p>
                      </div>
                      <Badge className={getCategoryColor(link.category)}>
                        {link.category}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Links by Category */}
        <div className="space-y-12">
          {allCategories.map((category) => {
            const categoryLinks = socialLinksByCategory[category] || [];
            const CategoryIcon = category === 'Professional' ? Award : 
                                category === 'Social' ? Globe : 
                                category === 'Websites' ? Globe :
                                category === 'AI Tools' ? Bot : Phone;

            return (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-3 justify-center">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {category}
                  </h3>
                  <Badge variant="outline" className="ml-2">
                    {categoryLinks.length} {categoryLinks.length === 1 ? 'link' : 'links'}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryLinks.map((link) => {
                    const IconComponent = getIcon(link.icon);
                    return (
                      <Card 
                        key={link.id} 
                        className="group hover:shadow-lg transition-all duration-300"
                        data-testid={`social-link-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-3 text-lg">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-foreground">
                                {link.platform}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {link.displayName}
                              </div>
                            </div>
                            <Badge className={getCategoryColor(link.category)}>
                              {link.category}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">
                            {link.description}
                          </p>
                          <Button 
                            onClick={() => handleLinkClick(link.url)}
                            className="w-full group-hover:shadow-md transition-all duration-300"
                            data-testid={`button-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit {link.platform}
                          </Button>
                          {link.username && (
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                              @{link.username}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 bg-card rounded-xl p-8 border">
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {Object.values(socialLinksByCategory).flat().length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Links
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">
                {Object.keys(socialLinksByCategory).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Categories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">
                {featuredLinks.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Featured
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {socialLinksByCategory['Professional']?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Professional
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {socialLinksByCategory['Websites']?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                My Projects
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Want to collaborate or have a question? Let's connect!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {featuredLinks.slice(0, 3).map((link) => {
              const IconComponent = getIcon(link.icon);
              return (
                <Button 
                  key={link.id}
                  onClick={() => handleLinkClick(link.url)}
                  variant="outline"
                  className="hover:shadow-lg transition-all duration-300"
                  data-testid={`cta-${link.platform.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {link.platform}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}