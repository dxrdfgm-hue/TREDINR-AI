import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { CandidateCoin } from '../types/apex';
import { Activity, ShieldAlert, CheckCircle2, Flame, Sliders } from 'lucide-react';

import { Language, DICTIONARY } from '../services/i18n';

interface VolatilityHeatmapProps {
  candidates: CandidateCoin[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  language?: Language;
}

export function VolatilityHeatmap({
  candidates,
  selectedSymbol,
  onSelectSymbol,
  language = 'kz',
}: VolatilityHeatmapProps) {
  const t = DICTIONARY[language];
  const [viewMode, setViewMode] = useState<'grid' | 'scatter'>('grid');
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const gridSvgRef = useRef<SVGSVGElement | null>(null);
  const scatterSvgRef = useRef<SVGSVGElement | null>(null);
  const legendSvgRef = useRef<SVGSVGElement | null>(null);

  // Calculate ATR percentage and Volatility Analyst verdict for each candidate
  const enrichedCandidates = useMemo(() => {
    return candidates.map((c) => {
      const atrPct = c.lastPrice > 0 ? (c.atr / c.lastPrice) * 100 : 0;

      // Volatility & Momentum composite risk score (0 to 1)
      // Higher ATR and higher RSI map to warmer, intense colors
      const normAtr = Math.min(1, Math.max(0, (atrPct - 0.8) / 5.2));
      const normRsi = Math.min(1, Math.max(0, (c.rsi - 35) / 45));
      const riskScore = Math.min(1, Math.max(0, normAtr * 0.55 + normRsi * 0.45));

      // 8-ші Агент: Құбылмалылық талдаушысының шешімі
      const isRsiOptimal = c.rsi >= 35 && c.rsi <= 68;
      const isAtrNormal = atrPct >= 0.8 && atrPct <= 5.8;
      const approved = isRsiOptimal && isAtrNormal;

      let verdictText = t.normalVolatility;
      let riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME' = 'LOW';

      if (c.rsi > 70) {
        verdictText = t.overboughtWarning;
        riskTier = 'EXTREME';
      } else if (atrPct > 5.5) {
        verdictText = t.highVolatility;
        riskTier = 'HIGH';
      } else if (atrPct < 0.8) {
        verdictText = t.lowVolatility;
        riskTier = 'LOW';
      } else {
        riskTier = riskScore > 0.55 ? 'MEDIUM' : 'LOW';
      }

      return {
        ...c,
        atrPct,
        riskScore,
        approved,
        verdictText,
        riskTier,
      };
    });
  }, [candidates]);

  // D3 Color Scale mapping higher ATR & RSI to warmer, intense colors
  const colorScale = useMemo(() => {
    return d3.scaleSequential<string>()
      .domain([0, 1])
      .interpolator(
        d3.interpolateRgbBasis([
          '#059669', // Cool Emerald (Safe / Low Volatility)
          '#0284c7', // Sky Blue (Balanced)
          '#eab308', // Warm Yellow (Moderate Volatility)
          '#f97316', // Intense Orange (Elevated Volatility)
          '#ef4444', // Hot Crimson Red (Critical Volatility / Extreme RSI)
        ])
      );
  }, []);

  // 1. Render D3 Color-Coded Matrix Grid using pure D3 selection and data binding
  useEffect(() => {
    if (viewMode !== 'grid' || !gridSvgRef.current) return;

    const svg = d3.select(gridSvgRef.current);
    svg.selectAll('*').remove();

    const data = enrichedCandidates;
    const numItems = data.length;
    const cols = 4;
    const rows = Math.ceil(numItems / cols);

    const cellWidth = 195;
    const cellHeight = 88;
    const gap = 12;

    const totalWidth = cols * cellWidth + (cols - 1) * gap;
    const totalHeight = rows * cellHeight + (rows - 1) * gap;

    svg.attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`);

    // Create D3 groups for each candidate symbol
    const cells = svg
      .selectAll('.grid-cell')
      .data(data, (d: any) => d.symbol)
      .enter()
      .append('g')
      .attr('class', 'grid-cell cursor-pointer transition-transform')
      .attr('transform', (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * (cellWidth + gap);
        const y = row * (cellHeight + gap);
        return `translate(${x},${y})`;
      })
      .on('click', (_, d) => onSelectSymbol(d.symbol))
      .on('mouseenter', (_, d) => setHoveredSymbol(d.symbol))
      .on('mouseleave', () => setHoveredSymbol(null));

    // Base Card Rectangle
    cells
      .append('rect')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('rx', 10)
      .attr('fill', '#090d16')
      .attr('stroke', (d) => (d.symbol === selectedSymbol ? '#fbbf24' : '#1e293b'))
      .attr('stroke-width', (d) => (d.symbol === selectedSymbol ? 2 : 1))
      .attr('filter', (d) =>
        d.symbol === selectedSymbol ? 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.3))' : null
      );

    // Warm Volatility Intensity Accent Bar (colored via D3 colorScale)
    cells
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', cellWidth)
      .attr('height', 5)
      .attr('rx', 3)
      .attr('fill', (d) => colorScale(d.riskScore));

    // Warm Volatility Subtle Background Glow
    cells
      .append('rect')
      .attr('x', 0)
      .attr('y', 5)
      .attr('width', cellWidth)
      .attr('height', cellHeight - 5)
      .attr('fill', (d) => colorScale(d.riskScore))
      .attr('opacity', (d) => (d.symbol === selectedSymbol ? 0.14 : 0.07));

    // Symbol Name Text
    cells
      .append('text')
      .attr('x', 14)
      .attr('y', 28)
      .attr('fill', '#ffffff')
      .attr('font-size', '13px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'sans-serif')
      .text((d) => d.symbol);

    // Live Price Text
    cells
      .append('text')
      .attr('x', cellWidth - 14)
      .attr('y', 28)
      .attr('text-anchor', 'end')
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px')
      .attr('font-family', 'monospace')
      .text((d) => `$${d.lastPrice > 1 ? d.lastPrice.toLocaleString() : d.lastPrice}`);

    // Separator Line
    cells
      .append('line')
      .attr('x1', 12)
      .attr('y1', 38)
      .attr('x2', cellWidth - 12)
      .attr('y2', 38)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1);

    // ATR Metric Text (Color-coded)
    const atrGroup = cells.append('g').attr('transform', 'translate(14, 55)');
    atrGroup
      .append('text')
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .text('ATR: ');
    atrGroup
      .append('text')
      .attr('x', 32)
      .attr('fill', (d) => (d.atrPct > 5.5 ? '#ef4444' : '#38bdf8'))
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .text((d) => `${d.atrPct.toFixed(1)}% ($${d.atr})`);

    // RSI Metric Text (Color-coded based on overbought warm color)
    const rsiGroup = cells.append('g').attr('transform', 'translate(14, 73)');
    rsiGroup
      .append('text')
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .text('RSI: ');
    rsiGroup
      .append('text')
      .attr('x', 30)
      .attr('fill', (d) => (d.rsi > 70 ? '#ef4444' : d.rsi < 35 ? '#10b981' : '#f8fafc'))
      .attr('font-size', '11px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .text((d) => `${d.rsi} ${d.rsi > 70 ? '🔥' : ''}`);

    // Agent Approval Badge on Cell
    cells
      .append('text')
      .attr('x', cellWidth - 14)
      .attr('y', 73)
      .attr('text-anchor', 'end')
      .attr('fill', (d) => (d.approved ? '#10b981' : '#f43f5e'))
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'sans-serif')
      .text((d) => (d.approved ? '✓ Қалыпты' : '⚠ Тәуекел'));
  }, [viewMode, enrichedCandidates, selectedSymbol, colorScale, onSelectSymbol]);

  // 2. Render D3 Scatter/Quadrant Chart
  useEffect(() => {
    if (viewMode !== 'scatter' || !scatterSvgRef.current) return;

    const svg = d3.select(scatterSvgRef.current);
    svg.selectAll('*').remove();

    const width = 680;
    const height = 280;
    const margin = { top: 25, right: 35, bottom: 45, left: 55 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale: RSI (25 to 85)
    const xScale = d3.scaleLinear().domain([25, 85]).range([0, innerWidth]);

    // Y scale: ATR % (0% to 10%)
    const maxAtr = Math.max(8, d3.max(enrichedCandidates, (d) => d.atrPct) || 8);
    const yScale = d3.scaleLinear().domain([0, maxAtr * 1.15]).range([innerHeight, 0]);

    // Background Zones
    // Optimal zone: RSI 35-68, ATR 1-5.8%
    g.append('rect')
      .attr('x', xScale(35))
      .attr('y', yScale(5.8))
      .attr('width', xScale(68) - xScale(35))
      .attr('height', yScale(1.0) - yScale(5.8))
      .attr('fill', '#10b981')
      .attr('opacity', 0.08)
      .attr('rx', 4);

    // Overbought zone: RSI > 70
    g.append('rect')
      .attr('x', xScale(70))
      .attr('y', 0)
      .attr('width', innerWidth - xScale(70))
      .attr('height', innerHeight)
      .attr('fill', '#ef4444')
      .attr('opacity', 0.09);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', '#1e293b')
      .attr('stroke-dasharray', '2 2')
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6)
          .tickSize(innerHeight)
          .tickFormat(() => '')
      )
      .select('.domain')
      .remove();

    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', '#1e293b')
      .attr('stroke-dasharray', '2 2')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .select('.domain')
      .remove();

    // X Axis
    const xAxis = d3.axisBottom(xScale).ticks(7);
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');

    // X Axis Label
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 35)
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .text('RSI (Импульс / Перекупленность)');

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat((d) => `${d}%`);
    g.append('g')
      .call(yAxis)
      .attr('color', '#64748b')
      .selectAll('text')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace');

    // Y Axis Label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('fill', '#94a3b8')
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .text('ATR % (Құбылмалылық Дірілі)');

    // Draw Candidate Points
    const nodes = g
      .selectAll('.point')
      .data(enrichedCandidates)
      .enter()
      .append('g')
      .attr('class', 'point cursor-pointer')
      .attr('transform', (d) => `translate(${xScale(d.rsi)},${yScale(d.atrPct)})`)
      .on('click', (_, d) => onSelectSymbol(d.symbol))
      .on('mouseenter', (_, d) => setHoveredSymbol(d.symbol))
      .on('mouseleave', () => setHoveredSymbol(null));

    // Outer glow for selected
    nodes
      .filter((d) => d.symbol === selectedSymbol)
      .append('circle')
      .attr('r', 12)
      .attr('fill', 'none')
      .attr('stroke', '#fbbf24')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '3 2');

    // Dot circle (colored via D3 colorScale: warmer for higher ATR and RSI)
    nodes
      .append('circle')
      .attr('r', (d) => (d.symbol === selectedSymbol ? 7 : 5.5))
      .attr('fill', (d) => colorScale(d.riskScore))
      .attr('stroke', '#090d16')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.95);

    // Label on point
    nodes
      .append('text')
      .attr('x', 9)
      .attr('y', 4)
      .attr('fill', (d) => (d.symbol === selectedSymbol ? '#fbbf24' : '#e2e8f0'))
      .attr('font-size', '10px')
      .attr('font-weight', (d) => (d.symbol === selectedSymbol ? 'bold' : 'normal'))
      .attr('font-family', 'monospace')
      .text((d) => d.symbol.replace('USDT', ''));
  }, [viewMode, enrichedCandidates, selectedSymbol, colorScale, onSelectSymbol]);

  // 3. Render D3 Color Legend Bar
  useEffect(() => {
    if (!legendSvgRef.current) return;

    const svg = d3.select(legendSvgRef.current);
    svg.selectAll('*').remove();

    const width = 160;
    const height = 10;

    const defs = svg.append('defs');
    const linearGradient = defs
      .append('linearGradient')
      .attr('id', 'volatility-warm-grad')
      .attr('x1', '0%')
      .attr('x2', '100%');

    linearGradient.append('stop').attr('offset', '0%').attr('stop-color', '#059669');
    linearGradient.append('stop').attr('offset', '25%').attr('stop-color', '#0284c7');
    linearGradient.append('stop').attr('offset', '50%').attr('stop-color', '#eab308');
    linearGradient.append('stop').attr('offset', '75%').attr('stop-color', '#f97316');
    linearGradient.append('stop').attr('offset', '100%').attr('stop-color', '#ef4444');

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('rx', 3)
      .style('fill', 'url(#volatility-warm-grad)');
  }, []);

  const selectedItem =
    enrichedCandidates.find((c) => c.symbol === selectedSymbol) || enrichedCandidates[0];

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
      {/* 1. Header Bar with Agent Title and View Switch */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {t.volatilityHeatmapTitle}
              </h3>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                {t.agent8Badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.volatilityHeatmapDesc}
            </p>
          </div>
        </div>

        {/* View mode toggle & D3 Gradient Legend */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-emerald-400">{t.legendSafe}</span>
              <svg ref={legendSvgRef} width="160" height="10" />
              <span className="text-rose-400">{t.legendHighRisk}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-amber-500/20 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.viewD3Grid}
            </button>
            <button
              onClick={() => setViewMode('scatter')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'scatter'
                  ? 'bg-amber-500/20 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.viewD3Quadrant}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main D3 Visual Canvas */}
      {viewMode === 'grid' ? (
        /* D3 Color-Coded Grid of Symbols */
        <div className="w-full overflow-x-auto bg-slate-950/60 rounded-xl border border-slate-800/80 p-3">
          <svg ref={gridSvgRef} className="w-full h-auto min-w-[760px] select-none" />
        </div>
      ) : (
        /* D3 Scatter Canvas */
        <div className="w-full overflow-hidden bg-slate-950/80 rounded-xl border border-slate-800 p-2">
          <svg ref={scatterSvgRef} className="w-full h-72 select-none" />
        </div>
      )}

      {/* 3. 8-ші Агент: Құбылмалылық талдаушысының тұжырымдамасы */}
      {selectedItem && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-sans">{t.selectedAsset}</span>
              <strong className="text-white font-bold">{selectedItem.symbol}</strong>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-400">{t.atrNoise} </span>
              <strong className="text-sky-400">${selectedItem.atr}</strong>
              <span className="text-slate-400"> ({selectedItem.atrPct.toFixed(2)}%)</span>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-400">RSI (14): </span>
              <strong className={selectedItem.rsi > 70 ? 'text-rose-400' : 'text-emerald-400'}>
                {selectedItem.rsi}
              </strong>
            </div>
            <span>·</span>
            <div>
              <span className="text-slate-400">{t.riskIndex} </span>
              <span
                className="font-bold px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  backgroundColor: `${colorScale(selectedItem.riskScore)}25`,
                  color: colorScale(selectedItem.riskScore),
                }}
              >
                {(selectedItem.riskScore * 100).toFixed(0)}% ({selectedItem.riskTier})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-sans">{t.volatilityAnalystVerdict}</span>
            <span
              className={`font-sans font-semibold px-2 py-0.5 rounded text-[11px] ${
                selectedItem.approved
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {selectedItem.verdictText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
