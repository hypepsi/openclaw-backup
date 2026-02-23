# OpenClaw Backup

一个可恢复、可迁移、已脱敏的 OpenClaw 备份仓库。  
目标不是“存档”，而是“随时能在新机器拉起同款环境”。

## Binary OPENCLAW
```text
  01001111  01010000  01000101  01001110    01000011  01001100  01000001  01010111
  OOOOOOOO  PPPPPPPP  EEEEEEEE  NNNNNNNN    CCCCCCCC  LLLLLLLL  AAAAAAAA  WWWWWWWW
  OO    OO  PP    PP  EE        NN    NN    CC        LL        AA    AA  WW WW WW
  OO    OO  PPPPPPPP  EEEEEE    NN NN NN    CC        LL        AAAAAAAA  WWW WW WW
  OO    OO  PP        EE        NN  N NN    CC        LL        AA    AA  WWWWWWWW
  OOOOOOOO  PP        EEEEEEEE  NN    NN    CCCCCCCC  LLLLLLLL  AA    AA   WW  WW
```

## Why This Repo
- 保留你的 OpenClaw 核心资产：`配置 + cron + 插件 + skills + 数据结构`
- 默认可上 GitHub：敏感字段已脱敏
- 面向重部署：提供可直接执行的恢复与验收命令

## Backup Scope
已包含：
- `.openclaw/openclaw.json`（已脱敏）
- `.openclaw/cron/jobs.json`
- `.openclaw/extensions/`（插件代码）
- `.openclaw/workspace/`（skills、data、docs、scripts、reports）
- `.openclaw/workspace-hooks/`

未包含：
- 明文密钥/令牌
- 运行态日志、队列、会话噪音
- 大体积数据库与临时文件
- `workspace/state/` 实时快照

## Project Layout
```text
.openclaw/
├─ openclaw.json              # 主配置（脱敏）
├─ cron/jobs.json             # 定时任务定义
├─ extensions/                # 自定义插件
├─ workspace/
│  ├─ skills/                 # 业务技能
│  ├─ data/                   # 用户数据（如持仓）
│  ├─ docs/                   # 参考文档
│  ├─ scripts/                # 手工脚本
│  └─ reports/                # 报告样本
└─ workspace-hooks/           # hooks 工作区
```

## One-Click Restore (New Machine)
1. 克隆仓库
```bash
git clone https://github.com/hypepsi/openclaw-backup.git
cd openclaw-backup
```

2. 备份目标机旧环境（如有）
```bash
cp -a ~/.openclaw ~/.openclaw.bak.$(date +%Y%m%d_%H%M%S) || true
```

3. 恢复文件
```bash
rsync -a ./.openclaw/ ~/.openclaw/
```

4. 回填密钥与令牌（必须）
编辑：`~/.openclaw/openclaw.json`

需要回填的关键字段：
- `env.vars.*`
- `channels.telegram.botToken`
- `gateway.auth.token`
- `gateway.remote.token`
- `tools.web.search.apiKey`
- `tools.web.search.perplexity.apiKey`
- `models.providers.deepseek.apiKey`

5. 配置体检
```bash
jq . ~/.openclaw/openclaw.json >/dev/null
jq . ~/.openclaw/cron/jobs.json >/dev/null
openclaw skills list
openclaw plugins info market-data
openclaw cron list
```

6. 启动/重启服务（按你的部署方式）
```bash
systemctl --user restart openclaw-gateway
```

## Post-Restore Acceptance Checklist
- `skills` 能看到你的自定义技能（BTC/黄金/HK科技/基金组合）
- `market-data` 插件状态是 `loaded`
- `cron jobs` 数量与名称正确
- Telegram 可收到一次手动触发任务的推送
- 非交易日分支逻辑正常（不会把旧净值当今日）

## Security Notes
- 这是“结构备份仓库”，不是“密钥仓库”
- 建议仓库保持 Private
- 若误传密钥：立即撤销并重建 Token/API Key

## Versioning Tips
每次做以下变更后，建议提交一次：
- 修改 `SKILL.md`
- 调整 `cron/jobs.json`
- 修改插件代码
- 修改 `openclaw.json` 的模型/工具/插件配置

---
Maintained for reliable OpenClaw migration and fast disaster recovery.
