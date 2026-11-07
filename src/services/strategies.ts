import { TradingStrategy } from '../types/apex';

export const INITIAL_STRATEGIES: TradingStrategy[] = [
  {
    id: 'wyckoff_spring',
    name: 'Wyckoff Spring & Accumulation',
    author: 'Richard Wyckoff',
    description: 'Smart Money капитал жинақтау кезеңінен кейінгі қолдауды жалған бұзып (spring), үлкен көлеммен қайта өсу моделі.',
    timeframe: '1h / 4h',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 24,
    wins: 19,
    losses: 5,
    winRate: 79.2,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 30,
    rules: [
      '24 сағаттық көлем орташадан > 1.5x артық',
      'Қолдау деңгейінен жылдам серпіліс',
      'RSI 40-58 аралығындағы дені сау импульс',
      'ATR негізінде тығыз Stop-Loss',
    ],
  },
  {
    id: 'tudor_jones_200',
    name: '200 EMA Macro Trend Follow',
    author: 'Paul Tudor Jones',
    description: '«Баға тек 200 EMA үстінде болғанда ғана ұзақ позиция ашылады». Нарықтық макро-трендке қарсы сауда жасауға қатаң тыйым салу.',
    timeframe: '4h / 1d',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 31,
    wins: 25,
    losses: 6,
    winRate: 80.6,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 25,
    rules: [
      'Баға 200 EMA сызығының үстінде орналасқан',
      'EMA 20 > EMA 50 иерархиясы',
      'Нарық режимі: Bull немесе тұрақты Range',
      'R:R қатынасы кемінде 1:2.4',
    ],
  },
  {
    id: 'simons_stat_arb',
    name: 'Quantitative Mean Reversion',
    author: 'Jim Simons (Renaissance)',
    description: 'Математикалық орташа мәннен ауытқуды есептеп, статистикалық экстремумнан негізгі трендке қайту сәтін пайдалану.',
    timeframe: '15m / 1h',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 42,
    wins: 33,
    losses: 9,
    winRate: 78.5,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 20,
    rules: [
      'RSI 30-38 шамадан тыс сатылған аймақтан кері серпілу',
      'Order book спред < 0.08%',
      'Сырғу (slippage) қаупі < 0.2%',
      'Кемінде 50M USDT өтімділік',
    ],
  },
  {
    id: 'minervini_vcp',
    name: 'Volatility Contraction Pattern (VCP)',
    author: 'Mark Minervini',
    description: 'Бағаның ауытқу дәлізі біртіндеп тарылып (volatility squeeze), жеткізушілер азайған соң болатын күшті жарылысты ұстау.',
    timeframe: '1h',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 18,
    wins: 14,
    losses: 4,
    winRate: 77.8,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 15,
    rules: [
      'ATR дірілінің соңғы шамдарда төмендеуі',
      'Көлемнің қысылуы және Breakout сәтінде күрт өсуі',
      'Тәуекел 1% капиталдан аспайтын тығыз Stop',
    ],
  },
  {
    id: 'weinstein_stage2',
    name: 'Stage 2 Advance Breakout',
    author: 'Stan Weinstein',
    description: 'Актив 1-кезеңдегі тұрақтанудан 2-кезеңдегі өсімге өткен сәтінде 30 апталық/күндік базадан шығуын растап сатып алу.',
    timeframe: '1h / 4h',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 16,
    wins: 12,
    losses: 4,
    winRate: 75.0,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 10,
    rules: [
      'Қарсылық деңгейін сенімді бұзу',
      'Көлемді растау 2x орташадан жоғары',
      'Higher High және Higher Low құрылымы',
    ],
  },
  {
    id: 'burry_contrarian',
    name: 'Asymmetric Value Squeeze',
    author: 'Michael Burry',
    description: 'Нарық шектен тыс пессимизмге түсіп, негізсіз құлдыраған кезде асимметриялық сыйақыға (R:R > 1:3) кіру.',
    timeframe: '4h / 1d',
    status: 'ACTIVE',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 14,
    wins: 10,
    losses: 4,
    winRate: 71.4,
    testProgress: 100,
    testSuccessfulTrades: 3,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 8,
    rules: [
      'RSI < 40 терең деңгейдегі divergence',
      'BTC құлдырамаған жағдайдағы альткоин серпілісі',
      'R:R қатынасы > 1:3',
    ],
  },
  // Incubating Sandbox Strategies (Created automatically, tested first!)
  {
    id: 'ai_neural_squeeze',
    name: 'AI Neural Volatility Squeeze',
    author: 'AI Auto-Incubator (Автоматты генератор)',
    description: 'Жасанды интеллект жасаған бейімделгіш алгоритм. Нарықтың тыныш кезеңінде энергия жинақтап, серпіліске кіреді.',
    timeframe: '15m / 1h',
    status: 'TEST',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 3,
    wins: 2,
    losses: 1,
    winRate: 66.7,
    testProgress: 66,
    testSuccessfulTrades: 2,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 2,
    rules: [
      'ТЕСТ РЕЖИМІ: 3 виртуалды сынақтан өтуі қажет',
      'Сәтті сынақтар саны: 2/3',
      '3/3 болғанда автоматты түрде нарыққа (ACTIVE) қосылады',
    ],
  },
  {
    id: 'ai_orderflow_pulse',
    name: 'AI Dynamic Orderflow Scout',
    author: 'AI Auto-Incubator (Автоматты генератор)',
    description: 'Ірі биржалық өтімділік қабырғаларын (Liquidity Walls) анықтап, Smart Money ізімен жүретін машиналық стратегия.',
    timeframe: '1h',
    status: 'TEST',
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 1,
    wins: 1,
    losses: 0,
    winRate: 100.0,
    testProgress: 33,
    testSuccessfulTrades: 1,
    testTargetTrades: 3,
    createdAt: Date.now() - 86400000 * 1,
    rules: [
      'ТЕСТ РЕЖИМІ: Инкубация кезеңінде',
      'Сәтті сынақтар саны: 1/3',
      'Сынақ толық өткенше нақты нарыққа жіберілмейді',
    ],
  },
];

const AI_STRATEGY_TEMPLATES = [
  {
    name: 'AI Quantum Breakout Pulse',
    description: 'Жоғары жиілікті импульстік сауда көлемі мен Bollinger тарылуын сканерлейтін нейрондық алгоритм.',
    rules: [
      'Bollinger Band қысылуынан кейінгі серпіліс',
      'EMA 20 үстінен көлеммен шығу',
      'Шығынды қатаң 1% деңгейінде шектеу',
    ],
  },
  {
    name: 'AI Liquidity Trap Hunter',
    description: 'Бөлшек трейдерлердің Stop-Loss деңгейлерін ірі ойыншылар жинаған сәтін анықтайтын анти-манипуляция моделі.',
    rules: [
      'Жалған бұзылысты (Fakeout) сүзу',
      'Delta көлемінің күрт өсуі',
      '15 минуттық шамның кері жабылуы',
    ],
  },
  {
    name: 'AI Multi-Timeframe Trend Harmonizer',
    description: '15м, 1с және 4с таймфреймдерінің синхронды өсуін тексеретін математикалық сүзгі.',
    rules: [
      'Үш таймфреймде де RSI > 50',
      'Көлемнің өсу динамикасы',
      'BTC корреляциясы оң',
    ],
  },
  {
    name: 'AI Adaptive Mean Reversal',
    description: 'Волатильдік толқындарын өлшеп, баға шамадан тыс алшақтағанда орташа қалыпқа қайтуын болжайтын алгоритм.',
    rules: [
      'Z-score ауытқуы > 2.2',
      'Кері шам моделінің қалыптасуы',
      'Stop-Loss ATR x 1.5 деңгейінде',
    ],
  },
];

/**
 * Generate a new AI Strategy in sandbox incubation (TEST status).
 * Never directly put on market until tested!
 */
export function generateNewAIStrategy(existingCount: number): TradingStrategy {
  const template = AI_STRATEGY_TEMPLATES[existingCount % AI_STRATEGY_TEMPLATES.length];
  const newId = `ai_gen_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

  return {
    id: newId,
    name: `${template.name} v${(existingCount + 1).toFixed(1)}`,
    author: 'AI Auto-Incubator (Автоматты генератор)',
    description: template.description,
    timeframe: '1h',
    status: 'TEST', // NEVER DIRECTLY ACTIVE! Starts in test sandbox
    consecutiveErrors: 0,
    maxAllowedErrors: 3,
    totalTrades: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    testProgress: 0,
    testSuccessfulTrades: 0,
    testTargetTrades: 3,
    createdAt: Date.now(),
    rules: [
      'ТЕСТ РЕЖИМІ: 3 виртуалды сынақтан өту міндетті',
      ...template.rules,
      '3 сынақтан сәтті өткенде нарыққа (ACTIVE) қосылады',
    ],
  };
}

export interface StrategyEvent {
  strategy: TradingStrategy;
  type: 'DISABLED' | 'GRADUATED' | 'UPDATED';
  message: string;
}

/**
 * Update a strategy outcome (Win / Loss / Simulated Test).
 * Auto-disables if consecutiveErrors >= 3!
 * Auto-graduates if testSuccessfulTrades >= 3!
 */
export function updateStrategyOutcome(
  strategies: TradingStrategy[],
  strategyId: string,
  isWin: boolean,
  isTestRound: boolean = false
): { updatedStrategies: TradingStrategy[]; event?: StrategyEvent } {
  let event: StrategyEvent | undefined;

  const updatedStrategies = strategies.map((s) => {
    if (s.id !== strategyId) return s;

    let updated: TradingStrategy = { ...s };
    updated.totalTrades += 1;
    updated.lastTestedAt = Date.now();

    if (isWin) {
      updated.wins += 1;
      updated.consecutiveErrors = 0; // reset error streak on win

      // If it is in TEST incubation mode and achieves win
      if (updated.status === 'TEST') {
        updated.testSuccessfulTrades += 1;
        updated.testProgress = Math.min(
          100,
          Math.round((updated.testSuccessfulTrades / updated.testTargetTrades) * 100)
        );

        // Auto-graduate to ACTIVE if hits 3 test successes!
        if (updated.testSuccessfulTrades >= updated.testTargetTrades) {
          updated.status = 'ACTIVE';
          event = {
            strategy: updated,
            type: 'GRADUATED',
            message: `🎓 ЖАҢА СТРАТЕГИЯ НАҚТЫ НААРЫҚҚА ҚОСЫЛДЫ!\n«${updated.name}» сынақ кезеңінен сәтті өтті (${updated.testSuccessfulTrades}/${updated.testTargetTrades} тест жеңісі). Енді Spot нарығында белсенді сауда жасайды.`,
          };
        }
      }
    } else {
      updated.losses += 1;
      updated.consecutiveErrors += 1;

      // STRICT RULE: If 3 consecutive errors occur, AUTOMATICALLY DISABLE!
      if (updated.consecutiveErrors >= updated.maxAllowedErrors && updated.status !== 'DISABLED') {
        updated.status = 'DISABLED';
        updated.disabledReason = `Қатарынан ${updated.consecutiveErrors} қате/шығын болғандықтан қауіпсіздік ережесімен автоматты өшірілді.`;
        event = {
          strategy: updated,
          type: 'DISABLED',
          message: `🚨 СТРАТЕГИЯ АВТОМАТТЫ ӨШІРІЛДІ!\n«${updated.name}» қатарынан 3 қатеге ұшырады. Тәуекелді тоқтату үшін бұл стратегия нарықтан алынды.`,
        };
      }
    }

    updated.winRate = parseFloat(
      ((updated.wins / (updated.totalTrades || 1)) * 100).toFixed(1)
    );

    return updated;
  });

  return { updatedStrategies, event };
}
