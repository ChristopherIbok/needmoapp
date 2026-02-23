"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "NEEDMO transformed our social presence. In 3 months, we saw a 250% increase in engagement and real leads coming through Instagram.",
    name: "Sarah Chen",
    title: "Founder, BrightStart Wellness",
    initials: "SC",
    color: "#FF6B35",
  },
  {
    quote:
      "The team at NEEDMO doesn't just post content — they built a strategy that actually converted followers into customers. Game changer.",
    name: "Marcus Johnson",
    title: "CEO, Urban Threads",
    initials: "MJ",
    color: "#1A2332",
  },
  {
    quote:
      "As a creator, I needed help scaling my content. NEEDMO gave me my time back while growing my audience by 40K in 6 months.",
    name: "Priya Sharma",
    title: "Content Creator & Influencer",
    initials: "PS",
    color: "#2A5F8F",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".testimonial-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 200);
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
      const slide = el.querySelector<HTMLElement>(".testimonial-slide");
      if (!slide) return;
      const width = slide.offsetWidth;
      const idx = Math.round(el.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(testimonials.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll as any, { passive: true } as any);
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(".testimonial-slide");
    if (!slide) return;
    const width = slide.offsetWidth;
    el.scrollTo({ left: idx * width, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Client testimonials"
      className="section-padding bg-white dark:bg-[#0F1419]"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-14 reveal">
          <span className="eyebrow">Client Success</span>
          <h2 className="section-heading">Brands That Trust NEEDMO</h2>
          <p className="section-subheading mx-auto">
            Real results from real partnerships
          </p>
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="testimonial-card reveal"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="h-full bg-white dark:bg-[#1E2830] rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Quote icon */}
                <div
                  className="text-5xl font-black leading-none mb-4"
                  style={{ color: "#FF6B35", fontFamily: "Georgia, serif" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote
                  className="flex-1 text-[#333333] dark:text-[#E0E0E0] italic mb-6"
                  style={{ fontSize: "1.05rem", lineHeight: "1.7" }}
                >
                  {testimonial.quote}
                </blockquote>

                {/* Stars */}
                <div className="stars mb-4" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>

                {/* Client info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: testimonial.color }}
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div
                      className="font-bold text-[#1A2332] dark:text-white"
                      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem" }}
                    >
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#666666] dark:text-gray-400">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="md:hidden mb-8">
          <div
            ref={scrollRef}
            className="testimonials-container"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="testimonial-slide">
                <div className="bg-white dark:bg-[#1E2830] rounded-xl p-[25px] shadow-md">
                  <div
                    className="mb-3"
                    style={{ color: "#FF6B35", fontFamily: "Georgia, serif", fontSize: "36px", lineHeight: "1" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote
                    className="text-[#333333] dark:text-[#E0E0E0] italic mb-6"
                    style={{ fontSize: "1rem", lineHeight: "1.7" }}
                  >
                    {testimonial.quote}
                  </blockquote>
                  <div className="stars mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: testimonial.color }}
                      aria-hidden="true"
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <div
                        className="font-bold text-[#1A2332] dark:text-white"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[#666666] dark:text-gray-400">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${activeIndex === index ? "w-6 bg-[#FF6B35]" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-sm italic text-[#666666] dark:text-gray-400 reveal"
          style={{ fontSize: "0.85rem" }}
        >
          Results vary by industry, strategy, and timeline. These are real client outcomes.
        </p>
      </div>
    </section>
  );
}
