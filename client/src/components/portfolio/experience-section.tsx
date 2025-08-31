import { Calendar, MapPin, Building, Award, Users, TrendingUp, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import type { EmploymentExperience } from "@shared/schema";

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useQuery<EmploymentExperience[]>({
    queryKey: ['/api/employment-experience'],
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading professional journey...
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
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

  const formatDateRange = (startDate: string | null, endDate: string | null, isCurrent: boolean | null) => {
    if (!startDate) return '';
    
    const start = format(parseISO(startDate), 'MMM yyyy');
    if (isCurrent || !endDate) {
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
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive journey through {experiences.length}+ years of experience in project management, SaaS delivery, and technology leadership across BFSI, EdTech, and enterprise domains. Plus 11+ years experience in US Retirement Back Office Process and Business Process Outsourcing domains.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-primary/60"></div>
            
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start mb-12" data-testid={`experience-${experience.company.toLowerCase().replace(/\s+/g, '-')}`}>
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                
                {/* Content */}
                <div className="ml-16 w-full">
                  <Card className="w-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary bg-gradient-to-r from-card to-primary/5">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <CardTitle className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            {experience.position}
                          </CardTitle>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-2 font-semibold">
                              <Building className="h-4 w-4 text-primary" />
                              <span>{experience.company}</span>
                            </div>
                            {experience.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-secondary" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="lg:text-right mt-4 lg:mt-0">
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">
                              {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
                            </span>
                          </div>
                          {experience.isCurrent && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              Current Position
                            </Badge>
                          )}
                          {experience.domain && (
                            <Badge variant="outline" className="ml-2">
                              {experience.domain}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {experience.description && (
                        <p className="text-foreground leading-relaxed text-lg">
                          {experience.description}
                        </p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Key Achievements */}
                        {experience.achievements && experience.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Award className="h-5 w-5 text-accent" />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Responsibilities */}
                        {experience.responsibilities && experience.responsibilities.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                              <Users className="h-5 w-5 text-secondary" />
                              Key Responsibilities
                            </h4>
                            <ul className="space-y-2">
                              {experience.responsibilities.map((responsibility, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm leading-relaxed">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {/* Technologies */}
                      {experience.technologies && experience.technologies.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Technologies & Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech, i) => (
                                <Badge 
                                  key={i} 
                                  variant="secondary" 
                                  className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
