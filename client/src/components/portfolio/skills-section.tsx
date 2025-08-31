import { Code, Star, TrendingUp, Award, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import type { Skill } from "@shared/schema";

export default function SkillsSection() {
  const { data: skillsByCategory = {}, isLoading } = useQuery<Record<string, Skill[]>>({
    queryKey: ['/api/skills', 'byCategory'],
    queryFn: async () => {
      const response = await fetch('/api/skills?byCategory=true');
      return response.json();
    }
  });

  const { data: featuredSkills = [] } = useQuery<Skill[]>({
    queryKey: ['/api/skills', 'featured'],
    queryFn: async () => {
      const response = await fetch('/api/skills?featured=true');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
              Technical Skills & Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading skills portfolio...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-6 shadow">
                  <div className="h-6 bg-muted rounded w-2/3 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, j) => (
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

  const getProficiencyLabel = (level: number | null) => {
    if (!level) return 'Beginner';
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Novice';
      case 3: return 'Intermediate';
      case 4: return 'Advanced';
      case 5: return 'Expert';
      default: return 'Beginner';
    }
  };

  const getProficiencyColor = (level: number | null) => {
    if (!level) return 'bg-gray-400';
    switch (level) {
      case 1: return 'bg-red-400';
      case 2: return 'bg-orange-400';
      case 3: return 'bg-yellow-400';
      case 4: return 'bg-blue-400';
      case 5: return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'project management':
        return Target;
      case 'tools':
        return Code;
      case 'communication':
        return Star;
      case 'design':
        return Award;
      case 'technical':
        return Zap;
      default:
        return TrendingUp;
    }
  };

  const categoryOrder = [
    'Project Management',
    'Tools', 
    'Soft Skills',
    'Communication',
    'Productivity',
    'Design',
    'Technical'
  ];

  const sortedCategories = categoryOrder.filter(cat => skillsByCategory[cat]);
  const otherCategories = Object.keys(skillsByCategory).filter(cat => !categoryOrder.includes(cat));
  const allCategories = [...sortedCategories, ...otherCategories];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Technical Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology stack and professional competencies developed through {Math.max(...Object.values(skillsByCategory).flat().map(s => s.yearsOfExperience || 0))}+ years of hands-on experience across diverse domains.
          </p>
        </div>

        {/* Featured Skills Highlight */}
        {featuredSkills.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <Star className="h-6 w-6 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Core Competencies</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {featuredSkills.slice(0, 8).map((skill) => (
                <Card 
                  key={skill.id} 
                  className="text-center hover:shadow-lg transition-all duration-300 border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5"
                  data-testid={`featured-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className={`w-12 h-12 ${getProficiencyColor(skill.proficiencyLevel)} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {skill.proficiencyLevel || 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-lg mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {getProficiencyLabel(skill.proficiencyLevel)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        {skill.yearsOfExperience}+ years experience
                      </div>
                      <Progress 
                        value={(skill.proficiencyLevel || 1) * 20} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Skills by Category */}
        <div className="grid lg:grid-cols-2 gap-8">
          {allCategories.map((category) => {
            const categorySkills = skillsByCategory[category] || [];
            const IconComponent = getCategoryIcon(category);
            
            return (
              <Card 
                key={category} 
                className="hover:shadow-xl transition-all duration-300"
                data-testid={`skill-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    {category}
                    <Badge variant="outline" className="ml-auto">
                      {categorySkills.length} skills
                    </Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-semibold text-foreground">
                            {skill.name}
                          </h5>
                          {skill.isFeatured && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{getProficiencyLabel(skill.proficiencyLevel)}</span>
                          <span>{skill.yearsOfExperience}+ years</span>
                        </div>
                        <Progress 
                          value={(skill.proficiencyLevel || 1) * 20} 
                          className="h-1.5 mt-2"
                        />
                      </div>
                      <div className="ml-4 text-right">
                        <div className={`w-8 h-8 ${getProficiencyColor(skill.proficiencyLevel)} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">
                            {skill.proficiencyLevel || 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Summary Stats */}
        <div className="mt-16 bg-muted/50 rounded-xl p-8">
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {Object.values(skillsByCategory).flat().length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Skills
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">
                {Object.keys(skillsByCategory).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Skill Categories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">
                {featuredSkills.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Core Competencies
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.values(skillsByCategory).flat().filter(s => (s.proficiencyLevel || 1) >= 4).length}
              </div>
              <div className="text-sm text-muted-foreground">
                Advanced Skills
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.max(...Object.values(skillsByCategory).flat().map(s => s.yearsOfExperience || 0))}+
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
        </div>

        {/* Proficiency Legend */}
        <div className="mt-8 bg-card rounded-lg p-6 border">
          <h4 className="font-semibold text-foreground mb-4 text-center">Proficiency Scale</h4>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { level: 1, label: 'Beginner', color: 'bg-red-400' },
              { level: 2, label: 'Novice', color: 'bg-orange-400' },
              { level: 3, label: 'Intermediate', color: 'bg-yellow-400' },
              { level: 4, label: 'Advanced', color: 'bg-blue-400' },
              { level: 5, label: 'Expert', color: 'bg-green-400' }
            ].map(({ level, label, color }) => (
              <div key={level} className="flex items-center gap-2">
                <div className={`w-4 h-4 ${color} rounded-full`}></div>
                <span className="text-sm text-muted-foreground">{level} - {label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}