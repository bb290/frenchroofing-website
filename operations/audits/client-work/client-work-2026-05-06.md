# Client Work Report — French Roofing
**Run:** 2026-05-06 10:17
**Mode:** auto → status
**Spec version:** 2.1

## Summary
- Maturity: **pre-tier-1** (multiple Tier 1 gaps)
- Autonomy level: **not declared** (`.claude/CLAUDE.md` missing — no autonomy frontmatter anywhere)
- Bus factor status: **missing**
- Critical gaps: **5**
- High-priority gaps: **5**
- Future work: **6**

Folder note: actual slug on disk is `French_Roofing` (CamelCase + underscore), not the kebab-case `french-roofing` the spec writes. No rename performed — drift flagged.

---

## Tier 1 — Foundation

| Item | State | Notes |
|---|---|---|
| `.claude/settings.json` | ✓ | Exists |
| `.claude/CLAUDE.md` | ✗ | Missing. Root `CLAUDE.md` exists at `clients/French_Roofing/CLAUDE.md` (legacy brand bible) but is in the wrong location and does not declare an autonomy level |
| `.claude/BRAND.md` | ⚠ | Exists, frontmatter `status: draft` — needs human reviewer to flip to `approved` |
| `assets/logo/` | ⚠ | Logo exists but at `assets/logo.png` (file), not `assets/logo/` (folder per spec). At least one variant present. |
| `assets/tokens.json` | ✗ | Missing. `assets/tokens.css` exists with primary/accent/ink/paper colors + base typography but spec wants the JSON form |
| `BUS-FACTOR.md` | ✗ | Missing entirely. No handoff doc on disk |
| Git initialized | ✓ | `.git/` present, repo active |

---

## Tier 2 — Operational

| Item | State | Notes |
|---|---|---|
| `content/CALENDAR.md` | ✗ | No `content/` folder at all |
| `content/strategy/` | ✗ | Missing |
| `content/memory/` | ✗ | Missing (no `used-hooks.md`, `used-angles.md`, `topic-history.json`) |
| `operations/audits/client-work/` | ✓ | Created during this run to receive this report |
| `PRIORITIES.md` | ✗ | Missing |
| `social/` | ✓ | Set up today: `social/instagram/pillars.md` + `evergreen/{crew-community, educational, before-after}/` scaffolding present |

---

## Tier 3 — Mature

| Item | State | Notes |
|---|---|---|
| `content/posts/` | ✗ | Missing — no posts inventory yet |
| `content/interviews/` | ✗ | Missing as canonical folder. Sean interviews exist as scraped markdown in `.firecrawl/` (3 files: podcast + 2 videos) — should migrate |
| `assets/photography/` | ⚠ | Photography exists in volume at `assets/images/` (~200 files across `before-after/`, `damage/`, `jobs/`, `process/`, `sean/`, `team/`, `misc/`) — non-canonical location, but rich content. Migration is the gap, not the absence |
| `assets/templates/` | ✗ | Missing — no OG image, social-post, or deck templates |
| `operations/sops/` | ✗ | Missing |
| `operations/audits/website/` | ✗ | Missing |
| `operations/briefings/` | ✗ | Missing |

---

## Existing material classified

### Brand assets → `assets/` (spec §4)
| Current | Suggested target |
|---|---|
| `assets/logo.png` | `assets/logo/logo.png` |
| `assets/tokens.css` | keep (recently moved here) — also generate `assets/tokens.json` |
| `.claude/BRAND-quick-reference.md` | keep |
| `assets/images/jobs/*` (~165 files) | `assets/photography/jobs/` |
| `assets/images/before-after/*` (9 files) | `assets/photography/before-after/` |
| `assets/images/sean/*` (3 files) | `assets/photography/sean/` |
| `assets/images/team/*` (4 files) | `assets/photography/team/` |
| `assets/images/process/*` (8 files) | `assets/photography/process/` |
| `assets/images/damage/*` (2 files) | `assets/photography/damage/` |
| `assets/French Roofing LLC - Residential Roofing Education Manual.pdf` | flag as **source for SOPs / educational content**; place in `.claude/source-material/` |

### Website material → `website/` (spec §4)
The Next.js app source currently sits at the **client root** rather than under `website/`. Migration is non-trivial.

| Current (root) | Suggested target |
|---|---|
| `package.json`, `package-lock.json` | `website/` |
| `next.config.ts`, `next-env.d.ts` | `website/` |
| `tsconfig.json`, `tsconfig.tsbuildinfo` | `website/` |
| `eslint.config.mjs`, `postcss.config.mjs` | `website/` |
| `src/`, `public/` | `website/src/`, `website/public/` |
| `.next/`, `.vercel/` | `website/.next/`, `website/.vercel/` (build output, do not commit) |

### Content material → `content/` (spec §4)
| Current | Suggested target |
|---|---|
| `.firecrawl/sean-podcast.md` | `content/interviews/sean-podcast.md` (or `.claude/source-material/`) |
| `.firecrawl/sean-video-1.md` | `content/interviews/sean-video-1.md` |
| `.firecrawl/sean-video-2.md` | `content/interviews/sean-video-2.md` |

### Raw media at root (loose iPhone exports)
| File | Size | Suggested target |
|---|---|---|
| `IMG_2529.JPEG` | 5.7 MB | `assets/photography/raw/` (then sort) |
| `IMG_2530.JPEG` | 4.3 MB | `assets/photography/raw/` |
| `IMG_2531.JPEG` | 5.0 MB | `assets/photography/raw/` |
| `IMG_2532.JPEG` | 5.3 MB | `assets/photography/raw/` |
| `IMG_2861.mov` | (raw) | `assets/photography/raw/` |
| `IMG_3594.MOV` | 10 MB | `assets/photography/raw/` |
| `IMG_6178.HEIC` | 1.9 MB | `assets/photography/raw/` |
| `IMG_6179.HEIC` | (raw) | `assets/photography/raw/` |
| `IMG_6273.MOV` | **365 MB** | flag — see migration risk |
| `IMG_6274.MOV` | 34 MB | `assets/photography/raw/` |
| `IMG_6275.MOV` | 53 MB | `assets/photography/raw/` |
| `IMG_8686.MOV` | 708 KB | `assets/photography/raw/` |
| `IMG_8687.MOV` | 658 KB | `assets/photography/raw/` |
| `Squirrel Coming out of roof vent.mov` | 2.3 MB | likely a content piece — `content/posts/<inferred-date>-squirrel-vent/video/` |
| `crawling under an wave, epic video.mov` | 435 KB | unclear — likely personal, flag for review |

### Sub-project (separate concern)
| Path | Notes |
|---|---|
| `roof-measure/` | Independent project (web-based roof measurement widget, has its own `CLAUDE.md`). Has its own `.claude/`, `assets/`, and Next.js stack inferred. **Recommend extracting to a separate client folder or repo** rather than nesting under French_Roofing. |

### Already conformant
| Path | Status |
|---|---|
| `.claude/settings.json` | ✓ |
| `.claude/BRAND.md` | ⚠ draft |
| `.claude/BRAND-quick-reference.md` | ✓ (added today) |
| `assets/tokens.css` | ✓ (added today) |
| `social/instagram/pillars.md` | ✓ (added today) |
| `social/instagram/evergreen/crew-community/pillar.md` | ⚠ status `setup` |

---

## Unclassified / needs human review

| File | Reason |
|---|---|
| `AGENTS.md` (root) | Tiny file declaring `nextjs-agent-rules` for the Next.js app. Belongs with `website/` if/when migrated. Confirm it's still needed. |
| `README.md` (root) | Stock `create-next-app` README — uninformative. Ok to overwrite with a real client README per spec §2 |
| `crawling under an wave, epic video.mov` | Filename suggests personal/unrelated content. Confirm before placing |
| Root `CLAUDE.md` (legacy brand file) | Now superseded by `.claude/BRAND.md`. Can be retired or moved to `.claude/source-material/` for archival. Do not delete without operator confirmation — it currently holds the only operational hard-rules and SEO/AEO/SOP workstream definitions, some of which are not yet in BRAND.md. |
| `roof-measure/` | Possibly a separate product. Confirm whether it should live as a sub-project here, become its own client folder, or split to its own repo |
| `.DS_Store` files | macOS metadata, gitignore-worthy, otherwise harmless |

---

## Migration risk flags (spec §5)

- **Files larger than 100MB:** `IMG_6273.MOV` (365 MB). Should not be tracked in Git — add to `.gitignore` before committing any move. Place in `assets/photography/raw/` only if external storage strategy exists, otherwise consider archiving offline.
- **Modified in last 7 days:**
  - `.claude/BRAND.md` (today, this run)
  - `.claude/BRAND-quick-reference.md` (today, moved)
  - `assets/tokens.css` (today, moved)
  - `CLAUDE.md` (root) (today — LLC removal pass)
  - `social/instagram/**` (today, scaffolded)
- **Build output / dependencies:** `.next/`, `node_modules/`, `.vercel/`, `roof-measure/.next/`, `roof-measure/node_modules/` — list-only, do not move or commit
- **Folder slug drift:** `French_Roofing` vs spec's `french-roofing`. BRAND.md frontmatter uses `client: french-roofing` (kebab) for forward compatibility. Other clients also drift (`Unbound24`, `D2_Scheduler`, `alchemy-coalition`, `scholarpath-systems`, `sagareus`). Cross-client decision, not French-Roofing-specific.
- **Confidential material:** none observed in plain text. The PDF "Residential Roofing Education Manual" is internal/educational, not credentialed.
- **Embedded Next.js website at root** rather than under `website/` — large-blast-radius migration. Re-running `next build`, redeploying via Vercel, and updating any external CI/deploy hooks would all need coordination. Do not attempt without explicit authorization.

---

## Recommended next actions

1. **Create `BUS-FACTOR.md`** at `clients/French_Roofing/BUS-FACTOR.md` (Tier 1 critical). Without it, the client cannot be handed off. Use the template at `unbound-toolkit/plugins/unbound-toolkit/templates/BUS-FACTOR.md` and the fields from `.claude/BRAND.md` Section 0 (legal entity, NAP, CCB, vendor list). Map only — never paste credentials. Include pointers to: Vercel project for the website, JobNimbus account, Housecall Pro, Enhancify, the social accounts, and where 1Password/credential vault lives.

2. **Create `.claude/CLAUDE.md`** (Tier 1) with `autonomy: tight` (correct default for an underbuilt client). Copy from the toolkit template, substitute `{{client_name}}` → "French Roofing" and `{{slug}}` → `french-roofing`. This unblocks autonomy reporting on future `/client-work` runs.

3. **Flip `.claude/BRAND.md` from `draft` → `approved`** by human review. The bible was generated today from legacy CLAUDE.md + the design-system block; once Sean/Bryan signs off it counts toward Tier 1 ✓ and unblocks any agent that needs an approved bible to write copy.

### Worth doing right after the top 3
- Scaffold the missing Tier 2 folders (empty + `.gitkeep`): `content/{strategy,memory,interviews,posts}/`, `content/CALENDAR.md`, `operations/{briefings,reports,sops,training,audits/website,audits/brand-consistency}/`, `PRIORITIES.md`. A `/client-work --mode setup` run would do this — but it would also try to drop the BRAND.md/CLAUDE.md/BUS-FACTOR.md templates, which would clobber the BRAND.md just authored today. Do the scaffolding manually OR run setup with the BRAND.md temporarily moved aside.
- Add `assets/tokens.json` (mirror of `tokens.css` in JSON form) so the Tier 1 spec line is satisfied verbatim.
- Move `assets/logo.png` → `assets/logo/logo.png` and add additional logo variants (white, monochrome, favicon).
- Decide on `roof-measure/` — keep nested, promote to its own client, or repo split. Big architectural call, not urgent.

---

**Run complete.** Report written to `clients/French_Roofing/operations/audits/client-work/client-work-2026-05-06.md`.
