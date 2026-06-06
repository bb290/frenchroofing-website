# Kewl — French Roofing Social Media System

**Status:** v1 in progress (8-week timeline)
**Last updated:** 2026-05-07

## What Kewl is

Kewl is the social media content creation and scheduling system being built specifically for French Roofing. Custom-built, not licensed SaaS. Designed around French Roofing's specific workflow so cost stays low and the system fits the way the work actually happens.

## Objective

Minimize time and money spent creating social media posts without sacrificing quality or consistency.

## How Kewl saves time

The bottleneck for any roofing company doing social media is photos and consistency. Kewl solves both with a single-upload, batch-review, auto-generate, pre-scheduled-publish pipeline.

### The flow

```
[Anyone] → Upload photo to single source (file / URL / inbox)
         ↓
Kewl auto-receives, adds to queue
         ↓
[SMM batch 1] Approve image quality + brand adherence
              Sort into campaign (pillar) folder
              Label image with Kewl context
         ↓
Kewl runs on schedule:
  • Process approved images
  • Generate post + platform-specific caption (4 platforms)
  • Send to Metricool via API in draft status
         ↓
[SMM batch 2] Review draft post in Metricool
              Tweak as needed
              Approve
         ↓
Post lives in Metricool scheduler with date / time / platform already set
Auto-publishes when scheduled
```

### Human touchpoints

- **Single-source upload.** Any number of users (crew, Sean, Brittany, customers if they want) can drop photos to one place. No coordination needed.
- **Two batch processes for the social media manager:**
  1. **Image triage** — approve, sort into pillar folder, label.
  2. **Draft review** — check generated caption + image in Metricool, tweak, approve.

Everything between those two steps is automated.

## How Kewl saves money

- **Custom built**, not licensed SaaS. Avoids per-seat fees, vendor lock-in, and the gap between SaaS feature set and the actual workflow.
- **French Roofing-specific.** No generic-platform overhead. Every component serves a known need.
- **Leverages existing infrastructure** where possible (Vercel deployment, Anthropic API, the existing Metricool subscription).

## How Kewl maintains quality

Quality and brand consistency are not afterthoughts. They are the source files Kewl reads on every run:

- `.claude/BRAND.md` — voice, CTA, NAP, banned words, punctuation rules
- `social/instagram/evergreen/<pillar>/pillar.md` — pillar-specific voice + photo rules
- `social/instagram/evergreen/<pillar>/POST-EXEMPLAR.md` — canonical post structure
- `social/crew-bios.md` — named crew references

These files are iterated continuously. As the system runs and Brittany reviews drafts, learnings flow back into the source files. Tomorrow's posts inherit yesterday's edits.

## Versions

### v1 (current, 8-week timeline)

**Scope:** underlying infrastructure + 4 campaign briefs (Personal Brand, Crew & Community, Educational, Before/After), for all 4 platforms (Instagram, Facebook, LinkedIn, Google My Business).

**Done so far:**
- Brand bible (`.claude/BRAND.md`, approved)
- Crew & Community pillar — active, exemplar locked, first post approved (Brian)
- Personal Brand pillar — active, voice sample locked from Sean's "Circa 2014" draft
- OG image endpoint (`/api/og`) — photo + grey gradient + logo bottom-left, no text
- Caption generator script (`scripts/evergreen-generate.ts`) — Anthropic API-driven, reads source files
- Photo normalization tool (`scripts/normalize-photos.sh`) — bakes EXIF rotation
- GitHub Actions cron (`.github/workflows/evergreen-instagram.yml`) — weekly cron + manual dispatch, opens PR for review
- 8 posts shipped (1 approved + 7 drafts)

**Still to build for v1:**
- Educational pillar (briefs + visual recipe + exemplar)
- Single-upload mechanism (file / URL / inbox)
- Image queue + triage workflow
- Metricool API integration
- Per-platform caption variants (currently single caption is cross-posted)
- Workflow continuously developed and improved

**Moved out of v1 (2026-05-07):**
- Before/After pillar — deferred to v2 alongside the graphic design upgrade. Job-folder photo shape (`before-after/photos/<job-slug>/before-N.jpg + after-N.jpg`) is more visually demanding than the other pillars and benefits directly from the v2 graphic redesign. Folder + entry in `pillars.md` remain in place for v2 pickup.

### v2

- Graphic design upgrade — beyond the current photo + gradient + logo template
  - **Candidate approach:** Claude → Canva automation (Nlabs "Claude X Canva Automation Premium Guide", https://docs.google.com/document/d/17ma0sUiGw2NXfBuO9uZY2p3jdgCwlAkulhP4Zc7rQHI/edit). Replace the `/api/og` endpoint with a Canva Connect API autofill against locked brand templates. Canva is already in the stack and Brittany already uses it. Pipeline change is small: same caption + photo inputs, better-looking output. Spike before committing.
- Before/After pillar — bumped from v1 (2026-05-07). Job-folder photo shape is visually demanding and pairs naturally with the graphic design upgrade. Folder structure already in place at `social/instagram/evergreen/before-after/`.
- Bus factor — system redundancy so it survives if Brittany is unavailable

### v3

- Simple video creator — Reels / Shorts / TikTok-adjacent content type

## Open architecture questions for v1

These need decisions soon to keep the 8-week timeline on track:

1. **Single upload mechanism.** Email-to-storage, Dropbox folder, custom Next.js upload form, S3 / Cloudflare R2 with a public link, or something else? Has implications for auth, who can upload, and how the queue gets populated.
2. **Image labeling schema.** What does the SMM tag a photo with during triage? Pillar (educational/crew/before-after/personal)? Subject (person name)? Job ID? Date? Story hook hint? All of the above?
3. **Per-platform caption variants.** Genuinely different captions per platform (LinkedIn = professional, GMB = local-SEO, FB = community, IG = lifestyle), or same caption with platform-tuned formatting (line breaks for IG, longer body for LinkedIn)?
4. **Metricool API integration.** Auth method, draft scheduling format, error handling. Worth a small spike before committing to the full integration shape.
5. **Queue storage.** Each upload becomes — a row in a database, a file in a storage bucket, a record in a manifest? Choice affects how triage works.

## Glossary

- **Kewl** — the system being built. Named, French Roofing-specific.
- **SMM** — social media manager (currently Brittany).
- **Pillar / campaign** — a content bucket (Crew & Community, Personal Brand, Educational, Before/After). "Campaign" is the user-facing word; "pillar" is the technical / folder slug.
- **Source files** — the markdown files in the client folder that Kewl reads to maintain quality (BRAND.md, pillar.md, POST-EXEMPLAR.md, crew-bios.md).
- **The pipeline** — single-upload → triage → auto-generate → Metricool draft → SMM review → auto-publish.
