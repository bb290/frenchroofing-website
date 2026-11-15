---
name: fr-weekly-kewl
description: The weekly French Roofing Kewl run. Pulls new job photos from Housecall Pro and Sean's Google Drive intake, sorts them, promotes up to 4 into finished posts, reviews every caption, and sends them to the Unbound Dashboard as ready for Brittany to approve (approving there schedules them in Metricool). Runs unattended every Wednesday (launchd → scripts/weekly-kewl.sh) and on demand via "/fr-weekly-kewl", "run the weekly Kewl", or "do the Wednesday social run".
---

# FR Weekly Kewl — Housecall Pro photos → posts ready in the Unbound Dashboard

Standing operator authorization (Brittany, 2026-09-17; changed 2026-11-11): run this full sequence every
Wednesday and leave the results **ready for review in the Unbound Dashboard**. Brittany approves there,
and approving is what schedules the post in Metricool. That approval is the human gate. This skill never
creates, schedules or approves a Metricool post (no `createScheduledPost`, no `updateScheduledPost`).

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

Then pull Sean's Google Drive uploads (added 2026-11-10):
```
npm run drive:intake
```
New files from the Drive folder `Unbound24 - Kewl / French Roofing - Pic / Video Upload / 1. Intake` land in
`1.intake` as `drive_<date>_UNKNOWN_<name>`, each with a note saying there's no job, city or work type: sort them like
any hand drop (describe only what's visible, name no city). Clips from its `Talking head` subfolder go to
`assets/video/talking-head/` instead and never enter the sort: list each one in the report under **Needs
Brittany** as "talking-head clip received, ready for this week's reel" (the reel is made with `fr-reel`, storyboard
first, never in this unattended run). If the Drive pull fails, note it in the report and carry on with the Housecall
Pro photos.

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
- **personal-brand**: Sean as the focal subject: on the job, off the clock, with his daughters
  or family. **Only when a human labeled the photo as Sean** (a Drive file in the `1. Intake / Sean`
  subfolder or with "sean" in its name, a hand drop whose note names him, or an earlier note
  that says so). Never identify Sean, or any crew member, from his face: Sean and the crew look
  alike in photos and this has been wrong before (2026-11-11: Sean and his daughter were sorted as
  "a crew member"). An unlabeled photo of a person goes to crew-community with "WHO IS THIS? not
  labeled" in the note and is never promoted until a human says who it is.
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

### 4. Promote (metered: at most 4 per run)
The Kewl standard is 3-4 photo posts a week (Brittany, 2026-11-10). Aim for 4; 3 is fine, and a
thin week can be fewer: never promote a weak photo just to hit the number. Pick up to 4 from `assets/images/2.sorted/<publishable pillar>/`, newly sorted or already queued.
Prefer: a mix of topics, French Roofing's own jobs over inspection photos, priority cities
(Damascus, Clackamas, Happy Valley) when available, nothing that repeats a topic already in the
next two weeks of the Metricool calendar. Leave the rest queued; the queue is the buffer for thin weeks.

**Evergreen educational in the mix (Brittany, 2026-11-13; replaces the Sunday "Evergreen Generate" GitHub
Action, now disabled):** at least 1 of the week's posts comes from `2.sorted/educational/` (a timeless
"what this is / why it matters" post), when that queue has a good photo. In a thin week, when there aren't
enough strong new job photos to reach 3-4, fill the rest from `2.sorted/educational/` before going below 3.
Educational posts count inside the 3-4; they never add a 5th. Same promote command, same dashboard approval.
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
- **Who is in the photo?** Only the note says (a human label), never the face. If the note says
  Sean, the post belongs in personal-brand and follows its voice: Sean talking as himself, "I",
  jokes and real life, per `social/instagram/evergreen/personal-brand/pillar.md` and
  `operations/briefings/sean-2026-05-06/personal-brand.md`. It does not have to tie back to French
  Roofing (no credentials, no "the care I bring to your roof"); only the standard CTA block at the
  end. Never "That's Sean" or "the owner" (Brittany, 2026-11-11). If the note doesn't say who a
  person is, or says "confirm who this is", hold the post; never fill in "a crew member".
- **Hold instead of fixing** when the premise of the post is unsupported (wrong identification,
  invented story the post depends on). Set every platform `status` to `held` in `schedule.json`,
  append `HELD <date>: <reason and what Sean needs to answer>` to its `notes`, and do not upload it.

### 6. Mark ready and send to the Unbound Dashboard
Brand **French Roofing, blogId 6211784, timezone America/Los_Angeles**. Verify with
`getBrandSettings`; if the timezone or channels differ, stop and report.

Slots: Tuesday, Thursday, Saturday, Sunday (Sunday added 2026-11-10 for the 4th post; Monday and
Wednesday are review-post days). A day is taken if Metricool already has a French Roofing post on it
(`getScheduledPosts` for the next 8 weeks; drafts count) **or** any local post's `schedule.json` has a
platform there with `status: "ready"` (waiting in the dashboard). Give each new post the earliest open
Tue/Thu/Sat/Sun. Never stack two posts on one day. Times (Pacific):

| Platform | Time |
|---|---|
| gmb | 07:12 |
| linkedin | 08:23 |
| facebook | 09:37 |
| instagram | Tue 19:07, Thu 14:09, Sat 13:07, Sun 13:07 |

In each new post's `schedule.json`, set every platform to
`{"status": "ready", "scheduled_for": "<YYYY-MM-DD>T<HH:MM>:00", "timezone": "America/Los_Angeles"}`
and leave `metricool_id` empty. `image_url` must be the Vercel Blob URL from promote; if it is null,
hold the post (the dashboard can't schedule a post with no image).

**Do not call `createScheduledPost`.** Then sync the dashboard for French Roofing only, exactly as
`../../tools/unbound-hq/sync/README.md` says (export `actions` and `posts` to
`operations/kewl-runs/dashboard`, `reconcile.mjs --client french-roofing --apply`,
`kewl-sync.mjs --client french-roofing`, one `ArtifactData batch` per `writes-<n>.json`, `--commit <n>`).
**Unattended Wednesday run:** stop after `kewl-sync.mjs` and don't send: the run can't approve database writes, so
`scripts/weekly-kewl.sh` sends the batches right after (`tools/unbound-hq/sync/send-batches.sh`) and appends the result to
the report. Run interactively, send them yourself as above.
Dashboard url: https://claude.ai/artifact/RrmtYqjjbyXxfGiKZjxSyp. If a dashboard step fails, the posts
stay `ready` on disk: say so in the report and stop there. Never fall back to Metricool drafts.

Reconcile writes Brittany's dashboard approvals and caption edits back into the post folders
(`schedule.json` status `scheduled` with the Metricool id, edited `caption-*.md`, `dashboard-status.json`).
Treat those files as hers: never revert them.

### 7. Report and commit
Write `operations/kewl-runs/<date>-report.md`: photos pulled, sort counts, what was promoted and
for which dates, how many posts are now waiting in the dashboard and what reconcile wrote back, every caption change and why, anything held and the exact question for Sean,
WARNs you judged acceptable (so Brittany can disagree), queue depth remaining, and any error.
Then commit the new post folders and any skill or script fixes, as two separate plain commands
run from the repo root (the run already starts there): `git add <paths>`, then
`git commit -m "<message>" -- <paths>`. Never `git -C`, never `cd ... &&`, never chain commands:
the unattended run only allows commands that start with `git add` / `git commit`, so anything
else is blocked (2026-11-11 run lost its commit that way). Other people's uncommitted work sits
in this repo, so name every path; never `git add -A` or `git commit -a`.
**Never push and never run `npm run deploy`**; pushing triggers a site deploy.

## Hard rules (all of these have bitten before)

- Nothing in this skill creates, schedules or publishes a Metricool post. Posts wait in the Unbound
  Dashboard; only Brittany's approval there schedules them.
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
