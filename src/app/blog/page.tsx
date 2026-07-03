import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";
import { POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: `Roofing Blog for Portland Metro Homeowners | ${COMPANY.name}`,
  description:
    "Straight answers on roof repair, replacement, moss, storms, and hiring right, from a family roofing crew in Damascus, Oregon.",
  alternates: { canonical: `${COMPANY.url}/blog` },
};

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />

      <section className="bg-[#fdfcfa] pt-16 pb-12 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-[#d85024] font-semibold text-sm uppercase tracking-wider mb-3">
            The French Roofing Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#092e5e] leading-tight mb-6">
            Roofing answers, minus the sales pitch
          </h1>
          <p className="text-lg text-[#3e3d3b] leading-relaxed">
            New articles every week on repairs, replacements, moss, storms, and
            everything else an Oregon roof throws at you. For the deep dives,
            head to our{" "}
            <Link href="/guides" className="font-medium text-[#d85024] hover:underline">
              roof care guides
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-[#fdfcfa]">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-4">
            {POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-[#e5e0d6] bg-[#f5f1ea] px-6 py-5 hover:border-[#ffbd59] transition-colors"
                >
                  <p className="text-sm text-[#9a9895] mb-1">
                    {formatDate(post.datePublished)}
                  </p>
                  <p className="text-lg font-semibold text-[#092e5e] mb-1">
                    {post.title}
                  </p>
                  <p className="text-sm text-[#6b6a67] leading-relaxed">
                    {post.metaDescription}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        headline="Not Sure What Your Roof Needs?"
        description="Schedule a FREE Roof Assessment with French Roofing. We'll take a look, explain what we see in plain English, and give you honest options."
      />
    </>
  );
}
