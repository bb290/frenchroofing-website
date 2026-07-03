# Blog migration: blog.frenchroofing.com → frenchroofing.com/blog

**Why:** bring the third-party AI blog in-house. Saves ~$100/mo, one codebase, our voice, our gate.
**Status (2026-07-03):** build + content migration in progress. Cutover steps below need the operator.

## What was built

- `/blog` (index) + `/blog/[slug]` in the Next.js app, reusing the guides components and schema.
- Content store: `src/lib/blog/posts.json` (validated JSON; schema in `src/lib/blog/types.ts`).
- All vendor posts migrated with ORIGINAL slugs (`/blog/<slug>` paths match the old subdomain paths exactly), each voice-passed into Sean's voice, external junk links and unverifiable stats stripped, related-guide links added.
- Sitemap includes /blog + every post.
- `next.config.ts`: the old www→subdomain blog redirects are REMOVED and replaced with host-based 301s (subdomain→www) that activate at cutover.
- Weekly production: the `fr-blog` skill now writes blog articles (JSON) alongside guides (TS modules); article backlog seeded in `topic-cluster-map.md`.

## Cutover runbook (operator steps, ~10 minutes)

1. **Verify the in-house blog looks right** at https://www.frenchroofing.com/blog (after the migration deploy).
2. **Add the subdomain to the site's Vercel project:** Vercel dashboard → frenchroofing-website → Settings → Domains → add `blog.frenchroofing.com`. If Vercel reports the domain is claimed by another account (the vendor's), the vendor must release it OR use the DNS TXT verification flow to force-claim it (you own the DNS, so verification will succeed).
3. **Repoint DNS:** in the DNS provider for frenchroofing.com, change the `blog` CNAME from the vendor's `*.vercel-dns-016.com` value to `cname.vercel-dns.com` (Vercel shows the exact value when you add the domain).
4. **Verify redirects:** `curl -sI https://blog.frenchroofing.com/blog/common-roof-repair-mistakes-homeowners` → expect `301` + `location: https://www.frenchroofing.com/blog/common-roof-repair-mistakes-homeowners`, and that URL returns 200.
5. **Google Search Console:** add/verify the www property covers /blog (it does, same domain); submit the updated sitemap; use Change of Address only if the subdomain was a separate GSC property.
6. **Cancel the vendor subscription.** Keep the scraped originals (archived in the migration workspace) as insurance; nothing more is needed from them.
7. Watch GSC for a couple of weeks: the 301s transfer the subdomain's equity to www; rankings typically wobble briefly and settle.

## Skipped posts

Any vendor post judged unusable (competitor-domain spam etc.) was not migrated; its old URL 301s to /blog via the catch-all host redirect, which is the correct outcome for junk pages.
