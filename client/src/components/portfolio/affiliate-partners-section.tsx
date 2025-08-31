import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const affiliatePartners = [
  {
    name: "Replit",
    description: "Replit turns your ideas into apps, fast.",
    url: "https://replit.com/refer/vjvaibhu",
    category: "Development"
  },
  {
    name: "Namecheap",
    description: "Easiest Domain setup tool for anyone. My Go-To for Domains and Hosting!",
    url: "https://www.namecheap.com/",
    category: "Hosting"
  },
  {
    name: "Razorpay Payments",
    description: "Effortless Payments, Powerful Results!",
    url: "https://rzp.io/rzp/JADb7Mz",
    category: "Payments"
  },
  {
    name: "Sendgrid",
    description: "The trusted platform for delivering your emails, reliably and at scale.",
    url: "https://sendgrid.com/en-us?ref=ruvab",
    category: "Email"
  },
  {
    name: "Zoho",
    description: "Your business, simplified with a single suite of powerful tools.",
    url: "https://go.zoho.com/vJp",
    category: "Business"
  },
  {
    name: "NEWSNOWAPI",
    description: "Breaking news from every source, instantly.",
    url: "https://rapidapi.com/newsnow/api/newsnow?ref=ruvab",
    category: "API"
  },
  {
    name: "NEWSAPI",
    description: "The fastest way to get global headlines and news data.",
    url: "https://newsapi.ai/?referral=d3a6f77249054b37942a5d9a9db36ad9",
    category: "API"
  },
  {
    name: "Fiverr Marketplace",
    description: "The global marketplace for freelance services, starting at just five dollars.",
    url: "https://go.fiverr.com/visit/?bta=1141546&brand=fiverrmarketplace",
    category: "Freelance"
  },
  {
    name: "Fiverr Pro",
    description: "Premium freelance services for professional projects.",
    url: "https://go.fiverr.com/visit/?bta=1141546&brand=fp",
    category: "Freelance"
  },
  {
    name: "Logo Maker",
    description: "Professional logo design made simple.",
    url: "https://go.fiverr.com/visit/?bta=1141546&brand=logomaker",
    category: "Design"
  },
  {
    name: "Fiverr Affiliates",
    description: "Join the Fiverr affiliate program.",
    url: "https://go.fiverr.com/visit/?bta=1141546&brand=fiverraffiliates",
    category: "Affiliate"
  },
  {
    name: "Canva",
    description: "Design anything, publish anywhere, with zero effort.",
    url: "https://www.canva.com/join/xtb-zqc-cqc",
    category: "Design"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Development":
      return "bg-gradient-to-r from-blue-500 to-cyan-500";
    case "Hosting":
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    case "Payments":
      return "bg-gradient-to-r from-purple-500 to-pink-500";
    case "Email":
      return "bg-gradient-to-r from-red-500 to-orange-500";
    case "Business":
      return "bg-gradient-to-r from-indigo-500 to-purple-500";
    case "API":
      return "bg-gradient-to-r from-yellow-500 to-orange-500";
    case "Freelance":
      return "bg-gradient-to-r from-teal-500 to-green-500";
    case "Design":
      return "bg-gradient-to-r from-pink-500 to-rose-500";
    case "Affiliate":
      return "bg-gradient-to-r from-amber-500 to-yellow-500";
    default:
      return "bg-gradient-to-r from-gray-500 to-slate-500";
  }
};

export default function AffiliatePartnersSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-background via-primary/3 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="gradient-text text-5xl lg:text-6xl font-playfair font-bold mb-6">
            Affiliate Partners
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-inter">
            Trusted tools and services I use and recommend for building amazing digital experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {affiliatePartners.map((partner, index) => (
            <Card 
              key={index} 
              className="card-elevated group hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => window.open(partner.url, '_blank')}
              data-testid={`affiliate-card-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${getCategoryColor(partner.category)}`}>
                      {partner.category}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {partner.name}
                    </h3>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {partner.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center text-accent font-medium text-sm group-hover:underline">
                    <span>Visit Partner</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full card-modern border border-accent/30 text-accent font-bold text-sm backdrop-blur-xl">
            <span className="mr-2">💼</span>
            Affiliate Disclosure: Some links may earn commission at no extra cost to you
          </div>
        </div>
      </div>
    </section>
  );
}