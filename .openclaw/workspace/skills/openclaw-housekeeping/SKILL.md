---
name: openclaw-housekeeping
description: Weekly housekeeping for OpenClaw files (tmp, old reports, runs, sessions, backups) with dry-run/apply modes.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "🧹", "skillKey": "openclaw-housekeeping" } }
---

# OpenClaw Housekeeping

## Purpose
每周清理临时和过时文件，防止目录持续膨胀。

## Script Path
- `~/.openclaw/workspace/scripts/housekeeping/openclaw-housekeeping.sh`

## Run Modes
- `dry-run`：只列出将删除内容（默认）
- `apply`：实际删除

## Execution
使用 shell 执行：

```bash
~/.openclaw/workspace/scripts/housekeeping/openclaw-housekeeping.sh dry-run
```

或：

```bash
~/.openclaw/workspace/scripts/housekeeping/openclaw-housekeeping.sh apply
```

## Cleanup Policy
- `workspace/tmp/`：保留 7 天
- `workspace/reports/gold/`：保留 180 天
- `cron/runs/`：保留 30 天
- `agents/*/sessions/*.jsonl`：保留 45 天
- `backups/config` 和 `backups/cron`：每类保留最新 50 个

## Output
- 每次运行写日志到：`~/.openclaw/workspace/reports/ops/housekeeping-*.md`
