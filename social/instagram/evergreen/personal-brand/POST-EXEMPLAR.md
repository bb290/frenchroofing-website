---
client: french-roofing
platform: instagram
pillar: personal-brand
type: exemplar
canonical_caption_source: "Brittany, 2026-05-06 chat"
last-updated: 2026-05-06
spec-version: 2.1
---

# Personal Brand, Pilot Exemplar

> Pillar voice sample, Brittany's hand-drafted "Circa 2014" caption. No first published post yet, this exemplar is the template until the first real post ships and replaces it.
>
> When `/evergreen-generate` produces a Personal Brand post, treat the caption sample below as the canonical voice reference and match its rhythm, sentence shape, and joke pacing.

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

### Caption shape (Personal Brand specifics)

- **Word count target:** 80, 130. Slightly looser than Crew & Community because Personal Brand benefits from setup, complication, payoff structure that needs words to land.
- **Voice person:** **1st-person Sean** always. Open with "Hey, I'm Sean." or drop directly into Sean's voice without preamble. Never write *about* Sean in third person.
- **Tone:** the brand voice from BRAND.md §4 (down to earth, neighborly, light hearted) plus more jokes, more self-deprecating admission, more identity tension between "old roofer" and "business owner".
- **Structure:** setup, complication, payoff. Sean opens with an honest emotion or specific time anchor, walks the reader through a complication that contradicts what he expected, lands on a punchline that reframes the situation.
- **Joke patterns to lean into:**
  - The 9-5 swap, "Never wanted a 9-5, so I traded it for a 5-9."
  - Admin reality, bookkeeping, CRMs, emails, the gap between "I'll just install roofs" and what actually fills the day.
  - Identity tension, "Turns out, I am a computer guy, who happens to have 20 years experience installing roofs."
- **Voice rules** (from BRAND.md §4):
  - No em dashes
  - Contractions over formal verbs
  - Ampersands fine (Sean uses them)
  - No banned words (premier, industry-leading, amazing team, etc.)
  - Tagline "Got You Covered!" rationed (1 in 6 max, default off)

### CTA shape (from BRAND.md §10 social CTA)

```
-
Visit website for Instant Roof Quote
Link in Bio
-
```

The dashes (`-`) bracket the CTA block. Verbatim, no rewording. No hashtags follow.

### Visual (rendered to og.png)

Same recipe as Crew & Community for now. Personal Brand may diverge later (yellow gradient + top-right logo would be a natural differentiator), but until that's designed:

- **Canvas:** 1080x1350
- **Photo:** full-bleed, `object-fit: cover`. Pre-rotate in asset file.
- **Gradient:** medium strength, base color `grey` (`#3e3d3b`), bottom 50% of canvas
- **Logo:** `/images/logo.png`, 240x137px, bottom-left, 60px from edges
- **No text overlay**

OG params for `/api/og`:
```
photo=<photo public path>
gradientColor=grey
gradient=medium
```

### Photo expectations

- Sean alone or as the focal subject
- Sean off the clock counts (with daughters, holding a coffee, in his Birkenstocks)
- Hands or back-of-head if face is unavailable, but face beats partial
- No staged business-owner glamour shots
- Real PNW conditions, natural light

### Posting policy

First names of crew and customers appear in posts without separate sign-off (current brand policy, set 2026-05-06). Sean's family members (daughters, etc.) are an exception — those photos need Sean's explicit go-ahead since Sean is the only one who can speak for them.

## Canonical caption sample (the voice reference)

This is Brittany's hand-drafted example. Match this voice when generating future Personal Brand posts.

```
Circa 2014 - I was so excited to start my own roofing business, I couldn't stand the idea of working a 9 to 5 for someone else & wanted to continue working outside, doing physical work; I'm not a big computer guy.

I soon found out, Running a roofing business and being a roofer aren't the same thing, at all!

About half of each day are spent quoting jobs (on a computer), scheduling the crew (on a computer), and ordering materials (on a computer).  Of course, I still get on a roof when the job calls.

Turns out, I am a computer guy, who happens to have 20 years experience installing roofs.

-
Visit website for Instant Roof Quote
Link in Bio
-
```

**Why this works (for the model to study):**
- Time anchor opener ("Circa 2014") immediately grounds the post
- Honest emotion ("so excited") reads true
- Casual punctuation (`&`, contractions) signals informality
- The setup, complication, payoff structure: excited founder → reality is computer work → identity reframe
- The punchline ("Turns out, I am a computer guy") inverts the opener
- No corporate phrasing, no banned words, no em dashes, no hashtags
- CTA wrapped in dashes for visual separation, verbatim

## Approval

| Date | Reviewer | Action |
|---|---|---|
| 2026-05-06 | bb@sagareus.com | Voice sample preserved as the canonical exemplar. Replace this once the first real Personal Brand post is published. |

## Related

- `pillar.md` (this folder), pillar definition + person rule + photo flow
- `.claude/BRAND.md`, voice + CTA + punctuation rules (source of truth)
- `social/instagram/pillars.md`, mix percentages and system-wide brand voice rules
- `social/crew-bios.md`, Sean's bio row
- `social/instagram/evergreen/crew-community/POST-EXEMPLAR.md`, sister-pillar reference
