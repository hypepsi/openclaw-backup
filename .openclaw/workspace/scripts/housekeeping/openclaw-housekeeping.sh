#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-dry-run}"  # dry-run | apply
NOW_TS="$(date '+%Y-%m-%d %H:%M:%S %Z')"
REPORT_DIR="$HOME/.openclaw/workspace/reports/ops"
LOG_FILE="$REPORT_DIR/housekeeping-$(date '+%Y-%m-%d-%H%M%S').md"
mkdir -p "$REPORT_DIR"

run_rm() {
  local target="$1"
  if [ "$MODE" = "apply" ]; then
    rm -rf -- "$target"
  fi
}

print_action() {
  local msg="$1"
  echo "- $msg" | tee -a "$LOG_FILE"
}

echo "# OpenClaw Housekeeping" > "$LOG_FILE"
echo "- Time: $NOW_TS" >> "$LOG_FILE"
echo "- Mode: $MODE" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

echo "## Targets" >> "$LOG_FILE"

# 1) workspace tmp: keep 7 days
while IFS= read -r f; do
  [ -n "$f" ] || continue
  print_action "tmp remove: $f"
  run_rm "$f"
done < <(find "$HOME/.openclaw/workspace/tmp" -type f -mtime +7 2>/dev/null || true)

# 2) gold reports: keep 180 days
while IFS= read -r f; do
  [ -n "$f" ] || continue
  print_action "gold report remove: $f"
  run_rm "$f"
done < <(find "$HOME/.openclaw/workspace/reports/gold" -type f -mtime +180 2>/dev/null || true)

# 3) cron runs: keep 30 days
while IFS= read -r f; do
  [ -n "$f" ] || continue
  print_action "cron run remove: $f"
  run_rm "$f"
done < <(find "$HOME/.openclaw/cron/runs" -type f -mtime +30 2>/dev/null || true)

# 4) agent sessions: keep 45 days
while IFS= read -r f; do
  [ -n "$f" ] || continue
  print_action "session remove: $f"
  run_rm "$f"
done < <(find "$HOME/.openclaw/agents" -type f -path '*/sessions/*.jsonl' -mtime +45 2>/dev/null || true)

# 5) backups: keep latest 50 each folder
for d in "$HOME/.openclaw/backups/config" "$HOME/.openclaw/backups/cron"; do
  [ -d "$d" ] || continue
  mapfile -t old_files < <(ls -1t "$d" 2>/dev/null | tail -n +51)
  for f in "${old_files[@]:-}"; do
    [ -n "$f" ] || continue
    print_action "backup remove: $d/$f"
    run_rm "$d/$f"
  done
done

echo "" >> "$LOG_FILE"
echo "- Done." >> "$LOG_FILE"
echo "$LOG_FILE"
