"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { LogoText } from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section
      const sections = ["home", "services", "pricing", "portfolio", "about", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-[#0F1419]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        style={{
          backgroundColor: isScrolled
            ? theme === "dark"
              ? "rgba(15, 20, 25, 0.95)"
              : "rgba(255, 255, 255, 0.95)"
            : "transparent",
        }}
      >
        <nav
          aria-label="Main navigation"
          className="container-custom flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <LogoText
            theme="auto"
            size="md"
            onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-semibold transition-colors duration-200 hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded px-1 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#FF6B35]"
                    : isScrolled
                    ? theme === "dark"
                      ? "text-gray-200"
                      : "text-[#333333]"
                    : "text-[#1A2332] dark:text-white"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                  isScrolled
                    ? "text-[#1A2332] dark:text-white"
                    : "text-[#1A2332] dark:text-white"
                }`}
              >
                {theme === "light" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </button>
            )}

            {/* CTA Button - Desktop */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:inline-flex items-center gap-2 bg-[#FF6B35] text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#E55A2B] transition-all duration-200 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book Free Strategy Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Hamburger - Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] text-[#1A2332] dark:text-white"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span
                  className="hamburger-line"
                  style={{
                    transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{
                    transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  }}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu lg:hidden ${mobileOpen ? "open" : ""}`}
          style={{
            backgroundColor: theme === "dark" ? "#0F1419" : "#FFFFFF",
          }}
        >
          <div className="container-custom py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-left py-3 px-4 rounded-lg font-semibold transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#FF6B35] bg-orange-50 dark:bg-orange-900/20"
                    : "text-[#333333] dark:text-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-2 bg-[#FF6B35] text-white font-bold py-3 px-4 rounded-lg text-center hover:bg-[#E55A2B] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book Free Strategy Call
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
