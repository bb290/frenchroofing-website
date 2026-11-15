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
  "Bash(git push:*)" "Bash(npm run deploy:*)" "Bash(rm:*)" "Bash(curl:*)" "WebFetch" "WebSearch"
)

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

# Pull French Roofing's Google reviews into src/data/google-reviews.json (2026-11-15). Saving doesn't publish: the
# site changes only when Brittany says go. New reviews become a dashboard to-do, sent by the daily indexing job.
if [ "$MODE" = "run" ]; then
  { echo; echo "## Google reviews (wrapper)"; npm run --silent reviews:sync 2>&1 | sed 's/^/    /'; } >> "$RUNS/$TODAY-report.md" 2>&1 || true
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
