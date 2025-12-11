/**
 * Connect Asia - Types
 * Типы для модуля экономики и геймификации Go2Asia
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Модуль экосистемы Go2Asia */
export type ModuleType = 'space' | 'atlas' | 'pulse' | 'rf' | 'quest' | 'guru';

/** Валюта награды */
export type Currency = 'points' | 'g2a';

/** Тип транзакции */
export type TransactionType = 'credit' | 'debit';

/** Редкость NFT бейджа */
export type NFTRarity = 'common' | 'rare' | 'legendary';

/** Статус достижения */
export type AchievementStatus = 'locked' | 'in_progress' | 'completed';

/** Статус миссии */
export type MissionStatus = 'new' | 'in_progress' | 'completed' | 'expired';

/** Тип миссии */
export type MissionType = 'daily' | 'weekly' | 'seasonal';

/** Тип реферала */
export type ReferralType = 'user' | 'partner';

/** Статус реферала в воронке */
export type ReferralFunnelStage = 'registered' | 'active' | 'completed_mission' | 'inactive';

// =============================================================================
// Балансы
// =============================================================================

export interface Balances {
  points: number;
  g2a: number;
  nft_count: number;
  nft_legendary_count?: number;
}

// =============================================================================
// Уровни и XP
// =============================================================================

export interface Level {
  current: number;
  xp: number;
  next_level_xp: number;
  multiplier: number;
  bonuses?: LevelBonus[];
}

export interface LevelBonus {
  type: 'reward_multiplier' | 'seasonal_access' | 'premium_feature';
  value: number | boolean;
  description: string;
}

// =============================================================================
// Транзакции
// =============================================================================

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  module: ModuleType;
  description: string;
  created_at: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

// =============================================================================
// Награды
// =============================================================================

export interface Reward {
  points?: number;
  g2a?: number;
  nft?: string;
}

// =============================================================================
// Достижения
// =============================================================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  max_progress: number;
  status: AchievementStatus;
  reward: Reward;
  hint?: string;
  image: string;
  module?: ModuleType;
}

// =============================================================================
// NFT Бейджи
// =============================================================================

export interface NFTBadge {
  id: string;
  name: string;
  description: string;
  rarity: NFTRarity;
  image: string;
  module: ModuleType;
  unlocked_at?: string;
  conditions: string;
  can_upgrade: boolean;
}

// =============================================================================
// Миссии
// =============================================================================

export interface Mission {
  id: string;
  title: string;
  description: string;
  module: ModuleType;
  type: MissionType;
  reward: Reward;
  deadline?: string;
  progress: number;
  max_progress: number;
  status: MissionStatus;
  deeplink: string;
}

// =============================================================================
// Рефералы
// =============================================================================

export interface Referral {
  id: string;
  type: ReferralType;
  name: string;
  avatar?: string;
  status: ReferralFunnelStage;
  earned_rewards: {
    points: number;
    g2a: number;
  };
  invited_at: string;
  missions_completed?: number;
  missions_total?: number;
}

export interface ReferralStats {
  total_users: number;
  total_partners: number;
  earned_points: number;
  earned_g2a: number;
}

// =============================================================================
// Сезоны
// =============================================================================

export interface Season {
  id: string;
  name: string;
  days_left: number;
  ends_at: string;
  leaderboard_position?: number;
  points_in_season?: number;
}

// =============================================================================
// Next Actions (Рекомендуемые действия)
// =============================================================================

export interface NextAction {
  id: string;
  title: string;
  description: string;
  module: ModuleType;
  reward: Reward;
  deeplink: string;
}

// =============================================================================
// Dashboard данные
// =============================================================================

export interface DashboardData {
  balances: Balances;
  level: Level;
  season: Season;
  next_actions: NextAction[];
  recent_transactions: Transaction[];
  nearby_achievements?: Achievement[];
}

// =============================================================================
// Wallet данные
// =============================================================================

export interface WalletData {
  balance: Balances;
  transactions: Transaction[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
}

export interface NFTWalletData {
  nft_count: number;
  nfts: NFTBadge[];
  filters?: {
    rarity: NFTRarity[];
    modules: ModuleType[];
  };
}

// =============================================================================
// Levels данные
// =============================================================================

export interface LevelsData {
  level: Level;
  achievements: Achievement[];
  season?: Season;
}

// =============================================================================
// Referrals данные
// =============================================================================

export interface ReferralsData {
  stats: ReferralStats;
  referrals: Referral[];
  referral_link: string;
  referral_qr?: string;
}

// =============================================================================
// Missions данные
// =============================================================================

export interface MissionsData {
  missions: Mission[];
  filters?: {
    modules: ModuleType[];
    types: MissionType[];
    statuses: MissionStatus[];
  };
}

// =============================================================================
// Analytics данные
// =============================================================================

export interface PointsChartData {
  date: string;
  points: number;
}

export interface SourceContribution {
  points: number;
  percentage: number;
}

export interface AnalyticsData {
  period: string;
  points_chart: {
    data: PointsChartData[];
  };
  sources: Record<ModuleType, SourceContribution>;
  referral_contribution: {
    points: number;
    g2a: number;
    percentage_of_total: number;
  };
  season_pulse?: {
    position: number;
    points_in_season: number;
    trend: 'up' | 'down' | 'stable';
    forecast_to_goal?: number;
  };
}

// =============================================================================
// Event Ingest (для будущей интеграции)
// =============================================================================

export interface EventIngestRequest {
  event_type: string;
  module: ModuleType;
  user_id: string;
  metadata: Record<string, unknown>;
  timestamp: string;
}

export interface EventIngestResponse {
  status: 'processed' | 'rejected' | 'pending';
  reward?: Reward;
  transaction_id?: string;
  error?: string;
}

// =============================================================================
// Утилиты для работы с модулями
// =============================================================================

export const MODULE_LABELS: Record<ModuleType, string> = {
  space: 'Space',
  atlas: 'Atlas',
  pulse: 'Pulse',
  rf: 'Russian Friendly',
  quest: 'Quest',
  guru: 'Guru',
};

export const MODULE_ICONS: Record<ModuleType, string> = {
  space: 'Users',
  atlas: 'Map',
  pulse: 'Calendar',
  rf: 'Handshake',
  quest: 'Target',
  guru: 'MapPin',
};

export const NFT_RARITY_COLORS: Record<NFTRarity, string> = {
  common: 'gray',
  rare: 'blue',
  legendary: 'purple',
};

export const NFT_RARITY_LABELS: Record<NFTRarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
};

