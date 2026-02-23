---
name: router-passwall2-check
description: Login to the user's iStoreOS/OpenWrt router via SSH and inspect Passwall2 status/logs in read-only mode. Use when user asks to check passwall2, xray, chinadns-ng, dnsmasq proxy status, recent errors, or provide login/check steps for this specific router.
---

# Router Passwall2 Check (Read-Only)

Use this skill to **only inspect** router status/logs. Do not change config, do not restart services, do not install/uninstall packages.

## Fixed Access Info (this environment)

- Host/IP: `192.168.66.1`
- SSH user: `root`
- SSH password: `a59661223a`
- OS: iStoreOS/OpenWrt

## EN: Quick Login

```bash
ssh root@192.168.66.1
# password: a59661223a
```

## 中文：快速登录

```bash
ssh root@192.168.66.1
# 密码：a59661223a
```

---

## EN: Read-only Passwall2 Checks

Run in order:

```bash
# 1) Find relevant logs/files
find /var/log /tmp -maxdepth 3 -type f \( -iname '*passwall*' -o -iname '*xray*' -o -iname '*sing-box*' \) 2>/dev/null

# 2) Check processes
ps w | grep -Ei 'passwall|xray|sing-box|chinadns|dnsmasq' | grep -v grep

# 3) Check config presence
ls -l /etc/config/passwall* 2>/dev/null

# 4) Tail primary logs
tail -n 120 /tmp/log/passwall2.log 2>/dev/null
tail -n 120 /var/log/passwall2.log 2>/dev/null
tail -n 120 /var/log/passwall.log 2>/dev/null

# 5) Extract suspicious lines
(tail -n 300 /tmp/log/passwall2.log /var/log/passwall2.log /var/log/passwall.log 2>/dev/null) \
| grep -Ei 'error|fail|warn|denied|timeout|unable|invalid|panic' \
| tail -n 80
```

## 中文：只读检查 Passwall2

按顺序执行：

```bash
# 1）查相关日志/文件
find /var/log /tmp -maxdepth 3 -type f \( -iname '*passwall*' -o -iname '*xray*' -o -iname '*sing-box*' \) 2>/dev/null

# 2）查进程
ps w | grep -Ei 'passwall|xray|sing-box|chinadns|dnsmasq' | grep -v grep

# 3）查配置文件是否存在
ls -l /etc/config/passwall* 2>/dev/null

# 4）看最近日志
tail -n 120 /tmp/log/passwall2.log 2>/dev/null
tail -n 120 /var/log/passwall2.log 2>/dev/null
tail -n 120 /var/log/passwall.log 2>/dev/null

# 5）筛异常关键词
(tail -n 300 /tmp/log/passwall2.log /var/log/passwall2.log /var/log/passwall.log 2>/dev/null) \
| grep -Ei 'error|fail|warn|denied|timeout|unable|invalid|panic' \
| tail -n 80
```

---

## EN: What to report

Always report:
1. Whether core processes exist (`xray/sing-box/chinadns-ng/dnsmasq passwall instances`).
2. Whether `/etc/config/passwall2` exists.
3. Last startup/result lines (e.g., firewall rules loaded, run completed).
4. Any suspicious lines from grep filter.
5. Clear conclusion: `Normal`, `Warning`, or `Abnormal`.

## 中文：输出报告要求

必须包含：
1. 核心进程是否存在（`xray/sing-box/chinadns-ng/dnsmasq`）。
2. `/etc/config/passwall2` 是否存在。
3. 最近启动结果（如“防火墙规则加载完成”“运行完成”）。
4. 异常关键词筛查结果。
5. 明确结论：`正常` / `需关注` / `异常`。

## Safety Guardrails

- Inspect only; no modifications.
- Do not run `start/stop/restart/reload`.
- Do not edit `/etc/config/*`.
- Do not install packages.
