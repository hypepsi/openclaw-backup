---
name: hk-tech-close-report
description: Generate a factor-driven Hong Kong tech close report (HSTECH) with strict close validity, continuity tracking, and unique archiving.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "📦", "skillKey": "hk-tech-close-report" } }
---

# HK Tech Close Report 3.0

## Goal
输出“收盘有效性 + 因子驱动 + 连续跟踪”的港股科技收盘日报。
不是新闻拼接，而是可追溯的状态机输出。

## Two-Pass Generation Pipeline (Mandatory)
必须执行两段式生成：
1. `Pass A (State Build)`: 先在内部构建结构化状态对象（JSON 语义，不对外展示）
2. `Pass B (Render)`: 只能基于 Pass A 的字段渲染 Telegram 文本

禁止在 Pass B 引入 Pass A 不存在的新数字、新评分、新结论。
若 Pass A 任一关键字段缺失，必须先补齐后再渲染。

Pass A 最小字段集（内部）：
- `trade_status`, `freshness`, `snapshot_match`
- `quote.level`, `quote.chg_pct`, `quote.ts_hkt`
- `one_liner`
- `factors.discount_rate|southbound|weights|policy|risk_sentiment`
  - 每项必须有：`score`(仅 -2,-1,0,1,2), `direction`, `strength`, `evidence`
- `score.sum_expr`, `score.total`, `score.bias`, `score.dominant_factor`
- `tracking.lookback_3`, `tracking.lookback_7`, `tracking.top3_change`
- `midline.framework`, `midline.confidence`, `midline.invalidators`
- `next_watch[]`
- `sources[]`

## Tool-First Execution (Mandatory)
必须先调用：
- `market_get_hstech_quote`

该工具是指数数值真相源，并落盘：
- `~/.openclaw/workspace/state/hk-tech-close-last.json`

禁止在工具返回前写任何 HSTECH 点位/涨跌数字。

## Primary Quote Source (Mandatory)
指数数值源：Yahoo HSTECH.HK（通过插件工具）。
- 页面：`https://finance.yahoo.com/quote/HSTECH.HK/`

规则：
1. HSTECH 点位/涨跌只能来自工具返回。
2. web_search 可解释驱动，不得改写指数数值。
3. 若指数数据失败：明确失败并停止。

## Close Validity Gate (Mandatory)
先判定其一：
- `今日有效收盘`
- `延迟/待确认`
- `历史快照（非今日）`

时间基准硬规则：
- 所有时间判断必须基于 `Asia/Hong_Kong`（HKT, UTC+8）。
- 若当日行情时间戳在 12:00 后停止更新且非周末，可判定为“半日市有效收盘”。
- 若当日行情时间戳在 16:00 后停止更新且非周末，可判定为“常规有效收盘”。
- 若为香港公众假日/台风停市，必须输出“今日休市”并停止收盘归因研判。

若 `历史快照（非今日）`：
- 禁止输出“今日收盘结论”
- 禁止输出“今日定局推手”
- 只能输出状态 + 最近可得解读 + 下一交易日观察点

## Factor-Driven Research Engine (Mandatory, Adaptive)
收盘有效后，必须做 5 因子检查；无新增可简写“延续上期，无显著增量”。

### 1) 估值贴现率因子（Discount Rate Block）
至少检查：
- US 10Y yield
- DXY
- 美股风险偏好（纳指/中概隔夜情绪）

输出：方向（利多/中性/利空）+ 强度（1-5）+ 数据时间。

### 2) 南向资金因子（Southbound Flow Block）
至少检查：
- 南向净买入/净卖出方向
- 是否集中在港科权重（如腾讯/阿里/美团）

输出：支持/背离 + 强度（1-5）+ 数据时间。

南向资金搜索防污染规则：
- 检索优先：HKEX 官方披露，其次主流金融终端/媒体快讯（同花顺、东方财富、Reuters、Bloomberg 等）。
- 强制校验发布日期/数据日期为当日；若非当日，必须标注 `最近可得`。
- A股同名主题或历史旧闻不得作为当日南向资金结论依据。

### 3) 权重股结构因子（Weight Contribution Block）
关注名单（默认）：
- Tencent / Alibaba / Meituan / JD / Xiaomi / Kuaishou

输出：
- 今日拉动Top2与拖累Top2（基于涨跌与叙事证据，不得编贡献点数）
- 结构判断：权重主导 / 扩散修复 / 混合驱动

### 4) 政策叙事因子（Policy/Narrative Block）
关注：
- 平台经济监管
- AI/半导体政策
- 中美监管与中概审计叙事

输出：方向 + 强度 + 是否与资金因子一致。

### 5) 风险情绪因子（Risk Sentiment Block）
关注：
- 亚洲风险偏好
- VIX/避险情绪线索（可得时）

输出：风险偏好日/避险日 + 强度。

## Data Reliability Rules (Mandatory)

### A. 定向来源优先级
- 资金/政策/宏观：Reuters / Bloomberg / WSJ / CNBC 优先
- 权重行情辅助：Yahoo / TradingView / Investing（至少其一）

### B. 双来源与去重
- 关键判断尽量双来源
- 同一通讯社转载链不算双来源
- `官方数据源 + 媒体解读` 可算双来源

### C. 缺失降级
- 若某因子数据缺失：
  `该因子本次缺失，降级为观察项，不参与主导因子排序`
- 禁止因单因子缺失导致整份报告停摆

## Factor Scoring (Mandatory)
每个因子给分：`-2 ~ +2`
- `+2` 明显利多港科
- `+1` 轻度利多
- `0` 中性
- `-1` 轻度利空
- `-2` 明显利空

综合分 = 5因子求和，输出倾向：
- `>= +3`：偏多
- `-2 ~ +2`：中性/混合驱动
- `<= -3`：偏空

算术自证规则（防模型算错）：
- 必须显示计算等式：
  `综合分 = 因子1 + 因子2 + 因子3 + 因子4 + 因子5 = X`
- 若等式无法写出，则不得输出综合偏向结论。
- 严禁使用 `x/5`、`4/5` 等未授权评分格式。

必须指出：
- 今日主导因子（若无法明确，写“结构性混合驱动”）

## Continuity & Tracking (Mandatory)

### State Files
- last: `~/.openclaw/workspace/state/hk-tech-close-last.json`
- history: `~/.openclaw/workspace/state/hk-tech-close-history.json`

执行要求：
- 必须显式读取 `hk-tech-close-history.json` 后再写 3日/7日回看。
- 若 history 文件不存在或损坏，明确降级并标注样本不足。

history 结构（最多7条）每条至少包含：
- `reportTimeHKT`, `closeLevel`, `closeChgPct`, `freshness`, `factorTop3`, `confidence`, `archivePath`

更新规则：
- 新记录插入头部
- 超过7条则裁剪

### 回看规则
- 3日/7日回看基于最近有效样本条目（不是自然日）
- 样本不足时必须明确写出
- 若“上期样本日期 == 本期报告日期”，则 `🧷 上期基线回放` 必须写为：
  - `同日基线（测试/重复触发）`
  - `本次为同日更新，不使用“延续/反转”字眼，改为“同日补充/同日修订”`

### 叙事去重
若与上期高度重复：
- 只写：新增变量 + 因子强弱变化 + 失效条件变化

## Archiving Protocol (Mandatory)
每次报告必须归档：
- 目录：`~/.openclaw/workspace/reports/hk-tech/`
- 文件名：`YYYY-MM-DD-close-<epoch>.md`
- 禁止覆盖历史文件

## Math Execution Rule (Mandatory)
输出前必须先在内部完成一次机械校验：
1. 5因子分值是否都在 `-2, -1, 0, 1, 2`
2. 是否出现任何 `/5` 评分格式（若出现，整段重写）
3. 综合分是否严格等于5因子加总
4. Pass B 中的分值、综合分、主导因子必须与 Pass A 完全一致

## Output Contract (Telegram)

## Formatting Contract (Mandatory)
整体排版必须规整统一，并优先适配 Telegram 移动端阅读：
1. 每个区块标题必须带 emoji，格式统一为：`【📡 数据状态】`（方括号 + emoji + 中文标题）。
2. 区块之间必须空一行；禁止大段连续文本。
3. 列表统一使用 `- `，不混用 `•`、`*` 或数字编号（除非该区块明确要求编号）。
4. 数值展示统一：`名称：值（时间）`，百分号前不加空格。
5. 每个专业结论后必须紧跟一行 `大白话：...`，用普通投资者能懂的表达。
6. 因子区块每条固定两行：`专业判断：...` + `大白话：...`，禁止只写术语。
7. 关键结论行前使用 `✅/⚠️/❗` 之一做视觉标记；同一区块最多使用 2 次，避免花哨堆叠。
8. 报告开头必须先给一行“封面摘要”，格式：
   `📈 恒生科技收盘简报 | YYYY-MM-DD | 今日偏向：偏多/中性/偏空`
9. 报告结尾必须给一行“行动提示”，格式：
   `🧭 行动提示：本报告用于研究复盘，不构成投资建议。`
10. 禁止输出 markdown 一级标题（`# 标题`）和代码块，避免 Telegram 展示不稳定。

**【📡 数据状态】**
- 交易状态：已收盘/未收盘/休市
- 数据新鲜度：今日有效收盘/延迟待确认/历史快照
- 大白话：一句话说明“今天能不能把这份报告当作当天收盘结论看”。

**【🧷 上期基线回放（精简）】**
- 上期核心结论（1-2条）
- 本次延续/反转
- 若同日样本：改为“同日基线（测试/重复触发）+ 同日补充/修订”
- 大白话：一句话说明“这次和上条相比到底变了什么”。

**【🛎️ 收盘快照（仅有效收盘时）】**
- HSTECH 收盘点位
- 日涨跌
- 行情时间戳（HKT）
- 大白话：一句话说明“今天收盘是强还是弱”。

**【🗝️ 一句话核心结论】**
- 今日由 X 主导，Y 确认/背离，下一交易日看 Z。
- 大白话：把 X/Y/Z 翻译成“谁在推涨跌、明天看什么信号”。

**【🧠 因子研判（白话）】**
- 5因子方向与强度（含必要简写）
- 每个因子必须包含：
  - `专业判断：...`
  - `大白话：...`

**【🧮 因子评分与综合偏向】**
- 各因子分值（-2~+2）
- 综合分与偏向（偏多/中性/偏空）
- 今日主导因子（或混合驱动）
- 大白话：解释“综合分高/低代表什么，不等于直接交易指令”。

**【🔁 连续跟踪】**
- 3日回看
- 7日回看
- 主导因子Top3变化
- 大白话：解释“最近几次报告的大方向是在加强还是变弱”。

**【🎯 中线结论（6-12个月）】**
- 当前中线框架是否变化
- 置信度（高/中/低）
- 失效条件（1-2条）
- 大白话：解释“现在这个判断什么时候还成立，什么时候要改口”。

失效条件模板：
- `若南向连续N日净流出且权重股同步走弱，则当前反弹框架置信度下调一级`
- `若指数跌破关键支撑并连续N日未收复，则中线结构转弱`

**【📍 下一交易日观察点】**
- 2-4条可验证信号（资金、权重、宏观窗口、关键位）
- 大白话：每条观察点都要说明“看到了意味着什么”。

**【📚 数据与证据来源】**
- Yahoo HSTECH.HK
- 宏观/资金/政策来源（3-8条）
- 抓取与行情时间戳
- 大白话：一句话说明“哪些是硬数据，哪些是解释层”。

## Few-Shot Style Anchor (Mandatory)
输出风格必须贴近以下“骨架”，但数值必须以当次真实数据替换：

```text
📡 数据状态
- 交易状态：已收盘
- 数据新鲜度：今日有效收盘

🧷 上期基线回放
- 上期核心结论：资金偏强但权重分化
- 本次延续/反转：延续，风险偏好抬升

🛎️ 收盘快照
- HSTECH：xxxx.xx
- 日涨跌：+x.xx%
- 行情时间：YYYY-MM-DD HH:mm:ss HKT

🗝️ 一句话核心结论
今日由南向资金主导，权重结构确认，下一交易日看资金连续性。

🧠 因子研判
1. 估值贴现率因子：...
2. 南向资金因子：...
3. 权重结构因子：...
4. 政策叙事因子：...
5. 风险情绪因子：...

🧮 因子评分与综合偏向
- 估值贴现率：0
- 南向资金：+2
- 权重结构：+1
- 政策叙事：0
- 风险情绪：+1
- 综合分：0 + 2 + 1 + 0 + 1 = 4
- 综合偏向：偏多，主导驱动力为资金与权重共振

🔁 连续跟踪
- 3日回看：...
- 7日回看：...
- 主导因子Top3变化：...

🎯 中线结论（6-12个月）
- 框架判断：...
- 置信度：中
- 失效条件：...

📍 下一交易日观察点
- ...
- ...

📚 数据与证据来源
- ...
```

## Anti-Boilerplate Guardrails (CRITICAL)
1. 输出结束于 `📚 数据与证据来源`，不得追加结尾段落。
2. 严禁出现“投资有风险”“仅供参考”“交叉核对”“总体而言”等模板化废话。
3. 严禁给出具体交易动作指令（如“立即加仓/减仓/梭哈”）。
4. 若任一硬规则不满足：整段重写，不得带错输出。

## Section Completeness Gate (CRITICAL)
最终输出前必须逐项自检以下标题是否全部出现；缺任意一项则重写：
1. `📡 数据状态`
2. `🧷 上期基线回放`
3. `🛎️ 收盘快照`（非收盘日可写“非收盘快照模式”）
4. `🗝️ 一句话核心结论`
5. `🧠 因子研判`
6. `🧮 因子评分与综合偏向`
7. `🔁 连续跟踪`
8. `🎯 中线结论（6-12个月）`
9. `📍 下一交易日观察点`
10. `📚 数据与证据来源`

若输出中出现 `🛠️ 因子引擎分析` 等未授权替代标题，视为不合格并重写。

## Render Contract (CRITICAL)
1. 只允许输出 10 个授权区块，顺序固定，不得增删：
   `📡` -> `🧷` -> `🛎️` -> `🗝️` -> `🧠` -> `🧮` -> `🔁` -> `🎯` -> `📍` -> `📚`
2. `🧮` 区块必须出现显式等式：`综合分 = a + b + c + d + e = X`
3. `🧮` 区块必须包含：各因子分值、综合分、综合偏向、主导因子
4. `📚` 之后立即停止，不得输出任何附加语句

## Quality Rules
1. 禁止编造指数点位与贡献点数。
2. 技术层不能单独下结论，至少回连资金/权重/宏观一层。
3. 无新增变量时简写，不得重复上期大段内容。
4. 证据不足必须降级并标明不确定性。
