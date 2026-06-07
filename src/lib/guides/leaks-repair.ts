import type { Cluster, Guide } from "./types";

// Cluster 2: Leaks & Repair
// Persona: "The Drip Detective" - found a stain, a drip, or shingles in the
// yard. Stressed, searching at 9pm. Tone: calm, direct, reassuring. The CTA
// leans on the phone and fast response, never on fear.
// Money pages: /services/roof-repair, /services/roof-inspections

export const leaksRepairCluster: Cluster = {
  id: "leaks-repair",
  name: "Leaks & Repair",
  description:
    "Found a stain on the ceiling or shingles in the yard? Start here. How to figure out what's wrong, what's urgent, and what fixing it actually involves.",
  pillarSlug: "roof-leak-guide",
};

const REPAIR_CTA = {
  headline: "Got a Leak? We'll Take a Look.",
  description:
    "Schedule a FREE roof assessment, or call us at 971-376-8722 if water is coming in right now. We're based in Damascus, so we're never far away.",
};

export const leaksRepairGuides: Guide[] = [
  // ── PILLAR ──────────────────────────────────────────────────────────
  {
    slug: "roof-leak-guide",
    clusterId: "leaks-repair",
    isPillar: true,
    title: "The Roof Leak Guide: Find It, Stop It, Fix It",
    description:
      "Where roof leaks come from, how to track one down, what to do tonight versus what can wait, and what repairs cost. Straight answers from a Damascus roofing crew.",
    shortTitle: "The Roof Leak Guide",
    intro: [
      "If you're reading this because there's water where water shouldn't be, take a breath. Most leaks look worse than they are, almost none of them are emergencies in the next ten minutes, and nearly all of them are fixable without replacing the whole roof.",
      "We're French Roofing, a family roofing company in Damascus. We've chased leaks through every kind of Oregon storm since 2014, and this guide is the conversation we'd have with you on your porch: where leaks come from, how to find the source, what to do right now, and what the fix usually involves.",
    ],
    sections: [
      {
        heading: "First: is this urgent?",
        paragraphs: [
          "A roof leak is urgent if water is actively dripping into the living space, spreading across a ceiling, or anywhere near electrical fixtures. Urgent means: contain the water tonight, call a roofer in the morning (or call us now at 971-376-8722 and leave a message; we prioritize active leaks).",
          "It's not urgent if you've found an old stain that isn't growing, a damp spot in the attic after weeks of rain, or exterior wear you spotted from the yard. Those deserve attention soon, not panic now. We sorted the whole list in [emergency roof triage: what to do tonight, what can wait](/guides/emergency-roof-triage).",
        ],
      },
      {
        heading: "Where do roof leaks actually come from?",
        paragraphs: [
          "Here's something that surprises most homeowners: leaks rarely come from the middle of a shingle field. Water gets in at the seams and penetrations, the places where the roof is interrupted by something. The usual suspects, roughly in the order we find them:",
        ],
        bullets: [
          "Flashing that's cracked, rusted, or pulled loose around chimneys, walls, and valleys. The number one culprit. ([The full flashing story.](/guides/roof-flashing-leaks))",
          "Pipe boots: the rubber seals around plumbing vents dry out and crack after 10 to 15 years.",
          "Skylights, where debris and worn seals team up. ([Why skylights need extra attention.](/guides/skylight-leaks))",
          "Missing or wind-lifted shingles after a storm. ([What to do when shingles end up in the yard.](/guides/shingles-blew-off-roof))",
          "Nail pops working up through the surface.",
          "Valleys that have been damming water. ([How standing water does its damage.](/guides/standing-water-roof-valleys))",
          "Moss that lifted shingle edges over a few wet winters. ([The moss connection.](/guides/moss-on-roof-oregon))",
          "Ridge caps and counter-flashing at the top of the roof, worked loose by years of wind.",
        ],
      },
      {
        heading: "Why the drip is rarely below the hole",
        paragraphs: [
          "Water is sneaky. It enters at one spot, runs down the underside of the roof deck or along a rafter, and drops onto your ceiling somewhere else entirely. A stain in the hallway can come from an opening ten feet upslope. That's why DIY leak-hunting from inside often points you at the wrong patch of roof.",
          "When we trace a leak, we start at the stain and work upslope, checking every penetration and seam along the water's possible path. Bring a flashlight to the attic during heavy rain and you can sometimes catch the trail shining on the underside of the deck. Follow it up; the entry point is at the top.",
        ],
      },
      {
        heading: "What to do tonight (before anyone gets on the roof)",
        paragraphs: ["If water is coming in right now:"],
        bullets: [
          "Contain it: bucket under the drip, towels around it, move furniture and electronics out of the way.",
          "Poke a small relief hole. If a ceiling is bulging with water, a screwdriver hole in the center of the bulge lets it drain into your bucket instead of collapsing the drywall. Counterintuitive, correct.",
          "Take photos and video of everything: the drip, the stain, the date. If this turns into an insurance conversation, you'll be glad you did.",
          "Stay off the roof. A wet Oregon roof at night is how homeowners get hurt. Nothing on the roof needs you up there tonight.",
        ],
      },
      {
        heading: "Repair, patch, or replace?",
        paragraphs: [
          "Most leaks end in a repair, not a new roof. If your roof is under 15 years old and the problem is isolated (one flashing point, one run of shingles, one pipe boot), a targeted repair is the smart money. If the roof is 20 plus and the leak is one symptom among many (bald shingles, multiple stains, repairs every season), it's worth an honest conversation about [replacement](/services/roof-replacement) instead of paying for the same fix twice.",
          "And patches? A patch has a real job: stopping water fast while the weather or budget catches up. It's a bridge, not a destination. We wrote up [when patches work and when they don't](/guides/roof-patch-vs-repair).",
        ],
        image: {
          src: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
          alt: "Older discolored shingles with failing flashing and an active leak, past the point of patching",
        },
      },
      {
        heading: "What a proper leak repair involves",
        paragraphs: [
          "A real repair starts with finding the actual entry point, not just the wet spot. Our crew inspects, photographs, and explains what we found in plain English. Then the fix: replacing the damaged shingles or flashing, sealing the penetration correctly, and checking the decking underneath for moisture damage while we're in there.",
          "You get a written estimate before any work starts. If we find something bigger than expected under the surface, you hear about it right away, with photos and options. That's been the deal since Sean started this company in 2014.",
        ],
      },
      {
        heading: "What do leak repairs cost?",
        paragraphs: [
          "Roof repairs around the Portland metro range from a few hundred dollars for minor fixes (a pipe boot, a small flashing repair, a few shingles) to several thousand for bigger jobs involving decking or large areas. The honest answer for your roof requires eyes on it, which is why our assessments are free.",
          "We put together [a full breakdown of repair costs](/guides/what-roof-repairs-cost), including what makes the number go up and down, so you can walk into any contractor conversation knowing the landscape.",
        ],
      },
      {
        heading: "After the fix: keeping leaks from coming back",
        paragraphs: [
          "Almost every leak we repair had a warning sign somebody could have caught a season earlier: a cracked boot, a lifted shingle, a mossy valley. Twice-a-year eyes on your roof is the cheapest leak insurance there is. That's what our [maintenance program](/services/maintenance) does, and every visit includes an inspection.",
          "Prefer the one-off version? A [free roof assessment](/services/roof-inspections) anytime, no strings. We'd rather catch your next leak while it's still a $300 fix.",
        ],
      },
    ],
    faqs: [
      {
        question: "How fast can you get to an active leak?",
        answer:
          "For active leaks in our service area we prioritize getting out fast, often within a day or two. We're based in Damascus, so Happy Valley, Clackamas, Gresham, and the surrounding towns are a short drive.",
      },
      {
        question: "Can a leak dry up and be fine on its own?",
        answer:
          "The stain might stop growing in dry weather, but the opening that let water in doesn't heal. It'll be back with the next storm, usually a little worse. Small openings caught early are the cheapest repairs we do.",
      },
      {
        question: "Will my homeowners insurance cover the repair?",
        answer:
          "It depends on the cause. Sudden storm damage is often covered; gradual wear and maintenance issues usually aren't. We document everything we find with photos, which gives you what you need for that conversation with your insurer.",
      },
      {
        question: "Should I try to fix a leak myself?",
        answer:
          "Swapping a pipe boot on a walkable single-story roof is within reach for a handy homeowner on a dry day. Chasing the actual source of a mystery leak usually isn't, because the entry point is rarely where the water shows up. Misdiagnosed DIY fixes are some of the most common repairs we redo.",
      },
      {
        question: "Do you charge to come look at a leak?",
        answer:
          "No. Assessments are free, including for leaks. We look, we photograph, we tell you what's going on and what it'll take to fix. No pressure either way.",
      },
    ],
    heroImage: {
      src: "/images/cracked-flashing.webp",
      alt: "Cracked roof flashing, one of the most common sources of roof leaks",
    },
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  // ── SUPPORTING ──────────────────────────────────────────────────────
  {
    slug: "water-stain-on-ceiling",
    clusterId: "leaks-repair",
    title: "Water Stain on the Ceiling: What It Means and What to Do",
    description:
      "A brown ring on the ceiling is your house leaving you a note. How to read it, figure out if the leak is active, and decide what to do next.",
    shortTitle: "Water stain on the ceiling",
    intro: [
      "A brown or yellowish ring on your ceiling means water got into the structure above it at some point. The two questions that matter: is it still happening, and where is it coming from? Everything else follows from those two answers.",
      "Here's how to read the stain like a roofer would.",
    ],
    sections: [
      {
        heading: "Active leak or old scar?",
        paragraphs: [
          "Mark the edge of the stain lightly with a pencil and note the date. If the stain grows past your line after the next rain, the leak is active. If it stays put through a few storms, you're probably looking at the scar of a past problem (sometimes one a previous owner already fixed, sometimes one that's just waiting for the right storm).",
          "Feel matters too. An active leak often leaves the drywall damp or soft after rain. Old stains are dry and firm. A moisture meter settles it definitively, and checking with one is part of any assessment we do.",
        ],
      },
      {
        heading: "Why the stain isn't below the hole",
        paragraphs: [
          "Water travels. It comes in upslope, rides rafters and the roof deck sideways and down, and drops where gravity finally wins. A stain near an interior wall can trace back to a chimney, a vent pipe, or a valley a surprising distance away.",
          "That's also why a stain in a ceiling corner often points at flashing where the roof meets a wall or chimney, our number one leak source. ([More on flashing leaks here.](/guides/roof-flashing-leaks))",
        ],
      },
      {
        heading: "Not every ceiling stain is the roof",
        paragraphs: [
          "Before anyone climbs a ladder, it's worth knowing the impostors. Bathroom fans that vent into the attic instead of outside, sweating ducts, condensation from poor attic ventilation, and plumbing on the floor above all leave stains that look exactly like roof leaks.",
          "A quick tell: stains that grow in cold snaps but ignore rainstorms usually point at condensation, not the roof. Stains that track with rain point up. Either way, the attic above the stain is where the answer lives.",
        ],
      },
      {
        heading: "What to do about it",
        paragraphs: [
          "If it's active: contain the water, photograph everything, and get it looked at soon. Our [triage guide](/guides/emergency-roof-triage) covers the tonight-versus-this-week decisions, and the [Roof Leak Guide](/guides/roof-leak-guide) covers the whole journey from stain to fix.",
          "If it's an old scar: get the roof checked before you repaint, not after. There's nothing quite like painting a ceiling twice. A [free assessment](/services/roof-inspections) tells you whether the underlying problem was ever actually fixed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I just paint over a water stain?",
        answer:
          "Once you've confirmed the leak is fixed, yes: a stain-blocking primer first, then paint. Painting over an active leak just gives the next stain a fresh canvas.",
      },
      {
        question: "Is a wet ceiling dangerous?",
        answer:
          "Sagging, bulging drywall can come down, and water near light fixtures deserves respect: don't operate them, and if water reached any electrical, kill that circuit. A flat, damp stain isn't a collapse risk, but a bulge means drain it (small hole, bucket underneath) before it picks its own moment.",
      },
      {
        question: "How much does it cost to fix a ceiling stain?",
        answer:
          "The roof repair is the variable part: a few hundred dollars for simple fixes, more if water has been at it a while. The drywall repaint is usually the cheap end of the project. Fixing the source first is what keeps you from paying for both twice.",
      },
    ],
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "why-is-my-roof-leaking",
    clusterId: "leaks-repair",
    title: "Why Is My Roof Leaking? The 8 Usual Suspects",
    description:
      "Roof leaks almost always come from the same short list of places. The 8 most common causes we find on Portland-area roofs, and how to spot each one.",
    shortTitle: "The 8 usual leak suspects",
    intro: [
      "After enough years chasing leaks, you learn they're not creative. Water gets into Oregon roofs through the same short list of openings, over and over. Here are the eight we find most, roughly in order of how often we find them.",
    ],
    sections: [
      {
        heading: "1. Flashing failures (the champion)",
        paragraphs: [
          "Flashing is the metal that seals every place your roof meets something else: chimneys, walls, valleys, skylights. When it cracks, rusts, or pulls away, water has a straight path in. If we had to bet sight-unseen on any leak in the metro, we'd bet flashing. ([The full flashing breakdown.](/guides/roof-flashing-leaks))",
        ],
      },
      {
        heading: "2. Worn pipe boots",
        paragraphs: [
          "Every plumbing vent pipe through your roof wears a rubber boot. Oregon sun and weather dry that rubber out in 10 to 15 years, and when it cracks, water follows the pipe straight down into the house. Cheap part, classic leak, easy fix when caught early.",
        ],
      },
      {
        heading: "3. Missing or wind-lifted shingles",
        paragraphs: [
          "Our winter windstorms peel shingles up or off entirely, and the exposed underlayment only holds out so long. If you've found [shingle pieces in the yard](/guides/shingles-blew-off-roof), the roof is telling you where to look.",
        ],
      },
      {
        heading: "4. Skylights",
        paragraphs: [
          "We love skylights. Water loves them more. Debris collects on the uphill side, seals age, and the flashing around them works loose. They earn their own guide: [why skylights need extra attention](/guides/skylight-leaks).",
        ],
      },
      {
        heading: "5. Clogged valleys and standing water",
        paragraphs: [
          "Valleys carry more water than anywhere else on the roof, and under Oregon trees they collect needles until water dams up and starts probing the seams. ([How standing water kills shingles quietly.](/guides/standing-water-roof-valleys))",
        ],
      },
      {
        heading: "6. Moss-lifted shingle edges",
        paragraphs: [
          "Moss grows into the gaps between shingles and pries the edges up, breaking their seal. Then a wind-driven storm finds the opening. If your leak is on a green, shaded slope, moss probably set the table. ([The Moss Handbook covers it all.](/guides/moss-on-roof-oregon))",
        ],
      },
      {
        heading: "7. Nail pops",
        paragraphs: [
          "Roofing nails can work their way up over years of temperature swings, lifting a little tent in the shingle above. Each one is a pinhole opportunity for water. One nail pop is trivial; a roof full of them says the install was rushed, and that's worth a professional look.",
        ],
      },
      {
        heading: "8. Ridge caps and aging seals",
        paragraphs: [
          "The cap shingles along the ridge take the most wind on the roof, and the various sealants up there have shorter lives than the shingles themselves. On roofs past 15 years, tired caps and seals make the list.",
          "Notice a theme: almost everything on this list is a seam, an edge, or a penetration. Shingle field leaks are rare; interruption leaks are the rule. That's where any good leak hunt starts, and it's where our [free assessments](/services/roof-repair) look first. For the whole journey from drip to fix, start with [the Roof Leak Guide](/guides/roof-leak-guide).",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a new roof leak?",
        answer:
          "Unfortunately yes, if the flashing or penetrations were done carelessly. New-roof leaks are nearly always workmanship at the seams rather than the shingles. It's why manufacturer-spec installation matters more than the shingle brand on the wrapper.",
      },
      {
        question: "Why does my roof only leak in heavy rain?",
        answer:
          "Small openings need volume or wind direction to overwhelm them. A cracked boot might shrug off drizzle and let go in a sideways November storm. Intermittent doesn't mean imaginary; it means the opening is small enough to catch cheap.",
      },
      {
        question: "Which of these can I check myself?",
        answer:
          "From the ground with binoculars: missing shingles, visible moss, debris-filled valleys, and lifted ridge caps. From the attic with a flashlight: damp trails and daylight. Flashing details and boots really need close eyes, which is what free assessments are for.",
      },
    ],
    ogPhoto: "/images/sean-peace-sign-near-hole-in-roof.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-flashing-leaks",
    clusterId: "leaks-repair",
    title: "Roof Flashing: The Leak Source Nobody Checks",
    description:
      "Flashing seals every seam on your roof, and it fails more often than the shingles around it. What flashing does, how it fails, and what fixing it involves.",
    shortTitle: "Flashing leaks explained",
    intro: [
      "Ask a homeowner where roof leaks come from and they'll say shingles. Ask a roofer and they'll say flashing. Flashing is the metal that waterproofs every interruption in your roof: chimneys, walls, valleys, skylights, vents. It's a small fraction of the roof's surface and the source of most of its leaks.",
    ],
    sections: [
      {
        heading: "What flashing actually does",
        paragraphs: [
          "Shingles are great at shedding water downhill across an open field. They're helpless at corners, walls, and holes. Flashing bridges those transitions: thin metal shaped and layered so water flowing down the roof gets carried over the seam and back onto the shingles below.",
          "When flashing is right, those transitions outlast the shingles. When it's wrong (or just old), the most vulnerable points on your roof are protected by the weakest material on it.",
        ],
        image: {
          src: "/images/cracked-flashing.webp",
          alt: "Cracked flashing on a residential roof, a classic slow leak in the making",
        },
      },
      {
        heading: "How flashing fails",
        paragraphs: ["The failure modes we see most on Portland-area roofs:"],
        bullets: [
          "Cracking: sealant and older mastic-style flashing dry out and split, exactly like the photo above.",
          "Rust and corrosion: decades of Oregon moisture eventually win against bare steel.",
          "Pulling away: temperature cycles and settling work chimney and wall flashing loose from the masonry or siding.",
          "Bad installation: caulk where layered metal should be. Caulk is a sealant, not a flashing system, and it has a service life measured in a few years.",
          "Storm damage: wind lifts flashing edges, and once bent, metal doesn't reseal itself.",
        ],
      },
      {
        heading: "Signs your flashing is the problem",
        paragraphs: [
          "Leaks that show up near chimneys, around skylights, at ceiling corners along exterior walls, or high on a wall inside the house all point toward flashing. So do stains that reappear after a 'fixed' leak comes back, since misdiagnosed flashing leaks are commonly patched at the wrong spot.",
          "From the ground, look for visible gaps between flashing and chimney, rust streaks, or shiny caulk smeared along seams (a sign someone took a shortcut up there).",
        ],
      },
      {
        heading: "What a proper flashing repair looks like",
        paragraphs: [
          "A real flashing fix means removing and replacing the failed metal, layered correctly with the shingles and counter-flashed where it meets masonry, not running a new bead of caulk over the old problem. It's detail work, which is exactly why it gets skipped.",
          "If your leak traces to flashing, here's [what our repair service covers](/services/roof-repair). For the bigger leak picture, [the Roof Leak Guide](/guides/roof-leak-guide) starts at the beginning.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does flashing last?",
        answer:
          "Quality metal flashing, installed right, commonly outlives the shingles around it. Sealants and rubber accessories are the short-lived parts, which is why 'the flashing failed' often really means 'the caulk somebody substituted for flashing failed.'",
      },
      {
        question: "Can flashing be repaired without replacing shingles?",
        answer:
          "Often, yes. Flashing work usually involves lifting and relaying the shingles immediately around the repair rather than replacing whole sections. Matching shingles get reused or replaced as needed.",
      },
      {
        question: "Why did my last flashing repair fail?",
        answer:
          "Nine times out of ten: it was a caulk job. Sealant over failed flashing buys a season or two, then the leak returns. The fix that lasts is layered metal, done once, done right.",
      },
    ],
    ogPhoto: "/images/old-discolored-singles-active-leak-failing-flashing-time-for.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "shingles-blew-off-roof",
    clusterId: "leaks-repair",
    title: "Found Shingles in the Yard After a Windstorm? Here's Your Next Move",
    description:
      "Shingles in the yard mean exposed roof somewhere above. How to assess the damage safely, whether insurance applies, and how soon it needs fixing.",
    shortTitle: "Shingles in the yard",
    intro: [
      "Shingles in the yard after a storm mean one thing: part of your roof is more exposed than it was yesterday. It's not a five-alarm emergency, but it's not a someday job either. The underlayment beneath those missing shingles is a backup system, not a roof.",
      "Here's the order of operations.",
    ],
    sections: [
      {
        heading: "Step 1: Look, don't climb",
        paragraphs: [
          "From the ground, walk the house and find where the shingles came from. Look for dark or light patches where the surface changed, lifted tabs sticking up, or exposed black underlayment. Binoculars help. Photograph everything you see, plus the shingles on the ground, with the date.",
          "Stay off the roof. Post-storm roofs hide loose shingles, wet surfaces, and damage you can't see until you're standing on it. The photos from the ground are all you need for now.",
        ],
      },
      {
        heading: "Step 2: Judge the exposure",
        paragraphs: [
          "A few missing tabs on one slope is a standard repair. Whole shingle courses gone, underlayment visibly torn, or daylight in the attic moves it up the urgency list, especially with more rain coming (so, in Oregon, always).",
          "Exposed underlayment sheds light rain for a while, but wind-driven storms will find its seams and staple holes. The practical window is shorter in November than in July.",
        ],
      },
      {
        heading: "Step 3: Decide on insurance before you decide on repairs",
        paragraphs: [
          "Sudden wind damage is the kind of thing homeowners policies often cover, subject to your deductible. If the visible damage is modest, a repair below or near your deductible isn't worth a claim. If a storm took serious area off the roof, the documentation you took in step one starts earning its keep.",
          "We document wind damage thoroughly on every assessment, with photos you can hand straight to your adjuster. We're happy to be there when the adjuster visits, too.",
        ],
      },
      {
        heading: "Step 4: Get it repaired (and matched)",
        paragraphs: [
          "Wind repairs are usually straightforward: replace the missing and damaged shingles, check the surrounding tabs whose seals broke even though they stayed on, and make sure the underlayment underneath survived. Color matching is the cosmetic wrinkle; a close match from the same manufacturer line usually blends within a season of weathering.",
          "One honest caveat: if your shingles are losing their grip in ordinary storms, the wind didn't cause the problem so much as reveal it. Aging seal strips let go in winds that newer roofs shrug off. If this is the second or third storm cleanup in a few years, it's worth reading the [repair-or-replace conversation in the Roof Leak Guide](/guides/roof-leak-guide), or just getting a [free assessment](/services/roof-repair) and an honest answer.",
        ],
      },
    ],
    faqs: [
      {
        question: "How windy does it have to be to damage a healthy roof?",
        answer:
          "Shingles are rated for serious wind when their seal strips are intact. Healthy roofs typically ride out ordinary Oregon storms; it's aging seals, lifted edges, and previous damage that turn a windy night into yard confetti.",
      },
      {
        question: "Can I glue a blown-off shingle back on?",
        answer:
          "A shingle that's fully off has usually torn its nail line, so it can't just be re-stuck. Replacing it is quick for a crew and the right repair includes re-sealing the neighbors that lifted. Save the pieces though; they help with color matching.",
      },
      {
        question: "Will a tarp protect the exposed area until repair?",
        answer:
          "A properly anchored tarp is a fine bridge for significant exposure, and it's part of what emergency visits are for. A loose tarp in Oregon wind is worse than no tarp; this is one of the few jobs we'd rather you not DIY from a ladder in a storm's aftermath.",
      },
    ],
    ogPhoto: "/images/crew-tearing-off-roof.jpeg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "roof-patch-vs-repair",
    clusterId: "leaks-repair",
    title: "Can You Just Patch a Roof? When Patches Work (and When They Don't)",
    description:
      "A roof patch can solve an immediate problem, but it's not a long-term fix. The honest difference between a patch and a repair, and when each one makes sense.",
    shortTitle: "Patch vs repair",
    intro: [
      "Yes, you can patch a roof. A patch can stop water today, and sometimes that's exactly what the moment calls for. What a patch can't do is be a repair. The difference matters, and a lot of the leak calls we get are patches from a year or two ago, retiring early.",
    ],
    sections: [
      {
        heading: "What counts as a patch?",
        paragraphs: [
          "A patch addresses the symptom at the surface: sealant in a gap, mastic over a crack, a piece of metal or membrane over a hole. It treats the spot where water is getting in without rebuilding the system (shingles, underlayment, flashing) that was supposed to keep it out.",
          "A repair, by contrast, takes the failed assembly apart and rebuilds it the way it was designed: new shingles woven in, new flashing layered correctly, damaged decking addressed underneath.",
        ],
        image: {
          src: "/images/roof-patch-can-solve-an-immediate-issue-but-its-not-a-long-t.jpg",
          alt: "A patched section of roof, a short-term fix that's not built to last",
        },
      },
      {
        heading: "When a patch is the right call",
        paragraphs: ["Patches have a legitimate job description:"],
        bullets: [
          "Stopping active water intrusion fast, with the real repair scheduled behind it",
          "Bridging weather: a January leak patched until a dry stretch allows proper work",
          "Bridging budget: keeping a roof watertight while you plan a replacement already on the horizon",
          "Buying a sale-pending house a few honest weeks (disclosed, please)",
        ],
      },
      {
        heading: "When a patch is the wrong call",
        paragraphs: [
          "A patch is the wrong answer when it's pretending to be the repair. Sealant has a service life of a couple of years at best on a roof surface; sun and temperature swings crack it, and the leak returns to a spot that now has goop complicating the proper fix.",
          "The expensive version of this story: patch fails quietly, water works on the decking for two more winters, and a $600 repair becomes a $3,000 one. The patch didn't save money; it financed the damage at a terrible interest rate.",
        ],
      },
      {
        heading: "Our approach",
        paragraphs: [
          "When we patch something, we say so, and we tell you what the real repair is and when it should happen. When the right move is the full repair now, we'll tell you that too, with a written estimate and photos of why. ([What repairs involve and cost.](/guides/what-roof-repairs-cost))",
          "If someone's only offer for your leak is a can of sealant, get a second opinion. Ours is [free](/services/roof-repair). And for the full leak journey, start with [the Roof Leak Guide](/guides/roof-leak-guide).",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a roof patch last?",
        answer:
          "Surface sealant patches: think a season or two, less in full sun. Properly layered temporary membranes: longer, but still temporary. Any patch outliving its second winter is on borrowed time.",
      },
      {
        question: "Are patch jobs cheaper?",
        answer:
          "Today, yes. Over the life of the problem, usually no, because the underlying failure keeps working. The patch's real value is time, not savings: it converts an emergency into a scheduled repair.",
      },
      {
        question: "Can a patched roof pass a home inspection?",
        answer:
          "Inspectors generally note visible patches as exactly what they are: evidence of a problem and a temporary response. If you're selling, a documented proper repair reads a lot better on the report than fresh mastic.",
      },
    ],
    ogPhoto: "/images/roof-patch-can-solve-an-immediate-issue-but-its-not-a-long-t.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "skylight-leaks",
    clusterId: "leaks-repair",
    title: "Skylight Leaks: Why Skylights Need Extra Attention",
    description:
      "Skylights are the most demanding penetration on your roof: debris piles up against them, seals age, and flashing works loose. How to keep yours watertight.",
    shortTitle: "Skylight leaks",
    intro: [
      "A skylight is a hole in your roof with glass in it. We say that with love (natural light is great), but it's worth being clear-eyed about: every skylight interrupts the shingle field, collects debris on its uphill side, and relies on flashing and seals that age faster than the roof around them.",
      "Kept up, skylights stay watertight for decades. Ignored, they're one of the most reliable leak sources we visit.",
    ],
    sections: [
      {
        heading: "Why skylights leak more than the rest of the roof",
        paragraphs: [
          "Three reasons. First, debris: needles and leaves wash down the roof and pile against the skylight's uphill edge, holding a wet compress against the flashing for months. Second, seals: the gaskets and weather seals around the glass dry out and shrink over 10 to 20 years. Third, the flashing kit itself: it's doing the hardest flashing job on the roof, sealing all four sides of a box against water coming from above.",
          "Oregon adds a fourth: moss loves the shaded, damp margin around a skylight curb.",
        ],
        image: {
          src: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
          alt: "Debris building up against a skylight on an Oregon roof, a common cause of skylight leaks",
        },
      },
      {
        heading: "Leak, or condensation?",
        paragraphs: [
          "Half the 'leaking' skylights we visit aren't leaking. Warm indoor air hits cold skylight glass, condenses, and drips, especially in winter, especially in kitchens and bathrooms. Condensation shows up in cold snaps regardless of rain, beads on the glass itself, and drips from the low corner of the skylight well.",
          "An actual leak tracks with rain, often stains the drywall of the skylight well on one side, and leaves trails from the frame rather than the glass. Knowing which one you have changes the fix from 'roofer' to 'ventilation.'",
        ],
      },
      {
        heading: "Keeping skylights watertight",
        paragraphs: ["The maintenance is boring, which is the good news:"],
        bullets: [
          "Keep the uphill side clear of debris so water flows around, not against. (Part of every [roof cleaning](/services/roof-cleaning) we do.)",
          "Treat moss around the curb before it gets under the flashing edges. ([The Moss Handbook](/guides/moss-on-roof-oregon) covers why.)",
          "Have the seals and flashing eyeballed during inspections, especially past year ten.",
          "When reroofing, replace the skylights or at least the flashing kits. Putting a 20-year-old skylight on a brand-new roof is a classic regret.",
        ],
      },
      {
        heading: "When a skylight leak shows up",
        paragraphs: [
          "Skylight repairs range from resealing and new flashing kits to full unit replacement, and the right answer depends on the unit's age and the leak's path. We'll tell you which one your situation actually needs, with photos. ([Free assessment, as always.](/services/roof-repair))",
          "For tracking the leak to its source first, [the Roof Leak Guide](/guides/roof-leak-guide) has the method.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long do skylights last?",
        answer:
          "Quality units commonly run 20 to 30 years; their seals and flashing details are usually what retire first. If your skylight is original to a 25-year-old roof, plan for replacement when the roof turns over.",
      },
      {
        question: "Can you repair a skylight without replacing it?",
        answer:
          "Often, yes: clearing the drainage path, resealing, or replacing the flashing kit handles many leaks. Failed glass seals (fogging between panes) or cracked frames usually mean the unit is done.",
      },
      {
        question: "Do skylights make sense in Oregon at all?",
        answer:
          "Honestly, yes. Eight months of grey makes natural light worth the maintenance. Modern units with proper flashing, installed on a roof that gets regular care, behave themselves fine. The trouble comes from forgetting they exist.",
      },
    ],
    ogPhoto: "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "emergency-roof-triage",
    clusterId: "leaks-repair",
    title: "Emergency Roof Triage: What to Do Tonight, What Can Wait",
    description:
      "Water coming in right now? A calm, step-by-step sorting of roof problems into tonight, this week, and this season. From a crew that takes the 9pm calls.",
    shortTitle: "Emergency roof triage",
    intro: [
      "Roof problems feel urgent at 9pm in the rain. Most aren't, and the few that are can be handled with a bucket, a phone, and a little nerve. Here's how we'd triage it with you on the phone.",
    ],
    sections: [
      {
        heading: "Tonight: active water, contained",
        paragraphs: [
          "If water is actively coming in, your job tonight is containment, not roofing.",
        ],
        bullets: [
          "Bucket and towels under the drip. Move electronics, books, and furniture out of the splash zone.",
          "Bulging ceiling? Drain it on your terms: small screwdriver hole at the center of the bulge, bucket underneath. It saves the drywall around it.",
          "Water near light fixtures or outlets: don't use them, and switch off that circuit at the panel.",
          "Photograph and video everything with timestamps. Future you (and possibly your insurer) will thank present you.",
          "Call us at 971-376-8722. Active leaks get priority scheduling, usually within a day or two.",
        ],
      },
      {
        heading: "Tonight: what NOT to do",
        paragraphs: [
          "Do not get on the roof. We mean it. A wet roof in the dark injures homeowners every storm season, and there is nothing up there tonight worth it. Tarping, sealing, and diagnosis all work better (and safer) in daylight, done by people wearing harnesses.",
          "Also skip the midnight sealant run. Wet surfaces won't take sealant anyway, and a smear of mastic in the wrong place complicates the real repair.",
        ],
      },
      {
        heading: "This week: active but contained",
        paragraphs: [
          "A slow drip you've contained, a stain that grew after the last storm, shingles in the yard with no inside water yet: these are this-week problems. The structure isn't at risk overnight, but every storm widens the opening.",
          "Book a [free assessment](/services/roof-repair), send us photos if you've got them, and keep the bucket on duty. Our guides on [ceiling stains](/guides/water-stain-on-ceiling) and [missing shingles](/guides/shingles-blew-off-roof) cover the homework you can do from the ground.",
        ],
      },
      {
        heading: "This season: the watch list",
        paragraphs: [
          "Old stains that don't grow, moss on the shaded slope, debris in the valleys, a roof past its fifteenth birthday that hasn't been looked at: nothing here needs a call tonight. All of it belongs on a list with a date attached, because watch-list items are how next winter's 'tonight' problems get made.",
          "The efficient version: one [free inspection](/services/roof-inspections) clears the whole list at once, and our [maintenance program](/services/maintenance) keeps it cleared. For everything leak-shaped, [the Roof Leak Guide](/guides/roof-leak-guide) is the map.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you do emergency tarping?",
        answer:
          "Yes. For significant exposure (storm damage, fallen branches), we get a properly anchored tarp on fast and schedule the real repair behind it. Call 971-376-8722.",
      },
      {
        question: "What if a tree or branch went through the roof?",
        answer:
          "That's the rare true emergency. Keep everyone out of the room below, kill power to that area if wiring may be involved, and call us. If the structure looks unstable, that's a fire-department call first, roofer second.",
      },
      {
        question: "Will one night of leaking ruin my house?",
        answer:
          "One contained night, almost never. Drywall stains and a ruined ceiling patch are the usual worst case. It's the leaks that run for weeks unnoticed that do structural damage, which is the whole argument for getting eyes on it this week, not eventually.",
      },
    ],
    ogPhoto: "/images/crew-putting-on-harnesses-safety-first.jpeg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },

  {
    slug: "what-roof-repairs-cost",
    clusterId: "leaks-repair",
    title: "What Roof Repairs Cost in the Portland Metro (Honest Ranges)",
    description:
      "Roof repairs run from a few hundred dollars to several thousand. What moves the number, what should be included, and how to read a repair estimate.",
    shortTitle: "What repairs cost",
    intro: [
      "Roof repairs in the Portland metro run from a few hundred dollars for small, simple fixes to several thousand when decking or large areas are involved. Anyone quoting your roof a price without seeing it is guessing; what we can do honestly is show you what moves the number, so estimates make sense when you get them.",
    ],
    sections: [
      {
        heading: "The low end: small fixes, easy access",
        paragraphs: [
          "The few-hundred-dollar repairs share a profile: one problem, in one spot, on a walkable roof. Think a pipe boot replacement, a handful of wind-damaged shingles, resealing one flashing detail, or a minor valley fix caught early.",
          "Notice the phrase 'caught early.' Almost everything on the low end is a former watch-list item somebody actually watched.",
        ],
      },
      {
        heading: "The middle: bigger areas, more layers",
        paragraphs: [
          "Repairs climb into the four figures when more of the system is involved: replacing flashing around a chimney properly, rebuilding a valley, addressing a leak that's been running long enough to involve the underlayment, or matching repairs across a larger section of shingles.",
          "Steep pitches and two-story access add labor everywhere on this list. The roof's height and angle are price factors before the first shingle moves.",
        ],
      },
      {
        heading: "The high end: when water got a head start",
        paragraphs: [
          "Several-thousand-dollar repairs almost always mean the water won for a while: rotted decking that has to come out, structural members that need attention, or damage spread across multiple roof planes. The repair itself isn't what's expensive; the time the leak ran unaddressed is.",
          "This is also the territory where the repair-or-replace math gets real. If a major repair is going onto a roof with five years left, we'll show you both numbers and let you decide with full information. ([Replacement runs $8,000 to $25,000+ in our area.](/services/roof-replacement))",
        ],
      },
      {
        heading: "What a real estimate includes",
        paragraphs: ["However the number lands, you should expect:"],
        bullets: [
          "A written scope: what's being replaced, not just 'fix leak'",
          "Photos of the actual problem (if your estimator didn't take any, how do they know?)",
          "What happens if hidden damage turns up, in writing, before it turns up",
          "Whether it's a repair or a patch, stated plainly ([the difference matters](/guides/roof-patch-vs-repair))",
          "License and bond info. Ours is CCB #203933, and you can verify any Oregon contractor's at the CCB site.",
        ],
      },
      {
        heading: "Making the number smaller (legitimately)",
        paragraphs: [
          "The honest cost savers: catch problems early (the entire gap between the low end and high end above), bundle small fixes into one visit, and keep the roof maintained so problems stay small. For bigger repairs, [financing through Enhancify](/financing) spreads the cost, with 0% options available.",
          "Step one is always the same and always free: a [no-cost assessment](/services/roof-repair) with photos and a written estimate. And if you're still in diagnosis mode, [the Roof Leak Guide](/guides/roof-leak-guide) is where to start.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do repair quotes vary so much between contractors?",
        answer:
          "Usually because they're quoting different work: one is pricing a patch, another a proper rebuild of the failed assembly. Compare scopes, not just totals. The cheap quote that skips the flashing rebuild isn't cheaper; it's incomplete.",
      },
      {
        question: "Do you charge a service or trip fee?",
        answer:
          "No. Assessments are free, including the photos and the written estimate. You pay for work you approve, not for us showing up.",
      },
      {
        question: "Can repairs be financed?",
        answer:
          "Yes. For larger repairs we offer financing through Enhancify, including 0% options. It's the same program our replacement customers use.",
      },
      {
        question: "Is it cheaper to wait and bundle repairs with a future replacement?",
        answer:
          "Only if the wait is short and the leak is controlled. An active leak 'waiting for the replacement' is quietly adding decking damage to the replacement bill. We'll tell you honestly which situation yours is.",
      },
    ],
    ogPhoto: "/images/brian-tear-off-thumbs-up.jpg",
    cta: REPAIR_CTA,
    datePublished: "2026-06-06",
  },
];
