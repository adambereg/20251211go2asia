/**
 * Connect Asia - Mock Data
 * Mock данные для разработки UI модуля Connect
 */

import type {
  DashboardData,
  WalletData,
  NFTWalletData,
  LevelsData,
  ReferralsData,
  MissionsData,
  AnalyticsData,
  Transaction,
  Achievement,
  NFTBadge,
  Mission,
  Referral,
  NextAction,
  Season,
  Balances,
  Level,
} from './types';

// =============================================================================
// Балансы
// =============================================================================

export const mockBalances: Balances = {
  points: 3500,
  g2a: 125,
  nft_count: 3,
  nft_legendary_count: 1,
};

// =============================================================================
// Уровень
// =============================================================================

export const mockLevel: Level = {
  current: 12,
  xp: 750,
  next_level_xp: 1000,
  multiplier: 1.2,
  bonuses: [
    {
      type: 'reward_multiplier',
      value: 1.2,
      description: '+20% к наградам',
    },
    {
      type: 'seasonal_access',
      value: true,
      description: 'Доступ к сезонным квестам',
    },
  ],
};

// =============================================================================
// Сезон
// =============================================================================

export const mockSeason: Season = {
  id: 'S3',
  name: 'Summer 2025',
  days_left: 12,
  ends_at: '2025-12-11T00:00:00Z',
  leaderboard_position: 45,
  points_in_season: 2500,
};

// =============================================================================
// Транзакции
// =============================================================================

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'credit',
    amount: 100,
    currency: 'points',
    module: 'space',
    description: 'Пост набрал 100 лайков',
    created_at: '2025-11-29T10:30:00Z',
    tags: ['season', 'social'],
    metadata: {
      post_id: 'post-123',
      likes_count: 100,
    },
  },
  {
    id: 'tx-2',
    type: 'credit',
    amount: 200,
    currency: 'points',
    module: 'atlas',
    description: 'Гайд одобрен редакцией',
    created_at: '2025-11-28T15:20:00Z',
    tags: ['editor_pick'],
    metadata: {
      guide_id: 'guide-456',
    },
  },
  {
    id: 'tx-3',
    type: 'credit',
    amount: 50,
    currency: 'points',
    module: 'quest',
    description: 'Завершён квест "Исследователь Бангкока"',
    created_at: '2025-11-28T09:15:00Z',
    tags: ['quest', 'season'],
    metadata: {
      quest_id: 'quest-789',
    },
  },
  {
    id: 'tx-4',
    type: 'credit',
    amount: 30,
    currency: 'points',
    module: 'rf',
    description: 'Оставлен отзыв о партнёре',
    created_at: '2025-11-27T14:45:00Z',
    tags: ['review'],
    metadata: {
      partner_id: 'partner-1',
      review_id: 'review-123',
    },
  },
  {
    id: 'tx-5',
    type: 'credit',
    amount: 25,
    currency: 'g2a',
    module: 'rf',
    description: 'Онбординг партнёра (PRO)',
    created_at: '2025-11-26T11:30:00Z',
    tags: ['pro', 'onboarding'],
    metadata: {
      partner_id: 'partner-2',
    },
  },
  {
    id: 'tx-6',
    type: 'credit',
    amount: 150,
    currency: 'points',
    module: 'pulse',
    description: 'Отчёт о событии проверен куратором',
    created_at: '2025-11-25T16:20:00Z',
    tags: ['curated'],
    metadata: {
      event_id: 'event-456',
    },
  },
  {
    id: 'tx-7',
    type: 'credit',
    amount: 80,
    currency: 'points',
    module: 'guru',
    description: '10 чек-инов в новой стране',
    created_at: '2025-11-24T10:00:00Z',
    tags: ['milestone'],
    metadata: {
      country: 'Thailand',
      checkins_count: 10,
    },
  },
  {
    id: 'tx-8',
    type: 'credit',
    amount: 200,
    currency: 'points',
    module: 'space',
    description: 'Приглашён друг',
    created_at: '2025-11-23T12:00:00Z',
    tags: ['referral'],
    metadata: {
      referral_id: 'ref-1',
    },
  },
  {
    id: 'tx-9',
    type: 'debit',
    amount: 500,
    currency: 'points',
    module: 'quest',
    description: 'Покупка премиум квеста',
    created_at: '2025-11-22T08:30:00Z',
    tags: ['purchase'],
    metadata: {
      quest_id: 'quest-premium-1',
    },
  },
  {
    id: 'tx-10',
    type: 'credit',
    amount: 300,
    currency: 'points',
    module: 'quest',
    description: 'Завершён премиум квест',
    created_at: '2025-11-21T18:00:00Z',
    tags: ['quest', 'premium'],
    metadata: {
      quest_id: 'quest-premium-1',
    },
  },
];

// =============================================================================
// Достижения
// =============================================================================

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    name: 'Social Butterfly',
    description: 'Получите 1000 лайков на постах',
    progress: 85,
    max_progress: 100,
    status: 'in_progress',
    reward: {
      points: 500,
    },
    hint: 'Опубликуйте ещё 3 поста с 50+ лайками',
    image: '/images/achievements/social-butterfly.png',
    module: 'space',
  },
  {
    id: 'ach-2',
    name: 'Editor\'s Pick',
    description: 'Ваш гайд был выбран редакцией',
    progress: 100,
    max_progress: 100,
    status: 'completed',
    reward: {
      points: 200,
      nft: 'nft-editors-pick',
    },
    image: '/images/achievements/editors-pick.png',
    module: 'atlas',
  },
  {
    id: 'ach-3',
    name: 'Quest Master',
    description: 'Завершите 10 квестов',
    progress: 7,
    max_progress: 10,
    status: 'in_progress',
    reward: {
      points: 1000,
    },
    hint: 'Завершите ещё 3 квеста',
    image: '/images/achievements/quest-master.png',
    module: 'quest',
  },
  {
    id: 'ach-4',
    name: 'RF Ambassador',
    description: 'Оставьте 20 отзывов о партнёрах',
    progress: 15,
    max_progress: 20,
    status: 'in_progress',
    reward: {
      points: 300,
    },
    hint: 'Оставьте ещё 5 отзывов',
    image: '/images/achievements/rf-ambassador.png',
    module: 'rf',
  },
  {
    id: 'ach-5',
    name: 'World Traveler',
    description: 'Посетите 5 стран',
    progress: 3,
    max_progress: 5,
    status: 'in_progress',
    reward: {
      points: 400,
      nft: 'nft-world-traveler',
    },
    hint: 'Посетите ещё 2 страны',
    image: '/images/achievements/world-traveler.png',
    module: 'guru',
  },
];

// =============================================================================
// NFT Бейджи
// =============================================================================

export const mockNFTBadges: NFTBadge[] = [
  {
    id: 'nft-1',
    name: 'Editor\'s Pick',
    description: 'Ваш гайд был выбран редакцией',
    rarity: 'rare',
    image: '/images/nft/editors-pick.png',
    module: 'atlas',
    unlocked_at: '2025-11-15T14:20:00Z',
    conditions: 'Гайд получил 500+ лайков и одобрен редакцией',
    can_upgrade: false,
  },
  {
    id: 'nft-2',
    name: 'Quest Champion',
    description: 'Завершён сезонный квест',
    rarity: 'legendary',
    image: '/images/nft/quest-champion.png',
    module: 'quest',
    unlocked_at: '2025-11-10T10:00:00Z',
    conditions: 'Завершён квест сезона S3',
    can_upgrade: false,
  },
  {
    id: 'nft-3',
    name: 'RF Partner',
    description: 'Приглашён бизнес-партнёр',
    rarity: 'common',
    image: '/images/nft/rf-partner.png',
    module: 'rf',
    unlocked_at: '2025-11-05T12:30:00Z',
    conditions: 'Приглашён партнёр в Russian Friendly',
    can_upgrade: true,
  },
];

// =============================================================================
// Миссии
// =============================================================================

export const mockMissions: Mission[] = [
  {
    id: 'mission-1',
    title: 'Опубликуй пост в Space',
    description: 'Создайте пост с фотографией и получите награду',
    module: 'space',
    type: 'daily',
    reward: {
      points: 50,
    },
    deadline: '2025-11-30T23:59:59Z',
    progress: 0,
    max_progress: 1,
    status: 'new',
    deeplink: '/space/create',
  },
  {
    id: 'mission-2',
    title: 'Заверши квест рядом',
    description: 'Найди и заверши квест в радиусе 5 км',
    module: 'quest',
    type: 'daily',
    reward: {
      points: 100,
    },
    deadline: '2025-11-30T23:59:59Z',
    progress: 0,
    max_progress: 1,
    status: 'new',
    deeplink: '/quest/nearby',
  },
  {
    id: 'mission-3',
    title: 'Опубликуй гайд в Atlas',
    description: 'Создайте гайд о месте в Азии',
    module: 'atlas',
    type: 'weekly',
    reward: {
      points: 200,
    },
    deadline: '2025-12-06T23:59:59Z',
    progress: 0,
    max_progress: 1,
    status: 'new',
    deeplink: '/atlas/create',
  },
  {
    id: 'mission-4',
    title: 'Оставь отзыв в RF',
    description: 'Оставьте отзыв о партнёре Russian Friendly',
    module: 'rf',
    type: 'daily',
    reward: {
      points: 30,
    },
    deadline: '2025-11-30T23:59:59Z',
    progress: 0,
    max_progress: 1,
    status: 'new',
    deeplink: '/rf/merchant/reviews',
  },
  {
    id: 'mission-5',
    title: 'Пригласи друга',
    description: 'Пригласите нового пользователя в Go2Asia',
    module: 'space',
    type: 'weekly',
    reward: {
      points: 200,
    },
    deadline: '2025-12-06T23:59:59Z',
    progress: 0,
    max_progress: 1,
    status: 'new',
    deeplink: '/connect/referrals',
  },
];

// =============================================================================
// Рефералы
// =============================================================================

export const mockReferrals: Referral[] = [
  {
    id: 'ref-1',
    type: 'user',
    name: 'Иван Петров',
    avatar: '/avatars/ivan.jpg',
    status: 'completed_mission',
    earned_rewards: {
      points: 200,
      g2a: 0,
    },
    invited_at: '2025-11-10T12:00:00Z',
    missions_completed: 3,
    missions_total: 5,
  },
  {
    id: 'ref-2',
    type: 'user',
    name: 'Мария Сидорова',
    avatar: '/avatars/maria.jpg',
    status: 'active',
    earned_rewards: {
      points: 100,
      g2a: 0,
    },
    invited_at: '2025-11-15T14:30:00Z',
    missions_completed: 1,
    missions_total: 5,
  },
  {
    id: 'ref-3',
    type: 'partner',
    name: 'Кафе "Русский Дом"',
    avatar: '/partners/cafe-russkiy-dom.jpg',
    status: 'active',
    earned_rewards: {
      points: 0,
      g2a: 25,
    },
    invited_at: '2025-11-20T10:00:00Z',
  },
];

export const mockReferralStats = {
  total_users: 8,
  total_partners: 2,
  earned_points: 1200,
  earned_g2a: 50,
};

// =============================================================================
// Next Actions
// =============================================================================

export const mockNextActions: NextAction[] = [
  {
    id: 'action-1',
    title: 'Заверши квест рядом',
    description: 'Найди и заверши квест в радиусе 5 км',
    module: 'quest',
    reward: {
      points: 50,
    },
    deeplink: '/quest/nearby',
  },
  {
    id: 'action-2',
    title: 'Опубликуй гайд в Atlas',
    description: 'Создайте гайд о месте в Азии',
    module: 'atlas',
    reward: {
      points: 100,
    },
    deeplink: '/atlas/create',
  },
  {
    id: 'action-3',
    title: 'Пригласи друга',
    description: 'Пригласите нового пользователя в Go2Asia',
    module: 'space',
    reward: {
      points: 200,
    },
    deeplink: '/connect/referrals',
  },
  {
    id: 'action-4',
    title: 'Оставь отзыв в RF',
    description: 'Оставьте отзыв о партнёре Russian Friendly',
    module: 'rf',
    reward: {
      points: 30,
    },
    deeplink: '/rf/merchant/reviews',
  },
];

// =============================================================================
// Dashboard Data
// =============================================================================

export const mockDashboardData: DashboardData = {
  balances: mockBalances,
  level: mockLevel,
  season: mockSeason,
  next_actions: mockNextActions,
  recent_transactions: mockTransactions.slice(0, 10),
  nearby_achievements: mockAchievements.slice(0, 3),
};

// =============================================================================
// Wallet Data
// =============================================================================

export const mockWalletData: WalletData = {
  balance: mockBalances,
  transactions: mockTransactions,
  pagination: {
    page: 1,
    per_page: 20,
    total: mockTransactions.length,
    has_more: false,
  },
};

export const mockNFTWalletData: NFTWalletData = {
  nft_count: mockNFTBadges.length,
  nfts: mockNFTBadges,
  filters: {
    rarity: ['common', 'rare', 'legendary'],
    modules: ['space', 'atlas', 'pulse', 'rf', 'quest', 'guru'],
  },
};

// =============================================================================
// Levels Data
// =============================================================================

export const mockLevelsData: LevelsData = {
  level: mockLevel,
  achievements: mockAchievements,
  season: mockSeason,
};

// =============================================================================
// Referrals Data
// =============================================================================

export const mockReferralsData: ReferralsData = {
  stats: mockReferralStats,
  referrals: mockReferrals,
  referral_link: 'https://go2asia.com/invite/abc123',
  referral_qr: '/qr/invite-abc123.png',
};

// =============================================================================
// Missions Data
// =============================================================================

export const mockMissionsData: MissionsData = {
  missions: mockMissions,
  filters: {
    modules: ['space', 'atlas', 'pulse', 'rf', 'quest', 'guru'],
    types: ['daily', 'weekly', 'seasonal'],
    statuses: ['new', 'in_progress', 'completed', 'expired'],
  },
};

// =============================================================================
// Analytics Data
// =============================================================================

export const mockAnalyticsData: AnalyticsData = {
  period: '30d',
  points_chart: {
    data: [
      { date: '2025-11-01', points: 120 },
      { date: '2025-11-02', points: 150 },
      { date: '2025-11-03', points: 200 },
      { date: '2025-11-04', points: 180 },
      { date: '2025-11-05', points: 250 },
      { date: '2025-11-06', points: 300 },
      { date: '2025-11-07', points: 280 },
      { date: '2025-11-08', points: 320 },
      { date: '2025-11-09', points: 350 },
      { date: '2025-11-10', points: 400 },
      { date: '2025-11-11', points: 380 },
      { date: '2025-11-12', points: 420 },
      { date: '2025-11-13', points: 450 },
      { date: '2025-11-14', points: 500 },
      { date: '2025-11-15', points: 480 },
      { date: '2025-11-16', points: 520 },
      { date: '2025-11-17', points: 550 },
      { date: '2025-11-18', points: 600 },
      { date: '2025-11-19', points: 580 },
      { date: '2025-11-20', points: 620 },
      { date: '2025-11-21', points: 650 },
      { date: '2025-11-22', points: 700 },
      { date: '2025-11-23', points: 680 },
      { date: '2025-11-24', points: 720 },
      { date: '2025-11-25', points: 750 },
      { date: '2025-11-26', points: 800 },
      { date: '2025-11-27', points: 780 },
      { date: '2025-11-28', points: 820 },
      { date: '2025-11-29', points: 850 },
    ],
  },
  sources: {
    space: {
      points: 1200,
      percentage: 35,
    },
    atlas: {
      points: 800,
      percentage: 23,
    },
    quest: {
      points: 600,
      percentage: 18,
    },
    rf: {
      points: 400,
      percentage: 12,
    },
    pulse: {
      points: 300,
      percentage: 9,
    },
    guru: {
      points: 200,
      percentage: 3,
    },
  },
  referral_contribution: {
    points: 500,
    g2a: 25,
    percentage_of_total: 15,
  },
  season_pulse: {
    position: 45,
    points_in_season: 2500,
    trend: 'up',
    forecast_to_goal: 7,
  },
};

