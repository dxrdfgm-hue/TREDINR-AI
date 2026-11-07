import { ShieldAlert, ShieldCheck, Globe } from 'lucide-react';
import { Language, DICTIONARY } from '../services/i18n';

interface HeaderBarProps {
  activeTab: 'dashboard' | 'council' | 'positions' | 'strategies' | 'telegram' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'council' | 'positions' | 'strategies' | 'telegram' | 'settings') => void;
  mode: 'paper' | 'testnet' | 'live';
  isKillSwitchActive: boolean;
  onToggleKillSwitch: () => void;
  openConfigModal: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function HeaderBar({
  activeTab,
  setActiveTab,
  mode,
  isKillSwitchActive,
  onToggleKillSwitch,
  openConfigModal,
  language,
  onLanguageChange,
}: HeaderBarProps) {
  const t = DICTIONARY[language];

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('dashboard');
          }}
          className="text-base font-extrabold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 font-sans"
        >
          {t.appName}
        </a>
        <span className="text-xs font-mono uppercase text-slate-500 tracking-wider">
          {mode}
        </span>
      </div>

      {/* Zone 2: 5 clean single-line navigation links */}
      <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'dashboard' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navDashboard}
        </button>
        <button
          onClick={() => setActiveTab('council')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'council' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navCouncil}
        </button>
        <button
          onClick={() => setActiveTab('positions')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'positions' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navPositions}
        </button>
        <button
          onClick={() => setActiveTab('strategies')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'strategies' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navStrategies}
        </button>
        <button
          onClick={() => setActiveTab('telegram')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'telegram' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navTelegram}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'settings' ? 'text-amber-400 font-semibold' : 'hover:text-slate-200'
          }`}
        >
          {t.navSettings}
        </button>
      </nav>

      {/* Zone 3: Language Toggle & Emergency Kill Switch */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Language Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs font-mono">
          <button
            onClick={() => onLanguageChange('kz')}
            className={`px-2 py-1 rounded transition-colors ${
              language === 'kz'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ҚАЗ
          </button>
          <button
            onClick={() => onLanguageChange('ru')}
            className={`px-2 py-1 rounded transition-colors ${
              language === 'ru'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            РУС
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleKillSwitch}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            isKillSwitchActive
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/30 animate-pulse'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          {isKillSwitchActive ? (
            <>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.killSwitchActive}</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.killSwitchReady}</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
