import { Award, ExternalLink } from "lucide-react";

export default function ProductHuntSection() {
  return (
    <section id="product-hunt" className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-yellow-400/20 border border-gold/30 text-gold mb-6 font-semibold text-sm">
            <Award className="h-4 w-4 mr-2" />
            Featured Products
          </div>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-gold rounded-xl shadow-lg">
              <Award className="h-8 w-8 text-professional" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Featured on Product Hunt
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-inter">
            Our innovative products have been recognized by the Product Hunt community, 
            showcasing cutting-edge solutions in AI, automation, and business tools.
          </p>
        </div>

        <div className="space-y-16">
          {/* QR Generator Pro */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">QR Generator Pro</h3>
                <p className="text-gray-300 mb-6 font-inter">
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
              <div className="professional-card p-4 achievement-highlight">
                <iframe 
                  style={{ border: "none" }} 
                  src="https://cards.producthunt.com/cards/products/1101960" 
                  width="500" 
                  height="405" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  title="QR Generator Pro Product Hunt Card"
                  className="rounded-lg max-w-full"
                />
              </div>
            </div>
          </div>

          {/* TrendSolver */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="professional-card p-4 achievement-highlight">
                <iframe 
                  style={{ border: "none" }} 
                  src="https://cards.producthunt.com/cards/products/1101749" 
                  width="500" 
                  height="405" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  title="TrendSolver Product Hunt Card"
                  className="rounded-lg max-w-full"
                />
              </div>
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
              <div className="professional-card p-4 achievement-highlight">
                <iframe 
                  style={{ border: "none" }} 
                  src="https://cards.producthunt.com/cards/products/1101945" 
                  width="500" 
                  height="405" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  title="FYPPAL Product Hunt Card"
                  className="rounded-lg max-w-full"
                />
              </div>
            </div>
          </div>

          {/* LangScribe */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 flex justify-center">
              <div className="professional-card p-4 achievement-highlight">
                <iframe 
                  style={{ border: "none" }} 
                  src="https://cards.producthunt.com/cards/products/1101355" 
                  width="500" 
                  height="405" 
                  frameBorder="0" 
                  scrolling="no" 
                  allowFullScreen
                  title="LangScribe Product Hunt Card"
                  className="rounded-lg max-w-full"
                />
              </div>
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
        <div className="text-center mt-16 relative z-10">
          <div className="professional-card bg-gradient-to-br from-gold-light/20 to-achievement-light/10 p-8 max-w-2xl mx-auto achievement-highlight">
            <h3 className="text-xl font-semibold premium-gradient mb-4">
              Explore Our Products
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out these innovative solutions and see how they can transform your business processes.
            </p>
            <a
              href="https://ruvab.it.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-gold text-professional px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
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