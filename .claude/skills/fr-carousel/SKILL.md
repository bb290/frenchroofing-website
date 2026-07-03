---
name: fr-carousel
description: Repurpose one French Roofing guide per week into a branded social carousel (slides + per-platform captions), saved locally for review. Preparation only, no publishing. Use on "/fr-carousel", "make a carousel from <guide>", or after a weekly fr-blog batch.
---

# FR Carousel — guide-to-carousel repurposing

Turns one guide into a review-ready carousel package. **Prepares only; never publishes or schedules.** Publishing runs through Metricool in a separate authorized step. Adapted from the Sagareus saga-carousel skill; everything brand-specific is French Roofing's own (cross-brand isolation is absolute).

## Modes

- `/fr-carousel weekly` — pick the broadest-appeal guide from the latest fr-blog batch and build it. **Seasonality check first (operator lesson, 2026-07-03):** the topic must fit the publish month. Storm content belongs in Oct–Mar, moss/cleaning in spring–summer, winterization in fall. If the batch's best guide is out of season, either pick a different guide OR build it and schedule into its season (note the future date in the log); never post storm playbooks in July.
- `/fr-carousel from <guide-slug>` — build from a specific guide in `src/lib/guides/`.

## Pipeline

1. **Read the source guide** (its TS object in `src/lib/guides/`) + `.claude/BRAND.md` voice rules.
2. **Distill `slides.json`**: 7 slides — 1 hook, 5 content, 1 CTA. Every claim from the guide; nothing invented. Hook ≤ 12 words in Sean's voice (plain, a little wry, never clickbait). Content slides: ≤ 8-word header + ≤ 30-word body, one idea each. Banned words list applies. "Got You Covered!" at most 1 in 6 carousels (check `social/CAROUSEL-LOG.md` history before using).
3. **Render all three sizes** (`python3 .claude/skills/fr-carousel/render.py <folder> [--size=square|landscape]`): portrait 1080×1350 (Instagram), square 1080×1080 (Facebook + LinkedIn PDF), landscape 1200×900 (GBP single image, no counter/swipe). Brand: deep blue grounds with yellow accent for hook/CTA, cream/white content slides, Inter, FRENCH ROOFING wordmark, footer `Damascus, OR · frenchroofing.com`. **No phone number anywhere on social creative or captions (operator, 2026-07-03): we drive people to the website, not the phone.**
4. **CTA (standing):** all social CTAs point to **https://frenchroofing.com/estimate** framed as "Schedule a FREE Roof Assessment with French Roofing." No pressure tactics, ever (A7).
5. **Platform package** (`platforms/`): instagram caption (hook, bullets, CTA, 8-12 hashtags: #PortlandRoofing #DamascusOR #ClackamasCounty #HappyValleyOR #RoofRepair #PNWHomes + topic tags), facebook (≤ 3 hashtags), linkedin caption + `carousel.pdf` from square slides (Chrome `--print-to-pdf`, `@page {{ size:1080px 1080px; margin:0 }}`), gmb single paragraph ≤ 1500 chars, no hashtags, `Learn more -> https://frenchroofing.com/estimate`, image = `slides-landscape/01.png`.
6. **Review gate:** re-read against voice + guardrails (banned words, NAP privacy: never the street address, cities inside the locked list only); confirm every PNG > 20 KB and the PDF exists.
7. **Log** in `social/CAROUSEL-LOG.md`, status `ready-to-publish`.

## Output folder

```
social/carousels/<YYYY-MM-DD-slug>/
  slides.json · slides/ · slides-square/ · slides-landscape/
  platforms/{instagram,facebook,linkedin,gmb}/
  meta.json
```

## Hard boundaries

- Never call a publishing API. Preparation ends at the local folder.
- Never invent content beyond the source guide.
- Cross-brand isolation: no Sagareus assets, colors, links, or voice. This is Sean's company.
