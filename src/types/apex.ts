export type TradingMode = 'paper' | 'testnet' | 'live';

export interface BinanceConfig {
  apiKey: string;
  apiSecret: string;
  geminiApiKey?: string;
  mode: TradingMode;
  isConfigured: boolean;
  ipWhitelistNoted: boolean;
  paperBalanceUsdt: number;
  lastConnectedAt?: number;
}

export interface SpecialistAgent {
  id: number;
  name: string;
  role: string;
  category: 'CAPITAL' | 'MARKET' | 'STRATEGY' | 'RISK' | 'EXECUTION' | 'CRITIC';
  approved: boolean;
  reason: string;
  metric?: string;
}

export interface CouncilEvaluation {
  symbol: string;
  timestamp: number;
  approvedCount: number;
  rejectedCount: number;
  verdict: 'APPROVED' | 'REJECTED';
  chiefSummary: string;
  recommendedEntry: number;
  recommendedStopLoss: number;
  recommendedTakeProfit: number;
  riskRewardRatio: string;
  agents: SpecialistAgent[];
  source?: string;
}

export interface MarketCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CandidateCoin {
  symbol: string;
  name: string;
  lastPrice: number;
  priceChangePercent: number;
  quoteVolume: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  rsi: number;
  atr: number;
  isMemecoin: boolean;
  status: 'IDLE' | 'ANALYZING' | 'APPROVED' | 'REJECTED' | 'WAITING_CANDLE';
  lastEvaluatedAt?: number;
  lastCouncilResult?: CouncilEvaluation;
}

export interface Position {
  id: string;
  symbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  pnlUsdt: number;
  pnlPercent: number;
  openedAt: number;
  status: 'OPEN' | 'CLOSED';
  isMemecoin: boolean;
  strategy: string;
  strategyId?: string;
  stopLossOrderId?: string;
}

export type StrategyStatus = 'ACTIVE' | 'TEST' | 'DISABLED';

export interface TradingStrategy {
  id: string;
  name: string;
  author: string;
  description: string;
  timeframe: string;
  status: StrategyStatus;
  consecutiveErrors: number; // Max 3! When reaches 3 -> automatically sets status = 'DISABLED'
  maxAllowedErrors: number; // 3
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number; // %
  testProgress: number; // 0 to 100%
  testSuccessfulTrades: number; // Target: 3 successful test rounds to graduate to 'ACTIVE'
  testTargetTrades: number; // 3
  createdAt: number;
  lastTestedAt?: number;
  disabledReason?: string;
  rules: string[];
}

export interface RiskSettings {
  dailyLossLimitPct: number; // default 3%
  weeklyLossLimitPct: number; // default 7%
  maxDrawdownPct: number; // default 15%
  maxPriceSlippagePct: number; // default 0.5%
  maxOpenPositions: number; // default 2
  positionSizeNormalPct: number; // default 30%
  positionSizeMemePct: number; // default 10%
  riskPerTradeNormalPct: number; // default 1%
  riskPerTradeMemePct: number; // default 0.5%
  minOrderSizeUsdt: number; // default 5 USDT
  marketRegime: 'bull' | 'bear' | 'range';
  isKillSwitchActive: boolean;
  killSwitchReason: string | null;
  dailyLossUsdt: number;
  weeklyLossUsdt: number;
  peakEquityUsdt: number;
}

export interface AuditLog {
  id: string;
  timestamp: number;
  level: 'INFO' | 'WARN' | 'DANGER' | 'AI' | 'SUCCESS';
  agent: string;
  message: string;
}

export interface TelegramMessage {
  id: string;
  sender: 'user' | 'chief_agent';
  text: string;
  timestamp: number;
  buttons?: string[];
  isPinnedStatus?: boolean;
}
