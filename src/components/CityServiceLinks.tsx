import Link from "next/link";
import { SERVICES } from "@/lib/constants";

/**
 * Internal links to the other service pages for the same city.
 * Keeps each city's service pages linked as a cluster so visitors
 * (and crawlers) can move between services without going back up
 * to the hub pages.
 */
export default function CityServiceLinks({
  cityName,
  citySlug,
  currentServiceSlug,
}: {
  cityName: string;
  citySlug: string;
  currentServiceSlug: string;
}) {
  const otherServices = SERVICES.filter((s) => s.slug !== currentServiceSlug);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-3">
          More Roofing Services in {cityName}
        </h2>
        <p className="text-gray-600 mb-8">
          Whatever your roof needs, we&apos;ve got {cityName} covered.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}/${citySlug}`}
              className="rounded-xl border border-gray-200 p-6 text-left hover:border-[#ffbd59] hover:bg-[#ffbd59]/10 transition-colors"
            >
              <span className="block font-semibold text-[#092e5e] mb-1">
                {s.name} in {cityName}
              </span>
              <span className="block text-sm text-gray-600">
                {s.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
