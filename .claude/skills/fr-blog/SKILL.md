---
name: fr-blog
description: Generate a weekly batch of French Roofing guides (default 10) from the topic-cluster-map backlog, gate each against QUALITY-GATE.md, attach images, build-check, and auto-deploy to frenchroofing.com. Use on "/fr-blog", "generate the weekly guide batch", or the weekly cron run.
---

# FR Blog — weekly guide batch for French Roofing

Writes net-new guides that extend the topic-cluster system. Guides are **TypeScript content modules**, not CMS entries: a new guide is code in `src/lib/guides/<cluster>.ts`, registered in `index.ts`, rendered by `/guides/[slug]` with AEO structure and FAQPage schema emitted automatically.

**Publish policy (per operator, 2026-07-03): gate-PASS batches auto-deploy.** The gate is the reviewer. Held back only on: gate FAIL after 3 iterations, an A5 doubt-flag (insurance/legal/cost claim the writer could not verify), or a failed `npm run build`. Everything else commits and deploys; the run report lists it all.

## Modes

- `/fr-blog batch [N]` — next N backlog items (default 10, hard cap 10). The weekly cron mode.
- `/fr-blog single <slug or topic>` — one guide, identical pipeline (test mode).
- `/fr-blog propose` — replenish backlog proposals only (no writing).

## Required reading, every run

1. `operations/seo/topic-cluster-map.md` — Backlog section + the cluster tables (personas, query patterns, money pages).
2. `operations/seo/QUALITY-GATE.md` — blocking gate A1–A9.
3. `.claude/BRAND.md` (+ `.claude/BRAND-quick-reference.md`) — voice: Sean talking, neighborly, never salesy. Banned words list. Service-area city list §9.
4. `src/lib/guides/types.ts` — the content contract (answer-first headings, faqs, cta, ogPhoto JPEG/PNG only).
5. An existing cluster file (e.g. `src/lib/guides/moss-care.ts`) — match its code style, tone, and content density exactly.

## Batch algorithm

1. **Select** next N `backlog` items top-down (finish a cluster before starting the next; a new cluster needs its pillar written first in the same batch).
2. **Per guide:**
   a. **Verify.** Roofing facts stated carefully (honest ranges, "every roof is different"); Oregon/insurance/real-estate claims framed as plain information with "talk to your agent/inspector" routing; NO invented statistics or costs. City guides: only locked cities, grounded in real local characteristics.
   b. **Write** the Guide object per types.ts: intro, answer-first sections, 3-5 faqs, cta ("Schedule a FREE Roof Assessment" framing), metaTitle ≤ 60, description 120-158, ≥ 2 internal links (cluster money page + sibling guide, live pages only).
   c. **Images (hybrid policy):** search `public/images/` + `social/instagram/` for a topically matching real photo first (real jobs beat stock, always). If nothing fits (abstract topics: insurance paperwork, financing), generate a brand-token illustration (yellow #ffbd59 / blue #092e5e / cream #f5f1ea, no text, no fake job photos) and save to `public/images/guides/`. `ogPhoto` must be JPEG/PNG (the OG renderer cannot read WebP).
   d. **Register:** append to the cluster file (create `<cluster>.ts` + register in `index.ts` for new clusters, matching the existing pattern).
3. **Gate** each guide against QUALITY-GATE.md, adversarially. Fix and rescore, max 3 iterations.
4. **Build check (A9, blocking):** `npm run build` must succeed. A guide that breaks the build gets pulled from the batch, not shipped broken.
5. **Deploy:** `npm run deploy "guides: <n> new (<clusters>)"` — commits and pushes; Vercel goes live in ~30s. Then curl each new `/guides/<slug>` URL until 200 and confirm the FAQPage JSON-LD renders.
6. **Log:** flip backlog statuses to `written <date>`; write `operations/seo/reports/RUN-<date>.md` (scorecards, live URLs, holds with reasons, backlog remaining, proposals if under 12).

## Headless/cron rules

- No interactive questions mid-run. Ambiguity or failure = skip the item, continue, explain in the report.
- Never touch existing guides except to add sibling links (crosslink passes are called out in the report).
- Never edit anything outside `src/lib/guides/`, `public/images/guides/`, and the ops/report files, except the `index.ts` registration.
- Cross-brand isolation: nothing from Sagareus or any other client leaks in. Ever.
