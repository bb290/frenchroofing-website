import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Page Not Found | ${COMPANY.name}`,
};

export default function NotFound() {
  return (
    <section className="bg-white py-24 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[#d85024] font-semibold text-sm uppercase tracking-wider mb-3">
          404 - Page Not Found
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#092e5e] leading-tight mb-6">
          Looks like this page blew off in the last storm.
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          No worries - we&apos;ve got you covered. The page you&apos;re looking
          for either moved or never existed. Here&apos;s where you probably
          want to go:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10 text-left">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-lg border border-gray-200 px-5 py-4 text-sm font-medium text-[#092e5e] hover:border-[#ffbd59] hover:bg-[#ffbd59]/10 transition-colors"
            >
              {s.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/estimate"
            className="rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
          >
            Get an Instant Estimate
          </Link>
          <Link
            href="/"
            className="rounded-lg border-2 border-[#092e5e] px-8 py-4 text-lg font-semibold text-[#092e5e] hover:bg-[#092e5e] hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Or just give us a call:{" "}
          <a href={COMPANY.phoneTel} className="font-medium text-[#d85024] hover:underline">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
