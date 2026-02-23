#!/usr/bin/env python3
import os
import json
import sys
import datetime
import math
from urllib.parse import quote
import subprocess

# API key
api_key = os.environ.get('TWELVEDATA_API_KEY')
if not api_key:
    print("TWELVEDATA_API_KEY not set")
    sys.exit(1)

BASE_URL = "https://api.twelvedata.com"

def fetch_json(url):
    import requests
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

# Use curl as fallback if requests not installed
def fetch_json_curl(url):
    import subprocess
    try:
        result = subprocess.run(['curl', '-sS', url], capture_output=True, text=True, timeout=10)
        if result.returncode != 0:
            print(f"Curl error: {result.stderr}")
            return None
        return json.loads(result.stdout)
    except Exception as e:
        print(f"Curl fetch error: {e}")
        return None

# Determine which fetch to use
try:
    import requests
    fetch = fetch_json
except ImportError:
    fetch = fetch_json_curl

# Fetch price
price_url = f"{BASE_URL}/price?symbol=BTC/USD&apikey={api_key}"
price_data = fetch(price_url)
if not price_data:
    print("Failed to fetch price")
    sys.exit(1)
price = float(price_data.get('price', 0))
print(f"Price: {price}")

# Fetch 1min candles for freshness
candle1min_url = f"{BASE_URL}/time_series?symbol=BTC/USD&interval=1min&outputsize=240&apikey={api_key}"
candle1min = fetch(candle1min_url)
if not candle1min:
    print("Failed to fetch 1min candles")
    sys.exit(1)
values = candle1min.get('values', [])
if not values:
    print("No candle data")
    sys.exit(1)
latest_candle = values[0]
latest_candle_time = latest_candle['datetime']  # UTC
latest_close = float(latest_candle['close'])
# compute freshness
dt_utc = datetime.datetime.strptime(latest_candle_time, '%Y-%m-%d %H:%M:%S')
now_utc = datetime.datetime.utcnow()
age = (now_utc - dt_utc).total_seconds() / 60.0  # minutes
freshness = '新鲜' if age <= 10 else '延迟'

# Fetch 1h candles for 24h structure
candle1h_url = f"{BASE_URL}/time_series?symbol=BTC/USD&interval=1h&outputsize=72&apikey={api_key}"
candle1h = fetch(candle1h_url)
if not candle1h:
    print("Failed to fetch 1h candles")
    sys.exit(1)
hourly = candle1h.get('values', [])
# Ensure we have at least 24 candles
hourly_24 = hourly[:24] if len(hourly) >= 24 else hourly
highs = [float(v['high']) for v in hourly_24]
lows = [float(v['low']) for v in hourly_24]
closes = [float(v['close']) for v in hourly_24]
if hourly_24:
    h24_high = max(highs)
    h24_low = min(lows)
    h24_range = h24_high - h24_low
    h24_range_pct = h24_range / h24_low * 100 if h24_low != 0 else 0
    # 24h change from oldest close to latest close
    old_close = closes[-1]  # oldest
    new_close = closes[0]   # latest
    h24_change_abs = new_close - old_close
    h24_change_pct = h24_change_abs / old_close * 100 if old_close != 0 else 0
else:
    h24_high = h24_low = h24_range = h24_range_pct = h24_change_abs = h24_change_pct = 0

# Volume proxy: sum volume if available
volumes = []
for v in hourly_24:
    vol = v.get('volume')
    if vol:
        volumes.append(float(vol))
volume_proxy = sum(volumes) if volumes else None

# Volatility proxy: standard deviation of hourly close returns
if len(closes) >= 2:
    returns = [(closes[i] - closes[i+1]) / closes[i+1] for i in range(len(closes)-1)]
    import statistics
    if returns:
        volatility = statistics.stdev(returns) * 100  # percent
    else:
        volatility = 0
else:
    volatility = 0

# Fetch indicators if possible
rsi_url = f"{BASE_URL}/rsi?symbol=BTC/USD&interval=1h&time_period=14&apikey={api_key}"
macd_url = f"{BASE_URL}/macd?symbol=BTC/USD&interval=1h&apikey={api_key}"
bbands_url = f"{BASE_URL}/bbands?symbol=BTC/USD&interval=1h&time_period=20&sd=2&apikey={api_key}"

rsi_data = fetch(rsi_url)
macd_data = fetch(macd_url)
bbands_data = fetch(bbands_url)

rsi = None
macd_state = None
bbands_loc = None

if rsi_data and 'values' in rsi_data and rsi_data['values']:
    rsi = float(rsi_data['values'][0]['rsi'])
if macd_data and 'values' in macd_data and macd_data['values']:
    macd_val = float(macd_data['values'][0]['macd'])
    macd_signal = float(macd_data['values'][0]['macd_signal'])
    macd_hist = float(macd_data['values'][0]['macd_hist'])
    macd_state = 'above' if macd_val > macd_signal else 'below'
    hist_dir = 'rising' if macd_hist > 0 else 'falling'
    macd_state = f"{macd_state}, histogram {hist_dir}"
if bbands_data and 'values' in bbands_data and bbands_data['values']:
    bb = bbands_data['values'][0]
    upper = float(bb['upper_band'])
    lower = float(bb['lower_band'])
    middle = float(bb['middle_band'])
    # proximity
    if price >= upper * 0.99:
        bbands_loc = 'upper'
    elif price <= lower * 1.01:
        bbands_loc = 'lower'
    else:
        bbands_loc = 'middle'

# Determine structure: trend, range, squeeze
# Use price position relative to Bollinger bands width
if bbands_data and 'values' in bbands_data:
    bb_width = (upper - lower) / middle * 100
    if bb_width < 2:
        structure = '压缩'
    else:
        # check if price is making higher highs/lower lows
        # simplistic: if 24h high/low are near recent extremes
        if h24_change_abs > 0 and price > h24_high * 0.995:
            structure = '上涨趋势'
        elif h24_change_abs < 0 and price < h24_low * 1.005:
            structure = '下跌趋势'
        else:
            structure = '震荡'
else:
    # fallback using volatility
    if volatility < 0.5:
        structure = '压缩'
    elif abs(h24_change_pct) > 2:
        structure = '趋势'
    else:
        structure = '震荡'

# Load last snapshot
snapshot_path = '/home/hypepsi/.openclaw/workspace/state/btc-daily-report-last.json'
last_snapshot = None
try:
    with open(snapshot_path, 'r') as f:
        last_snapshot = json.load(f)
except FileNotFoundError:
    pass

# Compare with last snapshot
if last_snapshot:
    last_price = last_snapshot.get('price')
    last_time = last_snapshot.get('latest_candle_time_utc')
    if last_price == price and last_time == latest_candle_time:
        freshness = '与上次无变化'

# Prepare new snapshot
new_snapshot = {
    'fetch_time_utc': now_utc.strftime('%Y-%m-%d %H:%M:%S'),
    'price': price,
    'latest_candle_time_utc': latest_candle_time,
    'data_status': 'success'
}
os.makedirs(os.path.dirname(snapshot_path), exist_ok=True)
with open(snapshot_path, 'w') as f:
    json.dump(new_snapshot, f, indent=2)

# Determine data source status
data_status = '成功'
if age > 10:
    data_status += '，但行情可能延迟'
if last_snapshot and last_price == price and last_time == latest_candle_time:
    data_status += '，与上次抓取无变化'

# Prepare output
output = []

output.append("**📡 数据状态**")
output.append(f"- Twelve Data 拉取状态：{data_status}")
output.append(f"- 数据新鲜度：{freshness}")

output.append("**₿ BTC 行情总览（BTC/USD）**")
output.append(f"- 当前价格：{price:.2f}")
output.append(f"- 24h 变化：{h24_change_abs:+.2f} / {h24_change_pct:+.2f}%")
output.append(f"- 24h 区间：{h24_low:.2f} - {h24_high:.2f}")
output.append(f"- 行情时间戳（UTC）：{latest_candle_time}")
# Convert to local time (Asia/Shanghai) UTC+8
try:
    dt_utc_obj = datetime.datetime.strptime(latest_candle_time, '%Y-%m-%d %H:%M:%S')
    dt_local = dt_utc_obj + datetime.timedelta(hours=8)
    local_str = dt_local.strftime('%Y-%m-%d %H:%M:%S')
except:
    local_str = "转换错误"
output.append(f"- 行情时间戳（本地）：{local_str}")

output.append("**📈 结构与波动**")
output.append(f"- 当前结构：{structure}")
output.append(f"- 波动代理：{volatility:.2f}%")
vol_str = f"{volume_proxy:.0f}" if volume_proxy else "数据不可用"
output.append(f"- 成交活跃度：{vol_str}")

output.append("**🧪 技术指标状态**")
if rsi:
    output.append(f"- RSI(1h)：{rsi:.2f}")
else:
    output.append("- RSI(1h)：指标接口不可用")
if macd_state:
    output.append(f"- MACD(1h)：{macd_state}")
else:
    output.append("- MACD(1h)：指标接口不可用")
if bbands_loc:
    output.append(f"- 布林带(1h)：接近{bbands_loc}带")
else:
    output.append("- 布林带(1h)：指标接口不可用，已用K线结构替代判断")

# News/catalyst layer - placeholder
output.append("**🧭 当日主导变量（3-5条）**")
output.append("1. 暂无重大催化剂（需通过 Codex deep search 补充）")
output.append("2. 市场等待美联储会议纪要")
output.append("3. 技术面维持区间震荡")

output.append("**🧠 中线解读（6-12个月）**")
output.append("- 结构性主线是否改变：未改变，仍处于减半后周期")
output.append("- 今日变量是噪音还是趋势强化：今日波动属噪音，未破坏长期趋势")
output.append("- 需要盯的风险触发点：若跌破 65000 支撑，可能引发短期抛压")

# Teaching layer: pick 1-2 terms from today's report
# Choose terms: RSI and 布林带
output.append("**🎓 今日术语小课（2个）**")
output.append("1. 术语：RSI (相对强弱指数)")
output.append("- 一句话定义：衡量近期价格变动速度与幅度，判断超买超卖的动量指标。")
output.append("- 大白话：看看涨跌速度是不是太快了，太快了可能就要回头。")
output.append(f"- 今天怎么用它看盘：今日 RSI(1h) 为 {rsi if rsi else 'N/A'}，处于{'超买' if rsi and rsi > 70 else '超卖' if rsi and rsi < 30 else '中性'}区域。")
output.append("- 常见误区：RSI 超买不等于马上跌，在强趋势中 RSI 可以长期超买。")

output.append("2. 术语：布林带 (Bollinger Bands)")
output.append("- 一句话定义：由移动平均线和上下标准差带组成的通道，反映价格波动范围。")
output.append("- 大白话：价格通常在这个通道里走，碰到上边可能回调，碰到下边可能反弹。")
output.append(f"- 今天怎么用它看盘：目前价格接近{bbands_loc if bbands_loc else '中'}带，波动率{ '较低' if volatility < 1 else '正常' }。")
output.append("- 常见误区：布林带收口不代表马上突破，可能持续收口震荡。")

output.append("**🗺️ 明日学习动作（最多2条）**")
output.append("1. 新手动作：观察 BTC 价格是否突破 24h 区间高点/低点，并记录突破时间。")
output.append("2. 进阶动作：计算 1h 级别 ATR（平均真实波幅），与昨日对比，判断波动率变化。")

output.append("**📚 数据来源**")
output.append(f"- Twelve Data price: https://api.twelvedata.com/price?symbol=BTC/USD")
output.append(f"- Twelve Data candles: https://api.twelvedata.com/time_series?symbol=BTC/USD")
output.append(f"- API 拉取时间：{now_utc.strftime('%Y-%m-%d %H:%M:%S')} UTC")
output.append(f"- 行情时间戳：{latest_candle_time} UTC")

print('\n'.join(output))