import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/* ─── SEO Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  title: "YOUR_NAME — CSE Engineer Portfolio",
  description:
    "Interactive developer portfolio showcasing modern UI engineering, creative coding, and full-stack projects. Built with Next.js, TypeScript, and Framer Motion.",
  keywords: [
    "developer portfolio",
    "software engineer",
    "CSE",
    "Next.js",
    "TypeScript",
    "React",
    "creative coding",
    "full stack",
  ],
  authors: [{ name: "YOUR_NAME" }],
  openGraph: {
    type: "website",
    title: "YOUR_NAME — CSE Engineer Portfolio",
    description:
      "Interactive developer portfolio with generative graphics, glassmorphism UI, and a living-system feel.",
    siteName: "YOUR_NAME Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUR_NAME — CSE Engineer Portfolio",
    description:
      "Interactive developer portfolio with generative graphics and modern engineering.",
  },
  robots: { index: true, follow: true },
};

/* ─── Root Layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrains.variable} cursor-none-custom font-sans antialiased`}
      >
        <noscript>
          <p>
            This portfolio works best with JavaScript enabled. You can still
            read the content, but animations and interactive features will be
            unavailable.
          </p>
        </noscript>
        {children}
      </body>
    </html>
  );
}
