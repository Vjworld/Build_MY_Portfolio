import { Building, Shield, Rocket, Cog } from "lucide-react";

export default function ExperienceSection() {
  const companies = [
    {
      name: "AI Wonders",
      role: "Senior Business Leader",
      icon: Building,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: "PMO Consulting",
      role: "Cybersecurity Consultant",
      icon: Shield,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      name: "RIGHTZERO",
      role: "Founder/Director",
      icon: Rocket,
      iconColor: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      name: "PRAGMATYC",
      role: "Senior Consultant",
      icon: Cog,
      iconColor: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-muted-foreground">
            I'm fortunate to have worked with these companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {companies.map((company, index) => {
            const IconComponent = company.icon;
            return (
              <div 
                key={index} 
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                data-testid={`company-${company.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`w-16 h-16 ${company.bgColor} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <IconComponent className={`${company.iconColor} h-8 w-8`} />
                </div>
                <h4 className="font-semibold text-foreground text-company-name">
                  {company.name}
                </h4>
                <p className="text-sm text-muted-foreground text-company-role">
                  {company.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
