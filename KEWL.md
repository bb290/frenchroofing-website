# Kewl — French Roofing Social Media System

**Status:** v1 in progress (8-week timeline)
**Last updated:** 2026-06-09

## What Kewl is

Kewl is the social media content creation and scheduling system being built specifically for French Roofing. Custom-built, not licensed SaaS. Designed around French Roofing's specific workflow so cost stays low and the system fits the way the work actually happens.

## Objective

Minimize time and money spent creating social media posts without sacrificing quality or consistency.

## How Kewl saves time

The bottleneck for any roofing company doing social media is photos and consistency. Kewl solves both with a single-drop intake, a weekly human sort, and a one-command promote that turns sorted photos into finished, scheduled posts.

### The flow

```
[Anyone] → Drop photos / videos (.jpg, .heic, .mov) into assets/images/1.intake
         ↓
[Weekly Claude Cowork session]  (human judgment, not automated code)
  • View each file (convert .heic, pull frames from .mov to see content)
  • Decide which pillar the photo fits
  • Rename: [pillar]_[YYYY-MM-DD]_[short-description]_[seq].[ext]
  • Add a short context note (optional sidecar <stem>.txt)
  • Move into assets/images/2.sorted/<pillar>      (1.intake ends empty)
         ↓
[promote]  scripts/promote-photo.ts, per photo from 2.sorted/<pillar>:
  • Make post-ready (heic→jpg, EXIF-normalize)
  • Bake logo + grey gradient → og.png
  • Write 4 platform captions (Claude; reads BRAND.md, platforms.md, pillar, context note)
  • Assemble the finished post folder under social/.../<pillar>/posts/<slug>/
  • Move the original to assets/images/3.moved-to-social/   (last action)
         ↓
[SMM] Review the draft posts in Metricool, tweak, approve
         ↓
Post lives in Metricool with date / time / platform set; auto-publishes when scheduled
```

### Folder structure

```
assets/images/
├── 1.intake/                 ← single drop zone (anyone). Emptied each sort.
├── 2.sorted/                 ← the "not yet posted" queue
│   ├── personal-brand/
│   ├── crew-community/
│   ├── educational/
│   ├── before-after/
│   └── misc/                 ← doesn't fit the four pillars; not promotable
└── 3.moved-to-social/        ← archive of every original that promote has processed

social/instagram/evergreen/<pillar>/posts/<YYYY-MM-DD-stem>/
├── og.png                    ← baked image (photo + grey gradient + logo)
├── caption-instagram.md      ← + caption-facebook / -linkedin / -gmb variants
├── caption.md                ← mirrors Instagram (backwards-compat)
└── schedule.json             ← per-platform draft status + scheduled time
```

**Naming convention** (applied during the sort, preserved through promote and into the archive):
`[pillar]_[YYYY-MM-DD]_[short-description]_[seq].[ext]`
e.g. `crew-community_2026-06-09_team-tearoff-ranch-home_001.jpg`

### Human touchpoints

Two, and only two:

1. **Weekly intake-and-sort (Claude Cowork).** A human-run session reads everything in `1.intake`, looks at each file, decides the pillar, renames it, adds context, and moves it into `2.sorted/<pillar>`. This is judgment work; pillar routing depends on what is actually in the photo, so it is **not** automated and **not** a cron job.
2. **Draft review (Metricool).** Check the generated captions + image, tweak, approve.

Everything between the sort and the review is the `promote` step. **Code's role begins at `2.sorted`, never before it.**

**Today vs the target.** The sort and the `promote` command both exist now: you run `promote` on the sorted photos and review the resulting drafts. Two pieces are still planned (see Versions): a metered-queue cron that runs `promote` on a cadence so you only feed the queue, and the Metricool API push so drafts land in Metricool automatically instead of by manual upload.

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
- Educational pillar — active, exemplar locked, posts shipped
- OG image endpoint (`/api/og`) — photo + grey gradient + logo bottom-left, no text
- Per-platform caption variants — Instagram / Facebook / LinkedIn / GMB, generated in one Claude call
- Intake + sort workflow — single `assets/images/1.intake` drop, weekly Claude Cowork sort into `2.sorted/<pillar>` (manual, by design), `[pillar]_[date]_[desc]_[seq]` naming
- Consolidated `promote` (`scripts/promote-photo.ts`) — per photo from the queue: make post-ready, bake logo + gradient, write the 4 captions, assemble the finished post folder, archive the original to `3.moved-to-social/`
- Caption generator script (`scripts/evergreen-generate.ts`) — earlier pool-based auto-pick path; still present, used by the weekly cron
- Photo normalization tool (`scripts/normalize-photos.sh`) — bakes EXIF rotation
- GitHub Actions cron (`.github/workflows/evergreen-instagram.yml`) — weekly cron + manual dispatch, opens PR for review

**Still to build for v1:**
- Metricool API integration — drafts are still uploaded manually; this is the gating piece for "sort, then only look again in Metricool"
- Metered-queue cadence — a cron that runs `promote` on a few queued photos per week (about 3) so the queue self-paces instead of running `promote` by hand
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

## Architecture decisions

**Resolved (2026-06-09):**

1. **Upload mechanism** → a single local drop folder, `assets/images/1.intake`. Anyone drops files there; no hosted form, no auth layer.
2. **Image labeling** → the pillar is the destination folder under `2.sorted/`; the rest of the label is the filename convention `[pillar]_[YYYY-MM-DD]_[short-description]_[seq].[ext]`, plus an optional context note (`<stem>.txt`) the captioner reads. No separate metadata store.
3. **Per-platform caption variants** → genuinely different per platform, produced in one Claude call: Instagram (canonical), Facebook (URL CTA), LinkedIn (business register + proof points), GMB (city front-loaded, phone CTA). Rules live in `platforms.md`.
5. **Queue storage** → the queue is just the `2.sorted/<pillar>` folders. `promote` consumes from there and moves the original to `3.moved-to-social/`. No database or manifest.

**Still open:**

4. **Metricool API integration.** Auth method, draft scheduling format, error handling. Needs a small spike against the live API before committing to the integration shape. Until then, drafts are uploaded to Metricool manually.
6. **Metered cadence.** Target: a cron that runs `promote` on a few queued photos per week (about 3) so the queue self-paces. Depends on (4) so drafts land in Metricool automatically.

## Glossary

- **Kewl** — the system being built. Named, French Roofing-specific.
- **SMM** — social media manager (currently Brittany).
- **1.intake** — `assets/images/1.intake`, the single drop folder for raw photos/videos. Emptied each sort.
- **2.sorted** — `assets/images/2.sorted/<pillar>`, the per-pillar "not yet posted" queue the Cowork sort lands files in.
- **3.moved-to-social** — `assets/images/3.moved-to-social`, the archive of every original `promote` has processed.
- **The sort** — the weekly human-run Claude Cowork session that routes `1.intake` files into `2.sorted/<pillar>` and adds context notes. Judgment work, not code.
- **promote** — `scripts/promote-photo.ts`. Turns one sorted photo into a finished post folder (baked image + 4 captions + schedule) and archives the original.
- **og.png** — the baked post image: photo + grey gradient + logo bottom-left.
- **Context note** — optional `<stem>.txt` sidecar written during the sort, read by the captioner for story context.
- **Pillar / campaign** — a content bucket (Crew & Community, Personal Brand, Educational, Before/After). "Campaign" is the user-facing word; "pillar" is the technical / folder slug.
- **Source files** — the markdown files in the client folder that Kewl reads to maintain quality (BRAND.md, platforms.md, pillar.md, POST-EXEMPLAR.md, crew-bios.md).
- **The pipeline** — intake drop → Cowork sort → promote (post-ready + logo/gradient + captions + post folder + archive) → Metricool draft review → auto-publish.
