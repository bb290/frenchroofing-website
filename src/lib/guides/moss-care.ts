import type { Cluster, Guide } from "./types";

// Cluster 3: Moss, Cleaning & Oregon Roof Care
// Persona: "The Moss Fighter" - Oregon homeowner under the Doug firs.
// Money pages: /services/roof-cleaning, /services/maintenance

export const mossCareCluster: Cluster = {
  id: "moss-care",
  name: "Moss & Oregon Roof Care",
  description:
    "Living under Doug firs in the wettest corner of the country? This series covers moss, debris, gutters, and the maintenance habits that keep an Oregon roof going strong.",
  pillarSlug: "moss-on-roof-oregon",
};

const CLEANING_CTA = {
  headline: "Tired of Fighting the Moss Yourself?",
  description:
    "Schedule a FREE roof assessment and we'll tell you exactly what your roof needs. No pressure, just honest answers from a local crew.",
};

export const mossCareGuides: Guide[] = [
  // ── PILLAR ──────────────────────────────────────────────────────────
  {
    slug: "moss-on-roof-oregon",
    clusterId: "moss-care",
    isPillar: true,
    title: "Moss on Your Roof: The Oregon Homeowner's Handbook",
    metaTitle: "Moss on Your Roof: The Oregon Homeowner's Handbook",
    description:
      "Why Oregon roofs grow moss like nowhere else, what it actually does to your shingles, and how to deal with it the right way. From a Damascus crew that scrapes it off roofs every week.",
    shortTitle: "The Moss Handbook",
    intro: [
      "If you own a home anywhere in the Portland metro, you don't need us to tell you that moss loves it here. The same weather that keeps everything green for nine months of the year treats your roof like a garden bed.",
      "We're French Roofing, a family roofing company based in Damascus, and we've been scraping, treating, and preventing moss on Oregon roofs since 2014. This guide is everything we know about it. What moss actually does to shingles, what removal methods are safe (and which ones we'd never use on our own homes), what prevention actually works, and when it's time to call in a crew.",
      "Grab a coffee. By the end of this you'll know more about roof moss than most contractors.",
    ],
    sections: [
      {
        heading: "Why does Oregon grow so much roof moss?",
        paragraphs: [
          "Moss needs three things to thrive: moisture, shade, and something porous to grab onto. Western Oregon delivers all three better than almost anywhere in the country. We get rain from October through May, our big conifers throw shade and drop needles year-round, and asphalt shingle surfaces give moss spores a perfect texture to anchor into.",
          "That's why you'll see green creeping across roofs in Damascus, Happy Valley, and Clackamas within a couple of years of skipping maintenance, especially on north-facing slopes and anywhere a tree blocks the sun. South-facing roof planes get enough light to stay mostly clear. The shady side is where the trouble starts.",
        ],
      },
      {
        heading: "Does moss actually damage a roof?",
        paragraphs: [
          "Yes. Moss damages asphalt roofs in two ways: it holds water against the shingle surface, and it physically lifts shingle edges as it grows. A mossy patch acts like a wet sponge sitting on your roof for months at a time. That constant moisture accelerates granule loss, breaks down the shingle mat, and shortens the life of the roof.",
          "The lifting is the sneakier problem. Moss grows into the gaps between shingle courses and slowly pries the edges up. Lifted edges let wind-driven rain get underneath, and that's how a cosmetic problem turns into a leak.",
          "We wrote a whole piece on this if you want the full picture: [Does moss actually damage roof shingles?](/guides/does-moss-damage-roof-shingles)",
        ],
      },
      {
        heading: "How do you remove moss from a roof safely?",
        paragraphs: [
          "Safe moss removal on an asphalt roof means gentle physical removal plus a treatment, never high pressure. Our crews scrape and brush the bulk of the moss off by hand, working top-down so we're not lifting shingle edges, then blow the roof clear and apply a moss treatment that kills what's left in the gaps.",
          "What you should never do is pressure-wash an asphalt roof. High-pressure water strips the protective granules off the shingles, which takes years off the roof's life and can void the manufacturer warranty. We feel strongly enough about this that we wrote it up separately: [Why we never pressure-wash asphalt shingles](/guides/why-we-never-pressure-wash-roofs).",
          "A word on DIY: if your roof is a low-slope single story and you're comfortable on a ladder, you can do light moss maintenance yourself with a soft brush and a roof-safe treatment. But wet moss is slick, roofs are higher than they look, and we'd rather you call us than meet you at the ER. Steep roofs, two-story homes, and heavy growth are crew jobs.",
        ],
      },
      {
        heading: "What does roof moss treatment actually do?",
        paragraphs: [
          "Moss treatments kill the moss and its root-like structures (rhizoids) so the remaining growth dries up and releases its grip on the shingles. Dead moss loosens over a few weeks and washes off gradually with rain, which is much gentler on the roof than trying to force every last bit off mechanically.",
          "Treatments also buy you prevention time. A treated roof stays clear longer because the spores that land on it don't get established as easily. That's why our cleanings always pair physical removal with treatment, one without the other is half a job.",
        ],
      },
      {
        heading: "How do you prevent moss from coming back?",
        paragraphs: [
          "Moss prevention comes down to light, airflow, and regular maintenance. You can't change Oregon's weather, but you can make your roof a much worse place for moss to live:",
        ],
        bullets: [
          "Trim back overhanging branches. More sunlight on the roof is the single biggest moss deterrent there is.",
          "Keep the roof clear of debris. Needles and leaves hold moisture and give moss a head start.",
          "Keep gutters flowing. Backed-up gutters keep roof edges wet. (More on that here: [clogged gutters and your roof](/guides/clogged-gutters-roof-damage).)",
          "Consider zinc strips near the ridge. They help, with limits. We break down what they can and can't do in [our zinc strip guide](/guides/zinc-strips-moss-prevention).",
          "Get on a schedule. An annual cleaning and treatment keeps moss from ever getting established. Here's [how often an Oregon roof needs cleaning](/guides/how-often-clean-roof-oregon).",
        ],
      },
      {
        heading: "What does roof cleaning cost in the Portland area?",
        paragraphs: [
          "Roof cleaning around the Portland metro typically runs between $300 and $800, depending on roof size, pitch, and how much growth we're dealing with. A one-story ranch with light moss is the low end. A steep two-story under heavy tree cover that hasn't been touched in five years is the high end.",
          "We quote before we start, in writing, so there are no surprises. And if we spot anything up there that needs attention (cracked flashing, a worn pipe boot, standing water in a valley), you'll hear about it with photos and honest options, not a scare story.",
        ],
        image: {
          src: "/images/standing-water-in-valley.jpg",
          alt: "Standing water pooled in a roof valley, the kind of problem a cleaning crew spots early",
        },
      },
      {
        heading: "When is moss a sign of a bigger problem?",
        paragraphs: [
          "Heavy moss on an older roof is sometimes the messenger, not the problem. If the shingles underneath are bald, curling, or brittle, a cleaning will make the roof tidier but it won't make it younger. At that point the honest conversation is about remaining life, not moss.",
          "Our rule of thumb: if your roof is under 15 years old, clean it and protect the investment. If it's 20 plus and mossy, get a [free inspection](/services/roof-inspections) first. We'd rather tell you the truth about a roof's condition before you spend money cleaning one that needs replacing soon anyway.",
        ],
      },
      {
        heading: "The easiest version: put it on a schedule",
        paragraphs: [
          "Most of our maintenance customers got tired of thinking about their roof every fall. Our [recurring maintenance program](/services/maintenance) handles it: two visits a year, timed around Oregon's seasons, covering debris removal, gutter clearing, moss prevention treatment, and an inspection every visit.",
          "It's the same logic as changing the oil in your truck. Small, boring, regular maintenance is what keeps you from the big expensive day. If you'd rather weigh it against one-off cleanings, we did that math here: [one-time cleaning vs a maintenance plan](/guides/roof-cleaning-vs-maintenance-plan).",
        ],
      },
    ],
    faqs: [
      {
        question: "Is moss on a roof always bad?",
        answer:
          "On an asphalt shingle roof, yes, it's worth dealing with. Moss holds moisture against the shingles and lifts their edges as it grows, both of which shorten roof life. A light dusting of green isn't an emergency, but it doesn't get better on its own.",
      },
      {
        question: "Can I just leave the moss until I replace the roof?",
        answer:
          "If the roof is genuinely near the end of its life, sometimes that's the practical call. But moss accelerates the decline, so 'a few more years' can quietly become 'this winter.' A free inspection will tell you which situation you're in.",
      },
      {
        question: "Does homeowners insurance cover moss damage?",
        answer:
          "Generally no. Insurers treat moss as a maintenance issue, not a covered peril, and heavy moss can even complicate claims for other damage. One more reason regular maintenance pays for itself.",
      },
      {
        question: "What time of year is best for moss removal in Oregon?",
        answer:
          "Late spring through early fall is ideal, when the roof is dry and treatments have time to work before the rains return. That said, we clean roofs year-round when weather allows. The worst plan is waiting for the perfect month while the moss keeps growing.",
      },
      {
        question: "Do you clean roofs in my town?",
        answer:
          "If you're within about 20 miles of Damascus, yes. That covers Happy Valley, Clackamas, Gresham, Oregon City, Sandy, Boring, Estacada, Milwaukie, and the surrounding area. We're a short drive away.",
      },
    ],
    heroImage: {
      src: "/images/worker-ridge.webp",
      alt: "French Roofing crew member working along a roof ridge during a cleaning",
    },
    ogPhoto: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  // ── SUPPORTING ──────────────────────────────────────────────────────
  {
    slug: "does-moss-damage-roof-shingles",
    clusterId: "moss-care",
    title: "Does Moss Actually Damage Roof Shingles? (Yes. Here's How.)",
    description:
      "Moss isn't just a cosmetic problem on an Oregon roof. Here's exactly how it shortens shingle life, how fast it happens, and what to do about it.",
    shortTitle: "Does moss damage shingles?",
    intro: [
      "Short answer: yes. Moss damages asphalt shingles by holding moisture against them and by physically lifting their edges as it grows. Neither happens overnight, but both take real years off a roof's life.",
      "We get this question a lot, usually from someone standing in their driveway looking up at a green stripe on the north slope. Here's the honest breakdown.",
    ],
    sections: [
      {
        heading: "How moss holds moisture against your shingles",
        paragraphs: [
          "Moss is basically a living sponge. Once a patch establishes on your roof, it soaks up rain and stays wet long after the rest of the roof has dried out. That means the shingles underneath sit in constant dampness for most of Oregon's wet season, October through May.",
          "Asphalt shingles are built to shed water, not to marinate in it. Constant moisture breaks down the asphalt binder, speeds up granule loss, and in freezing weather the trapped water expands and contracts, working the shingle apart from the inside.",
        ],
      },
      {
        heading: "How moss physically lifts shingle edges",
        paragraphs: [
          "Moss doesn't just sit on top. It grows into the horizontal gaps between shingle courses, and as the clumps thicken they pry the shingle edges upward. A lifted shingle edge is an open door: wind-driven rain gets underneath, and the shingle loses its seal against the one below it.",
          "Once edges lift, you're no longer talking about a cleaning. You're talking about repairs. That's the line we try to help homeowners stay on the right side of.",
        ],
      },
      {
        heading: "How fast does the damage happen?",
        paragraphs: [
          "From first green fuzz to real damage is typically a few years, not a few months. The timeline depends on shade, tree cover, and slope. A shaded north-facing plane under a Doug fir can go from clean to crusted in two or three seasons, while a sunny south slope may stay clear for a decade.",
          "The practical takeaway: moss caught early is a cheap, easy fix. Moss left for five years means lifted shingles, granule loss, and sometimes deck repairs. Same roof, very different bill.",
        ],
      },
      {
        heading: "What should you do if your roof already has moss?",
        paragraphs: [
          "Get it removed gently and treated, ideally before the next wet season. The right method is hand scraping and brushing plus a moss-killing treatment, never a pressure washer (here's [why pressure washing is the one thing we won't do](/guides/why-we-never-pressure-wash-roofs)).",
          "If you're not sure whether your moss situation is 'cleaning' or 'repairs,' that's exactly what our [free roof assessment](/services/roof-cleaning) is for. We'll look, take photos, and tell you straight.",
          "And if you want the full picture on moss, prevention and all, start with [the Moss Handbook](/guides/moss-on-roof-oregon).",
        ],
      },
    ],
    faqs: [
      {
        question: "Does moss damage all roof types?",
        answer:
          "It's hardest on asphalt shingles, which is what most homes around here have. Metal roofs shed moss better, and tile handles moisture well, but heavy growth isn't doing any roof a favor. Debris buildup and blocked drainage hurt every roof type.",
      },
      {
        question: "Will dead moss fall off on its own?",
        answer:
          "Mostly, yes. After a proper treatment, dead moss dries, loosens, and washes away gradually with rain over several weeks. That slow release is actually good, because it doesn't stress the shingles the way forced removal does.",
      },
      {
        question: "Can moss cause a roof leak directly?",
        answer:
          "It can, by lifting shingle edges and damming water so it backs up under the shingles. More often it's a contributor: moss weakens and lifts the shingles, then a winter storm finds the opening.",
      },
    ],
    ogPhoto: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "how-often-clean-roof-oregon",
    clusterId: "moss-care",
    title: "How Often Should You Clean Your Roof in Oregon?",
    description:
      "For most Portland-area homes, once a year. Under heavy tree cover, twice. Here's how to figure out the right cleaning schedule for your roof, from a Damascus roofing crew.",
    shortTitle: "How often to clean an Oregon roof",
    intro: [
      "For most homes in the Portland metro, a roof cleaning once a year is the right rhythm. If your home sits under heavy tree cover or on a shaded lot, twice a year is better. And if your roof is sunny, exposed, and steep, you might stretch to every other year.",
      "That's the short version. Here's how to figure out where your roof actually lands.",
    ],
    sections: [
      {
        heading: "Why Oregon roofs need cleaning more often than most",
        paragraphs: [
          "Our wet season runs eight months, our conifers drop needles year-round, and moss spores are everywhere. A roof in Phoenix can go years without attention. A roof in Damascus or Happy Valley collects needles, leaves, and the start of a moss colony every single winter.",
          "Cleaning isn't about looks (though it helps there too). It's about removing the wet blanket of debris and growth that ages shingles early. A clean roof dries out between storms. A dirty one never really does.",
        ],
      },
      {
        heading: "The once-a-year baseline",
        paragraphs: [
          "An annual cleaning, ideally in late spring or early fall, handles the average Portland-area home: clear the debris, clean the gutters, treat for moss before it establishes. Late spring cleanings remove what winter left behind. Early fall cleanings get the roof ready before the rains set in.",
          "Either timing works. The important part is the rhythm, not the month.",
        ],
      },
      {
        heading: "When twice a year makes sense",
        paragraphs: [
          "If your home is surrounded by big trees, sits on a north-facing slope, or backs up to a greenbelt, once a year usually isn't enough. Doug firs and cedars don't take a season off. Homes like these benefit from a spring visit and a fall visit, and that's exactly how we time our [maintenance program](/services/maintenance): two visits a year, matched to Oregon's seasons.",
        ],
      },
      {
        heading: "Signs your roof is due right now",
        paragraphs: ["Don't wait for the calendar if you're seeing any of these:"],
        bullets: [
          "Visible green on any roof plane, even a light fuzz along the shingle edges",
          "Needles or leaves collecting in valleys and behind chimneys",
          "Gutters overflowing or sprouting their own garden",
          "Dark streaks running down the shingles (algae, moss's quieter cousin)",
          "It's been more than two years and you honestly can't remember the last cleaning",
        ],
      },
      {
        heading: "What a proper cleaning includes",
        paragraphs: [
          "A real roof cleaning is more than a guy with a leaf blower. Ours includes debris removal from the roof surface and valleys, gutter and downspout clearing, moss treatment, and a visual inspection while we're up there. If we spot a problem in the making, you get photos and straight talk about it.",
          "Full details on the service are here: [roof cleaning and maintenance](/services/roof-cleaning). And for the bigger picture on moss itself, see [the Moss Handbook](/guides/moss-on-roof-oregon).",
        ],
      },
    ],
    faqs: [
      {
        question: "What month is best to clean a roof in Oregon?",
        answer:
          "Late spring (May, June) or early fall (September, October) are the sweet spots. Spring clears what winter dumped; fall preps the roof before the wet season. Both beat waiting until the moss is thriving in January.",
      },
      {
        question: "Can a roof be cleaned too often?",
        answer:
          "With gentle methods, no. With harsh methods, absolutely. The risk isn't frequency, it's technique. Soft brushing, blowing, and treatments are easy on shingles. Pressure washing once is worse than gentle cleaning ten times.",
      },
      {
        question: "How long does a roof cleaning take?",
        answer:
          "Most homes take a few hours. A large, steep, or heavily mossed roof can take the better part of a day. Either way you don't need to be home, and your yard will be clean when we leave.",
      },
    ],
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "why-we-never-pressure-wash-roofs",
    clusterId: "moss-care",
    title: "Why We Never Pressure-Wash Asphalt Shingles",
    description:
      "Pressure washing strips the protective granules off asphalt shingles and can void your warranty. Here's what happens up close, and what safe roof cleaning looks like instead.",
    shortTitle: "Why we never pressure-wash",
    intro: [
      "We own pressure washers. They're great on driveways. They will never touch an asphalt shingle roof on our watch, and if a contractor offers to pressure-wash yours, that's your cue to keep shopping.",
      "Here's exactly what high-pressure water does to a shingle roof, and what we do instead.",
    ],
    sections: [
      {
        heading: "What pressure washing does to asphalt shingles",
        paragraphs: [
          "Pressure washing strips the granules off asphalt shingles. Those little stone granules aren't decoration: they're the shingle's sunscreen and armor, protecting the asphalt underneath from UV and weather. Blast them off and you've fast-forwarded years of wear in an afternoon.",
          "High pressure also drives water up under the shingle courses, breaks the adhesive seal between shingles, and can loosen flashing. The roof looks clean from the driveway. Up close, it just aged a decade.",
        ],
      },
      {
        heading: "It can void your warranty too",
        paragraphs: [
          "Shingle manufacturers are clear on this: damage from improper maintenance, including high-pressure washing, isn't covered. As a CertainTeed Certified contractor we install roofs to manufacturer spec, and we maintain them the same way. A pressure-washed roof can lose warranty protection exactly when you'd want it most.",
        ],
      },
      {
        heading: "What safe roof cleaning looks like",
        paragraphs: [
          "Safe asphalt roof cleaning is hands and air, not blasting: scraping and soft-brushing the moss off (working with the shingles, not against them), blowing the roof and valleys clear, then applying a treatment that kills the remaining moss so it releases on its own.",
          "It's slower than pressure washing. That's kind of the point. The goal is a roof that's clean and still has all its granules.",
          "If your roof is due, here's [what our cleaning service includes](/services/roof-cleaning). And for everything else moss-related, [the Moss Handbook](/guides/moss-on-roof-oregon) has you covered.",
        ],
      },
      {
        heading: "What about 'soft washing'?",
        paragraphs: [
          "Done right, soft washing (low pressure plus a cleaning solution) can be appropriate for some surfaces, and some reputable companies do good work with it. Our position for asphalt shingles in our climate is simpler: mechanical removal plus treatment gets excellent results with zero risk to the granules, so that's what we do.",
          "Whoever you hire, ask one question: 'what PSI touches my shingles?' If the answer is a pressure-washer number or a blank stare, keep looking.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it ever OK to pressure-wash a roof?",
        answer:
          "Not an asphalt shingle roof. Some metal and concrete tile roofs tolerate controlled low-pressure washing, but shingles lose granules, seals, and warranty coverage. The shortcut costs more than it saves.",
      },
      {
        question: "My neighbor pressure-washed his roof and it looks fine. Did he get lucky?",
        answer:
          "It usually does look fine, that's the trap. Granule loss doesn't show from the ground. The bill shows up a few years later as bald, brittle shingles and a roof replacement that came early.",
      },
      {
        question: "How do you get heavy moss off without pressure?",
        answer:
          "Patience and the right tools. We scrape and brush the bulk off by hand, blow the surface clean, and let a moss treatment finish the job in the gaps. Heavy growth sometimes takes a follow-up visit, and that's still better for the roof than one aggressive pass.",
      },
    ],
    ogPhoto: "/images/crew-doing-tear-off.jpeg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "zinc-strips-moss-prevention",
    clusterId: "moss-care",
    title: "Zinc Strips for Roof Moss: What They Actually Do (and Don't)",
    description:
      "Zinc strips help slow moss growth near the ridge, but they're not the force field the packaging suggests. An honest look at what works for moss prevention on Oregon roofs.",
    shortTitle: "Do zinc strips work?",
    intro: [
      "Zinc strips do help prevent roof moss, but only partially. When rain washes over the zinc, it carries trace metal down the roof that makes the surface less friendly to moss. The catch: that protection only reaches 10 to 15 feet below the strip, and it fades between rains and as the zinc weathers.",
      "So they're a useful tool, not a complete answer. Here's the honest math.",
    ],
    sections: [
      {
        heading: "How zinc strips work",
        paragraphs: [
          "A zinc strip is installed near the ridge of the roof, tucked under the cap shingles with a couple inches exposed. Every time it rains, water picks up zinc ions as it runs over the strip and distributes them down the slope. Moss and algae don't like zinc, so growth slows in the treated zone.",
          "It's a clever, passive system. No power, no maintenance, just rain doing the work. On a small roof with good sun, zinc strips plus regular debris removal can keep things clear for years.",
        ],
      },
      {
        heading: "Where zinc strips fall short",
        paragraphs: [
          "The protection is strongest near the strip and weakens as the water spreads and dilutes. On a tall roof plane, the bottom half gets little benefit. Valleys, dormers, and anywhere water doesn't flow evenly get patchy coverage. And under heavy tree cover, falling debris shelters moss from the zinc-carrying runoff entirely.",
          "Zinc also can't fix the conditions that cause moss: shade, debris, and constant moisture. A strip at the ridge won't out-fight a Doug fir hanging over the roof.",
        ],
      },
      {
        heading: "What a real prevention plan looks like",
        paragraphs: [
          "Think of moss prevention as a stack, with zinc strips as one optional layer:",
        ],
        bullets: [
          "Sunlight: trim overhanging branches wherever you can. Nothing beats it.",
          "Clean surface: debris removal once or twice a year so moisture can't linger. ([How often, exactly?](/guides/how-often-clean-roof-oregon))",
          "Flowing gutters: so roof edges aren't sitting wet. ([Why gutters matter more than you'd think.](/guides/clogged-gutters-roof-damage))",
          "Moss treatment: applied during cleanings, it keeps spores from establishing.",
          "Zinc strips: a reasonable bonus layer on roofs with decent sun exposure, especially near the ridge line.",
        ],
      },
      {
        heading: "Should you add zinc strips to your roof?",
        paragraphs: [
          "If you're already getting a new roof or a cleaning, adding zinc strips is cheap insurance and we're happy to install them. If someone's pitching strips alone as the cure for a mossy, shaded, debris-covered roof, that money is better spent on an actual cleaning and treatment first.",
          "Not sure which camp your roof is in? A [free assessment](/services/roof-cleaning) settles it. And the full prevention picture lives in [the Moss Handbook](/guides/moss-on-roof-oregon).",
        ],
      },
    ],
    faqs: [
      {
        question: "Zinc or copper strips, which is better?",
        answer:
          "Copper is somewhat more effective at suppressing growth, and noticeably more expensive. For most Oregon homes zinc hits the practical sweet spot. Either way, the same coverage limits apply: strongest near the strip, weaker down-slope.",
      },
      {
        question: "How long do zinc strips last?",
        answer:
          "Quality strips typically stay effective somewhere in the range of 5 to 10 years before weathering reduces the zinc release. They'll still be on the roof after that, just doing less.",
      },
      {
        question: "Can I install zinc strips myself?",
        answer:
          "It's doable for a confident DIYer on a walkable roof: the strip tucks under the ridge caps and nails in place. The usual cautions apply about working on roofs, and badly placed nails create their own leak risks. If we're already up there for a cleaning, having us add them is the easy path.",
      },
    ],
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "standing-water-roof-valleys",
    clusterId: "moss-care",
    title: "Standing Water in Roof Valleys: A Quiet Shingle Killer",
    description:
      "Water pooling in a roof valley means something is blocking the flow, and trapped water is how small roof problems become big ones. What causes it and how to fix it.",
    shortTitle: "Standing water in valleys",
    intro: [
      "Roof valleys are supposed to be highways: water comes down two roof planes, meets in the valley, and rides it straight to the gutter. When water stands in a valley instead of flowing, something is in the way, and whatever it is, it's holding moisture against the most leak-prone part of your roof.",
      "We took the photo below on a real assessment. That pool shouldn't be there, and the homeowner had no idea.",
    ],
    sections: [
      {
        heading: "Why valleys are your roof's weak point",
        paragraphs: [
          "A valley concentrates the runoff from two slopes into one channel, so it moves more water than any other part of the roof. It's also where two planes meet, which makes the shingle work and flashing trickier than open field shingling. More water plus more complexity equals the place where problems start.",
          "Healthy valleys shed water fast. The moment debris, moss, or sagging lets water linger there, you've got constant moisture working on the seams of your roof.",
        ],
        image: {
          src: "/images/standing-water-in-valley.jpg",
          alt: "Water pooling in a shingle roof valley behind a dam of debris",
        },
      },
      {
        heading: "What causes water to stand in a valley?",
        paragraphs: ["In our area it's almost always one of these:"],
        bullets: [
          "Debris dams: needles and leaves pile up in the valley and slow the flow until water pools behind them. This is the big one under Oregon tree cover.",
          "Moss growth: a moss colony in or beside the valley acts like a speed bump and a sponge at the same time.",
          "Ice and snow (occasionally): our valley snow events are rare, but when they happen, melting snow refreezing in valleys backs water up under shingles.",
          "Structural sagging: if the decking under the valley has softened or sagged, water finds the low spot and sits in it. This one means the moisture has already been at work for a while.",
        ],
      },
      {
        heading: "What standing water does over time",
        paragraphs: [
          "Trapped water accelerates granule loss, breaks down the shingle mat, and probes every seam and nail hole in the valley for a way in. Asphalt shingles overlap to shed moving water; they're not a swimming pool liner. Give water enough standing time and it finds the path through.",
          "Once it's through, you're into wet underlayment, then wet decking, and the repair bill grows with each layer.",
        ],
      },
      {
        heading: "The fix is usually simple (if you catch it early)",
        paragraphs: [
          "If it's debris or moss, a proper [roof cleaning](/services/roof-cleaning) clears the valley and restores the flow, done in an afternoon. If the decking has started to sag or the shingles around the valley are damaged, that's a [repair](/services/roof-repair) conversation, and earlier is always cheaper.",
          "Can't see your valleys well from the ground? That's normal, and it's why they're a standard checkpoint on our [free inspections](/services/roof-inspections). For keeping valleys clear year-round, see the [Oregon roof care calendar](/guides/oregon-roof-care-calendar).",
        ],
      },
    ],
    faqs: [
      {
        question: "How can I tell if my valleys have a problem?",
        answer:
          "From the ground, look for visible debris lines, green growth, or dark staining running along the valley. After a dry week, water marks or a damp-looking stripe in the valley are a tell. Binoculars beat ladders for a first check.",
      },
      {
        question: "Is a little debris in the valley normal?",
        answer:
          "A few needles after a storm, sure. A visible accumulation that stays for weeks is doing damage. Valleys should look like clear channels, not planter boxes.",
      },
      {
        question: "Do metal valley liners prevent this?",
        answer:
          "Metal (open) valleys shed debris better and are more forgiving of standing moisture than closed shingle valleys, which is why we often recommend them in heavy-tree settings. They still need to be kept clear; metal buys you durability, not immunity.",
      },
    ],
    ogPhoto: "/images/standing-water-in-valley.jpg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "oregon-roof-care-calendar",
    clusterId: "moss-care",
    title: "The Oregon Roof Care Calendar: What to Do Each Season",
    description:
      "A season-by-season maintenance rhythm for Portland-area roofs: what to check, what to clean, and when. Simple habits that add years to an Oregon roof.",
    shortTitle: "The roof care calendar",
    intro: [
      "Oregon roofs live on a schedule whether we like it or not: eight wet months, a glorious dry stretch, and trees that never stop dropping things. The good news is that roof care here is mostly about rhythm, not heroics. A few well-timed habits each season beat any amount of catch-up work.",
      "Here's the calendar we'd hand any homeowner in the Portland metro.",
    ],
    sections: [
      {
        heading: "Spring (March to May): assess and recover",
        paragraphs: [
          "Spring is damage-report season. Winter storms have done whatever they were going to do, and now's the time to find out.",
        ],
        bullets: [
          "Walk the yard after the last big storms and look for shingle pieces or granule piles below downspouts.",
          "Scan the roof from the ground (binoculars help): lifted or missing shingles, debris in valleys, green starting on the north slope.",
          "Clear gutters of winter buildup so spring rains flow.",
          "Book a cleaning if moss showed up over winter. Spring treatments work well with the drying weather ahead.",
        ],
      },
      {
        heading: "Summer (June to August): the work window",
        paragraphs: [
          "Dry roofs and long days make summer the season for anything hands-on: cleanings, repairs, and replacements all go smoother now.",
        ],
        bullets: [
          "Trim back branches that overhang the roof. This is the single best moss prevention there is, and summer is the time.",
          "Handle any repairs you've been putting off while the weather is friendly.",
          "If your roof is near the end of its life, summer and early fall are the best replacement windows. (Here's [what a replacement involves](/services/roof-replacement).)",
        ],
      },
      {
        heading: "Fall (September to November): prep for the wet",
        paragraphs: [
          "Fall is the most important season on this calendar. Whatever condition your roof is in when the rains start is the condition it'll fight winter in.",
        ],
        bullets: [
          "Get the roof and valleys cleared after the big leaf-and-needle drop.",
          "Clean gutters and downspouts, then check them again after the first real storm.",
          "Apply moss treatment before the wet season gives spores their opening.",
          "Fix small problems now. A loose shingle in October is a leak in December.",
        ],
      },
      {
        heading: "Winter (December to February): watch and respond",
        paragraphs: [
          "Winter is for observation, not roof work. Storms come through; your job is noticing what they leave behind.",
        ],
        bullets: [
          "After windstorms, scan for missing shingles and check the yard for debris that came off the roof.",
          "Watch ceilings and attic for stains after long rain stretches.",
          "If something looks wrong, don't climb up in the wet. Call someone whose crew does this in harnesses. ([That's us.](/services/roof-repair))",
        ],
      },
      {
        heading: "Or let the calendar run itself",
        paragraphs: [
          "If you'd rather not carry a roof calendar in your head, that's what our [maintenance program](/services/maintenance) is: two visits a year, one in spring and one in fall, hitting everything above plus an inspection each time. Most of our maintenance customers signed up the year they forgot the fall cleaning and spent January with a bucket in the hallway.",
          "For the deeper story on what all this maintenance is protecting you from, start with [the Moss Handbook](/guides/moss-on-roof-oregon).",
        ],
      },
    ],
    faqs: [
      {
        question: "What's the single most important roof task of the year?",
        answer:
          "The fall clean-and-clear. Going into Oregon's wet season with clear valleys, flowing gutters, and treated shingles prevents more damage than everything else on this list combined.",
      },
      {
        question: "Can roof work be done in an Oregon winter?",
        answer:
          "Repairs, yes, in the weather windows between storms, and we do them all winter. Full replacements are possible but trickier to schedule. If your roof is borderline in October, deal with it then rather than betting on a dry January.",
      },
      {
        question: "How do I check my roof without getting on it?",
        answer:
          "Binoculars from the yard cover most of it: shingle condition, valleys, visible moss, flashing lines. Add a peek in the attic with a flashlight after heavy rain (looking for damp spots or daylight). Leave the ladder work to people who are paid to fall off roofs, or better, paid not to.",
      },
    ],
    ogPhoto: "/images/crew-putting-on-harnesses-safety-first.jpeg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "clogged-gutters-roof-damage",
    clusterId: "moss-care",
    title: "Clogged Gutters and Your Roof: It's All Connected",
    description:
      "Backed-up gutters don't just overflow, they keep your roof edges wet, feed moss, and rot fascia boards. How gutter neglect turns into roof damage in Oregon.",
    shortTitle: "Clogged gutters and your roof",
    intro: [
      "Clogged gutters damage roofs. Not eventually, not theoretically: when gutters back up, water has nowhere to go but over the edges, behind the fascia, and back up under the first courses of shingles. In a climate with eight months of rain, that's a problem on a schedule.",
      "Gutters feel like a separate chore from roof care. They're not. Here's the connection.",
    ],
    sections: [
      {
        heading: "What actually happens when gutters clog",
        paragraphs: [
          "A working gutter catches roof runoff and moves it away from the house. A clogged one turns into a long, narrow planter box full of wet debris, and the water that should be leaving starts looking for other exits.",
        ],
        bullets: [
          "Overflow runs down your siding and pools at the foundation.",
          "Water wicks backward into the fascia boards and rafter tails, which is how wood rot starts at the roof edge.",
          "The lowest courses of shingles sit over a wet, swampy edge instead of drying out between storms.",
          "All that lingering moisture is a standing invitation for moss along the eaves.",
        ],
      },
      {
        heading: "The roof edge takes the beating",
        paragraphs: [
          "The bottom edge of your roof is where gutter problems become roof problems. Constant edge moisture degrades the starter shingles and drip edge, and once the fascia behind the gutter softens, the gutter itself starts pulling loose. We've replaced plenty of roof edges where the original sin was just a few seasons of full gutters.",
          "Moss compounds it. Mossy eaves hold the moisture longer, which feeds more moss. (The full moss story is in [the Moss Handbook](/guides/moss-on-roof-oregon).)",
        ],
      },
      {
        heading: "How often do Oregon gutters need cleaning?",
        paragraphs: [
          "Twice a year for most Portland-area homes: once after the fall drop, once in spring. Homes under heavy tree cover may need a mid-winter check too, because one atmospheric river through a Doug fir can refill a gutter in a weekend.",
          "Gutter clearing is built into every one of our roof cleanings and both visits of our [maintenance program](/services/maintenance), because cleaning a roof and leaving the gutters full is half a job.",
        ],
      },
      {
        heading: "Signs your gutters are already causing damage",
        paragraphs: ["Worth a look this week, not this year:"],
        bullets: [
          "Plants growing out of the gutter (the classic)",
          "Water sheeting over the gutter edge during rain",
          "Peeling paint or soft spots on fascia boards",
          "Sagging gutter sections pulling away from the house",
          "Moss concentrated along the bottom edge of the roof",
        ],
      },
    ],
    faqs: [
      {
        question: "Are gutter guards worth it in Oregon?",
        answer:
          "Good ones help, especially with leaves. Fir and cedar needles are the local boss fight though: they're small enough to get through or pile on top of many guards. Guards reduce cleaning frequency here; they rarely eliminate it.",
      },
      {
        question: "Can clogged gutters cause a ceiling leak?",
        answer:
          "Indirectly, yes. Backed-up water can wick under the lowest shingle courses and into the roof structure at the eaves, which shows up as stains at the edges of ceilings or the tops of exterior walls.",
      },
      {
        question: "Do you clean gutters as a standalone service?",
        answer:
          "We clear gutters and downspouts as part of every roof cleaning and maintenance visit rather than as a separate trip. If your gutters are full, odds are the roof above them needs attention too, and one visit covers both.",
      },
    ],
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: CLEANING_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-cleaning-vs-maintenance-plan",
    clusterId: "moss-care",
    title: "One-Time Roof Cleaning vs a Maintenance Plan: The Real Math",
    description:
      "When a single roof cleaning makes sense, when a recurring maintenance plan wins, and how to think about the cost over the life of an Oregon roof.",
    shortTitle: "Cleaning vs maintenance plan",
    intro: [
      "Some roofs need a cleaning. Some roofs need a habit. The honest answer to 'should I just book a one-time cleaning or sign up for a plan' depends on your trees, your roof's age, and how much you enjoy thinking about your gutters in October (our guess: not much).",
      "Here's how we'd walk a neighbor through the decision.",
    ],
    sections: [
      {
        heading: "What you get either way",
        paragraphs: [
          "First, the overlap. Whether it's a one-time visit or a plan visit, a proper cleaning includes debris removal from the roof and valleys, gutter and downspout clearing, moss treatment, and eyes on your roof from people who know what trouble looks like. One-time cleanings around here typically run $300 to $800 depending on size, pitch, and buildup.",
          "The difference isn't the work. It's the timing, the consistency, and the price per visit.",
        ],
      },
      {
        heading: "When a one-time cleaning is the right call",
        paragraphs: ["A standalone cleaning makes sense when:"],
        bullets: [
          "Your roof has good sun exposure and light tree cover, and stays mostly clean on its own",
          "You're catching up after a few skipped years and want to see where things stand",
          "You're prepping the house for sale and want the roof looking its best",
          "You honestly enjoy handling the routine yourself and just want a pro reset every few years",
        ],
      },
      {
        heading: "When the maintenance plan wins",
        paragraphs: [
          "Our [maintenance program](/services/maintenance) is two scheduled visits a year, spring and fall, with debris removal, gutter clearing, moss prevention treatment, cleanup, and an inspection every visit. The plan wins when:",
        ],
        bullets: [
          "Your home sits under real tree cover. One cleaning a year loses to Doug firs; the fall visit before the rains is the one that saves roofs.",
          "Your roof is past its tenth birthday. Twice-yearly inspections catch the small stuff (a cracked boot, lifted flashing) while it's still a cheap fix.",
          "You want the per-visit price below one-off rates, and the scheduling handled for you.",
          "You'd rather never think about this again. The plan exists because most people forget the fall cleaning exactly once.",
        ],
      },
      {
        heading: "The math over a roof's life",
        paragraphs: [
          "Here's the frame that matters: a replacement in our area runs $8,000 to $25,000 or more. Consistent maintenance is what pushes that date out. If a couple hundred dollars a visit buys your roof even two or three extra years of life, the plan has paid for itself several times over, before counting the repairs it prevented.",
          "It's the oil change logic. Nobody ever saved money by skipping them.",
          "Still weighing it? Start with [how often your specific roof needs cleaning](/guides/how-often-clean-roof-oregon), or just book a [free assessment](/services/roof-cleaning) and we'll tell you which side of the math your roof is on.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is there a contract or commitment on the maintenance plan?",
        answer:
          "No fine print, no trap. It's a standing schedule you can adjust or stop. We keep customers by doing good work, not by locking doors.",
      },
      {
        question: "Which package level do I need?",
        answer:
          "It depends on roof pitch, complexity, and tree cover. A simple ranch with a clear yard sits at the basic level; a steep roof under big firs with valleys and dormers needs more. Book a free inspection and we'll recommend the right fit, not the biggest one.",
      },
      {
        question: "Can I switch from a one-time cleaning to the plan later?",
        answer:
          "Anytime. Plenty of customers start with a single cleaning to see how we work, then move to the schedule. The first cleaning's assessment gives us everything we need to set the plan up right.",
      },
    ],
    ogPhoto: "/images/crew-tearing-off-roof.jpeg",
    cta: {
      headline: "Want Your Roof on Autopilot?",
      description:
        "Schedule a FREE roof assessment and we'll recommend the right care rhythm for your home. Honest advice either way.",
    },
    datePublished: "2026-06-06",
  },
];
