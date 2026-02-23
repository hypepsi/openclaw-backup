---
name: btc-daily-report
description: Generate a daily BTC market brief in Chinese. BTC/USD market data and indicators must come from Twelve Data; news/context should use OpenClaw web_search (Perplexity) with deep verification.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "btc-daily-report" } }
---

# BTC Daily Report Skill

## Goal
Produce one daily BTC report that is data-first, complete, and Telegram-ready.
Audience: medium/long-term holders (6-12 months) who still need daily regime-change awareness.

## Tool-First Execution (Mandatory)
Must call plugin tool first:
- `market_get_btc_quote`

If tool returns `ok: false`, explicitly report data failure and stop.
Numeric fields in report must come from tool output (or transparently computed from Twelve Data candles when available).

## Mandatory Data Source (Twelve Data)
All BTC numeric market data must come from Twelve Data API (not web pages).

Required base endpoints:

```bash
# spot price
curl -sS "https://api.twelvedata.com/price?symbol=BTC/USD&apikey=${TWELVEDATA_API_KEY}"

# intraday candles (freshness + structure)
curl -sS "https://api.twelvedata.com/time_series?symbol=BTC/USD&interval=1min&outputsize=240&apikey=${TWELVEDATA_API_KEY}"

# multi-timeframe context
curl -sS "https://api.twelvedata.com/time_series?symbol=BTC/USD&interval=1h&outputsize=72&apikey=${TWELVEDATA_API_KEY}"
curl -sS "https://api.twelvedata.com/time_series?symbol=BTC/USD&interval=1day&outputsize=60&apikey=${TWELVEDATA_API_KEY}"
```

Optional indicator endpoints (if available in current plan):

```bash
curl -sS "https://api.twelvedata.com/rsi?symbol=BTC/USD&interval=1h&time_period=14&apikey=${TWELVEDATA_API_KEY}"
curl -sS "https://api.twelvedata.com/macd?symbol=BTC/USD&interval=1h&apikey=${TWELVEDATA_API_KEY}"
curl -sS "https://api.twelvedata.com/bbands?symbol=BTC/USD&interval=1h&time_period=20&sd=2&apikey=${TWELVEDATA_API_KEY}"
```

Hard rules:
- Do not use web search/web pages to obtain BTC quote numbers.
- If `TWELVEDATA_API_KEY` is missing or base endpoints fail, explicitly report data failure and stop.
- All reported numeric values must map to Twelve Data response fields or be transparently computed from Twelve Data candles.

## What to Extract (not only current price)
At minimum include these data blocks:

1. **Spot + freshness**
- latest price
- latest quote/candle timestamp (UTC + local)
- stale check status

2. **24h structure**
- 24h high/low/range
- 24h absolute and percentage move
- direction regime (trend / range / squeeze)

3. **Volume and volatility context**
- recent 24h aggregated volume proxy from candles (if volume available)
- short-term volatility proxy (range %, or std proxy from 1h candles)

4. **Technical regime (if endpoint/plan supports)**
- RSI(1h)
- MACD state (above/below signal, histogram direction)
- Bollinger location (upper/mid/lower band proximity)

If indicator endpoints are unavailable, explicitly state "指标接口不可用" and fallback to candle-derived logic.

## Market-State Guardrails (Crypto-specific)
BTC is 24/7. Never use stock-style "收盘定局" phrasing.

Freshness checks:
1. If latest timestamp older than 10 minutes -> `⚠️ 行情可能延迟`.
2. If timestamp/price unchanged vs last run snapshot -> `⚠️ 与上次抓取无变化`.
3. If both hit -> downgrade confidence and avoid strong intraday claims.
4. If latest market date (UTC and local) is not today -> `⚠️ 历史快照（非今日）`.

When status is `历史快照（非今日）`:
- do not write "今日主导变量" as confirmed facts,
- switch to "最近可得快照解读",
- keep wording conservative and explicit.

Snapshot requirement (mandatory for freshness comparison):
- Persist last run snapshot to `~/.openclaw/workspace/state/btc-daily-report-last.json`.
- Minimum fields: `fetch_time_utc`, `price`, `latest_candle_time_utc`, `data_status`.
- If snapshot file does not exist, state `首次运行，暂无上次快照对比`.

## Research Protocol (News/Catalysts)
- News/catalyst layer should use OpenClaw `web_search` (Perplexity) with deep cross-source verification.
- Cross-check at least 2 independent sources for major catalysts.
- Separate facts from inference.

## Teaching Layer (Daily Learning)
Purpose: help the reader learn BTC concepts while reading the report, using terms that actually appeared in today's analysis.

Rules:
1. Pick 1-2 terms from today's report only (examples: RSI, MACD, 布林带收口, 假突破, 支撑位, 阻力位, 波动率).
2. For each term, provide:
- one-line definition
- plain-language translation (`大白话`)
- how this term was used in today's BTC context
- one common misunderstanding to avoid
3. Keep each term explanation short and practical; avoid textbook paragraphs.
4. If the report has no clear technical term, teach one core term tied to today's structure judgment.

## Output Contract (Telegram)
Use this structure:

**📡 数据状态**
- Twelve Data 拉取状态：成功/失败
- 数据新鲜度：新鲜/延迟/与上次无变化/历史快照（非今日）

**₿ BTC 行情总览（BTC/USD）**
- 当前价格：...
- 24h 变化：... / ...%
- 24h 区间：... - ...
- 行情时间戳（UTC）：...
- 行情时间戳（本地）：...

**📈 结构与波动**
- 当前结构：趋势/震荡/压缩
- 波动代理：...
- 成交活跃度：...

**🧪 技术指标状态**
- RSI(1h)：...
- MACD(1h)：...
- 布林带(1h)：...
- 若不可用，明确写：`指标接口不可用，已用K线结构替代判断`

**🧭 当日主导变量（3-5条）**
1. ...
2. ...
3. ...

**🧠 中线解读（6-12个月）**
- 结构性主线是否改变
- 今日变量是噪音还是趋势强化
- 需要盯的风险触发点

**🎓 今日术语小课（1-2个）**
1. 术语：...
- 一句话定义：...
- 大白话：...
- 今天怎么用它看盘：...
- 常见误区：...
2. 术语：...
- 一句话定义：...
- 大白话：...
- 今天怎么用它看盘：...
- 常见误区：...

**🗺️ 明日学习动作（最多2条）**
1. 新手动作：...
2. 进阶动作：...

**📚 数据来源**
- Twelve Data price: `https://api.twelvedata.com/price?symbol=BTC/USD`
- Twelve Data candles: `https://api.twelvedata.com/time_series?symbol=BTC/USD`
- API 拉取时间（UTC）：...
- API 拉取时间（本地）：...
- 行情时间戳（UTC）：...
- 行情时间戳（本地）：...

## Quality Rules
1. No fabricated numbers.
2. If timestamp/field validity is uncertain, state uncertainty explicitly.
3. Keep concise, factual, non-promotional tone.
4. Never present BTC as a stock close report.
5. Teaching content must be tied to today's report terms; no detached generic lessons.
6. Plain-language explanation is mandatory for each taught term.
7. Source-time fields are mandatory: endpoint URLs + fetch time (UTC/local) + market timestamp (UTC/local). Missing any item is non-compliant.
8. Never infer "today market state" from a successful fetch alone; date-validity check is mandatory.

## Notes for Cron
- Cron prompt should explicitly call this skill.
- Keep session isolated.
