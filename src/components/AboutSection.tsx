"use client";

import { useEffect, useRef, useState } from "react";

const coreValues = [
  "Results Over Vanity",
  "Strategic Creativity",
  "Client Partnership",
];

const stats = [
  { value: 500, suffix: "+", label: "Posts Created", icon: "✏️" },
  { value: 50, suffix: "+", label: "Happy Clients", icon: "🤝" },
  { value: 3, suffix: "M+", label: "People Reached", icon: "📈" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".about-reveal");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("visible");
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            stats.forEach((stat, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = stat.value / steps;
              let step = 0;

              const timer = setInterval(() => {
                step++;
                const current = Math.min(increment * step, stat.value);
                setCounterValues((prev) => {
                  const next = [...prev];
                  next[index] = current;
                  return next;
                });
                if (step >= steps) clearInterval(timer);
              }, duration / steps);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About NEEDMO CONSULT"
      className="section-padding bg-[#F7F7F7] dark:bg-[#1A2332]"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left side - Text */}
          <div className="flex-1 lg:max-w-[55%]">
            <div className="about-reveal reveal-left">
              <span className="eyebrow">Who We Are</span>
              <h2
                className="about-headline font-black text-[#1A2332] dark:text-white mb-6 text-center lg:text-left"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                  lineHeight: "1.2",
                }}
              >
                Built for Brands That{" "}
                <span style={{ color: "#FF6B35" }}>Refuse to Settle</span>
              </h2>

              <p
                className="about-text text-[#333333] dark:text-[#E0E0E0] mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
              >
                NEEDMO CONSULT is a results-driven social media agency for businesses, creators, and brands that know they deserve more. We don&apos;t believe in vanity metrics. We believe in strategy, creativity, and consistency — and we measure success by the results we deliver.
              </p>

              <p
                className="about-text text-[#333333] dark:text-[#E0E0E0] mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
              >
                Whether you&apos;re a local business building your first social presence or an established brand scaling to new platforms, we&apos;re here to help you show up online with confidence, clarity, and content that actually converts.
              </p>

              {/* Core Values */}
              <div className="about-values flex flex-wrap gap-3 mb-8" role="list" aria-label="Core values">
                {coreValues.map((value) => (
                  <span
                    key={value}
                    role="listitem"
                    className="px-4 py-2 rounded-full text-white text-sm font-semibold"
                    style={{
                      backgroundColor: "#1A2332",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {value}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 font-semibold text-[#FF6B35] hover:opacity-80 transition-opacity duration-200 underline underline-offset-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
                aria-label="Learn more about NEEDMO CONSULT"
              >
                Work With Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="about-visual flex-shrink-0 lg:w-[45%] w-full max-w-md lg:max-w-none">
            <div className="about-reveal reveal-right">
              {/* Stats visualization */}
              <div
                ref={statsRef}
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(135deg, #1A2332 0%, #2A3F5F 100%)" }}
              >
                {/* Header */}
                <div className="p-8 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "rgba(255, 107, 53, 0.2)" }}
                      aria-hidden="true"
                    >
                      🚀
                    </div>
                    <div>
                      <div
                        className="font-black text-white text-lg"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        NEEDMO CONSULT
                      </div>
                      <div className="text-gray-400 text-sm">Performance Dashboard</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-8 grid grid-cols-1 gap-6">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: "rgba(255, 107, 53, 0.15)" }}
                        aria-hidden="true"
                      >
                        {stat.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-1 mb-1">
                          <span
                            className="font-black text-white"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              fontSize: "2rem",
                            }}
                            aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                          >
                            {Math.floor(counterValues[index]).toLocaleString()}{stat.suffix}
                          </span>
                        </div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                        {/* Progress bar */}
                        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-2000"
                            style={{
                              backgroundColor: "#FF6B35",
                              width: countersStarted ? "100%" : "0%",
                              transition: "width 2s ease-out",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-8 pb-8">
                  <div
                    className="rounded-xl p-4 flex items-center gap-3"
                    style={{ background: "rgba(255, 107, 53, 0.15)" }}
                  >
                    <span className="text-2xl" aria-hidden="true">⭐</span>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Trusted by 50+ brands worldwide
                      </div>
                      <div className="text-gray-400 text-xs">
                        Average 5.0 client satisfaction rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
