/**
 * Russian Friendly Asia - Mock Data
 * Демо-данные для разработки и демонстрации (MVP)
 */

import type {
  Partner,
  Voucher,
  Review,
  RFStandard,
  UserVoucher,
  PROCurator,
  PRORewardTransaction,
  OnboardingApplication,
  Verification,
  PartnerCategory,
  VoucherType,
} from './types';

// =============================================================================
// Партнёры (Partners)
// =============================================================================

export const mockPartners: Partner[] = [
  {
    id: 'partner-1',
    name: 'Кафе "Русский Дом"',
    category: 'cafe',
    description:
      'Уютное кафе с русской кухней в центре Бангкока. Готовим борщ, пельмени, блины. Есть Wi-Fi и розетки для работы.',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    ],
    address: {
      country: 'Таиланд',
      city: 'Бангкок',
      district: 'Силом',
      fullAddress: '123 Sukhumvit Road, Silom, Bangkok 10500',
      coordinates: { lat: 13.7306, lng: 100.5361 },
    },
    attributes: {
      wifi: true,
      outlets: true,
      kidFriendly: true,
      averageCheck: '$$',
      languages: ['Русский', 'Английский', 'Тайский'],
      paymentMethods: ['card', 'cash'],
    },
    hours: {
      monday: { open: '09:00', close: '22:00' },
      tuesday: { open: '09:00', close: '22:00' },
      wednesday: { open: '09:00', close: '22:00' },
      thursday: { open: '09:00', close: '22:00' },
      friday: { open: '09:00', close: '23:00' },
      saturday: { open: '10:00', close: '23:00' },
      sunday: { open: '10:00', close: '22:00' },
    },
    contact: {
      phone: '+66 2 123 4567',
      email: 'info@russkiydom.com',
      telegram: '@russkiydom',
      whatsapp: '+66 2 123 4567',
      website: 'https://russkiydom.com',
    },
    rfStatus: {
      verified: true,
      verifiedBy: 'pro-curator-1',
      verifiedAt: '2024-10-15T10:00:00Z',
      checklist: [
        { id: '1', category: 'basic', requirement: 'Меню на русском или английском', status: true },
        { id: '2', category: 'basic', requirement: 'Контакт в мессенджере', status: true },
        { id: '3', category: 'basic', requirement: 'Принимает карту или наличные', status: true },
        { id: '4', category: 'additional', requirement: 'Русскоговорящий сотрудник', status: true },
        { id: '5', category: 'additional', requirement: 'Детское меню', status: true },
        { id: '6', category: 'additional', requirement: 'Стабильный Wi-Fi', status: true },
        { id: '7', category: 'additional', requirement: 'Розетки для зарядки', status: true },
      ],
    },
    stats: {
      views: 1245,
      saves: 89,
      vouchersReceived: 234,
      vouchersRedeemed: 156,
      rating: 4.8,
      reviewsCount: 67,
    },
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z',
  },
  {
    id: 'partner-2',
    name: 'Коворкинг "WorkSpace Asia"',
    category: 'coworking',
    description:
      'Современный коворкинг с быстрым интернетом, удобными рабочими местами и русскоязычной поддержкой.',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    ],
    address: {
      country: 'Таиланд',
      city: 'Пхукет',
      district: 'Ката',
      fullAddress: '45 Kata Road, Kata Beach, Phuket 83100',
      coordinates: { lat: 7.8804, lng: 98.3923 },
    },
    attributes: {
      wifi: true,
      outlets: true,
      kidFriendly: false,
      averageCheck: '$$',
      languages: ['Русский', 'Английский'],
      paymentMethods: ['card', 'crypto'],
    },
    hours: {
      monday: { open: '08:00', close: '20:00' },
      tuesday: { open: '08:00', close: '20:00' },
      wednesday: { open: '08:00', close: '20:00' },
      thursday: { open: '08:00', close: '20:00' },
      friday: { open: '08:00', close: '20:00' },
      saturday: { open: '09:00', close: '18:00' },
      sunday: { open: '09:00', close: '18:00', closed: true },
    },
    contact: {
      phone: '+66 76 234 5678',
      email: 'hello@workspaceasia.com',
      telegram: '@workspaceasia',
      website: 'https://workspaceasia.com',
    },
    rfStatus: {
      verified: true,
      verifiedBy: 'pro-curator-1',
      verifiedAt: '2024-09-20T12:00:00Z',
      checklist: [
        { id: '1', category: 'basic', requirement: 'Меню на русском или английском', status: true },
        { id: '2', category: 'basic', requirement: 'Контакт в мессенджере', status: true },
        { id: '3', category: 'basic', requirement: 'Принимает карту или наличные', status: true },
        { id: '4', category: 'additional', requirement: 'Русскоговорящий сотрудник', status: true },
        { id: '5', category: 'additional', requirement: 'Стабильный Wi-Fi', status: true },
        { id: '6', category: 'additional', requirement: 'Розетки для зарядки', status: true },
      ],
    },
    stats: {
      views: 892,
      saves: 45,
      vouchersReceived: 123,
      vouchersRedeemed: 89,
      rating: 4.6,
      reviewsCount: 34,
    },
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2024-11-18T09:15:00Z',
  },
  {
    id: 'partner-3',
    name: 'Ресторан "Сибирь"',
    category: 'restaurant',
    description:
      'Аутентичная русская кухня в Хошимине. Пельмени, борщ, шашлык. Есть детское меню и игровая зона.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    ],
    address: {
      country: 'Вьетнам',
      city: 'Хошимин',
      district: 'Район 1',
      fullAddress: '78 Nguyen Hue Street, District 1, Ho Chi Minh City',
      coordinates: { lat: 10.7769, lng: 106.7009 },
    },
    attributes: {
      wifi: true,
      outlets: false,
      kidFriendly: true,
      averageCheck: '$$$',
      languages: ['Русский', 'Вьетнамский', 'Английский'],
      paymentMethods: ['card', 'cash'],
    },
    hours: {
      monday: { open: '11:00', close: '23:00' },
      tuesday: { open: '11:00', close: '23:00' },
      wednesday: { open: '11:00', close: '23:00' },
      thursday: { open: '11:00', close: '23:00' },
      friday: { open: '11:00', close: '00:00' },
      saturday: { open: '11:00', close: '00:00' },
      sunday: { open: '11:00', close: '23:00' },
    },
    contact: {
      phone: '+84 28 3456 7890',
      email: 'info@sibir-restaurant.com',
      telegram: '@sibir_restaurant',
    },
    rfStatus: {
      verified: false,
      checklist: [
        { id: '1', category: 'basic', requirement: 'Меню на русском или английском', status: true },
        { id: '2', category: 'basic', requirement: 'Контакт в мессенджере', status: true },
        { id: '3', category: 'basic', requirement: 'Принимает карту или наличные', status: true },
        { id: '4', category: 'additional', requirement: 'Русскоговорящий сотрудник', status: false },
        { id: '5', category: 'additional', requirement: 'Детское меню', status: true },
        { id: '6', category: 'additional', requirement: 'Стабильный Wi-Fi', status: true },
      ],
    },
    stats: {
      views: 567,
      saves: 23,
      vouchersReceived: 45,
      vouchersRedeemed: 28,
      rating: 4.4,
      reviewsCount: 19,
    },
    createdAt: '2024-10-01T08:00:00Z',
    updatedAt: '2024-11-15T16:20:00Z',
  },
  {
    id: 'partner-4',
    name: 'Магазин "Русские Товары"',
    category: 'market',
    description: 'Магазин русских продуктов в Бали. Крупы, консервы, сладости, напитки.',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    gallery: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'],
    address: {
      country: 'Индонезия',
      city: 'Бали',
      district: 'Семиньяк',
      fullAddress: '12 Jalan Raya Seminyak, Seminyak, Bali 80361',
      coordinates: { lat: -8.6841, lng: 115.1702 },
    },
    attributes: {
      wifi: false,
      outlets: false,
      kidFriendly: true,
      averageCheck: '$',
      languages: ['Русский', 'Индонезийский'],
      paymentMethods: ['cash'],
    },
    hours: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '19:00' },
      sunday: { open: '09:00', close: '19:00', closed: true },
    },
    contact: {
      phone: '+62 361 234 567',
      telegram: '@russkie_tovary',
    },
    rfStatus: {
      verified: false,
      checklist: [
        { id: '1', category: 'basic', requirement: 'Меню на русском или английском', status: true },
        { id: '2', category: 'basic', requirement: 'Контакт в мессенджере', status: true },
        { id: '3', category: 'basic', requirement: 'Принимает карту или наличные', status: false },
      ],
    },
    stats: {
      views: 234,
      saves: 12,
      vouchersReceived: 8,
      vouchersRedeemed: 5,
      rating: 4.2,
      reviewsCount: 8,
    },
    createdAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-11-10T12:00:00Z',
  },
];

// =============================================================================
// Ваучеры (Vouchers)
// =============================================================================

export const mockVouchers: Voucher[] = [
  {
    id: 'voucher-1',
    partnerId: 'partner-1',
    partner: mockPartners[0],
    type: 'discount_percent',
    value: 15,
    title: 'Скидка 15% на весь заказ',
    description: 'Получите скидку 15% на любой заказ в кафе "Русский Дом"',
    conditions: 'Минимальная сумма заказа 500 бат. Действует до конца месяца.',
    limits: {
      total: 100,
      perUser: 1,
      minCheck: 500,
    },
    period: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-11-30T23:59:59Z',
    },
    stats: {
      received: 67,
      redeemed: 45,
      remaining: 33,
    },
    createdAt: '2025-10-25T10:00:00Z',
    expiresAt: '2025-11-30T23:59:59Z',
  },
  {
    id: 'voucher-2',
    partnerId: 'partner-2',
    partner: mockPartners[1],
    type: 'discount_fixed',
    value: 200,
    title: 'Скидка 200 бат на дневной абонемент',
    description: 'Скидка 200 бат при покупке дневного абонемента в коворкинге',
    conditions: 'Только для новых клиентов. Действует до конца года.',
    limits: {
      total: 50,
      perUser: 1,
    },
    period: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-12-31T23:59:59Z',
    },
    stats: {
      received: 23,
      redeemed: 15,
      remaining: 27,
    },
    createdAt: '2025-10-20T08:00:00Z',
    expiresAt: '2025-12-31T23:59:59Z',
  },
  {
    id: 'voucher-3',
    partnerId: 'partner-1',
    partner: mockPartners[0],
    type: 'gift',
    value: 0,
    title: 'Бесплатный десерт при заказе от 800 бат',
    description: 'Получите бесплатный десерт на выбор при заказе от 800 бат',
    conditions: 'Один десерт на заказ. Не суммируется с другими акциями.',
    limits: {
      total: 200,
      perUser: 2,
      minCheck: 800,
    },
    period: {
      start: '2025-11-15T00:00:00Z',
      end: '2025-12-15T23:59:59Z',
    },
    stats: {
      received: 89,
      redeemed: 56,
      remaining: 111,
    },
    createdAt: '2025-11-10T12:00:00Z',
    expiresAt: '2025-12-15T23:59:59Z',
  },
  {
    id: 'voucher-4',
    partnerId: 'partner-3',
    partner: mockPartners[2],
    type: 'discount_percent',
    value: 20,
    title: 'Скидка 20% на ужин',
    description: 'Специальное предложение: скидка 20% на весь заказ в ресторане "Сибирь"',
    conditions: 'Действует с 18:00 до 22:00. Минимальная сумма заказа 1000 бат.',
    limits: {
      total: 80,
      perUser: 1,
      minCheck: 1000,
    },
    period: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-12-31T23:59:59Z',
    },
    stats: {
      received: 45,
      redeemed: 28,
      remaining: 37,
    },
    createdAt: '2025-10-28T14:00:00Z',
    expiresAt: '2025-12-31T23:59:59Z',
  },
  {
    id: 'voucher-5',
    partnerId: 'partner-3',
    partner: mockPartners[2],
    type: 'gift',
    value: 0,
    title: 'Бесплатный детский обед',
    description: 'При заказе двух взрослых обедов получите детский обед бесплатно',
    conditions: 'Только для детей до 12 лет. Не суммируется с другими акциями.',
    limits: {
      total: 100,
      perUser: 2,
      minCheck: 800,
    },
    period: {
      start: '2025-11-20T00:00:00Z',
      end: '2026-01-20T23:59:59Z',
    },
    stats: {
      received: 32,
      redeemed: 18,
      remaining: 68,
    },
    createdAt: '2025-11-15T10:00:00Z',
    expiresAt: '2026-01-20T23:59:59Z',
  },
  {
    id: 'voucher-6',
    partnerId: 'partner-4',
    partner: mockPartners[3],
    type: 'discount_fixed',
    value: 100,
    title: 'Скидка 100 бат на покупку от 500 бат',
    description: 'Скидка 100 бат при покупке товаров на сумму от 500 бат в магазине "Русские Товары"',
    conditions: 'Минимальная сумма покупки 500 бат. Действует до конца месяца.',
    limits: {
      total: 150,
      perUser: 3,
      minCheck: 500,
    },
    period: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-11-30T23:59:59Z',
    },
    stats: {
      received: 67,
      redeemed: 42,
      remaining: 83,
    },
    createdAt: '2025-10-25T09:00:00Z',
    expiresAt: '2025-11-30T23:59:59Z',
  },
  {
    id: 'voucher-7',
    partnerId: 'partner-2',
    partner: mockPartners[1],
    type: 'discount_percent',
    value: 25,
    title: 'Скидка 25% на недельный абонемент',
    description: 'Специальная скидка 25% на недельный абонемент в коворкинге WorkSpace Asia',
    conditions: 'Только для новых клиентов. Действует до конца года.',
    limits: {
      total: 30,
      perUser: 1,
    },
    period: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-12-31T23:59:59Z',
    },
    stats: {
      received: 18,
      redeemed: 12,
      remaining: 12,
    },
    createdAt: '2025-10-30T11:00:00Z',
    expiresAt: '2025-12-31T23:59:59Z',
  },
  {
    id: 'voucher-8',
    partnerId: 'partner-1',
    partner: mockPartners[0],
    type: 'combo',
    value: 0,
    title: 'Комбо: борщ + пельмени со скидкой',
    description: 'Специальное комбо: борщ и порция пельменей всего за 350 бат вместо 450 бат',
    conditions: 'Одно комбо на заказ. Не суммируется с другими акциями.',
    limits: {
      total: 200,
      perUser: 2,
    },
    period: {
      start: '2025-11-15T00:00:00Z',
      end: '2025-12-31T23:59:59Z',
    },
    stats: {
      received: 124,
      redeemed: 89,
      remaining: 76,
    },
    createdAt: '2025-11-12T08:00:00Z',
    expiresAt: '2025-12-31T23:59:59Z',
  },
];

// =============================================================================
// Отзывы (Reviews)
// =============================================================================

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    partnerId: 'partner-1',
    author: {
      id: 'user-1',
      displayName: 'Марина Тайская',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      role: 'pro',
    },
    rating: 5,
    text: 'Отличное место! Борщ как дома, персонал говорит по-русски. Wi-Fi быстрый, можно работать.',
    photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'],
    verifiedPurchase: true,
    createdAt: '2024-11-15T14:30:00Z',
  },
  {
    id: 'review-2',
    partnerId: 'partner-1',
    author: {
      id: 'user-2',
      displayName: 'Алексей Номад',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      role: 'vip',
    },
    rating: 4,
    text: 'Хорошее кафе, но цены немного высокие. Пельмени вкусные, рекомендую.',
    verifiedPurchase: true,
    reply: {
      text: 'Спасибо за отзыв! Рады, что вам понравилось. Будем рады видеть вас снова!',
      author: 'Кафе "Русский Дом"',
      createdAt: '2024-11-16T09:00:00Z',
    },
    createdAt: '2024-11-14T18:20:00Z',
  },
  {
    id: 'review-3',
    partnerId: 'partner-2',
    author: {
      id: 'user-3',
      displayName: 'Катя с Бали',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      role: 'spacer',
    },
    rating: 5,
    text: 'Лучший коворкинг на Пхукете! Интернет супер быстрый, места удобные, есть кухня.',
    verifiedPurchase: true,
    createdAt: '2024-11-12T10:15:00Z',
  },
];

// =============================================================================
// PRO-кураторы (PRO Curators)
// =============================================================================

export const mockPROCurator: PROCurator = {
  id: 'pro-curator-1',
  userId: 'user-pro-1',
  partners: ['partner-1', 'partner-2'],
  stats: {
    totalPartners: 2,
    verifiedThisMonth: 1,
    totalRewards: 5000,
    g2aBalance: 1200,
  },
  createdAt: '2024-08-01T08:00:00Z',
};

// =============================================================================
// Транзакции вознаграждений PRO
// =============================================================================

export const mockPRORewardTransactions: PRORewardTransaction[] = [
  {
    id: 'tx-1',
    curatorId: 'pro-curator-1',
    type: 'onboarding',
    partnerId: 'partner-1',
    amount: 1000,
    currency: 'points',
    status: 'completed',
    createdAt: '2024-09-01T10:00:00Z',
  },
  {
    id: 'tx-2',
    curatorId: 'pro-curator-1',
    type: 'verification',
    partnerId: 'partner-1',
    amount: 500,
    currency: 'points',
    status: 'completed',
    createdAt: '2024-10-15T12:00:00Z',
  },
  {
    id: 'tx-3',
    curatorId: 'pro-curator-1',
    type: 'partner_activity',
    partnerId: 'partner-1',
    amount: 200,
    currency: 'points',
    status: 'completed',
    createdAt: '2024-11-01T08:00:00Z',
  },
];

// =============================================================================
// Заявки на онбординг
// =============================================================================

export const mockOnboardingApplications: OnboardingApplication[] = [
  {
    id: 'app-1',
    businessName: 'Кафе "Москва"',
    category: 'cafe',
    contact: {
      email: 'info@moscow-cafe.com',
      phone: '+66 2 987 6543',
      name: 'Иван Петров',
    },
    status: 'pending',
    invitedBy: 'pro-curator-1',
    createdAt: '2024-11-20T09:00:00Z',
  },
];

// =============================================================================
// Проверки (Verifications)
// =============================================================================

export const mockVerifications: Verification[] = [
  {
    id: 'ver-1',
    partnerId: 'partner-1',
    curatorId: 'pro-curator-1',
    checklist: mockPartners[0].rfStatus.checklist,
    notes: 'Отличное заведение, соответствует всем требованиям RF стандарта.',
    status: 'approved',
    createdAt: '2024-10-10T10:00:00Z',
    completedAt: '2024-10-15T14:00:00Z',
  },
];

// Экспорт текущего пользователя (для демо)
export const currentUser = {
  id: 'current-user',
  role: 'spacer' as const,
};

