---
name: hk-tech-close-report
description: Generate a Hong Kong tech market close report for HSTECH-heavy investors using Yahoo HSTECH.HK as the primary quote source, with strict market-state and stale-data checks.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "hk-tech-close-report" } }
---

# HK Tech Close Report Skill

## Purpose
Produce a close-only recap for Hong Kong tech market (HSTECH-oriented), emphasizing final close data, key drivers, and medium-term holding context.

## Tool-First Execution (Mandatory)
Must call plugin tool first:
- `market_get_hstech_quote`

This tool is the numeric truth source for the report and already persists stale-check snapshot:
- `~/.openclaw/workspace/state/hk-tech-close-last.json`

Do not write HSTECH numbers before tool result is returned.

## Primary Quote Source (Mandatory)
Underlying canonical source remains Yahoo HSTECH:
- `https://finance.yahoo.com/quote/HSTECH.HK/`

Recommended machine-readable endpoint (same symbol, same source family):
- `https://query1.finance.yahoo.com/v7/finance/quote?symbols=HSTECH.HK`

Rules:
- HSTECH index level/涨跌幅 must come from `market_get_hstech_quote` output (Yahoo-backed).
- Output must include a data-source section explicitly naming Yahoo URL above.
- If Yahoo quote cannot be fetched, explicitly report failure and stop (no fabricated close).

## Market-State and Stale-Data Guardrails (Mandatory)
Before analysis, determine trading status using quote fields + Hong Kong time:

Key fields to inspect (if available):
- `regularMarketPrice`
- `regularMarketChangePercent`
- `regularMarketTime`
- `marketState`

Decision logic:
1. If HKEX is holiday/weekend or quote `marketState` indicates closed and latest market timestamp is not today (Asia/Hong_Kong), output:
   - `🛎️ 交易状态：今日港股休市/非交易日`
   - Skip "today close" narrative.
2. If current HK time is before close (16:00 HKT) and market not closed, output:
   - `🛎️ 交易状态：尚未收盘`
   - Do not present final close verdict.
3. If market is closed but `regularMarketTime` is stale (not today HK date for a weekday expected to trade), output:
   - `⚠️ 行情时间戳疑似停留在上次收盘，暂不做今日收盘结论`
4. Only when data is clearly today-close valid, generate full close recap.

## Date Validity Hard Gate (Mandatory)
Never treat fetched data as "today close" by default. Determine one of:
- `今日有效收盘`:
  `regularMarketTime` (HK date) is today and market is closed.
- `延迟/待确认`:
  timestamp is near today but close validity is not fully confirmed.
- `历史快照（非今日）`:
  timestamp HK date is not today, or holiday/weekend carry-over.

If status is `历史快照（非今日）`:
- forbid "今日收盘定局推手" narrative,
- forbid "今日涨跌结论",
- output only status + concise risk note.

## Cross-Check Against Last Capture (Mandatory)
To avoid misreading "old close" as "today close":
- Compare current `regularMarketTime` and price against last captured snapshot from previous run.
- If timestamp unchanged across runs during expected trading progression, flag as stale-risk.
- In output, explicitly state whether this run is:
  - `今日新收盘数据`
  - or `沿用上次收盘数据（非今日新收盘）`

Snapshot requirement:
- Persist last valid quote snapshot to `~/.openclaw/workspace/state/hk-tech-close-last.json`.
- Minimum fields: `fetch_time_hkt`, `regularMarketTime`, `regularMarketPrice`, `marketState`.
- If no previous snapshot exists, explicitly state `首次运行，暂无上次快照对比`.

## Core Workflow

### Stage 1: Validate quote first
- Fetch Yahoo HSTECH quote.
- Determine market/trade status using guardrails above.
- If not valid today-close, output status + short note and stop deep close attribution.

### Stage 2: Gather context drivers (only after quote validity)
- Southbound flow and major weights (Tencent/Alibaba/Meituan etc.)
- Key macro/policy/news catalysts
- Keep cross-source verification for drivers, but do not override Yahoo close quote.

### Stage 3: Telegram output
Formatting rules:
- No `#` headers.
- Use **Bold + Emoji** section headers.
- Use `>` quote blocks for plain-language logic.
- Keep whitespace between major blocks.

## Output Template

**📡 数据状态**
- 交易状态：已收盘 / 尚未收盘 / 休市
- 数据新鲜度：今日新收盘 / 延迟待确认 / 历史快照（非今日）

**🛎️ 今日收盘真实快照（仅在有效收盘时）**
- 恒生科技指数：XXXX 点
- 日涨跌：X.XX%
- 行情时间戳（HK）：YYYY-MM-DD HH:mm

**🆕 深度拆解：今日定局推手**
1. ...
2. ...

**💡 中线持仓内参（6-12个月）**
- 今日收盘是否改变中线逻辑
- 中线纪律与风险点

**📚 行情数据来源**
- Yahoo Finance HSTECH.HK: `https://finance.yahoo.com/quote/HSTECH.HK/`
- 拉取时间（本地）：...
- 行情时间戳（Yahoo）：...

## Quality Rules
1. No fabricated index values.
2. If close validity cannot be confirmed, state uncertainty and stop final-close conclusion.
3. Keep objective tone; no direct investment advice.
4. Separate "quote facts" from "cause attribution".
5. "Fetched successfully" does not imply "today valid"; date-validity gate is mandatory.
