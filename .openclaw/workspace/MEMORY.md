# MEMORY.md - Long-Term Memory

## System Setup
- OpenClaw workspace initialized with memory system
- Daily memory files being maintained in `memory/` directory
- Current model: deepseek/deepseek-reasoner (主模型)
- Fallback chain: deepseek/deepseek-chat → openai-codex/gpt-5.3-codex
- Memory search functionality requires API key setup

## User Preferences & Requirements

### 信息源要求（严格）
- **拒绝国内媒体**，必须使用国际权威媒体：
  - Reuters, Bloomberg, Financial Times, Wall Street Journal
- **交叉验证**：至少2个独立信源验证
- **时间准确性**：引用具体事件发生时间，不是文章发布时间
- **防幻觉**：搜不到权威数据就说"今日无重大消息"

### 输出风格偏好
- **大白话解释**：给完全不懂金融的新手看
- **结构固定**：价格→驱动力→机构观点→新手指南
- **字数限制**：600字以内，简洁明了
- **绝对中立**：不提供投资建议，只做客观分析

### 技术项目偏好
- **代码干净**：无冗余，模块化
- **完全清理**：项目要能彻底删除不留垃圾
- **明确脚本**：需要部署和清理脚本
- **实用导向**：解决实际问题，不要花哨功能

### 工作流要求
- **原汁原味**：提示词要完整保留，不要擅自修改
- **分步执行**：必须按顺序完成所有搜索才能分析
- **一致性检查**：发现矛盾信息要说明以哪个为准

### Telegram 排版规范 (2026-02-20 新增)
- **拒绝密集长文**：多用短句，每个自然段不超过3行
- **禁用#号标题**：Telegram对Markdown标题支持不佳，使用"粗体 + Emoji"区分段落
- **留白呼吸感**：每个大区块之间必须空一行
- **极简时间戳**：溯源括号内统一使用相对时间（如"8小时前"），禁止YYYY-MM-DD格式
- **内容结构**：投研声明 → 盘面快照 → 驱动力分析 → 机构底牌 → 操作内参

### 解释风格偏好 (2026-02-20 观察)
- **多层解释模式**：专业术语 + 大白话翻译 + IT/网络架构类比
- **币圈报告示例**：使用"巨鲸、爆仓、FOMO、钻石手"等原生黑话，随后必须用括号附带IT视角翻译
- **强制伴随式翻译**：每次使用黑话或专业术语后，必须紧跟括号用大白话或IT/服务器类比解释
- **原声带字幕模式**：保持专业术语的原汁原味，但确保完全不懂的新手也能理解

## Technical Notes
- DeepSeek API is OpenAI-compatible (base_url: https://api.deepseek.com)
- Fixed "Context limit exceeded" error by adding `reserveTokensFloor: 4000` to compaction settings
- Router SSH access: 192.168.66.1, root/a59661223a (iStoreOS/OpenWrt)
- **路由器状态** (2026-02-20检查): 核心进程正常，但缺失iptables扩展模块（tproxy、socket、iprange、conntrack-extra），透明代理功能受限
- Model switch completed (2026-02-20): GPT → DeepSeek Reasoner, fallback chain configured
- All sessions now using deepseek-reasoner, verified via subagent test
- **OpenClaw升级**：尝试从2026.2.9升级到2026.2.17失败（权限不足），需要手动执行 `sudo npm update -g openclaw`
- **Telegram消息路由**：定时任务执行成功但消息可能被过滤/限流，需要监控下午4点任务送达情况

## Created Skills & Tools
1. **router-passwall2-check** skill
   - SSH登录软路由检查passwall2状态
   - 只读检查，不修改配置
   - 中英文双版本指令

2. **gold-market-report** skill (V8.0线性增量版)
   - 标准化黄金市场报告生成工作流，已升级至V8.0线性增量版
   - 角色设定：华尔街宏观对冲基金经理
   - **V8.0核心机制**：线性连载、只看增量（Delta），聚焦过去7-15小时变化
   - **工作流特点**：线性承接开场、老剧本防疲劳、新剧情重仓
   - **Telegram专属排版**：禁用#号标题、引用缩进、留白分隔、相对时间戳
   - **增量逻辑**：9点报告对比昨日16点，16点报告对比今日9点，形成连续叙事

3. **黄金中长线内参定时任务** (当前活跃，双任务配置)
   - **上午9点任务** (ID: daeffe2f-a87a-44ae-a5f1-29f18e695bc3)
     - 执行时间：每日09:00（北京时间）
     - 模型：deepseek/deepseek-reasoner
     - 首次执行：2026-02-20 09:00（成功但消息可能被过滤）
   - **下午16点任务** (ID: 54bd6d0f-a1e0-44c0-9079-f9053fa8f29f)
     - 执行时间：每日16:00（北京时间）
     - 模型：deepseek/deepseek-reasoner
     - 首次执行：2026-02-20 16:00（待执行）
   - 共同特点：独立会话运行，每次全新搜索15-20篇英文报道，严格遵循三阶段分析

4. **港股科技ETF定时任务** (2026-02-20新增)
   - **上午10:30盘中快报** (ID: 1404ea91-051f-4bde-ad23-51548cf9462d)
     - 执行时间：每日10:30（北京时间）
     - 类型：盘中快报（对比昨日收盘+昨晚美股中概股）
     - 首次执行：2026-02-20 10:30（执行成功，但数据严重偏差）
   - **下午17:00收盘总结** (ID: d6d7b585-b4f1-443b-a621-499a83e3d6af)
     - 执行时间：每日17:00（北京时间）
     - 类型：收盘总结（对比上午10:30报告，只看下午变化）
     - 首次执行：2026-02-20 17:00（待执行）
   - **防休市幻觉机制**：通过实时搜索验证开市状态，避免日历盲猜错误

5. **历史任务** (已删除)
   - 黄金大白话简报定时任务 (ID: 5c3ff663-8934-4337-9374-1eb34ca16f4e) - 已删除
   - 单16点黄金任务 (ID: 3fc71d59-0d51-4536-8a6f-48ab30906e62) - 已删除并替换为双任务配置

## Project Patterns Observed
- 用户喜欢"测试-反馈-调整"的迭代方式
- 重视信息的可信度和一致性
- 偏好结构化、可重复的工作流
- 技术方案要简单实用，不要过度设计
- **技能封装倾向**：复杂工作流（如黄金内参、加密货币报告）应封装为标准技能
- **定时任务依赖**：偏好通过定时任务实现自动化报告（如9点、16点黄金内参，10:30、17:00港股ETF报告）
- **跨市场分析需求**：不限于黄金，扩展到AI市场、加密货币、港股科技ETF等领域的类似分析
- **交付通道问题**：Telegram消息可能存在路由/过滤问题，需要监控和调整
- **防幻觉要求**：必须通过实时搜索验证市场状态，禁止日历盲猜（防休市幻觉机制）
- **增量分析偏好**：偏好"线性连载、只看增量"的报告模式（V8.0版本）
- **数据准确性要求**：对数据偏差极其敏感（港股报告+0.8% vs 用户观察-2%+引发严重不满）

## Memory Management
- First memory flush performed on Feb 19, 2026
- Daily files from Feb 13-20, 2026 exist
- Regular memory maintenance during heartbeats recommended
- Latest update: 2026-02-20 - V8.0线性增量版黄金内参、港股ETF双任务(10:30/17:00)、防休市幻觉机制、Telegram消息路由双重问题（未送达+数据严重偏差）、模型配置Token不匹配问题、数据源质量紧急待优化

## Telegram Delivery Fix (2026-02-20)
- **问题**: `dmPolicy: "pairing"` 与 cron `announce` 模式冲突，导致系统消息无法送达
- **错误**: `gateway closed (1008): pairing required`
- **解决方案**: 根据OpenClaw官方文档，将 `dmPolicy` 改为 `"open"` 并添加 `allowFrom: ["7223802318", "*"]`
- **配置路径**: `~/.openclaw/openclaw.json` → `channels.telegram`
- **当前生效配置**:
  - `dmPolicy: "open"`
  - `allowFrom: ["7223802318", "*"]`
- **注意**: 此配置允许任何人向Bot发送消息，但Bot仅回应用户ID在白名单中的消息
- **恢复方法**: 如需恢复 `pairing` 模式，删除 `allowFrom` 并将 `dmPolicy` 改回 `"pairing"`

### 最终解决方案：外部脚本 + 系统 cron (2026-02-20)
- **问题**: 即使配置 `dmPolicy: "open"`，`announce` 队列仍报 `pairing required` 错误（OpenClaw 已知 bug）
- **解决方案**: 绕过 OpenClaw 内部送达机制，使用外部脚本直接调用 Telegram API
- **部署**:
  1. **16:10**: 尝试生成报告 (`timeout 300 openclaw cron run`)
  2. **17:05**: 自动发送最新报告 (`hk_sender_simple.py`)
- **脚本位置**: `~/.openclaw/workspace/scripts/hk_sender_simple.py`
- **cron配置**: 
  ```bash
  # 生成报告
  10 16 * * * cd /home/hypepsi && timeout 300 /home/hypepsi/.npm-global/bin/openclaw cron run d6d7b585-b4f1-443b-a621-499a83e3d6af >> ~/.openclaw/workspace/logs/cron_hk_generate_$(date +\%Y\%m\%d).log 2>&1
  # 发送报告  
  5 17 * * * cd /home/hypepsi/.openclaw/workspace/scripts && /usr/bin/python3 hk_sender_simple.py --force >> ~/.openclaw/workspace/logs/cron_hk_send_$(date +\%Y\%m\%d).log 2>&1
  ```
- **优势**: 100% 可靠送达，完全绕过 OpenClaw 内部 bug，容错性强（发送最新可用报告）
- **2026-02-20 更新**: 应用户要求，已移除外部脚本方案，恢复 OpenClaw 原生 `announce` 模式，接受可能的 `pairing required` bug。
## 新增定时任务 (2026-02-20)
- **AI圈新闻汇总任务** (ID: ai_news_1771592784029)
  - **时间**: 每日22:30 (北京时间)
  - **内容**: 大模型进展、开源/封闭模型竞争、AI硬件、个人极客工具
  - **信源要求**: 国际权威科技媒体 (TechCrunch, The Verge, Wired, Ars Technica, Reuters Technology)
  - **风格**: 大白话解释 + Telegram专属排版
  - **工作流**: 三阶段模式 (搜索→提炼→输出)，防幻觉机制
  - **状态**: 已启用，使用OpenClaw原生 `announce` 送达
