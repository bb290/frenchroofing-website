"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

const DROPDOWNS = [
  {
    label: "Services",
    href: "/services",
    items: [
      ...SERVICES.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
      { label: "Maintenance Program", href: "/services/maintenance" },
      { label: "Our Warranty", href: "/warranties" },
      { label: "Financing", href: "/financing" },
    ],
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    items: SERVICE_AREAS.all
      .filter((a) => SERVICE_AREAS.priority.includes(a.slug))
      .map((a) => ({
        label: `${a.name}, ${a.state}`,
        href: `/services/roof-replacement/${a.slug}`,
      })),
  },
  {
    label: "Roofing Guides",
    href: "/guides",
    items: [
      { label: "All Roofing Guides", href: "/guides" },
      { label: "10 Essential Questions", href: "/essentials" },
      { label: "Roofing Materials", href: "/materials" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "Our Story", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Community Discounts", href: "/discounts" },
      { label: "Contact", href: "/estimate" },
    ],
  },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="French Roofing"
              width={320}
              height={107}
              className="h-12 sm:h-[67px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {DROPDOWNS.map((menu) => (
              <div key={menu.label} className="relative group">
                <Link
                  href={menu.href}
                  className="px-4 py-2 text-lg font-medium text-gray-700 hover:text-[#c04520] transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                >
                  {menu.label}
                  <svg
                    className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#c04520] transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute top-full left-0 pt-2">
                  <div className="w-56 rounded-xl border border-gray-100 bg-white shadow-lg py-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-[#ffbd59]/10 hover:text-[#c04520] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {(menu.label === "Services" || menu.label === "Service Areas") && (
                      <Link
                        href={menu.href}
                        className="block px-4 py-2.5 text-sm font-medium text-[#c04520] border-t border-gray-100 mt-1 pt-2.5"
                      >
                        View all &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border-2 border-[#092e5e] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#092e5e] hover:bg-[#092e5e] hover:text-white transition-colors"
            >
              Free Assessment
            </a>
            <Link
              href="/estimate"
              className="rounded-lg bg-[#ffbd59] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#092e5e] hover:bg-[#f0ad40] transition-colors"
            >
              Instant Estimate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xl:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {DROPDOWNS.map((menu) => (
              <div key={menu.label}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-700"
                  onClick={() =>
                    setMobileExpanded(mobileExpanded === menu.label ? null : menu.label)
                  }
                >
                  {menu.label}
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      mobileExpanded === menu.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {mobileExpanded === menu.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-[#c04520]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {(menu.label === "Services" || menu.label === "Service Areas") && (
                      <Link
                        href={menu.href}
                        className="block px-3 py-2 text-sm font-medium text-[#c04520]"
                        onClick={() => setMobileOpen(false)}
                      >
                        View all &rarr;
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center rounded-lg border-2 border-[#092e5e] px-5 py-3 text-base font-semibold text-[#092e5e]"
                onClick={() => setMobileOpen(false)}
              >
                Free Assessment
              </a>
              <Link
                href="/estimate"
                className="block text-center rounded-lg bg-[#ffbd59] px-5 py-3 text-base font-semibold text-[#092e5e]"
                onClick={() => setMobileOpen(false)}
              >
                Instant Estimate
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
