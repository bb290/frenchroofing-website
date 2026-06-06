---
client: french-roofing
platform: instagram
pillar: educational
type: exemplar
canonical_caption_source: "Claude draft, 2026-05-14, awaiting Brittany/Sean approval"
last-updated: 2026-05-14
spec-version: 2.1
---

# Educational, Pilot Exemplar

> Pillar voice sample, Claude-drafted from `pillar.md` rules. No first published post yet, this exemplar is the template until the first real post ships and replaces it.
>
> When `/evergreen-generate` produces an Educational post, treat the caption sample below as the canonical voice reference and match its rhythm, sentence shape, and information density.
>
> **Important:** the sample below uses **1st-person plural** voice (the safer default per `pillar.md`). When the first 1st-person-Sean educational post is approved, add a second canonical sample for the Sean variant. Do not infer Sean's voice from this sample.

## What this exemplar locks in

### Folder shape (per post)

```
posts/<YYYY-MM-DD-slug>/
├── caption.md      ← caption + frontmatter
├── overlay.txt     ← short text (currently unused in render, kept for future)
├── schedule.json   ← scheduling + status
└── og.png          ← rendered visual (1080x1350)
```

Plus the photo lives at `pillar/photos/<slug>.jpg` and a routing copy at `public/images/<slug>.jpg`.

### Caption shape (Educational specifics)

- **Word count target:** 80, 130. Tighter than Personal Brand's range cap because Educational posts earn their length through information, not through narrative arc. If a draft is closer to 130 it should be teaching multiple connected things, not one thing slowly.
- **Voice person:** per `pillar.md` perspective rule.
  - **1st-person plural by default** ("We see this a lot in Clackamas..." / "When we open a roof, the first thing we check is...")
  - **1st-person Sean** only when the post's photo or moment is unmistakably Sean teaching from a specific job
  - When in doubt, default to 1st-person plural
- **Tone:** the brand voice from BRAND.md §4 (down to earth, neighborly, light hearted) shifted toward **warm and patient** for technical content, per BRAND.md §4 tone rules.
- **Structure:** hook, one specific detail, useful takeaway. The post earns the homeowner's attention with the hook, proves it knows what it's talking about with the detail (a number, a year, a city, a material spec — never adjectives), and lands on something the homeowner can actually do.
- **Hook patterns to lean on** (from `pillar.md`):
  - Specific moment as teaching opportunity, "Pulled apart a roof in Damascus this morning and found something worth talking about."
  - Question the homeowner won't ask out loud, "Wondering if your roof can wait one more winter?"
  - Myth to bust, "Most folks think a leak shows up where the water lands. Usually it traveled twenty feet first."
  - Seasonal heads-up, "Heads up if you've got moss starting on your north slope, here's what to do before the rain hits."
  - Material/spec note, "Heard about CertainTeed's warranty? Here's what it actually covers."
  - Honest diagnostic, "You don't always need a new roof. Here's how we tell."
- **Closer:** a single useful takeaway the homeowner can act on without calling. Not a sales pitch. The post should be useful even if the reader never picks up the phone.
- **Voice rules** (from BRAND.md §4):
  - No em dashes (use commas, periods, parentheses, semicolons)
  - Contractions over formal verbs
  - Ampersands fine when the rhythm calls for one
  - No banned words (premier, industry-leading, world-class, amazing team, etc.)
  - Tagline "Got You Covered!" rationed (1 in 6 max, default off)
  - No hashtags on Instagram captions

### CTA shape (from BRAND.md §10 social CTA)

```
-
Visit website for Instant Roof Quote
Link in Bio
-
```

The dashes (`-`) bracket the CTA block. Verbatim, no rewording. No hashtags follow.

### Visual (rendered to og.png)

Same recipe as Crew & Community and Personal Brand for v1. Educational is the **highest-value pillar for the v2 graphic upgrade** because educational posts benefit most from text overlays — but until the v2 Canva pipeline (see `KEWL.md` v2) ships, the OG endpoint does not render overlay text. Keep `overlay.txt` populated anyway.

- **Canvas:** 1080x1350 (Instagram portrait)
- **Photo:** full-bleed, `object-fit: cover`. Pre-rotate in asset file (Satori ignores EXIF orientation; use `scripts/normalize-photos.sh`).
- **Gradient:** medium strength, base color `grey` (`#3e3d3b`), bottom 50% of canvas
- **Logo:** `/images/logo.png`, 240x137px, positioned `bottom: 60, left: 60`. Sits on the gradient.
- **No text overlay** in v1.

OG params for `/api/og`:
```
photo=<photo public path>
gradientColor=grey
gradient=medium
```

### Overlay text (kept for v2, not rendered in v1)

Pull the lesson down to a single line of 6, 8 words. Keep `overlay.txt` populated on every Educational post even though v1 ignores it. The v2 graphic upgrade is expected to re-introduce overlay rendering and Educational is the pillar that benefits most.

Examples (from `pillar.md`):
- "What's actually under your shingles"
- "Most leaks travel before they show"
- "Moss roots, not just moss"
- "Why we double-up the ice & water"
- "Wind damage you can't see from the ground"

### Photo expectations

- **Close-up of the thing being taught** — a shingle edge, a flashing detail, an attic vent, moss on a slope
- **Material in context** — a shingle on the deck, underlayment partly installed, a vent boot mid-set
- **Damage examples** — wind-lifted tabs, popped nails, hairline cracks, blocked gutters, moss roots
- **Sean teaching** — Sean at a job site pointing at something, holding a sample, talking to camera (extracted from quarterly video shoots)
- **Natural light, real PNW conditions** — wet roof, foggy morning, rare blue-sky October

Disqualifiers per `pillar.md`: stock or AI-generated, visible house numbers / license plates / full addresses, too far back to actually show the detail being taught, accidental cross-promo of competitor product, photo of a problem that could read as a callout of another contractor.

### Posting policy

First names of crew and customers may appear without separate sign-off (current brand policy, set 2026-05-06). Privacy basics still apply: no street numbers, license plates, or full addresses in photos.

## Canonical caption sample (the voice reference)

This is a Claude-drafted sample matching all `pillar.md` rules. Match this voice when generating future Educational posts in the **1st-person plural** variant. Replace this once Brittany/Sean approve the first real Educational post.

**Topic:** diagnostic
**Voice person:** 1st-person plural

```
Most folks think a leak shows up where the water lands. Usually it traveled twenty feet first.

Water hits a tiny gap in the flashing, runs along a rafter, soaks insulation, and finally drips into the bedroom on the other side of the house. By the time you see the stain, the source could be at the chimney, a vent boot, or a worn-out valley seam.

That's why we don't just patch the ceiling. We look uphill from the wet spot and trace the path back. Sometimes it's the obvious thing. Sometimes it's a roof detail nobody's looked at in fifteen years.

If you've got a stain showing up after a hard rain, snap a photo before it dries. The shape and direction often point us to the source faster than the drip itself.

-
Visit website for Instant Roof Quote
Link in Bio
-
```

125 words. Diagnostic topic.

**Why this works (for the model to study):**
- Hook is a "myth to bust" pattern, opens with a claim that contradicts intuition
- Specific details earn credibility without adjectives ("twenty feet," "fifteen years," "vent boot," "valley seam") instead of "a long way" or "old"
- Voice is 1st-person plural throughout ("we don't just patch," "we look uphill"), matches default per `pillar.md`
- Tone shifts warm and patient on the technical body paragraph (the "water hits a tiny gap..." sentence) per BRAND.md §4 tone rule for explanations
- Closing line ("snap a photo before it dries") is a useful takeaway the homeowner can act on without ever calling French Roofing
- No em dashes, no banned words, no hashtags, contractions throughout
- CTA wrapped in dashes, verbatim from BRAND.md §10

## Approval

| Date | Reviewer | Action |
|---|---|---|
| 2026-05-14 | Claude draft | Pilot voice sample drafted from `pillar.md`. Awaiting Brittany / Sean review. Replace this once the first real Educational post is published. |

## Related

- `pillar.md` (this folder), pillar definition + person/perspective rule + photo flow
- `.claude/BRAND.md`, voice + CTA + punctuation rules (source of truth)
- `social/instagram/pillars.md`, mix percentages and system-wide brand voice rules
- `social/instagram/evergreen/personal-brand/POST-EXEMPLAR.md`, sister-pillar reference (1st-person Sean voice sample)
- `social/instagram/evergreen/crew-community/POST-EXEMPLAR.md`, sister-pillar reference (first-published-post pattern)
