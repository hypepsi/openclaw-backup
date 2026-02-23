# OpenClaw Workspace Layout

## Stable System Files (keep in root)
- `AGENTS.md`
- `BOOTSTRAP.md`
- `HEARTBEAT.md`
- `IDENTITY.md`
- `MEMORY.md`
- `SOUL.md`
- `TOOLS.md`
- `USER.md`
- `skills/`
- `memory/`
- `state/`

## User Data
- `data/portfolio/fund-portfolio-holdings.json`:
  fund holdings source of truth (`code/name/cost/shares`).

## Runtime State (auto-updated)
- `state/btc-daily-report-last.json`
- `state/gold-market-report-last.json`
- `state/hk-tech-close-last.json`

## Scripts
- `scripts/manual/`: manual or experimental scripts.

## Reports
- `reports/manual/`: ad-hoc generated reports.
- `reports/sessions/`: session-level markdown exports.

## Temporary Files
- `tmp/`: temporary drafts and one-off artifacts.

## Docs
- `docs/`: user-imported reference docs.

## Backup Policy
Backups are centralized outside workspace:
- `~/.openclaw/backups/config/`
- `~/.openclaw/backups/cron/`
