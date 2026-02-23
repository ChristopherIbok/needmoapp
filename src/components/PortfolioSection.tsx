"use client";

import { useEffect, useRef, useState } from "react";
import VideoPlayer, { VideoSource } from "./VideoPlayer";
import VideoModal from "./VideoModal";

type Category = "all" | "content" | "paid" | "growth" | "strategy";

interface PortfolioItem {
  id: number;
  client: string;
  type: string;
  category: Category;
  description: string;
  results: string[];
  badge: string;
  icon: string;
  featured?: boolean;
  color: string;
  /** If present, renders a video player instead of the icon placeholder */
  video?: VideoSource;
  /** Optional custom thumbnail for video items */
  thumbnail?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    client: "BrightStart Wellness",
    type: "Instagram Reels Series",
    category: "content",
    description:
      "Created 30-day wellness challenge content series with branded templates and engaging captions",
    results: ["250K views", "15% avg engagement", "+5K followers in 30 days"],
    badge: "Instagram Campaign",
    icon: "🌿",
    color: "#4CAF50",
    // Replace dQw4w9WgXcQ with a real YouTube video ID when available
    video: { type: "youtube", videoId: "dQw4w9WgXcQ" },
  },
  {
    id: 2,
    client: "Urban Threads",
    type: "TikTok Ad Campaign",
    category: "paid",
    description:
      "Launch campaign for new clothing line targeting Gen Z audience with viral-style content",
    results: ["500K impressions", "12% CTR", "$30K revenue", "3.5x ROAS"],
    badge: "Paid Campaign",
    icon: "👗",
    color: "#9C27B0",
    // Replace with a real YouTube video ID when available
    video: { type: "youtube", videoId: "dQw4w9WgXcQ" },
  },
  {
    id: 3,
    client: "Local Coffee Co.",
    type: "Content Calendar & Design",
    category: "content",
    description:
      "Monthly content strategy with branded templates, photography, and cohesive feed aesthetics",
    results: ["Engagement up 180%", "Store visits +40%"],
    badge: "Content Creation",
    icon: "☕",
    color: "#795548",
    // Image-only item — no video
  },
  {
    id: 4,
    client: "Tech Startup XYZ",
    type: "LinkedIn Growth Strategy",
    category: "strategy",
    description:
      "B2B content strategy for founder's personal brand and company page",
    results: ["+15K followers", "3 partnership deals", "50 qualified leads/month"],
    badge: "Strategy Project",
    icon: "💼",
    featured: true,
    color: "#0077B5",
    // Image-only item — no video
  },
  {
    id: 5,
    client: "Fitness Influencer Sarah",
    type: "Content Creation & Management",
    category: "growth",
    description:
      "Full-service content production and account management for fitness creator",
    results: ["+40K followers in 6 months", "2 brand sponsorship deals", "$15K/month from content"],
    badge: "Account Growth",
    icon: "💪",
    color: "#FF5722",
    // Replace with a real Vimeo video ID when available
    video: { type: "vimeo", videoId: "76979871" },
  },
  {
    id: 6,
    client: "E-commerce Fashion Brand",
    type: "Paid Social Campaign",
    category: "paid",
    description:
      "Meta ads campaign (Facebook + Instagram) for holiday season launch",
    results: ["5x ROAS", "$100K revenue in 30 days", "10K new customers"],
    badge: "Paid Campaign",
    icon: "🛍️",
    color: "#E91E63",
    // Image-only item — no video
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All Work", value: "all" },
  { label: "Content Creation", value: "content" },
  { label: "Paid Campaigns", value: "paid" },
  { label: "Account Growth", value: "growth" },
  { label: "Strategy Projects", value: "strategy" },
];

const stats = [
  { value: 500, suffix: "+", label: "Posts Created", icon: "✏️" },
  { value: 50, suffix: "+", label: "Happy Clients", icon: "🤝" },
  { value: 3, suffix: "M+", label: "People Reached", icon: "📈" },
  { value: 8.5, suffix: "%", label: "Avg. Engagement", icon: "❤️", isDecimal: true },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [countersStarted, setCountersStarted] = useState(false);
  const [counterValues, setCounterValues] = useState(stats.map(() => 0));

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const openModal = (item: PortfolioItem) => {
    if (!item.video) return;
    setModalItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Delay clearing item so exit animation can play
    setTimeout(() => setModalItem(null), 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".portfolio-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
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
              let current = 0;
              let step = 0;

              const timer = setInterval(() => {
                step++;
                current = Math.min(increment * step, stat.value);
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

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="portfolio"
        aria-label="Portfolio and work showcase"
        className="section-padding bg-[#F7F7F7] dark:bg-[#1A2332]"
      >
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-10 reveal">
            <span className="eyebrow">Our Work</span>
            <h2 className="section-heading">Work That Speaks for Itself</h2>
            <p className="section-subheading mx-auto">
              Real campaigns. Real results. Real growth for brands like yours.
            </p>
          </div>

          {/* Filter Navigation */}
          <div
            className="flex gap-3 mb-10 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Filter portfolio by category"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                role="tab"
                aria-selected={activeFilter === filter.value}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                  activeFilter === filter.value
                    ? "bg-[#FF6B35] text-white shadow-md"
                    : "bg-white dark:bg-[#1E2830] text-[#333333] dark:text-gray-300 border border-[#E0E0E0] dark:border-[#2A3540] hover:border-[#FF6B35] hover:text-[#FF6B35]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            aria-live="polite"
            aria-label={`Showing ${filteredItems.length} portfolio items`}
          >
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className={`portfolio-card reveal group ${
                  item.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full bg-white dark:bg-[#1E2830] border border-[#E0E0E0] dark:border-[#2A3540] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 z-10 badge badge-orange text-xs">
                      ⭐ Featured Project
                    </div>
                  )}

                  {/* Visual area — video or icon placeholder */}
                  {item.video ? (
                    /* ── Video card ── */
                    <div className="relative">
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Inline thumbnail + play button; clicking opens modal */}
                      <VideoPlayer
                        source={item.video}
                        title={`${item.type} — ${item.client}`}
                        thumbnail={item.thumbnail}
                        onPlayClick={() => openModal(item)}
                        className="portfolio-video-player"
                      />
                    </div>
                  ) : (
                    /* ── Image / icon placeholder card ── */
                    <div
                      className="relative h-48 flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`,
                      }}
                    >
                      <div className="text-6xl" aria-hidden="true">
                        {item.icon}
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="overlay">
                        <div className="text-white">
                          <p className="text-sm mb-3 opacity-90">{item.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.results.map((result) => (
                              <span
                                key={result}
                                className="text-xs px-2 py-1 rounded-full font-semibold"
                                style={{ backgroundColor: "#FF6B35", color: "white" }}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className="font-bold text-[#1A2332] dark:text-white mb-1"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.client}
                    </h3>
                    <p className="text-sm text-[#666666] dark:text-gray-400 mb-3">
                      {item.type}
                    </p>

                    {/* Results */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.results.slice(0, 2).map((result) => (
                        <span
                          key={result}
                          className="text-xs px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: "rgba(255, 107, 53, 0.1)",
                            color: "#FF6B35",
                          }}
                        >
                          {result}
                        </span>
                      ))}
                    </div>

                    {item.video ? (
                      <button
                        onClick={() => openModal(item)}
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-200 hover:gap-2"
                        style={{ color: "#FF6B35" }}
                        aria-label={`Watch video for ${item.client} project`}
                      >
                        Watch Video
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={handleScrollToContact}
                        className="inline-flex items-center gap-1 text-sm font-semibold transition-all duration-200 hover:gap-2"
                        style={{ color: "#FF6B35" }}
                        aria-label={`View details for ${item.client} project`}
                      >
                        View Details
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats Section */}
          <div
            ref={statsRef}
            className="rounded-2xl p-10 mb-16 reveal"
            style={{ backgroundColor: "#1A2332" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl mb-2" aria-hidden="true">
                    {stat.icon}
                  </div>
                  <div
                    className="font-black text-white mb-1"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                    }}
                    aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
                  >
                    {stat.isDecimal
                      ? counterValues[index].toFixed(1)
                      : Math.floor(counterValues[index]).toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center reveal">
            <h3
              className="font-bold text-[#1A2332] dark:text-white mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1.8rem" }}
            >
              Ready to See Your Brand Here?
            </h3>
            <p className="text-[#666666] dark:text-gray-400 mb-8 max-w-lg mx-auto">
              Let&apos;s create scroll-stopping content and real results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleScrollToContact}
                className="btn-primary"
                aria-label="Start your project with NEEDMO CONSULT"
              >
                Start Your Project
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center gap-2 font-semibold text-[#666666] dark:text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 underline underline-offset-4"
              >
                View Our Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal — rendered outside section to avoid stacking-context issues */}
      <VideoModal
        isOpen={modalOpen}
        onClose={closeModal}
        source={modalItem?.video ?? null}
        title={modalItem ? `${modalItem.type} — ${modalItem.client}` : ""}
        description={modalItem?.description}
        stats={modalItem?.results}
      />
    </>
  );
}
