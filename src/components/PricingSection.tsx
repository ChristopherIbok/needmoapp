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
  const { locationData, loading, convertPrice, setPreferredCurrency } =
    useLocation();
  const sectionRef = useRef<HTMLElement>(null);

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
        <div className="text-center mb-8 reveal relative">
          {/* Currency selector */}
          <div className="absolute right-0 top-0 hidden sm:block">
            <label htmlFor="currencySelector" className="sr-only">
              Currency
            </label>
            <select
              id="currencySelector"
              className="currency-select text-sm px-3 py-1.5 rounded border border-[#E0E0E0] dark:border-[#2A3540] bg-white dark:bg-[#1E2830] text-[#1A2332] dark:text-white"
              value={locationData.currency}
              onChange={(e) => setPreferredCurrency(e.target.value)}
              aria-label="Select currency"
            >
              {[
                "USD",
                "EUR",
                "GBP",
                "CAD",
                "AUD",
                "NGN",
                "KES",
                "JPY",
                "INR",
                "ZAR",
                "BRL",
                "MXN",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <span className="eyebrow">Transparent Pricing</span>
          <h2 className="section-heading">Choose Your Package</h2>
          <p className="section-subheading mx-auto mb-4">
            Flexible plans that grow with your business
          </p>
        </div>

        {/* Currency note */}
        <div className="text-center mb-6 reveal">
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

        {/* Pricing Cards - 2 per row, smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <article
              key={pkg.name}
              className={`pricing-card-item reveal ${
                pkg.featured ? "md:scale-105 z-10" : ""
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative h-full rounded-xl p-6 transition-all duration-300 ${
                  pkg.featured
                    ? "bg-white dark:bg-[#1E2830] border-2 border-[#FF6B35] shadow-xl"
                    : "bg-white dark:bg-[#1E2830] border border-[#E0E0E0] dark:border-[#2A3540] shadow-sm hover:border-[#FF6B35] hover:shadow-md"
                }`}
              >
                {/* Most Popular Badge */}
                {pkg.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm"
                    aria-label="Most popular package"
                  >
                    ⭐ Most Popular
                  </div>
                )}

                {/* Package Name */}
                <h3 className="font-bold text-[#1A2332] dark:text-white text-xl mb-1">
                  {pkg.name}
                </h3>

                {/* Target clients */}
                <p className="text-xs text-[#666666] dark:text-gray-400 mb-4 line-clamp-1">
                  {pkg.target}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="font-bold text-2xl text-[#1A2332] dark:text-white">
                      {loading ? "..." : convertPrice(pkg.priceUSD.low)}
                    </span>
                    <span className="text-[#666666] dark:text-gray-400 text-xs">
                      –
                    </span>
                    <span className="font-bold text-2xl text-[#1A2332] dark:text-white">
                      {loading ? "" : convertPrice(pkg.priceUSD.high)}
                    </span>
                    <span className="text-[#666666] dark:text-gray-400 text-xs">
                      /mo
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="h-px bg-[#E0E0E0] dark:bg-[#2A3540] my-4"
                  aria-hidden="true"
                />

                {/* Features - compact list */}
                <ul
                  className="space-y-2 mb-5"
                  aria-label={`${pkg.name} package features`}
                >
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        className="flex-shrink-0 text-[#FF6B35] font-bold text-sm"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-sm text-[#333333] dark:text-[#B0B8C1]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={handleScrollToContact}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    pkg.featured
                      ? "bg-[#FF6B35] text-white hover:bg-[#E55A2B] shadow-md"
                      : "bg-[#FF6B35] text-white hover:bg-[#E55A2B]"
                  }`}
                  aria-label={`Get started with ${pkg.name} package`}
                >
                  {pkg.cta}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10 reveal">
          <p className="text-sm text-[#666666] dark:text-gray-400 mb-2">
            Custom packages available. Let&apos;s build something that fits your
            needs.
          </p>
          <button
            onClick={handleScrollToContact}
            className="text-sm font-semibold underline underline-offset-4 transition-colors duration-200 hover:text-[#FF6B35]"
            style={{ color: "#FF6B35" }}
          >
            Contact us for custom pricing
          </button>
        </div>
      </div>
    </section>
  );
}
