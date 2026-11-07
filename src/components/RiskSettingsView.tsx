import { useState, useEffect } from 'react';
import { RiskSettings, BinanceConfig, AuditLog } from '../types/apex';
import { Language, DICTIONARY } from '../services/i18n';
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Sparkles,
  Globe,
  Copy,
  Check,
} from 'lucide-react';

interface RiskSettingsViewProps {
  riskSettings: RiskSettings;
  onUpdateRiskSettings: (newSettings: RiskSettings) => void;
  config: BinanceConfig;
  openConfigModal: () => void;
  auditLogs: AuditLog[];
  onClearLogs: () => void;
  onResetAllData: () => void;
  language?: Language;
}

export function RiskSettingsView({
  riskSettings,
  onUpdateRiskSettings,
  config,
  openConfigModal,
  auditLogs,
  onClearLogs,
  onResetAllData,
  language = 'kz',
}: RiskSettingsViewProps) {
  const t = DICTIONARY[language];
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [serverIp, setServerIp] = useState<string>('');
  const [copiedIp, setCopiedIp] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/server-ip')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.ip) {
          setServerIp(data.ip);
        }
      })
      .catch(() => {
        if (isMounted) setServerIp('34.128.52.19');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyIp = async () => {
    if (!serverIp) return;
    try {
      await navigator.clipboard.writeText(serverIp);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2500);
    } catch {
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            {t.riskSettingsTitle}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.riskSettingsSubtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={openConfigModal}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
        >
          <KeyRound className="w-4 h-4" />
          <span>{t.changeKeysBtn}</span>
        </button>
      </div>

      {/* 2. Grid: Binance Config + Hardcoded Risk Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Binance Key Vault Status */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{t.savedKeysTitle}</span>
            </h3>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                config.mode === 'live'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}
            >
              {config.mode}
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">{t.apiKeyLabel}</div>
              <div className="text-white mt-1 truncate">
                {config.apiKey ? `${config.apiKey.slice(0, 10)}••••••••••••••••${config.apiKey.slice(-6)}` : (language === 'kz' ? 'Кілт енгізілмеген' : 'Ключ не введен')}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">{t.apiSecretLabel}</div>
              <div className="text-slate-400 mt-1">
                {config.apiSecret ? '••••••••••••••••••••••••••••••••' : (language === 'kz' ? 'Secret енгізілмеген' : 'Secret не введен')}
              </div>
            </div>

            {/* Gemini AI API Key */}
            <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/20">
              <div className="text-[10px] text-amber-400 font-semibold uppercase flex items-center gap-1.5 font-sans">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{t.geminiApiKeyLabel}</span>
              </div>
              <div className="text-amber-200 mt-1 truncate">
                {config.geminiApiKey ? `${config.geminiApiKey.slice(0, 10)}••••••••••••` : (language === 'kz' ? 'Серверлік Gemini 3.8 Flash кілті белсенді' : 'Активен системный Gemini 3.8 Flash')}
              </div>
            </div>

            {/* Binance IP Whitelist */}
            <div className="p-3 rounded-lg bg-slate-950 border border-sky-500/25 space-y-2 font-sans">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-sky-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{t.ipWhitelistTitle}</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyIp}
                  className={`px-2.5 py-1 text-[11px] rounded-md font-mono flex items-center gap-1 transition-all ${
                    copiedIp
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  }`}
                >
                  {copiedIp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedIp ? t.ipCopied : t.copyIpBtn}</span>
                </button>
              </div>
              <div className="font-mono text-xs font-bold text-sky-300 bg-slate-900 px-2 py-1.5 rounded border border-slate-800 select-all">
                {serverIp || '34.128.52.19'}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                {t.ipWhitelistDesc}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase">{t.lastConnected}</div>
              <div className="text-slate-300 mt-1">
                {config.lastConnectedAt
                  ? new Date(config.lastConnectedAt).toLocaleString()
                  : (language === 'kz' ? 'Сәтті қосылған' : 'Подключено')}
              </div>
            </div>
          </div>

          {/* Permanent Storage Notice */}
          <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] leading-tight">{t.keysSavedForeverNotice}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.spotProtectedTitle}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {t.spotProtectedDesc}
            </p>
          </div>
        </div>

        {/* Right: Hardcoded Risk Manager Rules */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.hardcodedRulesTitle}</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">{t.cannotBeModified}</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleDailyLoss}</span>
              <strong className="font-mono text-amber-400">3.0%</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleWeeklyLoss}</span>
              <strong className="font-mono text-amber-400">7.0%</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleMaxDrawdown}</span>
              <strong className="font-mono text-rose-400">15.0% (KILL-SWITCH)</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleSlippage}</span>
              <strong className="font-mono text-slate-200">≤ 0.5%</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleMaxPositions}</span>
              <strong className="font-mono text-slate-200">2</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.rulePositionSize}</span>
              <strong className="font-mono text-slate-200">≤30% (Meme ≤10%)</strong>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-300">{t.ruleMinOrder}</span>
              <strong className="font-mono text-slate-200">≥ 5 USDT</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. System Audit Logs */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.auditLogsTitle}
            </h3>
          </div>
          <button
            onClick={onClearLogs}
            className="text-[11px] text-slate-400 hover:text-white"
          >
            {t.clearLogsBtn}
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2 font-mono text-xs">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      log.level === 'DANGER'
                        ? 'bg-rose-500/20 text-rose-400'
                        : log.level === 'WARN'
                        ? 'bg-amber-500/20 text-amber-400'
                        : log.level === 'SUCCESS'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-slate-400 font-bold font-sans text-[11px]">
                    [{log.agent}]
                  </span>
                </div>
                <p className="text-slate-300 text-xs font-sans">{log.message}</p>
              </div>

              <span className="text-[10px] text-slate-500 shrink-0">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone: Wipe / Reset */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-300">{t.wipeDataTitle}</h4>
          <p className="text-[11px] text-slate-500">
            {t.wipeDataDesc}
          </p>
        </div>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-3.5 py-1.5 text-xs text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 rounded-lg transition-colors whitespace-nowrap"
        >
          {t.wipeDataBtn}
        </button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-rose-500/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">{t.confirmWipeTitle}</h3>
            <p className="text-xs text-slate-400">
              {t.confirmWipeDesc}
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                {t.cancelBtn}
              </button>
              <button
                onClick={() => {
                  onResetAllData();
                  setShowResetConfirm(false);
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg"
              >
                {t.confirmWipeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
