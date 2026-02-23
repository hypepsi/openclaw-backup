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

必须指出：
- 今日主导因子（若无法明确，写“结构性混合驱动”）

## Continuity & Tracking (Mandatory)

### State Files
- last: `~/.openclaw/workspace/state/hk-tech-close-last.json`
- history: `~/.openclaw/workspace/state/hk-tech-close-history.json`

history 结构（最多7条）每条至少包含：
- `reportTimeHKT`, `closeLevel`, `closeChgPct`, `freshness`, `factorTop3`, `confidence`, `archivePath`

更新规则：
- 新记录插入头部
- 超过7条则裁剪

### 回看规则
- 3日/7日回看基于最近有效样本条目（不是自然日）
- 样本不足时必须明确写出

### 叙事去重
若与上期高度重复：
- 只写：新增变量 + 因子强弱变化 + 失效条件变化

## Archiving Protocol (Mandatory)
每次报告必须归档：
- 目录：`~/.openclaw/workspace/reports/hk-tech/`
- 文件名：`YYYY-MM-DD-close-<epoch>.md`
- 禁止覆盖历史文件

## Output Contract (Telegram)

**📡 数据状态**
- 交易状态：已收盘/未收盘/休市
- 数据新鲜度：今日有效收盘/延迟待确认/历史快照

**🧷 上期基线回放（精简）**
- 上期核心结论（1-2条）
- 本次延续/反转

**🛎️ 收盘快照（仅有效收盘时）**
- HSTECH 收盘点位
- 日涨跌
- 行情时间戳（HKT）

**🗝️ 一句话核心结论**
- 今日由 X 主导，Y 确认/背离，下一交易日看 Z。

**🧠 因子研判（白话）**
- 5因子方向与强度（含必要简写）

**🧮 因子评分与综合偏向**
- 各因子分值（-2~+2）
- 综合分与偏向（偏多/中性/偏空）
- 今日主导因子（或混合驱动）

**🔁 连续跟踪**
- 3日回看
- 7日回看
- 主导因子Top3变化

**🎯 中线结论（6-12个月）**
- 当前中线框架是否变化
- 置信度（高/中/低）
- 失效条件（1-2条）

失效条件模板：
- `若南向连续N日净流出且权重股同步走弱，则当前反弹框架置信度下调一级`
- `若指数跌破关键支撑并连续N日未收复，则中线结构转弱`

**📍 下一交易日观察点**
- 2-4条可验证信号（资金、权重、宏观窗口、关键位）

**📚 数据与证据来源**
- Yahoo HSTECH.HK
- 宏观/资金/政策来源（3-8条）
- 抓取与行情时间戳

## Quality Rules
1. 禁止编造指数点位与贡献点数。
2. 技术层不能单独下结论，至少回连资金/权重/宏观一层。
3. 无新增变量时简写，不得重复上期大段内容。
4. 证据不足必须降级并标明不确定性。
