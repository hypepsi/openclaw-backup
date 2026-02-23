#!/usr/bin/env bash
set -euo pipefail

HISTORY_FILE="$HOME/.openclaw/workspace/state/hk-tech-close-history.json"
STATE_FILE="$HOME/.openclaw/workspace/state/hk-tech-last-sent.archive"
TARGET_CHAT="7223802318"
OPENCLAW_BIN="${OPENCLAW_BIN:-/home/hypepsi/.npm-global/bin/openclaw}"

if [[ ! -f "$HISTORY_FILE" ]]; then
  echo "history file missing: $HISTORY_FILE" >&2
  exit 1
fi

last_sent_archive=""
if [[ -f "$STATE_FILE" ]]; then
  last_sent_archive="$(cat "$STATE_FILE" 2>/dev/null || true)"
fi

latest_archive_rel="$(jq -r '.[0].archivePath // empty' "$HISTORY_FILE")"
if [[ -z "$latest_archive_rel" ]]; then
  echo "no archivePath found in history"
  exit 2
fi

latest_archive_abs="$HOME/.openclaw/workspace/${latest_archive_rel}"

if [[ ! -f "$latest_archive_abs" ]]; then
  echo "archive file missing: $latest_archive_abs" >&2
  exit 3
fi

if [[ "$latest_archive_rel" == "$last_sent_archive" ]]; then
  echo "no new archive to send (archivePath=$latest_archive_rel)"
  exit 0
fi

summary="$(cat "$latest_archive_abs")"
if [[ -z "$summary" ]]; then
  echo "archive content is empty"
  exit 4
fi

"$OPENCLAW_BIN" message send --channel telegram --target "$TARGET_CHAT" --message "$summary"
printf '%s\n' "$latest_archive_rel" > "$STATE_FILE"
echo "sent archivePath=$latest_archive_rel"
