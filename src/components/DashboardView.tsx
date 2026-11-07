import { useState } from 'react';
import {
  CandidateCoin,
  Position,
  RiskSettings,
  CouncilEvaluation,
  MarketCandle,
} from '../types/apex';
import { CandlestickChart } from './CandlestickChart';
import { VolatilityHeatmap } from './VolatilityHeatmap';
import {
  Play,
  Square,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Layers,
  Sparkles,
  Ban,
  Loader2,
} from 'lucide-react';

import { Language, DICTIONARY } from '../services/i18n';

interface DashboardViewProps {
  candidates: CandidateCoin[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  candles: MarketCandle[];
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  positions: Position[];
  riskSettings: RiskSettings;
  freeUsdt: number;
  totalEquity: number;
  isAutoTrading: boolean;
  onToggleAutoTrading: () => void;
  countdownSec: number;
  onManualScan: () => void;
  isScanning: boolean;
  onOpenPosition: (candidate: CandidateCoin, evaluation: CouncilEvaluation) => void;
  latestEvaluation: CouncilEvaluation | null;
  onConsultGemini: (candidate: CandidateCoin) => void;
  isGeminiLoading: boolean;
  language: Language;
}

export function DashboardView({
  candidates,
  selectedSymbol,
  onSelectSymbol,
  candles,
  timeframe,
  onTimeframeChange,
  positions,
  riskSettings,
  freeUsdt,
  totalEquity,
  isAutoTrading,
  onToggleAutoTrading,
  countdownSec,
  onManualScan,
  isScanning,
  onOpenPosition,
  latestEvaluation,
  onConsultGemini,
  isGeminiLoading,
  language,
}: DashboardViewProps) {
  const t = DICTIONARY[language];
  const selectedCoin = candidates.find((c) => c.symbol === selectedSymbol) || candidates[0];

  const isSelectedOpen = positions.some((p) => p.symbol === selectedCoin?.symbol);
  const inPositionsUsdt = positions.reduce(
    (acc, p) => acc + p.amount * p.currentPrice,
    0
  );
  const totalPnlUsdt = positions.reduce((acc, p) => acc + p.pnlUsdt, 0);

  return (
    <div className="space-y-6">
      {/* 1. Metric Strip - Financial Ledger & System State */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t.totalEquity}
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">
            ${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs font-normal text-slate-400 ml-1">USDT</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {t.totalEquityDesc}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t.freeUsdt}
          </div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1 tabular-nums">
            ${freeUsdt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-xs font-normal text-slate-400 ml-1">USDT</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {t.freeUsdtDesc}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t.openPositions}
          </div>
          <div className="text-xl font-bold font-mono text-sky-400 mt-1 tabular-nums">
            ${inPositionsUsdt.toFixed(2)}
            <span className="text-xs font-normal text-slate-400 ml-1.5 font-sans">
              ({positions.length}/2)
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {t.openPositionsDesc}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t.currentPnl}
          </div>
          <div
            className={`text-xl font-bold font-mono mt-1 tabular-nums flex items-center gap-1 ${
              totalPnlUsdt >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalPnlUsdt >= 0 ? '+' : ''}${totalPnlUsdt.toFixed(2)}
            <span className="text-xs font-normal text-slate-400">
              ({((totalPnlUsdt / (totalEquity || 1)) * 100).toFixed(2)}%)
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {t.currentPnlDesc}
          </div>
        </div>
      </div>

      {/* 2. Autonomous Loop Control Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleAutoTrading}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
              isAutoTrading
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/40'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-900/30'
            }`}
          >
            {isAutoTrading ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{t.stopAutoTrading}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.startAutoTrading}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onManualScan}
            disabled={isScanning}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-amber-400' : ''}`} />
            <span>{isScanning ? t.scanning : t.scanNow}</span>
          </button>

          {/* Countdown indicator */}
          {isAutoTrading && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
              <Clock className="w-3.5 h-3.5" />
              <span>{t.nextScanIn} <strong>{countdownSec}с</strong></span>
            </div>
          )}
        </div>

        {/* Market Regime Badge & Safe status */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>{t.marketRegime}</span>
            <span
              className={`font-semibold font-mono uppercase px-2 py-0.5 rounded ${
                riskSettings.marketRegime === 'bull'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : riskSettings.marketRegime === 'bear'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}
            >
              {riskSettings.marketRegime}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">{t.stopLossLimitActive}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Chart and Chief Decision Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Candlestick Chart (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <CandlestickChart
            candles={candles}
            symbol={selectedCoin?.symbol || 'BTCUSDT'}
            currentPrice={selectedCoin?.lastPrice || 91400}
            entryPrice={latestEvaluation?.recommendedEntry}
            stopLossPrice={latestEvaluation?.recommendedStopLoss}
            takeProfitPrice={latestEvaluation?.recommendedTakeProfit}
            timeframe={timeframe}
            onTimeframeChange={onTimeframeChange}
            isLoading={isScanning}
          />
        </div>

        {/* Right: 21st Chief Supreme Agent Decision Card */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.chiefVerdictTitle}
                    </h3>
                    <p className="text-[10px] text-slate-400">{t.chiefVerdictSubtitle}</p>
                  </div>
                </div>

                {latestEvaluation && (
                  <span
                    className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      latestEvaluation.verdict === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {latestEvaluation.verdict === 'APPROVED' ? t.verdictApproved : t.verdictRejected}
                  </span>
                )}
              </div>

              {latestEvaluation ? (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    {latestEvaluation.chiefSummary}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">{t.votesFor}</div>
                      <div className="text-sm font-bold text-emerald-400 tabular-nums">
                        {latestEvaluation.approvedCount} / 20
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-[10px] text-slate-400">{t.votesAgainst}</div>
                      <div className="text-sm font-bold text-rose-400 tabular-nums">
                        {latestEvaluation.rejectedCount} / 20
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{t.symbol}</span>
                      <strong className="text-white">{latestEvaluation.symbol}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{t.stopLoss}</span>
                      <strong className="text-rose-400">${latestEvaluation.recommendedStopLoss}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{t.takeProfit}</span>
                      <strong className="text-emerald-400">${latestEvaluation.recommendedTakeProfit}</strong>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{t.riskReward}</span>
                      <strong className="text-amber-400">{latestEvaluation.riskRewardRatio}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
                  <p>{t.noScanYet}</p>
                  <p className="text-[11px]">{t.noScanSub}</p>
                </div>
              )}
            </div>

            {/* Action buttons on decision card */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => onConsultGemini(selectedCoin)}
                disabled={isGeminiLoading}
                className="w-full py-2 px-3 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
              >
                {isGeminiLoading ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span>{isGeminiLoading ? t.consultingGemini : t.consultGemini}</span>
              </button>

              {latestEvaluation && latestEvaluation.verdict === 'APPROVED' && (
                <button
                  type="button"
                  onClick={() => onOpenPosition(selectedCoin, latestEvaluation)}
                  disabled={isSelectedOpen || positions.length >= 2 || freeUsdt < 5}
                  title={isSelectedOpen ? t.positionAlreadyOpen : undefined}
                  className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    isSelectedOpen
                      ? 'bg-slate-800 text-rose-400 border border-rose-500/30 cursor-not-allowed opacity-90'
                      : 'text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40'
                  }`}
                >
                  {isSelectedOpen ? (
                    <>
                      <Ban className="w-4 h-4 text-rose-400" />
                      <span>{t.positionAlreadyOpen}</span>
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="w-4 h-4" />
                      <span>{t.executeSpotOrder}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Volatility Analyst Heatmap Widget (D3) */}
      <VolatilityHeatmap
        candidates={candidates}
        selectedSymbol={selectedSymbol}
        onSelectSymbol={onSelectSymbol}
        language={language}
      />

      {/* 5. Spot Candidate Scanner Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.scannerTitle}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t.scannerSubtitle}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {candidates.length} {t.coinsTracked}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">{t.colSymbol}</th>
                <th className="py-3 px-4 text-right">{t.colPrice}</th>
                <th className="py-3 px-4 text-right">{t.colChange24h}</th>
                <th className="py-3 px-4 text-right">{t.colVolume24h}</th>
                <th className="py-3 px-4 text-center">{t.colRsi}</th>
                <th className="py-3 px-4 text-center">{t.colCategory}</th>
                <th className="py-3 px-4 text-center">{t.colStatus}</th>
                <th className="py-3 px-4 text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {candidates.map((coin) => {
                const isSelected = coin.symbol === selectedSymbol;
                const isPositive = coin.priceChangePercent >= 0;
                const isCoinOpen = positions.some((p) => p.symbol === coin.symbol);

                return (
                  <tr
                    key={coin.symbol}
                    onClick={() => onSelectSymbol(coin.symbol)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/10 text-white'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                      <span>{coin.symbol}</span>
                      {isCoinOpen && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-normal">
                          {language === 'kz' ? 'АШЫҚ' : 'ОТКРЫТА'}
                        </span>
                      )}
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </td>

                    <td className="py-3 px-4 text-right font-mono font-medium tabular-nums">
                      ${coin.lastPrice > 1 ? coin.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : coin.lastPrice}
                    </td>

                    <td
                      className={`py-3 px-4 text-right font-mono font-semibold tabular-nums ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? '+' : ''}{coin.priceChangePercent.toFixed(2)}%
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-slate-400 tabular-nums">
                      ${(coin.quoteVolume / 1e6).toFixed(1)}M
                    </td>

                    <td className="py-3 px-4 text-center font-mono tabular-nums">
                      <span
                        className={
                          coin.rsi > 70
                            ? 'text-rose-400 font-bold'
                            : coin.rsi < 35
                            ? 'text-emerald-400 font-bold'
                            : 'text-slate-300'
                        }
                      >
                        {coin.rsi}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] text-slate-400 font-sans">
                        {coin.isMemecoin ? t.catMeme : t.catMajor}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] text-slate-300 font-sans">
                        {coin.status === 'APPROVED' && t.statusApproved}
                        {coin.status === 'REJECTED' && t.statusRejected}
                        {coin.status === 'ANALYZING' && t.statusAnalyzing}
                        {coin.status === 'WAITING_CANDLE' && t.statusWaitingCandle}
                        {coin.status === 'IDLE' && t.statusIdle}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSymbol(coin.symbol);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded transition-colors whitespace-nowrap"
                      >
                        {t.btnChart}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
