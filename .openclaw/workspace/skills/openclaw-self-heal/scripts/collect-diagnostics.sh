#!/usr/bin/env bash
set -euo pipefail

echo "== openclaw version =="
openclaw --version || true

echo
echo "== gateway status =="
openclaw gateway status || true

echo
echo "== channels probe =="
openclaw channels status --probe || true

echo
echo "== key config (auth + telegram) =="
for key in \
  gateway.bind \
  gateway.mode \
  gateway.auth.mode \
  gateway.auth.token \
  gateway.remote.token \
  channels.telegram.enabled \
  channels.telegram.dmPolicy \
  channels.telegram.allowFrom
do
  printf "%s: " "$key"
  openclaw config get "$key" 2>/dev/null || echo "<unset>"
done

echo
echo "== pending pairing/device state =="
openclaw pairing list telegram || true
openclaw devices list || true

echo
echo "== recent logs hint =="
openclaw logs 2>/dev/null | tail -n 80 || true
