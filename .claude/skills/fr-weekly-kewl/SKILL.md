---
name: fr-weekly-kewl
description: The weekly French Roofing Kewl run. Pulls new job photos from Housecall Pro and Sean's Google Drive intake, sorts them, promotes up to 4 into finished posts, turns new Google reviews into review posts, drafts /past-projects pages from closed-out jobs, reviews every caption, and sends them to the Unbound Dashboard as ready for Brittany to approve (approving there schedules them in Metricool). Runs unattended every Wednesday (launchd → scripts/weekly-kewl.sh) and on demand via "/fr-weekly-kewl", "run the weekly Kewl", or "do the Wednesday social run".
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

### 5b. New Google reviews → review posts (added 2026-11-18)
The wrapper pulls Google reviews into `src/data/google-reviews.json` before this run starts (and deploys
/reviews after it; nothing for you to do there). Turn each new review into its four review posts:
```
npm run review:posts -- --plan
```
It makes `social/reviews/posts/<slug>/posts.json` for every written 4-5 star review not handled yet, with dates
(Mon/Wed review days, about 13 weeks apart), looks (rotating A note / B card / C poster / D kraft) and a photo
already chosen. Lower-star and stars-only reviews are skipped and recorded; never make posts from them. For each new
folder, fill in every post:
- `image.quote`: words taken **word for word** from the review (fix nothing, not even a typo; you may start or stop
  mid-sentence). B card can take the whole review. Keep A and D short (one sentence works best).
  C poster also needs `image.headline`: a short phrase from the review, word for word, 3 to 6 words.
- The four captions, matching the existing review posts exactly in format (read one, e.g.
  `social/reviews/posts/leslie-g/posts.json`): Instagram ends with the "Visit website for Instant Roof Quote / Link in Bio"
  block, Facebook with "Get an Instant Roof Quote at frenchroofing.com", LinkedIn quotes the review then adds the
  licensed/insured/CertainTeed line and "Schedule a free roof assessment at frenchroofing.com", GBP opens with the
  service "in the Damascus area", quotes the review with the reviewer's shown name, thanks them by first name and ends
  with the FREE roof assessment / Instant Roof Quote line. Thank the reviewer by first name. Never add facts the
  review doesn't give (no job type, city or timeline unless the review says it).
```
npm run review:posts -- --render <slug>
npm run review:posts -- --check <slug>
```
`--render` fails if a quote is too long for its look: pick a shorter quote and render again. `--check` must say clean
(quotes word for word, no dashes, no phone, no banned words). Open the 4 PNGs and look at them before moving on. If a
review can't be done cleanly, leave the folder, write why in the report, and carry on.

### 5c. Closed-out jobs → past-project page drafts (added 2026-11-18)
```
npm run projects -- --plan
```
Picks up to 4 closed-out Oregon jobs with 3+ Housecall Pro photos (not $0 follow-up visits) and writes, per job,
`operations/hcp-data/projects/<job#>/` with `facts.json`, `sheet.jpg` (numbered contact sheet) and `raw/NN.jpg`.
For each job:
1. Read `facts.json` and `sheet.jpg`, then open every photo you might use at full size. Same rules as the sort:
   describe only what is visible plus the job record; no causes, history, prices or timelines that aren't there.
2. Leave out: supplier tickets and paperwork (they carry Sean's home address), house numbers, faces, people without
   fall protection or shirts on a roof, readable plates, home fronts that identify the house, and anything you can't
   identify.
3. Write `operations/hcp-data/projects/<job#>/draft.json`:
   `{service, title, material?, roofType?, summary, scope[], body?[], faqs?[], photos:[{file, alt, caption?, stage?}]}`.
   - `title`: "<Service> in <City>, OR" (always the city, Portland included; Brittany, 2026-11-18). Never "Portland metro".
   - `summary`: 30 to 80 words, answer-first: what was done, where (city), when (month + year), the result.
   - `scope`: 2+ plain bullets of what was done, each traceable to the record or a photo.
   - `photos`: 3+, the best first. Leave `stage` off unless you have a genuine pair: one `before` and one `after` of
     the same spot from about the same angle (the page turns that pair into a drag slider, which claims it's the same
     spot). Two photos of different parts of the roof are never a pair (2026-11-18).
     Alt text says what's in the photo and the city.
   - `faqs` (optional): only questions this job actually answers.
   - Never a customer name, street, house number or job number (the build refuses them).
4. `npm run projects -- --build <job#>` writes the DRAFT page (`src/data/projects/<slug>.json`, images in
   `public/images/projects/<slug>/`). Drafts are hidden on frenchroofing.com; the wrapper pushes a preview and puts an
   approval to-do on the dashboard. **Never run `--publish` and never set `"status": "published"`**: only Brittany
   approves a page.
**Hold instead of drafting** when what the job was can't be told from the record and photos (e.g. a repair with
open questions for Sean): don't write `draft.json`, put the exact question in the report. Fewer, true pages beat more.

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
Also: new reviews and the review posts made (dates, quotes used) or skipped and why; project pages drafted (title,
photos used, photos left out and why) and jobs held with the exact question.
Then commit the new post folders, any new `social/reviews/posts/<slug>/` folders plus `social/reviews/handled.json`,
any new `src/data/projects/<slug>.json` and `public/images/projects/<slug>/` (drafts), and any skill or script fixes, as two separate plain commands
run from the repo root (the run already starts there): `git add <paths>`, then
`git commit -m "<message>" -- <paths>`. Never `git -C`, never `cd ... &&`, never chain commands:
the unattended run only allows commands that start with `git add` / `git commit`, so anything
else is blocked (2026-11-11 run lost its commit that way). Other people's uncommitted work sits
in this repo, so name every path; never `git add -A` or `git commit -a`.
**Never push and never run `npm run deploy`**; pushing triggers a site deploy. (The wrapper deploys the review file
and pushes the drafts preview after you finish; that's its job, not yours. Never commit `src/data/google-reviews.json`.)

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
- Never write to Housecall Pro. Nothing in this run can (the close-out's Archived move is a separate, reviewed skill).
- If any step errors in a way this skill does not cover, stop, write the report, and leave the
  remaining work for a human. Do not improvise around a failure.
