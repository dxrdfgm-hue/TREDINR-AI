import { BinanceConfig, Position, RiskSettings, AuditLog, TelegramMessage, TradingStrategy } from '../types/apex';
import { INITIAL_STRATEGIES } from './strategies';

const STORAGE_KEYS = {
  BINANCE_CONFIG: 'apex_binance_config_v2',
  POSITIONS: 'apex_positions_v2',
  RISK_SETTINGS: 'apex_risk_settings_v2',
  AUDIT_LOGS: 'apex_audit_logs_v2',
  TELEGRAM_MESSAGES: 'apex_telegram_msgs_v2',
  LANGUAGE: 'apex_language_v2',
  STRATEGIES: 'apex_strategies_v2',
};

export function loadLanguage(): 'kz' | 'ru' {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (raw === 'ru' || raw === 'kz') return raw;
  } catch (e) {
    console.error('Failed to load language:', e);
  }
  return 'kz';
}

export function saveLanguage(lang: 'kz' | 'ru'): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {
    console.error('Failed to save language:', e);
  }
}

export const DEFAULT_BINANCE_CONFIG: BinanceConfig = {
  apiKey: '',
  apiSecret: '',
  geminiApiKey: '',
  mode: 'paper',
  isConfigured: false,
  ipWhitelistNoted: false,
  paperBalanceUsdt: 1000.0,
};

export const DEFAULT_RISK_SETTINGS: RiskSettings = {
  dailyLossLimitPct: 3.0,
  weeklyLossLimitPct: 7.0,
  maxDrawdownPct: 15.0,
  maxPriceSlippagePct: 0.5,
  maxOpenPositions: 2,
  positionSizeNormalPct: 30.0,
  positionSizeMemePct: 10.0,
  riskPerTradeNormalPct: 1.0,
  riskPerTradeMemePct: 0.5,
  minOrderSizeUsdt: 5.0,
  marketRegime: 'bull',
  isKillSwitchActive: false,
  killSwitchReason: null,
  dailyLossUsdt: 0,
  weeklyLossUsdt: 0,
  peakEquityUsdt: 1000.0,
};

export function loadBinanceConfig(): BinanceConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BINANCE_CONFIG);
    if (raw) {
      return { ...DEFAULT_BINANCE_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to load Binance config from localStorage:', e);
  }
  return DEFAULT_BINANCE_CONFIG;
}

export function saveBinanceConfig(config: BinanceConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BINANCE_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Binance config:', e);
  }
}

export function loadPositions(): Position[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.POSITIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load positions:', e);
  }
  return [
    {
      id: 'pos-init-1',
      symbol: 'SOLUSDT',
      amount: 1.5,
      entryPrice: 194.2,
      currentPrice: 198.4,
      stopLoss: 190.0,
      takeProfit: 206.0,
      pnlUsdt: 6.3,
      pnlPercent: 2.16,
      openedAt: Date.now() - 3600000 * 2.5,
      status: 'OPEN',
      isMemecoin: false,
      strategy: 'Breakout + EMA20 Support',
      stopLossOrderId: 'sl-884219',
    },
  ];
}

export function savePositions(positions: Position[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.POSITIONS, JSON.stringify(positions));
  } catch (e) {
    console.error('Failed to save positions:', e);
  }
}

export function loadRiskSettings(): RiskSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RISK_SETTINGS);
    if (raw) return { ...DEFAULT_RISK_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load risk settings:', e);
  }
  return DEFAULT_RISK_SETTINGS;
}

export function saveRiskSettings(settings: RiskSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RISK_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save risk settings:', e);
  }
}

export function loadAuditLogs(): AuditLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load audit logs:', e);
  }
  return [
    {
      id: 'log-1',
      timestamp: Date.now() - 3600000 * 3,
      level: 'INFO',
      agent: 'Бас агент',
      message: 'APEX Trader 2.0 жүйесі сәтті бапталды. Binance Spot оқу рұқсаты расталды.',
    },
    {
      id: 'log-2',
      timestamp: Date.now() - 3600000 * 2.5,
      level: 'SUCCESS',
      agent: 'Орындау және жабу',
      message: 'SOLUSDT Spot ордері орындалды: 1.5 SOL @ 194.20 USDT. Биржаға STOP_LOSS_LIMIT (190.00 USDT) орнатылды.',
    },
  ];
}

export function saveAuditLogs(logs: AuditLog[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  } catch (e) {
    console.error('Failed to save audit logs:', e);
  }
}

export function loadTelegramMessages(): TelegramMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TELEGRAM_MESSAGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load telegram messages:', e);
  }
  return [
    {
      id: 'tg-1',
      sender: 'chief_agent',
      text: '🤖 Сәлеметсіз бе! Мен — APEX Trader 2.0 Бас Агентімін.\n20 маманнан тұратын AI Кеңесі нарықты 24/7 бақылауға дайын.\nКомандаларды таңдаңыз немесе «Үздіксіз сауданы бастау» түймесін басыңыз.',
      timestamp: Date.now() - 600000,
      buttons: ['/status', '/scan', '/positions', '/agents', '/kill', '/help'],
    },
  ];
}

export function saveTelegramMessages(msgs: TelegramMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TELEGRAM_MESSAGES, JSON.stringify(msgs.slice(-50)));
  } catch (e) {
    console.error('Failed to save telegram messages:', e);
  }
}

export function loadStrategies(): TradingStrategy[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STRATEGIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load strategies:', e);
  }
  return INITIAL_STRATEGIES;
}

export function saveStrategies(strategies: TradingStrategy[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies));
  } catch (e) {
    console.error('Failed to save strategies:', e);
  }
}
