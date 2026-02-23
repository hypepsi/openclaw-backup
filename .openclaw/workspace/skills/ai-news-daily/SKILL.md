---
name: ai-news-daily
description: Generate daily AI ecosystem news brief with delta focus (past 12-24h), covering models, open-vs-closed competition, AI hardware, and practical builder tools in Telegram-ready format.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "ai-news-daily" } }
---

# AI News Daily Skill

## Purpose
Produce a daily AI/tech ecosystem recap with emphasis on fresh changes in the past 12-24 hours.

## Audience
- Non-technical but curious users
- Builders and practitioners who want practical trend context

## Core Workflow (Mandatory)
1. Collect recent items (12-24h) from multiple independent sources.
2. Filter for real deltas (new facts, not repeated rewrites).
3. Rank top deltas by impact horizon (next 3-6 months).
4. Produce Telegram output with explicit evidence appendix.

## Research Execution Protocol (Mandatory)

- All web research must be executed via OpenClaw agent tools.
- OpenClaw `web_search` is the primary retrieval backend (current provider: Perplexity Sonar).
- Require deep search + cross-source verification before output.
- If web_search is unavailable, explicitly report collection failure and stop.

### Perplexity Deep-Search Rules (Mandatory)
1. Time window gate:
- Default evidence window: past 12-24h.
- Items older than 24h can only be used as background, not as "today delta".

2. Evidence density:
- Each major claim must have at least 2 independent sources when feasible.
- If only 1 source exists, mark as `单源` and reduce confidence.

3. Source metadata:
- For every cited item, include `published_at`, `fetched_at`, and URL.
- If published time is unavailable, explicitly mark `发布时间未知`.

4. Conflict handling:
- If sources disagree, add `分歧点` and do not force a single conclusion.
- Provide current best estimate with confidence downgrade.

5. Fact vs inference split:
- Facts must be directly source-backed.
- Inference must be explicitly labeled and cannot be mixed into fact bullets.

### Stage 1: Delta-focused source search (12-24h)
Search at least 15-20 high-quality recent reports, prioritizing last 12-24h.
Suggested query groups:
1. Model frontier: `GPT Claude Gemini latest update today`, `LLM breakthrough last 24 hours`
2. Open vs closed: `OpenAI vs open source model competition`, `Llama Mistral latest release`
3. Hardware: `NVIDIA AMD Intel AI chip latest`, `AI server/datacenter hardware news`
4. Builder tools: `AI developer tools open source projects`, `local AI setup tools`
5. Industry: `AI funding investment news`, `AI policy regulation update`

### Stage 2: Internal synthesis (no output)
- Separate genuinely new items from repeated narratives.
- Identify top 1-3 changes that matter for next 3-6 months.
- Convert source timing to relative timestamps.

### Stage 3: Telegram output (strict)
Formatting:
- No `#` headers.
- **Bold + Emoji** section headers.
- `>` quote blocks for plain-language explanations.
- Keep whitespace between sections.
- Relative-time citations.

## Output Template

**📡 AI圈新闻工作量声明**  
本次共检索约XX个外文网站，提取并交叉验证XX条有效增量信息，重点覆盖过去12-24小时变化。

**🧱 事实层（可验证）**
• 事实1：...【来源A/B】  
• 事实2：...【来源A/B】  

**🧠 推断层（带置信度）**
• 推断1（高/中/低）：...  
• 推断2（高/中/低）：...

**🤖 大模型战场快照**  
• 核心进展：今日模型侧最重要变化。  
> 技术翻译：用大白话解释为什么重要。

**🔓 开源 vs 封闭：今日战况**  
• 开源阵营：关键更新。  
• 封闭阵营：关键更新。  
> 竞争逻辑：解释双方策略变化。

**💻 AI硬件前线**  
• 芯片/算力更新：关键事实。  
> 现实意义：对用户或产业链的实际影响。

**👨‍💻 个人工具箱增量**  
• 开发者工具/项目：最值得关注项。  
> 实操价值：为什么值得试。

**🚀 今日趋势结论（3-6个月视角）**  
• 趋势摘要：1-2条。  
> 趋势解读：哪些是噪音，哪些可能持续。

**⚖️ 分歧与不确定性**
• 分歧点：...  
• 当前处理：采用哪组证据、为何降级置信度。

**🔎 证据附录（3-8条）**
1. [来源名称] 标题（发布时间：UTC...，检索时间：UTC...）- 用于支撑：...
2. ...

## Quality Rules
1. Use authoritative and timely tech/business sources.
2. Cross-check key claims with at least two independent sources when possible.
3. If no meaningful delta exists, explicitly state `今日无重大增量信息`.
4. No fabricated releases, numbers, or quotes.
5. Web evidence must follow OpenClaw web_search (Perplexity) execution path.
6. Do not fabricate workload counts (`检索XX个来源/XX条信息`); if exact count is unavailable, state `系统未返回精确统计`.
7. Every major claim in the report must map to at least one item in `证据附录`.
8. Claims labeled as "今日增量" must be published within the 24h window, otherwise downgrade to background.
