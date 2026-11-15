import type { Metadata } from "next";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import ProcessTabs from "@/components/process/ProcessTabs";
import ProcessRail from "@/components/process/ProcessRail";
import type { ProcessStep } from "@/components/process/types";

// Internal review page for Brittany (2026-11-15): three ways to show a service's process. Not linked, not in the
// sitemap, noindex. Delete once an option is chosen and rolled out to the service pages.
export const metadata: Metadata = {
  title: "Process section options (internal)",
  robots: { index: false, follow: false },
};

// The roof replacement steps exactly as they read on /services/roof-replacement, plus a photo and a one-line note
// taken from each step's own text.
const steps: ProcessStep[] = [
  {
    title: "Free Roof Assessment",
    description:
      "We start with a thorough inspection of your existing roof. We document everything with photos, walk you through our findings, and give you an honest recommendation - no pressure, no upsell.",
    image: { src: "/images/sean-peace-sign-near-hole-in-roof.jpg", alt: "Sean French with a peace sign next to a hole in a worn roof" },
    note: "Free, with photos, no pressure",
  },
  {
    title: "Detailed Estimate & Material Selection",
    description:
      "You get a clear, written estimate with no hidden fees. We help you choose the right shingles and materials for Oregon's climate and your budget. Financing through Enhancify is available with 0% options.",
    image: { src: "/images/recent-ridge-cap.webp", alt: "Gray CertainTeed architectural shingles with a finished hip and ridge cap" },
    note: "Written estimate, 0% financing options",
  },
  {
    title: "Tear-Off & Deck Inspection",
    description:
      "Our crew strips the old roof down to the deck and inspects the plywood for any rot or damage. If we find anything, you hear about it right away with options - no surprises on the invoice.",
    image: { src: "/images/workers-tearoff.webp", alt: "French Roofing crew tearing off old shingles down to the roof deck" },
    note: "You hear about anything we find, right away",
  },
  {
    title: "Installation to Manufacturer Specs",
    description:
      "As a CertainTeed Certified contractor, we follow manufacturer specifications to the letter. That means proper underlayment, flashing, ventilation, and shingle installation - the details that make a roof last.",
    image: { src: "/images/install-shingles.webp", alt: "French Roofing crew member installing new shingles" },
    note: "CertainTeed Certified installation",
  },
  {
    title: "Final Walkthrough & Cleanup",
    description:
      "We do a final quality check, clean up your property (magnet sweep included), and walk you through the finished work. Your yard will look better than when we showed up.",
    image: { src: "/images/damascus-replacement-after.webp", alt: "Finished roof replacement in Damascus with clean flashing and vents" },
    note: "Magnet sweep included",
  },
];

function Option({ letter, name, pitch, children, bg = "bg-white" }: { letter: string; name: string; pitch: string; children: React.ReactNode; bg?: string }) {
  return (
    <section className={`px-4 py-16 sm:py-20 ${bg}`}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-3 inline-block rounded-md bg-[#092e5e] px-3 py-1 text-base font-bold text-white">Option {letter}: {name}</div>
        <p className="mb-10 max-w-[40rem] text-lg text-gray-600">{pitch}</p>
        <h2 className="mb-10 text-3xl font-bold text-[#092e5e] sm:text-4xl">Our Roof Replacement Process</h2>
        {children}
      </div>
    </section>
  );
}

export default function ProcessOptionsPage() {
  return (
    <>
      <section className="bg-[#092e5e] px-4 py-12">
        <div className="mx-auto max-w-5xl text-white">
          <h1 className="text-3xl font-bold sm:text-4xl">Process section: 3 options</h1>
          <p className="mt-3 max-w-[42rem] text-lg text-white/90">
            Internal preview for choosing how each service page explains its process. Same roof replacement steps in all
            three. Scroll, click and try it on your phone.
          </p>
        </div>
      </section>
      <Option letter="A" name="Photo timeline" pitch="A line fills in orange as you scroll, with a real job photo beside each step. Tells the job like a story; the most visual.">
        <ProcessTimeline steps={steps} />
      </Option>
      <Option letter="B" name="Step tabs with photo" bg="bg-[#f5f1ea]" pitch="Pick a step to see its photo and details, one at a time, with Previous and Next. The most compact. On phones each step opens in place.">
        <ProcessTabs steps={steps} />
      </Option>
      <Option letter="C" name="Calm step rail" pitch="Numbered cards on a dotted line, each with an icon and a one-line takeaway. No motion and no photos: the easiest to read and the lightest.">
        <ProcessRail steps={steps} />
      </Option>
    </>
  );
}
