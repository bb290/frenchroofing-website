# French Roofing — Claude guide

## Project overview

Marketing site + content factory for French Construction LLC dba French Roofing (Sean French, Damascus OR, CCB #203933). Next.js 16 App Router site at frenchroofing.com (Vercel) plus automated blog/guide generation, social carousels, and photo-to-post pipelines. Done = content passes QUALITY-GATE, builds clean, and follows `.claude/BRAND.md`.

## Source of truth

- Brand, voice, NAP, colors: `.claude/BRAND.md` (quick ref: `.claude/BRAND-quick-reference.md`). This file is NOT a brand source.
- Session rules and approval gates: `.claude/CLAUDE.md` (autonomy: tight).
- Legacy brand bible (company story, segments, keywords, social links, AI workstreams, open items) archived at `.claude/source-material/CLAUDE-legacy-2026-04.md` — reference only.

## Notion hub

French Roofing runs from the Notion page **French Roofing HQ**. Read **"Claude: Read First"** first (rules, Current state, newest session-log entries), then the Dashboard (Current Project and its open Project Tasks, lowest Order first; check for open Claudette rows). At session end, add a session-log entry at the TOP, rewrite Current state if it changed, keep Project Tasks true. Comments start "Update by Claude, per Brittany's request:". (Built 2026-10-22 from the Unbound client hub template; reorganized into French Roofing HQ 2026-11-04.)

**Connect through Composio, French Roofing account only:** `composio proxy https://api.notion.com/v1/... -t notion --account notion_koala-benab` (no alias yet). Before any write, check `users/me` returns `workspace_name: "French Roofing"`. Set stdin to /dev/null when scripting.

**Rules:** one Current Project at a time (now: **Brand Ambassador**; up next: Housecall Pro SOPs v1, parked in the Idea Bank with its planned tasks); everything else in the Idea Bank. Owners: Sean, Brittany, Claudette. No CRM here: Housecall Pro holds customer details, and no customer names, phones, emails, or addresses go in Notion. No passwords or tokens. SOP edits keep Sean's steps exactly.

| Notion object | id |
|---|---|
| French Roofing HQ (top page) | `40ea644c-bd9a-8128-ba7f-cd676949e276` |
| Claude: Read First | `401a644c-bd9a-81c4-912a-f67357c069f8` |
| Dashboard (Current Project, Project Tasks, Idea Bank, Fallback Tasks, Reusable Claude Prompt; Brand Ambassador page under it) | `401a644c-bd9a-8187-b1a8-ce974701c229` |
| Project Tasks db (Task, Order, Type, Owner: Sean/Brittany/Claudette/Jocelyn, Status) | `401a644c-bd9a-81f6-9675-e3f7e9f3b07a` |
| Idea Bank db (Idea, Status, Area: Attract/Convert/Deliver/Retain, Suggested by, Why, Added) | `401a644c-bd9a-81fc-968d-e2af5f8be91f` |
| SOPs (SOP format; Delivery, Attract, Convert, Retain pages) | `401a644c-bd9a-8122-bb61-d56b221afacc` |
| Customer FAQs db (Question, Answer, Email Template, Stage: Attract/Convert/Delivery/Retain multi, Status: Needs Sean/Approved/On website, Topic, Times asked, Email, Texts & calls, What we've told customers, Flag for Sean, Final answer (Sean), Stage (old)) | `401a644c-bd9a-8199-b57e-e03b6c47125f` |
| Tech Stack db (Tool, What it's for, Who uses it, Where the login is kept, Added) | `40ea644c-bd9a-81db-93ea-ec17b82a2739` |
| Skills db (Skill, What it does, File, Runs in, Added) | `40ea644c-bd9a-81be-88d0-c15839d09c60` |
| Brand Guide | `401a644c-bd9a-814e-b387-e3c55a164ecb` |
| Metrics page (Metrics + Readings dbs; Customer Communication Review (2026) under it) | `40ca644c-bd9a-818e-ba20-d6125d378f8f` |

Moving pages: `POST pages/<id>/move` works. Moving a database needs `PATCH databases/<id>` with `{"parent":...}` and the header `Notion-Version: 2025-09-03`.

Customer FAQs is the one place for final answers (seeded 2026-10-22 from the FAQ tab of Google Sheet `1YAFHIafaQ2tsLhfWYbY9eiAU1sQrR-XyT5BlFBDmZbg`, which keeps the review tabs). Questions only, never who asked.

## Commands

- `npm run dev` / `build` / `lint`
- `npm run deploy "msg"` — commits ALL changes (`git add -A`) and pushes `main`; Vercel auto-builds (~20-30s). main branch only; script exits on other branches.
- `npm run ebooks` — regenerate ebook PDFs
- `npm run promote` — photo-to-post pipeline (`scripts/promote-photo.ts`)
- `npm run hcp:check` — Housecall Pro API connection test (prints counts only, no customer data). Client: `scripts/lib/hcp.ts` (reads only, plus one reviewed write: close-out → Archived)
- `npm run closeout -- --list [--since 30]` / `--job <N>` / `--archive <N>` / `--backfill <year>` — Housecall Pro half of the `fr-close-out` skill: lists complete + paid jobs, or writes one job's close-out data (customer, address, dates, job type Replacement/Repair/Maintenance, product, warranty term, lead source, crew, photos) to `operations/hcp-data/closeouts/<N>.json`. `--backfill` dumps every job completed that year to `closeouts/backfill-<year>.json` for the Job Tracker tab (2026 tab backfilled 2026-10-21). `--archive` moves the job to the Archived pipeline stage, the only HCP write in this repo (needs a full-access key)
- `npm run hcp:photos -- [--since 90] [--job <N>] [--dry-run] [--inspect]` — pull Housecall Pro job/estimate photos into `assets/images/1.intake`, named `<city>_<YYYY-MM-DD>_<context>_<job|est><number>-<seq>` with a PII-free context note. Context is a Claude vision label (`scripts/lib/label-photo.ts`, default claude-opus-5, about a cent a photo); `UNKNOWN` means label by hand, `PAPERWORK-` means discard. Feeds the normal Kewl sort, never sorts or publishes itself
- **Weekly Kewl run (Wednesdays 7:17am, unattended; back on 2026-11-13 after the Nov 12 pause; at least 1 of the 3-4 posts is evergreen educational, 2026-11-13):** LaunchAgent `com.unbound.frenchroofing.weekly-kewl` → `scripts/weekly-kewl.sh` → skill `fr-weekly-kewl`. Pull → sort → promote (max 4) → caption review → posts marked ready in the **Unbound Dashboard**; Brittany approves there, and approving schedules them in Metricool (changed 2026-11-11; sync steps in `../../tools/unbound-hq/sync/README.md`). Report + logs: `operations/kewl-runs/` (gitignored). On demand: `/fr-weekly-kewl`. Plumbing check: `scripts/weekly-kewl.sh --smoke`. Off: `launchctl bootout gui/$(id -u)/com.unbound.frenchroofing.weekly-kewl`.
- `npm run kewl:sheets` / `kewl:sort -- <decisions.json>` / `kewl:lint -- <post dirs>` — the sort and review helpers the weekly run uses
- `npm run reviews:sync` — Google reviews → `src/data/google-reviews.json` (DataForSEO). Runs at the start of the Wednesday run; the wrapper deploys /reviews after it (auto-deploy, Brittany 2026-11-18)
- `npm run review:posts -- --plan` / `--render <slug>` / `--check <slug>` — new written 4-5★ reviews → 4 review posts each in the approved looks (`social/reviews/posts/<slug>/`, ledger `social/reviews/handled.json`; 30 older reviews are marked backlog, never posted). Mon/Wed slots ~13 weeks apart; synced to the dashboard like other posts
- `npm run projects -- --plan` / `--build <job#>` / `--todo` / `--publish <slug|all>` — closed-out jobs → /past-projects pages (`src/data/projects/<slug>.json`, images `public/images/projects/<slug>/`). Drafts are hidden on production and shown on the `projects-preview` branch preview (https://french-roofing-git-projects-preview-bb290s-projects.vercel.app/past-projects); `--publish` only after Brittany approves. Work files and the job→page ledger live in `operations/hcp-data/projects/` (gitignored)
- Watch deploys: `npx vercel ls`. Unpushed commits: `git log origin/main..main`.

## Env vars (values in `.env.local`, no template yet)

- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default claude-sonnet-4-6), `BLOB_READ_WRITE_TOKEN`
- `HOUSECALL_PRO_API_KEY` (from HCP App Store → API Key Management; requires MAX plan), optional `HOUSECALL_PRO_AUTH`. The key is full-access (operator, 2026-10-21) so the close-out can move jobs to Archived; the only write is that one reviewed function in `scripts/lib/hcp.ts`. Optional `HOUSECALL_PRO_WRITE_KEY` overrides the key for writes only. API dumps go in `operations/hcp-data/` (gitignored, customer PII)
- GitHub Action `evergreen-instagram.yml` ("Evergreen Generate", Sundays, opened a draft-post PR) is retired: disabled 2026-11-13 (Brittany) and folded into the weekly Kewl run, which now includes evergreen educational posts. It had failed every week since at least 2026-10-18 (empty `ANTHROPIC_API_KEY` repo secret); don't re-enable it.

## Architecture

- `/past-projects` (replaced /gallery 2026-11-18, which 308s there): paginated 12 a page with service filters; one page per job. Loader `src/lib/projects.ts`.
- `src/app` + `src/components`: the site. `operations/seo/`: QUALITY-GATE.md + topic-cluster-map.md drive `/guides` content.
- `.claude/skills/`: fr-blog, fr-carousel, fr-social-publish, fr-weekly-kewl, fr-close-out (job close-out: HCP API → Google Doc warranty, Job Archive in Drive, Kewl intake, Gmail draft from team@frenchexteriors.com, Job Tracker sheet), fr-reel (9:16 reels/Shorts from photos on disk + voiceover via HyperFrames → Metricool drafts for IG/FB Reels, LinkedIn, YouTube Short, GBP; projects in `social/reels/<slug>/`). `skills/` (root, intentional — Sean-facing skills for his claude.ai): fr-email-triage, fr-email-response. The old Cowork close-out is archived at `.claude/source-material/fr-close-out-cowork-2026-06/`. Claude.ai Team setup kit: `operations/claude-ai-setup/`.
- `brand-site/`: the design system page (one static HTML file), deployed as its own Vercel project `french-roofing-brand` at https://french-roofing-brand.vercel.app (noindex). Gitignored, not part of the site repo. Update: replace `index.html`, then `npx vercel deploy --prod --yes` from that folder.
- `roof-measure/`: separate planned SaaS product with its own CLAUDE.md — not part of the site.
- `social/` and `assets/` are local media (gitignored); `public/` IS committed. Logo: `assets/logo/logo.png`.

## Conventions & constraints (full list in `.claude/BRAND.md`)

- No em dashes. Banned-words list applies. Tagline "Got You Covered!" max 1 in 6 posts.
- Never publish the street address (Sean's home; GBP runs in service-area mode). No phone number on social creative/captions (web/GBP keep it for NAP consistency).
- Autonomy tight: human review before posting/deploying, EXCEPT fr-blog `/guides/*` batches that pass QUALITY-GATE clean AND `npm run build` (2026-07-03 exception).
- Housecall Pro = system of record for everything operational (jobs, customers, estimates, photos). JobNimbus retired 2026-07.
- Never mix French Roofing content with any other client.

## Lessons learned

- 2026-10-21: Composio has several Google accounts connected (brittany@frenchexteriors.com, bb@sagareus.com, brittany@unbound24.com) and picks between them inconsistently when no account is named. French Roofing work must pass `--account` (Drive `googledrive_herein-flet`, Gmail `gmail_bend-tucket`, Docs `googledocs_manse-ascend`). Also: HCP jobs' `original_estimate_uuids` are estimate option ids, not estimate ids.

- 2026-09-17: The captioner never sees the photo; the sort note is its only source of facts. A wrong note (chimney apron labeled a "saddle") produced a confident, wrong post, and thin notes produced invented stories, prices, and stats. Open the full image before writing a note, describe only what is visible, and keep `context-note.txt` with the post so captions can be checked against it.

- 2026-07-06: Replaced 301-line legacy root CLAUDE.md (archived to `.claude/source-material/CLAUDE-legacy-2026-04.md`); it listed the logo as `assets/logo.png` — actual path is `assets/logo/logo.png`.
- 2026-07-06: `.claude/settings.json` here is empty `{}`; the unbound-toolkit plugin is enabled from the workspace-level `~/Unbound/.claude/settings.json`.

- 2026-11-14: The site's canonical tags, sitemap and schema used `https://frenchroofing.com` (`src/lib/constants.ts`) while Vercel 307-redirected that to `www`, so Google split the pages across both hosts. Fixed in Vercel (Brittany OK'd): `frenchroofing.com` is the main domain, `www` 308-redirects to it. Keep every link, canonical and the Google profile's website on `https://frenchroofing.com`. Also: the Google profile's service area was "Portland metro", which put its Maps pin near Vancouver, WA; it's now Damascus-area towns only. Never use a metro or region as the service area.
