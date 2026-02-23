---
name: openclaw-self-heal
description: Diagnose and fix OpenClaw gateway/channel configuration problems by reading local official docs under ~/.npm-global/lib/node_modules/openclaw/docs first, then applying minimal verified fixes.
user-invocable: true
homepage: https://docs.openclaw.ai/tools/skills
metadata: { "openclaw": { "emoji": "🛠️", "skillKey": "openclaw-self-heal", "requires": { "bins": ["openclaw"] } } }
---

# OpenClaw Self-Heal

## When to use
Use this skill when the user asks to troubleshoot, verify, or fix OpenClaw issues such as:
- `pairing required`
- gateway auth/token problems
- Telegram DM policy and allowlist problems
- device pairing (`devices pending/approve`)
- gateway status/probe failures

## Required workflow
1) Confirm docs root first (local official docs only):
- Preferred: `~/.npm-global/lib/node_modules/openclaw/docs`
- Fallback: `$(npm root -g)/openclaw/docs`

2) Collect facts before diagnosis:
- Run `{baseDir}/scripts/collect-diagnostics.sh`
- Do not infer root cause before reading command output.

3) Read local docs that match the observed error:
- Always start with:
  - `gateway/troubleshooting.md`
  - `gateway/configuration.md` (or `zh-CN/gateway/configuration.md`)
  - `channels/pairing.md` (or `zh-CN/channels/...` equivalent if needed)
- If the issue is Telegram DM access, read `channels/telegram.md`.
- If the issue is dashboard/browser 1008, also read `web/control-ui.md` and `install/docker.md`.

Official source policy:
- Primary source is local bundled docs under `.../openclaw/docs` (same version as installed CLI).
- If local docs are missing/ambiguous, consult `https://docs.openclaw.ai` for the same topic page and say this explicitly.
- When local docs and website differ, prefer the website for behavior explanation but report the version mismatch.

4) Classify the issue explicitly (pick one primary):
- `gateway-auth`: token/password handshake mismatch
- `dm-pairing`: sender not approved under channel DM policy
- `device-pairing`: node/device pending approval
- `runtime/network`: gateway process/listener/connectivity mismatch

5) Propose the smallest safe fix:
- Prefer config key-level changes (`openclaw config set ...`) over broad rewrites.
- Never suggest deleting large config sections as first choice.
- Keep security posture: do not recommend `dmPolicy: open` unless user explicitly asks for open access.

Permission gate (mandatory):
- Before any state-changing action, ask for explicit user approval first.
- State-changing actions include (not exhaustive): `openclaw config set/unset`, `openclaw gateway restart/start/stop/install`, approvals (`pairing approve`, `devices approve`), file edits, service restarts.
- If user is testing/validating behavior, run in read-only mode: diagnose + propose plan only, execute nothing.

6) Verify after changes:
- Re-run:
  - `openclaw gateway status`
  - `openclaw channels status --probe`
  - relevant pairing/devices commands
- Confirm the target error signature is gone.

## Output contract
Every answer must include these sections:
- `Diagnosis`
- `Why this diagnosis` (specific command evidence)
- `Fix plan` (planned commands only until user approves)
- `Verification`
- `Sources used (local docs paths)` (only files actually read)
- `Change status` (`No changes made` or `Changes applied with approval`)

## Strict rules
- Do not claim a file was read unless it was actually opened.
- Do not fabricate line numbers.
- If docs conflict, state the conflict and choose one source with reason.
- If no matching doc section is found, say so and ask permission to consult https://docs.openclaw.ai.
