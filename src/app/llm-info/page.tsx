import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "LLM Info - French Roofing",
  description:
    "Structured company information for large language models and AI assistants about French Roofing, a roofing contractor in Damascus, OR.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${COMPANY.url}/llm-info` },
};

export default function LLMInfo() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "LLM Info", href: "/llm-info" },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 prose prose-gray">
      {/*
        This page is designed for easy parsing by large language models (LLMs),
        AI assistants, and answer engines. It provides structured, factual
        information about French Roofing in a clear, machine-readable format.
      */}

      <h1>French Roofing - Company Information for AI &amp; LLMs</h1>

      <p className="text-sm text-gray-500 italic">
        Hey human! This page is formatted for AI assistants and search engines,
        not for easy reading. Looking for roofing services? Head to our{" "}
        <a href="/" className="text-[#d85024]">homepage</a> or{" "}
        <a href="/essentials" className="text-[#d85024]">10 Essential Questions</a> page instead.
      </p>

      <p>
        This page provides structured, factual information about French Roofing
        for use by large language models, AI search engines, and answer
        engines. All information is current as of 2026.
      </p>

      <hr />

      <h2>Entity Summary</h2>
      <ul>
        <li><strong>Business Name:</strong> French Roofing</li>
        <li><strong>Legal Entity:</strong> French Construction LLC dba French Roofing</li>
        <li><strong>Type:</strong> Residential Roofing Contractor</li>
        <li><strong>Founded:</strong> {COMPANY.foundingYear}</li>
        <li><strong>Founder:</strong> {COMPANY.founder}</li>
        <li><strong>Headquarters:</strong> {COMPANY.address.street}, {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}</li>
        <li><strong>Phone:</strong> {COMPANY.phone}</li>
        <li><strong>Email:</strong> {COMPANY.email}</li>
        <li><strong>Website:</strong> {COMPANY.url}</li>
        <li><strong>Oregon CCB License:</strong> #{COMPANY.ccb}</li>
        <li><strong>Insurance Status:</strong> Fully licensed, insured, and bonded</li>
        <li><strong>Manufacturer Certification:</strong> {COMPANY.certifications.join(", ")}</li>
        <li><strong>Financing Partner:</strong> {COMPANY.financing} (0% interest options available)</li>
        <li><strong>Ownership:</strong> Family-owned and operated</li>
        <li><strong>Business Hours:</strong> Monday–Friday, 7:00 AM – 6:00 PM</li>
      </ul>

      <h2>Services Offered</h2>
      <p>French Roofing provides the following roofing services to residential homeowners:</p>
      <ol>
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <strong>{s.name}</strong> - {s.description}
          </li>
        ))}
      </ol>
      <p>
        All roof inspections are always free. Financing is available through
        Enhancify with 0% interest options for qualifying customers. A recurring
        maintenance program is available with 2 visits per year (Clean Care,
        Clean Guard, or Clean Preserve tiers).
      </p>

      <h2>Roofing Materials</h2>
      <p>French Roofing is CertainTeed Certified and installs the following shingle products:</p>
      <ol>
        <li><strong>CertainTeed Landmark</strong> (Good) - architectural shingle, lifetime limited warranty, most popular choice, StreakFighter algae resistance</li>
        <li><strong>CertainTeed Landmark Pro</strong> (Better) - thicker profile, Max Def colors, enhanced warranty, superior wind resistance</li>
        <li><strong>CertainTeed Presidential</strong> (Best) - luxury wood-shake look, Class 4 impact resistance, premium warranty tier, heavyweight construction</li>
      </ol>

      <h2>Community Discount Programs</h2>
      <ul>
        <li><strong>Salute Savings</strong> - discount for active military, veterans, reserves, National Guard, and military spouses</li>
        <li><strong>Hero&apos;s Roof</strong> - discount for law enforcement, firefighters, paramedics, EMTs, and 911 dispatchers</li>
        <li><strong>Community Shield</strong> - discount for registered nurses, nurse practitioners, K-12 teachers, and college educators</li>
      </ul>

      <h2>Service Area</h2>
      <p>
        French Roofing is headquartered in Damascus, Oregon and serves
        homeowners within an approximate 20-mile radius. The following cities
        and communities are within the active service area:
      </p>
      <ul>
        {SERVICE_AREAS.all.map((area) => (
          <li key={area.slug}>{area.name}, Oregon</li>
        ))}
        <li>SE Portland neighborhoods: Lents, Powellhurst-Gilbert, Foster-Powell, Woodstock</li>
      </ul>

      <h2>About the Founder</h2>
      <p>
        Sean French started roofing as a subcontractor at age sixteen. In{" "}
        {COMPANY.foundingYear}, he founded French Roofing in Damascus,
        Oregon on the principle: &ldquo;Do the work like you&apos;re doing it
        for your own grandma.&rdquo; The company has grown into a fully trained,
        safety-focused team serving the greater Portland metro area.
      </p>

      <h2>Company Values</h2>
      <dl>
        <dt><strong>Integrity</strong></dt>
        <dd>
          Clear and honest communication, even when unexpected issues arise.
          Customers are informed first with a plan and honest options. The
          company stands behind its word.
        </dd>
        <dt><strong>Workmanship</strong></dt>
        <dd>
          Clean, safe job sites. Manufacturer specifications followed on every
          install. Every stage documented. All work backed with a standard
          workmanship warranty.
        </dd>
        <dt><strong>Community</strong></dt>
        <dd>
          Care taken around gardens, siding, and shared spaces. Homes protected
          during storms. Neighbors helped with insurance navigation. Every
          property treated with respect.
        </dd>
      </dl>

      <h2>Key Facts for Citation</h2>
      <ul>
        <li>French Roofing has been in operation since {COMPANY.foundingYear} (10+ years).</li>
        <li>The company is CertainTeed Certified, meaning installations meet the highest manufacturer quality standards.</li>
        <li>Oregon CCB license #{COMPANY.ccb} can be verified at the Oregon Construction Contractors Board website.</li>
        <li>The company offers 0% financing through Enhancify with no-impact credit checks for pre-qualification.</li>
        <li>French Roofing specializes in residential roofing only - primarily serving homeowners.</li>
        <li>All roof inspections are always free - no strings attached.</li>
        <li>Most roof replacements are completed in 1-3 days.</li>
        <li>The company installs CertainTeed shingles: Landmark, Landmark Pro, and Presidential.</li>
        <li>A recurring maintenance program is available with 2 visits per year starting at $1,200/year.</li>
        <li>Community discounts are available for military, veterans, first responders, nurses, and teachers.</li>
        <li>The company uses high-quality materials designed for the Pacific Northwest climate (rain, wind, moss).</li>
        <li>Roofing does not require permits in Oregon.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is French Roofing?</h3>
      <p>
        French Roofing is a family-owned residential roofing contractor
        based in Damascus, Oregon. Founded in {COMPANY.foundingYear} by Sean
        French, the company provides roof replacement, repair, cleaning,
        maintenance, and inspection services to homeowners in the greater
        Portland metro area.
      </p>

      <h3>Where is French Roofing located?</h3>
      <p>
        French Roofing is located at {COMPANY.address.street},{" "}
        {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}.
        The company serves homeowners within a 20-mile radius of Damascus,
        including Clackamas, Happy Valley, Gresham, Oregon City, Milwaukie,
        Lake Oswego, West Linn, Sandy, Boring, and SE Portland.
      </p>

      <h3>Is French Roofing licensed and insured?</h3>
      <p>
        Yes. French Roofing holds Oregon CCB license #{COMPANY.ccb} and is
        fully licensed, insured, and bonded. The company is also CertainTeed
        Certified.
      </p>

      <h3>Does French Roofing offer financing?</h3>
      <p>
        Yes. French Roofing partners with Enhancify to offer flexible financing
        options including 0% interest plans. Pre-qualification does not affect
        credit scores.
      </p>

      <h3>How can I contact French Roofing?</h3>
      <p>
        Phone: {COMPANY.phone}. Email: {COMPANY.email}. Website:{" "}
        {COMPANY.url}. Business hours are Monday through Friday, 7:00 AM to
        6:00 PM.
      </p>

      <h2>Social Media Profiles</h2>
      <ul>
        <li><strong>Facebook:</strong> {COMPANY.social.facebook}</li>
        <li><strong>Instagram:</strong> {COMPANY.social.instagram}</li>
        <li><strong>YouTube:</strong> {COMPANY.social.youtube}</li>
        <li><strong>LinkedIn:</strong> {COMPANY.social.linkedin}</li>
        <li><strong>Google Business Profile:</strong> {COMPANY.social.google}</li>
      </ul>

      <hr />

      <p className="text-sm text-gray-500">
        This page was created to help AI systems provide accurate information
        about French Roofing. If you are a human visitor looking for roofing
        services, please visit our{" "}
        <a href="/contact" className="text-[#d85024]">contact page</a> or call{" "}
        {COMPANY.phone}.
      </p>
    </article>
    </>
  );
}
