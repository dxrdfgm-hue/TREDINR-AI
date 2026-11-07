export type Language = 'kz' | 'ru';

export interface Translations {
  appName: string;
  appDescription: string;
  // Header Nav
  navDashboard: string;
  navCouncil: string;
  navPositions: string;
  navStrategies: string;
  navTelegram: string;
  navSettings: string;
  killSwitchActive: string;
  killSwitchReady: string;

  // Metric strip
  totalEquity: string;
  totalEquityDesc: string;
  freeUsdt: string;
  freeUsdtDesc: string;
  openPositions: string;
  openPositionsDesc: string;
  currentPnl: string;
  currentPnlDesc: string;

  // Controls
  startAutoTrading: string;
  stopAutoTrading: string;
  scanNow: string;
  scanning: string;
  nextScanIn: string;
  marketRegime: string;
  stopLossLimitActive: string;

  // Chart & Chief
  chiefVerdictTitle: string;
  chiefVerdictSubtitle: string;
  verdictApproved: string;
  verdictRejected: string;
  votesFor: string;
  votesAgainst: string;
  symbol: string;
  stopLoss: string;
  takeProfit: string;
  riskReward: string;
  noScanYet: string;
  noScanSub: string;
  consultGemini: string;
  consultingGemini: string;
  executeSpotOrder: string;
  positionAlreadyOpen: string;

  // Heatmap
  volatilityHeatmapTitle: string;
  agent8Badge: string;
  volatilityHeatmapDesc: string;
  legendSafe: string;
  legendHighRisk: string;
  viewD3Grid: string;
  viewD3Quadrant: string;
  selectedAsset: string;
  atrNoise: string;
  riskIndex: string;
  volatilityAnalystVerdict: string;
  normalVolatility: string;
  highVolatility: string;
  lowVolatility: string;
  overboughtWarning: string;

  // Scanner Table
  scannerTitle: string;
  scannerSubtitle: string;
  coinsTracked: string;
  colSymbol: string;
  colPrice: string;
  colChange24h: string;
  colVolume24h: string;
  colRsi: string;
  colCategory: string;
  colStatus: string;
  colAction: string;
  statusApproved: string;
  statusRejected: string;
  statusAnalyzing: string;
  statusWaitingCandle: string;
  statusIdle: string;
  catMeme: string;
  catMajor: string;
  btnChart: string;

  // Onboarding & Vault Modal
  onboardingTitleFirst: string;
  onboardingTitleSettings: string;
  onboardingSubtitle: string;
  selectMode: string;
  modePaperTitle: string;
  modePaperBadge: string;
  modePaperDesc: string;
  modeTestnetTitle: string;
  modeTestnetDesc: string;
  modeLiveTitle: string;
  modeLiveDesc: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  apiSecretLabel: string;
  apiSecretPlaceholder: string;
  showSecret: string;
  hideSecret: string;
  geminiApiKeyLabel: string;
  geminiApiKeyPlaceholder: string;
  geminiApiKeyDesc: string;
  ipWhitelistTitle: string;
  ipWhitelistDesc: string;
  copyIpBtn: string;
  ipCopied: string;
  keysSavedForeverNotice: string;
  paperKeyOptional: string;
  safetyTitle: string;
  safetyRule1: string;
  safetyRule2: string;
  safetyRule3: string;
  safetyCheckbox: string;
  testConnectionBtn: string;
  testingConnection: string;
  quickPaperBtn: string;
  saveAndLaunchBtn: string;
  closeBtn: string;

  // Positions View
  positionsTitle: string;
  positionsSubtitle: string;
  closeAllPositionsBtn: string;
  botPositionsTitle: string;
  noOpenPositions: string;
  noOpenPositionsSub: string;
  colSize: string;
  colEntryPrice: string;
  colCurrentPrice: string;
  colStopLossExchange: string;
  colTakeProfit: string;
  colPnl: string;
  btnClose: string;
  spotWalletTitle: string;
  readyForTrading: string;
  inActiveOrders: string;
  exchangeGuarantee: string;
  confirmCloseAllTitle: string;
  confirmCloseAllText: string;
  confirmCloseAllBtn: string;
  cancelBtn: string;

  // Risk Settings View
  riskSettingsTitle: string;
  riskSettingsSubtitle: string;
  changeKeysBtn: string;
  savedKeysTitle: string;
  lastConnected: string;
  spotProtectedTitle: string;
  spotProtectedDesc: string;
  hardcodedRulesTitle: string;
  cannotBeModified: string;
  ruleDailyLoss: string;
  ruleWeeklyLoss: string;
  ruleMaxDrawdown: string;
  ruleSlippage: string;
  ruleMaxPositions: string;
  rulePositionSize: string;
  ruleMinOrder: string;
  auditLogsTitle: string;
  clearLogsBtn: string;
  wipeDataTitle: string;
  wipeDataDesc: string;
  wipeDataBtn: string;
  confirmWipeTitle: string;
  confirmWipeDesc: string;
  confirmWipeBtn: string;

  // Telegram Console
  tgHeaderSubtitle: string;
  tgAutoActive: string;
  tgManualActive: string;
  tgSingleAgentRep: string;
  tgControlPanel: string;
  tgCountdown: string;
  tgInputPlaceholder: string;
  tgConfirmCloseAll: string;
  tgConfirmCloseAllYes: string;
  tgConfirmResume: string;
  tgConfirmResumeYes: string;

  // Council View
  councilTitle: string;
  councilSubtitle: string;
  chiefFinalVerdict: string;
  sourceLabel: string;
  filterAll: string;
  filterCapital: string;
  filterMarket: string;
  filterStrategy: string;
  filterRisk: string;
  filterExecution: string;
  filterCritic: string;
  detailsLabel: string;
  roleAndCriteria: string;
  currentDecisionReason: string;
  decisionApproved: string;
  decisionRejected: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  kz: {
    appName: 'APEX TRADER 2.0',
    appDescription: 'Binance Spot нарығына арналған 20 маман агент және 21-ші Бас агенттен тұратын автономды мульти-агент сауда жүйесі.',
    navDashboard: 'Басқару тақтасы',
    navCouncil: '20 Агент Кеңесі',
    navPositions: 'Позициялар',
    navStrategies: 'Стратегиялар & Инкубатор',
    navTelegram: 'Telegram Бот',
    navSettings: 'Тәуекел & API Кілттер',
    killSwitchActive: 'KILL-SWITCH ҚОСУЛЫ',
    killSwitchReady: 'KILL-SWITCH: ДАЙЫН',

    totalEquity: 'Жалпы Капитал',
    totalEquityDesc: 'Spot активтер + баланс',
    freeUsdt: 'Бос Баланс (USDT)',
    freeUsdtDesc: 'Жаңа ордерге қолжетімді',
    openPositions: 'Ашық Позициялар',
    openPositionsDesc: 'Көлем лимиті: ≤30% депозит',
    currentPnl: 'Ағымдағы P&L',
    currentPnlDesc: 'Күндік лимит: 3% / Апталық: 7%',

    startAutoTrading: 'Үздіксіз сауданы бастау',
    stopAutoTrading: 'Автосауданы тоқтату',
    scanNow: 'Қазір сканерлеу (/scan)',
    scanning: 'Сканерленуде...',
    nextScanIn: 'Келесі скан:',
    marketRegime: 'Нарық режимі:',
    stopLossLimitActive: 'STOP_LOSS_LIMIT белсенді',

    chiefVerdictTitle: '21-ші Бас Агенттің Шешімі',
    chiefVerdictSubtitle: '20 Маман Агенттің қорытындысы',
    verdictApproved: 'МАҚҰЛДАНДЫ',
    verdictRejected: 'БАС ТАРТЫЛДЫ',
    votesFor: 'Қолдаушы Дауыс',
    votesAgainst: 'Қарсы Дауыс',
    symbol: 'Символ:',
    stopLoss: 'Stop-Loss:',
    takeProfit: 'Take-Profit:',
    riskReward: 'R:R Қатынасы:',
    noScanYet: 'Әзірге скан шешімі жоқ.',
    noScanSub: '«Қазір сканерлеу» түймесін басыңыз немесе автосауданы қосыңыз.',
    consultGemini: 'Gemini AI Кеңесін шақыру',
    consultingGemini: 'Gemini 3.8 талдауда...',
    executeSpotOrder: 'Қазір ашу (Execute Spot Order)',
    positionAlreadyOpen: 'Позиция ашық тұр (Қайталап алуға тыйым салынған)',

    volatilityHeatmapTitle: 'Құбылмалылық Жылулық Картасы (D3 Heatmap)',
    agent8Badge: '8-ші Агент: Құбылмалылық талдаушысы',
    volatilityHeatmapDesc: 'Жоғары ATR дірілі мен RSI деңгейлері жылы, қанық түстермен (сарғылт, қызыл) бейнеленіп, Stop-Loss тәуекелін бірден көрсетеді.',
    legendSafe: 'Қауіпсіз',
    legendHighRisk: 'Жоғары Тәуекел',
    viewD3Grid: 'D3 Тор (Grid)',
    viewD3Quadrant: '2D Квадрант (D3)',
    selectedAsset: 'Таңдалған:',
    atrNoise: 'ATR дірілі:',
    riskIndex: 'Тәуекел индексі:',
    volatilityAnalystVerdict: 'Құбылмалылық талдаушысы:',
    normalVolatility: 'Қалыпты волатильдік (Оңтайлы Stop-Loss)',
    highVolatility: 'Жоғары ATR: Стоп кеңейтуді немесе позицияны азайтуды талап етеді',
    lowVolatility: 'Төмен волатильдік: қозғалыс тым әлсіз',
    overboughtWarning: 'RSI > 70: Перекупленность және ауытқу қаупі',

    scannerTitle: 'Spot Кандидаттар Сканері',
    scannerSubtitle: '24 сағаттық көлем > 50M USDT, Spot бағасы, ATR және 20 маман сүзгісі',
    coinsTracked: 'монета бақылауда',
    colSymbol: 'Символ',
    colPrice: 'Баға (USDT)',
    colChange24h: '24с Өзгеріс',
    colVolume24h: '24с Көлем',
    colRsi: 'RSI',
    colCategory: 'Санат',
    colStatus: 'Күйі',
    colAction: 'Әрекет',
    statusApproved: 'Мақұлданды',
    statusRejected: 'Бас тартылды',
    statusAnalyzing: 'Талдауда...',
    statusWaitingCandle: '1с шамды күтуде',
    statusIdle: 'Кезекте',
    catMeme: 'Мемкоин',
    catMajor: 'Негізгі',
    btnChart: 'График',

    onboardingTitleFirst: 'Binance API Кілттерін Енгізу',
    onboardingTitleSettings: 'Binance Қосылым Баптаулары',
    onboardingSubtitle: 'APEX Trader 2.0 AI жүйесін іске қосу үшін бір рет сақталады.',
    selectMode: 'Сауда Режимін Таңдаңыз (MODE)',
    modePaperTitle: 'PAPER',
    modePaperBadge: 'Ұсынылады',
    modePaperDesc: 'Виртуалды $1,000 USDT. Тәуекелсіз тестілеу.',
    modeTestnetTitle: 'TESTNET',
    modeTestnetDesc: 'Binance Spot Testnet ресми тестілеу желісі.',
    modeLiveTitle: 'LIVE SPOT',
    modeLiveDesc: 'Binance Spot нақты ордерлері (50-100$).',
    apiKeyLabel: 'Binance API Key',
    apiKeyPlaceholder: 'Мысалы: vmPUZE6mv9SD5VBs...',
    apiSecretLabel: 'Binance API Secret',
    apiSecretPlaceholder: '••••••••••••••••••••••••',
    showSecret: 'Көрсету',
    hideSecret: 'Жасыру',
    geminiApiKeyLabel: 'Gemini AI API Кілт (21-ші Бас Агент үшін)',
    geminiApiKeyPlaceholder: 'AIzaSy... (қосымша, бос болса жүйе кілті істейді)',
    geminiApiKeyDesc: '21-ші Бас Агент (Chief Supreme Agent) кеңесін нақты Gemini 3.8 Flash арқылы басқару үшін.',
    ipWhitelistTitle: 'Binance IP Whitelist (API Қауіпсіздігі)',
    ipWhitelistDesc: 'Binance-те API кілт жасағанда «Restrict access to trusted IPs only» таңдап, осы IP адресті қойыңыз:',
    copyIpBtn: 'IP көшіру',
    ipCopied: 'Көшірілді! ✓',
    keysSavedForeverNotice: 'Кілттер құрылғыңызда мәңгі сақталады (өзіңіз өшірмейінше жойылмайды)',
    paperKeyOptional: 'Paper режимі үшін міндетті емес',
    safetyTitle: 'Қауіпсіздік Ережелері (Өзгертпеңіз):',
    safetyRule1: 'API кілтінде тек «Enable Reading» және «Enable Spot & Margin Trading» рұқсатын қосыңыз.',
    safetyRule2: 'Қаражат шығару (Enable Withdrawals) рұқсатын МҮЛДЕМ ҚОСПАҢЫЗ!',
    safetyRule3: 'Кілттер тек сіздің жергілікті браузеріңізде шифрланып сақталады.',
    safetyCheckbox: 'Қауіпсіздік талаптарын түсіндім және қабылдаймын',
    testConnectionBtn: 'Қосылымды тексеру',
    testingConnection: 'Тексерілуде...',
    quickPaperBtn: 'Paper-мен жылдам бастау',
    saveAndLaunchBtn: 'Сақтау және Сауданы Бастау',
    closeBtn: 'Жабу',

    positionsTitle: 'Ашық Позициялар және Портфель Бақылауы',
    positionsSubtitle: 'Бот позициялары (макс 2) және Binance Spot әмиянындағы сыртқы активтер бөлек есептеледі.',
    closeAllPositionsBtn: 'Барлық бот позициясын жабу',
    botPositionsTitle: 'Боттың Ашық Позициялары',
    noOpenPositions: 'Қазіргі уақытта ашық сауда жоқ.',
    noOpenPositionsSub: 'Жүйе 20 маман агент мақұлдаған және тәуекел сүзгісінен өткен саудаларды ғана ашады.',
    colSize: 'Көлем',
    colEntryPrice: 'Кіру Бағасы',
    colCurrentPrice: 'Ағымдағы Баға',
    colStopLossExchange: 'Stop-Loss (Биржалық)',
    colTakeProfit: 'Take-Profit',
    colPnl: 'P&L (USDT / %)',
    btnClose: 'Жабу',
    spotWalletTitle: 'Spot Әмиян Активтері (/status)',
    readyForTrading: 'Саудаға дайын',
    inActiveOrders: 'Ашық ордерлерде',
    exchangeGuarantee: 'Биржалық кепілдік',
    confirmCloseAllTitle: 'Барлық позицияларды жабу',
    confirmCloseAllText: 'Барлық ашық бот позициясы биржада нарықтық Spot бағасымен дереу сатылады. Бұл әрекетті растайсыз ба?',
    confirmCloseAllBtn: 'Иә, дереу жабу',
    cancelBtn: 'Бас тарту',

    riskSettingsTitle: 'Қауіпсіздік Жүйесі және Binance API Кілттер Қоймасы',
    riskSettingsSubtitle: 'Қатаң бағдарламалық кодпен қорғалған Risk Manager тексерістері мен сақталған API параметрлері.',
    changeKeysBtn: 'Binance Кілттерін Өзгерту',
    savedKeysTitle: 'Сақталған Binance Кілттері',
    lastConnected: 'Соңғы қосылым уақыты',
    spotProtectedTitle: 'Spot Саудасы Қорғалған:',
    spotProtectedDesc: 'Қаражат шығару (Withdrawal) өшірулі. Бот тек Spot нарығында сатып алу және Stop-Loss қою әрекеттерін орындайды.',
    hardcodedRulesTitle: '🛡 Risk Manager (Қатаң Бағдарламалық Ережелер)',
    cannotBeModified: 'ӨЗГЕРТІЛМЕЙДІ',
    ruleDailyLoss: 'Күндік шығын лимиті (Daily Loss):',
    ruleWeeklyLoss: 'Апталық шығын лимиті (Weekly Loss):',
    ruleMaxDrawdown: 'Жалпы максималды просадка (Drawdown):',
    ruleSlippage: 'Бағаның сигналдан ауытқу шегі (Slippage):',
    ruleMaxPositions: 'Максималды бір мезгілдегі ашық позиция:',
    rulePositionSize: 'Позиция көлемі (Spot):',
    ruleMinOrder: 'Биржалық ең аз ордер:',
    auditLogsTitle: 'Жүйелік Аудит Журналы (Audit Logs)',
    clearLogsBtn: 'Тазарту',
    wipeDataTitle: 'Барлық жергілікті деректерді өшіру',
    wipeDataDesc: 'Сақталған кілттерді, тарихты және виртуалды теңгерімді бастапқы күйге қайтару.',
    wipeDataBtn: 'Деректерді өшіру',
    confirmWipeTitle: 'Жүйені нөлдеуді растайсыз ба?',
    confirmWipeDesc: 'Барлық кілттер мен тарих браузерден біржола өшіріледі.',
    confirmWipeBtn: 'Иә, нөлдеу',

    tgHeaderSubtitle: '20 маман кеңесінің жалғыз өкілі',
    tgAutoActive: 'Автономды сауда белсенді',
    tgManualActive: 'Қолмен режим',
    tgSingleAgentRep: '20 маман кеңесінің жалғыз өкілі',
    tgControlPanel: 'Бақылау тақтасы:',
    tgCountdown: 'Кері санақ:',
    tgInputPlaceholder: 'Хабарлама немесе команда жазыңыз (/scan, /status, /agents)...',
    tgConfirmCloseAll: 'Барлық бот позициясын биржада нарықтық бағамен жабуды растайсыз ба?',
    tgConfirmCloseAllYes: 'Иә, барлығын жабу',
    tgConfirmResume: 'Kill-Switch себебі тексерілді ме? Сауданы қайта қосуды растайсыз ба?',
    tgConfirmResumeYes: 'Қайта қосу (/resume)',

    councilTitle: '20 Маман Агент + 21-ші Бас Агент Кеңесі',
    councilSubtitle: '20 маман бір кандидаттың нарық, стратегия, портфель, баланс, қорғаныс және орындау деректерін жеке рөл бойынша талдап, 21-ші Бас агентке есеп береді. Мақұлдау үшін кемінде 17/20 жақтаушы дауыс қажет.',
    chiefFinalVerdict: '21-ші Бас Агенттің Соңғы Қорытындысы',
    sourceLabel: 'Дереккөз:',
    filterAll: 'Барлық 20 Агент',
    filterCapital: 'Қазына & Капитал',
    filterMarket: 'Нарық & Көлем',
    filterStrategy: 'Стратегия & Тренд',
    filterRisk: 'Тәуекел & Stop-Loss',
    filterExecution: 'Орындау & Биржа',
    filterCritic: 'Тәуелсіз Сыншы',
    detailsLabel: 'Мәлімет →',
    roleAndCriteria: 'Рөл және Тексеру критерийлері:',
    currentDecisionReason: 'Ағымдағы шешім және дәлел:',
    decisionApproved: 'Мақұлданды (Approved):',
    decisionRejected: 'Бас тартылды (Rejected):',
  },
  ru: {
    appName: 'APEX TRADER 2.0',
    appDescription: 'Автономная мультиагентная торговая система Binance Spot на базе 20 агентов-специалистов и 21-го Главного Агента.',
    navDashboard: 'Панель управления',
    navCouncil: 'Совет 20 Агентов',
    navPositions: 'Позиции',
    navStrategies: 'Стратегии & Инкубатор',
    navTelegram: 'Telegram Бот',
    navSettings: 'Риск & API Ключи',
    killSwitchActive: 'KILL-SWITCH АКТИВЕН',
    killSwitchReady: 'KILL-SWITCH: ГОТОВ',

    totalEquity: 'Общий Капитал',
    totalEquityDesc: 'Spot активы + свободный баланс',
    freeUsdt: 'Свободный USDT',
    freeUsdtDesc: 'Доступно для новых ордеров',
    openPositions: 'Открытые Позиции',
    openPositionsDesc: 'Лимит объема: ≤30% капитала',
    currentPnl: 'Текущий P&L',
    currentPnlDesc: 'Дневной лимит: 3% / Недельный: 7%',

    startAutoTrading: 'Запустить автоторговлю',
    stopAutoTrading: 'Остановить автоторговлю',
    scanNow: 'Сканировать сейчас (/scan)',
    scanning: 'Сканирование...',
    nextScanIn: 'Следующий скан:',
    marketRegime: 'Режим рынка:',
    stopLossLimitActive: 'STOP_LOSS_LIMIT активен',

    chiefVerdictTitle: 'Решение 21-го Главного Агента',
    chiefVerdictSubtitle: 'Сводный консенсус 20 Агентов-Специалистов',
    verdictApproved: 'ОДОБРЕНО',
    verdictRejected: 'ОТКЛОНЕНО',
    votesFor: 'Голосов За',
    votesAgainst: 'Голосов Против',
    symbol: 'Символ:',
    stopLoss: 'Stop-Loss:',
    takeProfit: 'Take-Profit:',
    riskReward: 'Соотношение R:R:',
    noScanYet: 'Пока нет решений сканирования.',
    noScanSub: 'Нажмите «Сканировать сейчас» или запустите автоторговлю.',
    consultGemini: 'Запросить Совет Gemini AI',
    consultingGemini: 'Gemini 3.8 анализирует...',
    executeSpotOrder: 'Открыть сейчас (Execute Spot Order)',
    positionAlreadyOpen: 'Позиция уже открыта (Повторный вход запрещён)',

    volatilityHeatmapTitle: 'Тепловая Карта Волатильности (D3 Heatmap)',
    agent8Badge: '8-й Агент: Аналитик Волатильности',
    volatilityHeatmapDesc: 'Высокие значения шума ATR и уровни RSI отображаются теплыми, насыщенными цветами (янтарный, красный) для наглядной оценки риска Stop-Loss.',
    legendSafe: 'Безопасно',
    legendHighRisk: 'Высокий Риск',
    viewD3Grid: 'D3 Сетка (Grid)',
    viewD3Quadrant: '2D Квадрант (D3)',
    selectedAsset: 'Выбран:',
    atrNoise: 'Шум ATR:',
    riskIndex: 'Индекс риска:',
    volatilityAnalystVerdict: 'Вердикт Аналитика Волатильности:',
    normalVolatility: 'Нормальная волатильность (Оптимальный Stop-Loss)',
    highVolatility: 'Высокий ATR: Требуется расширение стопа или снижение объема',
    lowVolatility: 'Низкая волатильность: движение слишком слабое',
    overboughtWarning: 'RSI > 70: Риск перекупленности и резкого отката',

    scannerTitle: 'Сканер Spot Кандидатов',
    scannerSubtitle: 'Объем 24ч > 50M USDT, Spot цена, ATR и фильтр 20 специалистов',
    coinsTracked: 'монет под наблюдением',
    colSymbol: 'Символ',
    colPrice: 'Цена (USDT)',
    colChange24h: '24ч Изм.',
    colVolume24h: '24ч Объем',
    colRsi: 'RSI',
    colCategory: 'Категория',
    colStatus: 'Статус',
    colAction: 'Действие',
    statusApproved: 'Одобрено',
    statusRejected: 'Отклонено',
    statusAnalyzing: 'Анализ...',
    statusWaitingCandle: 'Ожидание 1ч свечи',
    statusIdle: 'В очереди',
    catMeme: 'Мемкоин',
    catMajor: 'Основной',
    btnChart: 'График',

    onboardingTitleFirst: 'Ввод API Ключей Binance',
    onboardingTitleSettings: 'Настройки Подключения Binance',
    onboardingSubtitle: 'Сохраняется локально для запуска системы APEX Trader 2.0.',
    selectMode: 'Выберите Торговый Режим (MODE)',
    modePaperTitle: 'PAPER',
    modePaperBadge: 'Рекомендуется',
    modePaperDesc: 'Виртуальные $1,000 USDT. Безопасное тестирование.',
    modeTestnetTitle: 'TESTNET',
    modeTestnetDesc: 'Официальная тестовая сеть Binance Spot Testnet.',
    modeLiveTitle: 'LIVE SPOT',
    modeLiveDesc: 'Реальные Spot ордера Binance (рекомендуется 50-100$).',
    apiKeyLabel: 'Binance API Key',
    apiKeyPlaceholder: 'Например: vmPUZE6mv9SD5VBs...',
    apiSecretLabel: 'Binance API Secret',
    apiSecretPlaceholder: '••••••••••••••••••••••••',
    showSecret: 'Показать',
    hideSecret: 'Скрыть',
    geminiApiKeyLabel: 'API Ключ Gemini AI (для 21-го Главного Агента)',
    geminiApiKeyPlaceholder: 'AIzaSy... (необязательно, по умолчанию системный)',
    geminiApiKeyDesc: 'Для работы 21-го Главного Агента (Chief Supreme Agent) через нейросеть Gemini 3.8 Flash.',
    ipWhitelistTitle: 'Binance IP Whitelist (Безопасность API)',
    ipWhitelistDesc: 'При создании API ключа на Binance выберите «Restrict access to trusted IPs only» и укажите этот IP адрес:',
    copyIpBtn: 'Копировать IP',
    ipCopied: 'Скопировано! ✓',
    keysSavedForeverNotice: 'Ключи сохраняются в браузере навсегда (пока вы сами их не удалите)',
    paperKeyOptional: 'Не требуется для режима Paper',
    safetyTitle: 'Правила Безопасности (Строго обязательно):',
    safetyRule1: 'Включите в API ключе ТОЛЬКО «Enable Reading» и «Enable Spot & Margin Trading».',
    safetyRule2: 'Разрешение на вывод средств (Enable Withdrawals) КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО включать!',
    safetyRule3: 'Ключи хранятся исключительно в зашифрованном хранилище вашего браузера.',
    safetyCheckbox: 'Я ознакомился с требованиями безопасности и принимаю риски',
    testConnectionBtn: 'Проверить соединение',
    testingConnection: 'Проверка...',
    quickPaperBtn: 'Быстрый старт с Paper',
    saveAndLaunchBtn: 'Сохранить и Запустить',
    closeBtn: 'Закрыть',

    positionsTitle: 'Открытые Позиции и Мониторинг Портфеля',
    positionsSubtitle: 'Позиции бота (макс 2) и внешние активы кошелька Binance Spot разделены.',
    closeAllPositionsBtn: 'Закрыть все позиции бота',
    botPositionsTitle: 'Открытые Позиции Бота',
    noOpenPositions: 'В данный момент нет открытых позиций.',
    noOpenPositionsSub: 'Система открывает только сделки, одобренные 20 агентами и прошедшие Risk Manager.',
    colSize: 'Объем',
    colEntryPrice: 'Цена Входа',
    colCurrentPrice: 'Текущая Цена',
    colStopLossExchange: 'Stop-Loss (Биржевой)',
    colTakeProfit: 'Take-Profit',
    colPnl: 'P&L (USDT / %)',
    btnClose: 'Закрыть',
    spotWalletTitle: 'Активы Spot Кошелька (/status)',
    readyForTrading: 'Готово к торговле',
    inActiveOrders: 'В активных ордерах',
    exchangeGuarantee: 'Биржевая защита',
    confirmCloseAllTitle: 'Закрыть все позиции',
    confirmCloseAllText: 'Все открытые позиции бота будут немедленно проданы по рыночной Spot цене. Подтверждаете?',
    confirmCloseAllBtn: 'Да, закрыть всё',
    cancelBtn: 'Отмена',

    riskSettingsTitle: 'Система Безопасности и Хранилище Ключей Binance',
    riskSettingsSubtitle: 'Жестко закодированные проверки Risk Manager и сохраненные параметры API.',
    changeKeysBtn: 'Изменить Ключи Binance',
    savedKeysTitle: 'Сохраненные Ключи Binance',
    lastConnected: 'Время последнего подключения',
    spotProtectedTitle: 'Spot Торговля Защищена:',
    spotProtectedDesc: 'Вывод средств (Withdrawal) отключен. Бот выполняет только покупки на Spot и установку Stop-Loss ордеров.',
    hardcodedRulesTitle: '🛡 Risk Manager (Жестко Закодированные Правила)',
    cannotBeModified: 'НЕ ИЗМЕНЯЕТСЯ',
    ruleDailyLoss: 'Дневной лимит убытка (Daily Loss):',
    ruleWeeklyLoss: 'Недельный лимит убытка (Weekly Loss):',
    ruleMaxDrawdown: 'Максимальная просадка (Drawdown):',
    ruleSlippage: 'Лимит проскальзывания цены (Slippage):',
    ruleMaxPositions: 'Максимум одновременных позиций:',
    rulePositionSize: 'Размер позиции (Spot):',
    ruleMinOrder: 'Минимальный биржевой ордер:',
    auditLogsTitle: 'Журнал Аудита Системы (Audit Logs)',
    clearLogsBtn: 'Очистить',
    wipeDataTitle: 'Удалить все локальные данные',
    wipeDataDesc: 'Сбросить сохраненные ключи, историю сделок и баланс к начальному состоянию.',
    wipeDataBtn: 'Сбросить данные',
    confirmWipeTitle: 'Подтверждаете полный сброс?',
    confirmWipeDesc: 'Все ключи и история будут безвозвратно удалены из браузера.',
    confirmWipeBtn: 'Да, сбросить',

    tgHeaderSubtitle: 'Единственный представитель совета 20 специалистов',
    tgAutoActive: 'Автономная торговля активна',
    tgManualActive: 'Ручной режим',
    tgSingleAgentRep: 'Единственный представитель совета 20 специалистов',
    tgControlPanel: 'Панель мониторинга:',
    tgCountdown: 'Обратный отсчет:',
    tgInputPlaceholder: 'Введите сообщение или команду (/scan, /status, /agents)...',
    tgConfirmCloseAll: 'Подтверждаете закрытие всех позиций бота по рыночной цене?',
    tgConfirmCloseAllYes: 'Да, закрыть все',
    tgConfirmResume: 'Причина Kill-Switch устранена? Подтверждаете возобновление торговли?',
    tgConfirmResumeYes: 'Возобновить (/resume)',

    councilTitle: 'Совет 20 Агентов + 21-й Главный Агент',
    councilSubtitle: '20 специалистов анализируют рынок, стратегию, портфель, баланс и исполнение, передавая отчеты 21-му Главному Агенту. Для одобрения необходимо минимум 17/20 голосов «За».',
    chiefFinalVerdict: 'Итоговый Вердикт 21-го Главного Агента',
    sourceLabel: 'Источник:',
    filterAll: 'Все 20 Агентов',
    filterCapital: 'Казна & Капитал',
    filterMarket: 'Рынок & Объем',
    filterStrategy: 'Стратегия & Тренд',
    filterRisk: 'Риск & Stop-Loss',
    filterExecution: 'Исполнение & Биржа',
    filterCritic: 'Независимый Критик',
    detailsLabel: 'Подробнее →',
    roleAndCriteria: 'Роль и Критерии проверки:',
    currentDecisionReason: 'Текущее решение и аргументация:',
    decisionApproved: 'Одобрено (Approved):',
    decisionRejected: 'Отклонено (Rejected):',
  },
};

export const AGENT_TRANSLATIONS: Record<
  Language,
  Array<{ id: number; name: string; role: string; description: string }>
> = {
  kz: [
    {
      id: 1,
      name: 'Қазына агенті',
      role: 'Капитал және бос USDT балансын қадағалаушы',
      description: 'Жалпы капитал, бос USDT және позиция көлемінің депозитке сәйкестігін тексереді. Биржаның 5 USDT минимумын қамтамасыз етеді.',
    },
    {
      id: 2,
      name: 'Нарық және монета іздеуші',
      role: 'Spot жұптары мен сауда көлемінің сүзгісі',
      description: 'Сканер берген Spot жұптарын, көлем сүзгісін (24с > 50M USDT) және бақылау тізімін бағалайды; берілмеген деректі ойдан қоспайды.',
    },
    {
      id: 3,
      name: 'Техникалық талдаушы',
      role: 'Баға құрылымы мен индикаторлар сарапшысы',
      description: 'EMA 20/50/200 иерархиясы, қолдау/қарсылық деңгейлері және шам модельдері бойынша баға құрылымын тексереді.',
    },
    {
      id: 4,
      name: 'Тренд талдаушысы',
      role: 'Нарықтық вектор және Higher Highs/Lows бақылаушы',
      description: '1 сағаттық және 4 сағаттық уақыт аралығында баға бағыты трендтік стратегияға толық сәйкес келетінін бағалайды.',
    },
    {
      id: 5,
      name: 'Импульс талдаушысы',
      role: 'RSI және қозғалыс тығыздығын өлшеуші',
      description: 'RSI көрсеткішін (35-68) тексереді. Қозғалыс шамадан тыс созылып, перекупленность (>70) болса, дереу қарсы дауыс береді.',
    },
    {
      id: 6,
      name: 'Көлем талдаушысы',
      role: 'Сауда көлемінің динамикасын бақылаушы',
      description: 'Сауда көлемі мен оның өзгерісін бағалайды. Breakout кезінде орташа көлемнен 1.5x артық өсімді талап етеді.',
    },
    {
      id: 7,
      name: 'Өтімділік талдаушысы',
      role: 'Спред және сырғу (slippage) қаупін бағалаушы',
      description: 'Order book тереңдігін, спредті (<0.1%) және нарықтық сырғу тәуекелін тексереді; тереңдік дерегі болмаса шектеуді ескертеді.',
    },
    {
      id: 8,
      name: 'Құбылмалылық талдаушысы',
      role: 'ATR және нарық дірілін өлшеуші',
      description: 'Волатильділіктің (ATR) Stop-Loss пен позиция көлеміне математикалық сәйкестігін тексереді.',
    },
    {
      id: 9,
      name: 'Нарық режимі талдаушысы',
      role: 'Bull / Bear / Range режімін анықтаушы',
      description: 'Жалпы нарық режимінің мәмілеге ықпалын бағалайды. Bear режимінде мемкоиндерді мүлдем өткізбейді.',
    },
    {
      id: 10,
      name: 'Bitcoin және нарық кеңдігі талдаушысы',
      role: 'BTC бағыты мен нарықтық альянсты бақылаушы',
      description: 'BTC/USDT 1 сағаттық қозғалысы мен Spot нарығының жалпы кеңдігін тексереді. BTC құлдыраса, альткоин саудасын тежейді.',
    },
    {
      id: 11,
      name: 'Стратегия аудиторы',
      role: 'Walk-forward және стратегия математикасы',
      description: 'Сигналдың 4 бекітілген стратегияға (Breakout, Pullback, Mean Reversion, Trend Following) нақты сай келуін қарайды.',
    },
    {
      id: 12,
      name: 'Күтілетін нәтиже талдаушысы',
      role: 'Profit Factor және Risk/Reward қатынасы',
      description: 'Risk/Reward қатынасы кемінде 1:2 немесе 1:2.5 екенін, мәміледен күтілетін математикалық пайданың оң мәнділігін бағалайды.',
    },
    {
      id: 13,
      name: 'Орындау және жабу талдаушысы',
      role: 'Биржалық орындалу және лимиттер сарапшысы',
      description: 'Бағаның сигналдан ауытқуын (< 0.5%), биржа минимумын және ордердің кедергісіз жабылу қаупін қарайды.',
    },
    {
      id: 14,
      name: 'Stop-Loss бақылаушысы',
      role: 'Тәуекел шекарасы мен биржалық stop қорғанысы',
      description: 'Stop деңгейін ATR негізінде есептейді және ықтимал шығын көлемі депозиттің 1%-ынан (мемкоин 0.5%) аспауын қадағалайды.',
    },
    {
      id: 15,
      name: 'Портфель тәуекелі талдаушысы',
      role: 'Ашық позициялар мен шоғырлану инспекторы',
      description: 'Ашық позициялар саны (макс 2), Spot holdings және бір секторға шоғырлану шегін қатаң тексереді.',
    },
    {
      id: 16,
      name: 'Капитал қорғаушысы',
      role: 'Күндік/апталық шығын және drawdown қалқаны',
      description: 'Күндік 3%, апталық 7% шығын лимиті және 15% жалпы drawdown шектерін қорғайды. Асып кетсе KILL-SWITCH қосады.',
    },
    {
      id: 17,
      name: 'Корреляция талдаушысы',
      role: 'Активтердің өзара байланыс тәуекелі',
      description: 'Жаңа кандидат пен қазіргі ашық позициялар арасындағы қайталану және бағалық синхрондық тәуекелін бағалайды.',
    },
    {
      id: 18,
      name: 'Жүйе және дерек сапасы бақылаушысы',
      role: 'API байланысы және telemetry тұтастығы',
      description: 'Скан кезеңі, Binance API жауаптары, баланс және шам деректерінің толықтығын тексереді; жоқ деректі ойдан шығармайды.',
    },
    {
      id: 19,
      name: 'Актив тәуекелі талдаушысы',
      role: 'Монета класы мен қауіп маркерлері',
      description: 'Актив санатын (Major, Mid-cap, High Risk Memecoin) бағалайды. Мемкоинге позиция көлемін капиталдың 10%-ынан асырмайды.',
    },
    {
      id: 20,
      name: 'Тәуелсіз сыншы (Devil\'s Advocate)',
      role: 'Саудадан бас тартудың ең күшті себебін іздеуші',
      description: 'Саудадан бас тартудың ең күшті аргументін іздейді. Нарықта кішкене де күмән, белгісіздік болса, ҚАРСЫ дауыс береді.',
    },
  ],
  ru: [
    {
      id: 1,
      name: 'Агент Казначейства',
      role: 'Контролер капитала и свободного USDT баланса',
      description: 'Проверяет соответствие общего капитала, свободного USDT и размера позиции депозиту. Обеспечивает выполнение минимума биржи 5 USDT.',
    },
    {
      id: 2,
      name: 'Скаут Рынка и Монет',
      role: 'Фильтр Spot пар и торгового объема',
      description: 'Оценивает выданные сканером Spot пары, фильтр объема (24ч > 50M USDT) и watchlist; не выдумывает отсутствующие данные листинга.',
    },
    {
      id: 3,
      name: 'Технический Аналитик',
      role: 'Эксперт структуры цены и индикаторов',
      description: 'Проверяет структуру цены по иерархии EMA 20/50/200, ключевым уровням поддержки/сопротивления и свечным паттернам.',
    },
    {
      id: 4,
      name: 'Аналитик Тренда',
      role: 'Контролер рыночного вектора и Higher Highs/Lows',
      description: 'Оценивает соответствие направления цены трендовой стратегии на таймфреймах 1 час и 4 часа.',
    },
    {
      id: 5,
      name: 'Аналитик Импульса',
      role: 'Измеритель RSI и растянутости движения',
      description: 'Проверяет RSI (35-68). Если движение перерастянуто и наблюдается перекупленность (>70), голосует ПРОТИВ сделки.',
    },
    {
      id: 6,
      name: 'Аналитик Объема',
      role: 'Наблюдатель динамики торгового объема',
      description: 'Оценивает торговый объем и его всплески. Требует роста объема в 1.5x выше среднего при пробое уровней (breakout).',
    },
    {
      id: 7,
      name: 'Аналитик Ликвидности',
      role: 'Оценщик спреда и риска проскальзывания (slippage)',
      description: 'Проверяет глубину биржевого стакана, спред (<0.1%) и риск проскальзывания ордеров при исполнении.',
    },
    {
      id: 8,
      name: 'Аналитик Волатильности',
      role: 'Измеритель ATR и колебаний рынка',
      description: 'Проверяет математическое соответствие волатильности (ATR) размеру Stop-Loss и допустимому объему позиции.',
    },
    {
      id: 9,
      name: 'Аналитик Режима Рынка',
      role: 'Определитель режимов Bull / Bear / Range',
      description: 'Оценивает влияние общего режима рынка на сделку. В медвежьем (Bear) режиме покупка мемкоинов полностью блокируется.',
    },
    {
      id: 10,
      name: 'Аналитик Bitcoin и Широты Рынка',
      role: 'Контролер тренда BTC и давления на альткоины',
      description: 'Отслеживает 1ч движение BTC/USDT и общую ширину рынка. При дампе BTC блокирует открытие покупок по альтам.',
    },
    {
      id: 11,
      name: 'Аудитор Стратегии',
      role: 'Контролер walk-forward и математики стратегии',
      description: 'Проверяет строгое соответствие сигнала одной из 4 стратегий (Breakout, Pullback, Mean Reversion, Trend Following).',
    },
    {
      id: 12,
      name: 'Аналитик Матожидания (R:R)',
      role: 'Оценщик Profit Factor и соотношения риск/прибыль',
      description: 'Требует соотношение Risk/Reward не менее 1:2 или 1:2.5 и положительное математическое ожидание сделки.',
    },
    {
      id: 13,
      name: 'Аналитик Исполнения и Закрытия',
      role: 'Эксперт биржевых лимитов и закрытия ордера',
      description: 'Проверяет отклонение цены от сигнала (<0.5%), биржевой минимум и риски зависания ордера при закрытии.',
    },
    {
      id: 14,
      name: 'Хранитель Stop-Loss',
      role: 'Контролер уровней стопа и биржевой защиты',
      description: 'Рассчитывает динамический Stop-Loss на основе ATR и гарантирует, что риск не превысит 1% депозита (0.5% для мемкоина).',
    },
    {
      id: 15,
      name: 'Аналитик Риска Портфеля',
      role: 'Инспектор открытых позиций и концентрации',
      description: 'Строго следит за лимитом открытых позиций бота (максимум 2) и предотвращает концентрацию в одном секторе.',
    },
    {
      id: 16,
      name: 'Защитник Капитала',
      role: 'Щит дневного/недельного убытка и просадки',
      description: 'Защищает лимиты: 3% дневной, 7% недельный убыток и 15% максимальный Drawdown. При превышении активирует KILL-SWITCH.',
    },
    {
      id: 17,
      name: 'Аналитик Корреляции',
      role: 'Оценщик взаимного риска дублирования активов',
      description: 'Оценивает синхронность движения нового кандидата с уже открытыми позициями для предотвращения дублирования риска.',
    },
    {
      id: 18,
      name: 'Контролер Системы и Качества Данных',
      role: 'Инспектор API связи и целостности телеметрии',
      description: 'Проверяет пинг Binance API, полноту свечных данных и баланса; никогда не выдумывает отсутствующие метрики.',
    },
    {
      id: 19,
      name: 'Аналитик Риска Актива',
      role: 'Классификатор монеты и маркеров угрозы',
      description: 'Оценивает класс актива (Major, Mid-cap, Memecoin). Для мемкоинов ограничивает размер позиции до ≤10% капитала.',
    },
    {
      id: 20,
      name: 'Независимый Критик (Адвокат Дьявола)',
      role: 'Искатель сильнейшей причины для отказа от сделки',
      description: 'Ищет главный контр-аргумент против входа. При малейших сомнениях или аномалиях голосует ПРОТИВ сделки.',
    },
  ],
};
