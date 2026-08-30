# French Roofing — Claude guide

## Project overview

Marketing site + content factory for French Construction LLC dba French Roofing (Sean French, Damascus OR, CCB #203933). Next.js 16 App Router site at frenchroofing.com (Vercel) plus automated blog/guide generation, social carousels, and photo-to-post pipelines. Done = content passes QUALITY-GATE, builds clean, and follows `.claude/BRAND.md`.

## Source of truth

- Brand, voice, NAP, colors: `.claude/BRAND.md` (quick ref: `.claude/BRAND-quick-reference.md`). This file is NOT a brand source.
- Session rules and approval gates: `.claude/CLAUDE.md` (autonomy: tight).
- Legacy brand bible (company story, segments, keywords, social links, AI workstreams, open items) archived at `.claude/source-material/CLAUDE-legacy-2026-04.md` — reference only.

## Commands

- `npm run dev` / `build` / `lint`
- `npm run deploy "msg"` — commits ALL changes (`git add -A`) and pushes `main`; Vercel auto-builds (~20-30s). main branch only; script exits on other branches.
- `npm run ebooks` — regenerate ebook PDFs
- `npm run promote` — photo-to-post pipeline (`scripts/promote-photo.ts`)
- Watch deploys: `npx vercel ls`. Unpushed commits: `git log origin/main..main`.

## Env vars (values in `.env.local`, no template yet)

- `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` (default claude-sonnet-4-6), `BLOB_READ_WRITE_TOKEN`
- GitHub Action `evergreen-instagram.yml` needs repo secret `ANTHROPIC_API_KEY` (Sundays 14:00 UTC, opens a draft-post PR)

## Architecture

- `src/app` + `src/components`: the site. `operations/seo/`: QUALITY-GATE.md + topic-cluster-map.md drive `/guides` content.
- `.claude/skills/`: fr-blog, fr-carousel, fr-social-publish. `skills/` (root, intentional — Sean-facing skills for his claude.ai): fr-close-out, fr-email-triage, fr-email-response. Claude.ai Team setup kit: `operations/claude-ai-setup/`.
- `roof-measure/`: separate planned SaaS product with its own CLAUDE.md — not part of the site.
- `social/` and `assets/` are local media (gitignored); `public/` IS committed. Logo: `assets/logo/logo.png`.

## Conventions & constraints (full list in `.claude/BRAND.md`)

- No em dashes. Banned-words list applies. Tagline "Got You Covered!" max 1 in 6 posts.
- Never publish the street address (Sean's home; GBP runs in service-area mode). No phone number on social creative/captions (web/GBP keep it for NAP consistency).
- Autonomy tight: human review before posting/deploying, EXCEPT fr-blog `/guides/*` batches that pass QUALITY-GATE clean AND `npm run build` (2026-07-03 exception).
- Housecall Pro = system of record for everything operational (jobs, customers, estimates, photos). JobNimbus retired 2026-07.
- Never mix French Roofing content with any other client.

## Lessons learned

- 2026-07-06: Replaced 301-line legacy root CLAUDE.md (archived to `.claude/source-material/CLAUDE-legacy-2026-04.md`); it listed the logo as `assets/logo.png` — actual path is `assets/logo/logo.png`.
- 2026-07-06: `.claude/settings.json` here is empty `{}`; the unbound-toolkit plugin is enabled from the workspace-level `~/Unbound/.claude/settings.json`.
