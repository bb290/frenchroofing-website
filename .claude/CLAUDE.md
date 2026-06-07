# French Roofing, Claude rules

This file scopes how Claude Code behaves inside `clients/French_Roofing/` (slug: `french-roofing`). Agency-wide methodology lives in the unbound-toolkit; this file is for *this client's* specifics only.

## Autonomy level

**Current:** `tight`

Per spec Section 6:

- **`tight`**, every gate human-reviewed. Default for new clients and the first 4 weeks.
- **`standard`**, low-risk briefs and posts auto-advance Gate 1. Default after 4 weeks of clean output.
- **`loose`**, established themes auto-advance further. Default after 12 weeks of clean output.

Promote this client by editing the `Current:` line above. The `/client-work` status report will note whether the current level seems appropriate based on history.

## Toolkit reference

This client folder uses the agents, skills, slash commands, and templates from the unbound-toolkit plugin. `.claude/settings.json` points at it. Do not duplicate toolkit files into this folder, reference them.

## Client-specific rules

Things that override or extend agency defaults for French Roofing.

### Identity

- **Brand / DBA:** French Roofing
- **Legal entity:** French Construction LLC dba French Roofing
- Use the dba in marketing. Reserve the legal entity for contracts and formal documents.
- Do **not** write "French Roofing LLC" anywhere. The Facebook URL slug `FrenchRoofingLLC` is a live handle and must be kept as-is to preserve inbound links, that is the only exception.

### Voice

- Down to earth, neighborly, light hearted. Conversational, complete sentences. Never salesy.
- North star: Sean talking, a roofer in Birkenstocks who's been on roofs for 20 years.
- Banned words/phrases (auto-flag in review): *premier, industry-leading, rockstar, synergy, amazing team, cutting-edge, world-class, best-in-class*.
- Tagline `Got You Covered!` is rationed, max 1 in 6 social posts.
- Full voice spec: `.claude/BRAND.md` §4.

### Service area lock

Local content references only cities inside the 20-mile Damascus radius enumerated in `.claude/BRAND.md` §9. Do not invent or expand the list without explicit operator confirmation.

SEO/AEO city focus order (do not skip ahead): Damascus → Clackamas → Happy Valley, then expand.

### Cross-brand isolation

Never mix French Roofing content with Sagareus, Unbound24, or any other client. These are separate companies with separate brands, audiences, and workflows. Do not cross-reference between client folders without operator authorization.

### NAP consistency (mandatory)

Every web property and outbound piece must use this NAP exactly:

```
French Roofing
Damascus, OR 97089
971-376-8722
```

> **Privacy rule (operator decision, 2026-06):** the street address is Sean's home and is never published on any web property, schema markup, directory, or outbound material. Public NAP is city/state/zip only. GBP runs in service-area mode (address hidden).

### Primary CTA

Default CTA for outbound copy: **"Schedule a FREE Roof Assessment with French Roofing."** Variants are fine; high-pressure / scarcity tactics are not.

### Approval gates

While at `autonomy: tight`:
- All social copy gates to a human review before posting.
- All public-facing pages and city pages get reviewed before deploy.
- Any SOP edit preserves original operational logic, never paraphrase or summarize away SOP steps.

### Tooling

- **Housecall Pro** is the system of record for jobs, customers, and estimates. Workflow logic should assume it as the operational hub.
- **JobNimbus** for job tracking + before/after photo capture.
- **Enhancify** for customer financing.
- **Canva** for social templates.
- CMS / marketing CRM: TBD, flag in any work that depends on them.

## Brand bible

The full brand bible lives at `.claude/BRAND.md`. Read it before writing any copy or visuals for this client.

A pinnable cheat sheet of colors, type, components, and voice lives at `.claude/BRAND-quick-reference.md`. Design tokens for engineering: `assets/tokens.css` (CSS) and `assets/tokens.json` (JSON).

### Source-of-truth resolution (social commands)

The original social-media-engine strategy said "social commands read CLAUDE.md, not BRAND.md." That is **superseded**. Social media slash commands (`/campaign-brief`, `/campaign-generate`, `/evergreen-setup`, `/evergreen-generate`) read `.claude/BRAND.md` for voice, CTA, NAP, hashtags, banned words, colors, and fonts. The legacy root `CLAUDE.md` (predating spec v2.1) is reference-only, do not read it as a brand source.

## Bus factor

Handoff documentation lives at `BUS-FACTOR.md` (root of this folder). _Currently deferred, flag as critical Tier 1 gap until created._

## Source material

Original brand docs, voice samples, recordings, and other reference material that informed the brand bible should live in `.claude/source-material/`. That folder is for context, not output.

The legacy root `CLAUDE.md` (predates spec v2.1) holds the original brand-content. It is **superseded by `.claude/BRAND.md`** but still contains operational hard-rules and SEO/AEO/SOP workstream definitions not yet ported. Do not delete the root `CLAUDE.md` until that content is migrated.
