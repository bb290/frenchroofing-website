import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { COMPANY } from "@/lib/constants";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "French Roofing LLC | Roofing Contractor in Damascus, OR",
    template: "%s | French Roofing LLC",
  },
  description:
    "French Roofing LLC provides expert roof replacement, repair, cleaning, and inspection services in Damascus, OR and the greater Portland metro area. Family-owned, licensed (CCB #203933), and CertainTeed Certified. Schedule a FREE roof assessment today.",
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
    title: "French Roofing LLC | Roofing Contractor in Damascus, OR",
    description:
      "Expert roof replacement, repair, cleaning & inspections. Family-owned, CertainTeed Certified. Serving Damascus, Clackamas, Happy Valley & the Portland metro.",
    images: [{ url: "/images/team-plywood-install.webp", width: 1600, height: 1067 }],
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
    <html lang="en" className={`${lexend.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[var(--font-lexend)]">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
