import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEEDMO CONSULT | Your Brand Deserves More",
  description:
    "NEEDMO CONSULT is a strategic social media agency helping businesses, creators, and brands turn their online presence into real growth — with content that performs, strategies that work, and results you can measure.",
  keywords: [
    "social media management",
    "content creation",
    "paid advertising",
    "social media strategy",
    "digital marketing agency",
    "NEEDMO CONSULT",
  ],
  authors: [{ name: "NEEDMO CONSULT" }],
  openGraph: {
    title: "NEEDMO CONSULT | Your Brand Deserves More",
    description:
      "Strategic social media management for businesses, creators, and brands that know they deserve more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEEDMO CONSULT | Your Brand Deserves More",
    description:
      "Strategic social media management for businesses, creators, and brands that know they deserve more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('needmo-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
