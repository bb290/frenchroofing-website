import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Service Areas | ${COMPANY.name}`,
  description: `${COMPANY.name} serves homeowners within a 20-mile radius of Damascus, OR — including Happy Valley, Clackamas, Gresham, Oregon City, and more. Roof replacement, repair, cleaning & inspections from your local roofing contractor.`,
  alternates: { canonical: `${COMPANY.url}/service-areas` },
};

export default function ServiceAreasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Local Roofing Contractor
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Serving the Greater Portland Metro
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing is based in Damascus, OR and proudly serves homeowners
            within a 20-mile radius. Whether you need a full roof replacement, a
            quick repair, or just an honest inspection, we treat every home like
            family — no matter which neighborhood you call home.
          </p>
        </div>
      </section>

      {/* ── City List ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-4">
            Cities We Serve
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            From our home base in Damascus, we cover Clackamas County and
            surrounding communities. Click a highlighted city below to learn more
            about our services in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {SERVICE_AREAS.all.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="rounded-full bg-[#092e5e] px-5 py-2 text-sm font-medium text-white hover:bg-[#d85024] transition-colors"
              >
                {area.name}, {area.state}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            Including SE Portland neighborhoods: Lents, Powellhurst-Gilbert,
            Foster-Powell, Woodstock
          </p>
        </div>
      </section>

      {/* ── Why Local Matters ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Why a Local Roofing Contractor Matters
          </h2>
          <p className="text-gray-600 mb-4">
            Oregon weather doesn&apos;t pull punches. Between heavy rain, moss
            growth, wind storms, and the occasional ice event, your roof takes a
            beating year-round. That&apos;s why it matters to work with a roofing
            company that actually lives here — one that understands the climate,
            knows the local building codes, and can be at your door quickly when
            something goes wrong.
          </p>
          <p className="text-gray-600">
            French Roofing has been headquartered in Damascus since 2014. We
            know these neighborhoods because we live in them. When you reach
            out, you&apos;re not contacting a national chain — you&apos;re
            working with your neighbors. Licensed (CCB #{COMPANY.ccb}), insured, CertainTeed
            Certified, and always happy to give you an honest answer.
          </p>
        </div>
      </section>

      {/* ── NAP ── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-md text-center text-[#3e3d3b]">
          <p className="font-semibold text-[#092e5e]">{COMPANY.name}</p>
          <p>
            {COMPANY.address.street}, {COMPANY.address.city},{" "}
            {COMPANY.address.state} {COMPANY.address.zip}
          </p>
          <p>
            <a
              href={COMPANY.phoneTel}
              className="text-[#d85024] font-semibold hover:underline"
            >
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner />
    </>
  );
}
