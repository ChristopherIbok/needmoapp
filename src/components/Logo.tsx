"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "stacked" | "icon";
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
}

const sizes = {
  sm: { width: 140, height: 36, needmoSize: 18, consultSize: 7, iconSize: 28 },
  md: { width: 180, height: 46, needmoSize: 24, consultSize: 9, iconSize: 36 },
  lg: { width: 220, height: 56, needmoSize: 30, consultSize: 11, iconSize: 44 },
};

/**
 * NEEDMO CONSULT Logo Component
 *
 * Renders the wordmark logo in horizontal, stacked, or icon-only variants.
 * Automatically adapts colors for light/dark mode via CSS classes.
 */
export function LogoSVG({
  variant = "horizontal",
  theme = "auto",
  size = "md",
}: {
  variant?: "horizontal" | "stacked" | "icon";
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
}) {
  const s = sizes[size];

  // Color resolution
  const needmoColor =
    theme === "dark" ? "#FFFFFF" : theme === "light" ? "#1A2332" : undefined;
  const consultColor =
    theme === "dark" ? "#E0E0E0" : theme === "light" ? "#333333" : undefined;

  if (variant === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={s.iconSize}
        height={s.iconSize}
        role="img"
        aria-label="NEEDMO CONSULT icon"
        className="flex-shrink-0"
      >
        <title>NM</title>
        {/* Background */}
        <rect x="0" y="0" width="64" height="64" rx="12" fill="#1A2332" />
        {/* Orange accent corner */}
        <polygon points="0,0 20,0 0,20" fill="#FF6B35" opacity="0.9" />
        {/* N letter */}
        <rect x="10" y="18" width="6" height="28" rx="1" fill="#FFFFFF" />
        <polygon points="10,18 16,18 30,42 30,46 24,46" fill="#FFFFFF" />
        <rect x="24" y="18" width="6" height="28" rx="1" fill="#FFFFFF" />
        {/* M letter */}
        <rect x="34" y="18" width="5" height="28" rx="1" fill="#FF6B35" />
        <polygon points="34,18 39,18 44,30 41,30" fill="#FF6B35" />
        <polygon points="49,18 54,18 49,30 46,30" fill="#FF6B35" />
        <rect x="49" y="18" width="5" height="28" rx="1" fill="#FF6B35" />
        <rect x="41" y="30" width="3" height="16" rx="1" fill="#FF6B35" />
        <rect x="46" y="30" width="3" height="16" rx="1" fill="#FF6B35" />
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 80"
        width={s.width}
        height={80}
        role="img"
        aria-label="NEEDMO CONSULT logo"
        className="flex-shrink-0"
      >
        <title>NEEDMO CONSULT</title>
        {/* Orange accent bar */}
        <rect x="0" y="0" width="4" height="80" fill="#FF6B35" rx="2" />
        {/* NEEDMO */}
        <text
          x="14"
          y="44"
          fontFamily="var(--font-montserrat), Montserrat, Poppins, sans-serif"
          fontWeight="800"
          fontSize="32"
          letterSpacing="1"
          fill={needmoColor}
          className={theme === "auto" ? "logo-needmo-text" : undefined}
        >
          NEEDMO
        </text>
        {/* CONSULT */}
        <text
          x="16"
          y="62"
          fontFamily="var(--font-montserrat), Montserrat, Poppins, sans-serif"
          fontWeight="400"
          fontSize="12"
          letterSpacing="5"
          fill={consultColor}
          className={theme === "auto" ? "logo-consult-text" : undefined}
        >
          CONSULT
        </text>
        {/* Tagline */}
        <text
          x="16"
          y="76"
          fontFamily="var(--font-montserrat), Montserrat, Poppins, sans-serif"
          fontWeight="400"
          fontSize="7"
          letterSpacing="2"
          fill="#FF6B35"
        >
          YOUR BRAND DESERVES MORE
        </text>
      </svg>
    );
  }

  // Horizontal (default)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 50"
      width={s.width}
      height={s.height}
      role="img"
      aria-label="NEEDMO CONSULT logo"
      className="flex-shrink-0"
    >
      <title>NEEDMO CONSULT</title>
      {/* Orange accent triangle */}
      <polygon points="0,0 10,0 0,10" fill="#FF6B35" />
      {/* NEEDMO */}
      <text
        x="16"
        y="34"
        fontFamily="var(--font-montserrat), Montserrat, Poppins, sans-serif"
        fontWeight="800"
        fontSize={s.needmoSize}
        letterSpacing="1"
        fill={needmoColor}
        className={theme === "auto" ? "logo-needmo-text" : undefined}
      >
        NEEDMO
      </text>
      {/* CONSULT */}
      <text
        x="18"
        y="47"
        fontFamily="var(--font-montserrat), Montserrat, Poppins, sans-serif"
        fontWeight="400"
        fontSize={s.consultSize}
        letterSpacing="4"
        fill={consultColor}
        className={theme === "auto" ? "logo-consult-text" : undefined}
      >
        CONSULT
      </text>
      {/* Orange dot accent */}
      <circle cx="213" cy="10" r="4" fill="#FF6B35" />
    </svg>
  );
}

/**
 * Full Logo component with optional link wrapper
 */
export default function Logo({
  variant = "horizontal",
  theme = "auto",
  size = "md",
  href,
  className = "",
  onClick,
}: LogoProps) {
  const logoEl = <LogoSVG variant={variant} theme={theme} size={size} />;

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded ${className}`}
        aria-label="NEEDMO CONSULT - Go to homepage"
        onClick={onClick}
      >
        {logoEl}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded ${className}`}
        aria-label="NEEDMO CONSULT - Go to homepage"
      >
        {logoEl}
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      {logoEl}
    </div>
  );
}

/**
 * Inline text-based logo for use in Navigation (no SVG rendering issues)
 * This is the primary logo used in the header and footer
 */
export function LogoText({
  theme = "auto",
  size = "md",
  onClick,
}: {
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}) {
  const fontSizes = {
    sm: { main: "1.2rem", sub: "0.6rem" },
    md: { main: "1.5rem", sub: "0.7rem" },
    lg: { main: "1.8rem", sub: "0.85rem" },
  };

  const fs = fontSizes[size];

  const needmoColor =
    theme === "dark"
      ? "#FFFFFF"
      : theme === "light"
      ? "#1A2332"
      : undefined;

  const consultColor =
    theme === "dark"
      ? "#E0E0E0"
      : theme === "light"
      ? "#333333"
      : undefined;

  const content = (
    <span className="flex items-center gap-0.5 select-none">
      {/* Orange corner accent */}
      <span
        className="flex-shrink-0 mr-1"
        aria-hidden="true"
        style={{
          width: "8px",
          height: "8px",
          background: "#FF6B35",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          display: "inline-block",
          alignSelf: "flex-start",
          marginTop: "2px",
        }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-black tracking-tight ${theme === "auto" ? "text-[#1A2332] dark:text-white" : ""}`}
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontSize: fs.main,
            color: needmoColor,
            letterSpacing: "0.02em",
          }}
        >
          NEEDMO
        </span>
        <span
          className={`font-light tracking-[0.3em] ${theme === "auto" ? "text-[#333333] dark:text-[#E0E0E0]" : ""}`}
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontSize: fs.sub,
            color: consultColor,
          }}
        >
          CONSULT
        </span>
      </span>
      {/* Orange dot */}
      <span
        className="flex-shrink-0 ml-1 self-start mt-1"
        aria-hidden="true"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#FF6B35",
          display: "inline-block",
        }}
      />
    </span>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] rounded"
        aria-label="NEEDMO CONSULT - Go to homepage"
      >
        {content}
      </button>
    );
  }

  return content;
}
