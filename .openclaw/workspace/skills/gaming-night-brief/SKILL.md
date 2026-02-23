---
name: gaming-night-brief
description: Generate a nightly gaming industry brief across mobile, console, PC and platform ecosystems with plain-language interpretation, trend context, and forward-looking watchpoints.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "gaming-night-brief" } }
---

# Gaming Night Brief

## Purpose
Produce a bedtime gaming report that is news-first but insight-driven:
- What happened in the last 24h (priority to last 12h)
- Why it matters for players, creators, and publishers
- What may happen next (near-term watchlist)

## Coverage Scope (Mandatory)
Each report should cover multiple ecosystems whenever meaningful updates exist:
- Mobile (including TapTap and major mobile publishers)
- Console (PS5/Xbox/Nintendo)
- PC/platform (Steam/Epic/major launcher trends)
- Industry events and pipelines (showcases, event windows, lineup signals)

## Core Workflow (Mandatory)
1. Gather multi-platform deltas (mobile/console/PC/platform) from 12-24h sources.
2. Remove PR noise and keep only 3-5 meaningful changes.
3. For each change, mark evidence strength and who is impacted.
4. Output with scorecard + evidence appendix + next-day validation points.

## Research Execution Protocol (Mandatory)

- All web research must be executed via OpenClaw agent tools.
- OpenClaw `web_search` is the primary retrieval backend (current provider: Perplexity Sonar).
- Require deep search + cross-source verification before output.
- If web_search is unavailable, explicitly report collection failure and stop.

### Perplexity Deep-Search Rules (Mandatory)
1. Time window gate:
- Delta window is past 12-24h by default.
- Older updates can be used as trend context only, not "tonight change".

2. Evidence density:
- Every top change should have at least 2 independent sources when feasible.
- Single-source items must be labeled `单源未完全证实`.

3. Source metadata:
- Each cited item must include `published_at`, `fetched_at`, and URL.
- If publication time is unknown, mark `发布时间未知`.

4. Conflict handling:
- If outlet claims conflict (e.g., launch timing, sales, DAU), include `分歧点` and avoid definitive numbers.
- Keep confidence conservative for rumor-heavy topics.

5. Fact vs inference split:
- Facts = source-backed updates.
- Inference = platform strategy interpretation and short-term impact guess, explicitly labeled.

### Continuity protocol (mandatory)
- Compare against previous-night briefing:
1. What remained the same trend
2. What changed tonight
3. Which segment got hotter/colder
- If previous report is unavailable, state this explicitly.

### Stage 1: Multi-platform source search
Search 18-30 sources; avoid single-platform bias.
Prioritize:
1. Official announcements / publisher statements
2. Platform stores/rankings and event updates
3. Reputable game media and industry analysis
4. Community signal only as secondary evidence (not primary facts)

### Stage 2: Signal extraction (internal)
- Separate real updates from PR noise.
- Pick top 3-5 meaningful deltas.
- For each delta, identify stakeholder impact:
  - Players
  - Developers/studios
  - Platforms/publishers

### Stage 3: Telegram output (strict)
- No `#` headers.
- Use **Bold + Emoji** section headers.
- Use `>` for plain-language explanations.
- Keep sections compact and skimmable.
- Use relative-time citations.

## Output Template

**📡 游戏圈晚报工作量声明**  
本次检索约XX个来源，交叉验证XX条有效增量信息（重点覆盖过去12-24小时）。

**🧱 事实层（可验证）**
• 事实1：...【来源A/B】  
• 事实2：...【来源A/B】  

**🧠 推断层（带置信度）**
• 推断1（高/中/低）：...  
• 推断2（高/中/低）：...

**🎮 今晚最值得看的三条变化**  
• 变化1：一句话  
• 变化2：一句话  
• 变化3：一句话（可选）

**🔁 昨晚 vs 今晚变化**  
• 延续趋势：...  
• 新增变量：...  
• 热度迁移：移动端 / 主机端 / PC端（谁升温，谁降温）

**🧠 大白话拆解：为什么这条新闻会出现**  
**事件A**  
• 表面新闻：...  
• 本质驱动：商业策略 / 发行节奏 / 平台博弈 / 成本压力  
> 大白话：把行业术语翻译成普通玩家也能懂的话。

**🕹️ 分平台影响地图**  
• TapTap/手游：...  
• 主机（PS5/Xbox/Nintendo）：...  
• PC/Steam/Epic：...

**📊 平台热度记分板（0-5）**
• 手游：X/5（依据：...）  
• 主机：X/5（依据：...）  
• PC平台：X/5（依据：...）

**🧪 信息置信度标注**
• 变化1：已证实 / 多源一致 / 单源未证实  
• 变化2：...

**⚖️ 分歧与不确定性**
• 分歧点：...  
• 当前处理：为何降低置信度/暂不下定论。

**📅 前瞻清单（未来1-4周）**  
• 需盯的发布会/测试节点：...  
• 可能引发二次波动的变量：...

**✅ 明日验证点（防空话）**
1. 若...发生，则今天判断被验证/被否证  
2. 若...未发生，则下调结论置信度

**🧭 睡前一页纸结论**  
• 今晚最重要一句话：...  
• 明天值得继续追踪的信号：...

**🔎 证据附录（3-8条）**
1. [来源名称] 标题（发布时间：UTC...，检索时间：UTC...）- 用于支撑：...
2. ...

## Quality Rules
1. Facts first; clearly label inference.
2. Avoid rumor-led conclusions unless clearly marked `未证实`.
3. No fabricated release dates, sales numbers, or quote attribution.
4. If little changed, explicitly state `今晚游戏圈无重大增量`.
5. Web evidence must follow OpenClaw web_search (Perplexity) execution path.
6. Do not fabricate workload counts; if exact count is unavailable, state `系统未返回精确统计`.
7. Every top change must have at least one corresponding source in `证据附录`.
8. Anything older than 24h must be marked as background, not tonight delta.
