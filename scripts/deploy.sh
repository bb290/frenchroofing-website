#!/usr/bin/env bash
# Deploy the French Roofing site to production.
#
# What it does: commits any pending changes, pushes main to GitHub, which
# triggers the Vercel production build. The live site (frenchroofing.com)
# updates ~20-30s after the push.
#
# Usage:
#   npm run deploy                 # commits with a default message, pushes
#   npm run deploy "your message"  # commits with your message, pushes
#
# If there's nothing new to commit but you have unpushed commits, it still
# pushes them. If everything is already pushed, it tells you and exits.

set -euo pipefail
cd "$(dirname "$0")/.."

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "⚠️  You're on '$BRANCH', not 'main'. The site only deploys from main."
  echo "    Switch with: git checkout main"
  exit 1
fi

MSG="${1:-"Update site content ($(date '+%Y-%m-%d %H:%M'))"}"

# Stage and commit anything pending.
if [ -n "$(git status --porcelain)" ]; then
  echo "→ Committing local changes..."
  git add -A
  git commit -q -m "$MSG"
  echo "  committed: $(git log --oneline -1)"
else
  echo "→ No uncommitted changes."
fi

# Bail early if nothing needs pushing.
if [ -z "$(git log origin/main..main --oneline 2>/dev/null)" ]; then
  echo "✓ Everything is already pushed. Live site is up to date."
  exit 0
fi

echo "→ Pushing to GitHub (triggers Vercel production build)..."
git push origin main

echo ""
echo "✓ Pushed. Vercel is building now."
echo "  Live in ~20-30s at: https://www.frenchroofing.com"
echo "  Watch the build:     npx vercel ls"
