# OpenClaw Session Record (2026-02-21)

## Scope
This note records todays changes, the current operating mode, and the official OpenClaw recommendations that these changes follow.

## Current Operating Mode (Single Agent)
- Single agent only: `main` is default.
- Gmail hook uses official Gmail preset (`hooks.presets: ["gmail"]`) and `hooks.mappings` with `action: "agent"` and a custom summary template.
- Telegram DMs remain in `pairing` mode with `allowFrom` set to the user ID.

## What Was Changed Today
1) Gmail hook path normalized to official preset + mapping
   - `hooks.presets: ["gmail"]`
   - `hooks.mappings[0]` contains `action: "agent"`, `wakeMode: "now"`, `sessionKey: "hook:gmail:{{messages[0].id}}"`, `deliver: true`, `channel: "telegram"`, `to: "7223802318"`, and a custom `messageTemplate` that includes summary + reply draft.

2) Single-agent mode restored
   - `agents.list` now contains only `main` with `default: true`.
   - Telegram bindings removed so all inbound messages route to the default agent.

3) Pairing-required gateway issue fixed
   - Local device pairing had a pending request (`~/.openclaw/devices/pending.json`).
   - Approved the pending device request and merged scopes into `paired.json`.
   - Restarted the gateway; `openclaw gateway status` now shows `RPC probe: ok`.

4) Removed hooks-specific workspace instructions
   - Deleted `/home/hypepsi/.openclaw/workspace-hooks/AGENTS.md`.
   - We are now running everything in the main workspace only.

## Why These Changes Align With Official Guidance
- Gmail PubSub guidance recommends enabling the Gmail preset and using `hooks.mappings` for delivery to a chat surface. This is exactly how Gmail push is configured now.
- Multi-agent routing is optional; using a single default agent is valid and simpler when not needed.
- Pairing-required errors are addressed by approving device pairing requests via `openclaw devices list/approve` or equivalent device pairing flow.
- Telegram DM access is controlled by `dmPolicy` and `allowFrom`, which remains in `pairing` for safety.

## Known Behaviors and Risks
- If duplicate notifications reappear, it may be due to model/tool-call behavior when a single agent handles hooks. If this happens:
  - Test with a different model (e.g., GLM-5) for the Gmail hook path.
  - Keep the summary template but consider an even more constrained prompt if repeated sends return.

- If `gateway status` shows `pairing required` again:
  - This is likely a new pending device request (not Telegram DM pairing).
  - Check pending devices and approve.

## Official References (URLs)
- Gmail PubSub: see `https://docs.openclaw.ai/automation/gmail-pubsub`
- Multi-agent routing: see `https://docs.openclaw.ai/multi-agent`
- Device pairing + troubleshooting `pairing required`: see `https://docs.openclaw.ai/pairing` and `https://docs.openclaw.ai/cli/devices`
- Telegram DM policy: see `https://docs.openclaw.ai/telegram` and `https://docs.openclaw.ai/gateway/configuration`
- Agent workspace files: see `https://docs.openclaw.ai/agent-workspace`

## Verification Steps (for future checks)
- Check gateway RPC:
  - `openclaw gateway status`
- Check device pairing:
  - `openclaw devices list`
- Check Telegram pairing requests (if DM issues):
  - `openclaw pairing list telegram`
