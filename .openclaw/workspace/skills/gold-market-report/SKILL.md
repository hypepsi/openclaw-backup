---
name: gold-market-report
description: Generate professional gold market daily reports in Chinese for Telegram with strict continuity, adaptive factor analysis, and unique report archiving.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "gold-market-report" } }
---

# Gold Market Report 3.1

## Goal
输出“可追溯、可连续跟踪、可长期稳定运行”的黄金日报。
不是价格播报，而是因子驱动研判。

## Tool-First Rules (Mandatory)
先调用：
- `market_get_xauusd_snapshot`

如果 `ok: false`：
- 明确写价格数据失败并停止。

硬约束：
1. XAU/USD 数值只能来自 GoldAPI（通过插件工具）。
2. `web_search` 仅用于解释层，不得改写 GoldAPI 数值。
3. 任何“今日变化”必须通过时间戳校验。

## Price Source (Mandatory)
唯一价格源：`https://www.goldapi.io/api/XAU/USD`

报告必须写出：
- 价格源
- 拉取时间
- 行情时间戳（UTC + 本地）

## Macro/Flow Data Reliability Rules (Mandatory)
GoldAPI 不提供以下字段：10Y、DXY、GLD 持仓。
这些必须通过 `web_search` 获取，但要降噪：

1) 定向来源优先级：
- 第一优先：Reuters / Bloomberg / TradingView
- 第二优先：CNBC / WSJ / Investing / Kitco
- GLD 持仓可用基金官方或主流金融媒体引用

2) 时间戳约束：
- 每个宏观/资金结论都要写“发布时间或数据时间”
- 默认优先 24h 内；若无则允许 `最近可得`（见下）

3) 双来源约束：
- 关键判断尽量双来源
- 做不到时标注 `低置信度`

## Professional Analysis Stack (Mandatory, But Adaptive)
必须检查四层；若无新增变量可简写“延续上期，无显著增量”。

### 1) 宏观驱动层
优先覆盖：
- 美国10Y收益率
- 美元指数 DXY
- Fed口径 / CPI-PCE-非农窗口

输出：方向（利多/中性/利空）+ 强度（1-5）+ 证据。

### 2) 资金行为层
优先覆盖：
- 黄金ETF流向（如 GLD 持仓）
- 风险偏好变化（避险/风险资产）

输出：是否支持当前黄金方向 + 较上期强化/减弱。

### 3) 叙事与情绪层
- 最近24-72小时核心叙事 2-4 条
- 冲突必须写 `分歧与不确定性`

### 4) 技术与结构层（轻量）
- 支撑/阻力
- 趋势/震荡/压缩
- 必须回连宏观与资金层，不得孤立技术结论。

## Adaptive Stability Rules (Mandatory)

### A. 数据降级（最近可得）
若宏观或ETF在近24小时无更新：
- 允许使用最近可得交易日数据
- 标注：`最近可得：YYYY-MM-DD`
- 置信度下调一级

禁止因为单个解释因子缺失而整份报告停摆。

### B. 证据不足降级
若关键判断无法双来源：
- 标注 `低置信度`
- 写明证据不足点
- 不输出强结论语气

### C. 增量优先
若某层无实质新增：
- 允许简写 `延续上期，无显著增量`
- 正文优先写新增变量和强弱变化

## Continuity & Tracking (Mandatory)

### Baseline Rules
- 09:00 对比：前一交易日 16:00
- 16:00 对比：当日 09:00

基线来源顺序：
1. `~/.openclaw/workspace/state/gold-market-report-history.json`（优先）
2. `~/.openclaw/workspace/state/gold-market-report-last.json`
3. 若都无：`基线不可用，降级为单次快照`

### History State File (Mandatory)
为了节省上下文并稳定 3日/7日回看，禁止每次读取大量旧 md。
优先使用：`~/.openclaw/workspace/state/gold-market-report-history.json`

要求结构（示例）：
- `history_states`: 最近最多 7 条（数组）
- 每条最少包含：`reportTime`, `price`, `freshness`, `factorTop3`, `confidence`, `archivePath`

更新规则：
- 新增本次记录到头部
- 长度超过7则裁剪

### 3日 / 7日回看
每次报告必须包含：
- 3日回看：主导因子是否连续
- 7日回看：方向是否切换

样本不足时必须明确写出，不得硬下结论。

### 主导因子排序 Top3（新增）
每次必须输出：
- 因子名
- 方向
- 强度（1-5）
- 较上期：强化/减弱/不变

### Narrative De-duplication
当叙事重复：
- 禁止重复大段旧内容
- 只写：新增变量 + 因子强弱变化 + 失效条件变化

## Archiving Protocol (Mandatory)
每次报告必须归档：
- 目录：`~/.openclaw/workspace/reports/gold/`
- 文件名：`YYYY-MM-DD-0900-<epoch>.md` 或 `YYYY-MM-DD-1600-<epoch>.md`

规则：
- 禁止覆盖已有文件
- 重跑必须生成新文件（唯一命名）

并更新状态：
- `~/.openclaw/workspace/state/gold-market-report-last.json`
- `~/.openclaw/workspace/state/gold-market-report-history.json`

## Date/Freshness Gate (Mandatory)
先判定：
- `今日有效快照`
- `延迟待确认`
- `历史快照（非今日）`

若为 `历史快照（非今日）`：
- 禁止写“今日驱动已确认”
- 只能写“最近可得快照 + 下一时段观察点”

## Time Determinism
- 报告时间基准优先使用调度注入时间和工具返回时间戳。
- 本地时间一律按 `Asia/Shanghai` 展示。
- 若本地时间与行情时间不一致，以行情时间戳为事实基准，并明确标注。

## Output Contract (Telegram)

**📡 数据状态**
- GoldAPI 拉取状态
- 报告时点（09:00/16:00）
- 数据新鲜度（今日有效/延迟待确认/历史快照）

**🧷 上期基线回放（精简）**
- 上期核心结论（1-2条）
- 本次延续/反转

**⏱️ 当前金价快照（XAU/USD）**
- 当前价格
- 相对上期变化（绝对值 + %）
- 日内变化
- OHLC / 区间

**🧠 四层研判（白话）**
- 宏观驱动（方向+强度）
- 资金行为（支持/背离）
- 叙事情绪（新增变量）
- 技术结构（关键位）

**🔁 连续跟踪**
- 3日回看
- 7日回看
- 主导因子排序 Top3（方向+强度+变化）

**🎯 中线结论（6-12个月）**
- 主线是否变化
- 置信度（高/中/低）
- 失效条件（1-2条）

失效条件固定模板：
- `若 <变量A> 突破/跌破 <阈值> 并持续 <N> 个交易日，则当前框架失效/降级`
- `若 <资金或叙事指标> 连续 <N> 日反向，则结论置信度下调一级`

**📍 下一时段观察点**
- 2-4条可验证信号

**📚 数据与证据来源**
- goldapi.io endpoint
- 宏观/资金/新闻来源（3-8条）
- 拉取时间与行情时间戳（UTC + 本地）

## Quality Bar
1. 不允许空泛建议（无因子证据的“观望/保持仓位”）。
2. 无新增变量时必须简写，不得凑字数重复。
3. 关键判断证据不足时必须降级为低置信度。
4. 对外必须白话；对内因子逻辑必须可追溯。
5. 归档必须唯一命名，禁止覆盖历史。
