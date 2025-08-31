import { ExternalLink, Github, Calendar, Users, Target, Trophy, Code, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import type { Project } from "@shared/schema";

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: featuredProjects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/projects?featured=true');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading project portfolio...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow">
                  <div className="h-6 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-4"></div>
                  <div className="h-20 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    if (!startDate) return '';
    
    const start = format(parseISO(startDate), 'MMM yyyy');
    if (!endDate) {
      return `${start} - Present`;
    }
    const end = format(parseISO(endDate), 'MMM yyyy');
    return `${start} - ${end}`;
  };

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcase of impactful projects across BFSI, SaaS, and enterprise domains, demonstrating expertise in project management, system design, and stakeholder engagement.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {featuredProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="group hover:shadow-2xl transition-all duration-500 border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 overflow-hidden"
                  data-testid={`featured-project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {project.domain}
                            </Badge>
                            {project.isFeatured && (
                              <Badge className="bg-accent text-accent-foreground text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {project.company && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          <span>{project.company}</span>
                        </div>
                      )}
                      {(project.startDate || project.endDate) && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDateRange(project.startDate, project.endDate)}</span>
                        </div>
                      )}
                      {project.teamSize && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{project.teamSize}</span>
                        </div>
                      )}
                      {project.duration && (
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{project.duration}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-6">
                    {project.description && (
                      <p className="text-foreground leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Key Achievements */}
                      {project.achievements && project.achievements.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-accent" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {project.achievements.slice(0, 3).map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Challenges & Outcomes */}
                      {(project.challenges || project.outcomes) && (
                        <div className="space-y-3">
                          {project.challenges && project.challenges.length > 0 && (
                            <div>
                              <h5 className="text-sm font-semibold text-foreground mb-2">Key Challenges</h5>
                              <ul className="space-y-1">
                                {project.challenges.slice(0, 2).map((challenge, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>{challenge}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {project.outcomes && project.outcomes.length > 0 && (
                            <div>
                              <h5 className="text-sm font-semibold text-foreground mb-2">Outcomes</h5>
                              <ul className="space-y-1">
                                {project.outcomes.slice(0, 2).map((outcome, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <span className="text-green-500 font-bold">•</span>
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Code className="h-4 w-4 text-secondary" />
                            Technologies & Methodologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                              <Badge 
                                key={i} 
                                variant="secondary" 
                                className="bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      {project.role && (
                        <div>
                          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Role</h5>
                          <p className="text-sm font-medium text-foreground">{project.role}</p>
                        </div>
                      )}
                      {project.methodology && (
                        <div>
                          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Methodology</h5>
                          <p className="text-sm font-medium text-foreground">{project.methodology}</p>
                        </div>
                      )}
                      {project.client && (
                        <div>
                          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Client</h5>
                          <p className="text-sm font-medium text-foreground">{project.client}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Project Summary */}
                    <div className="bg-primary/5 rounded-lg p-3">
                      <p className="text-sm text-primary font-medium">
                        Successfully delivered {project.domain} project with {project.methodology || 'standard'} methodology
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        {projects.length > featuredProjects.length && (
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Additional Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.filter(p => !p.isFeatured).map((project) => (
                <Card 
                  key={project.id} 
                  className="hover:shadow-lg transition-all duration-300"
                  data-testid={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {project.domain}
                      </Badge>
                      {project.company && (
                        <span className="text-xs text-muted-foreground">@ {project.company}</span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {project.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-xs bg-primary/5 text-primary"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="text-center">
                      <Badge variant="secondary" className="text-xs">
                        {formatDateRange(project.startDate, project.endDate)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Project Stats */}
        <div className="mt-16 bg-background/50 rounded-xl p-8">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {projects.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Projects
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">
                {featuredProjects.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Featured Projects
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">
                {new Set(projects.map(p => p.domain)).size}
              </div>
              <div className="text-sm text-muted-foreground">
                Industry Domains
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {new Set(projects.flatMap(p => p.technologies || [])).size}
              </div>
              <div className="text-sm text-muted-foreground">
                Technologies Used
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}