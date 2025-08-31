import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Send } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Message Sent",
        description: "Thank you for your message! I'll get back to you soon.",
      });
    },
    onError: (error) => {
      console.error("Error sending contact message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vaibhav.selukar@gmail.com",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 880 555 5263",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Nagpur, Maharashtra, India",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "#",
      bgColor: "bg-primary",
      hoverColor: "hover:bg-primary/90",
    },
    {
      icon: Twitter,
      href: "#",
      bgColor: "bg-secondary",
      hoverColor: "hover:bg-secondary/90",
    },
    {
      icon: Github,
      href: "#",
      bgColor: "bg-accent",
      hoverColor: "hover:bg-accent/90",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">
            Wanna Get in Touch
          </h2>
          <h3 className="text-6xl font-playfair font-bold text-muted-foreground/20 mb-8">
            Contact Us
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-primary mb-6">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Ready to discuss your next project or explore collaboration opportunities? 
                  I'm always excited to connect with fellow innovators and forward-thinking organizations.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center space-x-4" data-testid={`contact-info-${info.label.toLowerCase()}`}>
                      <div className={`w-12 h-12 ${info.bgColor} rounded-lg flex items-center justify-center`}>
                        <IconComponent className={`${info.iconColor} h-5 w-5`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.label}</h4>
                        <p className="text-muted-foreground text-contact-value">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href} 
                      className={`w-12 h-12 ${social.bgColor} text-white rounded-lg flex items-center justify-center ${social.hoverColor} transition-colors`}
                      data-testid={`link-social-${index}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-inter font-semibold text-primary mb-6">
                  Send a Message
                </h3>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        {...form.register("name")}
                        className="w-full"
                        data-testid="input-name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        {...form.register("email")}
                        className="w-full"
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Project consultation"
                      {...form.register("subject")}
                      className="w-full"
                      data-testid="input-subject"
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell me about your project..."
                      {...form.register("message")}
                      className="w-full resize-none"
                      data-testid="textarea-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
