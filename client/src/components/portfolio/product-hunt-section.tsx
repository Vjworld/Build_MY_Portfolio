import { Award, ExternalLink } from "lucide-react";

export default function ProductHuntSection() {
  return (
    <section id="product-hunt" className="py-20 bg-gradient-to-br from-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured on Product Hunt
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our innovative products have been recognized by the Product Hunt community, 
            showcasing cutting-edge solutions in AI, automation, and business tools.
          </p>
        </div>

        <div className="space-y-16">
          {/* QR Generator Pro */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">QR Generator Pro</h3>
                <p className="text-muted-foreground mb-6">
                  Create and share QR codes instantly with our professional QR code generator. 
                  Advanced customization options, bulk generation, and analytics tracking.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a 
                    href="https://www.producthunt.com/products/qr-generator-pro-by-ruvab-it?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-qr-generator-pro-by-ruvab-it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-product-hunt-qr-generator"
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009570&theme=light&t=1756628251566" 
                      alt="QR Generator Pro by Ruvab IT - Create & share qr codes instantly | Product Hunt" 
                      className="w-[250px] h-[54px]" 
                      width="250" 
                      height="54" 
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <iframe 
                style={{ border: "none" }} 
                src="https://cards.producthunt.com/cards/products/1101960" 
                width="500" 
                height="405" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                title="QR Generator Pro Product Hunt Card"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          </div>

          {/* TrendSolver */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <iframe 
                style={{ border: "none" }} 
                src="https://cards.producthunt.com/cards/products/1101749" 
                width="500" 
                height="405" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                title="TrendSolver Product Hunt Card"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">TrendSolver</h3>
                <p className="text-muted-foreground mb-6">
                  Your data, your insights, your success. AI-powered trend analysis platform 
                  that turns market trends into actionable business intelligence.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a 
                    href="https://www.producthunt.com/products/trendsolver?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-trendsolver" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-product-hunt-trendsolver"
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009331&theme=light&t=1756628382359" 
                      alt="TrendSolver - Trend Solver: Your data, your insights, your success. | Product Hunt" 
                      className="w-[250px] h-[54px]" 
                      width="250" 
                      height="54" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FYPPAL */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">FYPPAL</h3>
                <p className="text-muted-foreground mb-6">
                  Find Your Purpose Passion And Leap. Transform your IT experience into 
                  freelance opportunities with personalized micro-niche gig plans and professional resume reviews.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a 
                    href="https://www.producthunt.com/products/fyppal?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-fyppal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-product-hunt-fyppal"
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009554&theme=light&t=1756628436919" 
                      alt="FYPPAL - Find Your Purpose Passion And Leap | Product Hunt" 
                      className="w-[250px] h-[54px]" 
                      width="250" 
                      height="54" 
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <iframe 
                style={{ border: "none" }} 
                src="https://cards.producthunt.com/cards/products/1101945" 
                width="500" 
                height="405" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                title="FYPPAL Product Hunt Card"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
          </div>

          {/* LangScribe */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <iframe 
                style={{ border: "none" }} 
                src="https://cards.producthunt.com/cards/products/1101355" 
                width="500" 
                height="405" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen
                title="LangScribe Product Hunt Card"
                className="rounded-lg shadow-lg max-w-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">LangScribe</h3>
                <p className="text-muted-foreground mb-6">
                  AI Powered writing assistant transforming content creation! Intelligent content 
                  creation platform with natural language processing and SEO optimization.
                </p>
                <div className="flex justify-center md:justify-start">
                  <a 
                    href="https://www.producthunt.com/products/langscribe?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-langscribe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid="link-product-hunt-langscribe"
                  >
                    <img 
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1008936&theme=light&t=1756628483127" 
                      alt="LangScribe - AI Powered writing assistant transforming content creation! | Product Hunt" 
                      className="w-[250px] h-[54px]" 
                      width="250" 
                      height="54" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Explore Our Products
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out these innovative solutions and see how they can transform your business processes.
            </p>
            <a
              href="https://ruvab.it.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-visit-ruvab"
            >
              Visit Ruvab IT
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}