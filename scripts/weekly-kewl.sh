#!/bin/bash
# weekly-kewl.sh
#
# Runs the fr-weekly-kewl skill unattended: Housecall Pro photos + Drive intake -> sort -> promote -> caption
# review -> Metricool DRAFTS. Fired every Wednesday by the LaunchAgent in operations/launchd/.
# Brittany reviews and approves the drafts in Metricool; nothing here can publish.
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
#   - Metricool access is create + read only. updateScheduledPost is NOT allowed, so a run can
#     never overwrite something Brittany edited or approved.
#   - ANTHROPIC_API_KEY is deliberately NOT exported here, so Claude Code uses the normal login;
#     the npm scripts read .env.local themselves.

set -u
export PATH="/opt/homebrew/bin:$HOME/.local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
unset ANTHROPIC_API_KEY

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
  PROMPT="Plumbing check only. Change nothing, create nothing in Metricool. Do exactly this and report each result on its own line: (1) run: npm run hcp:photos -- --dry-run --since 3  and  npm run drive:intake -- --dry-run  (2) call the Metricool getBrandSettings tool and state the French Roofing brand's timezone  (3) read .claude/skills/fr-weekly-kewl/SKILL.md and state its first heading  (4) run: git status --short  and state how many lines it printed. If any tool is denied, say which one."
else
  PROMPT="Today is $TODAY. Run the weekly French Roofing Kewl sequence. Read .claude/skills/fr-weekly-kewl/SKILL.md and follow it exactly, start to finish, including the run report at operations/kewl-runs/$TODAY-report.md. This run is unattended: nobody can answer questions. When unsure, hold the item, record why in the report, and continue."
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
  "mcp__metricool__getBrandSettings" "mcp__metricool__getScheduledPosts"
  "mcp__metricool__createScheduledPost" "mcp__metricool__getBestTimeToPostByNetwork"
)
DENIED=(
  "mcp__metricool__updateScheduledPost" "mcp__metricool__createScheduledPostForReview"
  "mcp__metricool__sendScheduledPostForReview"
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

if [ "$MODE" = "run" ]; then
  if [ -f "$RUNS/$TODAY-report.md" ]; then notify "Drafts are ready to review in Metricool. Report: operations/kewl-runs/$TODAY-report.md"
  else notify "Run ended without a report. Check operations/kewl-runs/$TODAY-run.log"; fi
fi
exit "${STATUS:-1}"
