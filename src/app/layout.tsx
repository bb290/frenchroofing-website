import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { COMPANY } from "@/lib/constants";

// Site font (2026-11-15): Figtree replaced Inter. Close to Inter, warmer, and not one of the faces every
// AI-built site lands on. Stored in src/fonts (OFL license next to it) instead of next/font/google: fetching it from
// Google during the build failed intermittently on Vercel ("next/font/google queries have exactly one entry").
// --font-heading is separate so headings can get their own face later.
const figtree = localFont({
  src: "../fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "French Roofing | Roofing Contractor in Damascus, OR",
    template: "%s | French Roofing",
  },
  description:
    "French Roofing provides expert roof replacement, repair, cleaning, and inspection services in Damascus, Clackamas, Happy Valley, and the surrounding area. Family-owned, licensed (CCB #203933), and CertainTeed Certified. Schedule a FREE roof assessment today.",
  keywords: [
    "roofing contractor Damascus OR",
    "roof replacement Damascus Oregon",
    "roof repair Clackamas OR",
    "roof cleaning Happy Valley OR",
    "roofing contractor near me",
    "French Roofing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: "French Roofing | Roofing Contractor in Damascus, OR",
    description:
      "Expert roof replacement, repair, cleaning & inspections. Family-owned, CertainTeed Certified. Serving Damascus, Clackamas, Happy Valley & nearby communities.",
    images: [{ url: "/images/team-plywood-install.webp", width: 1600, height: 1067 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: COMPANY.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} h-full`} style={{ ["--font-heading" as string]: "var(--font-body)" }}>
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
