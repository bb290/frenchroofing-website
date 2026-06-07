import Link from "next/link";
import { getGuide } from "@/lib/guides";

/**
 * Compact strip linking a page to relevant entries in the Oregon Roofing
 * Guides. Pass guide slugs; titles come from the guide registry so labels
 * stay in sync with the content.
 */
export default function RelatedGuides({
  slugs,
  title = "From the Oregon Roofing Guides",
}: {
  slugs: string[];
  title?: string;
}) {
  const guides = slugs
    .map((slug) => getGuide(slug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  if (guides.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-[#f5f1ea]">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-xl font-semibold text-[#092e5e] mb-5 text-center">
          {title}
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="inline-block rounded-lg border border-[#e5e0d6] bg-white px-5 py-3 text-sm font-medium text-[#092e5e] hover:border-[#ffbd59] transition-colors"
              >
                {g.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
