import { useState, useEffect } from 'react';
import { BinanceConfig, TradingMode } from '../types/apex';
import {
  KeyRound,
  ShieldAlert,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  Globe,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Language, DICTIONARY } from '../services/i18n';

interface OnboardingModalProps {
  isOpen: boolean;
  currentConfig: BinanceConfig;
  onSave: (config: BinanceConfig) => void;
  onClose?: () => void;
  isFirstTime?: boolean;
  language?: Language;
}

export function OnboardingModal({
  isOpen,
  currentConfig,
  onSave,
  onClose,
  isFirstTime = false,
  language = 'kz',
}: OnboardingModalProps) {
  const t = DICTIONARY[language];
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [apiSecret, setApiSecret] = useState(currentConfig.apiSecret || '');
  const [geminiApiKey, setGeminiApiKey] = useState(currentConfig.geminiApiKey || '');
  const [mode, setMode] = useState<TradingMode>(currentConfig.mode || 'paper');
  const [showSecret, setShowSecret] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [ipNoted, setIpNoted] = useState(currentConfig.ipWhitelistNoted || false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [serverIp, setServerIp] = useState<string>('');
  const [copiedIp, setCopiedIp] = useState(false);

  // Fetch server public outbound IP on mount
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

  if (!isOpen) return null;

  const handleCopyIp = async () => {
    if (!serverIp) return;
    try {
      await navigator.clipboard.writeText(serverIp);
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2500);
    } catch {
      // Fallback
      setCopiedIp(true);
      setTimeout(() => setCopiedIp(false), 2500);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/binance/test-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, apiSecret, mode }),
      });
      const data = await res.json();
      setTestResult({
        success: data.success,
        message:
          data.message ||
          (data.success
            ? language === 'kz'
              ? 'Қосылым расталды!'
              : 'Соединение подтверждено!'
            : language === 'kz'
            ? 'Қате орын алды'
            : 'Произошла ошибка'),
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `${
          language === 'kz' ? 'Серверге қосылу қатесі:' : 'Ошибка соединения с сервером:'
        } ${err.message}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    onSave({
      apiKey: apiKey.trim(),
      apiSecret: apiSecret.trim(),
      geminiApiKey: geminiApiKey.trim(),
      mode,
      isConfigured: true,
      ipWhitelistNoted: ipNoted,
      paperBalanceUsdt: currentConfig.paperBalanceUsdt || 1000.0,
      lastConnectedAt: Date.now(),
    });
  };

  const handleQuickPaperStart = () => {
    onSave({
      apiKey: 'PAPER_TRADING_DEMO_KEY',
      apiSecret: 'PAPER_TRADING_DEMO_SECRET',
      geminiApiKey: geminiApiKey.trim(),
      mode: 'paper',
      isConfigured: true,
      ipWhitelistNoted: true,
      paperBalanceUsdt: 1000.0,
      lastConnectedAt: Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isFirstTime ? t.onboardingTitleFirst : t.onboardingTitleSettings}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{t.onboardingSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {t.selectMode}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setMode('paper')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'paper'
                    ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{t.modePaperTitle}</span>
                  <span className="text-[10px] text-amber-300/80 font-mono">{t.modePaperBadge}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.modePaperDesc}</p>
              </button>

              <button
                type="button"
                onClick={() => setMode('testnet')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'testnet'
                    ? 'border-sky-500 bg-sky-500/10 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-sky-400">{t.modeTestnetTitle}</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.modeTestnetDesc}</p>
              </button>

              <button
                type="button"
                onClick={() => setMode('live')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'live'
                    ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-sm'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">{t.modeLiveTitle}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">50-100$</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{t.modeLiveDesc}</p>
              </button>
            </div>
          </div>

          {/* API Keys Inputs */}
          <div className="space-y-4">
            {/* Binance API Key */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">{t.apiKeyLabel}</label>
                {mode === 'paper' && (
                  <span className="text-[10px] text-slate-500">{t.paperKeyOptional}</span>
                )}
              </div>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={mode === 'paper' ? t.paperKeyOptional : t.apiKeyPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono transition-colors"
              />
            </div>

            {/* Binance API Secret */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-300">{t.apiSecretLabel}</label>
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSecret ? t.hideSecret : t.showSecret}</span>
                </button>
              </div>
              <input
                type={showSecret ? 'text' : 'password'}
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder={mode === 'paper' ? t.paperKeyOptional : t.apiSecretPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono transition-colors"
              />
            </div>

            {/* Gemini AI API Key (Powers the 21st Chief Supreme Agent) */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.geminiApiKeyLabel}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  {showGeminiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showGeminiKey ? t.hideSecret : t.showSecret}</span>
                </button>
              </div>
              <input
                type={showGeminiKey ? 'text' : 'password'}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder={t.geminiApiKeyPlaceholder}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono transition-colors"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {t.geminiApiKeyDesc}
              </p>
            </div>
          </div>

          {/* Dedicated Server IP Whitelist Card (For Binance API restriction) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/25 space-y-2.5">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
              <Globe className="w-4 h-4 shrink-0" />
              <span>{t.ipWhitelistTitle}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.ipWhitelistDesc}
            </p>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">IP:</span>
                <span className="text-sky-300 font-bold tracking-wider select-all">
                  {serverIp || (language === 'kz' ? 'Анықталуда...' : 'Определение...')}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyIp}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                  copiedIp
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}
              >
                {copiedIp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIp ? t.ipCopied : t.copyIpBtn}</span>
              </button>
            </div>
          </div>

          {/* Safety Notice & Permanent Storage Guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2.5">
            <div className="flex items-start gap-2 text-amber-400 font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{t.safetyTitle}</span>
            </div>
            <ul className="text-slate-400 text-[11px] space-y-1 pl-6 list-disc">
              <li>{t.safetyRule1}</li>
              <li>
                <strong className="text-rose-400">{t.safetyRule2}</strong>
              </li>
              <li>{t.safetyRule3}</li>
            </ul>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/15">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{t.keysSavedForeverNotice}</span>
            </div>

            <label className="flex items-center gap-2 pt-1 text-[11px] text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={ipNoted}
                onChange={(e) => setIpNoted(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-0"
              />
              <span>{t.safetyCheckbox}</span>
            </label>
          </div>

          {/* Test connection response */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                testResult.success
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              )}
              <span className="leading-snug">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {isTesting ? t.testingConnection : t.testConnectionBtn}
            </button>
            {isFirstTime && (
              <button
                type="button"
                onClick={handleQuickPaperStart}
                className="px-3 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl transition-colors whitespace-nowrap"
              >
                {t.quickPaperBtn}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isFirstTime && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                {t.closeBtn}
              </button>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t.saveAndLaunchBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
