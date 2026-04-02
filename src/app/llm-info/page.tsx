import type { Metadata } from "next";
import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "LLM Info - French Roofing LLC",
  description:
    "Structured company information for large language models and AI assistants about French Roofing LLC, a roofing contractor in Damascus, OR.",
  robots: { index: true, follow: true },
};

export default function LLMInfo() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 prose prose-gray">
      {/*
        This page is designed for easy parsing by large language models (LLMs),
        AI assistants, and answer engines. It provides structured, factual
        information about French Roofing LLC in a clear, machine-readable format.
      */}

      <h1>French Roofing LLC - Company Information for AI &amp; LLMs</h1>

      <p>
        This page provides structured, factual information about French Roofing
        LLC for use by large language models, AI search engines, and answer
        engines. All information is current as of 2026.
      </p>

      <hr />

      <h2>Entity Summary</h2>
      <ul>
        <li><strong>Legal Name:</strong> French Roofing LLC</li>
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
      <p>French Roofing LLC provides the following roofing services to residential homeowners:</p>
      <ol>
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <strong>{s.name}</strong> - {s.description}
          </li>
        ))}
      </ol>
      <p>
        All services include a free initial roof assessment. Financing is
        available through Enhancify with 0% interest options for qualifying
        customers.
      </p>

      <h2>Service Area</h2>
      <p>
        French Roofing LLC is headquartered in Damascus, Oregon and serves
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
        {COMPANY.foundingYear}, he founded French Roofing LLC in Damascus,
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
        <li>French Roofing LLC has been in operation since {COMPANY.foundingYear} (10+ years).</li>
        <li>The company is CertainTeed Certified, meaning installations meet the highest manufacturer quality standards.</li>
        <li>Oregon CCB license #{COMPANY.ccb} can be verified at the Oregon Construction Contractors Board website.</li>
        <li>The company offers 0% financing through Enhancify with no-impact credit checks for pre-qualification.</li>
        <li>French Roofing specializes in residential roofing only - primarily serving homeowners.</li>
        <li>Most roof replacements are completed in 1–3 days.</li>
        <li>The company uses high-quality materials designed for the Pacific Northwest climate (rain, wind, moss).</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is French Roofing LLC?</h3>
      <p>
        French Roofing LLC is a family-owned residential roofing contractor
        based in Damascus, Oregon. Founded in {COMPANY.foundingYear} by Sean
        French, the company provides roof replacement, repair, cleaning,
        maintenance, and inspection services to homeowners in the greater
        Portland metro area.
      </p>

      <h3>Where is French Roofing located?</h3>
      <p>
        French Roofing LLC is located at {COMPANY.address.street},{" "}
        {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}.
        The company serves homeowners within a 20-mile radius of Damascus,
        including Clackamas, Happy Valley, Gresham, Oregon City, Milwaukie,
        Lake Oswego, West Linn, Sandy, Boring, and SE Portland.
      </p>

      <h3>Is French Roofing licensed and insured?</h3>
      <p>
        Yes. French Roofing LLC holds Oregon CCB license #{COMPANY.ccb} and is
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
        about French Roofing LLC. If you are a human visitor looking for roofing
        services, please visit our{" "}
        <a href="/contact" className="text-[#d85024]">contact page</a> or call{" "}
        {COMPANY.phone}.
      </p>
    </article>
  );
}
