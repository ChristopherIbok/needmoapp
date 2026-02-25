"use client";

import { useEffect, useRef } from "react";
import { PenTool, Users, BarChart3, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  {
    icon: PenTool,
    headline: "Content Creation",
    description:
      "Scroll-stopping visuals and copy designed to perform across every platform.",
    href: "#services",
  },
  {
    icon: Users,
    headline: "Account Management",
    description:
      "Consistent posting, engagement, and community building — done for you.",
    href: "#services",
  },
  {
    icon: BarChart3,
    headline: "Paid Advertising",
    description:
      "Targeted campaigns that turn ad spend into measurable results.",
    href: "#services",
  },
  {
    icon: Lightbulb,
    headline: "Strategy & Consulting",
    description:
      "Audits, roadmaps, and expert guidance to level up your social presence.",
    href: "#services",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".service-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our services"
      className="section-padding bg-white dark:bg-[#0F1419]"
    >
      <div className="container-custom">
        <div className="text-center mb-14 reveal">
          <span className="eyebrow">What We Do</span>
          <h2 className="section-heading">Our Services</h2>
          <p className="section-subheading mx-auto">
            End-to-end social media management tailored to your growth goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 md:gap-6 mb-12">
          {services.map((service, index) => (
            <article
              key={service.headline}
              className="service-card reveal group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className="service-card-inner h-full bg-white dark:bg-[#1E2830] border border-[#E0E0E0] dark:border-[#2A3540] rounded-xl p-[30px] md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 md:hover:-translate-y-2 cursor-pointer"
                role="article"
              >
                {/* Icon - Clean and professional */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#FF6B35] bg-[#FF6B35]/10 group-hover:bg-[#FF6B35] group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <service.icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="font-bold text-[#1A2332] dark:text-white mb-3 text-xl md:text-2xl">
                  {service.headline}
                </h3>

                <p className="text-[#666666] dark:text-[#B0B8C1] mb-6 leading-relaxed">
                  {service.description}
                </p>

                <button
                  onClick={handleScrollToContact}
                  className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 group/btn"
                  style={{ color: "#FF6B35" }}
                  aria-label={`Learn more about ${service.headline}`}
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center reveal">
          <button
            onClick={handleScrollToContact}
            className="btn-primary inline-flex items-center gap-2"
            aria-label="Book a free strategy call to discuss our services"
          >
            Book a Free Strategy Call
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
