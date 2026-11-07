import { useState } from 'react';
import { SpecialistAgent, CouncilEvaluation, CandidateCoin } from '../types/apex';
import { SPECIALIST_AGENTS_METADATA } from '../services/agentCouncil';
import { Language, DICTIONARY, AGENT_TRANSLATIONS } from '../services/i18n';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shield,
  Coins,
  TrendingUp,
  Sliders,
  Scale,
  Brain,
} from 'lucide-react';

interface CouncilViewProps {
  evaluation: CouncilEvaluation | null;
  candidates: CandidateCoin[];
  selectedSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  onRunDeliberation: (candidate: CandidateCoin) => void;
  isLoading: boolean;
  language?: Language;
}

export function CouncilView({
  evaluation,
  candidates,
  selectedSymbol,
  onSelectSymbol,
  onRunDeliberation,
  isLoading,
  language = 'kz',
}: CouncilViewProps) {
  const t = DICTIONARY[language];
  const translatedAgents = AGENT_TRANSLATIONS[language];
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const selectedCandidate = candidates.find((c) => c.symbol === selectedSymbol) || candidates[0];

  // Map agents from evaluation if available, or populate with defaults
  const agentsList: SpecialistAgent[] = SPECIALIST_AGENTS_METADATA.map((meta) => {
    const existing = evaluation?.agents.find((a) => a.id === meta.id);
    const trans = translatedAgents.find((ta) => ta.id === meta.id) || meta;
    if (existing) {
      return {
        ...existing,
        name: trans.name,
        role: trans.role,
      };
    }
    return {
      id: meta.id,
      name: trans.name,
      role: trans.role,
      category: meta.category,
      approved: true,
      reason: language === 'kz' ? 'Күтуде: нарық сигналы түскенде сараптама жасайды.' : 'В ожидании: проведет анализ при поступлении рыночного сигнала.',
    };
  });

  const filteredAgents = categoryFilter === 'ALL'
    ? agentsList
    : agentsList.filter((a) => a.category === categoryFilter);

  const selectedAgentMetadata = SPECIALIST_AGENTS_METADATA.find(
    (a) => a.id === selectedAgentId
  );
  const selectedAgentTrans = translatedAgents.find((ta) => ta.id === selectedAgentId);
  const selectedAgentCurrent = agentsList.find((a) => a.id === selectedAgentId);

  const getCategoryIcon = (cat: SpecialistAgent['category']) => {
    switch (cat) {
      case 'CAPITAL':
        return <Coins className="w-3.5 h-3.5 text-amber-400" />;
      case 'MARKET':
        return <TrendingUp className="w-3.5 h-3.5 text-sky-400" />;
      case 'STRATEGY':
        return <Sliders className="w-3.5 h-3.5 text-indigo-400" />;
      case 'RISK':
        return <Shield className="w-3.5 h-3.5 text-rose-400" />;
      case 'EXECUTION':
        return <Scale className="w-3.5 h-3.5 text-teal-400" />;
      case 'CRITIC':
        return <Brain className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Coin Selector */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>{t.councilTitle}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t.councilSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSymbol}
            onChange={(e) => onSelectSymbol(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:border-amber-500 focus:outline-none"
          >
            {candidates.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.symbol} (${c.lastPrice})
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onRunDeliberation(selectedCandidate)}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? t.consultingGemini : t.consultGemini}</span>
          </button>
        </div>
      </div>

      {/* 2. 21st Chief Supreme Agent Consensus Banner */}
      {evaluation && (
        <div
          className={`p-5 rounded-xl border ${
            evaluation.verdict === 'APPROVED'
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {t.chiefFinalVerdict} ({evaluation.symbol})
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    evaluation.verdict === 'APPROVED'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-rose-500 text-white'
                  }`}
                >
                  {evaluation.verdict === 'APPROVED' ? t.verdictApproved : t.verdictRejected}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans max-w-3xl">
                {evaluation.chiefSummary}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase">{t.votesFor} / {t.votesAgainst}</div>
                <div className="text-sm font-bold text-white tabular-nums">
                  <span className="text-emerald-400">{evaluation.approvedCount} {language === 'kz' ? 'Мақұлдады' : 'За'}</span> /{' '}
                  <span className="text-rose-400">{evaluation.rejectedCount} {language === 'kz' ? 'Қарсы' : 'Против'}</span>
                </div>
              </div>
              {evaluation.source && (
                <div className="text-right pl-3 border-l border-slate-700/60">
                  <div className="text-[10px] text-slate-400 uppercase">{t.sourceLabel}</div>
                  <div className="text-xs text-amber-300">{evaluation.source}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto">
        {[
          { key: 'ALL', label: t.filterAll },
          { key: 'CAPITAL', label: t.filterCapital },
          { key: 'MARKET', label: t.filterMarket },
          { key: 'STRATEGY', label: t.filterStrategy },
          { key: 'RISK', label: t.filterRisk },
          { key: 'EXECUTION', label: t.filterExecution },
          { key: 'CRITIC', label: t.filterCritic },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setCategoryFilter(tab.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              categoryFilter === tab.key
                ? 'bg-amber-500/20 text-amber-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. 20 Specialist Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredAgents.map((agent) => {
          const isSelected = selectedAgentId === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/5 shadow-md'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(agent.category)}
                    <span className="text-xs font-bold text-white tracking-tight">
                      {agent.id}. {agent.name}
                    </span>
                  </div>

                  {agent.approved ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'kz' ? 'ИӘ' : 'ДА'}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{language === 'kz' ? 'ЖОҚ' : 'НЕТ'}</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 mt-2 font-mono leading-tight">
                  {agent.role}
                </div>

                <div className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/50">
                  {agent.reason}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>{agent.category}</span>
                <span className="text-amber-400/80 hover:text-amber-400">{t.detailsLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Agent Detail Drawer / Modal */}
      {selectedAgentMetadata && (
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
                {selectedAgentMetadata.id}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  {selectedAgentTrans?.name || selectedAgentMetadata.name} ({selectedAgentTrans?.role || selectedAgentMetadata.role})
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {language === 'kz' ? 'Санат:' : 'Категория:'} {selectedAgentMetadata.category}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAgentId(null)}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800"
            >
              {t.closeBtn}
            </button>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-1">{t.roleAndCriteria}</strong>
            {selectedAgentTrans?.description || selectedAgentMetadata.description}
          </div>

          {selectedAgentCurrent && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[11px] text-slate-400 font-mono block mb-1">
                {t.currentDecisionReason}
              </span>
              <p
                className={`font-semibold ${
                  selectedAgentCurrent.approved ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {selectedAgentCurrent.approved ? t.decisionApproved : t.decisionRejected}{' '}
                <span className="font-normal text-slate-200">{selectedAgentCurrent.reason}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
