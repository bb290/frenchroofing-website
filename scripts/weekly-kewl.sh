#!/bin/bash
# weekly-kewl.sh
#
# Runs the fr-weekly-kewl skill unattended: Housecall Pro photos + Drive intake -> sort -> promote -> caption
# review -> posts marked ready and synced to the Unbound Dashboard. Fired every Wednesday by the LaunchAgent
# in operations/launchd/. Brittany approves in the dashboard, which schedules the post in Metricool with her
# own login; nothing here can create, schedule or publish a Metricool post (changed 2026-11-11).
#
#   scripts/weekly-kewl.sh            the real run
#   scripts/weekly-kewl.sh --smoke    checks the headless plumbing (tools, MCP, skill) and changes nothing
#
# Turn it off:  launchctl bootout gui/$(id -u)/com.unbound.frenchroofing.weekly-kewl
# Turn it on:   launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.unbound.frenchroofing.weekly-kewl.plist
#
# Safety by construction, not by instruction:
#   - Claude only gets the tools listed below. Shell access is limited to the Kewl npm scripts and
#     local git add/commit. No push, no deploy, no rm, no curl.
#   - Metricool access is read only (brand settings and the calendar, for picking slots).
#     createScheduledPost and updateScheduledPost are NOT allowed.
#   - Dashboard writes (2026-11-14): the main run only prepares batches; send-batches.sh (unbound-hq/sync) sends them
#     after it, because ArtifactData writes ask for approval that an unattended run can't give.
#   - The dashboard is reached only through ArtifactData (its database) and the two sync scripts in
#     ../../tools/unbound-hq/sync/. The Artifact tool itself (which can publish or delete pages) is not in
#     ALLOWED, so an unattended run can't use it. It is deliberately not in DENIED either: denying it also
#     hides ArtifactData (tested 2026-11-11).
#   - ANTHROPIC_API_KEY is deliberately NOT exported here, so Claude Code uses the normal login;
#     the npm scripts read .env.local themselves.

set -u
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
unset ANTHROPIC_API_KEY
# ArtifactData only loads when Claude Code thinks it was started from the editor or desktop app; under launchd the
# entrypoint is "cli" and the tool is missing (found 2026-11-15 via the daily indexing run). Unofficial workaround,
# same as tools/unbound-hq/seo/daily-indexing.sh and sync/send-batches.sh.
export CLAUDE_CODE_ENTRYPOINT=claude-vscode

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT" || exit 1
RUNS="$ROOT/operations/kewl-runs"
mkdir -p "$RUNS"
TODAY="$(date +%F)"
MODE="run"; [ "${1:-}" = "--smoke" ] && MODE="smoke"
LOG="$RUNS/$TODAY-$MODE.log"
LOCK="$RUNS/.lock"
MAX_SECONDS=5400

notify() { osascript -e "display notification \"$1\" with title \"French Roofing weekly Kewl\"" >/dev/null 2>&1 || true; }

if ! mkdir "$LOCK" 2>/dev/null; then
  echo "$(date) another run holds $LOCK; exiting" >> "$LOG"; exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT

if [ "$MODE" = "smoke" ]; then
  PROMPT="Plumbing check only. Change nothing, create nothing in Metricool. Do exactly this and report each result on its own line: (1) run: npm run hcp:photos -- --dry-run --since 3  and  npm run drive:intake -- --dry-run  (2) call the Metricool getBrandSettings tool and state the French Roofing brand's timezone  (3) read .claude/skills/fr-weekly-kewl/SKILL.md and state its first heading  (4) run: git status --short  and state how many lines it printed  (5) load ArtifactData with ToolSearch, then call ArtifactData action get, url https://claude.ai/artifact/RrmtYqjjbyXxfGiKZjxSyp, collection meta, doc_id sync, and state its at field  (6) run: node ../../tools/unbound-hq/sync/kewl-sync.mjs --client french-roofing  and state its first line (it only writes local files). If any tool is denied, say which one."
else
  PROMPT="Today is $TODAY. Run the weekly French Roofing Kewl sequence. Read .claude/skills/fr-weekly-kewl/SKILL.md and follow it exactly, start to finish, including the run report at operations/kewl-runs/$TODAY-report.md. This run is unattended: nobody can answer questions. When unsure, hold the item, record why in the report, and continue. Dashboard: in step 6 do the export, reconcile and kewl-sync, but do NOT send the batches with ArtifactData and do NOT run --commit: this run cannot approve database writes, so the wrapper script sends them right after you finish. In the report, say the batches were prepared and are sent by the wrapper."
fi

ALLOWED=(
  "Read" "Glob" "Grep" "Write" "Edit"
  "Bash(npm run hcp:photos:*)" "Bash(npm run -s hcp:photos:*)"
  "Bash(npm run drive:intake:*)" "Bash(npm run -s drive:intake:*)"
  "Bash(npm run kewl:sheets:*)" "Bash(npm run -s kewl:sheets:*)"
  "Bash(npm run kewl:sort:*)" "Bash(npm run -s kewl:sort:*)"
  "Bash(npm run kewl:lint:*)" "Bash(npm run -s kewl:lint:*)"
  "Bash(npm run promote:*)" "Bash(npm run -s promote:*)"
  "Bash(npm run review:posts:*)" "Bash(npm run -s review:posts:*)"
  # Project pages: plan + build drafts only. --publish is deliberately not allowed (Brittany approves first).
  "Bash(npm run projects -- --plan:*)" "Bash(npm run -s projects -- --plan:*)"
  "Bash(npm run projects -- --build:*)" "Bash(npm run -s projects -- --build:*)"
  "Bash(git status:*)" "Bash(git add:*)" "Bash(git commit:*)" "Bash(git log:*)" "Bash(git diff:*)"
  "Bash(ls:*)" "Bash(date:*)"
  "Bash(node ../../tools/unbound-hq/sync/reconcile.mjs:*)" "Bash(node ../../tools/unbound-hq/sync/kewl-sync.mjs:*)"
  "ArtifactData" "ToolSearch"
  "mcp__metricool__getBrandSettings" "mcp__metricool__getScheduledPosts" "mcp__metricool__getBestTimeToPostByNetwork"
  # Brittany's claude.ai Metricool connector on brittany@unbound24.com (2026-11-12): same server, read tools only
  "mcp__claude_ai_Metricool_Social_Media_Management__getBrandSettings"
  "mcp__claude_ai_Metricool_Social_Media_Management__getScheduledPosts"
  "mcp__claude_ai_Metricool_Social_Media_Management__getBestTimeToPostByNetwork"
)
DENIED=(
  "mcp__metricool__createScheduledPost" "mcp__metricool__updateScheduledPost" "mcp__metricool__createScheduledPostForReview"
  "mcp__metricool__sendScheduledPostForReview"
  "mcp__claude_ai_Metricool_Social_Media_Management__createScheduledPost"
  "mcp__claude_ai_Metricool_Social_Media_Management__updateScheduledPost"
  "mcp__claude_ai_Metricool_Social_Media_Management__createScheduledPostForReview"
  "mcp__claude_ai_Metricool_Social_Media_Management__sendScheduledPostForReview"
  "Bash(npm run projects -- --publish:*)" "Bash(npm run -s projects -- --publish:*)"
  "Bash(git push:*)" "Bash(npm run deploy:*)" "Bash(rm:*)" "Bash(curl:*)" "WebFetch" "WebSearch"
)

# Pull French Roofing's Google reviews first (moved before the run 2026-11-18) so the run can turn new ones into review
# posts (skill step 6b). The output goes into the report after the run; the site update is deployed further down.
REVIEWS_OUT="$RUNS/$TODAY-reviews-sync.txt"
if [ "$MODE" = "run" ]; then
  npm run --silent reviews:sync > "$REVIEWS_OUT" 2>&1 || echo "reviews-sync exited non-zero" >> "$REVIEWS_OUT"
fi

{
  echo "=== $(date) weekly-kewl $MODE start ==="
  claude -p "$PROMPT" --permission-mode acceptEdits --allowedTools "${ALLOWED[@]}" --disallowedTools "${DENIED[@]}" &
  CLAUDE_PID=$!
  ( sleep "$MAX_SECONDS"; echo "=== watchdog: still running after ${MAX_SECONDS}s, stopping ==="; kill "$CLAUDE_PID" 2>/dev/null ) &
  WATCHDOG_PID=$!
  wait "$CLAUDE_PID"; STATUS=$?
  kill "$WATCHDOG_PID" 2>/dev/null; wait "$WATCHDOG_PID" 2>/dev/null
  echo "=== $(date) weekly-kewl $MODE end, exit $STATUS ==="
} >> "$LOG" 2>&1

# Publish new Google reviews on frenchroofing.com/reviews (Brittany, 2026-11-18: auto-deploy, review text is Google's
# word for word). Commits ONLY src/data/google-reviews.json and pushes main, and only when every unpushed commit is
# content that doesn't change the site's code (social/, operations/, .claude/, the review file). Anything else
# waiting to go out means a human deploys: the review file stays committed and the report says why.
publish_reviews() {
  local F="src/data/google-reviews.json"
  if git diff --quiet -- "$F"; then echo "No change to the review file; nothing to deploy."; return 0; fi
  if ! node -e 'const d=require("./'"$F"'"); if(!Array.isArray(d.reviews)||!d.reviews.length||!d.count) process.exit(1)'; then
    echo "NOT deployed: $F failed the sanity check (empty or malformed). Left uncommitted."; return 1
  fi
  git commit -q -m "Google reviews: weekly sync $TODAY ($(node -p 'require("./'"$F"'").count') reviews)" -- "$F" || { echo "NOT deployed: commit failed."; return 1; }
  [ "$(git branch --show-current)" = "main" ] || { echo "NOT deployed: repo isn't on main. Review file committed."; return 1; }
  git fetch -q origin main || { echo "NOT deployed: git fetch failed. Review file committed."; return 1; }
  if [ -n "$(git log --oneline main..origin/main)" ]; then echo "NOT deployed: origin/main has commits this Mac doesn't. Review file committed; pull, then deploy."; return 1; fi
  local other
  other="$(git diff --name-only origin/main..main | grep -vE '^(social/|operations/|\.claude/|src/data/google-reviews\.json$|src/data/projects/[^/]+\.json$|public/images/projects/)' || true)"
  # Project pages may go out only as drafts (production hides them); one newly marked published needs Brittany's OK.
  local f
  for f in $(git diff --name-only origin/main..main -- src/data/projects); do
    if git show "main:$f" 2>/dev/null | grep -q '"status": "published"' && ! git show "origin/main:$f" 2>/dev/null | grep -q '"status": "published"'; then
      other="$other $f(published)"
    fi
  done
  if [ -n "$other" ]; then
    echo "NOT deployed: other unpushed changes would go live with it ($(echo "$other" | head -5 | tr '\n' ' ')). Review file committed; deploy by hand once those are OK."; return 1
  fi
  git push -q origin main && echo "Deployed: /reviews now shows $(node -p 'require("./'"$F"'").count') reviews (Vercel builds in about a minute)." || { echo "NOT deployed: git push failed. Review file committed."; return 1; }
}
if [ "$MODE" = "run" ]; then
  {
    echo; echo "## Google reviews (wrapper)"; sed 's/^/    /' "$REVIEWS_OUT" 2>/dev/null
    echo; echo "### Review page"; publish_reviews 2>&1 | sed 's/^/    /'
  } >> "$RUNS/$TODAY-report.md" 2>&1 || true
fi

# Draft project pages (2026-11-18): push main to the projects-preview branch so Vercel builds a preview where drafts
# show, and prepare the dashboard records for the SEO/AEO tab (sent by the 4:10am daily job, which also publishes and
# deploys the drafts Brittany approves there). Production hides drafts, so this step never publishes anything.
if [ "$MODE" = "run" ]; then
  {
    echo; echo "## Project pages (wrapper)"
    if grep -lq '"status": "draft"' src/data/projects/*.json 2>/dev/null; then
      if git push -q -f origin main:projects-preview; then
        echo "    Preview pushed: https://french-roofing-git-projects-preview-bb290s-projects.vercel.app/past-projects (builds in about a minute)"
      else echo "    Preview NOT pushed (git push failed)."; fi
      npm run --silent projects -- --board 2>&1 | sed 's/^/    /'
    else echo "    No draft project pages waiting."; fi
  } >> "$RUNS/$TODAY-report.md" 2>&1 || true
fi

# Send the prepared dashboard batches. The main run can't: ArtifactData writes ask for approval and nobody is there.
# send-batches.sh runs a locked-down Claude (Read + ArtifactData only, bypassPermissions) and records each commit.
SENT="no"
if [ "$MODE" = "run" ]; then
  {
    echo "=== $(date) dashboard send start ==="
    if KEWL_CLIENT=french-roofing "$ROOT/../../tools/unbound-hq/sync/send-batches.sh"; then SENT="yes"; fi
    echo "=== $(date) dashboard send end, sent=$SENT ==="
  } >> "$LOG" 2>&1
  [ -f "$RUNS/$TODAY-report.md" ] && printf '\n## Dashboard send (wrapper)\n\n%s\n' "$([ "$SENT" = yes ] && echo "All batches committed to the Unbound Dashboard." || echo "NOT sent: posts stay ready on disk. Say \"sync the dashboard\" in Claude Code to finish. Details in $TODAY-run.log.")" >> "$RUNS/$TODAY-report.md"
  if [ ! -f "$RUNS/$TODAY-report.md" ]; then notify "Run ended without a report. Check operations/kewl-runs/$TODAY-run.log"
  elif [ "$SENT" = yes ]; then notify "New posts are ready to approve in the Unbound Dashboard. Report: operations/kewl-runs/$TODAY-report.md"
  else notify "Posts are ready but didn't reach the dashboard. Say: sync the dashboard. Report: operations/kewl-runs/$TODAY-report.md"; fi
fi
exit "${STATUS:-1}"
