/**
 * Quest Asia - Types
 * Типы для модуля геймификации (квесты и задания)
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Координаты (широта, долгота) */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Тип квеста */
export type QuestType = 'route' | 'checkin' | 'content' | 'event';

/** Сложность квеста */
export type QuestDifficulty = 'easy' | 'medium' | 'hard';

/** Статус прохождения квеста */
export type QuestStatus = 'active' | 'completed' | 'paused' | 'abandoned';

/** Тип шага квеста */
export type StepType =
  | 'geo-checkin'
  | 'qr-code'
  | 'quiz'
  | 'photo'
  | 'video'
  | 'pulse-event'
  | 'task';

/** Редкость NFT-бейджа */
export type NFTBadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

/** Категория NFT-бейджа */
export type NFTBadgeCategory =
  | 'temple'
  | 'food'
  | 'nightlife'
  | 'culture'
  | 'adventure'
  | 'seasonal';

/** Лучшее время суток для квеста */
export type BestTime = 'morning' | 'afternoon' | 'evening' | 'night';

// =============================================================================
// Бейджи и награды
// =============================================================================

/** Бейдж квеста */
export interface QuestBadge {
  type: 'rf' | 'offline' | 'season' | 'family' | 'night';
  label: string;
}

/** NFT-бейдж */
export interface NFTBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: NFTBadgeRarity;
  category: NFTBadgeCategory;
  season?: string;
  requirements: {
    questsCompleted?: number;
    pointsRequired?: number;
    specificQuests?: string[];
  };
}

/** Награды квеста */
export interface QuestRewards {
  points: number;
  nftBadges: NFTBadge[];
  conditions?: {
    minCheckpoints?: number;
    seasonDeadline?: Date;
  };
}

// =============================================================================
// Шаги квеста
// =============================================================================

/** Вопрос квиза */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Индекс правильного ответа
  hint?: string;
}

/** Медиа-файл */
export interface MediaFile {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail?: string;
  metadata?: {
    exif?: {
      dateTime?: string;
      coordinates?: Coordinates;
    };
  };
}

/** Шаг квеста */
export interface QuestStep {
  id: string;
  order: number;
  type: StepType;
  title: string;
  description: string;
  hint?: string;

  // Для geo-checkin
  placeId?: string; // ID места из Atlas
  coordinates?: Coordinates;
  radius?: number; // метры

  // Для qr-code
  qrCode?: string;
  code?: string; // Альтернативный код для ввода

  // Для quiz
  questions?: QuizQuestion[];

  // Для photo/video
  mediaType?: 'photo' | 'video';
  minMediaCount?: number;
  moderationRequired?: boolean;

  // Для pulse-event
  eventId?: string; // ID события из Pulse

  // Для task
  taskDescription?: string;
  confirmationMethod?: 'check' | 'code' | 'photo';

  // Награды за шаг
  rewards: {
    points: number;
    multiplier?: number; // Множитель за скорость/без подсказок
  };

  // Валидация
  validation: {
    skipAllowed: boolean;
    skipPenalty: number; // Очки, которые теряются при пропуске
  };
}

// =============================================================================
// Сезон
// =============================================================================

/** Сезон квестов */
export interface QuestSeason {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  theme?: string;
}

// =============================================================================
// Квест
// =============================================================================

/** Квест */
export interface Quest {
  id: string;
  title: string;
  description: string;
  coverPhoto: string;
  type: QuestType;
  duration: number; // минуты
  difficulty: QuestDifficulty;
  city: string;
  district?: string;
  country: string;
  badges: QuestBadge[];
  rewards: QuestRewards;
  steps: QuestStep[];
  startPoint: {
    placeId?: string; // ID места из Atlas
    coordinates: Coordinates;
    address: string;
  };
  bestTime?: BestTime;
  preparation?: string[];
  season?: QuestSeason;
  offlineAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Статистика
  stats?: {
    completions: number;
    averageRating?: number;
    averageTime?: number; // минуты
  };
}

// =============================================================================
// Прогресс прохождения
// =============================================================================

/** Результат шага */
export interface StepResult {
  stepId: string;
  completed: boolean;
  completedAt: Date;
  method: 'geo' | 'qr' | 'quiz' | 'photo' | 'video' | 'pulse' | 'task';
  data: {
    coordinates?: Coordinates;
    qrCode?: string;
    answers?: string[];
    media?: MediaFile[];
    eventId?: string;
    confirmation?: string;
  };
  points: number;
  synced: boolean;
}

/** Ожидающее действие для синхронизации */
export interface PendingAction {
  id: string;
  type: 'step-completion' | 'media-upload' | 'quest-completion';
  questId: string;
  stepId?: string;
  data: any;
  createdAt: Date;
  retries: number;
}

/** Прогресс прохождения квеста */
export interface QuestProgress {
  questId: string;
  userId: string;
  status: QuestStatus;
  currentStep: number;
  completedSteps: string[]; // ID завершённых шагов
  startedAt: Date;
  completedAt?: Date;
  pausedAt?: Date;
  offlineData: {
    cached: boolean;
    lastSyncAt?: Date;
    pendingActions: PendingAction[];
  };
  stepResults: {
    [stepId: string]: StepResult;
  };
}

// =============================================================================
// Фильтры и сортировка
// =============================================================================

/** Фильтры квестов */
export interface QuestFilters {
  city?: string;
  district?: string;
  duration?: {
    min?: number;
    max?: number;
  };
  type?: QuestType[];
  difficulty?: QuestDifficulty[];
  rfBonus?: boolean;
  offlineAvailable?: boolean;
  season?: string;
}

/** Режим сортировки */
export type SortMode = 'relevance' | 'newest' | 'popular' | 'duration' | 'difficulty';

// =============================================================================
// Лидерборд
// =============================================================================

/** Запись лидерборда */
export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  points: number;
  questsCompleted: number;
  rank: number;
  isVIP?: boolean;
  isPRO?: boolean;
  badges: NFTBadge[];
}

/** Фильтры лидерборда */
export interface LeaderboardFilters {
  city?: string;
  period?: 'week' | 'month' | 'season' | 'all-time';
  season?: string;
  vipOnly?: boolean;
  proOnly?: boolean;
}

// =============================================================================
// Утилиты
// =============================================================================

/** Цвета маркеров для типов квестов */
export const QUEST_TYPE_COLORS: Record<QuestType, string> = {
  route: '#10B981', // Green
  checkin: '#3B82F6', // Blue
  content: '#8B5CF6', // Purple
  event: '#F59E0B', // Amber
};

/** Цвета для сложности */
export const DIFFICULTY_COLORS: Record<QuestDifficulty, string> = {
  easy: '#10B981', // Green
  medium: '#F59E0B', // Amber
  hard: '#EF4444', // Red
};

/** Метки типов квестов */
export const QUEST_TYPE_LABELS: Record<QuestType, string> = {
  route: 'Маршрут',
  checkin: 'Чек-ин',
  content: 'Контент',
  event: 'Событие',
};

/** Метки сложности */
export const DIFFICULTY_LABELS: Record<QuestDifficulty, string> = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Хард',
};

/** Метки типов шагов */
export const STEP_TYPE_LABELS: Record<StepType, string> = {
  'geo-checkin': 'Гео-чек-ин',
  'qr-code': 'QR-код',
  'quiz': 'Квиз',
  'photo': 'Фото',
  'video': 'Видео',
  'pulse-event': 'Событие',
  'task': 'Задача',
};

