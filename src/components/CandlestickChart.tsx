import { useState } from 'react';
import { MarketCandle } from '../types/apex';

interface CandlestickChartProps {
  candles: MarketCandle[];
  symbol: string;
  currentPrice: number;
  entryPrice?: number;
  stopLossPrice?: number;
  takeProfitPrice?: number;
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  isLoading?: boolean;
}

export function CandlestickChart({
  candles,
  symbol,
  currentPrice,
  entryPrice,
  stopLossPrice,
  takeProfitPrice,
  timeframe,
  onTimeframeChange,
  isLoading = false,
}: CandlestickChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!candles || candles.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-slate-500 text-sm border border-slate-800 rounded-xl bg-slate-900/50">
        Деректер жүктелуде...
      </div>
    );
  }

  // Calculate scales
  const prices = candles.flatMap((c) => [c.high, c.low]);
  if (entryPrice) prices.push(entryPrice);
  if (stopLossPrice) prices.push(stopLossPrice);
  if (takeProfitPrice) prices.push(takeProfitPrice);

  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const chartHeight = 260;
  const chartWidth = 720;
  const paddingRight = 60;
  const usableWidth = chartWidth - paddingRight;
  const candleWidth = Math.max(3, (usableWidth / candles.length) * 0.65);
  const candleGap = usableWidth / candles.length;

  const getY = (val: number) => {
    return chartHeight - ((val - minPrice) / priceRange) * chartHeight;
  };

  const hoveredCandle = hoveredIndex !== null ? candles[hoveredIndex] : candles[candles.length - 1];

  return (
    <div className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-4">
      {/* Top Bar for Chart */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-white tracking-wide">{symbol}</span>
          <span className="text-sm font-mono font-semibold text-emerald-400 tabular-nums">
            ${currentPrice > 1 ? currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : currentPrice}
          </span>
          {hoveredCandle && (
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-400 tabular-nums">
              <span>O: {hoveredCandle.open}</span>
              <span>H: {hoveredCandle.high}</span>
              <span>L: {hoveredCandle.low}</span>
              <span className={hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-400' : 'text-rose-400'}>
                C: {hoveredCandle.close}
              </span>
            </div>
          )}
        </div>

        {/* Timeframe switch */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {['15m', '1h', '4h', '1d'].map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                timeframe === tf
                  ? 'bg-amber-500/20 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-3 w-full overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-10 text-xs text-amber-300 font-mono">
            Шам деректері жаңартылуда...
          </div>
        )}
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-64 select-none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((pct, i) => {
            const y = chartHeight * pct;
            const pVal = maxPrice - priceRange * pct;
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1={y}
                  x2={usableWidth}
                  y2={y}
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={usableWidth + 6}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {pVal > 1 ? pVal.toFixed(1) : pVal.toFixed(5)}
                </text>
              </g>
            );
          })}

          {/* Candle bars */}
          {candles.map((candle, idx) => {
            const isGreen = candle.close >= candle.open;
            const x = idx * candleGap + candleGap / 2;
            const yHigh = getY(candle.high);
            const yLow = getY(candle.low);
            const yOpen = getY(candle.open);
            const yClose = getY(candle.close);
            const bodyY = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));

            const color = isGreen ? '#10b981' : '#f43f5e';

            return (
              <g
                key={candle.time || idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="cursor-crosshair"
              >
                {/* Wick */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={yLow}
                  stroke={color}
                  strokeWidth="1.2"
                />
                {/* Body */}
                <rect
                  x={x - candleWidth / 2}
                  y={bodyY}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={color}
                  rx="0.5"
                />
              </g>
            );
          })}

          {/* Entry Level Line */}
          {entryPrice && (
            <g>
              <line
                x1="0"
                y1={getY(entryPrice)}
                x2={usableWidth}
                y2={getY(entryPrice)}
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <text
                x={usableWidth + 4}
                y={getY(entryPrice) + 3}
                fill="#38bdf8"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                ENTRY
              </text>
            </g>
          )}

          {/* Stop Loss Level Line */}
          {stopLossPrice && (
            <g>
              <line
                x1="0"
                y1={getY(stopLossPrice)}
                x2={usableWidth}
                y2={getY(stopLossPrice)}
                stroke="#f43f5e"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x={usableWidth + 4}
                y={getY(stopLossPrice) + 3}
                fill="#f43f5e"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                STOP
              </text>
            </g>
          )}

          {/* Take Profit Level Line */}
          {takeProfitPrice && (
            <g>
              <line
                x1="0"
                y1={getY(takeProfitPrice)}
                x2={usableWidth}
                y2={getY(takeProfitPrice)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text
                x={usableWidth + 4}
                y={getY(takeProfitPrice) + 3}
                fill="#10b981"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                TP
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Target levels banner */}
      {(entryPrice || stopLossPrice || takeProfitPrice) && (
        <div className="flex items-center justify-between text-xs font-mono pt-3 mt-1 border-t border-slate-800 text-slate-400">
          {entryPrice && (
            <span className="text-sky-400">
              Entry: <strong className="text-white">${entryPrice}</strong>
            </span>
          )}
          {stopLossPrice && (
            <span className="text-rose-400">
              Stop-Loss: <strong className="text-white">${stopLossPrice}</strong>
            </span>
          )}
          {takeProfitPrice && (
            <span className="text-emerald-400">
              Take-Profit: <strong className="text-white">${takeProfitPrice}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
