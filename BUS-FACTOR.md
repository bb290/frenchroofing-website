---
client: french-roofing
status: missing
last-verified:
last-verified-by:
spec-version: 2.1
---

# French Roofing — Bus Factor

> Technical handoff document. If Unbound (or Brittany specifically) becomes unreachable, another developer or agency should be able to take over from this file alone.
>
> **Audience:** technical — another developer, another agency, the client's own technical contact, or a Claude Code session inheriting the client.
>
> **Security rule:** this file is the **map**, not the **vault**. It points at where credentials live; it never contains them.
>
> **Status:** `missing` — populated 2026-05-06 with what was discoverable from the repo and BRAND.md, but **TODO** items below must be filled by the operator before flipping to `current`.

---

## 1. Identity & ownership

- **Client:** French Roofing
- **Legal entity (client side):** French Construction LLC dba French Roofing
- **Operating address (INTERNAL ONLY, never publish):** 16235 SE Van Zyl Dr, Damascus, OR 97089 - this is Sean's home; public materials use "Damascus, OR 97089" only
- **Phone:** 971-376-8722
- **Email:** hello@frenchroofing.com
- **CCB Number:** 203933
- **Manufacturer certification:** CertainTeed Certified
- **Legal entity (Unbound side):** Unbound Consulting LLC

- **What the client owns:**
  - The `frenchroofing.com` domain
  - The GitHub repo `bb290/frenchroofing-website` (currently under bb290 personal — **TODO:** transfer to a French Roofing org or document client read access)
  - The Vercel project `french-roofing` (project ID `prj_8cTUqtF9obC8Ik108ukqivkN7p4y` on team `team_IgVTOqFzJ2EbAdVwfopLCYOB`)
  - All social accounts (Facebook, Instagram, LinkedIn, YouTube, Google My Business)
  - Housecall Pro tenant (system of record for jobs/customers/estimates)
  - JobNimbus tenant (job tracking, photo capture)
  - Enhancify financing partnership

- **What Unbound manages on the client's behalf:**
  - The Next.js website source (this repo) and Vercel deployments
  - The brand bible at `.claude/BRAND.md` and design tokens (`assets/tokens.css`, `assets/tokens.json`)
  - Social media content production (in flight — Crew & Community evergreen pillar)
  - SOP authoring (planned: Housecall Pro workflows + GetOutline)
  - SEO/AEO city pages (Damascus, Clackamas, Happy Valley first)

- **Primary contracts location:** **TODO** — Master Services Agreement / SOW filed at: ____ (1Password vault? Dropbox? confirm)

## 2. Critical contacts

| Role | Name | Contact | Notes |
|---|---|---|---|
| Owner / primary client | Sean French | (phone/email) — **TODO** | Founder, on roofs daily; texts faster than emails |
| Backup client contact | **TODO** | **TODO** | Likely office manager or operations lead — confirm |
| Unbound emergency contact | Brittany / Unbound Consulting LLC | brittany@unbound24.com | |
| Day-to-day Unbound contact | Bryan | bb@sagareus.com | |
| Vercel account holder | bb290 (Bryan) | — | Project deploys under Unbound personal — **TODO:** plan migration to French Roofing's own Vercel team |
| GitHub repo owner | bb290 | — | Same — repo `bb290/frenchroofing-website` |
| Other vendors | CertainTeed (manufacturer), Enhancify (financing) | — | Vendor reps not currently captured; **TODO** |

## 3. Where things live (the map)

> Pointers only. Never values. Where to *find* the secret, never the secret itself.

| Resource | Provider | How to access |
|---|---|---|
| Domain registrar | **TODO** (likely Namecheap / GoDaddy / Cloudflare — check `whois frenchroofing.com`) | Login lives in 1Password vault — **TODO: confirm vault name** |
| DNS | **TODO** — check `dig NS frenchroofing.com` | Same vault as registrar |
| Hosting | Vercel — project `french-roofing`, ID `prj_8cTUqtF9obC8Ik108ukqivkN7p4y`, team `team_IgVTOqFzJ2EbAdVwfopLCYOB` | Login via Vercel SSO (GitHub `bb290`) — **TODO:** add Sean / a French Roofing email as collaborator |
| SSL / certs | Vercel-managed (auto Let's Encrypt) | No manual rotation needed |
| Code repos | GitHub — `https://github.com/bb290/frenchroofing-website` | GitHub login `bb290` — **TODO:** transfer or grant org access |
| Email | **TODO** — `hello@frenchroofing.com` is provisioned where? Google Workspace? Microsoft 365? IMAP? | **TODO** |
| Analytics | **TODO** — confirm whether Google Analytics 4, Vercel Analytics, Plausible, or none yet | **TODO** |
| Ad accounts | **TODO** — Google Ads / Meta Ads / Local Services Ads if any | **TODO** |
| Social accounts | Facebook (`/FrenchRoofingLLC` slug — preserved), Instagram (`@frenchroofing`), LinkedIn (`/company/french-roofing`), YouTube (`@Frenchroofing`), Google My Business (share.google/JYDD8GxCgR1YwXii2) | **TODO:** document who has admin/editor on each |
| File storage | **TODO** — Google Drive / Dropbox / SharePoint? | **TODO** |
| Password vault | **TODO** — confirm 1Password vault name (e.g. `French-Roofing-Production`) | **TODO** |
| Operational tools | Housecall Pro (system of record), JobNimbus (jobs + photos), Enhancify (financing), Canva (social templates) | Each has its own login — document admins per tool |

## 4. System architecture

What's hosted where. What depends on what. Where the failure points are.

```
GitHub (bb290/frenchroofing-website)
        │  push to main
        ▼
Vercel (project: french-roofing)
        │  builds Next.js 16 / React 19 / Tailwind 4
        │  serves frenchroofing.com (DNS — TODO confirm provider)
        ▼
Public website
        │
        ├─ Roof measurement widget (sub-project at roof-measure/)
        │  — independent Next.js app, deploy target TODO
        │
        └─ (planned) Vercel OG endpoint for social media auto-render

Operational stack (independent of the website)
        ├─ Housecall Pro  ← system of record (jobs, customers, estimates, invoices)
        ├─ JobNimbus      ← job tracking + before/after photo capture tasks
        ├─ Enhancify      ← customer financing
        └─ Canva          ← social media templates (not yet wired into automation)

Social media automation (in flight, see clients/French_Roofing/social/instagram/)
        ├─ Claude API for caption / overlay copy generation
        ├─ GitHub Actions for cron + orchestration
        ├─ Vercel OG for photo + text overlay rendering
        └─ Metricool Advanced for IG publishing (~$53/mo, shared across all Unbound clients)
```

**Failure points worth knowing:**
- The repo is under `bb290` (Unbound personal account), not French Roofing. If Bryan's GitHub account is locked, Sean cannot redeploy. Migration to a French-Roofing-owned org is **TODO**.
- Vercel project is on Unbound team. Same risk — **TODO** to add Sean as project member at minimum.
- The `roof-measure/` sub-project is currently nested in this repo. It is its own product and likely needs to split out before it's deployed publicly.
- No CI tests yet. Vercel auto-deploys preview on PR and prod on `main` push.

## 5. What's currently active

> Auto-pulled from `PRIORITIES.md` and `content/CALENDAR.md`. Both are missing today, so this section is empty until those exist.

_none — `PRIORITIES.md` and `content/CALENDAR.md` not yet created_

## 6. How to keep the lights on

**Minimum monthly tasks.**
- Verify the website is up and renders on `frenchroofing.com` (manual visit)
- Check Vercel build logs for any failed deploys
- Verify `BRAND.md` `last-updated` is within 90 days; if not, run `brand-strategist`
- Verify this `BUS-FACTOR.md` `last-verified` is within 90 days; if not, re-verify
- Run `/client-work --client French_Roofing` to surface drift

**Recurring payments and renewal dates.**

| Item | Provider | Cost | Renewal | Owner |
|---|---|---|---|---|
| Domain `frenchroofing.com` | **TODO** registrar | **TODO** | **TODO** annual | — |
| Vercel hosting | Vercel | Currently free tier (verify) | — | bb290 |
| Housecall Pro | Housecall Pro | **TODO** | **TODO** | French Roofing |
| JobNimbus | JobNimbus | **TODO** | **TODO** | French Roofing |
| Enhancify | Enhancify | per-customer fees | — | French Roofing |
| CertainTeed certification | CertainTeed | **TODO** | **TODO** | French Roofing |
| Metricool Advanced (planned) | Metricool | $53/mo (Unbound, shared) | monthly | Unbound Consulting |
| Claude API | Anthropic | ~$5/mo per client (est.) | usage-based | Unbound Consulting |

**Common-issue troubleshooting.**
- *Site is down:* Check Vercel project status. Check DNS (`dig frenchroofing.com`). Check whether the latest commit on `main` built clean.
- *Form submissions not arriving:* No form handler is wired up yet — **TODO** when contact form ships.
- *Photo upload fails in Housecall Pro / JobNimbus:* Out of scope for the website — escalate to the tool's vendor.
- *Squirrel in roof vent:* see `Squirrel Coming out of roof vent.mov` for documented precedent. Not actually a bus-factor issue.

## 7. Local development setup

How to clone, what env to set up, how to run anything locally.

```bash
git clone https://github.com/bb290/frenchroofing-website.git
cd frenchroofing-website
npm install
# Pull env vars from Vercel into .env.local (requires Vercel login)
npx vercel link
npx vercel env pull .env.local
npm run dev
# Open http://localhost:3000
```

**Notes:**
- Stack: Next.js `16.2.2`, React `19.2.4`, TypeScript `5`, Tailwind `4`, Sharp `0.34.x`. ESLint via `eslint-config-next`.
- Node version: **TODO** (no `.nvmrc` or `engines` field — assume Node 20 LTS or whatever Vercel defaults to).
- The `roof-measure/` folder is a separate Next.js app inside this repo. Treat it as its own project for local dev.

## 8. Deployment process

How changes go live. CI/CD if any. Manual steps if any.

- **Production:** push to `main` → Vercel auto-builds and deploys to `frenchroofing.com`.
- **Preview:** any non-`main` branch or PR → Vercel auto-builds a preview URL.
- **Manual deploy:** `npx vercel --prod` from a clean working tree (rarely needed).
- **Rollback:** Vercel dashboard → project `french-roofing` → Deployments → "Promote to Production" on a previous deployment.
- **No staging environment yet.** Preview URLs are the de facto staging.
- **No automated tests yet.** All verification is manual.

## 9. Known issues / technical debt

- Repo and Vercel project both live under **Unbound personal accounts** rather than a French Roofing organization. Migration is overdue.
- `roof-measure/` is a sub-project inside the main repo. Should be extracted to its own repo before public deploy.
- The brand bible has a legacy duplicate at root `CLAUDE.md` (predates spec v2.1). Operational hard rules / SEO / SOP workstream definitions still live there and have not been ported to the new `.claude/BRAND.md`. Until ported, **read both** for full context.
- No analytics, error monitoring, or uptime monitoring configured yet.
- No CI test suite. Lint is configured but not enforced on push.
- One legacy PDF (`French Roofing LLC - Residential Roofing Education Manual.pdf`) under `assets/` still uses the old "LLC" name on the filename — not in the file content. Low priority, can rename when convenient.
- Folder slug on disk is `French_Roofing` (CamelCase + underscore) while spec uses `french-roofing` (kebab). Frontmatter throughout uses kebab-case.

## 10. Handoff instructions

Step-by-step "if Brittany is unreachable" guide.

1. **Confirm Sean French is the authoritative client owner.** Phone: 971-376-8722. Email: hello@frenchroofing.com.
2. **Take inventory.** Walk this file top to bottom. Every TODO is a question to ask Sean or pull from his password vault.
3. **Get into hosting.** Ask Sean for Vercel access or have him add a new admin to team `team_IgVTOqFzJ2EbAdVwfopLCYOB`. Repo at `https://github.com/bb290/frenchroofing-website` — request transfer or invite.
4. **Get into domain + DNS.** Run `whois frenchroofing.com` to identify registrar; then ask Sean for credentials (in his vault, not this file).
5. **Get into Housecall Pro and JobNimbus.** These hold the operational data — not Unbound's, but you'll need them to keep marketing aligned with what's happening on jobs.
6. **Sustain the website.** No code changes are required to keep `frenchroofing.com` up — Vercel keeps it live until billing or DNS lapses.
7. **If the client wants to leave Unbound:**
   a. Transfer the GitHub repo (`bb290/frenchroofing-website` → French Roofing org).
   b. Transfer the Vercel project to a Vercel team Sean controls.
   c. Hand over `.claude/BRAND.md`, `.claude/BRAND-quick-reference.md`, and `assets/tokens.{css,json}` — these are deliverables the client owns.
   d. The unbound-toolkit plugin and any agency-internal tooling stay with Unbound.

## 11. Update log

| Date | By | Change |
|---|---|---|
| 2026-05-06 | bb@sagareus.com | Created from template; populated discoverable facts (Vercel project ID, GitHub remote, vendor list from BRAND.md). Status remains `missing` until TODO items are filled and verified. |
