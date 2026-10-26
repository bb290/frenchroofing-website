# French Roofing — Claude guide

## Project overview

Marketing site + content factory for French Construction LLC dba French Roofing (Sean French, Damascus OR, CCB #203933). Next.js 16 App Router site at frenchroofing.com (Vercel) plus automated blog/guide generation, social carousels, and photo-to-post pipelines. Done = content passes QUALITY-GATE, builds clean, and follows `.claude/BRAND.md`.

## Source of truth

- Brand, voice, NAP, colors: `.claude/BRAND.md` (quick ref: `.claude/BRAND-quick-reference.md`). This file is NOT a brand source.
- Session rules and approval gates: `.claude/CLAUDE.md` (autonomy: tight).
- Legacy brand bible (company story, segments, keywords, social links, AI workstreams, open items) archived at `.claude/source-material/CLAUDE-legacy-2026-04.md` — reference only.

## Notion hub

The French Roofing Notion workspace is the shared client hub (built 2026-10-22 from the Unbound client hub template). Read **"CLAUDE.md: Read First"** under the Dashboard at session start (rules, Current state, newest session-log entries) and check Project Tasks for open Claudette rows. At session end, add a session-log entry at the TOP, rewrite Current state if it changed, keep Project Tasks true. Comments start "Update by Claude, per Brittany's request:".

**Connect through Composio, French Roofing account only:** `composio proxy https://api.notion.com/v1/... -t notion --account notion_koala-benab` (no alias yet). Before any write, check `users/me` returns `workspace_name: "French Roofing"`. Set stdin to /dev/null when scripting.

**Rules:** one Current Project at a time (now: **Customer FAQ v1**; up next: Housecall Pro SOPs v1, parked in the Idea Bank with its planned tasks); everything else in the Idea Bank. Owners: Sean, Brittany, Claudette. No CRM here: Housecall Pro holds customer details, and no customer names, phones, emails, or addresses go in Notion. No passwords or tokens. SOP edits keep Sean's steps exactly.

| Notion object | id |
|---|---|
| Dashboard | `401a644c-bd9a-8187-b1a8-ce974701c229` |
| Project Tasks db (Item, Order, Type, Owner: Sean/Brittany/Claudette, Status) | `401a644c-bd9a-81f6-9675-e3f7e9f3b07a` |
| Idea Bank db (Idea, Status, Area, Suggested by, Why, Added) | `401a644c-bd9a-81fc-968d-e2af5f8be91f` |
| CLAUDE.md: Read First | `401a644c-bd9a-81c4-912a-f67357c069f8` |
| SOPs (Brand Guide, How We Work Together, SOP pages) | `401a644c-bd9a-8122-bb61-d56b221afacc` |
| Customer FAQ db (Question, Status: Needs Sean/Approved/On website, Stage, Topic, Times asked, Email, Texts & calls, What we've told customers, Flag for Sean, Final answer (Sean)) | `401a644c-bd9a-8199-b57e-e03b6c47125f` |
| Customer Communication Review (2026) page | `401a644c-bd9a-81ad-9c04-c63dab6d7369` |

The Customer FAQ is the one place for final answers (seeded 2026-10-22 from the FAQ tab of Google Sheet `1YAFHIafaQ2tsLhfWYbY9eiAU1sQrR-XyT5BlFBDmZbg`, which keeps the review tabs). Questions only, never who asked.

## Commands

- `npm run dev` / `build` / `lint`
- `npm run deploy "msg"` — commits ALL changes (`git add -A`) and pushes `main`; Vercel auto-builds (~20-30s). main branch only; script exits on other branches.
- `npm run ebooks` — regenerate ebook PDFs
- `npm run promote` — photo-to-post pipeline (`scripts/promote-photo.ts`)
- `npm run hcp:check` — Housecall Pro API connection test (prints counts only, no customer data). Client: `scripts/lib/hcp.ts` (read-only by design)
- `npm run hcp:photos -- [--since 90] [--dry-run] [--inspect]` — pull Housecall Pro job/estimate photos into `assets/images/1.intake`, named `<city>_<YYYY-MM-DD>_<context>_<job|est><number>-<seq>` with a PII-free context note. Context is a Claude vision label (`scripts/lib/label-photo.ts`, default claude-opus-5, about a cent a photo); `UNKNOWN` means label by hand, `PAPERWORK-` means discard. Feeds the normal Kewl sort, never sorts or publishes itself
- **Weekly Kewl run (Wednesdays 7:17am, unattended):** LaunchAgent `com.unbound.frenchroofing.weekly-kewl` → `scripts/weekly-kewl.sh` → skill `fr-weekly-kewl`. Pull → sort → promote (max 3) → caption review → Metricool **drafts**; Brittany approves in Metricool. Report + logs: `operations/kewl-runs/` (gitignored). On demand: `/fr-weekly-kewl`. Plumbing check: `scripts/weekly-kewl.sh --smoke`. Off: `launchctl bootout gui/$(id -u)/com.unbound.frenchroofing.weekly-kewl`.
- `npm run kewl:sheets` / `kewl:sort -- <decisions.json>` / `kewl:lint -- <post dirs>` — the sort and review helpers the weekly run uses
- Watch deploys: `npx vercel ls`. Unpushed commits: `git log origin/main..main`.

## Env vars (values in `.env.local`, no template yet)

- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default claude-sonnet-4-6), `BLOB_READ_WRITE_TOKEN`
- `HOUSECALL_PRO_API_KEY` (read-only key from HCP App Store → API Key Management; requires MAX plan), optional `HOUSECALL_PRO_AUTH`. API dumps go in `operations/hcp-data/` (gitignored, customer PII)
- GitHub Action `evergreen-instagram.yml` needs repo secret `ANTHROPIC_API_KEY` (Sundays 14:00 UTC, opens a draft-post PR)

## Architecture

- `src/app` + `src/components`: the site. `operations/seo/`: QUALITY-GATE.md + topic-cluster-map.md drive `/guides` content.
- `.claude/skills/`: fr-blog, fr-carousel, fr-social-publish, fr-reel (9:16 reels/Shorts from photos on disk + voiceover via HyperFrames → Metricool drafts for IG/FB Reels, LinkedIn, YouTube Short, GBP; projects in `social/reels/<slug>/`). `skills/` (root, intentional — Sean-facing skills for his claude.ai): fr-close-out, fr-email-triage, fr-email-response. Claude.ai Team setup kit: `operations/claude-ai-setup/`.
- `roof-measure/`: separate planned SaaS product with its own CLAUDE.md — not part of the site.
- `social/` and `assets/` are local media (gitignored); `public/` IS committed. Logo: `assets/logo/logo.png`.

## Conventions & constraints (full list in `.claude/BRAND.md`)

- No em dashes. Banned-words list applies. Tagline "Got You Covered!" max 1 in 6 posts.
- Never publish the street address (Sean's home; GBP runs in service-area mode). No phone number on social creative/captions (web/GBP keep it for NAP consistency).
- Autonomy tight: human review before posting/deploying, EXCEPT fr-blog `/guides/*` batches that pass QUALITY-GATE clean AND `npm run build` (2026-07-03 exception).
- Housecall Pro = system of record for everything operational (jobs, customers, estimates, photos). JobNimbus retired 2026-07.
- Never mix French Roofing content with any other client.

## Lessons learned

- 2026-09-17: The captioner never sees the photo; the sort note is its only source of facts. A wrong note (chimney apron labeled a "saddle") produced a confident, wrong post, and thin notes produced invented stories, prices, and stats. Open the full image before writing a note, describe only what is visible, and keep `context-note.txt` with the post so captions can be checked against it.

- 2026-07-06: Replaced 301-line legacy root CLAUDE.md (archived to `.claude/source-material/CLAUDE-legacy-2026-04.md`); it listed the logo as `assets/logo.png` — actual path is `assets/logo/logo.png`.
- 2026-07-06: `.claude/settings.json` here is empty `{}`; the unbound-toolkit plugin is enabled from the workspace-level `~/Unbound/.claude/settings.json`.
