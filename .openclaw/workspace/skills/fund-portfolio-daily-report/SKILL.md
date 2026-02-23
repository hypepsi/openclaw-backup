---
name: fund-portfolio-daily-report
description: Generate a daily multi-fund portfolio report in Chinese using local holdings + Eastmoney NAV data, including PnL summary, per-fund diagnosis, and short-term outlook in plain language.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "fund-portfolio-daily-report" } }
---

# Fund Portfolio Daily Report

## Purpose
给“基金爱好者”看的每日组合简报：
- 先说清今天赚/亏多少（数字必须准）
- 再用白话解释为什么
- 最后给出明天/下周要看的重点

## Audience & Style (Mandatory)
1. 对外输出必须“白话优先”，避免术语堆叠。
2. 若必须使用术语（如回撤、估值切换、风格轮动），紧跟一句括号白话解释。
3. 句子短、结论先行、每段最多3-4行。
4. 保持专业判断，但不要写成学术报告。

## Tool-First Data Rule (Mandatory)
先调用：
- `fund_portfolio_daily`

硬约束：
1. 所有数值（净值、涨跌、盈亏）只能来自工具输出。
2. 若 `ok: false`，明确报错并停止分析。
3. 禁止编造任何行情数字。

## Holdings Source (Configured)
- `/home/hypepsi/.openclaw/workspace/data/portfolio/fund-portfolio-holdings.json`

字段：
- `code`, `name`, `cost`, `shares`

## Trading / Calendar Gate (Mandatory)
使用工具字段：
- `validTodayCount`
- `nonTodayCount`
- `marketState`

### A. 交易日且有当日有效数据（`validTodayCount > 0`）
- 输出完整“今日日报”
- 明确哪些基金是“非今日快照”
- 增加 `明日关注`（T+1）

### B. 非交易日或净值未更新（`validTodayCount == 0`）
- 标题必须出现：`🛎️ 今日非交易日或净值未更新`
- 不得下“今天涨跌结论”
- 只输出“最新快照 + 风险提示 + 下周/节后展望”

### C. 周末模式（周六/周日）
- 自动改为“周末复盘/下周展望”口径
- 重点写：下周可能驱动因素、关键验证点

### D. 法定节假日模式（含春节等长假）
- 自动改为“假期观察”口径
- 若为长假，增加“节后首日波动风险提示”（高开低走/补跌补涨两种路径）

## Research Layer (Perplexity web_search)
在数值层完成后，再做解释层搜索（仅解释，不改数字）：

规则：
1. 优先近24-72小时信息。
2. 重要判断尽量2个以上独立来源交叉验证。
3. 如来源冲突，单列 `分歧与不确定性`。
4. 明确区分：`事实` 与 `判断`。

建议检索方向：
- 港股科技、南向资金、人民币汇率
- 创业板/科创50/中证1000风格变化
- 软件服务、卫星产业、政策与流动性

## Core Output Structure (Telegram)

**📡 数据状态**
- 报告日期：YYYY-MM-DD
- 模式：交易日简报 / 非交易日快照 / 周末展望 / 假期观察
- 覆盖情况：成功X只，失败X只，今日有效X只，非今日快照X只

**💼 一句话总结（先看这个）**
- 用1-2句白话说清：今天组合表现 + 最主要原因。

**📊 组合总览（数字）**
- 组合成本总额
- 组合最新市值
- 组合累计盈亏
- 组合当日盈亏
- 今日涨/跌/平家数

**🧾 重点基金（按当日盈亏绝对值前5）**
每只基金给：
- 名称(代码)
- 净值日期 / 单位净值 / 日涨跌%
- 当前市值 / 累计盈亏 / 当日盈亏
- 状态：今日有效 / 非今日快照
- 白话一句：这只今天在组合里“拉升”还是“拖累”

**🧠 白话研判（含置信度）**
- 研判1（高/中/低）
- 研判2（高/中/低）
说明写法：先结论，后原因，尽量不用行话。

**📅 展望**
- 交易日：`明日关注`（1-3条）
- 周中可加：`本周剩余时间关注`（1-3条）
- 周末/节假日：`下周关注`（3条）+ `风险剧本`（基准/风险）

**🛡️ 风险提醒（非投资建议）**
- 只给风控和观察建议，不给明确买卖指令。

**🔎 证据来源（3-6条）**
- [来源] 标题（发布时间）- 支撑了什么判断

## Quality Rules
1. 所有“今日”表述，必须由当日有效数据支撑。
2. 数据旧就直说旧，不要包装成“实时”。
3. 专业内核可以复杂，但对外表达必须让非专业用户看懂。
4. 先结论后细节，避免长段空话。
