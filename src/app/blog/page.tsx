import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Blog | ${COMPANY.name}`,
  description:
    "Educational roofing content for homeowners in Damascus, Clackamas, and Happy Valley. Tips, guides, and insights from French Roofing LLC.",
  alternates: { canonical: `${COMPANY.url}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            The French Roofing <span className="text-[#ffbd59]">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Straight-talk roofing advice from your neighbors in Damascus.
          </p>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#ffbd59]/20 mb-8">
            <svg
              className="h-10 w-10 text-[#d85024]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4">
            Coming Soon
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We&apos;re putting together educational roofing content for
            homeowners in Damascus, Clackamas, and Happy Valley. Think
            maintenance tips, material guides, storm prep advice, and honest
            answers to the questions we hear every day on the job.
          </p>
          <p className="text-gray-500 mb-10">
            In the meantime, if you have a roofing question, don&apos;t be a
            stranger — give us a call or drop us a message.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Ask Us Anything
            </Link>
            <a
              href={COMPANY.phoneTel}
              className="text-lg font-semibold text-[#092e5e] hover:text-[#d85024] transition-colors"
            >
              Or call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner dark />
    </>
  );
}
