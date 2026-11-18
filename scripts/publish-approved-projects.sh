#!/bin/bash
# Publish the /past-projects drafts Brittany approved on the Unbound Dashboard, then deploy (2026-11-18).
# Brittany: "Going forward, draft should land on the SEO/AEO board of dashboard; Once preview is approved, go ahead &
# push to live site." Called by the 4:10am daily job (tools/unbound-hq/seo/daily-indexing.sh) with an
# `ArtifactData list` export of the dashboard's pageok collection:
#
#   scripts/publish-approved-projects.sh <export-dir>
#
# An approval counts only for the exact draft she saw (rev check in project-pages.ts). It commits only the approved
# page files and pushes main only when nothing else unpushed would go live with them (same guard as the Wednesday
# review deploy). Exit 0 = nothing to do or deployed; 1 = something needs a look (the daily job notifies).

set -u
cd "$(dirname "$0")/.." || exit 1
DIR="${1:?usage: publish-approved-projects.sh <export-dir>}"

[ "$(git branch --show-current)" = "main" ] || { echo "projects deploy: repo isn't on main; nothing published."; exit 1; }
OUT="$(npx tsx scripts/project-pages.ts --approvals "$DIR" 2>&1)" || { echo "$OUT"; echo "projects deploy: reading approvals failed."; exit 1; }
echo "$OUT" | grep -v '^PUBLISHED ' | sed '/^$/d'
SLUGS="$(echo "$OUT" | sed -n 's/^PUBLISHED //p')"
[ -n "$SLUGS" ] || { echo "projects deploy: no newly approved pages."; exit 0; }

FILES=(); for s in $SLUGS; do FILES+=("src/data/projects/$s.json"); done
git commit -q -m "Past projects: publish $(echo $SLUGS | tr ' ' ',') (approved by Brittany on the dashboard)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -- "${FILES[@]}" || { echo "projects deploy: commit failed; pages marked published but not committed."; exit 1; }

git fetch -q origin main || { echo "projects deploy: NOT deployed (git fetch failed). Committed on main."; exit 1; }
if [ -n "$(git log --oneline main..origin/main)" ]; then echo "projects deploy: NOT deployed (origin/main has commits this Mac doesn't). Committed; pull, then push."; exit 1; fi
other="$(git diff --name-only origin/main..main | grep -vE '^(social/|operations/|\.claude/|src/data/google-reviews\.json$|src/data/projects/[^/]+\.json$|public/images/projects/)' || true)"
for f in $(git diff --name-only origin/main..main -- src/data/projects); do
  s="$(basename "$f" .json)"
  if git show "main:$f" 2>/dev/null | grep -q '"status": "published"' && ! git show "origin/main:$f" 2>/dev/null | grep -q '"status": "published"' \
     && ! echo " $SLUGS " | tr '\n' ' ' | grep -q " $s "; then other="$other $f(published)"; fi
done
if [ -n "$other" ]; then echo "projects deploy: NOT deployed (other unpushed changes would go live with it: $(echo $other | head -c 300)). Committed on main."; exit 1; fi
git push -q origin main || { echo "projects deploy: NOT deployed (git push failed). Committed on main."; exit 1; }
for s in $SLUGS; do echo "projects deploy: LIVE https://frenchroofing.com/past-projects/$s (Vercel builds in about a minute)"; done
exit 0
