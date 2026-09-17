---
name: fr-weekly-kewl
description: The weekly French Roofing Kewl run. Pulls new job photos from Housecall Pro, sorts them, promotes up to 3 into finished posts, reviews every caption, and loads them into Metricool as DRAFTS for Brittany to approve. Runs unattended every Wednesday (launchd → scripts/weekly-kewl.sh) and on demand via "/fr-weekly-kewl", "run the weekly Kewl", or "do the Wednesday social run".
---

# FR Weekly Kewl — Housecall Pro photos → Metricool drafts

Standing operator authorization (Brittany, 2026-09-17): run this full sequence every Wednesday and
load the results into Metricool **as drafts**. Brittany reviews and approves in Metricool. That
review is the human gate. This skill never publishes, never approves, never sets `draft: false`.

The run may be unattended. When something is uncertain, the answer is never "guess and ship". It
is "hold it, write down why, and move on". A week with one good post beats three shaky ones.

## The sequence

Work from `clients/French_Roofing/`. Do file work only through the npm scripts below.

### 1. Pull
```
npm run hcp:photos -- --since 10
```
Ten days covers the week plus slack; the manifest prevents re-downloads. If the pull fails
(key revoked, API down), stop and write the run report. Do not continue on stale intake.

### 2. Look at every photo
```
npm run kewl:sheets
```
Read every `operations/kewl-runs/sheets/sheet-N.jpg` and `index.tsv`. For any photo you would
promote, or any you are unsure about, open the full image in `assets/images/1.intake/` before
deciding. The thumbnail is for triage, not for writing facts. (2026-09-17: a chimney apron was
labeled a "saddle" from a thumbnail and the captioner wrote a confident, wrong post about saddles.)

### 3. Sort
Write `operations/kewl-runs/<YYYY-MM-DD>-decisions.json` (one entry per intake file, format in
`scripts/kewl-sort.ts`), then:
```
npm run kewl:sort -- operations/kewl-runs/<date>-decisions.json --dry-run
npm run kewl:sort -- operations/kewl-runs/<date>-decisions.json
```
Pillar rules live in `social/instagram/pillars.md` and each `evergreen/<pillar>/pillar.md`. In practice:

- **educational**: one clear, teachable thing. Damage, a detail done right, a layer of the roof.
- **crew-community**: people. Crew working (with fall protection visible if they are on a roof), trucks, community.
- **personal-brand**: Sean alone as the subject.
- **before-after**: only a genuine pair of the same spot. Say in both notes that the pairing needs Sean's confirmation. (Pillar is parked for Kewl v2; never promote it.)
- **misc** (not promotable), always with a reason: duplicates and near-duplicates of a better shot, dark or blurry, a customer's house front or anything that identifies the home, views into neighbors' yards, street scenes with readable plates or pedestrians, crew without visible fall protection or shirtless on a roof, anything you cannot identify.
- **discard**: every `PAPERWORK-` file. Supplier tickets show the business street address (Sean's home), which is never published anywhere.

**Writing the `photo` note is the most important step in the whole run.** The captioner never sees
the photo; the note is its only source of facts.
- Describe only what is visible. No causes, no history, no story you cannot see.
- If the cause or context is not in the job data, say so: "Cause not recorded; do not state one."
- If it is French Roofing's completed job (source line says `job`), say so. If the source is an
  `estimate`, the script adds the "inspection, not our work" line; keep your note consistent with it.
- If the vision label from the pull disagrees with what you see, trust your eyes and say nothing
  you are not sure of. Unexplained features (e.g. white marks on shingles) go to misc with
  "ASK SEAN what ..." in the reason.
- One photo per job per topic. Put the rest in misc as duplicates.

### 4. Promote (metered: at most 3 per run)
Pick up to 3 from `assets/images/2.sorted/<publishable pillar>/`, newly sorted or already queued.
Prefer: a mix of topics, French Roofing's own jobs over inspection photos, priority cities
(Damascus, Clackamas, Happy Valley) when available, nothing that repeats a topic already in the
next two weeks of the Metricool calendar. Leave the rest queued; the queue is the buffer for thin weeks.
```
npm run promote -- <path> [<path> ...] --dry-run
npm run promote -- <path> [<path> ...]
```
`.mov` files are skipped by promote (Kewl v3). If the queue has no promotable photos, skip to the report.

### 5. Review every caption (all four platforms, every post)
```
npm run kewl:lint -- social/instagram/evergreen/<pillar>/posts/<new post dirs>
```
- Any **FAIL**: fix the caption file, re-lint until clean.
- Every **WARN**: read it against `context-note.txt` in the post folder. If the note does not
  support it, rewrite the sentence to what the note supports or cut it.
- Then read each caption in full against its `context-note.txt` and the image (`og.png`). Check:
  does every factual sentence trace to the note or to standard roofing knowledge a roofer would
  sign? Is the roofing itself right (2026-09-17 examples: torch-down does not bond "directly to
  the deck", overdriven nails cut the shingle rather than "break the seal strip", a 30-inch
  chimney is not "two feet")? Does an inspection photo ever imply French Roofing did the work?
- Keep edits minimal and in Sean's voice (`.claude/BRAND.md` sec.4). Edit the `caption-*.md`
  files; keep `caption.md` in step with Instagram.
- **Hold instead of fixing** when the premise of the post is unsupported (wrong identification,
  invented story the post depends on). Set every platform `status` to `held` in `schedule.json`,
  append `HELD <date>: <reason and what Sean needs to answer>` to its `notes`, and do not upload it.

### 6. Load into Metricool as drafts
Brand **French Roofing, blogId 6211784, timezone America/Los_Angeles**. Verify with
`getBrandSettings`; if the timezone or channels differ, stop and report.

Slots: Tuesday, Thursday, Saturday. Call `getScheduledPosts` for the next 8 weeks and give each new
post the earliest open Tue/Thu/Sat that has no French Roofing post already on it (drafts count).
Never stack two posts on one day. Times (Pacific):

| Platform | Time |
|---|---|
| gmb | 07:12 |
| linkedin | 08:23 |
| facebook | 09:37 |
| instagram | Tue 19:07, Thu 14:09, Sat 13:07 |

One `createScheduledPost` per platform per post, each with `"draft": true`, `"autoPublish": true`,
`media: [image_url from schedule.json]`, the caption body (text after the `# Caption (...)` line),
`providers: [{"network": <platform>}]`, `publicationDate` with the Pacific timezone, and the
platform's data block (`instagramData {"type":"POST"}`, `facebookData {"type":"POST"}`,
`linkedinData {"type":"post"}`, `gmbData {"type":"publication"}`). Confirm each response shows
`"draft":true`. Record every returned `id`, `scheduled_for`, and `metricool_draft: true` in the
post's `schedule.json`.

Never call `updateScheduledPost` on a post Brittany has touched (approved, edited, or moved).
Re-read with `getScheduledPosts` first; if it differs from what this skill uploaded, leave it alone.

### 7. Report and commit
Write `operations/kewl-runs/<date>-report.md`: photos pulled, sort counts, what was promoted and
for which dates, every caption change and why, anything held and the exact question for Sean,
WARNs you judged acceptable (so Brittany can disagree), queue depth remaining, and any error.
Then commit the new post folders and any skill or script fixes (plain `git commit`, explicit
paths). **Never push and never run `npm run deploy`**; pushing triggers a site deploy.

## Hard rules (all of these have bitten before)

- Drafts only. Nothing in this skill publishes.
- No phone number on any platform, including Google Business posts. No "family-owned". No em
  dashes. No banned words. No hashtags on Instagram; default none elsewhere.
- Never name Portland. Name a city only when the note says it is OK to name.
- Never publish or describe the street address. Discard paperwork photos.
- No customer names, house numbers, or identifiable home fronts.
- Never invent: anecdotes, timing, prices, statistics, lifespans, business claims.
- Never touch other clients' Metricool brands (Sagareus is on the same account, blogId 6504323).
- Never write to Housecall Pro. The API key is read-only; keep it that way.
- If any step errors in a way this skill does not cover, stop, write the report, and leave the
  remaining work for a human. Do not improvise around a failure.
