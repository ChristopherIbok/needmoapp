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
      {/* Remove background color from here - let each section handle its own */}
      <div className="min-h-screen">
        {/* Navigation - fixed header, no background needed here */}
        <Navigation />

        {/* Main content - add scroll margin for header offset */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          {/* Section 1: Hero - handles its own background */}
          <HeroSection />

          {/* Section 2: Value Propositions - handles its own background */}
          <ValuePropositions />

          {/* Section 3: Services - handles its own background */}
          <ServicesSection />

          {/* Section 4: Pricing - handles its own background */}
          <PricingSection />

          {/* Section 5: Testimonials - handles its own background */}
          <TestimonialsSection />

          {/* Section 6: Portfolio - handles its own background */}
          <PortfolioSection />

          {/* Section 7: About - handles its own background */}
          <AboutSection />

          {/* Section 8: Contact - handles its own background */}
          <ContactSection />
        </main>

        {/* Section 9: Footer - handles its own background */}
        <Footer />
      </div>
    </ScrollRevealProvider>
  );
}
