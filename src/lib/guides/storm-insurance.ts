import type { Cluster, Guide } from "./types";

// Cluster 4: Storm Damage & Insurance
// Persona: "The Storm Survivor" - wind/branch/atmospheric-river damage,
// needs help fast AND insurance answers.
// Money pages: /services/roof-repair, /services/roof-inspections
// Guardrail (topic-cluster-map): insurance content is practical guidance,
// never coverage promises or legal advice.

export const stormInsuranceCluster: Cluster = {
  id: "storm-insurance",
  name: "Storm Damage & Insurance Guide",
  description:
    "When a windstorm or a falling branch gets your roof, you need two things at once: the damage handled and the insurance question answered. This series walks through both, in plain English.",
  pillarSlug: "roof-storm-damage-insurance-oregon",
};

const STORM_CTA = {
  headline: "Storm Got Your Roof?",
  description:
    "Schedule a FREE Roof Assessment and we'll document everything with photos, tell you honestly what's damaged and what isn't, and help you decide the next step. No pressure, no scare stories.",
};

export const stormInsuranceGuides: Guide[] = [
  // ── PILLAR ──────────────────────────────────────────────────────────
  {
    slug: "roof-storm-damage-insurance-oregon",
    clusterId: "storm-insurance",
    isPillar: true,
    title: "Storm Damage & Roof Insurance Claims in Oregon: A Homeowner's Playbook",
    metaTitle: "Roof Storm Damage & Insurance Claims in Oregon",
    description:
      "What to do right after storm damage, how to document it, when a claim makes sense, and how the adjuster process works. Plain answers from a Damascus crew.",
    shortTitle: "The Storm Playbook",
    intro: [
      "Every winter, a few big wind events roll through the Portland metro, and the next morning our phone starts ringing. Shingles in the yard, a branch through the ridge, a new stain on the ceiling. If that's you right now, take a breath. Most storm damage looks scarier than it is, and the steps from here are simpler than they feel.",
      "We're French Roofing, a family roofing company in Damascus. We've been repairing storm damage around Clackamas County since 2014, and we've stood in a lot of driveways with a lot of adjusters. This playbook is the conversation we have with homeowners every storm season: what to do first, what to photograph, when an insurance claim makes sense and when it doesn't, and what actually happens after you file.",
      "One thing before we start: we're roofers, not insurance agents or lawyers. Everything here is practical guidance from the roof side of the process. Your policy is the final word on coverage, and your agent is the right person for coverage questions.",
    ],
    sections: [
      {
        heading: "What should you do right after a storm damages your roof?",
        paragraphs: [
          "First, keep people safe and keep water out of the house. Stay off the roof. Wet shingles are slick, storm-damaged decking can be soft, and nothing up there is worth a fall. If water is coming in, move what you can, put a bucket under the drip, and if the ceiling is bulging with water, poke a small relief hole with a screwdriver so it drains where you choose instead of where it chooses.",
          "Then get the damage stabilized. A proper emergency tarp, installed by someone with the right footwear and fall protection, stops a bad weekend from becoming a bad month. We do emergency tarping as part of our [roof repair service](/services/roof-repair), and most insurance policies expect you to take reasonable steps to prevent further damage after a storm, so keep the receipt.",
          "What you shouldn't do is sign anything on day one. After every big windstorm, door-knockers sweep through neighborhoods around Damascus, Gresham, and Happy Valley with clipboards and urgency. Some are legitimate. Some aren't. Nothing about a roof repair requires a same-day signature, and anyone pushing one is telling you something about themselves.",
        ],
        image: {
          src: "/images/roof-patch-can-solve-an-immediate-issue-but-its-not-a-long-t.jpg",
          alt: "Temporary roof patch protecting a damaged section until the full repair",
        },
      },
      {
        heading: "How do you document roof damage for an insurance claim?",
        paragraphs: [
          "Document everything before anything gets cleaned up or repaired, because the photos are the claim. Shoot wide first, then close: the whole house from the street, each side of the roof from the ground, then close-ups of every damaged area you can safely see. Photograph the debris too, the branch that did it, the shingles in the yard, the fence it took out on the way down.",
          "Inside the house, photograph any ceiling stains, wet insulation, or dripping fixtures, and note the date and time. If more rain is coming and damage might spread, a short video walkthrough is worth doing. Keep every receipt from emergency measures: tarping, water cleanup, all of it.",
          "When we do a storm assessment, this is half of what you're getting. We photograph the damage from the roof itself, close enough to show what a ground-level phone camera can't, and you get every photo whether or not you ever hire us for the repair.",
        ],
      },
      {
        heading: "Should you file an insurance claim or pay out of pocket?",
        paragraphs: [
          "Here's the honest framework: compare the real repair cost against your deductible, and think about the size of the gap. If the repair estimate is close to your deductible, filing gains you little and puts a claim on your record. If a tree opened up the roof and the number is many times your deductible, that's exactly what insurance is for.",
          "That's why the repair estimate comes first, before the claim decision. Get an actual number from a roofer who has been on the roof, not a guess from the ground. We give that number for free, in writing, and we'll tell you straight if the damage is minor enough that a claim doesn't make sense. We'd rather lose an insurance job than talk a neighbor into a claim they didn't need.",
          "Two more things to weigh, and to ask your agent about, not us: how your insurer treats claim frequency, and what your policy says about wind damage specifically. Policies differ, and your declarations page and agent are the reliable sources there.",
        ],
      },
      {
        heading: "How does the roof insurance claim process actually work?",
        paragraphs: [
          "A typical claim runs: you notify your insurer, they assign an adjuster, the adjuster inspects the roof, and the insurer issues a decision and a settlement based on your policy terms. From the first call to an approved scope is commonly a few weeks, longer after a major regional storm when adjusters are swamped.",
          "One term worth knowing: policies pay out on either replacement cost or actual cash value, and the difference is depreciation. Replacement-cost policies typically pay in stages, part up front and the rest after the work is done. Which kind you have, and what your wind deductible is, lives on your declarations page. Read it before the adjuster visit so nothing in the conversation surprises you.",
          "Your job during the process is mostly documentation and access: share your photos, be home for the inspection, and keep records of every conversation. It's paperwork, not combat. Most claims are straightforward when the damage is real and documented.",
        ],
      },
      {
        heading: "What does your roofing contractor do (and not do) in your claim?",
        paragraphs: [
          "A good roofer's role in a claim is evidence and scope: document the damage properly, provide a detailed written estimate, meet the adjuster on the roof to walk the damage together, and make sure nothing gets missed, like flashing damage or a crushed vent that's easy to overlook from the ground. We do all of that as part of a storm assessment.",
          "What a roofer can't do is decide coverage, negotiate your policy, or promise your claim will be approved. Anyone who guarantees an outcome before the adjuster has even been on the roof is selling, not helping. And anyone who offers to 'take care of your deductible' is waving a red flag you should take seriously; if the discount only exists on paper, someone is being lied to, and it's usually the insurer, with your name on the claim.",
          "The pattern we like: you handle the claim, we handle the roof, and the adjuster meeting happens with both of us there. Homeowner, insurer, and roofer each doing their own job is how claims go smoothly.",
        ],
      },
      {
        heading: "What does storm damage look like from the ground?",
        paragraphs: [
          "You can spot most wind damage without leaving your driveway. Missing shingles are obvious, but also look for tabs that are creased or flipped up (they'll read as horizontal lines or shadows across a slope), shingles sitting in the yard or gutters, and a sudden pile of granules at the downspout after one storm.",
          "Check the metal too: bent or lifted flashing at chimneys and walls, a rain cap knocked crooked, gutters pulled away from the fascia. And inside, any new ceiling stain after a storm is worth a look even if the roof appears fine from the street; wind-driven rain finds gaps that normal rain never touches. If a stain shows up, our [roof leak guide](/guides/roof-leak-guide) walks through what it means.",
          "If you see any of this, or a neighbor's roof lost shingles and yours is the same age, get an inspection. Ours are [free and photo-documented](/services/roof-inspections), and 'good news, it held up fine' is a real answer we give all the time.",
        ],
      },
      {
        heading: "Who should you trust with the repair?",
        paragraphs: [
          "After a storm, hire the way you would in calm weather: a local company with an Oregon CCB license, real local references, and a written scope, not whoever knocks first. Storm chasers follow weather events, do fast work, and are gone before the first callback. The out-of-state plates and the pressure tactics usually give it away.",
          "Whoever you choose, ask how they handle surprises. Storm repairs sometimes uncover more damage once the shingles come off, and the difference between a good contractor and a headache is whether you hear about it immediately, with photos and options, or discover it on the final invoice.",
          "We've been here since 2014, we're licensed and insured (CCB #203933), and we'll still be here the winter after next. That's the whole pitch.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will filing a roof claim raise my insurance rates?",
        answer:
          "It can affect your rates or renewal, and how much depends on your insurer, your claim history, and your policy. That's a question worth asking your agent before you file, and it's part of why we suggest getting the repair estimate first, so you're deciding with real numbers.",
      },
      {
        question: "How long do I have to file a claim after storm damage?",
        answer:
          "Policies set their own notice and filing windows, so check yours rather than trusting a rule of thumb. The practical advice: document immediately and don't sit on it. Waiting makes the damage harder to tie to the storm and can let it spread.",
      },
      {
        question: "Does insurance cover a roof that was already old?",
        answer:
          "Insurance generally covers sudden storm damage, not wear and tear, and an older roof gets more scrutiny on which is which. Depending on your policy, payouts on older roofs may also be reduced for depreciation. An honest inspection tells you what's storm damage and what's just age, and that's exactly what we document.",
      },
      {
        question: "Should I sign the paperwork a door-knocking contractor hands me?",
        answer:
          "Not on the spot. Read anything before signing, because some post-storm paperwork assigns your claim rights or commits you to that contractor. A legitimate company will happily give you a day to read a document. Anyone who won't has answered your real question.",
      },
      {
        question: "Do you help with the insurance process?",
        answer:
          "Yes, from the roof side: we document the damage with photos, provide a written estimate, and meet your adjuster on the roof to walk the damage together. Coverage decisions belong to your insurer and policy questions to your agent, and we'll never promise an outcome we don't control.",
      },
    ],
    heroImage: {
      src: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
      alt: "Storm-worn shingles with failing flashing and an active leak, documented during a French Roofing assessment",
    },
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: STORM_CTA,
    datePublished: "2026-07-03",
  },
];
