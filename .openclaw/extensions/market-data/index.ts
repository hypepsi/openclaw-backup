import fs from "node:fs";
import path from "node:path";
import type { OpenClawPluginApi } from "openclaw/plugin-sdk";

type JsonObject = Record<string, unknown>;

type RuntimeCfg = {
  env?: { vars?: Record<string, string> };
  plugins?: {
    entries?: Record<string, { enabled?: boolean; config?: JsonObject }>;
  };
};

function nowIso(): string {
  return new Date().toISOString();
}

function dateInTimezone(tz: string): string {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dtf.format(new Date());
}

type FundHolding = {
  code: string;
  name?: string;
  cost: number;
  shares: number;
};

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    if (cleaned !== "" && Number.isFinite(Number(cleaned))) return Number(cleaned);
  }
  return null;
}

function loadHoldings(holdingsPath: string): FundHolding[] {
  const raw = fs.readFileSync(holdingsPath, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("holdings file must be an array");
  }
  const out: FundHolding[] = [];
  for (const item of parsed) {
    if (!item || typeof item !== "object") continue;
    const row = item as JsonObject;
    const code = String(row.code ?? "").trim();
    const shares = toNumber(row.shares);
    const cost = toNumber(row.cost);
    const name = typeof row.name === "string" ? row.name : undefined;
    if (!code || shares === null || cost === null) continue;
    out.push({ code, name, shares, cost });
  }
  if (out.length === 0) {
    throw new Error("no valid holdings parsed from holdings file");
  }
  return out;
}

function getPluginConfig(api: OpenClawPluginApi): {
  timeoutMs: number;
  snapshotDir: string;
  holdingsPath: string;
  providers: {
    hstechPrimary: "yahoo_chart";
    btcPrimary: "twelvedata" | "yahoo_chart";
    goldPrimary: "goldapi" | "yahoo_chart";
  };
  keys: {
    twelvedata?: string;
    goldapi?: string;
  };
} {
  const cfg = api.runtime.config.loadConfig() as RuntimeCfg;
  const entry = cfg.plugins?.entries?.["market-data"]?.config ?? {};
  const entryObj = (entry && typeof entry === "object" ? entry : {}) as JsonObject;
  const providers = ((entryObj.providers as JsonObject) ?? {}) as JsonObject;
  const timeoutMs =
    typeof entryObj.timeoutMs === "number" && Number.isFinite(entryObj.timeoutMs)
      ? Math.max(1000, Math.min(30000, Math.floor(entryObj.timeoutMs)))
      : 12000;
  const snapshotDirRaw =
    typeof entryObj.snapshotDir === "string" && entryObj.snapshotDir.trim()
      ? entryObj.snapshotDir.trim()
      : "/home/hypepsi/.openclaw/workspace/state";
  const holdingsPathRaw =
    typeof entryObj.holdingsPath === "string" && entryObj.holdingsPath.trim()
      ? entryObj.holdingsPath.trim()
      : "/home/hypepsi/.openclaw/workspace/data/portfolio/fund-portfolio-holdings.json";

  const env = cfg.env?.vars ?? {};
  return {
    timeoutMs,
    snapshotDir: snapshotDirRaw,
    holdingsPath: holdingsPathRaw,
    providers: {
      hstechPrimary: "yahoo_chart",
      btcPrimary: providers.btcPrimary === "yahoo_chart" ? "yahoo_chart" : "twelvedata",
      goldPrimary: providers.goldPrimary === "yahoo_chart" ? "yahoo_chart" : "goldapi",
    },
    keys: {
      twelvedata: env.TWELVEDATA_API_KEY,
      goldapi: env.GOLDAPI_ACCESS_TOKEN,
    },
  };
}

async function fetchJson(url: string, timeoutMs: number, headers?: Record<string, string>): Promise<JsonObject> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "OpenClaw market-data plugin",
        ...(headers ?? {}),
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from ${new URL(url).host}`);
    }
    const json = (await res.json()) as JsonObject;
    return json;
  } finally {
    clearTimeout(t);
  }
}

async function fetchText(url: string, timeoutMs: number, headers?: Record<string, string>): Promise<string> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "OpenClaw market-data plugin",
        ...(headers ?? {}),
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from ${new URL(url).host}`);
    }
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchYahooChart(symbol: string, timeoutMs: number): Promise<JsonObject> {
  const enc = encodeURIComponent(symbol);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${enc}?range=1d&interval=1m`;
  const obj = await fetchJson(url, timeoutMs);
  const meta = (obj.chart as JsonObject)?.result as unknown[] | undefined;
  const first = Array.isArray(meta) && meta.length > 0 ? (meta[0] as JsonObject) : null;
  const out = (first?.meta as JsonObject) ?? null;
  if (!out) {
    throw new Error(`Yahoo chart missing meta for ${symbol}`);
  }
  return out;
}

async function fetchEastmoneyFundDaily(code: string, timeoutMs: number): Promise<JsonObject> {
  const url = `https://api.fund.eastmoney.com/f10/lsjz?fundCode=${encodeURIComponent(code)}&pageIndex=1&pageSize=1`;
  const res = await fetchJson(url, timeoutMs, {
    Referer: "https://fundf10.eastmoney.com/",
    "Accept-Language": "zh-CN,zh;q=0.9",
  });
  const list = ((res.Data as JsonObject)?.LSJZList as unknown[]) || [];
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error(`Eastmoney LSJZList empty for ${code}`);
  }
  const row = list[0] as JsonObject;
  return {
    sourceUrl: url,
    navDate: (row.FSRQ as string | undefined) ?? null,
    nav: n(row.DWJZ),
    changePct: n(row.JZZZL),
    purchaseStatus: (row.SGZT as string | undefined) ?? null,
    redeemStatus: (row.SHZT as string | undefined) ?? null,
  };
}

function n(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && Number.isFinite(Number(v))) return Number(v);
  return null;
}

function hstechSnapshotPayload(meta: JsonObject): JsonObject {
  return {
    fetch_time_hkt: nowIso(),
    regularMarketTime: n(meta.regularMarketTime),
    regularMarketPrice: n(meta.regularMarketPrice),
    marketState: meta.marketState ?? null,
    source: "yahoo_chart",
  };
}

function writeSnapshot(snapshotDir: string, fileName: string, payload: JsonObject): void {
  fs.mkdirSync(snapshotDir, { recursive: true });
  fs.writeFileSync(path.join(snapshotDir, fileName), JSON.stringify(payload, null, 2));
}

function buildToolResponse(data: JsonObject) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

export default function register(api: OpenClawPluginApi) {
  api.registerTool({
    name: "market_get_hstech_quote",
    description:
      "Get structured HSTECH quote from Yahoo chart API and persist hk-tech-close snapshot for stale-data checks.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {},
    },
    async execute() {
      const pcfg = getPluginConfig(api);
      const meta = await fetchYahooChart("HSTECH.HK", pcfg.timeoutMs);
      const price = n(meta.regularMarketPrice);
      const prev = n(meta.chartPreviousClose) ?? n(meta.previousClose);
      const change = price !== null && prev !== null ? price - prev : null;
      const changePct = price !== null && prev !== null && prev !== 0 ? (change! / prev) * 100 : null;

      const snapshot = hstechSnapshotPayload(meta);
      writeSnapshot(pcfg.snapshotDir, "hk-tech-close-last.json", snapshot);

      return buildToolResponse({
        ok: true,
        source: "yahoo_chart",
        symbol: "HSTECH.HK",
        fetchedAt: nowIso(),
        market: {
          price,
          previousClose: prev,
          change,
          changePct,
          marketTimeEpoch: n(meta.regularMarketTime),
          marketState: (meta.marketState as string | undefined) ?? null,
          dayHigh: n(meta.regularMarketDayHigh),
          dayLow: n(meta.regularMarketDayLow),
          exchange: (meta.exchangeName as string | undefined) ?? null,
          currency: (meta.currency as string | undefined) ?? null,
          shortName: (meta.shortName as string | undefined) ?? null,
        },
        snapshot: {
          path: path.join(pcfg.snapshotDir, "hk-tech-close-last.json"),
          written: true,
        },
      });
    },
  });

  api.registerTool({
    name: "market_get_btc_quote",
    description: "Get BTC/USD quote with provider priority (Twelve Data primary, Yahoo chart fallback).",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        forceProvider: {
          type: "string",
          enum: ["twelvedata", "yahoo_chart"],
        },
      },
    },
    async execute(_id, params: { forceProvider?: "twelvedata" | "yahoo_chart" }) {
      const pcfg = getPluginConfig(api);
      const primary = params?.forceProvider ?? pcfg.providers.btcPrimary;
      const providers: Array<"twelvedata" | "yahoo_chart"> =
        primary === "twelvedata" ? ["twelvedata", "yahoo_chart"] : ["yahoo_chart", "twelvedata"];

      const errors: string[] = [];
      for (const p of providers) {
        try {
          if (p === "twelvedata") {
            if (!pcfg.keys.twelvedata) {
              throw new Error("TWELVEDATA_API_KEY missing");
            }
            const tdUrl = `https://api.twelvedata.com/price?symbol=BTC/USD&apikey=${encodeURIComponent(pcfg.keys.twelvedata)}`;
            const td = await fetchJson(tdUrl, pcfg.timeoutMs);
            const price = n(td.price);
            if (price === null) {
              throw new Error("Twelve Data returned no numeric price");
            }
            return buildToolResponse({
              ok: true,
              source: "twelvedata",
              symbol: "BTC/USD",
              fetchedAt: nowIso(),
              market: {
                price,
              },
            });
          }

          const meta = await fetchYahooChart("BTC-USD", pcfg.timeoutMs);
          const price = n(meta.regularMarketPrice);
          const prev = n(meta.chartPreviousClose) ?? n(meta.previousClose);
          const change = price !== null && prev !== null ? price - prev : null;
          const changePct = price !== null && prev !== null && prev !== 0 ? (change! / prev) * 100 : null;
          return buildToolResponse({
            ok: true,
            source: "yahoo_chart",
            symbol: "BTC-USD",
            fetchedAt: nowIso(),
            market: {
              price,
              previousClose: prev,
              change,
              changePct,
              marketTimeEpoch: n(meta.regularMarketTime),
              dayHigh: n(meta.regularMarketDayHigh),
              dayLow: n(meta.regularMarketDayLow),
              exchange: (meta.exchangeName as string | undefined) ?? null,
              currency: (meta.currency as string | undefined) ?? null,
            },
          });
        } catch (err) {
          errors.push(`${p}: ${(err as Error).message}`);
        }
      }

      return buildToolResponse({ ok: false, error: "all providers failed", details: errors, fetchedAt: nowIso() });
    },
  });

  api.registerTool({
    name: "funds_daily_snapshot",
    description:
      "Get daily snapshot for multiple CN fund codes (NAV date/value/change) from Eastmoney API, with freshness and portfolio summary.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        fundCodes: {
          type: "array",
          minItems: 1,
          maxItems: 50,
          items: { type: "string" },
        },
        reportDate: {
          type: "string",
          description: "Optional YYYY-MM-DD. Defaults to Asia/Shanghai today.",
        },
      },
      required: ["fundCodes"],
    },
    async execute(_id, params: { fundCodes: string[]; reportDate?: string }) {
      const pcfg = getPluginConfig(api);
      const targetDate = (params.reportDate && params.reportDate.trim()) || dateInTimezone("Asia/Shanghai");
      const codes = (params.fundCodes || []).map((s) => String(s).trim()).filter(Boolean);

      const results: JsonObject[] = [];
      const errors: JsonObject[] = [];

      for (const code of codes) {
        try {
          const lsjzUrl = `https://api.fund.eastmoney.com/f10/lsjz?fundCode=${encodeURIComponent(code)}&pageIndex=1&pageSize=1`;
          const lsjz = await fetchJson(lsjzUrl, pcfg.timeoutMs, {
            Referer: "https://fundf10.eastmoney.com/",
            "Accept-Language": "zh-CN,zh;q=0.9",
          });
          const list = ((lsjz.Data as JsonObject)?.LSJZList as unknown[]) || [];
          if (!Array.isArray(list) || list.length === 0) {
            throw new Error("Eastmoney LSJZList empty");
          }
          const row = list[0] as JsonObject;

          let fundName: string | null = null;
          try {
            const js = await fetchText(`https://fund.eastmoney.com/pingzhongdata/${encodeURIComponent(code)}.js`, pcfg.timeoutMs);
            const m = js.match(/var\\s+fS_name\\s*=\\s*\"([^\"]+)\";/);
            if (m?.[1]) {
              fundName = m[1];
            }
          } catch {
            // Name enrichment is optional; do not fail the whole item.
          }

          const navDate = (row.FSRQ as string | undefined) ?? null;
          const nav = n(row.DWJZ);
          const changePct = n(row.JZZZL);
          const freshnessStatus = navDate === targetDate ? "today_valid" : "non_today_snapshot";

          results.push({
            fundCode: code,
            fundName,
            navDate,
            nav,
            changePct,
            purchaseStatus: (row.SGZT as string | undefined) ?? null,
            redeemStatus: (row.SHZT as string | undefined) ?? null,
            freshnessStatus,
            source: "eastmoney_api",
            sourceUrl: lsjzUrl,
          });
        } catch (err) {
          errors.push({
            fundCode: code,
            error: (err as Error).message,
          });
        }
      }

      const upCount = results.filter((r) => typeof r.changePct === "number" && (r.changePct as number) > 0).length;
      const downCount = results.filter((r) => typeof r.changePct === "number" && (r.changePct as number) < 0).length;
      const flatCount = results.filter((r) => typeof r.changePct === "number" && (r.changePct as number) === 0).length;
      const validTodayCount = results.filter((r) => r.freshnessStatus === "today_valid").length;
      const nonTodayCount = results.filter((r) => r.freshnessStatus === "non_today_snapshot").length;

      const pctVals = results
        .map((r) => r.changePct)
        .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
      const avgChangePct =
        pctVals.length > 0 ? Number((pctVals.reduce((a, b) => a + b, 0) / pctVals.length).toFixed(4)) : null;

      return buildToolResponse({
        ok: errors.length === 0,
        fetchedAt: nowIso(),
        reportDate: targetDate,
        source: "eastmoney_api",
        summary: {
          totalRequested: codes.length,
          successCount: results.length,
          errorCount: errors.length,
          validTodayCount,
          nonTodayCount,
          upCount,
          downCount,
          flatCount,
          avgChangePct,
        },
        funds: results,
        errors,
      });
    },
  });

  api.registerTool({
    name: "fund_portfolio_daily",
    description:
      "Compute daily portfolio snapshot from local fund holdings (cost/shares) plus latest Eastmoney NAV data.",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        reportDate: {
          type: "string",
          description: "Optional YYYY-MM-DD. Defaults to Asia/Shanghai today.",
        },
        holdingsPath: {
          type: "string",
          description: "Optional holdings JSON path. Defaults to plugin config holdingsPath.",
        },
      },
    },
    async execute(_id, params: { reportDate?: string; holdingsPath?: string }) {
      const pcfg = getPluginConfig(api);
      const targetDate = (params.reportDate && params.reportDate.trim()) || dateInTimezone("Asia/Shanghai");
      const holdingsPath = (params.holdingsPath && params.holdingsPath.trim()) || pcfg.holdingsPath;
      const holdings = loadHoldings(holdingsPath);

      const funds: JsonObject[] = [];
      const errors: JsonObject[] = [];

      for (const h of holdings) {
        try {
          const nav = await fetchEastmoneyFundDaily(h.code, pcfg.timeoutMs);
          const navVal = toNumber(nav.nav);
          const chgPct = toNumber(nav.changePct);
          const navDate = (nav.navDate as string | null) ?? null;
          const freshnessStatus = navDate === targetDate ? "today_valid" : "non_today_snapshot";

          const costValue = h.cost * h.shares;
          const currentValue = navVal !== null ? navVal * h.shares : null;
          const totalPnl = currentValue !== null ? currentValue - costValue : null;

          let dailyPnl: number | null = null;
          if (currentValue !== null && chgPct !== null) {
            const prevNav = navVal !== null ? navVal / (1 + chgPct / 100) : null;
            dailyPnl = prevNav !== null ? (navVal! - prevNav) * h.shares : null;
          }

          funds.push({
            fundCode: h.code,
            fundName: h.name ?? null,
            navDate,
            nav: navVal,
            changePct: chgPct,
            freshnessStatus,
            holdings: {
              shares: h.shares,
              costPerShare: h.cost,
              costValue: Number(costValue.toFixed(2)),
              currentValue: currentValue !== null ? Number(currentValue.toFixed(2)) : null,
              totalPnl: totalPnl !== null ? Number(totalPnl.toFixed(2)) : null,
              dailyPnl: dailyPnl !== null ? Number(dailyPnl.toFixed(2)) : null,
            },
            purchaseStatus: nav.purchaseStatus ?? null,
            redeemStatus: nav.redeemStatus ?? null,
            source: "eastmoney_api",
            sourceUrl: nav.sourceUrl ?? null,
          });
        } catch (err) {
          errors.push({
            fundCode: h.code,
            fundName: h.name ?? null,
            error: (err as Error).message,
          });
        }
      }

      const costTotal = funds
        .map((f) => toNumber((f.holdings as JsonObject | undefined)?.costValue))
        .filter((v): v is number => v !== null)
        .reduce((a, b) => a + b, 0);
      const currentTotal = funds
        .map((f) => toNumber((f.holdings as JsonObject | undefined)?.currentValue))
        .filter((v): v is number => v !== null)
        .reduce((a, b) => a + b, 0);
      const totalPnl = currentTotal - costTotal;
      const dailyPnlTotal = funds
        .map((f) => toNumber((f.holdings as JsonObject | undefined)?.dailyPnl))
        .filter((v): v is number => v !== null)
        .reduce((a, b) => a + b, 0);

      const validTodayCount = funds.filter((f) => f.freshnessStatus === "today_valid").length;
      const nonTodayCount = funds.filter((f) => f.freshnessStatus === "non_today_snapshot").length;
      const marketState = validTodayCount === 0 ? "non_trading_or_not_updated" : "updated_trading_day";

      const gainCount = funds.filter((f) => typeof f.changePct === "number" && (f.changePct as number) > 0).length;
      const lossCount = funds.filter((f) => typeof f.changePct === "number" && (f.changePct as number) < 0).length;
      const flatCount = funds.filter((f) => typeof f.changePct === "number" && (f.changePct as number) === 0).length;

      return buildToolResponse({
        ok: errors.length === 0,
        fetchedAt: nowIso(),
        reportDate: targetDate,
        holdingsPath,
        marketState,
        summary: {
          totalFunds: holdings.length,
          successCount: funds.length,
          errorCount: errors.length,
          validTodayCount,
          nonTodayCount,
          gainCount,
          lossCount,
          flatCount,
          costTotal: Number(costTotal.toFixed(2)),
          currentTotal: Number(currentTotal.toFixed(2)),
          totalPnl: Number(totalPnl.toFixed(2)),
          dailyPnlTotal: Number(dailyPnlTotal.toFixed(2)),
        },
        funds,
        errors,
      });
    },
  });

  api.registerTool({
    name: "market_get_xauusd_snapshot",
    description: "Get XAU/USD snapshot (GoldAPI primary, Yahoo chart fallback).",
    parameters: {
      type: "object",
      additionalProperties: false,
      properties: {
        forceGoldProvider: {
          type: "string",
          enum: ["goldapi", "yahoo_chart"],
        },
      },
    },
    async execute(_id, params: { forceGoldProvider?: "goldapi" | "yahoo_chart" }) {
      const pcfg = getPluginConfig(api);
      const primary = params?.forceGoldProvider ?? pcfg.providers.goldPrimary;
      const goldProviders: Array<"goldapi" | "yahoo_chart"> =
        primary === "goldapi" ? ["goldapi", "yahoo_chart"] : ["yahoo_chart", "goldapi"];

      const errors: string[] = [];
      let gold: JsonObject | null = null;
      let goldSource: string | null = null;

      for (const gp of goldProviders) {
        try {
          if (gp === "goldapi") {
            if (!pcfg.keys.goldapi) {
              throw new Error("GOLDAPI_ACCESS_TOKEN missing");
            }
            const ga = await fetchJson("https://www.goldapi.io/api/XAU/USD", pcfg.timeoutMs, {
              "x-access-token": pcfg.keys.goldapi,
            });
            const price = n(ga.price);
            if (price === null) {
              throw new Error("GoldAPI returned no numeric price");
            }
            gold = {
              symbol: "XAU/USD",
              price,
              open: n(ga.open),
              high: n(ga.high),
              low: n(ga.low),
              change: n(ga.ch),
              changePct: n(ga.chp),
              ask: n(ga.ask),
              bid: n(ga.bid),
              marketTimeEpoch: n(ga.timestamp),
              currency: (ga.currency as string | undefined) ?? "USD",
            };
            goldSource = "goldapi";
            break;
          }

          const meta = await fetchYahooChart("GC=F", pcfg.timeoutMs);
          const price = n(meta.regularMarketPrice);
          const prev = n(meta.chartPreviousClose) ?? n(meta.previousClose);
          const change = price !== null && prev !== null ? price - prev : null;
          const changePct = price !== null && prev !== null && prev !== 0 ? (change! / prev) * 100 : null;
          gold = {
            symbol: "GC=F",
            price,
            previousClose: prev,
            change,
            changePct,
            dayHigh: n(meta.regularMarketDayHigh),
            dayLow: n(meta.regularMarketDayLow),
            marketTimeEpoch: n(meta.regularMarketTime),
            currency: (meta.currency as string | undefined) ?? "USD",
          };
          goldSource = "yahoo_chart";
          break;
        } catch (err) {
          errors.push(`${gp}: ${(err as Error).message}`);
        }
      }

      return buildToolResponse({
        ok: Boolean(gold),
        fetchedAt: nowIso(),
        goldSource,
        gold,
        errors,
      });
    },
  });
}
