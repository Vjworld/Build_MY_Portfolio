export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      title: "Founder and CEO, TechVenture",
      content: "We employed Vaibhav's consulting services at TechVenture, and collectively M.E is outstanding understanding and managing our PMO structure. His excellence technical and business leadership capabilities have been one of our core reasons for impressive success.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Sarah Chen",
      title: "CTO, InnovateSolutions",
      content: "Vaibhav's strategic thinking and technical expertise have been instrumental in our digital transformation journey. His ability to translate complex technical concepts into actionable business strategies is remarkable.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            What My Colleagues Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Feedback from industry professionals and collaborators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-2xl p-8"
              data-testid={`testimonial-${testimonial.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <img 
                  src={testimonial.avatar}
                  alt={`${testimonial.name} professional headshot`}
                  className="w-16 h-16 rounded-full object-cover" 
                  data-testid={`img-testimonial-${index}`}
                />
                <div>
                  <h4 className="font-semibold text-foreground text-testimonial-name">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground text-testimonial-title">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <blockquote className="text-muted-foreground italic leading-relaxed text-testimonial-content">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
