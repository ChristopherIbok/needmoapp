import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://needmoconsult.com";
const SITE_NAME = "NEEDMO CONSULT";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Your Brand Deserves More`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "NEEDMO CONSULT is a strategic social media agency helping businesses, creators, and brands turn their online presence into real growth — with content that performs, strategies that work, and results you can measure.",
  keywords: [
    "social media management",
    "content creation",
    "paid advertising",
    "social media strategy",
    "digital marketing agency",
    "brand growth",
    "social media marketing",
    "content strategy",
    "NEEDMO CONSULT",
  ],
  authors: [{ name: "NEEDMO CONSULT", url: SITE_URL }],
  creator: "NEEDMO CONSULT",
  publisher: "NEEDMO CONSULT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: `${SITE_NAME} | Your Brand Deserves More`,
    description:
      "Strategic social media management for businesses, creators, and brands that know they deserve more.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.jpg", // Make sure this exists
        width: 1200,
        height: 630,
        alt: "NEEDMO CONSULT - Social Media Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Your Brand Deserves More`,
    description:
      "Strategic social media management for businesses, creators, and brands that know they deserve more.",
    images: ["/twitter-image.jpg"], // Make sure this exists
    creator: "@needmoconsult", // Add your Twitter handle
    site: "@needmoconsult", // Add your Twitter handle
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0F1419",
      },
    ],
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },

  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // Add other verification codes as needed
  },

  category: "marketing",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        {/* Preconnect to essential domains */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link
          rel="preconnect"
          href="https://www.youtube-nocookie.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://img.youtube.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://player.vimeo.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://i.vimeocdn.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for faster domain resolution */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://vimeo.com" />

        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Get stored preference
                  var stored = localStorage.getItem('needmo-theme-preference') || localStorage.getItem('needmo-theme');
                  
                  // Default to 'system' if no preference stored
                  var theme = stored || 'system';
                  
                  // Determine actual theme
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var actualTheme;
                  
                  if (theme === 'system' || theme === 'auto') {
                    actualTheme = prefersDark ? 'dark' : 'light';
                  } else {
                    actualTheme = theme;
                  }
                  
                  // Apply theme to document
                  var root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(actualTheme);
                  root.style.colorScheme = actualTheme;
                  
                  // Store for CSS variables
                  root.setAttribute('data-theme', actualTheme);
                  root.setAttribute('data-theme-preference', theme);
                  
                  // Set initial background color to prevent flash
                  document.body.style.backgroundColor = actualTheme === 'dark' ? '#0F1419' : '#FFFFFF';
                } catch(e) {
                  // Fallback to light theme if error
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50"
        >
          Skip to main content
        </a>

        {/* Main content */}
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
