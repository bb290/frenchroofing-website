import type { Cluster, Guide } from "./types";

// Cluster 1: Roof Replacement Decision
// Persona: "The Long Game Planner" - roof is 15-25 years old, no emergency,
// planning a five-figure spend carefully. Tone: patient, generous with
// detail, zero pressure. CTA leans on the instant estimate and the free
// assessment, never urgency.
// Money pages: /services/roof-replacement (+ city pages), /estimate, /financing

export const replacementCluster: Cluster = {
  id: "replacement-decision",
  name: "Roof Replacement Guide",
  description:
    "Thinking about a new roof but not in a rush? Good, that's the right way to do it. Lifespans, costs, materials, timing, financing, and what the work actually looks like.",
  pillarSlug: "roof-replacement-guide",
};

const REPLACEMENT_CTA = {
  headline: "Ready to See Real Numbers?",
  description:
    "Try the instant estimate on our website, or schedule a FREE roof assessment and we'll give you a written quote with photos. No pressure, no clock running.",
};

export const replacementGuides: Guide[] = [
  // ── PILLAR ──────────────────────────────────────────────────────────
  {
    slug: "roof-replacement-guide",
    clusterId: "replacement-decision",
    isPillar: true,
    title: "The Complete Guide to Roof Replacement for Oregon Homeowners",
    description:
      "Everything that goes into a roof replacement decision: when it's time, what it costs, which materials make sense for Oregon, how the work unfolds, and how to pay for it. From a Damascus crew that does this every week.",
    shortTitle: "The Replacement Guide",
    intro: [
      "A roof replacement is one of the biggest checks most homeowners ever write on their house, and unlike a kitchen remodel, nobody throws you a party when it's done. It just sits up there, quietly doing its job for the next few decades. Which is exactly the point.",
      "We're French Roofing, family-owned in Damascus since 2014, and this guide is the whole conversation: how to know it's time, what the money looks like, which materials earn their keep in Oregon weather, and what actually happens between signing an estimate and waving at the crew as they leave. Take your time with it. The good news about replacement decisions is that the careful ones are almost always the right ones.",
    ],
    sections: [
      {
        heading: "How do you know it's time to replace a roof?",
        paragraphs: [
          "A roof is ready for replacement when the problems stop being local and start being general. One leak at a flashing point is a repair. Bald shingles across whole slopes, repairs every season, curling edges, and granules filling your gutters are a pattern, and patterns don't repair away.",
          "Age sets the context. Most asphalt roofs in our climate give you somewhere between 20 and 30 years depending on the shingle grade, the installation quality, and how well the roof was maintained. (The full lifespan story, including what shortens and extends it, is here: [how long a roof lasts in Oregon](/guides/how-long-does-a-roof-last-oregon).)",
          "If you're genuinely torn between fixing and replacing, that's a real fork in the road and it deserves a real framework, not a sales pitch. We wrote ours down: [repair or replace, decided honestly](/guides/repair-or-replace-roof).",
        ],
      },
      {
        heading: "What does a roof replacement cost?",
        paragraphs: [
          "Most residential replacements in our area land between $8,000 and $25,000+, and the spread comes from real variables: roof size, pitch, complexity (valleys, dormers, skylights), material choice, and what the tear-off reveals underneath.",
          "Rather than hand-wave at that range, we broke down exactly [what moves a replacement quote up and down](/guides/roof-replacement-cost-factors), so when estimates land on your kitchen table you can read them like someone who knows the trade.",
          "Want a number for your actual roof without talking to anyone yet? Our [instant estimate tool](/estimate) gets you in the ballpark from your address. When you're ready for the real thing, assessments are free and come with photos and a written quote.",
        ],
      },
      {
        heading: "Which materials make sense for Oregon?",
        paragraphs: [
          "For most homes here the practical conversation is architectural asphalt shingles, and the practical brand conversation for us is CertainTeed: we're CertainTeed Certified, which means our installs meet their specs and qualify for enhanced warranty coverage.",
          "The architectural-vs-3-tab question still comes up, usually because 3-tab is cheaper on the quote. We laid out [the honest comparison for PNW weather](/guides/architectural-vs-3-tab-shingles), and the short version is that the cheaper shingle is usually the more expensive roof.",
          "Beyond shingles, the parts you don't see matter just as much: underlayment, flashing, and ventilation are what separate a roof that hits its rated life from one that retires early. Our [materials page](/materials) covers the full system.",
        ],
        image: {
          src: "/images/install-shingles.webp",
          alt: "New architectural shingles being installed on a Damascus area home",
        },
      },
      {
        heading: "What actually happens during the replacement?",
        paragraphs: [
          "Most homes go from first tear-off to final magnet sweep in one to three days. The short version of our process: free assessment, written estimate and material selection, tear-off down to the deck with a full inspection of the plywood, installation to CertainTeed specs, and a final walkthrough with cleanup that leaves the yard better than we found it.",
          "If you want the play-by-play (including the honest parts, like what happens when the tear-off finds rotten decking), we wrote the whole thing up: [a roof replacement, day by day](/guides/roof-replacement-day-by-day).",
        ],
        image: {
          src: "/images/workers-tearoff.webp",
          alt: "French Roofing crew tearing off an old roof down to the deck",
        },
      },
      {
        heading: "When should you schedule it?",
        paragraphs: [
          "Summer and early fall are the easiest windows in Oregon, but they're also everyone's first choice, so the calendar fills. The fuller answer, including why a dry-week winter replacement is a real option and when waiting actually costs money, is here: [the best time of year to replace a roof in Oregon](/guides/best-time-replace-roof-oregon).",
          "One scheduling note worth knowing: roofing doesn't require permits in Oregon, which means no paperwork delays between your yes and our start date.",
        ],
      },
      {
        heading: "How do people pay for this?",
        paragraphs: [
          "Cash, financing, or some of each. We partner with Enhancify for financing, including 0% options, and plenty of our customers spread the cost rather than draining a savings account in one move. The full picture (how it works, what to ask, what to watch for anywhere you finance) is in [roof financing explained](/guides/roof-financing-explained).",
        ],
      },
      {
        heading: "What about warranties?",
        paragraphs: [
          "Every replacement we do carries two layers: the manufacturer's warranty on the materials and our own workmanship warranty on the installation. Because we're CertainTeed Certified, installs can qualify for enhanced manufacturer coverage beyond the standard terms.",
          "Warranty language is where roofing fine print lives, so we translated it: [workmanship vs manufacturer vs certified coverage, in plain English](/guides/roofing-warranties-explained).",
        ],
      },
      {
        heading: "Choosing the contractor (the part that decides everything else)",
        paragraphs: [
          "Here's the uncomfortable truth of this industry: the same shingles, installed by two different crews, can produce a 30-year roof or a 12-year roof. The contractor decision is the roof decision.",
          "We keep a standing guide of [the 10 questions to ask any roofing contractor](/essentials), including us. Licenses you can verify (ours is CCB #203933), insurance, real local references, manufacturer certification, written warranties. Ask everything. A good contractor enjoys those questions; the other kind changes the subject.",
        ],
        image: {
          src: "/images/customer-handwritten-card-thank-you.jpeg",
          alt: "A handwritten thank-you card from a French Roofing customer",
        },
      },
    ],
    faqs: [
      {
        question: "How long does a full roof replacement take?",
        answer:
          "Most homes take 1 to 3 days from tear-off to final cleanup, depending on size and complexity. Oregon weather occasionally adds a pause, and when it does, you'll hear it from us first with a plan.",
      },
      {
        question: "Can you replace a roof over the old shingles?",
        answer:
          "Layering over is legal in some cases and we don't recommend it. It hides the deck condition, adds weight, shortens the new roof's life, and complicates every future repair. Tear-off costs more on day one and less every year after.",
      },
      {
        question: "Do I need to be home during the replacement?",
        answer:
          "No. We need access to power and the driveway, and a way to reach you if the tear-off turns up surprises. Plenty of customers go to work and come home to a new roof.",
      },
      {
        question: "Does a new roof add home value?",
        answer:
          "It's consistently one of the stronger exterior investments: buyers and inspectors both read a new roof as risk removed. If selling is on your horizon, it also takes the biggest negotiation lever off the table.",
      },
      {
        question: "Why should the estimate be free?",
        answer:
          "Because you shouldn't pay someone to tell you what they'd charge you. Ours includes the inspection, photos, and a written scope. If the honest answer is 'your roof has five good years left,' you'll hear that too.",
      },
    ],
    heroImage: {
      src: "/images/house-after.webp",
      alt: "A completed French Roofing roof replacement on a Happy Valley area home",
    },
    ogPhoto: "/images/crew-tearing-off-roof.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  // ── SUPPORTING ──────────────────────────────────────────────────────
  {
    slug: "how-long-does-a-roof-last-oregon",
    clusterId: "replacement-decision",
    title: "How Long Does a Roof Last in Oregon?",
    description:
      "Asphalt roofs in western Oregon typically last 20 to 30 years. What our climate does to that number, what shortens it, and what genuinely extends it.",
    shortTitle: "How long roofs last here",
    intro: [
      "Most asphalt shingle roofs in western Oregon last somewhere between 20 and 30 years. Architectural shingles installed to spec and maintained sit at the top of that range and beyond; builder-grade 3-tab on a neglected, shaded roof retires near the bottom, sometimes earlier.",
      "The interesting part isn't the range. It's what moves a specific roof, yours, within it.",
    ],
    sections: [
      {
        heading: "What our climate does to a roof",
        paragraphs: [
          "Western Oregon is gentler on roofs than people assume in some ways and harder in others. We're easy on shingles when it comes to hail and extreme heat, the two big shingle killers elsewhere. We're hard on them with eight months of moisture, moss that never takes a year off, and winter windstorms that test every seal strip.",
          "Net result: an Oregon roof rarely dies of sunburn. It dies of moisture-related causes (moss, debris, trapped water) or wind working at its edges, and both of those are far more manageable than weather you can't do anything about.",
        ],
      },
      {
        heading: "What shortens a roof's life",
        paragraphs: ["The early-retirement list, in rough order of damage done:"],
        bullets: [
          "Moss left to establish. It holds moisture and lifts shingle edges season after season. ([The full story.](/guides/moss-on-roof-oregon))",
          "Debris and clogged drainage, keeping the roof wet between storms. ([Gutters count too.](/guides/clogged-gutters-roof-damage))",
          "Poor attic ventilation, cooking the shingles from below in summer and feeding condensation in winter.",
          "Rushed installation: bad flashing, misplaced nails, skipped details. Invisible on day one, decisive by year fifteen.",
          "Pressure washing. One aggressive cleaning can take years off. ([Why we never do it.](/guides/why-we-never-pressure-wash-roofs))",
        ],
      },
      {
        heading: "What genuinely extends it",
        paragraphs: [
          "The flip side is encouraging: the same short list, done right, pushes a roof toward the top of its range. Regular cleaning and moss treatment, clear valleys and gutters, healthy ventilation, and small repairs handled while they're small. Our [maintenance program](/services/maintenance) exists because this list is boring and predictable, which is the best kind of list.",
          "Installation quality you only get to choose once, at replacement time. It's worth choosing well. ([The 10 questions that sort contractors.](/essentials))",
        ],
      },
      {
        heading: "Reading your own roof's age",
        paragraphs: [
          "Signs a roof is entering its final years: granules collecting in gutters and at downspout exits, shingles losing their color in patches (the surface coming off), curling or cupping edges, and repairs arriving more often than birthdays.",
          "If you don't know your roof's installation date, an assessment can estimate its remaining life from condition. That number is the foundation of every good replacement decision, and ours are [free](/services/roof-inspections). When you have it, [the Replacement Guide](/guides/roof-replacement-guide) walks you through the rest.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do 30-year shingles really last 30 years?",
        answer:
          "The rating describes the warranty era, not a promise. In practice: installed to spec, ventilated properly, and maintained, architectural shingles genuinely reach their rated neighborhood here. Neglected, they don't, and the warranty has maintenance fine print for exactly that reason.",
      },
      {
        question: "Does the north side of my roof age faster?",
        answer:
          "It ages differently. North slopes hold moisture and grow moss; south slopes take the UV. In Oregon the north slope usually loses the race, which is why moss management matters so much here.",
      },
      {
        question: "My roof is 22 years old with no leaks. Replace it anyway?",
        answer:
          "Not on age alone. Condition beats birthdate. A free assessment will tell you whether it's aging gracefully or quietly failing, and either answer is useful: one buys you years, the other buys you time to plan instead of react.",
      },
    ],
    ogPhoto: "/images/sean-on-roof-1st-job.png",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "repair-or-replace-roof",
    clusterId: "replacement-decision",
    title: "Repair or Replace? An Honest Decision Framework",
    description:
      "When fixing the roof is smart money and when it's throwing good money after bad. The framework we actually use when homeowners ask us straight.",
    shortTitle: "Repair or replace?",
    intro: [
      "Here's the framework in one breath: a roof under 15 years old with an isolated problem gets repaired. A roof past 20 with widespread issues gets replaced. The honest work happens in the middle, and the middle is where a contractor's incentives matter, because one answer pays us a few hundred dollars and the other pays us five figures.",
      "So let's put the framework on the table where you can use it without us in the room.",
    ],
    sections: [
      {
        heading: "The three questions that decide it",
        paragraphs: [
          "Every repair-or-replace call we make comes down to three questions. Answer them honestly about your roof and you'll usually land where we would.",
        ],
        bullets: [
          "Is the problem local or general? One flashing failure is local. Granule loss across every slope is general. Repairs fix local problems; they can't fix general ones.",
          "How much paid-for life is left? A $1,500 repair on a roof with ten good years left costs $150 a year. The same repair on a roof with two years left costs $750 a year, and you'll still buy the replacement.",
          "Is this the first repair or the fourth? Repair frequency is the roof telling you its own diagnosis. Once fixes become a subscription, the math has already flipped.",
        ],
      },
      {
        heading: "When repair is clearly right",
        paragraphs: [
          "Storm damage on a healthy roof. A failed pipe boot or flashing detail at any age short of decrepit. A leak with a single traceable source on a roof that's otherwise holding its granules and lying flat. In all of these, the system is sound and one component failed; replace the component.",
          "This describes most of the leaks we see, by the way. The average leak call ends in a repair, not a pitch. ([What repairs run, honestly.](/guides/what-roof-repairs-cost))",
        ],
      },
      {
        heading: "When replacement is clearly right",
        paragraphs: [
          "Widespread granule loss, multiple slopes with curling or cracked shingles, leaks that move around, decking that flexes underfoot, or a repair bill quoting a meaningful fraction of a replacement. Past a point, repairs on a failing roof are interest payments on a loan you haven't accepted yet.",
          "There's also the bundling effect: replacement resets everything at once (shingles, underlayment, flashing, boots), and those components fail on similar clocks. Replacing a roof that's failing generally costs less than chasing its failures one at a time.",
        ],
        image: {
          src: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
          alt: "An aging roof with discolored shingles and failing flashing, past the repair-or-replace line",
        },
      },
      {
        heading: "The middle: how to decide under uncertainty",
        paragraphs: [
          "For the genuinely torn cases, our advice is to buy information before buying anything else. A thorough assessment (with photos, [free from us](/services/roof-inspections)) turns 'the roof is oldish and leaks sometimes' into 'two slopes are sound, one is failing, the flashing is from another era.' Decisions get easy when the facts get specific.",
          "Then run the per-year math from question two above, and factor your own horizon: staying fifteen years favors replacing a borderline roof on your schedule rather than its schedule. Selling in two favors the documented repair. Whatever you decide, [the Replacement Guide](/guides/roof-replacement-guide) covers the road ahead if the answer is replace.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I replace just one slope of the roof?",
        answer:
          "Sometimes, and it's occasionally the smart move (one slope storm-damaged on an otherwise mid-life roof). The trade-offs are color mismatch and a roof whose halves now age on different clocks. We'll tell you honestly whether your situation is the exception.",
      },
      {
        question: "A contractor says my repairable roof needs replacing. How do I check?",
        answer:
          "Ask for photos of the specific problems and where they are, then get a second opinion (ours is free). General claims with no documentation are a tell. Specific, photographed, located problems are how honest assessments talk.",
      },
      {
        question: "Does insurance ever pay for replacement?",
        answer:
          "When sudden covered damage (a windstorm, a fallen tree) is extensive enough, yes, insurers total roofs the way they total cars. Gradual wear is never covered, which is one more reason to document storm damage when it happens rather than discovering it years later.",
      },
    ],
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-replacement-cost-factors",
    clusterId: "replacement-decision",
    title: "What Drives Roof Replacement Cost",
    description:
      "Why replacement quotes in Damascus, Clackamas, and Happy Valley range from $8,000 to $25,000+: the variables that actually move the number, and how to compare estimates like a pro.",
    shortTitle: "What drives replacement cost",
    intro: [
      "Roof replacements in our area run from around $8,000 to $25,000 and up, and that spread isn't padding: it's geometry, materials, and what's hiding under your old shingles. Here's the number, taken apart, so the estimates on your table make sense.",
    ],
    sections: [
      {
        heading: "Size and pitch: the foundation of every quote",
        paragraphs: [
          "Roofs are measured in squares (100 square feet each), and your roof's footprint times its slope determines how many squares of everything the job needs. Pitch matters twice: steeper roofs have more surface per footprint and they slow the crew down, since everything above walkable pitch needs more safety gear and more careful movement.",
          "This is why two houses with identical floor plans can get meaningfully different quotes. A low-slope ranch and a steep two-story are different jobs wearing similar square footage.",
        ],
      },
      {
        heading: "Complexity: every interruption costs detail work",
        paragraphs: [
          "Valleys, dormers, skylights, chimneys, and roof-to-wall transitions each add flashing work, cutting, and time. A clean gable roof is the cheapest shape there is; a roof that looks interesting from the street is interesting on the estimate too.",
          "This is also where quality hides. Flashing details are exactly where rushed crews save their time and where [most future leaks come from](/guides/roof-flashing-leaks). Detail-heavy roofs are where the cheap bid is most dangerous.",
        ],
      },
      {
        heading: "Materials: the visible choice and the invisible ones",
        paragraphs: [
          "Shingle grade moves the price ([architectural vs 3-tab is its own conversation](/guides/architectural-vs-3-tab-shingles)), but so do the layers you'll never see: underlayment quality, ice-and-water membrane in the valleys, new flashing versus reused, ridge venting. A quote that's mysteriously low has usually gone quiet about exactly these line items.",
          "We install CertainTeed systems to their spec, which is what keeps the enhanced warranty coverage on the table. ([Warranties, decoded.](/guides/roofing-warranties-explained))",
        ],
        image: {
          src: "/images/valley-install.webp",
          alt: "Valley installation during a roof replacement, where material and detail quality matter most",
        },
      },
      {
        heading: "The deck: the number nobody can promise",
        paragraphs: [
          "Under your shingles is plywood decking, and nobody knows its condition until tear-off. Soft or rotten sections must be replaced before new shingles go on; skipping that is how bad roofs get built on good shingles. Decking is the one honest unknown in every replacement quote.",
          "What you can demand is how it's handled: per-sheet pricing in writing before the job starts, and photos plus a conversation the moment anything is found. That's our standard. 'We found some rot, the new total is X, here's why' should never be a surprise at the final bill.",
        ],
        image: {
          src: "/images/team-plywood-install.webp",
          alt: "Crew replacing plywood decking discovered damaged during tear-off",
        },
      },
      {
        heading: "What doesn't move the number (much)",
        paragraphs: [
          "Shingle color. The season, mostly ([timing is about scheduling, not price](/guides/best-time-replace-roof-oregon)). Permits don't apply at all: roofing doesn't require them in Oregon. And despite the occasional sales theater, there's no legitimate 'sign tonight' discount; pricing that evaporates overnight was never real. ([How we feel about pressure tactics: we don't use them.](/essentials))",
          "When you're ready for a real number on your real roof, the [instant estimate](/estimate) takes thirty seconds, and a [free assessment](/services/roof-replacement) turns it into a written quote with photos. Financing can spread whatever the number turns out to be. ([Enhancify, explained.](/guides/roof-financing-explained))",
        ],
      },
    ],
    faqs: [
      {
        question: "Why are quotes for the same roof thousands of dollars apart?",
        answer:
          "Different scopes wearing the same address. Compare line by line: underlayment grade, flashing (new or reused), decking policy, warranty terms, disposal. The gap usually lives in what the cheaper quote doesn't say.",
      },
      {
        question: "Is the cheapest bid ever the right choice?",
        answer:
          "When its written scope genuinely matches the others, sure, and that happens. What never works out is the bid that's cheap because the scope is hollow. A roof is a terrible place to find that out in year six.",
      },
      {
        question: "How accurate is the instant estimate tool?",
        answer:
          "It's a calibrated ballpark from your roof's measurable geometry: good for planning and budgeting, not a contract. The free on-site assessment is what turns it into a firm written number.",
      },
    ],
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "architectural-vs-3-tab-shingles",
    clusterId: "replacement-decision",
    title: "Architectural vs 3-Tab Shingles for Pacific Northwest Rain",
    description:
      "The two asphalt shingle families, compared honestly for Oregon weather: lifespan, wind resistance, looks, and the per-year math that usually settles it.",
    shortTitle: "Architectural vs 3-tab",
    intro: [
      "Architectural shingles cost more per square than 3-tab and they're worth it in our climate, full stop. That's the conclusion; here's the reasoning, because a five-figure decision deserves more than a thumbs up.",
    ],
    sections: [
      {
        heading: "What's actually different between them",
        paragraphs: [
          "3-tab shingles are a single flat layer with notches cut to imitate three separate tabs: one thickness, one profile, the budget option since the mid-century. Architectural (or 'dimensional') shingles laminate multiple layers, making them thicker, heavier, and visually textured.",
          "That thickness isn't cosmetic. It's more material between the weather and your underlayment, stronger adhesive bonding, and more mass for the wind to argue with.",
        ],
      },
      {
        heading: "The two differences that matter in Oregon",
        paragraphs: [
          "Wind: our winters test shingle edges constantly, and lightweight 3-tab is the shingle we most often find in yards after a storm. Architectural shingles carry meaningfully higher wind ratings and hold their seals longer. ([What happens when shingles let go.](/guides/shingles-blew-off-roof))",
          "Lifespan: in our moisture, the durability gap widens. 3-tab typically gives 15 to 20 years here; architectural runs 25 to 30 with decent care. Thinner material simply has less to give to moss season and wind season every year. ([The full lifespan picture.](/guides/how-long-does-a-roof-last-oregon))",
        ],
      },
      {
        heading: "The per-year math",
        paragraphs: [
          "Here's the calculation that settles most kitchen-table debates: the architectural upgrade typically adds a modest percentage to the total job, while adding roughly 50% more service life. Cost per year of roof, the metric that actually matters, comes out clearly ahead, before counting fewer wind repairs and better warranty terms along the way.",
          "3-tab still has a niche: short-horizon situations like a planned sale or a structure you won't keep. For a home you're staying in, the cheaper shingle is the more expensive roof.",
        ],
        image: {
          src: "/images/install-shingles.webp",
          alt: "Architectural shingles being installed, showing their layered dimensional profile",
        },
      },
      {
        heading: "What we install and why",
        paragraphs: [
          "Our standard recommendation is CertainTeed architectural shingles, installed to manufacturer spec. We're CertainTeed Certified, which is what qualifies installs for their enhanced warranty coverage, and their architectural lines have proven themselves on our roofs through enough Oregon winters to have our confidence. We work with other premium brands when a project calls for it.",
          "Material selection is part of every estimate conversation, with samples you can hold. ([The whole replacement journey, mapped.](/guides/roof-replacement-guide))",
        ],
      },
    ],
    faqs: [
      {
        question: "Are designer or premium shingles worth going beyond architectural?",
        answer:
          "Premium lines buy appearance (slate and shake looks) and sometimes higher ratings. On the cost-per-year math they're usually about the look, not the protection. If you love the look and plan to enjoy it for decades, that's a legitimate reason.",
      },
      {
        question: "Can you mix shingle types on one roof?",
        answer:
          "Technically yes, practically no. Different profiles age and weather differently, and the visual seam never settles in. Pick once for the whole roof.",
      },
      {
        question: "What about metal roofing in Oregon?",
        answer:
          "Metal is a fine material with a different budget class and aesthetic. It sheds moss better and lasts longer, at a noticeably higher upfront cost. For most asphalt-budget projects, architectural shingles hit the value sweet spot; happy to talk metal if your project leans that way.",
      },
    ],
    ogPhoto: "/images/crew-doing-tear-off.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-replacement-day-by-day",
    clusterId: "replacement-decision",
    title: "What Happens During a Roof Replacement, Day by Day",
    description:
      "From the dumpster's arrival to the final magnet sweep: an honest play-by-play of a residential roof replacement, including the part where we find surprises.",
    shortTitle: "Replacement, day by day",
    intro: [
      "Most roof replacements take one to three days, and homeowners are usually surprised in both directions: how loud day one is, and how clean everything looks when it's over. Here's the honest play-by-play so nothing about it surprises you.",
    ],
    sections: [
      {
        heading: "Before day one: the quiet logistics",
        paragraphs: [
          "After you approve the written estimate, materials get ordered and a start window gets set. The day before, a dumpster or trailer arrives for the tear-off debris, and shingle delivery usually lands on the driveway or, on many jobs, directly onto the roof by boom truck.",
          "Your prep list is short: cars out of the driveway, anything fragile off the walls of upper rooms (hammering travels), pets somewhere calm, and a note to us about anything in the yard you're worried about. We tarp and protect, but local knowledge helps.",
        ],
      },
      {
        heading: "Day one: tear-off (the loud part)",
        paragraphs: [
          "Tear-off starts early and sounds like it. The crew strips the old shingles and underlayment down to bare plywood, with tarps protecting landscaping and catch zones below the eaves. By afternoon your house is briefly wearing nothing but its deck, which is exactly the point.",
          "This is also inspection hour: every sheet of decking gets checked for rot and soft spots. Solid deck means full speed ahead. Damage means a conversation, today, with photos and per-sheet pricing you saw in writing before we started. Surprises happen under old roofs; surprise bills shouldn't.",
        ],
        image: {
          src: "/images/crew-tearing-off-roof.jpeg",
          alt: "French Roofing crew mid tear-off, stripping a roof down to the deck",
        },
      },
      {
        heading: "Day one to two: the rebuild, layer by layer",
        paragraphs: [
          "The new roof goes on as a system, in order: ice-and-water membrane in valleys and trouble spots, underlayment across the field, drip edge, new flashing at every penetration and transition, and then the shingles themselves, nailed to spec (placement and count per shingle are part of what manufacturer certification means). Ridge venting and cap shingles finish the top.",
          "A weather pause, if Oregon supplies one, isn't a crisis: the underlayment stage is built to be left watertight overnight. You'll hear the plan from us before you have to ask.",
        ],
        image: {
          src: "/images/crew-putting-on-harnesses-safety-first.jpeg",
          alt: "Crew members gearing up in safety harnesses before a day on the roof",
        },
      },
      {
        heading: "Final day: cleanup and the walkthrough",
        paragraphs: [
          "Cleanup is where roofing companies show their character. Ours ends with the yard raked, the gutters cleared of debris we caused, the dumpster hauled, and a magnet sweep of the lawn and driveway for stray nails, the part dog owners and bare feet appreciate most.",
          "Then the walkthrough: you, us, and the finished roof, with photos of the details you can't see from the ground and your warranty paperwork. ([What those warranties cover, exactly.](/guides/roofing-warranties-explained)) Questions get answered before we wave goodbye, not in a voicemail next week.",
        ],
        image: {
          src: "/images/brian-tear-off-thumbs-up.jpg",
          alt: "A French Roofing crew member giving a thumbs up during a roofing job",
        },
      },
    ],
    faqs: [
      {
        question: "How loud is it, really?",
        answer:
          "Day one is genuinely loud: scraping, hammering, footsteps overhead. Working from home is possible with headphones; napping infants and anxious dogs may want a field trip. It quiets down considerably once installation starts.",
      },
      {
        question: "What if it rains mid-job?",
        answer:
          "We watch forecasts and sequence the work so the roof is never left vulnerable. Underlayment stages are watertight; a rain delay pauses the schedule, not your protection. You'll always know the plan.",
      },
      {
        question: "Will my attic stuff get dusty?",
        answer:
          "Tear-off shakes debris and dust into attics; that's physics. Anything precious up there is worth covering or moving beforehand. We'll remind you during scheduling.",
      },
      {
        question: "Who's actually on my roof?",
        answer:
          "Our crew: trained, harnessed, and insured, led by people who've done this for years. Licensed, bonded, CCB #203933, and you can verify that anytime on Oregon's CCB site.",
      },
    ],
    ogPhoto: "/images/crew-tearing-off-roof.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "best-time-replace-roof-oregon",
    clusterId: "replacement-decision",
    title: "The Best Time of Year to Replace a Roof in Oregon",
    description:
      "Summer is easiest, fall is smart, and winter is more possible than you'd think. How Oregon's seasons affect roof replacement, and when waiting costs money.",
    shortTitle: "Best time to replace",
    intro: [
      "The easy answer is summer: dry roofs, long days, predictable schedules. The complete answer is that every Oregon season can host a roof replacement, the trade-offs just move around. And for one group of homeowners, the timing question has a sharper answer: before the roof picks its own date.",
    ],
    sections: [
      {
        heading: "Summer and early fall: the prime window",
        paragraphs: [
          "June through October is roofing's main season here for obvious reasons: dry decks, no weather pauses, shingles sealing fast in the warmth. If your roof's timeline is flexible, this window is the comfortable choice.",
          "The catch is that everyone knows it. Calendars fill, especially late summer when homeowners start doing pre-winter math. If you want a prime-window slot, the conversation should start in spring. ([The instant estimate](/estimate) is a fine way to start it.)",
        ],
      },
      {
        heading: "Winter and spring: more possible than advertised",
        paragraphs: [
          "Oregon winters deal dry stretches regularly, and an experienced local crew knows how to use them: forecast-watching, weather-sequenced work, and underlayment stages that stay watertight through a pause. ([How that sequencing works.](/guides/roof-replacement-day-by-day)) Cold slows shingle self-sealing, which spec-conscious crews handle with hand-sealing where conditions call for it.",
          "Off-season advantages are real: easier scheduling and a crew that's glad to see you. For a roof that shouldn't wait until July, winter replacement done right beats hoping, every time.",
        ],
      },
      {
        heading: "When waiting actually costs money",
        paragraphs: [
          "Timing optimization assumes the roof can afford to wait. A failing roof can't: every storm season it absorbs adds moisture damage that compounds quietly. Decking rot doesn't pause for your preferred season, and the difference shows up in the tear-off conversation. ([How decking surprises price out.](/guides/roof-replacement-cost-factors))",
          "The rule of thumb: a sound roof times its replacement for convenience. A failing roof times it for as soon as practical, whatever the month. Knowing which roof you have is one [free assessment](/services/roof-inspections) away, and [repair-or-replace has its own framework](/guides/repair-or-replace-roof) if that's the real question.",
        ],
      },
      {
        heading: "The scheduling sweet spots",
        paragraphs: [
          "If we're purely optimizing: late spring books the prime window before the rush; early fall catches good weather as calendars loosen; and winter dry spells reward the flexible. What no season offers is a legitimate price event. Roofing doesn't have Black Friday; pricing follows scope and materials, not the calendar. ([What actually moves the number.](/guides/roof-replacement-cost-factors))",
        ],
      },
    ],
    faqs: [
      {
        question: "Can shingles be installed in the rain?",
        answer:
          "No, and nobody reputable tries. Decks must be dry for underlayment and shingles to bond. What experienced crews do is sequence around weather, working in dry windows and securing the roof before each pause.",
      },
      {
        question: "Is there a cheapest month to replace a roof?",
        answer:
          "Not meaningfully. Material costs don't follow seasons, and labor pricing here stays consistent. Off-season flexibility buys you scheduling ease, not a discount; anyone advertising one is moving the number somewhere else in the quote.",
      },
      {
        question: "How far ahead should I book?",
        answer:
          "For a summer slot, start conversations in spring. Shoulder seasons typically run a few weeks out, and active problems jump every queue: leaks get priority scheduling year-round.",
      },
    ],
    ogPhoto: "/images/worker-placing-board.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-financing-explained",
    clusterId: "replacement-decision",
    title: "Roof Financing Explained: How 0% Offers Actually Work",
    description:
      "How financing a roof replacement works, what 0% promotional offers really mean, and the questions to ask before signing anything. Enhancify, explained plainly.",
    shortTitle: "Financing, explained",
    intro: [
      "A roof replacement is a five-figure expense that rarely arrives when savings are flush, which is why financing exists and why we offer it. We partner with Enhancify, which connects homeowners to lending options including 0% promotional offers. Here's how it works, in the plain English the paperwork won't use.",
    ],
    sections: [
      {
        heading: "How roof financing works mechanically",
        paragraphs: [
          "Through Enhancify, you apply once and get matched with lenders offering terms for your situation; checking your options uses a soft credit pull, so shopping doesn't ding your score. Pick a plan, sign, and the lender pays for the work while you make monthly payments on the schedule you chose.",
          "From your side it's like any installment loan. From ours, nothing changes: same crew, same materials, same warranty whether you pay cash, card, or financed. ([What the job itself looks like.](/guides/roof-replacement-day-by-day))",
        ],
      },
      {
        heading: "What 0% really means (read this part)",
        paragraphs: [
          "0% promotional financing is real and genuinely useful, with one rule that decides everything: most 0% offers are 'deferred interest' structures. Pay the full balance within the promotional window and you pay zero interest, exactly as advertised. Miss it, and interest often applies retroactively to the original amount, at a rate you won't love.",
          "The play, then: take the 0% window, divide the total by the months, automate that payment, and finish a month early. Used that way it's free money, full stop. Used as 'I'll figure it out in year two,' it's a trap with good marketing. We'd rather you know that going in.",
        ],
      },
      {
        heading: "The questions to ask any financing offer",
        paragraphs: ["Ours included. Five questions sort every offer:"],
        bullets: [
          "Is the promotional rate deferred-interest, and what exactly happens at the deadline?",
          "What's the standard rate after (or without) the promotional period?",
          "Any origination fees, prepayment penalties, or required extras?",
          "Is the monthly payment required during a 0% window, and does paying only that retire the balance in time? (Often it doesn't; see above.)",
          "Does the contractor's price change with financing? (Ours doesn't.)",
        ],
      },
      {
        heading: "When financing makes sense (and when it doesn't)",
        paragraphs: [
          "Financing shines when the roof's timeline and your cash flow disagree: a [failing roof that shouldn't wait](/guides/repair-or-replace-roof) for a savings goal, or savings better left earning than drained. A 0% window paid on schedule costs nothing extra and keeps your reserves intact.",
          "It makes less sense for stretching past your comfortable payment, which is the polite way of saying: the monthly number should fit your budget on a bad month, not a good one. If the roof can genuinely wait while you save, that's a fine answer too, and we'll tell you honestly if it can. ([Free assessment, as always.](/services/roof-replacement)) Larger repairs can use the same program, by the way; it's not replacement-only. ([Repair costs, honestly.](/guides/what-roof-repairs-cost))",
        ],
      },
    ],
    faqs: [
      {
        question: "Does applying hurt my credit?",
        answer:
          "Checking your options through Enhancify uses a soft pull, which doesn't affect your score. A hard inquiry happens only when you proceed with a chosen lender, same as any loan.",
      },
      {
        question: "What credit is needed to qualify?",
        answer:
          "Enhancify works with a range of lenders across a range of credit profiles, so there isn't one cutoff. Stronger credit gets stronger terms, but options exist across the spectrum; the application shows you yours without obligation.",
      },
      {
        question: "Can I pay it off early?",
        answer:
          "The plans we see are prepayment-friendly, and with deferred-interest 0% offers, early payoff is literally the strategy. Confirm 'no prepayment penalty' on your specific plan; it's question three on our list for a reason.",
      },
      {
        question: "Is financing available for repairs, not just replacement?",
        answer:
          "Yes. Larger repairs run through the same Enhancify program. The application doesn't care whether the project is four figures or five.",
      },
    ],
    ogPhoto: "/images/customer-handwritten-card-thank-you.jpeg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roofing-warranties-explained",
    clusterId: "replacement-decision",
    title: "Roofing Warranties: Workmanship vs Manufacturer vs Certified Coverage",
    description:
      "The three layers of roof warranty protection, what each one actually covers, and the fine print that voids them. Translated from warranty-speak to English.",
    shortTitle: "Warranties, decoded",
    intro: [
      "Every new roof comes with warranty paperwork, and almost nobody reads it until something drips. Here's the translation in advance: there are three distinct layers of protection, they cover different failures, and the fine print is survivable if you know where it lives.",
    ],
    sections: [
      {
        heading: "Layer one: the manufacturer's material warranty",
        paragraphs: [
          "This is the famous number ('30-year shingles,' 'limited lifetime') and it covers one thing: the shingles themselves failing as a product. Defective granule loss, premature cracking, shingles that didn't perform as engineered.",
          "What it doesn't cover is everything else: installation mistakes, flashing failures, storm damage, or wear from neglected maintenance. Manufacturer warranties also commonly prorate, with full-value coverage early and declining value as the roof ages. The marquee number is real; it's just narrower than the marketing.",
        ],
      },
      {
        heading: "Layer two: the workmanship warranty",
        paragraphs: [
          "Here's the industry's open secret: most roof failures are installation failures, not material failures, and the manufacturer's warranty explicitly excludes them. The workmanship warranty is the contractor's own promise covering exactly that gap: [the flashing details](/guides/roof-flashing-leaks), the nailing, the sequencing, the things that decide whether identical shingles last 12 years or 30.",
          "Two questions reveal everything about one: is it written, and is the company that issued it likely to exist when you need it? A ten-year promise from a phone number that changes annually is decoration. Ours is written, standard on every replacement, and backed by a company that's been at the same trade since 2014. (CCB #203933, verifiable anytime.)",
        ],
      },
      {
        heading: "Layer three: certified-installer enhanced coverage",
        paragraphs: [
          "Manufacturers know installation decides their product's reputation, so they certify contractors who install to spec, and they back those installs with enhanced warranty tiers: longer non-prorated periods and, at the higher tiers, manufacturer coverage that includes workmanship.",
          "This is what CertainTeed certification means on your paperwork: an install that qualifies for coverage beyond the standard terms, from both directions. It's also a useful sorting question for any contractor: 'what certifications, and what enhanced coverage does my roof qualify for?' ([It made our list of 10 questions to ask.](/essentials))",
        ],
      },
      {
        heading: "The fine print that actually bites",
        paragraphs: ["Warranty claims fail for a short list of predictable reasons:"],
        bullets: [
          "Neglected maintenance: moss left to colonize and debris left to dam water are excluded wear in every warranty we've read. ([The maintenance that protects coverage.](/guides/moss-on-roof-oregon))",
          "Improper cleaning: pressure washing is warranty poison. ([We never do it; here's why.](/guides/why-we-never-pressure-wash-roofs))",
          "Unauthorized modifications: satellite mounts, solar installs, or repairs by whoever was cheapest can void coverage on affected areas. Loop your roofer in first.",
          "Missed registration: enhanced coverage usually requires registering the warranty after installation. We handle this with you at the final walkthrough, because paperwork forgotten is coverage forfeited.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do warranties transfer if I sell the house?",
        answer:
          "Commonly yes, once, within a time window and with notification requirements. A transferable roof warranty is genuinely worth mentioning in a sale; just follow the transfer steps rather than assuming.",
      },
      {
        question: "What's the difference between 'lifetime' and '30-year'?",
        answer:
          "'Limited lifetime' typically means as long as the original owner owns the home, with proration kicking in after an initial full-coverage period. The initial non-prorated window is the number worth comparing, and it's where certified installs usually shine.",
      },
      {
        question: "My roof leaked and the manufacturer denied the claim. Why?",
        answer:
          "Most likely the failure traced to installation or maintenance rather than the shingles as a product, which is the line between the warranty layers. It's exactly why the workmanship warranty, and who stands behind it, deserves as much attention as the shingle wrapper.",
      },
    ],
    ogPhoto: "/images/brian-tear-off-thumbs-up.jpg",
    cta: REPLACEMENT_CTA,
    datePublished: "2026-06-06",
  },
];
