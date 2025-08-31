export default function AboutSection() {
  const skills = [
    { name: "Project Management", category: "primary" },
    { name: "Automation", category: "secondary" },
    { name: "Process Optimization", category: "accent" },
    { name: "Agile Methodology", category: "muted" },
    { name: "Team Leadership", category: "primary" },
    { name: "Strategic Planning", category: "secondary" },
    { name: "Cybersecurity", category: "accent" },
    { name: "AI Integration", category: "muted" },
    { name: "Digital Transformation", category: "primary" },
  ];

  const getSkillClasses = (category: string) => {
    switch (category) {
      case "primary":
        return "px-6 py-3 bg-gradient-to-r from-accent to-orange-500 text-accent-foreground rounded-2xl text-base font-bold hover:scale-105 transition-all duration-300";
      case "secondary":
        return "px-6 py-3 card-modern text-foreground rounded-2xl text-base font-semibold border border-accent/30 hover:scale-105 transition-all duration-300";
      case "accent":
        return "px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl text-base font-bold hover:scale-105 transition-all duration-300";
      case "muted":
        return "px-6 py-3 card-modern text-muted-foreground rounded-2xl text-base font-medium border border-muted hover:scale-105 transition-all duration-300";
      default:
        return "px-6 py-3 card-modern text-muted-foreground rounded-2xl text-base font-medium border border-muted hover:scale-105 transition-all duration-300";
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="gradient-text text-5xl lg:text-6xl font-playfair font-bold mb-6">
            Who I Am and What I Do
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Transforming businesses through innovative technology solutions and strategic leadership
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-playfair font-bold text-foreground mb-6">
                  Professional Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed text-large">
                  As a Senior Business Leader at AI Wonders Professional and a Sr. Cybersecurity Consultant at Project Management Office Lead, 
                  I bring together deep technical expertise with strategic business acumen to drive digital transformation initiatives.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center card-elevated p-8" data-testid="stat-experience">
                  <div className="text-5xl font-bold gradient-text mb-4">18+</div>
                  <div className="text-base text-muted-foreground font-semibold">Years Experience</div>
                </div>
                <div className="text-center card-elevated p-8" data-testid="stat-projects">
                  <div className="text-5xl font-bold gradient-text mb-4">70+</div>
                  <div className="text-base text-muted-foreground font-semibold">Projects Completed</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-muted to-card p-8 rounded-2xl">
              <h3 className="text-xl font-playfair font-semibold text-primary mb-6 text-center">
                Core Expertise
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className={getSkillClasses(skill.category)} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.slice(3, 6).map((skill, index) => (
                    <span key={index} className={getSkillClasses(skill.category)} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.slice(6, 9).map((skill, index) => (
                    <span key={index} className={getSkillClasses(skill.category)} data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
