"use client";

import { useState } from "react";
import { LogoText } from "@/components/Logo";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const serviceLinks = [
  { label: "Content Creation", href: "#services" },
  { label: "Account Management", href: "#services" },
  { label: "Paid Advertising", href: "#services" },
  { label: "Strategy & Consulting", href: "#services" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      role="contentinfo"
      className="bg-[#1A2332] dark:bg-[#0A0F14] text-white"
    >
      <div className="container-custom footer-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            {/* Logo */}
            <div className="mb-4">
              <LogoText theme="dark" size="md" />
            </div>

            {/* Tagline */}
            <p
              className="text-gray-400 mb-6"
              style={{ fontSize: "0.9rem" }}
            >
              Your Brand Deserves More
            </p>

            {/* Social icons */}
            <div className="flex gap-3" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={`Follow us on ${social.label}`}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-[#FF6B35] hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3
              className="font-bold text-white mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem" }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer quick links" className="footer-links">
              <ul className="space-y-2 text-center md:text-left">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded"
                      style={{ fontSize: "0.95rem", lineHeight: "2" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3
              className="font-bold text-white mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem" }}
            >
              Services
            </h3>
            <nav aria-label="Footer services links" className="footer-links">
              <ul className="space-y-2 text-center md:text-left">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded"
                      style={{ fontSize: "0.95rem", lineHeight: "2" }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4 - Contact + Newsletter */}
          <div>
            <h3
              className="font-bold text-white mb-5"
              style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "1rem" }}
            >
              Get In Touch
            </h3>

            <address className="not-italic space-y-3 mb-6">
              <a
                href="mailto:hello@needmoconsult.com"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors duration-200"
                style={{ fontSize: "0.95rem" }}
                aria-label="Email us"
              >
                <span style={{ color: "#FF6B35" }} aria-hidden="true">📧</span>
                hello@needmoconsult.com
              </a>
              <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: "0.95rem" }}>
                <span style={{ color: "#FF6B35" }} aria-hidden="true">📞</span>
                +1 (555) 000-0000
              </div>
              <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: "0.95rem" }}>
                <span style={{ color: "#FF6B35" }} aria-hidden="true">📍</span>
                Available Worldwide
              </div>
            </address>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <p className="text-gray-400 text-sm mb-3">
                Get social media tips & insights:
              </p>
              {subscribed ? (
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#FF6B35" }}
                  role="alert"
                  aria-live="assertive"
                >
                  ✓ Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex" aria-label="Newsletter signup">
                  <label htmlFor="footer-email" className="sr-only">
                    Your email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="newsletter-input flex-1 min-w-0"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="newsletter-btn"
                    aria-label="Subscribe to newsletter"
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="footer-bottom border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-gray-400 text-center md:text-left"
            style={{ fontSize: "0.85rem" }}
          >
            © {new Date().getFullYear()} NEEDMO CONSULT. All rights reserved.
          </p>
          <p
            className="text-gray-500 text-center md:text-right"
            style={{ fontSize: "0.85rem" }}
          >
            Built with care for brands that deserve more.
          </p>
        </div>
      </div>
    </footer>
  );
}
