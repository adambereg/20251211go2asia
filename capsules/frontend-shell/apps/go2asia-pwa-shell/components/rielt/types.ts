/**
 * Rielt.Market Asia - Types
 * Типы для модуля поиска и аренды жилья
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Координаты (широта, долгота) */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Адрес */
export interface Address {
  country: string;      // Из Atlas
  city: string;         // Из Atlas
  district?: string;    // Район из Atlas
  street?: string;
  building?: string;
  coordinates: Coordinates;
}

// =============================================================================
// Типы жилья и аренды
// =============================================================================

/** Тип жилья */
export type ListingType = 
  | 'apartment' 
  | 'house' 
  | 'studio' 
  | 'room' 
  | 'coliving';

/** Тип аренды */
export type RentalType = 'short-term' | 'long-term';

// =============================================================================
// Удобства и правила
// =============================================================================

/** Удобства */
export interface Amenities {
  wifi?: boolean;
  workspace?: boolean;
  kitchen?: boolean;
  washingMachine?: boolean;
  parking?: boolean;
  childFriendly?: boolean;
  petsAllowed?: boolean;
  pool?: boolean;
  ac?: boolean;
  balcony?: boolean;
  gym?: boolean;
  security?: boolean;
  elevator?: boolean;
  // ... другие
}

/** Правила */
export interface HouseRules {
  smoking?: boolean;
  pets?: boolean;
  parties?: boolean;
  deposit?: number;        // Залог
  prepayment?: number;     // Предоплата
  minStay?: number;        // Минимальный срок (дни)
  maxStay?: number;        // Максимальный срок (дни)
  checkIn?: string;        // Время заезда "14:00"
  checkOut?: string;       // Время выезда "11:00"
}

// =============================================================================
// Цена и доступность
// =============================================================================

/** Цена */
export interface Pricing {
  perNight?: number;        // Для краткосрока
  perMonth?: number;        // Для долгосрока
  currency: string;         // 'USD', 'RUB', 'THB', etc.
  deposit?: number;         // Залог
  cleaningFee?: number;     // Плата за уборку
  serviceFee?: number;     // Сервисный сбор платформы
}

/** Доступность (для краткосрока) */
export interface Availability {
  calendar: Record<string, boolean>;  // Дата -> доступно/занято
  instantBooking?: boolean;            // Мгновенное бронирование
  advanceBooking?: number;             // За сколько дней можно бронировать
}

/** Условия долгосрока */
export interface LongTermConditions {
  minMonths: number;       // Минимум месяцев
  maxMonths?: number;       // Максимум месяцев
  deposit?: number;         // Залог
  utilities?: 'included' | 'separate';  // Коммунальные включены/отдельно
}

// =============================================================================
// RF и PRO
// =============================================================================

/** PRO-проверка */
export interface PROVerification {
  verified: boolean;
  verifiedBy?: string;     // ID PRO-куратора
  verifiedAt?: string;     // ISO date
  checklist?: {
    photosMatch: boolean;      // Фото соответствуют реальности
    condition: boolean;        // Состояние соответствует описанию
    description: boolean;      // Описание точное
    noise: boolean;            // Уровень шума приемлемый
    internet: boolean;         // Интернет работает
  };
  notes?: string;          // Дополнительные заметки PRO
}

/** RF-ваучер */
export interface RFVoucher {
  id: string;
  title: string;
  description: string;
  discount?: number;       // Скидка в %
  discountAmount?: number; // Фиксированная скидка
  conditions: string;      // Условия использования
  validFrom: string;      // ISO date
  validUntil: string;     // ISO date
  usageLimit?: number;     // Лимит использований
  usedCount?: number;      // Сколько раз использовано
}

// =============================================================================
// Владелец и отзывы
// =============================================================================

/** Владелец/Агент */
export interface Owner {
  id: string;
  name: string;
  avatar?: string;
  isRFPartner?: boolean;   // RF-партнёр
  isPRO?: boolean;         // PRO-куратор
  rating?: number;         // Рейтинг владельца
  responseTime?: string;   // "В течение часа"
  joinedAt?: string;       // ISO date
}

/** Отзыв */
export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;          // 1-5
  text: string;
  photos?: string[];        // Фото от гостя
  verifiedBooking?: boolean; // Проверенная бронь
  curatorVerified?: boolean; // Проверено куратором
  createdAt: string;       // ISO date
}

// =============================================================================
// Основной тип объявления
// =============================================================================

/** Объявление о жилье */
export interface Listing {
  id: string;
  
  // Основная информация
  title: string;
  description: string;
  type: ListingType;
  rentalType: RentalType;
  
  // Локация
  address: Address;
  
  // Фото
  photos: string[];        // Массив URL
  coverPhoto?: string;     // Обложка
  
  // Параметры
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  area?: number;            // кв.м
  maxGuests: number;
  
  // Цена
  pricing: Pricing;
  
  // Удобства и правила
  amenities: Amenities;
  houseRules: HouseRules;
  
  // Доступность
  availability?: Availability;           // Для краткосрока
  longTermConditions?: LongTermConditions; // Для долгосрока
  
  // Владелец
  owner: Owner;
  
  // Бейджи и статусы
  isRF?: boolean;                          // Russian Friendly
  rfVoucher?: RFVoucher;                    // RF-ваучер
  proVerification?: PROVerification;       // PRO-проверка
  isNew?: boolean;                         // Новое объявление
  isInstant?: boolean;                     // Мгновенное бронирование
  
  // Метаданные
  rating?: number;                         // Средний рейтинг
  reviewsCount?: number;                   // Количество отзывов
  viewsCount?: number;                     // Просмотры
  savesCount?: number;                     // Сохранения
  createdAt: string;                       // ISO date
  updatedAt: string;                       // ISO date
  
  // Статус модерации
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

// =============================================================================
// Фильтры поиска
// =============================================================================

/** Фильтры поиска */
export interface SearchFilters {
  // Локация
  location?: {
    country?: string;
    city?: string;
    district?: string;
    radius?: number;        // км от точки
    coordinates?: Coordinates;
  };
  
  // Даты (для краткосрока)
  checkIn?: string;         // ISO date
  checkOut?: string;        // ISO date
  
  // Гости
  guests?: number;
  
  // Тип аренды
  rentalType?: RentalType;
  
  // Тип жилья
  types?: ListingType[];
  
  // Цена
  priceRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  
  // Удобства
  amenities?: Partial<Amenities>;
  
  // Правила
  rules?: Partial<HouseRules>;
  
  // Доступность
  availableToday?: boolean;
  availableThisWeek?: boolean;
  instantBooking?: boolean;
  
  // Надёжность
  onlyRF?: boolean;
  onlyPROVerified?: boolean;
  
  // Долгосрок
  minMonths?: number;      // Минимум месяцев для долгосрока
  
  // Сортировка
  sortBy?: 'recommended' | 'price-asc' | 'price-desc' | 'distance' | 'newest' | 'rating';
}

/** Фильтры по умолчанию */
export const DEFAULT_FILTERS: SearchFilters = {
  rentalType: 'short-term',
  types: ['apartment', 'house', 'studio', 'room', 'coliving'],
  sortBy: 'recommended',
};

// =============================================================================
// UI типы
// =============================================================================

/** Объявление с вычисленным расстоянием */
export type ListingWithDistance = Listing & {
  distance?: number;        // метры
  walkingTime?: number;    // минуты
};

/** Цвета маркеров по типу жилья */
export const MARKER_COLORS: Record<ListingType, string> = {
  apartment: '#10B981',    // Green
  house: '#059669',        // Emerald-600
  studio: '#34D399',       // Emerald-400
  room: '#6EE7B7',         // Emerald-300
  coliving: '#A7F3D0',     // Emerald-200
};

/** Названия типов жилья (русские) */
export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  apartment: 'Апартаменты',
  house: 'Дом',
  studio: 'Студия',
  room: 'Комната',
  coliving: 'Co-living',
};

/** Опции сортировки */
export const SORT_OPTIONS: { value: SearchFilters['sortBy']; label: string }[] = [
  { value: 'recommended', label: 'Рекомендуемые' },
  { value: 'price-asc', label: 'Дешевле' },
  { value: 'price-desc', label: 'Дороже' },
  { value: 'distance', label: 'Ближе' },
  { value: 'newest', label: 'Новые' },
  { value: 'rating', label: 'Рейтинг' },
];

