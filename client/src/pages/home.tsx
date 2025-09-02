import NavigationHeader from "@/components/portfolio/navigation-header";
import HeroSection from "@/components/portfolio/hero-section";
import AboutSection from "@/components/portfolio/about-section";
import ExperienceSection from "@/components/portfolio/experience-section";
import CertificationsSection from "@/components/portfolio/certifications-section";
import ProjectsSection from "@/components/portfolio/projects-section";
import SkillsSection from "@/components/portfolio/skills-section";
import SocialLinksSection from "@/components/portfolio/social-links-section";
import AffiliatePartnersSection from "@/components/portfolio/affiliate-partners-section";
import ProductHuntSection from "@/components/portfolio/product-hunt-section";
import YouTubeVideosSection from "@/components/portfolio/youtube-videos-section";
import TestimonialsSection from "@/components/portfolio/testimonials-section";
import BlogSection from "@/components/blog/blog-section";
import CommunitySection from "@/components/community/community-section";
import ContactSection from "@/components/contact/contact-section";
import Footer from "@/components/portfolio/footer";
import BlogPostModal from "@/components/blog/blog-post-modal";
import { FloatingReplitButton } from "@/components/replit-referral-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <ProjectsSection />
        <SkillsSection />
        <SocialLinksSection />
        <AffiliatePartnersSection />
        <ProductHuntSection />
        <YouTubeVideosSection />
        <TestimonialsSection />
        <BlogSection />
        <CommunitySection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingReplitButton />
      <BlogPostModal />
    </div>
  );
}
