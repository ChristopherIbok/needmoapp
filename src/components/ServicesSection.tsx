"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    icon: "✏️",
    headline: "Content Creation",
    description:
      "Scroll-stopping visuals and copy designed to perform across every platform.",
    href: "#services",
  },
  {
    icon: "📱",
    headline: "Account Management",
    description:
      "Consistent posting, engagement, and community building — done for you.",
    href: "#services",
  },
  {
    icon: "📊",
    headline: "Paid Advertising",
    description:
      "Targeted campaigns that turn ad spend into measurable results.",
    href: "#services",
  },
  {
    icon: "💡",
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
        {/* Section Header */}
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
                {/* Icon */}
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                  style={{ background: "rgba(255, 107, 53, 0.12)" }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>

                {/* Headline */}
                <h3
                  className="font-bold text-[#1A2332] dark:text-white mb-3 text-[1.2rem] md:text-[1.3rem]"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.3rem",
                  }}
                >
                  {service.headline}
                </h3>

                {/* Description */}
                <p
                  className="text-[#666666] dark:text-[#B0B8C1] mb-6"
                  style={{ fontSize: "1rem", lineHeight: "1.7" }}
                >
                  {service.description}
                </p>

                {/* Link */}
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-1 font-semibold text-sm transition-all duration-200 hover:gap-2"
                  style={{ color: "#FF6B35" }}
                  aria-label={`Learn more about ${service.headline}`}
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center reveal">
          <button
            onClick={handleScrollToContact}
            className="btn-primary"
            aria-label="Book a free strategy call to discuss our services"
          >
            Book a Free Strategy Call
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
