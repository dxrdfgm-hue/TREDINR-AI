import { useState } from 'react';
import { TradingStrategy } from '../types/apex';
import { Language, DICTIONARY } from '../services/i18n';
import {
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Beaker,
  TrendingUp,
  AlertTriangle,
  Play,
  RotateCcw,
  Plus,
  BookOpen,
  Award,
} from 'lucide-react';

interface StrategiesViewProps {
  strategies: TradingStrategy[];
  onAddAIStrategy: () => void;
  onSimulateTestRound: (strategyId: string) => void;
  onResetStrategyErrors: (strategyId: string) => void;
  onToggleStrategyStatus: (strategyId: string) => void;
  language?: Language;
}

export function StrategiesView({
  strategies,
  onAddAIStrategy,
  onSimulateTestRound,
  onResetStrategyErrors,
  onToggleStrategyStatus,
  language = 'kz',
}: StrategiesViewProps) {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'TEST' | 'DISABLED'>('ALL');
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);

  const filteredStrategies = strategies.filter((s) => {
    if (filter === 'ALL') return true;
    return s.status === filter;
  });

  const activeCount = strategies.filter((s) => s.status === 'ACTIVE').length;
  const testCount = strategies.filter((s) => s.status === 'TEST').length;
  const disabledCount = strategies.filter((s) => s.status === 'DISABLED').length;

  const selectedStrategy = strategies.find((s) => s.id === selectedStrategyId);

  return (
    <div className="space-y-6">
      {/* 1. Top Header Banner with Action Buttons */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-white tracking-tight">
              {language === 'kz'
                ? 'Әлемдік Мықты Трейдерлер Стратегиясы & AI Инкубатор'
                : 'Стратегии Мировых Трейдеров & AI Инкубатор'}
            </h2>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              3-LOSS AUTO-KILL
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {language === 'kz'
              ? 'Richard Wyckoff, Paul Tudor Jones, Jim Simons сияқты аңыздардың қағидалары. Қатарынан 3 қате/шығын болса стратегия автоматты өшіріледі. Жаңа AI стратегиясы алдымен тест сынағына қосылып, 3 рет сәтті болғанда ғана нарыққа жіберіледі.'
              : 'Правила легендарных трейдеров (Wyckoff, Tudor Jones, Simons). При 3 ошибках подряд стратегия автоматически отключается. Новые AI алгоритмы инкубируются в тестах и выходят на рынок только после 3 успешных проверок.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onAddAIStrategy}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>
              {language === 'kz' ? 'Жаңа AI Стратегиясын қосу (Тест)' : 'Создать AI Стратегию (Тест)'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Strategy Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400">
            {language === 'kz' ? 'Барлық Стратегиялар' : 'Всего Стратегий'}
          </div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {strategies.length}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/20 bg-emerald-950/10">
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'kz' ? 'Нарықта Белсенді (ACTIVE)' : 'Активны на Рынке'}</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
            {activeCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/20 bg-indigo-950/10">
          <div className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1">
            <Beaker className="w-3.5 h-3.5" />
            <span>{language === 'kz' ? 'Тест Инкубациясында (TEST)' : 'В Тест Инкубаторе'}</span>
          </div>
          <div className="text-xl font-bold font-mono text-indigo-300 mt-1">
            {testCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/20 bg-rose-950/10">
          <div className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{language === 'kz' ? 'Өшірілген (3 Қате)' : 'Отключены (3 Ошибки)'}</span>
          </div>
          <div className="text-xl font-bold font-mono text-rose-300 mt-1">
            {disabledCount}
          </div>
        </div>
      </div>

      {/* 3. Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
            filter === 'ALL'
              ? 'bg-amber-400 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'kz' ? 'Барлығы' : 'Все'} ({strategies.length})
        </button>
        <button
          onClick={() => setFilter('ACTIVE')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
            filter === 'ACTIVE'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'kz' ? 'Нарықтағы (ACTIVE)' : 'На Рынке (ACTIVE)'} ({activeCount})
        </button>
        <button
          onClick={() => setFilter('TEST')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
            filter === 'TEST'
              ? 'bg-indigo-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'kz' ? 'Тест Инкубатор (TEST)' : 'Тест Инкубатор (TEST)'} ({testCount})
        </button>
        <button
          onClick={() => setFilter('DISABLED')}
          className={`px-3 py-1.5 rounded-lg transition-colors shrink-0 font-medium ${
            filter === 'DISABLED'
              ? 'bg-rose-500 text-white font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          {language === 'kz' ? 'Өшірілген (3 Қате)' : 'Отключенные'} ({disabledCount})
        </button>
      </div>

      {/* 4. Strategy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStrategies.map((s) => {
          const isSelected = selectedStrategyId === s.id;
          const isTest = s.status === 'TEST';
          const isDisabled = s.status === 'DISABLED';
          const isActive = s.status === 'ACTIVE';

          return (
            <div
              key={s.id}
              className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                isDisabled
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : isTest
                  ? 'bg-indigo-950/20 border-indigo-500/40'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              } ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
            >
              <div className="space-y-2.5">
                {/* Header tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {s.author}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isTest
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {isActive
                      ? language === 'kz' ? 'НАРЫҚТА' : 'НА РЫНКЕ'
                      : isTest
                      ? language === 'kz' ? 'ТЕСТ СЫНАҚ' : 'ТЕСТ'
                      : language === 'kz' ? 'ӨШІРІЛДІ (3 ҚАТЕ)' : 'ОТКЛЮЧЕНА'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">
                  {s.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {s.description}
                </p>

                {/* 3-Loss Consecutive Error Meter */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      {language === 'kz' ? 'Қатарлас қателер (макс 3):' : 'Ошибки подряд (макс 3):'}
                    </span>
                    <strong
                      className={`font-mono text-xs ${
                        s.consecutiveErrors >= 3
                          ? 'text-rose-400 font-extrabold'
                          : s.consecutiveErrors === 2
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {s.consecutiveErrors} / 3
                    </strong>
                  </div>

                  {/* Visual 3-strike meter */}
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    {[1, 2, 3].map((step) => {
                      const isTriggered = s.consecutiveErrors >= step;
                      return (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full ${
                            isTriggered ? 'bg-rose-500' : 'bg-slate-800'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {isDisabled && s.disabledReason && (
                    <div className="text-[10px] text-rose-300 font-mono pt-1">
                      ⚠️ {s.disabledReason}
                    </div>
                  )}
                </div>

                {/* Test Sandbox Progress Bar for Incubating Strategies */}
                {isTest && (
                  <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-indigo-300 font-medium">
                      <span>{language === 'kz' ? 'Нарыққа шығу сынағы:' : 'Тестовая инкубация:'}</span>
                      <strong className="font-mono">
                        {s.testSuccessfulTrades} / {s.testTargetTrades} ({s.testProgress}%)
                      </strong>
                    </div>

                    <div className="h-1.5 rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${s.testProgress}%` }}
                      />
                    </div>

                    <p className="text-[10px] text-slate-400">
                      {language === 'kz'
                        ? '3 виртуалды сынақтан өткен соң бірден нақты нарыққа (ACTIVE) қосылады.'
                        : 'После 3 успешных проверок алгоритм автоматически выходит на Spot рынок.'}
                    </p>
                  </div>
                )}

                {/* Strategy Rules List */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                    {language === 'kz' ? 'Тексеру ережелері:' : 'Правила стратегии:'}
                  </span>
                  <ul className="text-[11px] text-slate-300 space-y-0.5">
                    {s.rules.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 text-xs leading-none">•</span>
                        <span className="truncate">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="text-[11px] font-mono text-slate-400">
                  Win: <strong className="text-emerald-400">{s.winRate}%</strong> ({s.wins}W / {s.losses}L)
                </div>

                <div className="flex items-center gap-1.5">
                  {isTest && (
                    <button
                      type="button"
                      onClick={() => onSimulateTestRound(s.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-indigo-300 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 rounded-lg transition-colors flex items-center gap-1"
                      title="Виртуалды тест сынағын жүргізу"
                    >
                      <Play className="w-3 h-3" />
                      <span>{language === 'kz' ? 'Тест' : 'Тест'}</span>
                    </button>
                  )}

                  {isDisabled && (
                    <button
                      type="button"
                      onClick={() => onResetStrategyErrors(s.id)}
                      className="px-2.5 py-1 text-[11px] font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-1"
                      title="Қателерді нөлдеп, қайта қосу"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{language === 'kz' ? 'Қайта қосу' : 'Сброс'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleStrategyStatus(s.id)}
                    className="px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    {isActive
                      ? language === 'kz' ? 'Тоқтату' : 'Пауза'
                      : language === 'kz' ? 'Қосу' : 'Вкл'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
