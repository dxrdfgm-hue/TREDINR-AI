import { useState, useEffect, useRef } from 'react';
import { TelegramMessage, Position, RiskSettings, CandidateCoin, CouncilEvaluation } from '../types/apex';
import { Language, DICTIONARY } from '../services/i18n';
import { Send, Bot, User, ShieldAlert, Sparkles, AlertCircle, Loader2, Beaker } from 'lucide-react';

interface TelegramBotConsoleProps {
  messages: TelegramMessage[];
  onSendMessage: (text: string) => void;
  positions: Position[];
  riskSettings: RiskSettings;
  freeUsdt: number;
  totalEquity: number;
  candidates: CandidateCoin[];
  latestEvaluation: CouncilEvaluation | null;
  isAutoTrading: boolean;
  countdownSec: number;
  onToggleAutoTrading: () => void;
  onCloseAllPositions: () => void;
  onTriggerKillSwitch: () => void;
  onResumeKillSwitch: () => void;
  onManualScan: () => void;
  isScanning?: boolean;
  language?: Language;
}

export function TelegramBotConsole({
  messages,
  onSendMessage,
  positions,
  riskSettings,
  freeUsdt,
  totalEquity,
  candidates,
  latestEvaluation,
  isAutoTrading,
  countdownSec,
  onToggleAutoTrading,
  onCloseAllPositions,
  onTriggerKillSwitch,
  onResumeKillSwitch,
  onManualScan,
  isScanning = false,
  language = 'kz',
}: TelegramBotConsoleProps) {
  const t = DICTIONARY[language];
  const [inputText, setInputText] = useState('');
  const [showCloseAllConfirm, setShowCloseAllConfirm] = useState(false);
  const [showResumeConfirm, setShowResumeConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleButtonClick = (cmd: string) => {
    if (cmd === '/closeall') {
      setShowCloseAllConfirm(true);
      return;
    }
    if (cmd === '/resume') {
      setShowResumeConfirm(true);
      return;
    }
    onSendMessage(cmd);
  };

  return (
    <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[740px]">
      {/* Telegram Channel Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md">
            21
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                APEX Supreme Chief Agent ({language === 'kz' ? '21-ші Бас Агент' : '21-й Главный Агент'})
              </h3>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                BOT
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>{isAutoTrading ? t.tgAutoActive : t.tgManualActive}</span>
              <span>·</span>
              <span>{t.tgSingleAgentRep}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {riskSettings.isKillSwitchActive && (
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>KILL-SWITCH</span>
            </span>
          )}
          <span className="text-xs font-mono text-slate-400">
            {positions.length}/2 {language === 'kz' ? 'позиция' : 'позиций'}
          </span>
        </div>
      </div>

      {/* Live Single Pinned Status Banner (Updated every 5 sec) */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 text-xs font-mono flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-semibold">{t.tgControlPanel}</span>
          <span>{language === 'kz' ? 'Капитал' : 'Капитал'}: ${totalEquity.toFixed(1)} USDT</span>
          <span>·</span>
          <span>{language === 'kz' ? 'Бос' : 'Свободно'}: ${freeUsdt.toFixed(1)} USDT</span>
          <span>·</span>
          <span>P&L: {positions.reduce((a, p) => a + p.pnlUsdt, 0) >= 0 ? '+' : ''}${positions.reduce((a, p) => a + p.pnlUsdt, 0).toFixed(2)}</span>
        </div>
        {isAutoTrading && (
          <div className="text-amber-300 animate-pulse">
            {t.tgCountdown} {countdownSec}{language === 'kz' ? 'с' : 'с'}
          </div>
        )}
      </div>

      {/* Message History Viewport */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
        {messages.map((msg) => {
          const isChief = msg.sender === 'chief_agent';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isChief ? 'justify-start' : 'justify-end'}`}
            >
              {isChief && (
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-3.5 text-xs shadow-sm space-y-2 ${
                  isChief
                    ? 'bg-slate-900 border border-slate-800 text-slate-200'
                    : 'bg-amber-500 text-slate-950 font-medium'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed font-sans">
                  {msg.text}
                </div>

                <div
                  className={`text-[10px] text-right font-mono ${
                    isChief ? 'text-slate-500' : 'text-slate-800'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Inline button pills */}
                {isChief && msg.buttons && msg.buttons.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {msg.buttons.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleButtonClick(b)}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-950 hover:bg-amber-500/20 text-amber-400 border border-slate-800 transition-colors"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isChief && (
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Animated Spinning Action Indicator: Rotating circle requested by user so they never feel the system is frozen */}
        {isScanning && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 shrink-0 mt-1 shadow-sm shadow-amber-500/20">
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            </div>

            <div className="max-w-xl rounded-2xl p-4 text-xs shadow-md bg-slate-900 border border-amber-500/40 text-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
                  <span className="absolute w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
                </div>
                <span className="font-bold text-amber-400 tracking-tight text-xs">
                  {language === 'kz'
                    ? '20 Маман Агент есебі әзірленуде...'
                    : 'Формирование сводного отчета 20 Агентов...'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 ml-auto bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {language === 'kz' ? 'АҒЫМДАҒЫ ҚАДАМ' : 'ТЕКУЩИЙ ЭТАП'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono">
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-amber-400 animate-spin shrink-0" />
                  <span className="truncate">1-5: Қазына/Көлем</span>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-amber-400 animate-spin shrink-0" />
                  <span className="truncate">6-10: Тренд/ATR</span>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-amber-400 animate-spin shrink-0" />
                  <span className="truncate">11-15: Стратегия/Stop</span>
                </div>
                <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 text-amber-400 animate-spin shrink-0" />
                  <span className="truncate">16-20: Сыншы/Risk</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-sans">
                <span>
                  {language === 'kz'
                    ? '⚡ Binance Spot деректері, ATR дірілі және тәуекел сүзгілері өңделуде...'
                    : '⚡ Анализ стакана Spot, шума ATR и жестких лимитов Risk Manager...'}
                </span>
                <span className="text-amber-400 font-mono text-[10px] animate-pulse">
                  LIVE ⟳
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Confirmation Modals for Destructive Telegram Commands */}
      {showCloseAllConfirm && (
        <div className="p-3 bg-rose-950/80 border-t border-rose-500/40 text-xs flex items-center justify-between text-rose-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{t.tgConfirmCloseAll}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCloseAllConfirm(false)}
              className="px-2.5 py-1 text-slate-400 hover:text-white"
            >
              {t.cancelBtn}
            </button>
            <button
              onClick={() => {
                onCloseAllPositions();
                setShowCloseAllConfirm(false);
              }}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg"
            >
              {t.tgConfirmCloseAllYes}
            </button>
          </div>
        </div>
      )}

      {showResumeConfirm && (
        <div className="p-3 bg-amber-950/80 border-t border-amber-500/40 text-xs flex items-center justify-between text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.tgConfirmResume}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowResumeConfirm(false)}
              className="px-2.5 py-1 text-slate-400 hover:text-white"
            >
              {language === 'kz' ? 'Жоқ' : 'Нет'}
            </button>
            <button
              onClick={() => {
                onResumeKillSwitch();
                setShowResumeConfirm(false);
              }}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
            >
              {t.tgConfirmResumeYes}
            </button>
          </div>
        </div>
      )}

      {/* Telegram Command Shortcut Bar */}
      <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => onSendMessage('/status')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /status
        </button>
        <button
          onClick={() => onSendMessage('/scan')}
          disabled={isScanning}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-amber-400 font-mono shrink-0 flex items-center gap-1.5 border border-amber-500/20"
        >
          {isScanning && <Loader2 className="w-3 h-3 animate-spin text-amber-400" />}
          <span>/scan</span>
        </button>
        <button
          onClick={() => onSendMessage('/positions')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /positions
        </button>
        <button
          onClick={() => onSendMessage('/strategies')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /strategies
        </button>
        <button
          onClick={() => onSendMessage('/incubate')}
          className="px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono shrink-0 flex items-center gap-1"
        >
          <Beaker className="w-3 h-3" />
          <span>/incubate</span>
        </button>
        <button
          onClick={() => onSendMessage('/agents')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /agents
        </button>
        <button
          onClick={() => onSendMessage('/mode')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /mode
        </button>
        <button
          onClick={() => onSendMessage('/report')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /report
        </button>
        <button
          onClick={() => onSendMessage('/help')}
          className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 font-mono shrink-0"
        >
          /help
        </button>
        <button
          onClick={() => onSendMessage('/kill')}
          className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-mono shrink-0 border border-rose-500/30"
        >
          /kill
        </button>
      </div>

      {/* Input Field Form */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.tgInputPlaceholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
