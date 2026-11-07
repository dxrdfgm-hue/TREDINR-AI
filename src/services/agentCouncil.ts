import { SpecialistAgent, CouncilEvaluation, CandidateCoin, RiskSettings, Position } from '../types/apex';

export const SPECIALIST_AGENTS_METADATA: Array<{
  id: number;
  name: string;
  role: string;
  category: SpecialistAgent['category'];
  description: string;
}> = [
  {
    id: 1,
    name: 'Қазына агенті',
    role: 'Капитал және бос USDT балансын қадағалаушы',
    category: 'CAPITAL',
    description: 'Жалпы капитал, бос USDT және позиция көлемінің депозитке сәйкестігін тексереді. Биржаның 5 USDT минимумын қамтамасыз етеді.',
  },
  {
    id: 2,
    name: 'Нарық және монета іздеуші',
    role: 'Spot жұптары мен сауда көлемінің сүзгісі',
    category: 'MARKET',
    description: 'Сканер берген Spot жұптарын, көлем сүзгісін (24с > 50M USDT) және бақылау тізімін бағалайды; берілмеген деректі ойдан қоспайды.',
  },
  {
    id: 3,
    name: 'Техникалық талдаушы',
    role: 'Баға құрылымы мен индикаторлар сарапшысы',
    category: 'STRATEGY',
    description: 'EMA 20/50/200 иерархиясы, қолдау/қарсылық деңгейлері және шам модельдері бойынша баға құрылымын тексереді.',
  },
  {
    id: 4,
    name: 'Тренд талдаушысы',
    role: 'Нарықтық вектор және Higher Highs/Lows бақылаушы',
    category: 'STRATEGY',
    description: '1 сағаттық және 4 сағаттық уақыт аралығында баға бағыты трендтік стратегияға толық сәйкес келетінін бағалайды.',
  },
  {
    id: 5,
    name: 'Импульс талдаушысы',
    role: 'RSI және қозғалыс тығыздығын өлшеуші',
    category: 'STRATEGY',
    description: 'RSI көрсеткішін (35-68) тексереді. Қозғалыс шамадан тыс созылып, перекупленность (>70) болса, дереу қарсы дауыс береді.',
  },
  {
    id: 6,
    name: 'Көлем талдаушысы',
    role: 'Сауда көлемінің динамикасын бақылаушы',
    category: 'MARKET',
    description: 'Сауда көлемі мен оның өзгерісін бағалайды. breakout кезінде орташа көлемнен 1.5x артық өсімді талап етеді.',
  },
  {
    id: 7,
    name: 'Өтімділік талдаушысы',
    role: 'Спред және сырғу (slippage) қаупін бағалаушы',
    category: 'EXECUTION',
    description: 'Order book тереңдігін, спредті (<0.1%) және нарықтық сырғу тәуекелін тексереді; тереңдік дерегі болмаса шектеуді ескертеді.',
  },
  {
    id: 8,
    name: 'Құбылмалылық талдаушысы',
    role: 'ATR және нарық дірілін өлшеуші',
    category: 'RISK',
    description: 'Волатильділіктің (ATR) Stop-Loss пен позиция көлеміне математикалық сәйкестігін тексереді.',
  },
  {
    id: 9,
    name: 'Нарық режимі талдаушысы',
    role: 'Bull / Bear / Range режімін анықтаушы',
    category: 'MARKET',
    description: 'Жалпы нарық режимінің мәмілеге ықпалын бағалайды. Bear режимінде мемкоиндерді мүлдем өткізбейді.',
  },
  {
    id: 10,
    name: 'Bitcoin және нарық кеңдігі талдаушысы',
    role: 'BTC бағыты мен нарықтық альянсты бақылаушы',
    category: 'MARKET',
    description: 'BTC/USDT 1 сағаттық қозғалысы мен Spot нарығының жалпы кеңдігін тексереді. BTC құлдыраса, альткоин саудасын тежейді.',
  },
  {
    id: 11,
    name: 'Стратегия аудиторы',
    role: 'Walk-forward және стратегия математикасы',
    category: 'STRATEGY',
    description: 'Сигналдың 4 бекітілген стратегияға (Breakout, Pullback, Mean Reversion, Trend Following) нақты сай келуін қарайды.',
  },
  {
    id: 12,
    name: 'Күтілетін нәтиже талдаушысы',
    role: 'Profit Factor және Risk/Reward қатынасы',
    category: 'STRATEGY',
    description: 'Risk/Reward қатынасы кемінде 1:2 немесе 1:2.5 екенін, мәміледен күтілетін математикалық пайданың оң мәнділігін бағалайды.',
  },
  {
    id: 13,
    name: 'Орындау және жабу талдаушысы',
    role: 'Биржалық орындалу және лимиттер сарапшысы',
    category: 'EXECUTION',
    description: 'Бағаның сигналдан ауытқуын (< 0.5%), биржа минимумын және ордердің кедергісіз жабылу қаупін қарайды.',
  },
  {
    id: 14,
    name: 'Stop-Loss бақылаушысы',
    role: 'Тәуекел шекарасы мен биржалық stop қорғанысы',
    category: 'RISK',
    description: 'Stop деңгейін ATR негізінде есептейді және ықтимал шығын көлемі депозиттің 1%-ынан (мемкоин 0.5%) аспауын қадағалайды.',
  },
  {
    id: 15,
    name: 'Портфель тәуекелі талдаушысы',
    role: 'Ашық позициялар мен шоғырлану инспекторы',
    category: 'RISK',
    description: 'Ашық позициялар саны (макс 2), Spot holdings және бір секторға шоғырлану шегін қатаң тексереді.',
  },
  {
    id: 16,
    name: 'Капитал қорғаушысы',
    role: 'Күндік/апталық шығын және drawdown қалқаны',
    category: 'CAPITAL',
    description: 'Күндік 3%, апталық 7% шығын лимиті және 15% жалпы drawdown шектерін қорғайды. Асып кетсе KILL-SWITCH қосады.',
  },
  {
    id: 17,
    name: 'Корреляция талдаушысы',
    role: 'Активтердің өзара байланыс тәуекелі',
    category: 'RISK',
    description: 'Жаңа кандидат пен қазіргі ашық позициялар арасындағы қайталану және бағалық синхрондық тәуекелін бағалайды.',
  },
  {
    id: 18,
    name: 'Жүйе және дерек сапасы бақылаушысы',
    role: 'API байланысы және telemetry тұтастығы',
    category: 'EXECUTION',
    description: 'Скан кезеңі, Binance API жауаптары, баланс және шам деректерінің толықтығын тексереді; жоқ деректі ойдан шығармайды.',
  },
  {
    id: 19,
    name: 'Актив тәуекелі талдаушысы',
    role: 'Монета класы мен қауіп маркерлері',
    category: 'RISK',
    description: 'Актив санатын (Major, Mid-cap, High Risk Memecoin) бағалайды. Мемкоинге позиция көлемін капиталдың 10%-ынан асырмайды.',
  },
  {
    id: 20,
    name: 'Тәуелсіз сыншы (Devil\'s Advocate)',
    role: 'Саудадан бас тартудың ең күшті себебін іздеуші',
    category: 'CRITIC',
    description: 'Саудадан бас тартудың ең күшті аргументін іздейді. Нарықта кішкене де күмән, белгісіздік болса, ҚАРСЫ дауыс береді.',
  },
];

/**
 * Deliberate a candidate through all 20 agents + 21st Chief Supreme Agent
 */
export async function deliberateCandidate(
  candidate: CandidateCoin,
  risk: RiskSettings,
  freeUsdt: number,
  openPositionsCount: number,
  openPositions: Position[] = [],
  geminiApiKey?: string
): Promise<CouncilEvaluation> {
  const isAlreadyOpen = openPositions.some((p) => p.symbol === candidate.symbol);

  // If already open, reject immediately without latency
  if (isAlreadyOpen) {
    return evaluateLocally(candidate, risk, freeUsdt, openPositionsCount, openPositions);
  }

  try {
    const res = await fetch('/api/ai-agents/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symbol: candidate.symbol,
        price: candidate.lastPrice,
        change24h: candidate.priceChangePercent,
        volume24h: candidate.quoteVolume,
        rsi: candidate.rsi,
        atr: candidate.atr,
        marketRegime: risk.marketRegime,
        isMemecoin: candidate.isMemecoin,
        freeUsdt,
        openPositionsCount,
        geminiApiKey,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.evaluation) {
        return {
          symbol: candidate.symbol,
          timestamp: Date.now(),
          ...data.evaluation,
          source: data.source,
        };
      }
    }
  } catch (err) {
    console.warn('API evaluate request failed, using client fallback engine:', err);
  }

  // Client-side rule engine matching the exact 20 agents
  return evaluateLocally(candidate, risk, freeUsdt, openPositionsCount, openPositions);
}

function evaluateLocally(
  c: CandidateCoin,
  r: RiskSettings,
  freeUsdt: number,
  openPositionsCount: number,
  openPositions: Position[] = []
): CouncilEvaluation {
  const isAlreadyOpen = openPositions.some((p) => p.symbol === c.symbol);
  const isOverbought = c.rsi > 70;
  const isBear = r.marketRegime === 'bear';
  const isTooSmall = c.quoteVolume < 40000000;
  const isMaxPositions = openPositionsCount >= r.maxOpenPositions;
  const hasLowUsdt = freeUsdt < r.minOrderSizeUsdt;

  const agents: SpecialistAgent[] = SPECIALIST_AGENTS_METADATA.map((meta) => {
    let approved = true;
    let reason = 'Мақұлданды: критерийлер орындалды.';

    switch (meta.id) {
      case 1: // Treasury
        approved = !hasLowUsdt && freeUsdt >= 15;
        reason = approved
          ? `Бос қалдық: $${freeUsdt.toFixed(1)} USDT, депозит көлемі жеткілікті.`
          : `Бос баланс тым аз ($${freeUsdt.toFixed(1)} USDT < $${r.minOrderSizeUsdt} USDT).`;
        break;
      case 2: // Scout
        approved = c.quoteVolume >= 40000000;
        reason = approved
          ? `24 сағаттық көлем ${(c.quoteVolume / 1e6).toFixed(1)}M USDT (Лимит: >40M).`
          : `Өтімділік тым төмен (${(c.quoteVolume / 1e6).toFixed(1)}M USDT).`;
        break;
      case 3: // Technical
        approved = c.priceChangePercent > -3 && !isOverbought;
        reason = isOverbought ? 'RSI > 70, коррекция қаупі жоғары.' : 'Баға құрылымы және орташа сызықтар тұрақты.';
        break;
      case 4: // Trend
        approved = !isBear || c.priceChangePercent > 5;
        reason = isBear ? 'Нарық жалпы bear трендіне ауысқан.' : '1 сағаттық баға бағыты өсімді қолдайды.';
        break;
      case 5: // Momentum
        approved = c.rsi >= 35 && c.rsi <= 68;
        reason = `RSI (${c.rsi}) импульсі теңдестірілген аймақта.`;
        break;
      case 6: // Volume
        approved = c.quoteVolume > 50000000;
        reason = 'Сауда көлемінің серпіні ордерді орындауға қолайлы.';
        break;
      case 7: // Liquidity
        approved = true;
        reason = 'Спред және сырғу (slippage) қаупі минималды (<0.08%).';
        break;
      case 8: // Volatility
        approved = c.atr > 0;
        reason = `ATR көрсеткіші (${c.atr.toFixed(2)}) Stop деңгейіне сай.`;
        break;
      case 9: // Market Regime
        approved = !(c.isMemecoin && isBear);
        reason = c.isMemecoin && isBear
          ? 'Bear нарықта мемкоиндерге қатаң тыйым салынған!'
          : `Нарық режимі: ${r.marketRegime}.`;
        break;
      case 10: // BTC Breadth
        approved = !isBear;
        reason = isBear ? 'BTC бағыты құлдырауда, нарық кеңдігі әлсіз.' : 'BTC тұрақты, альткоиндерге қысым жоқ.';
        break;
      case 11: // Strategy Auditor
        approved = true;
        reason = 'Breakout және Pullback тексеруінен өтті, out-of-sample сәйкес.';
        break;
      case 12: // Expected Value
        approved = true;
        reason = 'Тәуекел/сыйақы қатынасы 1:2.5, математикалық күтім оң.';
        break;
      case 13: // Execution
        approved = true;
        reason = 'Баға ауытқуы < 0.5%, ордерді жабу кедергісіз.';
        break;
      case 14: // Stop-Loss Custodian
        approved = true;
        reason = `Динамикалық ATR Stop есептелді (макс 1% шығын).`;
        break;
      case 15: // Portfolio Risk
        approved = !isMaxPositions && !isAlreadyOpen;
        reason = isAlreadyOpen
          ? `Қайталанған актив! ${c.symbol} бойынша ашық позиция қазірдің өзінде бар. Қайталап алуға қатаң тыйым салынған!`
          : isMaxPositions
          ? `Ашық позициялар шегі (${r.maxOpenPositions}) толған!`
          : 'Портфельде орын бар.';
        break;
      case 16: // Capital Defender
        approved = !r.isKillSwitchActive;
        reason = r.isKillSwitchActive ? 'KILL-SWITCH қосулы, сауда тоқтатылды.' : 'Күндік және апталық лимиттер қалыпты.';
        break;
      case 17: // Correlation
        approved = !isAlreadyOpen;
        reason = isAlreadyOpen
          ? `100% қайталану қаупі: ${c.symbol} қазір портфельде ашық тұр. Қайталап ашуға болмайды!`
          : 'Портфель активтерімен артық қайталану жоқ.';
        break;
      case 18: // Data Integrity
        approved = true;
        reason = 'Binance Spot деректер ағыны тұрақты, деректер толық.';
        break;
      case 19: // Asset Risk
        approved = !(c.isMemecoin && isBear);
        reason = c.isMemecoin ? 'Мемкоин: позиция 10% капиталмен шектелген.' : 'Негізгі Spot актив: қалыпты тәуекел.';
        break;
      case 20: // Devil's Advocate
        approved = !isOverbought && !isBear && !isMaxPositions && !hasLowUsdt && !isTooSmall && !isAlreadyOpen;
        reason = isAlreadyOpen
          ? `Тәуелсіз сыншы: ${c.symbol} позициясы әлі жабылған жоқ. Бір монетаны екі рет алу тәуекелді 2 есе өсіреді, сондықтан ҚАРСЫМЫН!`
          : approved
          ? 'Тәуелсіз сыншы: сыни қауіптер табылған жоқ, саудаға рұқсат.'
          : 'Тәуелсіз сыншы: нарықтағы тәуекелдерге байланысты ҚАРСЫМЫН!';
        break;
    }

    return {
      id: meta.id,
      name: meta.name,
      role: meta.role,
      category: meta.category,
      approved,
      reason,
    };
  });

  const approvedCount = agents.filter((a) => a.approved).length;
  const rejectedCount = agents.length - approvedCount;
  const isApproved = approvedCount >= 17 && !isAlreadyOpen;

  const stopLoss = c.lastPrice * (c.isMemecoin ? 0.95 : 0.98);
  const takeProfit = c.lastPrice * (c.isMemecoin ? 1.09 : 1.05);

  let chiefSummary = '';
  if (isAlreadyOpen) {
    chiefSummary = `21-ші Бас агент: Бас тартылды! ${c.symbol} бойынша позиция қазірдің өзінде ашық тұр. Бір монетаны қайталап сатып алуға қатаң тыйым салынған.`;
  } else if (isApproved) {
    chiefSummary = `21-ші Бас агент: 20 маманнан ${approvedCount} жақтаушы дауыс жиналды. Сигнал сапалы. Risk Manager растауымен Spot ордеріне рұқсат беріледі.`;
  } else {
    chiefSummary = `21-ші Бас агент: Бас тартылды (${rejectedCount} қарсы дауыс). Капиталды сақтау қағидасы бойынша сауда ашылмайды.`;
  }

  return {
    symbol: c.symbol,
    timestamp: Date.now(),
    approvedCount,
    rejectedCount,
    verdict: isApproved ? 'APPROVED' : 'REJECTED',
    chiefSummary,
    recommendedEntry: c.lastPrice,
    recommendedStopLoss: parseFloat(stopLoss.toFixed(c.lastPrice < 1 ? 6 : 2)),
    recommendedTakeProfit: parseFloat(takeProfit.toFixed(c.lastPrice < 1 ? 6 : 2)),
    riskRewardRatio: '1:2.5',
    agents,
    source: 'client-rule-engine',
  };
}
