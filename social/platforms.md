---
client: french-roofing
last-updated: 2026-05-07
spec-version: 2.1
---

# French Roofing, Per-Platform Rules

> Per-platform caption rules for the four Kewl-supported surfaces. Read by `scripts/evergreen-generate.ts` alongside `BRAND.md` and the active `pillar.md`.
>
> **What lives where:**
> - `BRAND.md` = voice, banned words, NAP, CTAs by surface, hashtag rule, color/font tokens (source of truth for *brand*).
> - `pillars.md` and `<pillar>/pillar.md` = pillar scope, photo flow, voice person rule, word-count target (source of truth for *content type*).
> - `platforms.md` (this file) = per-platform formatting, length, CTA shape, audience register (source of truth for *surface*).
>
> The voice never changes between platforms. Down to earth, neighborly, light hearted everywhere. What changes per platform is **register, length, CTA shape, and audience focus**.

## Common rules (apply to every platform)

- Voice from `BRAND.md` §4. No banned words. No em dashes anywhere. Contractions over formal verbs.
- The hook, story, and core specifics are the same across platforms. Length and CTA shape change.
- The Instagram caption is the **canonical source**. Other platform variants are re-cast for that platform's audience and surface, not re-invented.
- Each platform's CTA matches the surface rule from `BRAND.md` §10.
- Tagline `Got You Covered!` is rationed brand-wide to max 1 in 6 posts (counted across the post folder, not per platform).

---

## Instagram

- **Audience:** Homeowners in the 20-mile Damascus radius. Lifestyle-leaning feed.
- **Length target:** Whatever the active pillar's `pillar.md` specifies (Crew & Community 50–80, Personal Brand 60–120, Educational 80–130).
- **Format:** Conversational paragraphs. Line breaks between thought groups for readability.
- **Hashtags:** **None.** Plain captions only (`BRAND.md` §13).
- **CTA shape:** Social CTA verbatim, wrapped in dashes for visual separation:

  ```
  -
  Visit website for Instant Roof Quote
  Link in Bio
  -
  ```
- **Don't include URLs** in the caption body. Instagram strips clickable links from feed captions; the bio link is the path.

---

## Facebook

- **Audience:** Local community. Wider age range than Instagram, more likely to read longer posts and click links directly.
- **Length target:** Slightly longer than Instagram is fine (add 20–40 words if the moment supports it). Don't pad.
- **Format:** Same conversational paragraphs as Instagram. Line breaks fine.
- **Hashtags:** Optional, max 2–3 if used and only if relevant. Default to none unless a deliberate reason.
- **CTA shape:** Direct link, since Facebook supports clickable URLs in post bodies:

  ```
  Get an Instant Roof Quote at frenchroofing.com
  ```

  Or, if the post is naturally action-oriented, drop the phone CTA in instead:

  ```
  Call us at 971-376-8722 for a FREE roof assessment.
  ```
- **Don't repeat the IG dashes-block format.** It reads stiff on Facebook where direct URLs are normal.

---

## LinkedIn

- **Audience:** Property managers, general contractors, small business owners (`BRAND.md` §3 secondary audiences). More substantive posts perform better here.
- **Length target:** 100–180 words. LinkedIn rewards posts with real substance over short captions.
- **Register shift:** Same voice, slightly more business-owner energy. Sean talking to other small-business owners, not corporate-speak. Lean a touch more into proof points (10+ years, CCB #203933, CertainTeed Certified, family-owned) when they fit naturally.
- **Audience focus:** Workmanship, integrity, accountability. The values that matter to a property manager hiring a roofer.
- **Format:** Paragraphs. Line breaks between paragraphs. No bullet lists unless the post genuinely lists items.
- **Hashtags:** Optional, max 2–3 if used. Examples: `#roofing`, `#PNW`, `#localbusiness`, `#smallbusiness`. Default to none.
- **CTA shape:** Action-oriented with a direct URL:

  ```
  Schedule a free roof assessment at frenchroofing.com
  ```

  Acceptable variants: "Get an Instant Roof Quote at frenchroofing.com" or "Reach out at 971-376-8722."

---

## Google My Business (GMB)

- **Audience:** Local search. People who Googled "roofer near me" or "roof repair Damascus" and landed on the business profile.
- **Length target:** **Short.** Aim 100–250 words; hard limit is 1500 chars but shorter performs better on the GMB Updates surface.
- **Format:** Front-load the city or service. The first sentence does the local-SEO work.
- **Hashtags:** None. GMB doesn't surface them.
- **City/service signal:** Mention at least one priority city (Damascus, Clackamas, Happy Valley) or a covered city from `BRAND.md` §9. Mention the specific service if relevant (roof replacement, roof repair, roof cleaning, roof inspection).
- **CTA shape:** Phone-forward. GMB users are search-stage, ready to call:

  ```
  Call 971-376-8722 to schedule a FREE roof assessment.
  ```

  Or pair phone with URL:

  ```
  Call 971-376-8722 or get an Instant Roof Quote at frenchroofing.com
  ```
- **Skip the long story.** GMB is the wrong surface for a 130-word personal anecdote. The same content from IG should compress to 2–3 short paragraphs that lead with the city + service signal.

---

## Image guidance (current, v1)

All four platforms use the **same `og.png`** rendered at 1080x1350 by `/api/og` for v1. Per-platform image variants (different aspect ratios, GMB-optimized 1200x900, etc.) ship with the v2 graphic design upgrade (`KEWL.md` v2, Claude → Canva candidate approach).

## Tagline budgeting

`Got You Covered!` is rationed across the **post**, not per-platform. If the IG caption uses the tagline, the FB / LinkedIn / GMB variants should not also include it. Count it once for the post, not four times.

## Failure modes to watch

- LinkedIn variant drifting into corporate-speak ("amazing team", "industry-leading service") — banned by BRAND.md, just because LinkedIn is "professional" doesn't mean the brand voice changes.
- GMB variant being a 200-word essay because the IG version was — GMB needs compression, not duplication.
- Facebook variant repeating the IG dashes-block CTA when a direct URL is more natural.
- Tagline appearing in 3 of 4 variants because it appeared in the IG source — count once across the post.
- Hashtags creeping onto Instagram (banned) or onto every platform when "default to none" is the rule.
