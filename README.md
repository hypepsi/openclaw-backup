# openclaw-backup

OpenClaw 配置与工作区备份（已脱敏，可安全上 GitHub）。

## 包含内容
- `.openclaw/openclaw.json`（已脱敏）
- `.openclaw/cron/jobs.json`
- `.openclaw/extensions/`（插件代码）
- `.openclaw/workspace/`（skills、data、docs、scripts、reports）
- `.openclaw/workspace-hooks/`

## 不包含内容
- 真实密钥与令牌（已打码）
- 运行态日志与队列
- 大体积会话/数据库文件
- `workspace/state/` 实时快照

## 脱敏字段
- `env.vars.*`
- `channels.telegram.botToken`
- `gateway.auth.token`
- `gateway.remote.token`
- `tools.web.search.apiKey`
- `tools.web.search.perplexity.apiKey`
- `models.providers.deepseek.apiKey`

## 恢复步骤
1. 将仓库拉到目标机。
2. 用你自己的真实密钥/令牌填回 `.openclaw/openclaw.json`。
3. 同步到运行目录：

```bash
rsync -a ./.openclaw/ ~/.openclaw/
jq . ~/.openclaw/openclaw.json >/dev/null
jq . ~/.openclaw/cron/jobs.json >/dev/null
```

## 说明
本仓库用于结构备份与迁移，不直接包含生产密钥。
