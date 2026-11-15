import type { ProcessStep } from "@/components/process/types";

/*
  Process steps for each service, shared by the service page and its town pages (they were identical copies).
  Shown with ProcessTimeline (option A, chosen by Brittany 2026-11-15). Step wording is unchanged from the old pages;
  each `note` is a short takeaway taken from that step's own text.

  Photos: public/images/process/. Photos from inspection or estimate visits (Housecall Pro notes say "not a completed
  French Roofing job") only illustrate what we look for, so their alt text never says we did that work. Steps
  without an honest photo have none.
*/

const img = (name: string, alt: string) => ({ src: `/images/process/${name}.webp`, alt });

export const REPLACEMENT_STEPS: ProcessStep[] = [
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
    image: { src: "/images/recent-ridge-cap.webp", alt: "Gray architectural shingles with a finished hip and ridge cap" },
    note: "Written estimate, 0% financing options",
  },
  {
    // Added 2026-11-15 (Brittany). Wording from the approved "We protect your lawn" tear-off reel (2026-11-10):
    // tarps cover the lawn, bushes and shrubs; clean as we go. Photo: frame from that reel's footage.
    title: "Job Site Prep",
    description:
      "Before anything comes off the roof, our crew covers your lawn, bushes, and shrubs with tarps. Old shingles land on the tarps, not in your yard, and we clean up as we go.",
    image: img("replacement-job-site-prep-tarps", "French Roofing crew with tarps spread over the lawn and around the house before a tear-off"),
    note: "Tarps over your lawn and shrubs",
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

export const REPAIR_STEPS: ProcessStep[] = [
  {
    title: "Inspection & Diagnosis",
    description:
      "We climb up, take photos, and figure out exactly what's going on. No guesswork - we show you what we find and explain your options in plain English.",
    image: img("repair-diagnosis-pipe-boot", "A rusting pipe boot with a split rubber collar, a common leak source found on inspections"),
    note: "Photos of what we find, in plain English",
  },
  {
    title: "Honest Recommendation",
    description:
      "Sometimes a repair is all you need. Sometimes a replacement makes more sense long-term. We'll tell you the truth either way. You'll get a clear estimate with no hidden costs.",
    image: img("repair-recommendation-patched-slope", "An older roof covered in mismatched patch shingles, the kind of roof where repair or replace is a real question"),
    note: "Repair or replace: the truth either way",
  },
  {
    title: "Targeted Repair",
    description:
      "Our crew addresses the specific issue - whether it's replacing damaged shingles, sealing cracked flashing, fixing a leak, or repairing storm damage. We use quality materials that match your existing roof.",
    image: img("repair-targeted-new-underlayment", "A French Roofing shingle repair in progress, with damaged shingles cut out and new underlayment down"),
    note: "Materials that match your existing roof",
  },
  {
    title: "Quality Check & Cleanup",
    description:
      "We verify the repair is solid, clean up any debris, and make sure you're happy with the work before we call it done.",
    image: img("repair-crew-on-the-job", "New shingles going on over underlayment, with plastic sheeting protecting the plants below"),
    note: "Not done until you're happy",
  },
];

export const CLEANING_STEPS: ProcessStep[] = [
  {
    title: "Roof Assessment",
    description:
      "Before we touch anything, we inspect your roof to understand the type of growth, buildup, and any underlying issues. We note areas that need extra attention and flag anything that might need repair.",
    image: img("cleaning-assessment-moss-and-leaves", "Older shingles under a maple, covered in leaf litter with moss in the gaps"),
    note: "We flag anything that might need repair",
  },
  {
    title: "Debris Removal",
    description:
      "We clear leaves, branches, pine needles, and anything else that's been collecting up there. Clogged valleys and gutters are one of the biggest causes of premature roof wear in Oregon.",
    image: img("cleaning-debris-pine-needles", "A roof covered in pine needles under tall trees"),
    note: "Leaves, branches, and needles cleared",
  },
  {
    title: "Moss & Algae Treatment",
    description:
      "Oregon's damp climate is a moss factory. We treat moss and algae growth with methods that are effective but won't damage your shingles or harm your landscaping.",
    image: img("cleaning-heavy-moss", "Thick moss growing on a shaded roof slope"),
    note: "Safe for your shingles and landscaping",
  },
  {
    title: "Gutter Cleanout",
    description:
      "While we're up there, we make sure your gutters and downspouts are clear and flowing properly. It's all connected - a clean roof with clogged gutters still causes problems.",
    image: img("cleaning-packed-gutter", "A gutter packed with leaves and needles below a mossy shingle roof"),
    note: "Gutters and downspouts flowing",
  },
  {
    title: "Maintenance Report",
    description:
      "You get a summary of what we did, what we found, and any recommendations for future care. No surprise bills - just honest info to help you plan ahead.",
    note: "No surprise bills",
  },
];

export const INSPECTION_STEPS: ProcessStep[] = [
  {
    title: "Schedule Your Inspection",
    description:
      "Book online and we'll find a time that works for you - inspections typically take about an hour depending on the size of your roof.",
    note: "About an hour",
  },
  {
    title: "Exterior Roof Inspection",
    description:
      "We inspect shingles, flashing, vents, ridge caps, valleys, gutters, and drip edge. We check for moss, algae, storm damage, and signs of wear. Everything gets documented with photos.",
    image: img("inspection-chimney-flashing", "Metal flashing around a brick chimney, one of the spots checked on an inspection"),
    note: "Everything documented with photos",
  },
  {
    title: "Attic & Interior Check",
    description:
      "When accessible, we look at the underside of the roof deck for signs of leaks, moisture, daylight, ventilation issues, and insulation problems. This is where hidden damage shows up.",
    image: img("inspection-attic-decking", "The underside of a roof deck in an attic, checked for leaks and moisture"),
    note: "Where hidden damage shows up",
  },
  {
    title: "Detailed Report & Recommendations",
    description:
      "You get a clear, photo-documented report of our findings - what's in good shape, what needs attention now, and what to keep an eye on. No jargon, no scare tactics, just the facts.",
    image: img("inspection-granule-loss", "Close-up of worn shingles with patchy granule loss"),
    note: "No jargon, no scare tactics",
  },
];
