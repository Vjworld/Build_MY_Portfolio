import { Award, Calendar, ExternalLink, Star, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import type { Certification } from "@shared/schema";

export default function CertificationsSection() {
  const { data: certifications = [], isLoading } = useQuery<Certification[]>({
    queryKey: ['/api/certifications'],
  });

  const { data: featuredCertifications = [] } = useQuery<Certification[]>({
    queryKey: ['/api/certifications', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/certifications?featured=true');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Professional Certifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading certifications...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow">
                  <div className="h-6 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(parseISO(dateString), 'MMM yyyy');
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Professional Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications in project management, agile methodologies, and emerging technologies.
          </p>
        </div>

        {/* Featured Certifications */}
        {featuredCertifications.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Featured Certifications</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredCertifications.map((cert) => (
                <Card 
                  key={cert.id} 
                  className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5"
                  data-testid={`featured-cert-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-foreground leading-tight">
                          {cert.name}
                        </CardTitle>
                        <p className="text-sm text-primary font-semibold mt-1">
                          {cert.provider}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Issued {formatDate(cert.issueDate)}</span>
                    </div>
                    
                    {cert.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>
                    )}
                    
                    {cert.skills && cert.skills.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-foreground mb-2">Skills Covered</h5>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, i) => (
                            <Badge 
                              key={i} 
                              variant="outline" 
                              className="text-xs bg-primary/5 text-primary border-primary/20"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {cert.credentialUrl && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => cert.credentialUrl && window.open(cert.credentialUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View Credential
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Certifications */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">All Certifications</h3>
            <Badge variant="outline" className="ml-2">
              {certifications.length} Total
            </Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card 
                key={cert.id} 
                className="hover:shadow-lg transition-all duration-300 bg-card"
                data-testid={`cert-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Award className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-bold text-foreground leading-tight">
                        {cert.name}
                      </CardTitle>
                      <p className="text-sm text-secondary font-medium mt-1">
                        {cert.provider}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">Issued {formatDate(cert.issueDate)}</span>
                  </div>
                  
                  {cert.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  )}
                  
                  {cert.skills && cert.skills.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-xs bg-secondary/10 text-secondary"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{cert.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {cert.credentialUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => cert.credentialUrl && window.open(cert.credentialUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Credential
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certification Stats */}
        <div className="mt-16 bg-muted/50 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Certifications
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">
                {featuredCertifications.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Featured Credentials
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">
                {new Set(certifications.flatMap(cert => cert.provider || [])).size}
              </div>
              <div className="text-sm text-muted-foreground">
                Certification Providers
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {new Set(certifications.flatMap(cert => cert.skills || [])).size}
              </div>
              <div className="text-sm text-muted-foreground">
                Skills Validated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}