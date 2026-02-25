"use client";

import { useEffect, useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import {
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  PenTool,
  Sparkles,
} from "lucide-react";

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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Premium gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white via-white to-orange-50/30 dark:from-[#0A0F1C] dark:via-[#0F1419] dark:to-[#1A1F2C]"
        aria-hidden="true"
      />

      {/* Sophisticated pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Elegant floating orbs */}
      <div
        className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-orange-300/20 dark:from-orange-500/5 dark:to-orange-600/5 rounded-full blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/20 to-purple-100/20 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Location badge */}
            <div
              className={`transform transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-full">
                <Sparkles size={16} className="text-orange-500" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  {loading
                    ? "🌍 Serving clients worldwide"
                    : `📍 Serving clients in ${locationData.region} and beyond`}
                </span>
              </div>
            </div>

            {/* Main headline */}
            <div
              className={`transform transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h1 className="font-black leading-[1.1] tracking-tight">
                <span className="block text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white">
                  Your Brand
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl mt-2">
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Deserves
                  </span>
                  <span className="text-gray-900 dark:text-white ml-3">
                    More.
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <div
              className={`transform transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                NEEDMO CONSULT is a strategic social media agency helping
                businesses, creators, and brands turn their online presence into
                real growth — with content that performs, strategies that work,
                and results you can measure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <button
                onClick={handleScrollToContact}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2">
                  Book a Free Strategy Call
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>
              <button
                onClick={handleScrollToServices}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300"
              >
                See Our Services
              </button>
            </div>

            {/* Trust indicators - more refined */}
            <div
              className={`grid grid-cols-3 gap-8 pt-8 border-t border-gray-100 dark:border-gray-800 transform transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {[
                { value: "50+", label: "Happy Clients", icon: Users },
                { value: "3M+", label: "People Reached", icon: TrendingUp },
                { value: "500+", label: "Posts Created", icon: PenTool },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon
                    size={20}
                    className="mx-auto mb-2 text-orange-500"
                  />
                  <div className="font-bold text-2xl text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Premium visual */}
          <div
            className={`relative transform transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Main visual container */}
            <div className="relative">
              {/* Gradient background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-3xl blur-2xl"
                aria-hidden="true"
              />

              {/* Main card */}
              <div className="relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Large feature card */}
                    <div className="col-span-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                      <div className="flex items-start justify-between mb-4">
                        <TrendingUp size={24} />
                        <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded-full">
                          +247%
                        </span>
                      </div>
                      <div className="text-3xl font-bold mb-1">3.2M</div>
                      <div className="text-sm opacity-90">Monthly Reach</div>
                    </div>

                    {/* Stats cards */}
                    {[
                      {
                        label: "Engagement Rate",
                        value: "4.8%",
                        color: "from-purple-500 to-purple-600",
                      },
                      {
                        label: "Growth",
                        value: "+156%",
                        color: "from-blue-500 to-blue-600",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-white`}
                      >
                        <div className="text-xl font-bold mb-1">
                          {item.value}
                        </div>
                        <div className="text-xs opacity-90">{item.label}</div>
                      </div>
                    ))}

                    {/* Platform icons */}
                    <div className="col-span-2 flex justify-between items-center pt-2">
                      {["📱", "💻", "📊", "🎯", "✏️"].map((icon, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700/50 rounded-xl flex items-center justify-center text-lg"
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Active Campaigns
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      12
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Sparkles size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Top Agency
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      2024 Award Winner
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[3px]">
            Explore
          </span>
          <div className="w-5 h-9 border border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-orange-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </section>
  );
}
