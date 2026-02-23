#!/usr/bin/env bash
set -euo pipefail

RUN_FILE_0900="$HOME/.openclaw/cron/runs/daeffe2f-a87a-44ae-a5f1-29f18e695bc3.jsonl"
RUN_FILE_1600="$HOME/.openclaw/cron/runs/54bd6d0f-a1e0-44c0-9079-f9053fa8f29f.jsonl"
STATE_FILE="$HOME/.openclaw/workspace/state/gold-last-sent.ts"
HISTORY_FILE="$HOME/.openclaw/workspace/state/gold-market-report-history.json"
ARCHIVE_DIR="$HOME/.openclaw/workspace/reports/gold"
TARGET_CHAT="7223802318"
OPENCLAW_BIN="${OPENCLAW_BIN:-/home/hypepsi/.npm-global/bin/openclaw}"

for f in "$RUN_FILE_0900" "$RUN_FILE_1600"; do
  if [[ ! -f "$f" ]]; then
    echo "run file missing: $f" >&2
    exit 1
  fi
done

last_sent=0
if [[ -f "$STATE_FILE" ]]; then
  last_sent="$(cat "$STATE_FILE" 2>/dev/null || echo 0)"
fi

latest_json="$(jq -s '
  map(select(.status=="ok" and (.summary|type=="string") and (.summary|length>0)))
  | sort_by(.ts)
  | last // empty
' "$RUN_FILE_0900" "$RUN_FILE_1600")"

if [[ -z "$latest_json" || "$latest_json" == "null" ]]; then
  echo "no successful gold summary found"
  exit 2
fi

current_ts="$(printf '%s' "$latest_json" | jq -r '.ts // 0')"
summary="$(printf '%s' "$latest_json" | jq -r '.summary // empty')"
job_id="$(printf '%s' "$latest_json" | jq -r '.jobId // empty')"

if [[ "$current_ts" == "0" || -z "$summary" ]]; then
  echo "invalid gold summary payload"
  exit 3
fi

if [[ "$current_ts" -le "$last_sent" ]]; then
  echo "no new gold summary to send (current_ts=$current_ts last_sent=$last_sent)"
  exit 0
fi

mkdir -p "$ARCHIVE_DIR"
slot="manual"
if [[ "$job_id" == "daeffe2f-a87a-44ae-a5f1-29f18e695bc3" ]]; then
  slot="0900"
elif [[ "$job_id" == "54bd6d0f-a1e0-44c0-9079-f9053fa8f29f" ]]; then
  slot="1600"
fi
epoch_sec=$((current_ts / 1000))
day_tag="$(date -d "@$epoch_sec" +%F)"
archive_file="$ARCHIVE_DIR/${day_tag}-${slot}-${current_ts}.md"
printf '%s\n' "$summary" > "$archive_file"

freshness="$(printf '%s\n' "$summary" | sed -n 's/^- 数据新鲜度：[[:space:]]*//p' | head -n 1)"
[[ -z "$freshness" ]] && freshness="未标注"
price="$(printf '%s\n' "$summary" | sed -n 's/^- 当前价格：[[:space:]]*\([0-9.]\+\).*/\1/p' | head -n 1)"
[[ -z "$price" ]] && price="0"
report_time="$(printf '%s\n' "$summary" | sed -n 's/^- 拉取时间：[[:space:]]*//p' | head -n 1)"
[[ -z "$report_time" ]] && report_time="$(date +'%F %T %Z')"
confidence="中"
if printf '%s\n' "$summary" | rg -q "低置信度"; then
  confidence="低"
fi

new_entry="$(jq -n \
  --arg reportTime "$report_time" \
  --arg freshness "$freshness" \
  --arg confidence "$confidence" \
  --arg archivePath "reports/gold/$(basename "$archive_file")" \
  --argjson price "$price" \
  --argjson factorTop3 '[]' \
  '{reportTime:$reportTime, price:$price, freshness:$freshness, factorTop3:$factorTop3, confidence:$confidence, archivePath:$archivePath}')"

existing_states="[]"
if [[ -f "$HISTORY_FILE" ]]; then
  existing_states="$(jq -c 'if type=="object" and (.history_states|type=="array") then .history_states elif type=="array" then . else [] end' "$HISTORY_FILE" 2>/dev/null || echo "[]")"
fi
updated_states="$(jq -c --argjson item "$new_entry" '. as $arr | [$item] + $arr | .[:7]' <<<"$existing_states")"
jq -n --argjson history_states "$updated_states" '{history_states:$history_states}' > "$HISTORY_FILE"

"$OPENCLAW_BIN" message send --channel telegram --target "$TARGET_CHAT" --message "$summary"
printf '%s\n' "$current_ts" > "$STATE_FILE"
echo "sent ts=$current_ts archive=$archive_file history=$HISTORY_FILE"
