"use client";

import { useEffect, useRef, useState } from "react";
import {
  PenTool,
  Users,
  TrendingUp,
  Compass,
  Award,
  Star,
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react";

const coreValues = [
  { text: "Results Over Vanity", icon: Target },
  { text: "Strategic Creativity", icon: Compass },
  { text: "Client Partnership", icon: Users },
];

const stats = [
  { value: 500, suffix: "+", label: "Posts Created", icon: PenTool },
  { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 3, suffix: "M+", label: "People Reached", icon: TrendingUp },
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
            <div className="about-reveal reveal-left space-y-6">
              <span className="eyebrow flex items-center gap-2">
                <Award size={16} className="text-[#FF6B35]" />
                Who We Are
              </span>

              <h2
                className="about-headline font-black text-[#1A2332] dark:text-white"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
                  lineHeight: "1.2",
                }}
              >
                Built for Brands That{" "}
                <span className="text-[#FF6B35]">Refuse to Settle</span>
              </h2>

              <div className="space-y-4">
                <p
                  className="about-text text-[#333333] dark:text-[#E0E0E0] leading-relaxed"
                  style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
                >
                  NEEDMO CONSULT is a results-driven social media agency for
                  businesses, creators, and brands that know they deserve more.
                  We don&apos;t believe in vanity metrics. We believe in
                  strategy, creativity, and consistency — and we measure success
                  by the results we deliver.
                </p>

                <p
                  className="about-text text-[#333333] dark:text-[#E0E0E0] leading-relaxed"
                  style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
                >
                  Whether you&apos;re a local business building your first
                  social presence or an established brand scaling to new
                  platforms, we&apos;re here to help you show up online with
                  confidence, clarity, and content that actually converts.
                </p>
              </div>

              {/* Core Values - with icons */}
              <div
                className="about-values flex flex-wrap gap-3"
                role="list"
                aria-label="Core values"
              >
                {coreValues.map((value) => {
                  const Icon = value.icon;
                  return (
                    <span
                      key={value.text}
                      role="listitem"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{
                        backgroundColor: "#1A2332",
                      }}
                    >
                      <Icon size={14} className="text-[#FF6B35]" />
                      {value.text}
                    </span>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 font-semibold text-[#FF6B35] hover:gap-3 transition-all duration-200 group"
                aria-label="Work with NEEDMO CONSULT"
              >
                Work With Us
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Right side - Visual */}
          <div className="about-visual flex-shrink-0 lg:w-[45%] w-full max-w-md lg:max-w-none">
            <div className="about-reveal reveal-right">
              {/* Stats visualization - Minimal and clean */}
              <div
                ref={statsRef}
                className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-[#1E2830] border border-[#E0E0E0] dark:border-[#2A3540]"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#E0E0E0] dark:border-[#2A3540]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(255, 107, 53, 0.1)" }}
                    >
                      <BarChart3 size={20} className="text-[#FF6B35]" />
                    </div>
                    <div>
                      <div
                        className="font-semibold text-[#1A2332] dark:text-white"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        Performance Dashboard
                      </div>
                      <div className="text-sm text-[#666666] dark:text-gray-400">
                        Real-time metrics
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6 space-y-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(255, 107, 53, 0.1)" }}
                          >
                            <Icon size={18} className="text-[#FF6B35]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm text-[#666666] dark:text-gray-400">
                                {stat.label}
                              </span>
                              <span
                                className="font-bold text-[#1A2332] dark:text-white"
                                style={{
                                  fontFamily: "'Montserrat', sans-serif",
                                  fontSize: "1.25rem",
                                }}
                                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                              >
                                {Math.floor(
                                  counterValues[index]
                                ).toLocaleString()}
                                {stat.suffix}
                              </span>
                            </div>
                            {/* Progress bar - minimal */}
                            <div className="mt-2 h-1 bg-[#E0E0E0] dark:bg-[#2A3540] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-2000"
                                style={{
                                  backgroundColor: "#FF6B35",
                                  width: countersStarted
                                    ? `${
                                        (counterValues[index] / stat.value) *
                                        100
                                      }%`
                                    : "0%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer - Trust badge */}
                <div className="p-6 border-t border-[#E0E0E0] dark:border-[#2A3540]">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-[#FF6B35]/10 border-2 border-white dark:border-[#1E2830] flex items-center justify-center"
                        >
                          <Star size={12} className="text-[#FF6B35]" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#1A2332] dark:text-white">
                        Trusted by 50+ brands
                      </div>
                      <div className="text-xs text-[#666666] dark:text-gray-400 flex items-center gap-1">
                        <span className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={10}
                              className="text-[#FF6B35] fill-[#FF6B35]"
                            />
                          ))}
                        </span>
                        5.0 satisfaction rating
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
