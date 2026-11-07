import { useState } from 'react';
import { Position, BinanceConfig } from '../types/apex';
import { ShieldCheck, AlertOctagon, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Language, DICTIONARY } from '../services/i18n';

interface PositionsViewProps {
  positions: Position[];
  onClosePosition: (id: string) => void;
  onCloseAll: () => void;
  config: BinanceConfig;
  freeUsdt: number;
  totalEquity: number;
  language?: Language;
}

export function PositionsView({
  positions,
  onClosePosition,
  onCloseAll,
  config,
  freeUsdt,
  totalEquity,
  language = 'kz',
}: PositionsViewProps) {
  const t = DICTIONARY[language];
  const [showCloseAllModal, setShowCloseAllModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Overview Strip */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            {t.positionsTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.positionsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCloseAllModal(true)}
            disabled={positions.length === 0}
            className="px-3.5 py-2 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-colors disabled:opacity-40 flex items-center gap-1.5 whitespace-nowrap"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>{t.closeAllPositionsBtn}</span>
          </button>
        </div>
      </div>

      {/* 2. Active Bot Positions Table */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {t.botPositionsTitle}
            </span>
            <span className="text-xs font-mono text-amber-400">
              ({positions.length}/2)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            MODE=<strong className="text-white font-mono uppercase">{config.mode}</strong>
          </span>
        </div>

        {positions.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500 space-y-1">
            <p className="text-slate-400 font-medium">{t.noOpenPositions}</p>
            <p>{t.noOpenPositionsSub}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">{t.colSymbol}</th>
                  <th className="py-3 px-4 text-right">{t.colSize}</th>
                  <th className="py-3 px-4 text-right">{t.colEntryPrice}</th>
                  <th className="py-3 px-4 text-right">{t.colCurrentPrice}</th>
                  <th className="py-3 px-4 text-right">{t.colStopLossExchange}</th>
                  <th className="py-3 px-4 text-right">{t.colTakeProfit}</th>
                  <th className="py-3 px-4 text-right">{t.colPnl}</th>
                  <th className="py-3 px-4 text-center">{t.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {positions.map((pos) => {
                  const isPositive = pos.pnlUsdt >= 0;
                  return (
                    <tr key={pos.id} className="hover:bg-slate-800/40 text-slate-300">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span>{pos.symbol}</span>
                          {pos.isMemecoin && (
                            <span className="text-[9px] text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/20">
                              MEME
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal font-sans">
                          {pos.strategy}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                        {pos.amount}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                        ${pos.entryPrice}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-medium text-white tabular-nums">
                        ${pos.currentPrice}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-rose-400 tabular-nums">
                        <div className="flex items-center justify-end gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>${pos.stopLoss}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono text-emerald-400 tabular-nums">
                        ${pos.takeProfit}
                      </td>

                      <td
                        className={`py-3.5 px-4 text-right font-mono font-bold tabular-nums ${
                          isPositive ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        <div>
                          {isPositive ? '+' : ''}${pos.pnlUsdt.toFixed(2)}
                        </div>
                        <div className="text-[10px] font-normal">
                          ({isPositive ? '+' : ''}{pos.pnlPercent.toFixed(2)}%)
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onClosePosition(pos.id)}
                          className="px-2.5 py-1 text-[11px] font-medium text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500 rounded transition-colors whitespace-nowrap"
                        >
                          {t.btnClose}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Spot Wallet Balances Breakdown */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {t.spotWalletTitle}
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {t.totalEquity}: ${totalEquity.toFixed(2)} USDT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-slate-400 text-[11px]">{t.freeUsdt}</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5 tabular-nums">
                ${freeUsdt.toFixed(2)}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">{t.readyForTrading}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-slate-400 text-[11px]">USDT {t.inActiveOrders}</div>
              <div className="text-sm font-bold text-sky-400 mt-0.5 tabular-nums">
                ${positions.reduce((a, p) => a + p.amount * p.entryPrice, 0).toFixed(2)}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">{t.inActiveOrders}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <div>
              <div className="text-slate-400 text-[11px]">STOP_LOSS_LIMIT</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5 tabular-nums">
                {language === 'kz' ? 'ҚОЙЫЛҒАН (100%)' : 'ВЫСТАВЛЕН (100%)'}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">{t.exchangeGuarantee}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showCloseAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-rose-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertOctagon className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">{t.confirmCloseAllTitle}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.confirmCloseAllText}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCloseAllModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                {t.cancelBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  onCloseAll();
                  setShowCloseAllModal(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors"
              >
                {t.confirmCloseAllBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
