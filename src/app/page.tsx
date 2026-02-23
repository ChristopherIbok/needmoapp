import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ValuePropositions from "@/components/ValuePropositions";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  return (
    <ScrollRevealProvider>
      <div className="min-h-screen bg-white dark:bg-[#0F1419]">
        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main id="main-content" tabIndex={-1}>
          {/* Section 1: Hero */}
          <HeroSection />

          {/* Section 2: Value Propositions */}
          <ValuePropositions />

          {/* Section 3: Services */}
          <ServicesSection />

          {/* Section 4: Pricing */}
          <PricingSection />

          {/* Section 5: Testimonials */}
          <TestimonialsSection />

          {/* Section 6: Portfolio */}
          <PortfolioSection />

          {/* Section 7: About */}
          <AboutSection />

          {/* Section 8: Contact */}
          <ContactSection />
        </main>

        {/* Section 9: Footer */}
        <Footer />
      </div>
    </ScrollRevealProvider>
  );
}
