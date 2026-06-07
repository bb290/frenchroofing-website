import type { Cluster, Guide } from "./types";

// Cluster 6: Roofing 101
// Persona: any homeowner who wants to understand what they're buying.
// Pure education (messaging pillar #4). Component-level questions are
// prime AI-citation territory. FR recommendations stated plainly:
// ridge vents for exhaust, metal (open) valleys.
// Money pages: /materials, service pages, /estimate

export const roofing101Cluster: Cluster = {
  id: "roofing-101",
  name: "Roofing 101",
  description:
    "What's actually up there? Every component of a residential roof, how the system works together, and the honest opinions we've formed about vents, valleys, and materials after twenty years on roofs.",
  pillarSlug: "roofing-101",
};

const EDU_CTA = {
  headline: "Curious What's on Your Roof?",
  description:
    "Schedule a FREE roof assessment and we'll walk you through your roof's actual components, with photos. No pressure, just answers.",
};

export const roofing101Guides: Guide[] = [
  // ── PILLAR ──────────────────────────────────────────────────────────
  {
    slug: "roofing-101",
    clusterId: "roofing-101",
    isPillar: true,
    title: "Roofing 101: How a Roof Actually Works",
    description:
      "Every component of a residential roof, from the deck to the ridge cap, and how they work together as a system. Plain-English education from a Damascus roofing crew.",
    shortTitle: "Roofing 101",
    intro: [
      "Most homeowners only think about their roof twice: the day it's installed and the day it leaks. Fair enough. But if you're about to spend real money on one, or you just want to understand the thing protecting everything you own, it helps to know what's actually up there.",
      "Here's the whole system, from the wood up, explained the way we'd explain it on your driveway. No jargon without a translation, and our honest opinions included at no extra charge.",
    ],
    sections: [
      {
        heading: "A roof is a system, not a layer of shingles",
        paragraphs: [
          "The shingles are just the visible layer. A residential roof is a stack of components that each do one job: structure, moisture barrier, water shedding, edge protection, sealed penetrations, and airflow. When a roof fails early, it's almost never because every layer failed. It's because one component was skipped, rushed, or mismatched, and the system lost to water at its weakest point.",
          "That's the single most useful thing to understand when comparing estimates: you're not buying shingles, you're buying a system. Two quotes for 'the same shingles' can describe very different roofs.",
        ],
      },
      {
        heading: "The deck: the structure everything sits on",
        paragraphs: [
          "At the bottom of the stack is the roof deck (or sheathing): the plywood or OSB panels fastened to your rafters. Every other layer attaches to it, which means the whole roof is only as solid as this wood.",
          "Decking is also the part nobody can fully inspect until tear-off, which is why honest replacement quotes treat it as a documented unknown. The full story, including plywood vs OSB and how rot gets found and fixed: [the roof deck, explained](/guides/roof-deck-explained).",
        ],
        image: {
          src: "/images/team-plywood-install.webp",
          alt: "French Roofing crew installing new plywood decking on a roof",
        },
      },
      {
        heading: "Underlayment: the backup waterproofing",
        paragraphs: [
          "Directly on the deck goes underlayment: a water-resistant sheet that backs up the shingles when wind drives rain past them. In the vulnerable zones (valleys, eaves, around penetrations), a stickier, fully waterproof layer called ice and water shield does the heavy lifting.",
          "Underlayment is invisible the day the job finishes and decisive the night a storm tests the roof. It's also a classic place for cheap bids to quietly save money. What the options are and where each belongs: [underlayment and ice and water shield, explained](/guides/roof-underlayment-explained).",
        ],
      },
      {
        heading: "Shingles: the weather surface",
        paragraphs: [
          "The shingles shed the water, take the UV, and give the roof its look. For most homes around here that means asphalt shingles, and the meaningful choice is between the budget 3-tab style and architectural shingles ([we've compared them honestly](/guides/architectural-vs-3-tab-shingles); architectural wins in our climate).",
          "Within architectural shingles, manufacturers sell good-better-best product lines, and reading those tiers is easier than the brochures make it look: [shingle product lines, decoded](/guides/shingle-product-lines).",
        ],
        image: {
          src: "/images/install-shingles.webp",
          alt: "Architectural shingles being installed over underlayment",
        },
      },
      {
        heading: "Flashing: the seams and transitions",
        paragraphs: [
          "Everywhere the shingle field gets interrupted (chimneys, walls, skylights, valleys), shaped metal called flashing carries water over the seam. It's a small fraction of the roof and the source of most leaks, which tells you everything about how much installation detail matters.",
          "We covered flashing in depth in our leak series: [the leak source nobody checks](/guides/roof-flashing-leaks).",
        ],
      },
      {
        heading: "Valleys: where two roof planes meet",
        paragraphs: [
          "Valleys carry more water than any other part of the roof, and there's a genuine fork in how they're built: shingled over (closed) or lined with exposed metal (open). We recommend metal valleys, especially under Oregon tree cover, and we lay out the honest comparison here: [roof valley options](/guides/roof-valley-options).",
        ],
        image: {
          src: "/images/valley-install.webp",
          alt: "A roof valley being installed during a replacement",
        },
      },
      {
        heading: "Penetrations: every hole in the roof",
        paragraphs: [
          "Plumbing vents, bathroom fans, furnace flues, skylights: every one is a deliberate hole in your roof with its own sealing system. Each kind seals differently, ages differently, and fails differently. The guided tour: [roof penetrations, explained](/guides/roof-penetrations-explained).",
        ],
      },
      {
        heading: "Edges: drip edge, starter strips, and the gutter line",
        paragraphs: [
          "The perimeter of the roof has its own kit: drip edge metal that keeps water off the fascia, starter strips that seal the first shingle course, and the gutter system that takes the water away. Edges are where wind attacks and where [clogged gutters](/guides/clogged-gutters-roof-damage) do their damage, and the details live here: [roof edges, explained](/guides/drip-edge-roof-edges).",
        ],
      },
      {
        heading: "Ventilation: the part of the roof that handles air",
        paragraphs: [
          "A roof doesn't just keep water out; it has to let your attic breathe. Intake vents at the soffits and exhaust at the top create airflow that keeps the attic cool in summer and dry in winter. Bad ventilation cooks shingles from below and feeds condensation that imitates a leak.",
          "There are several exhaust vent types, and we have a clear favorite: ridge vents. The reasoning, plus the whole intake-and-exhaust picture: [roof ventilation, explained](/guides/roof-ventilation-explained).",
        ],
        image: {
          src: "/images/worker-ridge.webp",
          alt: "French Roofing crew member working along a roof ridge",
        },
      },
      {
        heading: "How the system earns its lifespan",
        paragraphs: [
          "Put it together and the logic of roof care gets simple. Installation quality decides whether the components work as a system ([it's why contractor choice is the real decision](/essentials)). Maintenance decides whether the system reaches its potential ([the care calendar](/guides/oregon-roof-care-calendar)). And when something does fail, knowing the components means repairs target causes instead of symptoms ([the leak guide](/guides/roof-leak-guide)).",
          "Want to see your own roof's components instead of diagrams? A [free assessment](/services/roof-inspections) comes with photos of exactly what's up there.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the layers of a roof, in order?",
        answer:
          "From the bottom up: rafters or trusses, the deck (plywood or OSB), underlayment (with ice and water shield in vulnerable zones), drip edge at the perimeter, flashing at every interruption, shingles, and ridge caps with ventilation at the top.",
      },
      {
        question: "Which roof component fails first?",
        answer:
          "Usually the accessories, not the shingles: pipe boot gaskets, sealants, and flashing details have shorter lives than the shingle field around them. It's why maintenance inspections pay for themselves; the early failures are the cheap ones.",
      },
      {
        question: "What matters more, the shingle brand or the installer?",
        answer:
          "The installer, and it isn't close. Identical shingles installed by two crews can produce roofs with very different lifespans. Manufacturer certifications exist precisely because brands know installation decides their product's reputation.",
      },
      {
        question: "Do all of these components get replaced during a roof replacement?",
        answer:
          "Everything above the deck should be: underlayment, flashing, boots, drip edge, vents, shingles. The deck itself gets inspected at tear-off and replaced only where damaged. If a quote reuses old flashing, ask why; it's usually a corner being cut.",
      },
    ],
    heroImage: {
      src: "/images/workers-tearoff.webp",
      alt: "A roof stripped to the deck during replacement, showing the layers of a roofing system",
    },
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  // ── SUPPORTING ──────────────────────────────────────────────────────
  {
    slug: "roof-ventilation-explained",
    clusterId: "roofing-101",
    title: "Roof Ventilation Explained",
    description:
      "How attic ventilation works, the exhaust vent types compared (ridge, box, turbine, powered), and why ridge vents are our standard recommendation.",
    shortTitle: "Ventilation, explained",
    intro: [
      "Your roof has a second job besides keeping water out: letting your attic breathe. Done right, ventilation keeps the attic close to outdoor temperature year-round, which protects the shingles, the framing, and your energy bill. Done wrong, it quietly shortens the roof's life from below.",
      "And yes, we have a favorite vent. We'll make the case.",
    ],
    sections: [
      {
        heading: "How attic ventilation actually works",
        paragraphs: [
          "Ventilation is a loop: cool air enters low through intake vents in the soffits (the underside of the eaves), warms in the attic, rises, and exits high through exhaust vents near the ridge. No fans required; physics runs it around the clock.",
          "Both halves matter equally. Exhaust without intake just stalls, and intake without exhaust has nowhere to send the air. When we evaluate a ventilation problem, blocked soffit vents (usually by insulation) are the culprit as often as missing exhaust.",
        ],
      },
      {
        heading: "Why ventilation matters more in Oregon than you'd think",
        paragraphs: [
          "Summer is the obvious case: a poorly vented attic bakes, and shingles cooked from below age years ahead of schedule. But Oregon's real ventilation season is winter. Eight months of indoor heating against cold, damp air means warm moist air migrating into the attic, and without airflow it condenses on the underside of the roof deck.",
          "We've inspected 'leaks' that were nothing but condensation: damp decking, frosty nail tips, water stains with no hole anywhere. ([It's one of the impostors in our ceiling stain guide.](/guides/water-stain-on-ceiling)) Persistent condensation rots decking just as surely as a real leak.",
        ],
      },
      {
        heading: "The exhaust vent types, compared",
        paragraphs: ["The realistic options on a shingle roof:"],
        bullets: [
          "Ridge vents: a continuous low-profile vent along the entire ridge line, covered by cap shingles. Even airflow across the whole attic, no moving parts, nearly invisible. Our recommendation.",
          "Box vents (static vents): individual hooded openings scattered near the ridge. They work, but coverage is patchy: each vent serves its own neighborhood, and the attic corners between them stay stale.",
          "Turbine vents: the spinning ones. They move good air when the wind blows and squeak their way into your dreams when the bearings age.",
          "Powered vents: electric fans, sometimes solar. Real airflow, plus a motor to maintain, energy to spend, and a failure point on your roof. Occasionally right for difficult attics; rarely the first choice.",
          "Gable vents: openings in the end walls. Common on older homes, and they short-circuit ridge-and-soffit systems by pulling air sideways instead of bottom-to-top. We often recommend closing them when modernizing ventilation.",
        ],
      },
      {
        heading: "Why ridge vents win",
        paragraphs: [
          "A ridge vent exhausts evenly along the highest line of the roof, which is exactly where rising warm air wants to leave. Paired with clear soffit intake, it ventilates the entire attic volume instead of pockets, has no motors or bearings to die, and sits low enough that you stop noticing it the week after installation.",
          "One rule that matters: don't mix exhaust types. A ridge vent plus old box vents sounds like extra ventilation, but the box vents become intake for the ridge vent, short-circuiting the loop at the top of the attic while the soffits get bypassed. When we install a ridge vent, retiring the old exhaust is part of the job.",
          "Every replacement we do includes a ventilation check as standard. ([What else a replacement includes.](/guides/roof-replacement-day-by-day))",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know if my attic is poorly ventilated?",
        answer:
          "Summer clues: an attic that feels like an oven and upstairs rooms that won't cool. Winter clues: condensation or frost on the underside of the deck, damp insulation, musty smell. Roof clues: shingles aging faster on the whole roof than their years justify.",
      },
      {
        question: "Can ridge vents leak in heavy rain?",
        answer:
          "Quality ridge vents are baffled specifically to shed wind-driven rain, and installed correctly they're as weathertight as the ridge they replaced. The leaks we see at ridges are almost always aged cap shingles or installation shortcuts, not the vent concept.",
      },
      {
        question: "Can ventilation be fixed without replacing the roof?",
        answer:
          "Often, yes. Clearing blocked soffits, adding intake, or cutting in a ridge vent are all doable on an existing roof in decent condition. Replacement time is simply the cheapest moment to do it, since the ridge is already open.",
      },
    ],
    ogPhoto: "/images/crew-putting-on-harnesses-safety-first.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-valley-options",
    clusterId: "roofing-101",
    title: "Roof Valley Options, Explained",
    description:
      "Closed-cut, woven, and open metal valleys compared: how each handles water, debris, and Oregon tree cover, and why metal valleys are our standard recommendation.",
    shortTitle: "Valley options, explained",
    intro: [
      "A valley is where two roof planes meet and combine their runoff, which makes it the busiest water channel on your roof. There are three common ways to build one, and the choice matters more in Oregon than almost anywhere, because our valleys don't just carry water. They carry fir needles.",
      "We recommend open metal valleys. Here's the comparison that gets us there.",
    ],
    sections: [
      {
        heading: "The three valley styles",
        paragraphs: [""],
        bullets: [
          "Closed-cut valleys: shingles from one plane run across the valley, the other plane's shingles are trimmed along a line. The valley is shingled over; you see no metal. The most common style because it's fast and uses no extra material.",
          "Woven valleys: shingles from both planes interlace across the valley. Mostly a legacy style; the weave can bridge unevenly and trap debris, and we rarely build them.",
          "Open metal valleys: a wide metal channel (typically a W-profile) is installed in the valley, and shingles from both sides stop short of its center. The water rides the metal. You see a clean metal line.",
        ],
        image: {
          src: "/images/valley-install.webp",
          alt: "An open valley being installed with shingles trimmed to the channel",
        },
      },
      {
        heading: "How they handle water",
        paragraphs: [
          "All three shed ordinary rain fine when new. The differences show up under stress. Closed valleys ask shingles to do a job at the roof's highest-volume channel, and shingles in the valley wear faster than anywhere else: the concentrated flow scrubs granules with every storm.",
          "Metal doesn't have granules to lose. An open valley gives the heaviest water on your roof a smooth, durable, purpose-built channel, and the shingle edges sit out of the main current. Under ice or the occasional valley snow-melt cycle, the smooth channel also gives backing water fewer seams to probe.",
        ],
      },
      {
        heading: "How they handle Oregon debris (the deciding factor)",
        paragraphs: [
          "Here's where our recommendation gets local. Valleys under Doug firs and cedars collect needles constantly, and [debris dams in valleys are one of the main ways standing water starts](/guides/standing-water-roof-valleys). A closed valley's shingle texture grips that debris; an open metal valley's smooth channel sheds much of it on its own and surrenders the rest easily to a cleaning.",
          "Around Damascus, Clackamas, and Happy Valley, where tree cover is the rule rather than the exception, that difference compounds every single year of the roof's life. It's why metal valleys are our default recommendation here, not just an upgrade for special cases.",
        ],
      },
      {
        heading: "The honest trade-offs",
        paragraphs: [
          "Cost: an open metal valley adds material and detail work, so it costs more on installation day. Against a couple of decades of better debris shedding, slower valley wear, and easier maintenance, we think the math favors metal comfortably ([valley repairs are mid-tier repair money](/guides/what-roof-repairs-cost); avoiding them buys back the difference).",
          "Looks: this one's genuinely subjective. Some homeowners love the crisp metal line, some prefer the all-shingle look. Color-matched valley metal splits the difference nicely.",
          "Whichever style your roof has today, the maintenance rule is the same: keep the valleys clear. ([The care calendar covers when.](/guides/oregon-roof-care-calendar))",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a closed valley be converted to metal without a full replacement?",
        answer:
          "Yes. Valley rebuilds are a standard repair: the shingles along the valley come up, the metal goes in, and the field shingles get trimmed back to the channel. It's a sensible mid-life upgrade for a debris-prone valley on an otherwise healthy roof.",
      },
      {
        question: "What metal is used in open valleys?",
        answer:
          "Painted steel or aluminum are the common choices, in a W-profile that stiffens the channel and keeps heavy flow from crossing the center line. The paint options are what let the valley blend with or accent your shingle color.",
      },
      {
        question: "Do metal valleys rust?",
        answer:
          "Modern painted valley metal is coated for decades of weather exposure; rust on a reasonably young valley usually points to damage or bare-metal cuts rather than the material wearing out. It's one of the things we eyeball on every inspection.",
      },
    ],
    ogPhoto: "/images/standing-water-in-valley.jpg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-penetrations-explained",
    clusterId: "roofing-101",
    title: "Roof Penetrations: Every Hole in Your Roof, Explained",
    description:
      "Pipe boots, bath fan vents, furnace flues, skylights, chimneys, and mounts: how each penetration is sealed, how each one fails, and what to watch.",
    shortTitle: "Penetrations, explained",
    intro: [
      "Count the things sticking out of your roof sometime: plumbing pipes, fan vents, a flue or two, maybe a skylight or chimney. Every one is a hole somebody cut on purpose, sealed with its own little system. Penetrations are where roofs leak first, so knowing the cast of characters is half of understanding your roof.",
    ],
    sections: [
      {
        heading: "Plumbing vent pipes (the ones with the rubber collars)",
        paragraphs: [
          "Those bare pipes are your plumbing system's breathers. Each is sealed with a pipe boot: a metal or plastic base flashed into the shingles, with a rubber gasket hugging the pipe. The flashing typically outlives the roof; the rubber doesn't. Sun and weather crack the gasket somewhere past the ten-year mark, and water follows the pipe into the house.",
          "Cracked boots are one of [the most common leak sources we repair](/guides/why-is-my-roof-leaking), and one of the cheapest, which makes them the poster child for catching problems during inspections instead of after ceilings stain.",
        ],
      },
      {
        heading: "Exhaust vents: bathroom fans, kitchen hoods, dryers",
        paragraphs: [
          "These are the hooded or capped vents that carry moist indoor air outside. The roof side is straightforward: a flashed cap with a flapper or screen. The failures are usually either aged sealant at the flange or, surprisingly often, the duct underneath was never actually connected, dumping shower steam straight into the attic.",
          "That last one masquerades as a roof problem (damp deck, attic moisture) while being an HVAC problem. ([Ventilation and condensation impostors, covered here.](/guides/roof-ventilation-explained))",
        ],
      },
      {
        heading: "Flues and chimneys: the hot and the heavy",
        paragraphs: [
          "Furnace and water heater flues get high-temperature flashing assemblies built for metal venting hot exhaust; they're reliable when installed right and unforgiving when improvised.",
          "Masonry chimneys are the heavyweight penetration: wide enough to dam water on their uphill side (bigger ones get a small diverter roof called a cricket), and sealed with the two-part step-and-counter flashing system that's [the most common leak source on the whole roof](/guides/roof-flashing-leaks). If your home has a chimney, its flashing deserves a look on every inspection.",
        ],
      },
      {
        heading: "Skylights, mounts, and everything else",
        paragraphs: [
          "Skylights are penetrations large enough to earn [their own guide](/guides/skylight-leaks): four sides of flashing, factory seals, and a debris-collecting uphill edge.",
          "Then there's the aftermarket: satellite dishes, solar mounts, holiday-light anchors. The rule for anything that pierces the roof after installation day is simple: flashed and sealed properly or not at all. Lag bolts with a squirt of caulk are future leaks, and they can [void warranty coverage on the affected area](/guides/roofing-warranties-explained). Looping your roofer in before mounting anything costs a phone call.",
          "During [replacements](/guides/roof-replacement-day-by-day), every penetration gets new flashing and boots as standard; reusing the old ones is a corner we don't cut.",
        ],
        image: {
          src: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
          alt: "A skylight with debris collecting on its uphill side, the largest common roof penetration",
        },
      },
    ],
    faqs: [
      {
        question: "How many penetrations does a typical roof have?",
        answer:
          "More than most owners guess: a typical home runs half a dozen to a dozen once you count every plumbing vent, fan cap, and flue. Each one is on the checklist during a proper inspection.",
      },
      {
        question: "Can a penetration be removed and the hole closed?",
        answer:
          "Yes. Decommissioned flues, old dish mounts, and abandoned vents can be properly closed: decking patched, underlayment lapped, shingles woven in. It beats leaving an unused penetration to age in place.",
      },
      {
        question: "Are solar panels bad for a roof?",
        answer:
          "Not inherently; properly flashed mounts on a roof with enough life left are fine. The two mistakes are mounting on a roof that needs replacement soon (panels come off and go back on, at cost) and letting anyone attach hardware with sealant instead of flashing. Coordinate the roofer and the solar installer and both problems disappear.",
      },
    ],
    ogPhoto: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-deck-explained",
    clusterId: "roofing-101",
    title: "The Roof Deck: What's Under Your Shingles",
    description:
      "Plywood vs OSB, how decking rots, why nobody can quote it sight-unseen, and how deck condition gets handled honestly during a roof replacement.",
    shortTitle: "The roof deck",
    intro: [
      "Strip every layer off a roof and you reach the deck: the wood panels that everything else fastens to. It's the component homeowners think about least and the one that determines most, because shingles installed over compromised decking are a fresh coat of paint on a soft fence post.",
    ],
    sections: [
      {
        heading: "What decking is",
        paragraphs: [
          "Roof decks on homes around here are plywood or OSB (oriented strand board) panels nailed across the rafters. Both are engineered wood; plywood is layered veneers, OSB is compressed strands. Modern OSB earned its place as the common choice, plywood tolerates getting wet a little more gracefully, and a sound roof system keeps either one dry, which is the actual point.",
          "The deck's job description: hold the nails, carry the loads (crew, snow, the occasional branch), and give the waterproofing layers a flat, solid base.",
        ],
      },
      {
        heading: "How decking goes bad",
        paragraphs: [
          "Decking fails one way: moisture, sustained. A slow leak at a [flashing point](/guides/roof-flashing-leaks), years of [attic condensation](/guides/roof-ventilation-explained), or [standing water working through a valley](/guides/standing-water-roof-valleys) keeps a patch of wood damp until rot sets in. OSB swells and crumbles; plywood delaminates; either way the wood stops holding nails.",
          "From inside the attic, trouble looks like staining, soft spots, or daylight. From on the roof, a spongy feel underfoot. By the time decking telegraphs through to the shingle surface as a visible sag, the moisture has been at work for a long while.",
        ],
        image: {
          src: "/images/worker-placing-board.jpeg",
          alt: "A crew member placing a new decking board during a roof repair",
        },
      },
      {
        heading: "Why no one can quote your deck sight-unseen",
        paragraphs: [
          "Decking hides under every layer above it, so its condition is genuinely unknown until tear-off. That's not a contractor dodge; it's physics. What separates honest outfits is how the unknown is handled: per-sheet replacement pricing in writing before the job, photos the moment anything soft turns up, and a conversation before the work continues.",
          "([Where decking fits in the cost picture](/guides/roof-replacement-cost-factors), and [what tear-off day looks like](/guides/roof-replacement-day-by-day).) Most roofs need a few sheets or none; roofs that leaked for years need more. The bill should follow the photos, never precede them.",
        ],
      },
      {
        heading: "Protecting the deck you have",
        paragraphs: [
          "Everything in roof maintenance is ultimately deck protection: [moss control](/guides/moss-on-roof-oregon), [clear valleys and gutters](/guides/clogged-gutters-roof-damage), [breathing ventilation](/guides/roof-ventilation-explained), and leaks fixed while they're small. The deck never wears out from age alone; it only ever loses to moisture you could have evicted.",
          "Wondering about yours? An attic check is part of every [free inspection](/services/roof-inspections) where access allows.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a roof replacement always include new decking?",
        answer:
          "No, and it shouldn't. Sound decking gets reused; that's normal and right. What replacement always includes is inspecting all of it at tear-off and replacing the sheets that fail the check, at the per-sheet price you saw in writing beforehand.",
      },
      {
        question: "Can I see my own decking?",
        answer:
          "From the attic, yes: bring a flashlight on a rainy day and look for damp trails, stains, or daylight at the underside of the roof. It's the homeowner-accessible half of a deck inspection, and honestly useful.",
      },
      {
        question: "What does skip sheathing mean on an older home?",
        answer:
          "Pre-plywood roofs used spaced boards (skip sheathing), originally for cedar shakes that needed airflow. Reroofing one with asphalt shingles typically means overlaying solid sheathing first, which shows up as a line item on older-home replacements.",
      },
    ],
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-underlayment-explained",
    clusterId: "roofing-101",
    title: "Underlayment and Ice & Water Shield, Explained",
    description:
      "The waterproofing layers under your shingles: synthetic vs felt underlayment, what ice and water shield is, and where each belongs on an Oregon roof.",
    shortTitle: "Underlayment, explained",
    intro: [
      "Between your shingles and your deck lives the layer nobody sees and every storm tests: underlayment. When wind drives rain sideways under a shingle edge, underlayment is the difference between 'weather' and 'water damage.' Here's what's down there, and what should be.",
    ],
    sections: [
      {
        heading: "What underlayment does",
        paragraphs: [
          "Shingles shed water; they don't seal against it. Wind-driven rain, capillary creep at overlaps, and the occasional lifted tab all push moisture past the shingle layer as a matter of routine. Underlayment is the water-resistant sheet across the entire deck that catches that routine moisture and lets it drain harmlessly.",
          "It also covers the roof during installation itself, which is why [a weather pause mid-replacement isn't a crisis](/guides/roof-replacement-day-by-day): the underlayment stage is built to hold watertight on its own.",
        ],
      },
      {
        heading: "Felt vs synthetic",
        paragraphs: [
          "Traditional underlayment is asphalt-saturated felt (15 lb and 30 lb weights): the tar paper of every old roofing story. It works, and it has real limits: it tears in wind, wrinkles when damp, and degrades faster with exposure.",
          "Modern synthetic underlayment is a woven polymer sheet: lighter, far stronger, flatter-lying, longer-lived, and safer for crews to walk. It costs more per roll and has become the standard on quality installs for the same reason architectural shingles did: the per-year math wins. Synthetics are what we install.",
        ],
      },
      {
        heading: "Ice and water shield: the heavy artillery",
        paragraphs: [
          "Regular underlayment is water-resistant and nail-punctured by everything above it. Ice and water shield is the upgrade for the zones that need true waterproofing: a rubberized membrane that adheres directly to the deck and seals itself around the shanks of nails driven through it.",
          "It earns its keep wherever water concentrates, lingers, or backs up: [valleys](/guides/roof-valley-options), eaves (where ice dams form in our occasional cold snaps), and around [penetrations](/guides/roof-penetrations-explained) and chimneys. Self-sealing around nails is the quietly brilliant part: the layer stays waterproof despite being fastened through thousands of times.",
        ],
      },
      {
        heading: "Why this layer is where cheap bids hide",
        paragraphs: [
          "Underlayment is invisible at the final walkthrough, which makes it the perfect place to quietly save money: lighter felt, membrane only where code minimums require, or 'reuse what's down there' on partial work. The roof looks identical on day one. The difference reports for duty during the first real storm, and annually thereafter.",
          "It's why we keep saying [compare scopes, not totals](/guides/roof-replacement-cost-factors). The underlayment line items are short to read and long to matter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can underlayment be the roof by itself for a while?",
        answer:
          "Briefly and by design, yes: it's built to hold watertight between tear-off and shingling, including overnight pauses. Weeks of exposure is a different story; underlayment is a stage and a backup, not a finished roof.",
      },
      {
        question: "Is ice and water shield required in Oregon?",
        answer:
          "Code sets minimums that vary by jurisdiction and roof detail, and our climate argument is simpler: valleys and eaves here see enough concentrated water and occasional ice that membrane in those zones is cheap insurance regardless of the minimum. It's our standard practice.",
      },
      {
        question: "Does old underlayment get reused during replacement?",
        answer:
          "Not by us. Underlayment comes off with the tear-off and goes on new with everything else; it's a small fraction of job cost protecting everything beneath it. A quote that reuses underlayment is answering its own 'why is it cheaper' question.",
      },
    ],
    ogPhoto: "/images/crew-doing-tear-off.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "shingle-product-lines",
    clusterId: "roofing-101",
    title: "Shingle Product Lines, Decoded",
    description:
      "How to read a shingle manufacturer's product tiers without the brochure fog, using the CertainTeed lineup we install as the working example.",
    shortTitle: "Product lines, decoded",
    intro: [
      "Every shingle manufacturer sells a ladder of product lines, and every brochure makes each rung sound essential. Here's the decoder ring: the tiers differ in real, physical ways (weight, layers, ratings, warranty terms), and which rung makes sense depends on your house and horizon, not the adjectives.",
      "We'll use CertainTeed's lineup as the example, since that's what we install and know cold.",
    ],
    sections: [
      {
        heading: "The universal three-tier ladder",
        paragraphs: [
          "Nearly every manufacturer's catalog reduces to: an entry tier (3-tab strip shingles), the architectural mainstream (laminated dimensional shingles, where most of the market lives), and a premium tier (heavier 'designer' shingles imitating slate or shake).",
          "What actually changes as you climb: more material per shingle, more lamination layers, higher wind ratings, longer non-prorated warranty windows, and deeper visual texture. What doesn't change: the physics of installation. [Every tier lives or dies by the install quality](/guides/roofing-101).",
        ],
      },
      {
        heading: "The CertainTeed ladder, concretely",
        paragraphs: [
          "In CertainTeed's lineup, the architecture tier is the Landmark series, and it's the heart of what we install: a proven laminated shingle with step-up versions (Landmark Pro and up) that add weight and warranty as you climb. For most homes around Damascus, Clackamas, and Happy Valley, a Landmark-series shingle is the sweet spot of protection per dollar.",
          "The premium tier is where Presidential Shake and Grand Manor live: dramatically sculpted, noticeably heavier, priced accordingly. Gorgeous on the right house; rarely necessary for protection alone. ([The architectural vs 3-tab comparison covers the entry tier's trade-offs.](/guides/architectural-vs-3-tab-shingles))",
        ],
        image: {
          src: "/images/install-shingles.webp",
          alt: "Architectural shingles from the mainstream product tier being installed",
        },
      },
      {
        heading: "Reading past the marketing",
        paragraphs: ["When you're comparing lines, these are the lines on the spec sheet that mean something:"],
        bullets: [
          "Wind rating (and what installation pattern it requires; high ratings often assume extra nails per shingle)",
          "Weight per square: more material is the honest core of every tier jump",
          "Algae-resistance rating: in our climate, the streak-resistant granule treatments earn their keep",
          "Non-prorated warranty window: the years of full-value coverage, which is the number that varies most by tier ([warranty layers, decoded](/guides/roofing-warranties-explained))",
          "Certified-installer requirements: the enhanced coverage tiers exist only when the installer's certification activates them",
        ],
      },
      {
        heading: "Our honest guidance",
        paragraphs: [
          "Spend to the architectural mainstream; think hard before spending past it. The jump from 3-tab to a Landmark-class shingle buys protection. The jump from there to premium mostly buys appearance, which is a legitimate thing to want and a different thing than weatherproofing.",
          "And whatever the tier, the certification matters: as a CertainTeed Certified contractor we install to their spec, which is what unlocks the enhanced warranty terms on the box. Samples come to every estimate, on the house. ([What an estimate involves.](/guides/roof-replacement-guide))",
        ],
      },
    ],
    faqs: [
      {
        question: "Why CertainTeed and not another brand?",
        answer:
          "The honest answer: the major manufacturers all make good shingles, and we work with other premium brands when a project calls for it. We standardized on CertainTeed because their architectural lines have proven themselves on our roofs through enough Oregon winters, and our certification with them unlocks warranty coverage we can stand behind.",
      },
      {
        question: "Are 'impact-resistant' shingles worth it in Oregon?",
        answer:
          "Class 4 impact shingles are built for hail country, and serious hail is rare here. Unless your insurer offers a meaningful discount for them, that budget usually does more good in the architectural tier or in ventilation and valley upgrades.",
      },
      {
        question: "Do darker shingles wear faster?",
        answer:
          "In hot climates the heat difference is a real consideration. In ours, color choice is overwhelmingly aesthetic; ventilation quality matters far more to shingle temperature than pigment does. Pick the color you want to live with.",
      },
    ],
    ogPhoto: "/images/crew-tearing-off-roof.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-systems-roundup",
    clusterId: "roofing-101",
    title: "Roof System Roundup: CertainTeed, GAF, Owens Corning & Malarkey",
    description:
      "The major roofing manufacturers and their systems, compared honestly: what each is known for, how their warranty programs work, and why the installer still matters more than the wrapper.",
    shortTitle: "Roof systems, compared",
    intro: [
      "Walk into any roofing conversation and the brand names start flying: GAF, CertainTeed, Owens Corning, Malarkey. Here's the secret nobody selling shingles wants to lead with: the major manufacturers all make good products. The real differences live in their systems, their warranty programs, and above all in who installs them.",
      "We install CertainTeed, and we'll tell you why. But this is a roundup, not a sales pitch, so everybody gets a fair look.",
    ],
    sections: [
      {
        heading: "First, what is a roof system?",
        paragraphs: [
          "A roof system is a manufacturer's full stack of matched components: shingles, underlayment, ice and water membrane, starter strips, ridge caps, and ventilation parts engineered to work together. Every major brand sells one, and every major brand attaches a carrot to it: install the complete system, through a contractor they've certified, and your warranty steps up to enhanced coverage that the shingles alone never get.",
          "That's the key mental model for this whole roundup. The brands compete on shingle technology, but they really compete on systems and certifications, because [installation is what decides whether any shingle reaches its rated life](/guides/roofing-101).",
        ],
      },
      {
        heading: "CertainTeed: what we install",
        paragraphs: [
          "CertainTeed has been making roofing for over a century, and their architectural lineup runs from the Landmark series, one of the most widely installed architectural shingles in the country, up through luxury lines like Presidential Shake and Grand Manor. Their Integrity Roof System is the matched-component stack, and their certification ladder for contractors unlocks progressively stronger warranty tiers.",
          "Why we standardized on them: their architectural lines have held up on our roofs through enough Oregon winters to earn our trust, the warranty program behind a certified install is strong, and our certification means the enhanced coverage tiers are on the table for every roof we build. [We decoded their product tiers here](/guides/shingle-product-lines), and [the warranty layers here](/guides/roofing-warranties-explained).",
        ],
        image: {
          src: "/images/install-shingles.webp",
          alt: "CertainTeed architectural shingles being installed by a certified crew",
        },
      },
      {
        heading: "GAF: the biggest name in the game",
        paragraphs: [
          "GAF is North America's largest roofing manufacturer, and their Timberline series is probably the best-known architectural shingle in the country. Their system story matches the pattern: matched components, a certification ladder for contractors (topping out at Master Elite), and enhanced warranty tiers like Golden Pledge that only certified installers can offer.",
          "Honest take: GAF makes a good shingle, full stop. If a reputable, properly certified GAF contractor quotes your roof, the brand is not a reason to worry. As always, the questions that matter are about the installer, not the wrapper.",
        ],
      },
      {
        heading: "Owens Corning: the pink panther's roofing arm",
        paragraphs: [
          "Owens Corning's Duration series is their architectural flagship, and its signature feature is the SureNail strip: a reinforced fabric band in the nailing zone that strengthens the shingle's grip on the fasteners. Their Total Protection Roofing System and Platinum Preferred contractor program complete the familiar pattern of matched components and certification-gated warranties.",
          "Honest take: another quality manufacturer with a real engineering point of pride. Same rule applies: the certification and the crew matter more than the logo on the bundle.",
        ],
      },
      {
        heading: "Malarkey: the hometown option",
        paragraphs: [
          "Malarkey Roofing Products is headquartered right in Portland, which makes them the local kid in this roundup. They're known for polymer-modified asphalt shingles: rubberized formulas designed for better cold-weather flexibility and impact resistance, plus smog-reducing granules that they pioneered. Lines like Vista, Highlander, and Legacy cover the architectural range.",
          "Honest take: Malarkey makes genuinely interesting shingles, engineered by people who understand Pacific Northwest weather firsthand, and plenty of good local roofers install them happily. We're glad they exist; a homeowner choosing a certified Malarkey installer is making a sound choice.",
        ],
      },
      {
        heading: "The rest of the field",
        paragraphs: [
          "IKO, Atlas, TAMKO, and others round out the market, each with their own architectural lines and system programs. You'll meet them most often on quotes where price is the headline. They make functional products; just apply extra attention to the scope details and the warranty terms, since the budget end of any market is where corners get quietly cut, [usually in the layers you can't see](/guides/roof-underlayment-explained).",
        ],
      },
      {
        heading: "So how do you actually choose?",
        paragraphs: [
          "Flip the order most people use. Instead of picking a brand and finding an installer, find the right installer and let their certification guide the brand. A certified contractor installing the system they know cold, to the spec they're audited on, with the enhanced warranty their certification unlocks, beats any brand-first decision.",
          "That's the honest reason we lead with CertainTeed: it's the system we're certified in, trained on, and accountable to. If you bring us a quote for another major brand, we'll give you a straight comparison, and [the 10 contractor questions](/essentials) work on every company in this roundup, including us.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is GAF or CertainTeed better?",
        answer:
          "Neither, honestly. Both are top-tier manufacturers whose architectural shingles perform well when installed to spec. The meaningful comparison is between the two contractors quoting them: certifications, scope detail, references, and workmanship warranty.",
      },
      {
        question: "Can you install a brand you're not certified in?",
        answer:
          "Mechanically, any competent roofer can install any major shingle. What's lost without certification is the enhanced warranty tier, which is a real part of what you're paying for. It's why we quote the system we're certified in and say so plainly.",
      },
      {
        question: "Do system warranties really require every matched component?",
        answer:
          "The enhanced tiers generally do require the manufacturer's components in the critical layers and a certified installer, with registration after the job. It's the fine print that turns 'lifetime shingles' into actual coverage, and reading it before the install is the whole game.",
      },
      {
        question: "What about metal, tile, or other non-asphalt systems?",
        answer:
          "Different materials, different roundup. Asphalt systems dominate homes in our area on cost and practicality, but metal in particular has a real following in the Northwest. If your project leans that way, we're happy to talk through it at an assessment.",
      },
    ],
    ogPhoto: "/images/crew-doing-tear-off.jpeg",
    cta: EDU_CTA,
    datePublished: "2026-06-07",
  },

  {
    slug: "drip-edge-roof-edges",
    clusterId: "roofing-101",
    title: "Drip Edge and the Roof Edge, Explained",
    description:
      "The unglamorous perimeter kit that keeps water off your fascia: drip edge, starter strips, and how the roof edge and gutters work together.",
    shortTitle: "Roof edges & drip edge",
    intro: [
      "The edge of a roof is a busy little ecosystem: the last shingle course, a strip of bent metal, the fascia board, and the gutter, all within a few inches of each other. Get the details right and water leaves the building like it's supposed to. Get them wrong and the edge quietly rots while the rest of the roof looks fine.",
    ],
    sections: [
      {
        heading: "Drip edge: the bent metal that earns its name",
        paragraphs: [
          "Drip edge is an L-shaped metal strip running the entire roof perimeter, under the roofing layers and over the fascia's face. Its job is managing the last inch of a raindrop's journey: water reaching the roof edge wants to curl back under the shingle overhang by surface tension, right onto the wooden fascia. The drip edge's profile breaks that curl and drops the water cleanly into the gutter.",
          "It's cheap, invisible from the street, and the difference between fascia boards that last decades and ones that peel and soften in a few wet years. Older roofs around here sometimes lack it entirely; any replacement we do includes it as standard.",
        ],
      },
      {
        heading: "Starter strips: sealing the first course",
        paragraphs: [
          "The bottom edge of the roof is also where wind gets its best grip, prying upward at the first course of shingles. Starter strips are purpose-made shingles under that first course, placing a factory adhesive band right at the edge so the wind meets a sealed seam instead of a loose flap.",
          "The shortcut version (cut-up regular shingles, adhesive in the wrong place) is invisible on day one and explains a lot of [first-course shingles in yards](/guides/shingles-blew-off-roof) after storms. It's a classic tell of a rushed install.",
        ],
      },
      {
        heading: "The fascia and gutter handoff",
        paragraphs: [
          "Behind the gutter sits the fascia board, and the gutter's brackets are anchored into it. That makes the whole edge interdependent: [a clogged gutter](/guides/clogged-gutters-roof-damage) soaks the fascia, soft fascia loses its grip on the gutter, and a sagging gutter dumps water exactly where it does the most harm. Edge problems travel in groups.",
          "The maintenance answer is mercifully boring: gutters kept flowing, edge metal eyeballed at inspections, paint on the fascia kept intact. ([It's all on the care calendar.](/guides/oregon-roof-care-calendar))",
        ],
      },
      {
        heading: "What edge trouble looks like from the driveway",
        paragraphs: ["No ladder required for the early signs:"],
        bullets: [
          "Peeling paint or grey, weathered streaks on the fascia boards",
          "Gutters pulling away from the house or visibly out of level",
          "Water staining on siding directly below the gutter line",
          "A first shingle course that lifts visibly in wind",
          "Vegetation in the gutter (the ecosystem is thriving; the edge is not)",
        ],
      },
    ],
    faqs: [
      {
        question: "Can drip edge be added to an existing roof?",
        answer:
          "It can, by working the metal under the existing first courses, though it's fiddlier than installing it during a reroof. If your roof lacks it and replacement is a few years out, it's a reasonable repair; if replacement is near, it'll be included then.",
      },
      {
        question: "What's the difference between fascia and soffit?",
        answer:
          "Fascia is the vertical board at the roof edge that gutters mount to; soffit is the horizontal underside of the overhang, where intake vents live. They're neighbors with different jobs: fascia takes the water risk, soffit handles the airflow.",
      },
      {
        question: "Do gutter guards affect the roof edge?",
        answer:
          "Good ones that integrate with the gutter are fine. The type to avoid slides under the first shingle course, lifting it and breaking its seal at exactly the spot wind attacks. Ask how a guard attaches before it goes on.",
      },
    ],
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: EDU_CTA,
    datePublished: "2026-06-06",
  },
];
