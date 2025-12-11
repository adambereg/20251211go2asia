/**
 * Guru Asia - Types
 * Типы для модуля интерактивного гида "рядом со мной"
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Координаты (широта, долгота) */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Позиция пользователя с точностью */
export interface UserPosition extends Coordinates {
  accuracy?: number; // Погрешность в метрах
  timestamp?: number;
}

// =============================================================================
// Типы объектов
// =============================================================================

/** Тип объекта Guru */
export type GuruObjectType = 'place' | 'event' | 'housing' | 'person' | 'quest';

/** Базовый интерфейс для всех объектов */
export interface GuruObjectBase {
  id: string;
  type: GuruObjectType;
  title: string;
  description?: string;
  cover?: string; // URL обложки
  lat: number;
  lng: number;
  address?: string;
  city?: string;
  
  // Метаданные
  rating?: number; // 0-5
  popularity?: number; // Количество лайков/сейвов
  updatedAt?: string; // ISO date
  
  // Бейджи
  isRF?: boolean; // Russian Friendly
  isVerified?: boolean;
}

/** Место (Atlas) */
export interface PlaceObject extends GuruObjectBase {
  type: 'place';
  
  // Категории и атрибуты
  categories: string[];
  priceLevel?: 1 | 2 | 3; // $, $$, $$$
  
  // Часы работы
  isOpen?: boolean;
  openingHours?: string; // "09:00 – 22:00"
  opensAt?: string;
  closesAt?: string;
  
  // Удобства
  hasWifi?: boolean;
  hasPowerOutlets?: boolean;
  hasCoffee?: boolean;
  isQuiet?: boolean;
  isKidFriendly?: boolean;
}

/** Событие (Pulse) */
export interface EventObject extends GuruObjectBase {
  type: 'event';
  
  // Время
  startDate: string; // ISO date
  endDate?: string;
  isHappeningNow?: boolean;
  
  // Категории
  categories: string[];
  
  // Организатор
  organizer?: string;
  organizerId?: string;
  
  // Цена
  isFree?: boolean;
  price?: string;
}

/** Жильё (AIRent NSK) */
export interface HousingObject extends GuruObjectBase {
  type: 'housing';
  
  // Тип жилья
  housingType: 'apartment' | 'room' | 'hostel' | 'hotel';
  
  // Цена
  pricePerNight: number; // RUB
  priceLevel: 1 | 2 | 3; // $, $$, $$$
  
  // Доступность
  availableNow?: boolean;
  availableFrom?: string;
  
  // Параметры
  rooms?: number;
  area?: number; // кв.м
}

/** Человек/PRO (Space) */
export interface PersonObject extends GuruObjectBase {
  type: 'person';
  
  // Профиль
  displayName: string;
  avatar?: string;
  bio?: string;
  
  // PRO статус
  isPRO?: boolean;
  
  // Роли
  isMentor?: boolean;
  isGuide?: boolean;
  
  // Доступность
  isAvailableNow?: boolean;
  availableUntil?: string;
}

/** Квест (Quest Asia) */
export interface QuestObject extends GuruObjectBase {
  type: 'quest';
  
  // Параметры
  level: 'beginner' | 'advanced' | 'expert';
  duration: number; // минуты
  checkpointsCount: number;
  
  // Награды
  hasRewards?: boolean;
  rewards?: string; // "50 Points + NFT badge"
  
  // Статус
  isNew?: boolean;
  isTrending?: boolean;
}

/** Объединённый тип объекта */
export type GuruObject = PlaceObject | EventObject | HousingObject | PersonObject | QuestObject;

// =============================================================================
// Фильтры
// =============================================================================

/** Временной фильтр */
export type TimeFilter = 'all' | 'now' | 'today' | 'weekend';

/** Режим сортировки */
export type SortMode = 'proximity' | 'now' | 'popular';

/** Радиус в метрах */
export type RadiusOption = 600 | 800 | 1000 | 1200;

/** Фильтры Guru */
export interface GuruFilters {
  // Поиск
  searchQuery: string;
  
  // Радиус
  radius: RadiusOption;
  
  // Типы объектов
  types: GuruObjectType[];
  
  // Время
  time: TimeFilter;
  
  // Атрибуты мест
  placeAttrs: {
    wifi?: boolean;
    powerOutlets?: boolean;
    coffee?: boolean;
    quiet?: boolean;
    kidFriendly?: boolean;
    rfPartner?: boolean;
  };
  
  // Атрибуты жилья
  housingAttrs: {
    priceLevel?: 1 | 2 | 3;
    availableNow?: boolean;
  };
  
  // Атрибуты людей
  personAttrs: {
    isMentor?: boolean;
    isGuide?: boolean;
    availableNow?: boolean;
  };
  
  // Атрибуты квестов
  questAttrs: {
    level?: 'beginner' | 'advanced' | 'expert';
    duration?: 15 | 30 | 60;
    hasRewards?: boolean;
  };
  
  // Сортировка
  sortMode: SortMode;
}

/** Фильтры по умолчанию */
export const DEFAULT_FILTERS: GuruFilters = {
  searchQuery: '',
  radius: 1000,
  types: ['place', 'event', 'housing', 'person', 'quest'],
  time: 'all',
  placeAttrs: {},
  housingAttrs: {},
  personAttrs: {},
  questAttrs: {},
  sortMode: 'proximity',
};

// =============================================================================
// UI типы
// =============================================================================

/** Объект с вычисленным расстоянием */
export type GuruObjectWithDistance = GuruObject & {
  distance: number; // метры
  walkingTime: number; // минуты (примерно 80м/мин)
  score?: number; // ранжирование
};

/** Цвета маркеров по типу */
export const MARKER_COLORS: Record<GuruObjectType, string> = {
  place: '#06B6D4',    // Cyan
  event: '#A855F7',    // Purple
  housing: '#10B981',  // Green
  person: '#F97316',   // Orange
  quest: '#F59E0B',    // Amber
};

/** Иконки по типу */
export const OBJECT_TYPE_ICONS: Record<GuruObjectType, string> = {
  place: 'MapPin',
  event: 'Calendar',
  housing: 'Home',
  person: 'User',
  quest: 'Trophy',
};

/** Названия типов (русские) */
export const OBJECT_TYPE_LABELS: Record<GuruObjectType, string> = {
  place: 'Место',
  event: 'Событие',
  housing: 'Жильё',
  person: 'Человек',
  quest: 'Квест',
};

/** Опции радиуса */
export const RADIUS_OPTIONS: { value: RadiusOption; label: string }[] = [
  { value: 600, label: '600м (~8 мин)' },
  { value: 800, label: '800м (~10 мин)' },
  { value: 1000, label: '1км (~13 мин)' },
  { value: 1200, label: '1.2км (~15 мин)' },
];

/** Опции сортировки */
export const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: 'proximity', label: 'Ближе' },
  { value: 'now', label: 'Сейчас' },
  { value: 'popular', label: 'Топ' },
];

// =============================================================================
// Type Guards
// =============================================================================

export function isPlaceObject(obj: GuruObject): obj is PlaceObject {
  return obj.type === 'place';
}

export function isEventObject(obj: GuruObject): obj is EventObject {
  return obj.type === 'event';
}

export function isHousingObject(obj: GuruObject): obj is HousingObject {
  return obj.type === 'housing';
}

export function isPersonObject(obj: GuruObject): obj is PersonObject {
  return obj.type === 'person';
}

export function isQuestObject(obj: GuruObject): obj is QuestObject {
  return obj.type === 'quest';
}

