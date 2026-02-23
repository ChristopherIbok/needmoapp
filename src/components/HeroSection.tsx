"use client";

import { useEffect, useState } from "react";
import { useLocation } from "@/hooks/useLocation";

export default function HeroSection() {
  const { locationData, loading } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative min-h-screen md:min-h-screen flex items-center overflow-hidden grid-pattern"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%)",
        minHeight: "100svh",
      }}
    >
      {/* Dark mode background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "linear-gradient(180deg, #0F1419 0%, #1A2332 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 -left-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #1A2332 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-custom relative z-10 w-full pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text content (60%) */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left">
            {/* Location-aware text */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "0ms" }}
            >
              <span
                className="inline-block text-[0.9rem] font-semibold uppercase tracking-[2px] mb-6"
                style={{ color: "#FF6B35" }}
                aria-live="polite"
              >
                {loading ? "Serving clients worldwide" : `Serving clients in ${locationData.region} and beyond`}
              </span>
            </div>

            {/* H1 Headline */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <h1
                className="font-black leading-tight mb-6 text-[#1A2332] dark:text-white"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                }}
              >
                Your Brand{" "}
                <span style={{ color: "#FF6B35" }}>Deserves</span>{" "}
                More.
              </h1>
            </div>

            {/* Subheadline */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <p
                className="text-[#333333] dark:text-[#E0E0E0] mb-8 max-w-2xl mx-auto lg:mx-0"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  lineHeight: "1.7",
                }}
              >
                NEEDMO CONSULT is a strategic social media agency helping businesses, creators, and brands turn their online presence into real growth — with content that performs, strategies that work, and results you can measure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <button
                onClick={handleScrollToContact}
                className="btn-primary text-base"
                aria-label="Book a free strategy call with NEEDMO CONSULT"
              >
                Book a Free Strategy Call
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={handleScrollToServices}
                className="btn-secondary text-base"
                aria-label="See our services"
              >
                See Our Services
              </button>
            </div>

            {/* Trust indicators */}
            <div
              className={`mt-10 flex flex-wrap gap-6 justify-center lg:justify-start transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "700ms" }}
            >
              {[
                { value: "50+", label: "Happy Clients" },
                { value: "3M+", label: "People Reached" },
                { value: "500+", label: "Posts Created" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="font-black text-[#1A2332] dark:text-white"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.5rem" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#666666] dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual (40%) */}
          <div
            className={`flex-shrink-0 lg:w-[40%] w-full max-w-md lg:max-w-none transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
            style={{ transitionDelay: "400ms" }}
            aria-hidden="true"
          >
            <div className="relative">
              {/* Main visual container */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl animate-float"
                style={{
                  background: "linear-gradient(135deg, #1A2332 0%, #2A3F5F 100%)",
                  padding: "32px",
                  aspectRatio: "4/3",
                }}
              >
                {/* Social media grid mockup */}
                <div className="grid grid-cols-3 gap-3 h-full">
                  {/* Post 1 - Large */}
                  <div
                    className="col-span-2 row-span-2 rounded-xl flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%)" }}
                  >
                    <div className="text-center text-white p-4">
                      <div className="text-4xl mb-2">📈</div>
                      <div className="font-bold text-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>+250%</div>
                      <div className="text-xs opacity-80">Engagement</div>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div
                    className="rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-center text-white p-2">
                      <div className="text-2xl">✏️</div>
                      <div className="text-xs mt-1 opacity-80">Content</div>
                    </div>
                  </div>

                  {/* Post 3 */}
                  <div
                    className="rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="text-center text-white p-2">
                      <div className="text-2xl">🎯</div>
                      <div className="text-xs mt-1 opacity-80">Strategy</div>
                    </div>
                  </div>

                  {/* Post 4 */}
                  <div
                    className="rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,107,53,0.3)" }}
                  >
                    <div className="text-center text-white p-2">
                      <div className="text-2xl">📱</div>
                      <div className="text-xs mt-1 opacity-80">Social</div>
                    </div>
                  </div>

                  {/* Post 5 */}
                  <div
                    className="rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <div className="text-center text-white p-2">
                      <div className="text-2xl">💡</div>
                      <div className="text-xs mt-1 opacity-80">Ideas</div>
                    </div>
                  </div>

                  {/* Post 6 */}
                  <div
                    className="rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-center text-white p-2">
                      <div className="text-2xl">🤝</div>
                      <div className="text-xs mt-1 opacity-80">Partner</div>
                    </div>
                  </div>
                </div>

                {/* Floating stats badge */}
                <div
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-[#1E2830] rounded-xl shadow-xl p-4 flex items-center gap-3"
                  style={{ minWidth: "160px" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,107,53,0.15)" }}
                  >
                    <span style={{ color: "#FF6B35", fontSize: "1.2rem" }}>🚀</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1A2332] dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      3M+ Reached
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">This month</div>
                  </div>
                </div>
              </div>

              {/* Floating badge top-left */}
              <div
                className="absolute -top-4 -left-4 bg-[#FF6B35] text-white rounded-xl shadow-xl p-3 flex items-center gap-2"
              >
                <span className="text-lg">⭐</span>
                <div>
                  <div className="font-bold text-xs" style={{ fontFamily: "'Montserrat', sans-serif" }}>5.0 Rating</div>
                  <div className="text-xs opacity-80">50+ Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: "1000ms" }}
        aria-hidden="true"
      >
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-[#FF6B35] rounded-full"
            style={{ animation: "float 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
