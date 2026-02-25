"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useThemeV2";
import { LogoText } from "@/components/Logo";
import { Moon, Sun, Menu, X, ArrowRight } from "lucide-react";

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
      const sections = [
        "home",
        "services",
        "pricing",
        "portfolio",
        "about",
        "contact",
      ];
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="container-custom flex items-center justify-between h-16 md:h-20"
        >
          {/* Logo */}
          <LogoText
            theme="auto"
            size="md"
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded px-1 py-2 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#FF6B35]"
                    : isScrolled
                    ? "text-gray-700 dark:text-gray-300"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
              >
                {theme === "light" ? (
                  <Moon
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                ) : (
                  <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>
            )}

            {/* Theme mode selector - subtle */}
            {mounted && (
              <div className="hidden sm:block">
                <select
                  value={mode}
                  onChange={(e) =>
                    setThemeMode(e.target.value as "auto" | "light" | "dark")
                  }
                  className="text-xs bg-transparent text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#FF6B35] cursor-pointer"
                  aria-label="Theme mode"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            )}

            {/* CTA Button - Desktop */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="hidden lg:inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#E55A2B] transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            >
              Book Free Strategy Call
              <ArrowRight size={16} />
            </button>

            {/* Hamburger - Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
            >
              {mobileOpen ? (
                <X size={24} className="text-gray-900 dark:text-white" />
              ) : (
                <Menu size={24} className="text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-[#0A0A0A] shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <LogoText theme="auto" size="sm" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <X size={20} className="text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Theme controls in mobile menu */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    aria-label={`Switch to ${
                      theme === "light" ? "dark" : "light"
                    } mode`}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {theme === "light" ? (
                      <Moon size={18} className="text-gray-700" />
                    ) : (
                      <Sun size={18} className="text-gray-300" />
                    )}
                  </button>
                  <select
                    value={mode}
                    onChange={(e) =>
                      setThemeMode(e.target.value as "auto" | "light" | "dark")
                    }
                    className="text-sm bg-transparent text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#FF6B35] cursor-pointer"
                    aria-label="Theme mode"
                  >
                    <option value="auto">Auto</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <ul className="p-6 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full text-left py-3 text-lg font-medium transition-colors duration-200 hover:text-[#FF6B35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded ${
                      activeSection === link.href.replace("#", "")
                        ? "text-[#FF6B35]"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => handleNavClick("#contact")}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B35] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#E55A2B] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              >
                Book Free Strategy Call
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-20" aria-hidden="true" />
    </>
  );
}
