/**
 * Russian Friendly Asia - Types
 * Типы для модуля партнёрской программы Go2Asia
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Координаты (широта, долгота) */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Категория партнёра */
export type PartnerCategory =
  | 'cafe'
  | 'restaurant'
  | 'coworking'
  | 'market'
  | 'service'
  | 'housing'
  | 'shop'
  | 'other';

/** Тип ваучера */
export type VoucherType = 'discount_percent' | 'discount_fixed' | 'gift' | 'combo';

/** Статус ваучера */
export type VoucherStatus = 'active' | 'redeemed' | 'expired' | 'pending';

/** Статус проверки партнёра */
export type VerificationStatus = 'not_verified' | 'verified' | 'pending';

/** Средний чек */
export type AverageCheck = '$' | '$$' | '$$$';

// =============================================================================
// Партнёр (Partner)
// =============================================================================

export interface Partner {
  id: string;
  name: string;
  category: PartnerCategory;
  description: string;
  coverImage: string;
  gallery: string[];
  address: {
    country: string;
    city: string;
    district?: string;
    fullAddress: string;
    coordinates?: Coordinates;
  };
  attributes: {
    wifi: boolean;
    outlets: boolean;
    kidFriendly: boolean;
    averageCheck: AverageCheck;
    languages: string[];
    paymentMethods: ('card' | 'cash' | 'crypto')[];
  };
  hours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  contact: {
    phone?: string;
    email?: string;
    telegram?: string;
    whatsapp?: string;
    website?: string;
  };
  rfStatus: {
    verified: boolean;
    verifiedBy?: string; // PRO ID
    verifiedAt?: string;
    checklist: RFChecklistItem[];
  };
  stats: {
    views: number;
    saves: number;
    vouchersReceived: number;
    vouchersRedeemed: number;
    rating: number;
    reviewsCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

/** Элемент чек-листа Russian Friendly */
export interface RFChecklistItem {
  id: string;
  category: 'basic' | 'additional';
  requirement: string;
  status: boolean; // Упрощённый: true/false вместо Meets/Partially/Needs Update
}

/** Стандарт Russian Friendly */
export interface RFStandard {
  partnerId: string;
  checklist: RFChecklistItem[];
  verifiedBy?: string; // PRO ID
  verifiedAt?: string;
  progress: number; // 0-100
}

// =============================================================================
// Ваучер (Voucher)
// =============================================================================

export interface Voucher {
  id: string;
  partnerId: string;
  partner: Partner;
  type: VoucherType;
  value: number; // процент или сумма
  title: string;
  description: string;
  conditions: string;
  limits: {
    total?: number; // общий лимит
    perUser?: number; // лимит на пользователя
    minCheck?: number; // минимальная сумма чека
  };
  period: {
    start: string;
    end: string;
  };
  restrictions?: {
    vipOnly?: boolean;
    proOnly?: boolean;
  };
  stats: {
    received: number;
    redeemed: number;
    remaining: number;
  };
  createdAt: string;
  expiresAt: string;
}

/** Активированный ваучер пользователя */
export interface UserVoucher {
  id: string;
  voucherId: string;
  voucher: Voucher;
  userId: string;
  code: string; // QR-код или код для погашения
  status: VoucherStatus;
  activatedAt: string;
  redeemedAt?: string;
  expiresAt: string;
}

// =============================================================================
// Отзыв (Review)
// =============================================================================

export interface Review {
  id: string;
  partnerId: string;
  author: {
    id: string;
    displayName: string;
    avatar?: string;
    role?: 'spacer' | 'vip' | 'pro';
  };
  rating: number; // 1-5
  text: string;
  photos?: string[];
  verifiedPurchase: boolean;
  reply?: {
    text: string;
    author: string; // Merchant name
    createdAt: string;
  };
  createdAt: string;
}

// =============================================================================
// Бизнес-партнёр (Merchant)
// =============================================================================

export interface Merchant {
  id: string;
  partnerId: string;
  partner: Partner;
  userId: string;
  role: 'owner' | 'manager';
  createdAt: string;
}

// =============================================================================
// PRO-куратор (PRO Curator)
// =============================================================================

export interface PROCurator {
  id: string;
  userId: string;
  partners: string[]; // IDs партнёров
  stats: {
    totalPartners: number;
    verifiedThisMonth: number;
    totalRewards: number; // Points
    g2aBalance: number;
  };
  createdAt: string;
}

/** Транзакция вознаграждения PRO */
export interface PRORewardTransaction {
  id: string;
  curatorId: string;
  type: 'onboarding' | 'verification' | 'partner_activity';
  partnerId?: string;
  amount: number; // Points или G2A
  currency: 'points' | 'g2a';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// =============================================================================
// Онбординг (Onboarding)
// =============================================================================

export interface OnboardingApplication {
  id: string;
  businessName: string;
  category: PartnerCategory;
  contact: {
    email: string;
    phone?: string;
    name: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  invitedBy?: string; // PRO ID
  createdAt: string;
}

// =============================================================================
// Проверка (Verification)
// =============================================================================

export interface Verification {
  id: string;
  partnerId: string;
  curatorId: string;
  checklist: RFChecklistItem[];
  notes?: string;
  photos?: string[]; // Placeholder для будущего
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  completedAt?: string;
}

// =============================================================================
// Константы
// =============================================================================

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, string> = {
  cafe: 'Кафе',
  restaurant: 'Ресторан',
  coworking: 'Коворкинг',
  market: 'Магазин',
  service: 'Сервис',
  housing: 'Жильё',
  shop: 'Магазин',
  other: 'Другое',
};

export const VOUCHER_TYPE_LABELS: Record<VoucherType, string> = {
  discount_percent: 'Скидка %',
  discount_fixed: 'Фиксированная скидка',
  gift: 'Подарок',
  combo: 'Комбо',
};

export const VOUCHER_STATUS_LABELS: Record<VoucherStatus, string> = {
  active: 'Активен',
  redeemed: 'Использован',
  expired: 'Истёк',
  pending: 'Ожидает активации',
};

