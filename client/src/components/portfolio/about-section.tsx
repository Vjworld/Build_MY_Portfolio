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
        return "px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium";
      case "secondary":
        return "px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm";
      case "accent":
        return "px-3 py-2 bg-accent text-accent-foreground rounded-full text-sm";
      case "muted":
        return "px-3 py-2 bg-muted text-muted-foreground rounded-full text-sm";
      default:
        return "px-3 py-2 bg-muted text-muted-foreground rounded-full text-sm";
    }
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Who I Am and What I Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming businesses through innovative technology solutions and strategic leadership
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-primary mb-4">
                  Professional Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  As a Senior Business Leader at AI Wonders Professional and a Sr. Cybersecurity Consultant at Project Management Office Lead, 
                  I bring together deep technical expertise with strategic business acumen to drive digital transformation initiatives.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-muted rounded-lg" data-testid="stat-experience">
                  <div className="text-3xl font-bold text-primary mb-2">18+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-muted rounded-lg" data-testid="stat-projects">
                  <div className="text-3xl font-bold text-primary mb-2">70+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
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
