export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Praful Lichade",
      title: "Founder and CEO, Pragmatyc",
      content: "I've witnessed Vaibhav's incredible journey at Pragmatyc, from Associate BA to successfully establishing and managing the PMO function. He's a proactive leader who excels in initiating processes, defining strategies, and ensuring operational adherence. In his previous role as a Senior Business Analyst, Vaibhav's probing skills and meticulous documentation made significant contributions to our projects. He's a true asset, consistently driving success from inception.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Vikrant Salpekar",
      title: "Co-founder and Director, RightZero Solutions Pvt. Ltd.",
      content: "I had the privilege of collaborating with Vaibhav and I am consistently impressed by his focused and straightforward approach. His exceptional strategic planning skills were evident in every task we worked on together. What truly sets Vaibhav apart is his keen eye for details. Vaibhav meticulously analyzes each aspect of our initiatives, ensuring nothing is overlooked. His dedication to precision greatly contributes to our team's achievements. I wholeheartedly endorse Vaibhav for his exceptional ability to combine strategic thinking with an unwavering attention to detail.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150",
    },
    {
      name: "Aaswad Waghmare",
      title: "Senior Delivery Manager - Projects & Programs | Product Engineering & Implementations | Agile Leader | Coach & Mentor",
      content: "Vaibhav is very focused professional who makes sure that the given tasks are being executed no matter what. When it comes to following processes he is very particular at it, if not being followed, help others understand the consequences in the most effective manner. He is a firm believer of giving the best in any given situation and it was evident from the results he produced at MAXIMESS. I wish him all the best for PMO journey!",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
