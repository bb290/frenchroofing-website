---
name: fr-social-publish
description: Schedule a ready-to-publish French Roofing carousel to Instagram, Facebook, LinkedIn (Sean's personal profile), and Google Business Profile via the Metricool MCP tools. Requires explicit operator approval per run. Use on "/fr-social-publish", "push the carousel to Metricool", or after operator approval of an fr-carousel package.
---

# FR Social Publish — carousel → Metricool

Consumes a `ready-to-publish` folder from `fr-carousel` and schedules all four platforms. **Requires an explicit operator go each run** (FR social is tight autonomy). First proven run: 2026-07-03 (storm playbook, posts 345314575/345314744/345314946/345315025).

## Fixed facts (verify with getBrandSettings each run; flag drift)

- Brand: **French Roofing**, blogId **6211784**, timezone **America/Los_Angeles**
- Channels: Instagram `frenchroofing`, Facebook page, LinkedIn = **Sean's PERSONAL profile** (intentional, per operator 2026-07-03; Metricool can't hold both person + company page), Google Business Profile
- If the brand timezone ever reads anything but America/Los_Angeles, stop and flag it.

## The proven recipe

1. **Host the media on the site** (Metricool needs public URLs, then re-hosts to its own CDN): copy slides into `public/social/<campaign>/` (`ig-NN.png` portrait, `sq-NN.png` square, `gmb.png` landscape), `npm run deploy`, poll until the URLs return 200.
2. **Best times:** `getBestTimeToPostByNetwork` (network "instagram" is a good engagement proxy); pick the day's peak for IG, strong morning slots for LinkedIn/FB/GBP, staggered ≥ 1 hour apart, minute values varied (never :00).
3. **Schedule 4 posts** via `createScheduledPost` (blogId 6211784, ISO date with -07:00/-08:00 offset, `publicationDate.timezone: America/Los_Angeles`, `autoPublish: true`):
   - **instagram:** media = 7 portrait URLs, `instagramData: {"type": "POST"}`, caption from `platforms/instagram/caption.md`
   - **facebook:** media = 7 square URLs, `facebookData: {"type": "POST"}`, caption from `platforms/facebook/caption.md`
   - **linkedin:** media = 7 SQUARE PNG URLs (NOT the local PDF) + `linkedinData: {"documentTitle": "<title>", "publishImagesAsPDF": true, "previewIncluded": true, "type": "post"}` — Metricool builds the PDF document post from the images itself
   - **gmb:** media = [landscape URL], no networkData needed (API sets `gmbData: {"type": "publication"}`), text ≤ 1500 chars, no hashtags, "Learn more: https://www.frenchroofing.com/estimate" in the text (CTA buttons aren't settable via this API)
4. **Verify:** `getScheduledPosts` for the target day — all four present, status PENDING.
5. **Record:** post IDs + times into the carousel's `meta.json` (`status: scheduled`) and the row in `social/CAROUSEL-LOG.md`.

## Guardrails

- Never publish without the operator's explicit go for that specific carousel.
- Text rules ride along from fr-carousel (banned words, no pressure, no street address, city list).
- One carousel per week; don't stack a second onto a day that already has scheduled posts (check getScheduledPosts first).
