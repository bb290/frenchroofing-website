import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${title} | ${COMPANY.name} Blog`,
    description: `Read about ${title.toLowerCase()} from French Roofing LLC - your trusted roofing experts in Damascus, OR.`,
    alternates: { canonical: `${COMPANY.url}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: title, href: `/blog/${slug}` },
        ]}
      />

      {/* ── Article ── */}
      <article className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-[#d85024] hover:underline mb-8"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-10">
            <span>{COMPANY.name}</span>
            <span>&middot;</span>
            <span>Damascus, OR</span>
          </div>

          {/* Placeholder content area */}
          <div className="prose prose-lg max-w-none text-gray-600">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-10 text-center">
              <p className="text-lg font-medium text-[#092e5e] mb-2">
                This post is coming soon.
              </p>
              <p className="text-gray-500">
                We&apos;re working on helpful roofing content for homeowners in
                the Damascus and Clackamas County area. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ── CTA ── */}
      <CTABanner
        headline="Got a Roofing Question?"
        description="Skip the Google rabbit hole - just ask us directly. We're happy to help."
      />
    </>
  );
}
