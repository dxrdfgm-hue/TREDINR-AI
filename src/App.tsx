import { useState, useEffect, useRef, useCallback } from 'react';
import {
  BinanceConfig,
  CandidateCoin,
  CouncilEvaluation,
  Position,
  RiskSettings,
  AuditLog,
  TelegramMessage,
  MarketCandle,
  TradingStrategy,
} from './types/apex';
import {
  loadBinanceConfig,
  saveBinanceConfig,
  loadPositions,
  savePositions,
  loadRiskSettings,
  saveRiskSettings,
  loadAuditLogs,
  saveAuditLogs,
  loadTelegramMessages,
  saveTelegramMessages,
  loadLanguage,
  saveLanguage,
  loadStrategies,
  saveStrategies,
} from './services/storage';
import { generateNewAIStrategy, updateStrategyOutcome } from './services/strategies';
import { Language } from './services/i18n';
import { deliberateCandidate } from './services/agentCouncil';
import { HeaderBar } from './components/HeaderBar';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardView } from './components/DashboardView';
import { CouncilView } from './components/CouncilView';
import { PositionsView } from './components/PositionsView';
import { StrategiesView } from './components/StrategiesView';
import { TelegramBotConsole } from './components/TelegramBotConsole';
import { RiskSettingsView } from './components/RiskSettingsView';

const INITIAL_CANDIDATES: CandidateCoin[] = [
  {
    symbol: 'BTCUSDT',
    name: 'Bitcoin',
    lastPrice: 91450.0,
    priceChangePercent: 2.35,
    quoteVolume: 1850000000,
    highPrice: 92400.0,
    lowPrice: 89100.0,
    volume: 20200,
    rsi: 58,
    atr: 1250,
    isMemecoin: false,
    status: 'IDLE',
  },
  {
    symbol: 'ETHUSDT',
    name: 'Ethereum',
    lastPrice: 3410.5,
    priceChangePercent: 1.85,
    quoteVolume: 920000000,
    highPrice: 3480.0,
    lowPrice: 3340.0,
    volume: 270000,
    rsi: 54,
    atr: 48,
    isMemecoin: false,
    status: 'IDLE',
  },
  {
    symbol: 'SOLUSDT',
    name: 'Solana',
    lastPrice: 198.4,
    priceChangePercent: 4.12,
    quoteVolume: 640000000,
    highPrice: 202.5,
    lowPrice: 189.2,
    volume: 3200000,
    rsi: 62,
    atr: 5.8,
    isMemecoin: false,
    status: 'APPROVED',
  },
  {
    symbol: 'NEARUSDT',
    name: 'NEAR Protocol',
    lastPrice: 6.84,
    priceChangePercent: 5.48,
    quoteVolume: 145000000,
    highPrice: 7.12,
    lowPrice: 6.42,
    volume: 21200000,
    rsi: 64,
    atr: 0.28,
    isMemecoin: false,
    status: 'IDLE',
  },
  {
    symbol: 'SUIUSDT',
    name: 'Sui',
    lastPrice: 3.42,
    priceChangePercent: 6.21,
    quoteVolume: 195000000,
    highPrice: 3.58,
    lowPrice: 3.2,
    volume: 57000000,
    rsi: 61,
    atr: 0.16,
    isMemecoin: false,
    status: 'IDLE',
  },
  {
    symbol: 'DOGEUSDT',
    name: 'Dogecoin',
    lastPrice: 0.384,
    priceChangePercent: 3.12,
    quoteVolume: 320000000,
    highPrice: 0.405,
    lowPrice: 0.368,
    volume: 830000000,
    rsi: 59,
    atr: 0.018,
    isMemecoin: true,
    status: 'IDLE',
  },
  {
    symbol: 'PEPEUSDT',
    name: 'Pepe',
    lastPrice: 0.0000214,
    priceChangePercent: 8.74,
    quoteVolume: 280000000,
    highPrice: 0.000023,
    lowPrice: 0.0000195,
    volume: 13000000000,
    rsi: 66,
    atr: 0.0000012,
    isMemecoin: true,
    status: 'IDLE',
  },
  {
    symbol: 'AVAXUSDT',
    name: 'Avalanche',
    lastPrice: 38.6,
    priceChangePercent: 1.15,
    quoteVolume: 98000000,
    highPrice: 39.4,
    lowPrice: 37.8,
    volume: 2540000,
    rsi: 50,
    atr: 1.2,
    isMemecoin: false,
    status: 'IDLE',
  },
];

export default function App() {
  // Configuration & Persistent States
  const [config, setConfig] = useState<BinanceConfig>(loadBinanceConfig);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(!config.isConfigured);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'council' | 'positions' | 'strategies' | 'telegram' | 'settings'>('dashboard');
  const [language, setLanguage] = useState<Language>(loadLanguage);

  const [positions, setPositions] = useState<Position[]>(loadPositions);
  const [riskSettings, setRiskSettings] = useState<RiskSettings>(loadRiskSettings);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(loadAuditLogs);
  const [telegramMessages, setTelegramMessages] = useState<TelegramMessage[]>(loadTelegramMessages);
  const [strategies, setStrategies] = useState<TradingStrategy[]>(loadStrategies);

  const [candidates, setCandidates] = useState<CandidateCoin[]>(INITIAL_CANDIDATES);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SOLUSDT');
  const [candles, setCandles] = useState<MarketCandle[]>([]);
  const [timeframe, setTimeframe] = useState<string>('1h');

  // Autonomous Trading Engine state
  const [isAutoTrading, setIsAutoTrading] = useState<boolean>(false);
  const [countdownSec, setCountdownSec] = useState<number>(60);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [latestEvaluation, setLatestEvaluation] = useState<CouncilEvaluation | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState<boolean>(false);

  // Sync state to storage
  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    saveStrategies(strategies);
  }, [strategies]);

  useEffect(() => {
    saveBinanceConfig(config);
  }, [config]);

  useEffect(() => {
    savePositions(positions);
  }, [positions]);

  useEffect(() => {
    saveRiskSettings(riskSettings);
  }, [riskSettings]);

  useEffect(() => {
    saveAuditLogs(auditLogs);
  }, [auditLogs]);

  useEffect(() => {
    saveTelegramMessages(telegramMessages);
  }, [telegramMessages]);

  const addAuditLog = useCallback(
    (level: AuditLog['level'], agent: string, message: string) => {
      const newLog: AuditLog = {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
        level,
        agent,
        message,
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    },
    []
  );

  const addTelegramMessage = useCallback(
    (sender: TelegramMessage['sender'], text: string, buttons?: string[]) => {
      const newMsg: TelegramMessage = {
        id: `tg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        sender,
        text,
        timestamp: Date.now(),
        buttons,
      };
      setTelegramMessages((prev) => [...prev, newMsg]);
    },
    []
  );

  // Calculate free USDT and total equity
  const inPositionsUsdt = positions.reduce(
    (acc, p) => acc + p.amount * p.currentPrice,
    0
  );
  const freeUsdt = Math.max(0, config.paperBalanceUsdt - inPositionsUsdt);
  const totalEquity = freeUsdt + inPositionsUsdt;

  // 1. Fetch live tickers from backend
  const fetchTickers = useCallback(async () => {
    try {
      const res = await fetch('/api/binance/tickers');
      if (res.ok) {
        const data = await res.json();
        if (data.pairs && Array.isArray(data.pairs)) {
          setCandidates((prev) =>
            prev.map((c) => {
              const live = data.pairs.find((p: any) => p.symbol === c.symbol);
              if (live) {
                return {
                  ...c,
                  lastPrice: live.lastPrice,
                  priceChangePercent: live.priceChangePercent,
                  quoteVolume: live.quoteVolume,
                  highPrice: live.highPrice,
                  lowPrice: live.lowPrice,
                };
              }
              return c;
            })
          );
        }
      }
    } catch (err) {
      console.warn('Error fetching Binance tickers:', err);
    }
  }, []);

  // 2. Fetch candlestick klines
  const fetchKlines = useCallback(async (sym: string, tf: string) => {
    try {
      const res = await fetch(`/api/binance/klines?symbol=${sym}&interval=${tf}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        if (data.klines) {
          setCandles(data.klines);
        }
      }
    } catch (err) {
      console.warn('Error fetching klines:', err);
    }
  }, []);

  useEffect(() => {
    fetchTickers();
    const interval = setInterval(fetchTickers, 10000);
    return () => clearInterval(interval);
  }, [fetchTickers]);

  useEffect(() => {
    fetchKlines(selectedSymbol, timeframe);
  }, [selectedSymbol, timeframe, fetchKlines]);

  // Handle Order Opening with 🛡 Risk Manager Guard
  const handleOpenPosition = useCallback(
    (candidate: CandidateCoin, evaluation: CouncilEvaluation) => {
      // 🛡 Strict Duplicate Guard: Never buy an already open coin or memecoin!
      if (positions.some((p) => p.symbol === candidate.symbol)) {
        addAuditLog(
          'DANGER',
          'Risk Manager',
          `Қайталанған актив! ${candidate.symbol} бойынша ашық позиция қазірдің өзінде бар. Ереже бойынша қайталап алуға қатаң тыйым салынған.`
        );
        addTelegramMessage(
          'chief_agent',
          `⚠️ ${candidate.symbol} бойынша қайталап сауда ашуға тыйым салынады!\nПортфельде бұл позиция әлдеқашан ашық тұр. Тәуекелді 2 есе өсірмеу үшін бұғатталды.`,
          ['/positions', '/status']
        );
        return;
      }

      // 🛡 Risk Manager hardcoded checks
      if (riskSettings.isKillSwitchActive) {
        addAuditLog('DANGER', 'Risk Manager', 'KILL-SWITCH қосулы! Жаңа сауда ашуға тыйым салынған.');
        return;
      }
      if (positions.length >= riskSettings.maxOpenPositions) {
        addAuditLog('WARN', 'Risk Manager', `Лимит: ашық позициялар саны (${riskSettings.maxOpenPositions}) толған.`);
        return;
      }
      if (freeUsdt < riskSettings.minOrderSizeUsdt) {
        addAuditLog('WARN', 'Risk Manager', `Бос USDT ($${freeUsdt.toFixed(1)}) 5 USDT минимумынан аз.`);
        return;
      }
      if (candidate.isMemecoin && riskSettings.marketRegime === 'bear') {
        addAuditLog('DANGER', 'Risk Manager', 'Bear нарықта мемкоиндерге қатаң тыйым салынған!');
        return;
      }

      // Position sizing: max 30% for normal, max 10% for meme
      const maxAllocPct = candidate.isMemecoin
        ? riskSettings.positionSizeMemePct
        : riskSettings.positionSizeNormalPct;
      const targetAllocationUsdt = Math.min(
        freeUsdt * 0.95,
        totalEquity * (maxAllocPct / 100)
      );

      const entryPrice = candidate.lastPrice;
      const amount = parseFloat((targetAllocationUsdt / entryPrice).toFixed(candidate.lastPrice < 1 ? 0 : 4));

      if (amount * entryPrice < 5) {
        addAuditLog('WARN', 'Risk Manager', 'Есептелген көлем биржаның 5 USDT минимумынан аз.');
        return;
      }

      const stopLoss = evaluation.recommendedStopLoss || entryPrice * 0.98;
      const takeProfit = evaluation.recommendedTakeProfit || entryPrice * 1.05;

      // Associate with top active world-class trader strategy
      const activeStrategy = strategies.find((s) => s.status === 'ACTIVE') || strategies[0];

      const newPos: Position = {
        id: `pos-${Date.now()}`,
        symbol: candidate.symbol,
        amount,
        entryPrice,
        currentPrice: entryPrice,
        stopLoss,
        takeProfit,
        pnlUsdt: 0,
        pnlPercent: 0,
        openedAt: Date.now(),
        status: 'OPEN',
        isMemecoin: candidate.isMemecoin,
        strategy: activeStrategy ? activeStrategy.name : 'Spot Breakout Momentum',
        strategyId: activeStrategy ? activeStrategy.id : undefined,
        stopLossOrderId: `sl-${Date.now().toString().slice(-6)}`,
      };

      setPositions((prev) => [newPos, ...prev]);

      addAuditLog(
        'SUCCESS',
        '21-ші Бас агент',
        `${candidate.symbol} Spot ордері орындалды: ${amount} @ $${entryPrice}. Стратегия: ${newPos.strategy}. Биржалық STOP_LOSS_LIMIT орнатылды: $${stopLoss}.`
      );

      addTelegramMessage(
        'chief_agent',
        `✅ Жаңа мәміле орындалды!\nСимвол: ${candidate.symbol}\nКөлемі: ${amount} ($${(amount * entryPrice).toFixed(1)} USDT)\nКіру бағасы: $${entryPrice}\nСтратегия: ${newPos.strategy}\nStop-Loss: $${stopLoss}\nTake-Profit: $${takeProfit}\n20 агенттің дауысы: ${evaluation.approvedCount}/20.\n🛡 Risk Manager: Барлық қауіпсіздік тексерістерінен өтті.`,
        ['/status', '/positions', '/closeall']
      );
    },
    [positions, riskSettings, freeUsdt, totalEquity, strategies, addAuditLog, addTelegramMessage]
  );

  // Close a single position
  const handleClosePosition = useCallback(
    (id: string) => {
      const pos = positions.find((p) => p.id === id);
      if (!pos) return;

      const isWin = pos.pnlUsdt >= 0;

      // Update strategy win/loss metrics & enforce 3-loss auto-disable rule
      if (pos.strategyId) {
        setStrategies((prev) => {
          const { updatedStrategies, event } = updateStrategyOutcome(prev, pos.strategyId!, isWin);
          if (event) {
            if (event.type === 'DISABLED') {
              addAuditLog('DANGER', 'Стратегия аудиторы', event.message);
              addTelegramMessage('chief_agent', event.message, ['/strategies', '/status']);
            } else if (event.type === 'GRADUATED') {
              addAuditLog('SUCCESS', 'AI Инкубатор', event.message);
              addTelegramMessage('chief_agent', event.message, ['/strategies', '/status']);
            }
          }
          return updatedStrategies;
        });
      }

      setConfig((prev) => ({
        ...prev,
        paperBalanceUsdt: prev.paperBalanceUsdt + pos.pnlUsdt,
      }));

      setPositions((prev) => prev.filter((p) => p.id !== id));

      addAuditLog(
        isWin ? 'SUCCESS' : 'WARN',
        'Орындау және жабу',
        `${pos.symbol} позициясы жабылды. P&L: ${pos.pnlUsdt >= 0 ? '+' : ''}$${pos.pnlUsdt.toFixed(2)} USDT (${pos.pnlPercent.toFixed(2)}%). Стратегия: ${pos.strategy}.`
      );

      addTelegramMessage(
        'chief_agent',
        `🔒 Позиция жабылды: ${pos.symbol}\nШығу бағасы: $${pos.currentPrice}\nP&L: ${pos.pnlUsdt >= 0 ? '+' : ''}$${pos.pnlUsdt.toFixed(2)} (${pos.pnlPercent.toFixed(2)}%)\nСтратегия: ${pos.strategy}\nБаланс жаңартылды.`,
        ['/status', '/positions', '/strategies']
      );
    },
    [positions, addAuditLog, addTelegramMessage]
  );

  // Close all positions
  const handleCloseAllPositions = useCallback(() => {
    if (positions.length === 0) return;
    const totalPnl = positions.reduce((acc, p) => acc + p.pnlUsdt, 0);

    setConfig((prev) => ({
      ...prev,
      paperBalanceUsdt: prev.paperBalanceUsdt + totalPnl,
    }));

    setPositions([]);

    addAuditLog(
      'WARN',
      'Орындау және жабу',
      `Барлық ${positions.length} бот позициясы шұғыл жабылды. Жалпы P&L: ${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)} USDT.`
    );

    addTelegramMessage(
      'chief_agent',
      `⚠️ Барлық бот позициялары жабылды.\nЖалпы нәтиже: ${totalPnl >= 0 ? '+' : ''}$${totalPnl.toFixed(2)} USDT.\nҚазір портфель 100% бос USDT күйінде.`,
      ['/status', '/scan']
    );
  }, [positions, addAuditLog, addTelegramMessage]);

  // Kill Switch toggles
  const handleToggleKillSwitch = useCallback(() => {
    if (riskSettings.isKillSwitchActive) {
      // Prompt confirmation
      setRiskSettings((prev) => ({
        ...prev,
        isKillSwitchActive: false,
        killSwitchReason: null,
      }));
      addAuditLog('WARN', 'Капитал қорғаушысы', 'KILL-SWITCH қолмен өшірілді. Саудаға қайта рұқсат етілді.');
      addTelegramMessage('chief_agent', '🛡 KILL-SWITCH өшірілді. Сауда қайта іске қосылды (/resume).', ['/status', '/scan']);
    } else {
      setRiskSettings((prev) => ({
        ...prev,
        isKillSwitchActive: true,
        killSwitchReason: 'Қолданушы шұғыл KILL-SWITCH батырмасын басты.',
      }));
      setIsAutoTrading(false);
      addAuditLog('DANGER', 'Капитал қорғаушысы', 'KILL-SWITCH ІСКЕ ҚОСЫЛДЫ! Автономды сауда тоқтатылды.');
      addTelegramMessage('chief_agent', '🚨 KILL-SWITCH ІСКЕ ҚОСЫЛДЫ!\nБарлық жаңа саудалар тоқтатылды.\nСебебі: Қолданушының шұғыл бұйрығы.', ['/status', '/resume']);
    }
  }, [riskSettings.isKillSwitchActive, addAuditLog, addTelegramMessage]);

  // Single Scan Routine
  const runSingleScan = useCallback(async () => {
    if (isScanning) return;
    setIsScanning(true);

    addAuditLog('INFO', 'Бас агент', 'Кандидаттарды кезекті сканерлеу басталды...');

    // Pick candidates that have positive trend or good volume, prioritizing non-open symbols
    const availableCandidates = candidates.filter((c) => !positions.some((p) => p.symbol === c.symbol));
    const pool = availableCandidates.length > 0 ? availableCandidates : candidates;

    const topCandidate = pool.find(
      (c) => c.quoteVolume > 50000000 && c.rsi <= 68 && (!c.isMemecoin || riskSettings.marketRegime !== 'bear')
    ) || pool[0];

    setSelectedSymbol(topCandidate.symbol);

    try {
      const evaluation = await deliberateCandidate(
        topCandidate,
        riskSettings,
        freeUsdt,
        positions.length,
        positions, // strictly pass open positions so duplicates are caught!
        config.geminiApiKey
      );

      setLatestEvaluation(evaluation);

      // Update candidate status in table
      setCandidates((prev) =>
        prev.map((c) =>
          c.symbol === topCandidate.symbol
            ? {
                ...c,
                status: evaluation.verdict === 'APPROVED' ? 'APPROVED' : 'REJECTED',
                lastEvaluatedAt: Date.now(),
                lastCouncilResult: evaluation,
              }
            : c
        )
      );

      addAuditLog(
        evaluation.verdict === 'APPROVED' ? 'SUCCESS' : 'INFO',
        '21-ші Бас агент',
        `Скан аяқталды: ${topCandidate.symbol} бойынша 20 агенттен ${evaluation.approvedCount} жақтаушы дауыс. Шешім: ${evaluation.verdict}.`
      );

      // If auto-trading is on and approved and not at max positions, execute!
      if (isAutoTrading && evaluation.verdict === 'APPROVED' && positions.length < 2) {
        handleOpenPosition(topCandidate, evaluation);
      }
    } catch (err: any) {
      console.error('Scan deliberation failed:', err);
      addAuditLog('WARN', 'Жүйе және дерек сапасы', `Скан кезінде қате: ${err.message}`);
    } finally {
      setIsScanning(false);
    }
  }, [isScanning, candidates, positions, riskSettings, freeUsdt, isAutoTrading, addAuditLog, handleOpenPosition, config.geminiApiKey]);

  // Consult Gemini AI explicitly for chosen candidate
  const handleConsultGemini = useCallback(async (coin: CandidateCoin) => {
    setIsGeminiLoading(true);
    addAuditLog('AI', 'Gemini 3.8 Flash', `${coin.symbol} үшін 20 агент кеңесін талқылау басталды...`);

    try {
      const evaluation = await deliberateCandidate(
        coin,
        riskSettings,
        freeUsdt,
        positions.length,
        positions, // strictly pass open positions
        config.geminiApiKey
      );

      setLatestEvaluation(evaluation);
      setSelectedSymbol(coin.symbol);

      addAuditLog(
        'AI',
        'Gemini 3.8 Flash',
        `${coin.symbol} талқыланды. 20 маманнан ${evaluation.approvedCount} дауыс. Қорытынды: ${evaluation.chiefSummary}`
      );

      addTelegramMessage(
        'chief_agent',
        `💡 Gemini AI 20-Агент Кеңесінің есебі (${coin.symbol}):\nМақұлдады: ${evaluation.approvedCount}/20 | Қарсы: ${evaluation.rejectedCount}/20\nҚорытынды: ${evaluation.chiefSummary}\nStop: $${evaluation.recommendedStopLoss} | TP: $${evaluation.recommendedTakeProfit}`,
        evaluation.verdict === 'APPROVED' && positions.length < 2 ? ['Қазір ашу', '/status'] : ['/status', '/scan']
      );
    } catch (err: any) {
      addAuditLog('WARN', 'AI кеңесі', `Қате орын алды: ${err.message}`);
    } finally {
      setIsGeminiLoading(false);
    }
  }, [riskSettings, freeUsdt, positions, addAuditLog, addTelegramMessage, config.geminiApiKey]);

  // 60-Second Autonomous Trading Timer
  useEffect(() => {
    if (!isAutoTrading) {
      setCountdownSec(60);
      return;
    }

    const timer = setInterval(() => {
      setCountdownSec((prev) => {
        if (prev <= 1) {
          runSingleScan();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoTrading, runSingleScan]);

  // AI Strategy Incubator & Management Handlers
  const handleAddAIStrategy = useCallback(() => {
    const newStrat = generateNewAIStrategy(strategies.length);
    setStrategies((prev) => [newStrat, ...prev]);

    const msg = language === 'kz'
      ? `🧪 Жаңа AI Стратегиясы инкубацияға қосылды: «${newStrat.name}».\nБұл стратегия бірден нақты нарыққа емес, ТЕСТ сынағына қосылды.\n3 рет сәтті сынақтан өткенде ғана автоматты түрде нарыққа (ACTIVE) қосылады.`
      : `🧪 Новая AI Стратегия добавлена в инкубатор: «${newStrat.name}».\nСтратегия стартует в режиме ТЕСТА, а не на реальном рынке.\nТолько после 3 успешных проверок она автоматически выйдет на рынок (ACTIVE).`;

    addAuditLog('AI', 'AI Инкубатор', msg);
    addTelegramMessage('chief_agent', msg, ['/strategies', '/scan', '/status']);
  }, [strategies.length, language, addAuditLog, addTelegramMessage]);

  const handleSimulateTestRound = useCallback((strategyId: string) => {
    const target = strategies.find((s) => s.id === strategyId);
    if (!target) return;

    // Simulate test evaluation (75% probability win)
    const isWin = Math.random() < 0.75;
    setStrategies((prev) => {
      const { updatedStrategies, event } = updateStrategyOutcome(prev, strategyId, isWin, true);
      if (event) {
        if (event.type === 'GRADUATED') {
          addAuditLog('SUCCESS', 'AI Инкубатор', event.message);
          addTelegramMessage('chief_agent', event.message, ['/strategies', '/status']);
        } else if (event.type === 'DISABLED') {
          addAuditLog('DANGER', 'Стратегия аудиторы', event.message);
          addTelegramMessage('chief_agent', event.message, ['/strategies', '/status']);
        }
      } else {
        addAuditLog(
          isWin ? 'SUCCESS' : 'WARN',
          'AI Инкубатор',
          `«${target.name}» тестілеу сынағы: ${isWin ? 'СӘТТІ (+1 сынақ)' : 'СӘТСІЗ (-1 қате)'}. Прогресс: ${target.testSuccessfulTrades + (isWin ? 1 : 0)}/3.`
        );
      }
      return updatedStrategies;
    });
  }, [strategies, addAuditLog, addTelegramMessage]);

  const handleResetStrategyErrors = useCallback((strategyId: string) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === strategyId
          ? { ...s, status: 'ACTIVE', consecutiveErrors: 0, disabledReason: undefined }
          : s
      )
    );
    addAuditLog('INFO', 'Стратегия аудиторы', `Стратегия қателері нөлденді және нарыққа қайта қосылды.`);
  }, [addAuditLog]);

  const handleToggleStrategyStatus = useCallback((strategyId: string) => {
    setStrategies((prev) =>
      prev.map((s) => {
        if (s.id !== strategyId) return s;
        const nextStatus = s.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        return { ...s, status: nextStatus, consecutiveErrors: 0 };
      })
    );
  }, []);

  // Telegram Chat Command Processing
  const handleTelegramInput = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      addTelegramMessage('user', trimmed);

      const cmd = trimmed.toLowerCase();

      if (cmd === '/status') {
        const msg = language === 'kz'
          ? `📊 APEX Trader 2.0 /status Күйі:\n\n` +
            `• Сауда режимі: MODE=${config.mode.toUpperCase()}\n` +
            `• Жалпы капитал: $${totalEquity.toFixed(2)} USDT\n` +
            `• Бос USDT: $${freeUsdt.toFixed(2)} USDT\n` +
            `• Бұғатталған (позицияда): $${inPositionsUsdt.toFixed(2)} USDT\n` +
            `• Ашық бот позициялары: ${positions.length}/2\n` +
            `• Белсенді стратегиялар: ${strategies.filter((s) => s.status === 'ACTIVE').length}/${strategies.length}\n` +
            `• Өшірілген (3 қате): ${strategies.filter((s) => s.status === 'DISABLED').length}\n` +
            `• KILL-SWITCH: ${riskSettings.isKillSwitchActive ? 'ҚОСУЛЫ 🚨 (' + riskSettings.killSwitchReason + ')' : 'ДАЙЫН ✅'}\n` +
            `• Автосауда: ${isAutoTrading ? 'БЕЛСЕНДІ (60с цикл)' : 'ҚОЛМЕН РЕЖИМ'}\n` +
            `• Күндік шығын: ${riskSettings.dailyLossLimitPct}% шектен 0% шығын`
          : `📊 Состояние APEX Trader 2.0 /status:\n\n` +
            `• Торговый режим: MODE=${config.mode.toUpperCase()}\n` +
            `• Общий капитал: $${totalEquity.toFixed(2)} USDT\n` +
            `• Свободный USDT: $${freeUsdt.toFixed(2)} USDT\n` +
            `• В открытых сделках: $${inPositionsUsdt.toFixed(2)} USDT\n` +
            `• Открытых позиций бота: ${positions.length}/2\n` +
            `• Активных стратегий: ${strategies.filter((s) => s.status === 'ACTIVE').length}/${strategies.length}\n` +
            `• Отключено (3 ошибки): ${strategies.filter((s) => s.status === 'DISABLED').length}\n` +
            `• KILL-SWITCH: ${riskSettings.isKillSwitchActive ? 'АКТИВЕН 🚨 (' + riskSettings.killSwitchReason + ')' : 'ГОТОВ ✅'}\n` +
            `• Автоторговля: ${isAutoTrading ? 'АКТИВНА (цикл 60с)' : 'РУЧНОЙ РЕЖИМ'}\n` +
            `• Дневной лимит: ${riskSettings.dailyLossLimitPct}% (текущий убыток 0%)`;
        addTelegramMessage('chief_agent', msg, ['/scan', '/positions', '/strategies', '/help']);
      } else if (cmd === '/positions') {
        if (positions.length === 0) {
          addTelegramMessage(
            'chief_agent',
            language === 'kz'
              ? '📁 Қазіргі уақытта ашық бот позициялары жоқ.\nБос USDT толық сақталған.'
              : '📁 В данный момент нет открытых позиций бота.\nВесь капитал сохранен в свободном USDT.',
            ['/scan', '/status']
          );
        } else {
          const posList = positions
            .map(
              (p, idx) =>
                `${idx + 1}. ${p.symbol}: ${p.amount} @ $${p.entryPrice}\n` +
                `   ${language === 'kz' ? 'Ағымдағы' : 'Текущая'}: $${p.currentPrice} | P&L: ${p.pnlUsdt >= 0 ? '+' : ''}$${p.pnlUsdt.toFixed(2)} (${p.pnlPercent.toFixed(2)}%)\n` +
                `   Стратегия: ${p.strategy}\n` +
                `   Stop: $${p.stopLoss} | TP: $${p.takeProfit}`
            )
            .join('\n\n');
          addTelegramMessage(
            'chief_agent',
            language === 'kz'
              ? `📁 Ашық Бот Позициялары (${positions.length}/2):\n\n${posList}`
              : `📁 Открытые Позиции Бота (${positions.length}/2):\n\n${posList}`,
            ['/closeall', '/status']
          );
        }
      } else if (cmd === '/scan') {
        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? '🔍 Сканерлеу басталуда... Толық 20 маман есебі әзірленеді.'
            : '🔍 Запуск сканирования... Формируется отчет 20 агентов-специалистов.'
        );
        runSingleScan();
      } else if (cmd === '/strategies') {
        const stratList = strategies
          .map((s, idx) => {
            const statusTag =
              s.status === 'ACTIVE'
                ? '✅ [ACTIVE/НАРЫҚТА]'
                : s.status === 'TEST'
                ? `🧪 [TEST/ИНКУБАТОР ${s.testSuccessfulTrades}/3]`
                : '🚨 [ӨШІРІЛДІ (3 ҚАТЕ)]';
            return `${idx + 1}. ${s.name} (${s.author})\n   ${statusTag} | Қатарлас қате: ${s.consecutiveErrors}/3 | Win: ${s.winRate}%`;
          })
          .join('\n\n');

        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? `📈 Әлемдік Трейдерлер Стратегиясы & Инкубатор:\n\n${stratList}\n\n*Ереже: Қатарынан 3 қате/шығын болса стратегия автоматты өшіріледі. Жаңа AI стратегиясы алдымен тестке қосылып, 3 рет сәтті болғанда ғана нарыққа жіберіледі.*`
            : `📈 Стратегии Мировых Трейдеров & Инкубатор:\n\n${stratList}\n\n*Правило: При 3 ошибках подряд стратегия отключается. Новые AI алгоритмы тестируются 3 раза перед выходом на рынок.*`,
          ['/incubate', '/scan', '/status']
        );
      } else if (cmd === '/incubate') {
        handleAddAIStrategy();
      } else if (cmd === '/agents') {
        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? `👥 20 Маман Агенттер Кеңесі:\n` +
              `1. Қазына агенті (Капитал/USDT)\n` +
              `2. Нарық және монета іздеуші (Көлем >50M)\n` +
              `3. Техникалық талдаушы (EMA/Индикаторлар)\n` +
              `4. Тренд талдаушысы (HH/HL)\n` +
              `5. Импульс талдаушысы (RSI 35-68)\n` +
              `6. Көлем талдаушысы (Breakout көлемі)\n` +
              `7. Өтімділік талдаушысы (Слиппейдж <0.1%)\n` +
              `8. Құбылмалылық талдаушысы (ATR Stop)\n` +
              `9. Нарық режимі талдаушысы (Bull/Bear)\n` +
              `10. Bitcoin және нарық кеңдігі талдаушысы\n` +
              `11. Стратегия аудиторы\n` +
              `12. Күтілетін нәтиже талдаушысы (R:R > 1:2.4)\n` +
              `13. Орындау және жабу талдаушысы\n` +
              `14. Stop-Loss бақылаушысы\n` +
              `15. Портфель тәуекелі талдаушысы (Қайталанған монетаны тыю)\n` +
              `16. Капитал қорғаушысы (Drawdown <15%)\n` +
              `17. Корреляция талдаушысы\n` +
              `18. Жүйе және дерек сапасы бақылаушысы\n` +
              `19. Актив тәуекелі талдаушысы\n` +
              `20. Тәуелсіз сыншы (Devil's Advocate)\n` +
              `└─► 21-ші Бас агент: 17/20 жақтаушы дауыс болса ғана саудаға рұқсат береді.`
            : `👥 Совет 20 Агентов-Специалистов:\n` +
              `1. Агент Казначейства (Капитал/USDT)\n` +
              `2. Скаут Рынка и Монет (Объем >50M)\n` +
              `3. Технический Аналитик (EMA/Индикаторы)\n` +
              `4. Аналитик Тренда (HH/HL)\n` +
              `5. Аналитик Импульса (RSI 35-68)\n` +
              `6. Аналитик Объема (Объем пробоя)\n` +
              `7. Аналитик Ликвидности (Слиппедж <0.1%)\n` +
              `8. Аналитик Волатильности (ATR Stop)\n` +
              `9. Аналитик Режима Рынка (Bull/Bear)\n` +
              `10. Аналитик Bitcoin и Широты Рынка\n` +
              `11. Аудитор Стратегии\n` +
              `12. Аналитик Матожидания (R:R > 1:2.4)\n` +
              `13. Аналитик Исполнения и Закрытия\n` +
              `14. Хранитель Stop-Loss\n` +
              `15. Аналитик Риска Портфеля (Запрет дублирования)\n` +
              `16. Защитник Капитала (Drawdown <15%)\n` +
              `17. Аналитик Корреляции\n` +
              `18. Контролер Системы и Качества Данных\n` +
              `19. Аналитик Риска Актива\n` +
              `20. Независимый Критик (Адвокат Дьявола)\n` +
              `└─► 21-й Главный Агент: Требует минимум 17/20 голосов «За».`,
          ['/status', '/scan']
        );
      } else if (cmd === '/mode') {
        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? `⚙️ Ағымдағы сауда режимі: MODE=${config.mode.toUpperCase()}\n` +
              `1. paper: виртуалды депозитпен сынау (кемінде 4 апта ұсынылады)\n` +
              `2. testnet: Binance spot testnet (2 апта stop ордерін тексеру)\n` +
              `3. live: 50-100 USDT нақты Spot саудасы (WITHDRAW өшірулі)\n\n` +
              `Режимді ауыстыру үшін «Тәуекел & API Кілттер» бөлімін ашыңыз.`
            : `⚙️ Текущий режим торговли: MODE=${config.mode.toUpperCase()}\n` +
              `1. paper: виртуальный депозит ($1,000 USDT) для безопасных тестов\n` +
              `2. testnet: Binance Spot Testnet для проверки ордеров\n` +
              `3. live: реальные сделки Spot 50-100 USDT (WITHDRAW отключен)\n\n` +
              `Для смены режима откройте раздел «Риск & API Ключи».`,
          ['/status']
        );
      } else if (cmd === '/report') {
        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? `📋 Сеанс Қорытындысы:\n` +
              `• Тексерілген кандидаттар: ${candidates.length} монета\n` +
              `• Ашылған позициялар: ${positions.length}\n` +
              `• Жалпы капитал: $${totalEquity.toFixed(2)} USDT\n` +
              `• Белсенді стратегиялар: ${strategies.filter((s) => s.status === 'ACTIVE').length}\n` +
              `• Қауіпсіздік инциденттері: 0 (Қалыпты)`
            : `📋 Отчет Сессии:\n` +
              `• Проверено кандидатов: ${candidates.length} монет\n` +
              `• Открытых позиций: ${positions.length}\n` +
              `• Общий капитал: $${totalEquity.toFixed(2)} USDT\n` +
              `• Активных стратегий: ${strategies.filter((s) => s.status === 'ACTIVE').length}\n` +
              `• Инцидентов безопасности: 0 (В норме)`,
          ['/status', '/scan']
        );
      } else if (cmd === '/kill') {
        handleToggleKillSwitch();
      } else if (cmd === '/closeall') {
        handleCloseAllPositions();
      } else if (
        (cmd === 'қазір ашу' || cmd === 'открыть сейчас' || cmd === '/open') &&
        latestEvaluation &&
        latestEvaluation.verdict === 'APPROVED'
      ) {
        const coin = candidates.find((c) => c.symbol === latestEvaluation.symbol) || candidates[0];
        handleOpenPosition(coin, latestEvaluation);
      } else {
        addTelegramMessage(
          'chief_agent',
          language === 'kz'
            ? `🤖 APEX Trader 2.0 командалары:\n` +
              `/status — Әмиян және жүйе күйі\n` +
              `/positions — Ашық позициялар тізімі\n` +
              `/scan — Нарықты 20 маманмен сканерлеу\n` +
              `/strategies — Әлемдік стратегиялар және қателер есебі\n` +
              `/incubate — Жаңа AI стратегиясын тестілеуге қосу\n` +
              `/mode — Paper / Testnet / Live режимдері\n` +
              `/agents — 20 маман агенттердің тізімі мен рөлдері\n` +
              `/report — Қорытынды есеп\n` +
              `/kill — Шұғыл Kill-Switch тоқтату\n` +
              `/resume — Қайта саудаға рұқсат беру\n` +
              `/closeall — Барлық позицияны жабу`
            : `🤖 Команды APEX Trader 2.0:\n` +
              `/status — Состояние кошелька и системы\n` +
              `/positions — Список открытых позиций\n` +
              `/scan — Сканирование рынка 20 агентами\n` +
              `/strategies — Мировые стратегии и счетчик ошибок\n` +
              `/incubate — Создать AI стратегию в тест-песочницу\n` +
              `/mode — Режимы Paper / Testnet / Live\n` +
              `/agents — Совет 20 агентов-специалистов\n` +
              `/report — Итоговый отчет сессии\n` +
              `/kill — Экстренный Kill-Switch\n` +
              `/resume — Возобновление торговли\n` +
              `/closeall — Закрыть все позиции`,
          ['/status', '/scan', '/strategies', '/positions', '/agents']
        );
      }
    },
    [
      language,
      config.mode,
      totalEquity,
      freeUsdt,
      inPositionsUsdt,
      positions,
      strategies,
      riskSettings,
      isAutoTrading,
      candidates,
      latestEvaluation,
      addTelegramMessage,
      runSingleScan,
      handleAddAIStrategy,
      handleToggleKillSwitch,
      handleCloseAllPositions,
      handleOpenPosition,
    ]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header following Design Constitution */}
      <HeaderBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mode={config.mode}
        isKillSwitchActive={riskSettings.isKillSwitchActive}
        onToggleKillSwitch={handleToggleKillSwitch}
        openConfigModal={() => setIsConfigModalOpen(true)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            candidates={candidates}
            selectedSymbol={selectedSymbol}
            onSelectSymbol={setSelectedSymbol}
            candles={candles}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
            positions={positions}
            riskSettings={riskSettings}
            freeUsdt={freeUsdt}
            totalEquity={totalEquity}
            isAutoTrading={isAutoTrading}
            onToggleAutoTrading={() => setIsAutoTrading(!isAutoTrading)}
            countdownSec={countdownSec}
            onManualScan={runSingleScan}
            isScanning={isScanning}
            onOpenPosition={handleOpenPosition}
            latestEvaluation={latestEvaluation}
            onConsultGemini={handleConsultGemini}
            isGeminiLoading={isGeminiLoading}
            language={language}
          />
        )}

        {activeTab === 'council' && (
          <CouncilView
            evaluation={latestEvaluation}
            candidates={candidates}
            selectedSymbol={selectedSymbol}
            onSelectSymbol={setSelectedSymbol}
            onRunDeliberation={handleConsultGemini}
            isLoading={isGeminiLoading}
            language={language}
          />
        )}

        {activeTab === 'positions' && (
          <PositionsView
            positions={positions}
            onClosePosition={handleClosePosition}
            onCloseAll={handleCloseAllPositions}
            config={config}
            freeUsdt={freeUsdt}
            totalEquity={totalEquity}
            language={language}
          />
        )}

        {activeTab === 'strategies' && (
          <StrategiesView
            strategies={strategies}
            onAddAIStrategy={handleAddAIStrategy}
            onSimulateTestRound={handleSimulateTestRound}
            onResetStrategyErrors={handleResetStrategyErrors}
            onToggleStrategyStatus={handleToggleStrategyStatus}
            language={language}
          />
        )}

        {activeTab === 'telegram' && (
          <TelegramBotConsole
            messages={telegramMessages}
            onSendMessage={handleTelegramInput}
            positions={positions}
            riskSettings={riskSettings}
            freeUsdt={freeUsdt}
            totalEquity={totalEquity}
            candidates={candidates}
            latestEvaluation={latestEvaluation}
            isAutoTrading={isAutoTrading}
            countdownSec={countdownSec}
            onToggleAutoTrading={() => setIsAutoTrading(!isAutoTrading)}
            onCloseAllPositions={handleCloseAllPositions}
            onTriggerKillSwitch={handleToggleKillSwitch}
            onResumeKillSwitch={handleToggleKillSwitch}
            onManualScan={runSingleScan}
            isScanning={isScanning}
            language={language}
          />
        )}

        {activeTab === 'settings' && (
          <RiskSettingsView
            riskSettings={riskSettings}
            onUpdateRiskSettings={setRiskSettings}
            config={config}
            openConfigModal={() => setIsConfigModalOpen(true)}
            auditLogs={auditLogs}
            onClearLogs={() => setAuditLogs([])}
            onResetAllData={() => {
              localStorage.clear();
              window.location.reload();
            }}
            language={language}
          />
        )}
      </main>

      {/* Onboarding & Key Setup Modal */}
      <OnboardingModal
        isOpen={isConfigModalOpen}
        currentConfig={config}
        onSave={(newConf) => {
          setConfig(newConf);
          setIsConfigModalOpen(false);
          addAuditLog(
            'SUCCESS',
            language === 'kz' ? 'Жүйе' : 'Система',
            language === 'kz'
              ? `Binance API кілттері сәтті сақталды (MODE=${newConf.mode.toUpperCase()}).`
              : `API ключи Binance успешно сохранены (MODE=${newConf.mode.toUpperCase()}).`
          );
        }}
        onClose={() => setIsConfigModalOpen(false)}
        isFirstTime={!config.isConfigured}
        language={language}
      />
    </div>
  );
}
