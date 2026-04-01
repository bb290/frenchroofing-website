"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

const BOOKING = COMPANY.bookingUrl;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 sm:h-36 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex-1 lg:flex-none">
            <Image
              src="/images/logo.png"
              alt="French Roofing LLC"
              width={320}
              height={107}
              className="h-24 sm:h-[134px] w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#d85024] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={COMPANY.phoneTel}
              className="text-sm font-semibold text-[#092e5e]"
            >
              {COMPANY.phone}
            </a>
            <a
              href={BOOKING}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#d85024] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Free Roof Assessment
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-gray-700"
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
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#d85024]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={COMPANY.phoneTel}
                className="block text-center text-lg font-semibold text-[#092e5e]"
              >
                {COMPANY.phone}
              </a>
              <a
                href={BOOKING}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center rounded-lg bg-[#d85024] px-5 py-3 text-base font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Free Roof Assessment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
