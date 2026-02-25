"use client";

import { useState } from "react";
import { LogoText } from "@/components/Logo";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Sparkles,
  Shield,
  FileText,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#", icon: Shield },
  { label: "Terms of Service", href: "#", icon: FileText },
];

const serviceLinks = [
  { label: "Content Creation", href: "#services" },
  { label: "Account Management", href: "#services" },
  { label: "Paid Advertising", href: "#services" },
  { label: "Strategy & Consulting", href: "#services" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
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
          {/* Column 1 - Brand & Social */}
          <div className="space-y-6">
            <div>
              <LogoText theme="dark" size="md" />
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your Brand Deserves More. We help businesses, creators, and brands
              turn their online presence into real growth.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#FF6B35] flex items-center justify-center transition-all duration-200 group"
                  >
                    <Icon
                      size={18}
                      className="text-gray-400 group-hover:text-white transition-colors duration-200"
                    />
                  </a>
                );
              })}
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
              <Sparkles size={16} className="text-[#FF6B35]" />
              <span className="text-xs text-gray-400">
                Trusted by 50+ brands worldwide
              </span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <nav aria-label="Footer quick links" className="footer-links">
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 text-left flex items-center gap-2 group"
                      style={{ fontSize: "0.95rem", lineHeight: "2" }}
                    >
                      <ChevronRight
                        size={14}
                        className="text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Services
            </h3>
            <nav aria-label="Footer services links" className="footer-links">
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 text-left flex items-center gap-2 group"
                      style={{ fontSize: "0.95rem", lineHeight: "2" }}
                    >
                      <ChevronRight
                        size={14}
                        className="text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal Links */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <ul className="space-y-2">
                {legalLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 flex items-center gap-2 text-sm"
                      >
                        <Icon size={14} className="text-gray-500" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Column 4 - Contact + Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Get In Touch
            </h3>

            <address className="not-italic space-y-4 mb-6">
              <a
                href="mailto:hello@needmoconsult.com"
                className="flex items-center gap-3 text-gray-400 hover:text-[#FF6B35] transition-colors duration-200 group"
                style={{ fontSize: "0.95rem" }}
                aria-label="Email us"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#FF6B35] flex items-center justify-center transition-colors duration-200">
                  <Mail
                    size={16}
                    className="text-gray-400 group-hover:text-white transition-colors duration-200"
                  />
                </span>
                hello@needmoconsult.com
              </a>

              <div className="flex items-center gap-3 text-gray-400 group">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone size={16} className="text-gray-400" />
                </span>
                +1 (555) 000-0000
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin size={16} className="text-gray-400" />
                </span>
                Available Worldwide
              </div>
            </address>

            {/* Newsletter */}
            <div className="footer-newsletter bg-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Send size={16} className="text-[#FF6B35]" />
                <p className="text-gray-300 text-sm font-medium">
                  Get social media tips & insights:
                </p>
              </div>

              {subscribed ? (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#FF6B35" }}
                  role="alert"
                >
                  <Sparkles size={16} />
                  <span className="font-medium">Thanks for subscribing!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex"
                  aria-label="Newsletter signup"
                >
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
                    className="flex-1 min-w-0 bg-white/10 border-0 text-white placeholder-gray-500 px-4 py-2.5 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#FF6B35] text-sm"
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6B35] hover:bg-[#E55A2B] text-white px-4 py-2.5 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              <p className="text-xs text-gray-500 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-center md:text-left text-sm">
            © {new Date().getFullYear()} NEEDMO CONSULT. All rights reserved.
          </p>

          <p className="text-gray-500 text-center md:text-right text-sm">
            Built with <span className="text-[#FF6B35]">❤</span> for brands that
            deserve more.
          </p>

          <p className="text-xs text-center md:text-right text-gray-600 max-w-md">
            We use your approximate location to show relevant pricing and
            content. No personal data is stored.{" "}
            <a
              href="#privacy"
              className="text-gray-400 hover:text-[#FF6B35] underline transition-colors duration-200"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
