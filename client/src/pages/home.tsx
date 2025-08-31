import NavigationHeader from "@/components/portfolio/navigation-header";
import HeroSection from "@/components/portfolio/hero-section";
import AboutSection from "@/components/portfolio/about-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import TestimonialsSection from "@/components/portfolio/testimonials-section";
import BlogSection from "@/components/blog/blog-section";
import CommunitySection from "@/components/community/community-section";
import ContactSection from "@/components/contact/contact-section";
import Footer from "@/components/portfolio/footer";
import BlogPostModal from "@/components/blog/blog-post-modal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TestimonialsSection />
        <BlogSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
      <BlogPostModal />
    </div>
  );
}
