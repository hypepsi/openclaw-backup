---
name: gold-market-report
description: Generate gold market daily reports in Chinese for Telegram with strict continuity (09:00/16:00 delta), using GoldAPI as the mandatory XAU/USD price source.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "gold-market-report" } }
---

# Gold Market Daily Report Skill

## Goal
Produce a concise, continuity-first gold report for 09:00 and 16:00 runs.
Primary audience: medium/long-term investors (6-12 months).

## Tool-First Execution (Mandatory)
Must call plugin tool first:
- `market_get_xauusd_snapshot`

If tool returns `ok: false`, explicitly output data failure and stop.
Numeric fields in report must come from tool output.

## Mandatory Data Source (Price)
For XAU/USD spot price and intraday change, use GoldAPI only.

API call:

```bash
curl -sS -X GET 'https://www.goldapi.io/api/XAU/USD' \
  -H "x-access-token: ${GOLDAPI_ACCESS_TOKEN}"
```

Rules:
- Do not use web search to fetch XAU/USD price.
- If `GOLDAPI_ACCESS_TOKEN` is missing or API fails, explicitly output data collection failure and stop.
- Keep the raw response fields needed for report rendering (at least price and daily change fields).

## Extended GoldAPI Data (Recommended)
When available, also use these official GoldAPI endpoints/fields to enrich report quality:

- Daily snapshot endpoint: `https://www.goldapi.io/api/XAU/USD/YYYYMMDD`
- Statistics endpoint: `https://www.goldapi.io/api/stat`

High-value fields from `XAU/USD` response:
- `open_price`, `high_price`, `low_price`, `prev_close_price`
- `ch`, `chp` (absolute and percent daily move)
- `ask`, `bid` (for spread/liquidity proxy)
- `price_gram_24k`, `price_gram_22k`, `price_gram_21k`, `price_gram_20k`, `price_gram_18k`
- `timestamp`, `metal`, `currency`, `exchange`

Derived metrics (recommended):
- Intraday range `%` = `(high_price - low_price) / open_price`
- Spread basis points = `(ask - bid) / price * 10000`
- Versus previous close `%` and absolute delta

Degrade rule:
- If any optional field is missing, do not fail the report.
- Explicitly note: `部分扩展字段不可用，已按基础字段降级输出`.

## Continuity Protocol (Mandatory)
- 09:00 report baseline: previous day 16:00 report.
- 16:00 report baseline: same-day 09:00 report.
- Always include:
  - 2-4 baseline bullets
  - what changed since baseline
  - what did not change

Baseline retrieval order:
1. Previous cron run record for this job.
2. Local continuity snapshot file: `~/.openclaw/workspace/state/gold-market-report-last.json`.
3. If both unavailable, explicitly state `基线不可用，已降级为单次快照解读`.

If baseline is unavailable, state this explicitly and continue with best-effort analysis using current available data.

## Date Validity Hard Gate (Mandatory)
Successful fetch does not mean "today valid".

Determine one status before narrative:
- `今日有效快照`: market timestamp date equals report date (local timezone used in output).
- `延迟待确认`: timestamp near current session but freshness uncertain.
- `历史快照（非今日）`: timestamp date is not today (including weekend/holiday carry-over).

If status is `历史快照（非今日）`:
- forbid "今日增量变化" as confirmed same-day conclusion,
- output "最近可得快照解读",
- explicitly mention non-today timestamp in first block.

## Output Contract (Telegram)
Use this exact structure:

**📡 数据状态**
- GoldAPI 拉取状态：成功/失败
- 报告时点：09:00 或 16:00
- 数据新鲜度：今日有效/延迟待确认/历史快照（非今日）

**🧷 上期基线回放**
- ...

**⏱️ 当前金价快照（XAU/USD）**
- 当前价格：... 美元/盎司
- 相对上期变化：上涨/下跌 ... 美元（...%）
- 日内变化：...%
- 日内区间（OHLC）：Open ... / High ... / Low ... / Prev Close ...

**🧮 微结构补充（可选）**
- 点差（ask-bid）：...（... bps）
- 克价参考（24K/22K/18K）：... / ... / ...

**🔍 本次增量变化**
- 变化1
- 变化2
- 变化3

**🧠 中线解读（6-12个月）**
- 维持不变的主线
- 本次新增变量对中线的影响

**📚 价格数据来源**
- goldapi.io (`https://www.goldapi.io/api/XAU/USD`)
- 拉取时间：<本次拉取时间>
- 行情时间戳（UTC）：...
- 行情时间戳（本地）：...

## Quality Rules
- Chinese only, Telegram-ready.
- No fabricated numbers.
- If API data is incomplete, state uncertainty explicitly.
- Keep style direct and non-promotional.
- Source-time fields are mandatory: source endpoint + fetch time + market timestamp (UTC and local). Missing any item is non-compliant.
- Never label as "today change" when timestamp date is not today.

## Notes for Scheduled Jobs
- This skill is designed for isolated cron sessions.
- Cron prompt should only instruct invoking this skill plus continuity context (09:00 vs 16:00).
