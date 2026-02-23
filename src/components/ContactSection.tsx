"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/hooks/useLocation";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locationData, loading } = useLocation();
  const [currentTime, setCurrentTime] = useState<string>("");
  const [timezoneAbbr, setTimezoneAbbr] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [businessMsg, setBusinessMsg] = useState<{ text: string; color: string }>({
    text: "",
    color: "#FFA726",
  });

  useEffect(() => {
    const tz = locationData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const update = () => {
      try {
        const now = new Date();
        const time = new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: tz,
        }).format(now);
        const tzString = now.toLocaleTimeString("en-US", {
          timeZoneName: "short",
          timeZone: tz,
        });
        const abbr = tzString.split(" ").pop() || "";
        setCurrentTime(time);
        setTimezoneAbbr(abbr);
      } catch {
        const now = new Date();
        setCurrentTime(
          new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(now)
        );
        setTimezoneAbbr("");
      }
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [locationData.timezone]);

  useEffect(() => {
    const businessTimezone = "America/Los_Angeles";
    const compute = () => {
      const now = new Date();
      const hour = parseInt(
        now.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: businessTimezone }),
        10
      );
      const day = now.toLocaleString("en-US", { weekday: "short", timeZone: businessTimezone });
      const isWeekday = !["Sat", "Sun"].includes(day);
      const isDuringHours = hour >= 9 && hour < 18;
      if (isWeekday && isDuringHours) {
        setBusinessMsg({ text: "🟢 We're online now! Expect a response within 2-4 hours.", color: "#4CAF50" });
      } else {
        setBusinessMsg({ text: "🟡 We're currently offline. We'll respond within 24 hours.", color: "#FFA726" });
      }
    };
    compute();
    const id = setInterval(compute, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".contact-reveal");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", email: "", business: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact NEEDMO CONSULT"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1A2332 0%, #FF6B35 100%)",
      }}
    >
      {/* Dark mode overlay */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "linear-gradient(135deg, #0F1419 0%, #E55A2B 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left side - CTA content */}
          <div className="flex-1 text-white">
            <div className="contact-reveal reveal-left">
              <span
                className="inline-block text-sm font-semibold uppercase tracking-[2px] mb-4 opacity-80"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get In Touch
              </span>

              <h2
                className="contact-headline font-black text-white mb-6"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                  lineHeight: "1.2",
                  maxWidth: "600px",
                }}
              >
                Let&apos;s Talk About What Your Brand Needs More Of
              </h2>

              <p
                className="contact-subheadline text-white/80 mb-8 max-w-lg"
                style={{ fontSize: "1.1rem", lineHeight: "1.7" }}
              >
                Whether you&apos;re starting from scratch or ready to scale, we&apos;d love to learn about your goals and show you how we can help.
              </p>

              {/* Contact info */}
              <div className="contact-info space-y-4 mb-8">
                <a
                  href="mailto:hello@needmoconsult.com"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 group"
                  aria-label="Email us at hello@needmoconsult.com"
                >
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    aria-hidden="true"
                  >
                    📧
                  </span>
                  <span>hello@needmoconsult.com</span>
                </a>

                <div className="flex items-center gap-3 text-white/80">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    aria-hidden="true"
                  >
                    📞
                  </span>
                  <span>+234 (706) 898-4590</span>
                </div>

                <div className="flex items-center gap-3 text-white/80">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                    aria-hidden="true"
                  >
                    📍
                  </span>
                  <span>Available Worldwide</span>
                </div>
              </div>

              {/* Timezone message */}
              <div
                className="rounded-xl p-4 contact-timezone"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-live="polite"
              >
                <div className="timezone-info">
                  <p className="user-time">
                    {loading ? (
                      <span className="text-white/70 text-sm italic">Detecting your timezone...</span>
                    ) : (
                      <>
                        Your local time:{" "}
                        <span id="currentTime">{currentTime || locationData.localTime}</span>{" "}
                        {timezoneAbbr && <span id="timezone">{timezoneAbbr}</span>}
                      </>
                    )}
                  </p>
                </div>
                <p className="text-white/60 text-sm">
                  Our team typically responds within 24 hours.
                </p>
                <p className="business-hours-message text-sm mt-1" aria-live="polite" style={{ color: businessMsg.color }}>
                  {businessMsg.text}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="flex-1 w-full max-w-lg">
            <div className="contact-reveal reveal-right">
              <div
                className="rounded-2xl p-8 shadow-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
              >
                <h3
                  className="font-bold text-[#1A2332] mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.4rem" }}
                >
                  Book a Free 30-Minute Strategy Call
                </h3>

                {submitted ? (
                  <div
                    className="text-center py-8"
                    role="alert"
                    aria-live="assertive"
                  >
                    <div className="text-5xl mb-4"></div>
                    <h4
                      className="font-bold text-[#1A2332] mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.2rem" }}
                    >
                      Message Sent!
                    </h4>
                    <p className="text-[#666666]">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-semibold text-[#333333] mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                          style={{ fontSize: "0.95rem" }}
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-semibold text-[#333333] mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                          style={{ fontSize: "0.95rem" }}
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-business"
                          className="block text-sm font-semibold text-[#333333] mb-1.5"
                        >
                          Business / Brand Name
                        </label>
                        <input
                          id="contact-business"
                          type="text"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          placeholder="Your Business Name"
                          className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200"
                          style={{ fontSize: "0.95rem" }}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-semibold text-[#333333] mb-1.5"
                        >
                          Tell us about your goals *
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="What are you looking to achieve with social media?"
                          className="w-full px-4 py-3 rounded-lg border border-[#E0E0E0] text-[#333333] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent transition-all duration-200 resize-none"
                          style={{ fontSize: "0.95rem" }}
                          aria-required="true"
                        />
                      </div>

                      <button
                        type="submit"
                        className="contact-cta w-full py-4 px-6 rounded-lg font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                        style={{
                          backgroundColor: "#FF6B35",
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "1rem",
                        }}
                        aria-label="Submit contact form and book a strategy call"
                      >
                        Book My Free Strategy Call 🚀
                      </button>

                      <p className="text-center text-xs text-[#999999]">
                        No commitment required. We&apos;ll reach out within 24 hours.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
