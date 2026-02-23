---
name: geopolitics-night-brief
description: Generate a nightly geopolitical risk brief with root-cause analysis, historical background, and market impact mapping in plain Chinese for non-specialists.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "geopolitics-night-brief" } }
---

# Geopolitics Night Brief

## Purpose
Produce a bedtime geopolitical brief that not only reports headlines but explains:
- Why this event happened
- Historical roots behind current conflict
- Possible next-step scenarios
- Practical impact on markets and daily life
- What changed vs yesterday's briefing

## Core Method (Mandatory)
Use a fixed four-step method every run:
1. Capture 12-24h deltas from reputable international sources.
2. Reconstruct root cause and history for top events.
3. Separate facts vs inference line by line.
4. Close with scenarios + market/life impact + evidence appendix.

## Research Execution Protocol (Mandatory)

- All web research must be executed via OpenClaw agent tools.
- OpenClaw `web_search` is the primary retrieval backend (current provider: Perplexity Sonar).
- Require deep search + cross-source verification before output.
- If web_search is unavailable, explicitly report collection failure and stop.

### Perplexity Deep-Search Rules (Mandatory)
1. Time window gate:
- Default delta window: past 12-24h.
- Older material is background only and must be labeled as such.

2. Evidence density:
- Each key geopolitical event should be supported by at least 2 independent sources when possible.
- Single-source event must be marked `单源待确认`.

3. Source metadata:
- Every key citation must include `published_at`, `fetched_at`, and URL.
- Missing publication time must be marked `发布时间未知`.

4. Conflict handling:
- If official statements and media reports diverge, explicitly add `分歧点`.
- Keep base-case conservative and lower confidence.

5. Fact vs inference split:
- Event facts and attribution facts must be source-grounded.
- Scenario inference must be explicitly labeled and cannot be presented as confirmed fact.

### Continuity protocol (mandatory)
- If previous-night report exists, add a `昨晚 vs 今晚变化` block:
1. What remained unchanged (structural baseline)
2. What is new (past 12-24h delta)
3. Whether risk level is upgraded/downgraded/unchanged
- If previous-night report is not available, state this explicitly and continue with best-effort delta analysis.

### Stage 1: Event search (last 24h, prioritize last 12h)
Search 12-20 high-quality reports about major geopolitical developments:
- great-power relations
- Middle East flashpoints
- sanctions/export controls
- shipping chokepoints and energy routes
- military escalation/de-escalation signals

### Stage 2: Root-cause + history reconstruction
For top 1-3 events, explain with a fixed ladder:
1. Immediate trigger (today/this week)
2. Structural cause (security, economy, alliance, domestic politics)
3. Historical background (key timeline points in 3-6 bullets)
4. Why now (timing factors)
5. What mainstream reports missed (if any blind spot is identifiable)

If user asks “为什么会有这个新闻”，this section is mandatory and must be expanded.

### Stage 3: Scenario + impact mapping
For each key event:
- Base case (most likely, near-term)
- Risk case (tail risk)
- De-escalation case

Map impacts to:
- energy/commodities
- shipping/inflation
- global equities/risk appetite
- China/HK/US market sensitivity

## Telegram Output Format (Strict)
- No `#` headers
- Use **Bold + Emoji**
- Use `>` for plain-language explanation
- Keep sections short and scannable
- Relative-time citations

## Output Template

**📡 地缘晚报工作量声明**  
本次检索约XX篇国际报道，提炼XX条有效增量信息（重点覆盖过去12-24小时）。

**🧱 事实层（可验证）**
• 事实1：...【来源A/B】  
• 事实2：...【来源A/B】  

**🧠 推断层（带置信度）**
• 推断1（高/中/低）：...  
• 推断2（高/中/低）：...

**🌍 今晚三件大事（先结论）**  
• 事件A：一句话  
• 事件B：一句话  
• 事件C：一句话（可选）

**🔁 昨晚 vs 今晚变化**  
• 不变的底层逻辑：...  
• 新增变量：...  
• 风险等级：上调 / 下调 / 不变（给一句理由）

**🧠 为什么会有这个新闻（根因+历史）**  
**事件A**  
• 直接触发：...  
• 结构性原因：...  
• 历史渊源（时间线）：...  
> 大白话解读：把复杂地缘逻辑翻译成普通人能懂的话。

**📈 可能怎么演化（情景推演）**  
• 基准情景：...  
• 风险情景：...  
• 缓和情景：...

**⚖️ 分歧与不确定性**
• 分歧点：...  
• 当前处理：为何采用当前基准情景与置信度。

**💹 市场与生活影响地图**  
• 原油/黄金/航运：...  
• 美股/港股/风险资产：...  
• 普通人最相关影响：...

**🧭 睡前一页纸结论**  
• 今晚最该盯的变量：...  
• 明天需要关注的信号：...

**🔎 证据附录（3-8条）**
1. [来源名称] 标题（发布时间：UTC...，检索时间：UTC...）- 用于支撑：...
2. ...

## Quality Rules
1. Prefer authoritative international media and official statements.
2. Distinguish fact vs inference explicitly.
3. No sensationalism, no fabricated claims.
4. If evidence is weak, mark uncertainty clearly.
5. Web evidence must follow OpenClaw web_search (Perplexity) execution path.
6. Do not fabricate workload counts; if exact count is unavailable, state `系统未返回精确统计`.
7. Every key event in the report must map to at least one item in `证据附录`.
8. Anything outside 24h window cannot be labeled as tonight delta.
