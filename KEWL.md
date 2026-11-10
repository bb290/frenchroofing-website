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
[Housecall Pro] → `npm run hcp:photos` pulls job + estimate photos into the same folder,
                  pre-labeled <city>_<YYYY-MM-DD>_<context>_<job|est><number>-<seq>, each with a
                  customer-free context note (<stem>.txt). UNKNOWN in a name = label it by hand;
                  PAPERWORK- = a document, discard it
         ↓
[Weekly Claude Cowork session]  (human judgment, not automated code)
  • View each file (convert .heic, pull frames from .mov to see content)
  • Discard paperwork shots from Housecall Pro (delivery tickets, invoices, measurements).
    Supplier tickets show the business street address, which is never published.
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

> **Changed 2026-09-17 (operator decision).** The whole sequence below now runs unattended every
> Wednesday via the `fr-weekly-kewl` skill (`.claude/skills/fr-weekly-kewl/SKILL.md`, fired by
> `scripts/weekly-kewl.sh` from a macOS LaunchAgent). Claude does the pull, the sort, the promote,
> and a caption review, then loads the posts into Metricool **as drafts**. The one remaining human
> touchpoint is touchpoint 2: Brittany reviews and approves in Metricool. The sort is still
> judgment work; the judgment is now written down in the skill, and anything uncertain is held
> with a question for Sean instead of guessed. Touchpoint 1 below describes the original manual
> sort and still applies to anything dropped into `1.intake` by hand between runs (the Wednesday
> run sorts whatever is there).

Originally two, and only two:

1. **Weekly intake-and-sort (Claude Cowork).** A human-run session reads everything in `1.intake`, looks at each file, decides the pillar, renames it, adds context, and moves it into `2.sorted/<pillar>`. This is judgment work; pillar routing depends on what is actually in the photo, so it is **not** automated and **not** a cron job.
2. **Draft review (Metricool).** Check the generated captions + image, tweak, approve.

Everything between the sort and the review is the `promote` step. **Code's judgment begins at `2.sorted`, never before it.** The one piece of code upstream of the sort is `scripts/hcp-photos.ts`, which only delivers Housecall Pro photos into `1.intake`; it makes no pillar or keep/discard decisions.

**Today (2026-11-10).** The Wednesday run promotes up to 4 queued photos (Tue/Thu/Sat/Sun slots; raised from 3 on 2026-11-10 for the 3-4 posts a week standard in `unbound-toolkit/docs/kewl-methodology.md`), and drafts land in Metricool through the MCP connector. The weekly reel: a talking-head clip goes through the Reel Kit; with no clip, a B-roll reel through the toolkit skill `kewl-broll-reel`, both in French Roofing's Reel Kit style (`reel-kit/style/`), storyboard first, then Metricool drafts (`fr-reel`). First B-roll reel: "We protect your lawn", 2026-11-10. Still to do: pull Sean's Google Drive intake (Unbound24 - Kewl / French Roofing - Pic / Video Upload / 1. Intake) as part of the Wednesday run, and automatic review posts (waiting on the Google Business connection).

## Review posts (added 2026-11-04, operator decisions)

A post type built from a real customer review instead of a sorted photo. Not built yet: waiting on
the Google Business Profile connection in Composio. Until then, reviews are pasted in by hand.

- **Source:** Google Business Profile reviews. Housecall Pro's API has no reviews endpoint (checked
  2026-11-04).
- **Every review gets posted.** They are already public; none are skipped.
- **Name and place:** first name + last initial (e.g. "Joseph H.", operator 2026-11-04), even when
  Google shows the full name; a name Google already shortens stays as shown ("Tailor J"). Plus the
  city only if the review gives one. Never a street address. Quotes stay word for word.
- **Photo:** any job photo works; it doesn't have to be that customer's job. Same photo rules as the
  rest of Kewl (no house numbers, plates, faces, or paperwork).
- **No logo, no gradient, no "French Roofing" text on the graphic.** These posts have their own look.
- **1 review = 4 posts, one per look, scheduled 3 months apart** (the first in the next open slot,
  then about +3, +6 and +9 months, each on the nearest open Monday or Wednesday; review posts get
  their own days, separate from the regular Tue/Thu/Sat photo posts) so the repeat isn't obvious
  on the feed. Each of the 4 uses a different photo and, when the review is long enough, a different
  whole-sentence excerpt. All 4 land in Metricool as drafts like every other Kewl post.
- **Mix the order across reviews:** each new review starts one look later than the review before it
  (review 1 starts on A, review 2 on B, review 3 on C, review 4 on D, then back to A), and goes
  through the rest in order. Before scheduling, check the review posts just before and after each
  slot in Metricool: two review posts in a row never share a look, and nearby posts don't reuse the
  same photo.
- **Log:** each review's posts, captions and Metricool draft IDs live in
  `social/reviews/posts/<name-slug>/posts.json`. Reviews 1-16 (all 2026-11-04): Tailor J (A), Joseph H. (B), Dustin S. (C), Jimmy M. (D), Rose W. (A), Jessica G. (B), Boomer G. (C), Trevor T. (D), Paul T. (A), Jenni J. (B), Nathan P. (C), Zac B. (D), DJ W. (A), Devon D. (B), Beeman S. (C), Leslie G. (D). The next review starts on A; next open review slot is Wed Jan 6, 2027.
- **The 4 looks, in rotation order:**
  1. **A. Jobsite note:** lined paper taped over the photo, handwritten (Caveat), orange stars and tape.
  2. **B. Review card:** white card that reads like a screenshot of the review: initial circle, name,
     orange stars, "Google review, Mon YYYY", the full review in Inter.
  3. **C. Surf poster:** deep blue with lighter-blue sun rays, a short line in Shrikhand (yellow),
     photo in an orange-framed arch, orange bar with "<Name>, on Google".
  4. **D. Torn kraft paper:** ripped brown paper over the photo, marker text (Permanent Marker).
- **Design source:** `social/reviews/design/` (the four 1080×1350 `.dc.html` files approved
  2026-11-04; not committed yet). Canvas: https://claude.ai/artifact/EP6nefQcEjDtyG4a1nJe1j

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
- ~~Metricool API integration~~ — done 2026-09-17 via the Metricool MCP connector: the weekly run creates drafts directly (create + read only; it cannot edit or approve)
- ~~Metered-queue cadence~~ — done 2026-09-17: the Wednesday run promotes at most 3 photos and fills the next open Tue/Thu/Sat slots; the rest stay queued
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

1. **Upload mechanism** → a single local drop folder, `assets/images/1.intake`. Anyone drops files there; no hosted form, no auth layer. `npm run hcp:photos` feeds the same folder from Housecall Pro (added 2026-09-17).
2. **Image labeling** → the pillar is the destination folder under `2.sorted/`; the rest of the label is the filename convention `[pillar]_[YYYY-MM-DD]_[short-description]_[seq].[ext]`, plus an optional context note (`<stem>.txt`) the captioner reads. No separate metadata store.
3. **Per-platform caption variants** → genuinely different per platform, produced in one Claude call: Instagram (canonical), Facebook (URL CTA), LinkedIn (business register + proof points), GMB (city front-loaded, phone CTA). Rules live in `platforms.md`.
5. **Queue storage** → the queue is just the `2.sorted/<pillar>` folders. `promote` consumes from there and moves the original to `3.moved-to-social/`. No database or manifest.

**Resolved 2026-09-17:**

4. ~~**Metricool API integration.** Auth method, draft scheduling format, error handling. Needs a small spike against the live API before committing to the integration shape. Until then, drafts are uploaded to Metricool manually.~~ Done via the Metricool MCP connector (create + read only).
6. ~~**Metered cadence.** Target: a cron that runs `promote` on a few queued photos per week (about 3) so the queue self-paces. Depends on (4) so drafts land in Metricool automatically.~~ Done: the Wednesday run promotes at most 3.

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
