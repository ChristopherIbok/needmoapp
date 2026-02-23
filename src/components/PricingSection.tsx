"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/hooks/useLocation";

const packages = [
  {
    name: "Starter",
    target: "Local businesses, Emerging creators",
    priceUSD: { low: 400, high: 600 },
    features: [
      "8-12 posts per month",
      "1 platform managed",
      "Basic engagement monitoring",
      "Monthly analytics report",
      "Content calendar",
      "Hashtag strategy",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Growth",
    target: "E-commerce, Growing startups, Mid-tier creators",
    priceUSD: { low: 900, high: 1400 },
    features: [
      "16-20 posts per month",
      "2-3 platforms managed",
      "Full engagement + DM management",
      "Bi-weekly reports + strategy call",
      "Content planning & scheduling",
      "Performance optimization",
    ],
    featured: false,
    cta: "Get Started",
  },
  {
    name: "Premium",
    target: "Established brands, Influencers",
    priceUSD: { low: 2000, high: 3000 },
    features: [
      "24-30 posts per month",
      "3-4 platforms managed",
      "Full management + community",
      "Weekly reports + strategy sessions",
      "Paid ad campaigns included",
      "Brand partnership support",
    ],
    featured: true,
    cta: "Get Started",
  },
  {
    name: "Premium Plus",
    target: "Enterprise, Top-tier influencers",
    priceUSD: { low: 3500, high: 4500 },
    features: [
      "40 posts per month",
      "5 platforms managed",
      "Dedicated account manager",
      "Advanced ads + influencer outreach",
      "Reputation monitoring",
      "Priority 24/7 support",
    ],
    featured: false,
    cta: "Get Started",
  },
];

export default function PricingSection() {
  const { locationData, loading, convertPrice } = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".pricing-card-item");
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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>(".pricing-card");
      if (!card) return;
      const gap = 20;
      const full = card.offsetWidth + gap;
      const idx = Math.round(el.scrollLeft / full);
      setActiveIndex(Math.max(0, Math.min(packages.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true } as any);
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".pricing-card");
    if (!card) return;
    const gap = 20;
    const full = card.offsetWidth + gap;
    el.scrollTo({ left: idx * full, behavior: "smooth" });
  };

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-label="Pricing packages"
      className="section-padding bg-[#F7F7F7] dark:bg-[#1A2332]"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-4 reveal">
          <span className="eyebrow">Transparent Pricing</span>
          <h2 className="section-heading">Choose Your Package</h2>
          <p className="section-subheading mx-auto mb-4">
            Flexible plans that grow with your business
          </p>
        </div>

        <div className="text-center mb-4 reveal">
          <span
            className="text-sm italic text-[#666666] dark:text-gray-400"
            aria-live="polite"
          >
            {loading
              ? "Loading pricing..."
              : locationData.currency === "USD"
              ? "Prices shown in USD"
              : `Prices shown in ${locationData.currency} (converted from USD)`}
          </span>
        </div>

        {/* Pricing Cards */}
        <div
          ref={scrollRef}
          className="pricing-container items-start"
        >
          {packages.map((pkg, index) => (
            <article
              key={pkg.name}
              className={`pricing-card pricing-card-item reveal ${pkg.featured ? "pricing-featured" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative h-full rounded-2xl p-[30px] md:p-8 transition-all duration-300 ${
                  pkg.featured
                    ? "bg-white dark:bg-[#1E2830] border-2 border-[#FF6B35] shadow-2xl"
                    : "bg-white dark:bg-[#1E2830] border-2 border-[#E0E0E0] dark:border-[#2A3540] shadow-md hover:border-[#FF6B35] hover:shadow-xl"
                }`}
              >
                {/* Most Popular Badge */}
                {pkg.featured && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-orange text-xs font-bold tracking-wider whitespace-nowrap"
                    aria-label="Most popular package"
                  >
                    ⭐ Most Popular
                  </div>
                )}

                {/* Package Name */}
                <h3
                  className="font-bold text-[#1A2332] dark:text-white mb-1"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1.4rem",
                  }}
                >
                  {pkg.name}
                </h3>

                {/* Target clients */}
                <p
                  className="text-sm italic text-[#666666] dark:text-gray-400 mb-6"
                  style={{ fontSize: "0.85rem" }}
                >
                  {pkg.target}
                </p>

                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-black text-[#1A2332] dark:text-white"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "2.5rem",
                      }}
                    >
                      {loading ? "..." : convertPrice(pkg.priceUSD.low)}
                    </span>
                    <span className="text-[#666666] dark:text-gray-400 text-sm">/mo</span>
                  </div>
                  <p className="text-sm text-[#666666] dark:text-gray-400">
                    {loading
                      ? ""
                      : `or ${convertPrice(pkg.priceUSD.low)}–${convertPrice(pkg.priceUSD.high)}/mo`}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E0E0E0] dark:bg-[#2A3540] my-6" aria-hidden="true" />

                {/* Features */}
                <ul className="space-y-3 mb-8" aria-label={`${pkg.name} package features`}>
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-0.5 font-bold"
                        style={{ color: "#FF6B35" }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span
                        className="text-[#333333] dark:text-[#B0B8C1]"
                        style={{ fontSize: "0.95rem", lineHeight: "1.5" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={handleScrollToContact}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                    pkg.featured
                      ? "bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-lg"
                      : "bg-[#FF6B35] text-white hover:bg-[#E55A2B]"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  aria-label={`Get started with ${pkg.name} package`}
                >
                  {pkg.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="pricing-dots md:hidden mt-3 flex justify-center gap-2">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`View package ${i + 1}`}
              className={`dot ${activeIndex === i ? "active" : ""}`}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10 reveal">
          <p className="text-[#666666] dark:text-gray-400 mb-2">
            Custom packages available. Let&apos;s build something that fits your needs.
          </p>
          <button
            onClick={handleScrollToContact}
            className="font-semibold underline underline-offset-4 transition-colors duration-200 hover:opacity-80"
            style={{ color: "#FF6B35" }}
          >
            Contact us for custom pricing
          </button>
        </div>
      </div>
    </section>
  );
}
