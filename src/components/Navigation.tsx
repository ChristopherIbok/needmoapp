"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useThemeV2";
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
  const { theme, mode, setThemeMode, toggleTheme, mounted } = useTheme();
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

  const [themeSwitching, setThemeSwitching] = useState(false);

  const handleToggleTheme = () => {
    setThemeSwitching(true);
    toggleTheme();
    window.setTimeout(() => setThemeSwitching(false), 300);
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
                onClick={handleToggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={`theme-toggle-btn touch-target rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] ${themeSwitching ? "switching" : ""} ${
                  isScrolled
                    ? "text-[#1A2332] dark:text-white"
                    : "text-[#1A2332] dark:text-white"
                }`}
              >
                {theme === "light" ? (
                  // Moon icon (when in light mode, click to go dark)
                  <svg className="theme-icon moon-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                  </svg>
                ) : (
                  // Sun icon (when in dark mode, click to go light)
                  <svg className="theme-icon sun-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" stroke="currentColor" strokeWidth="2" fill="none"/>
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
              className="lg:hidden touch-target rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] text-[#1A2332] dark:text-white"
            >
              <div className="flex flex-col gap-1.5 w-6" aria-hidden="true">
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
        <nav id="mobile-menu" aria-label="Mobile navigation" className={`mobile-menu lg:hidden ${mobileOpen ? "open" : ""}`}>
          <header>
            {/* Close button */}
            <button
              className="touch-target text-white"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>
            {/* Dark mode toggle in menu + Optional three-state select */}
            {mounted && (
              <button
                onClick={handleToggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className={`theme-toggle-btn touch-target text-white ${themeSwitching ? "switching" : ""}`}
              >
                {theme === "light" ? (
                  <svg className="theme-icon moon-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className="theme-icon sun-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                )}
              </button>
            )}
            {mounted && (
              <div className="pl-2">
                <label htmlFor="themeSelect" className="sr-only">Theme</label>
                <select
                  id="themeSelect"
                  value={mode}
                  onChange={(e) => setThemeMode(e.target.value as "auto" | "light" | "dark")}
                  className="text-white/90 bg-transparent border border-white/20 rounded px-2 py-1 text-sm"
                  aria-label="Theme mode"
                  style={{ WebkitAppearance: "none" }}
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            )}
          </header>
          <ul className="menu-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`menu-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-cta">
            <button
              onClick={() => handleNavClick("#contact")}
              className="cta-button"
              style={{ fontFamily: "'Montserrat', sans-serif'" }}
            >
              Book Free Strategy Call
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
