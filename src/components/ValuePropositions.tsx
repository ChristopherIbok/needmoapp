"use client";

import { useEffect, useRef } from "react";
import { Compass, TrendingUp, Briefcase } from "lucide-react";

const values = [
  {
    icon: Compass,
    headline: "Strategy-Led",
    description:
      "We don't just post content. We build custom plans tailored to your audience, platform, and goals.",
    delay: "0ms",
  },
  {
    icon: TrendingUp,
    headline: "Growth-Focused",
    description:
      "Everything we do ties to measurable outcomes — engagement, leads, sales, and ROI.",
    delay: "200ms",
  },
  {
    icon: Briefcase,
    headline: "Full-Service",
    description:
      "From content creation to paid ads and account management — we handle it all so you don't have to.",
    delay: "400ms",
  },
];

export default function ValuePropositions() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".value-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Value propositions"
      className="section-padding"
      style={{
        backgroundColor: "#F7F7F7",
      }}
    >
      {/* Dark mode background */}
      <style>{`
        @media (prefers-color-scheme: dark) {
          .value-section-bg { background-color: #1A2332 !important; }
        }
        .dark .value-section-bg { background-color: #1A2332 !important; }
      `}</style>

      <div
        className="value-section-bg section-padding -mt-[80px] -mb-[80px] pt-[80px] pb-[80px]"
        style={{ backgroundColor: "#F7F7F7" }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div
                key={value.headline}
                className="value-item reveal text-center md:text-left group"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Icon with hover effect */}
                <div
                  className="value-icon reveal-scale inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 text-[#FF6B35] bg-[#FF6B35]/10 group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300"
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                  aria-hidden="true"
                >
                  <value.icon size={32} strokeWidth={1.5} />
                </div>

                {/* Headline */}
                <h3 className="value-headline font-bold text-[#1A2332] dark:text-white mb-4 text-2xl">
                  {value.headline}
                </h3>

                {/* Description */}
                <p className="value-text text-[#333333] dark:text-[#E0E0E0] mx-auto md:mx-0 leading-relaxed">
                  {value.description}
                </p>

                {/* Decorative line - animated on hover */}
                <div
                  className="mt-6 h-1 w-12 rounded-full mx-auto md:mx-0 transition-all duration-300 group-hover:w-20"
                  style={{ backgroundColor: "#FF6B35" }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
