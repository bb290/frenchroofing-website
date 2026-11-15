import Link from "next/link";
import { getCluster, getGuide } from "@/lib/guides";
import type { Guide } from "@/lib/guides/types";

/*
  Cards linking a page to entries in the Oregon Roofing Guides (redesigned 2026-11-15: equal-height cards in an
  even grid, an icon per guide topic, thicker borders and a soft "floating" shadow). Titles and summaries come from
  the guide registry so they stay in sync with the content.
*/

// Heroicons outline paths, one per guide cluster.
const CLUSTER_ICONS: Record<string, string> = {
  // home: how a roof works
  "roofing-101": "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  // clipboard check: replacement decision
  "replacement-decision": "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
  // wrench: leaks and repair
  "leaks-repair": "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
  // sparkles: moss and roof care
  "moss-care": "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
  // bolt: storms and insurance
  "storm-insurance": "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
};
const FALLBACK_ICON = CLUSTER_ICONS["roofing-101"];

export function GuideCard({ guide, label }: { guide: Guide; label?: string }) {
  const cluster = getCluster(guide.clusterId);
  const tag = label ?? cluster?.name;
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border-2 border-[#e5e0d6] bg-white p-6 shadow-[0_12px_30px_-14px_rgba(9,46,94,0.35)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#ffbd59] hover:shadow-[0_18px_36px_-14px_rgba(9,46,94,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#ffbd59]/25 text-[#092e5e]">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={CLUSTER_ICONS[guide.clusterId] ?? FALLBACK_ICON} />
          </svg>
        </span>
        {tag && <span className="text-base font-semibold text-[#c04520]">{tag}</span>}
      </span>
      <span className="mt-4 block text-xl font-bold leading-snug text-[#092e5e]">{guide.title}</span>
      <span className="mt-auto pt-4 text-lg font-semibold text-[#c04520] group-hover:underline underline-offset-4">
        Read the guide &rarr;
      </span>
    </Link>
  );
}

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

  // Even grid that fits the count: 2 per row on tablets, up to 4 across on wide screens.
  const lg = guides.length >= 4 ? "lg:grid-cols-4" : guides.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section className="bg-[#f5f1ea] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-[#092e5e]">{title}</h2>
        <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${lg} ${guides.length < 4 ? "mx-auto max-w-5xl" : ""}`}>
          {guides.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
