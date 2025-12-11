/**
 * Space Asia - Mock Data
 * Демо-данные для разработки и демонстрации
 */

import type {
  User,
  Post,
  Group,
  Conversation,
  Message,
  Notification,
  NFTBadge,
  Save,
  DashboardStats,
  QuickAction,
  Recommendation,
  ActivityItem,
  Transaction,
  Quest,
  Voucher,
  WeeklyGoal,
} from './types';

// =============================================================================
// Пользователи
// =============================================================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'marina_thai',
    displayName: 'Марина Тайская',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    bio: 'Живу в Бангкоке 3 года. Делюсь опытом переезда и жизни в Таиланде 🌴',
    city: 'Бангкок',
    role: 'pro',
    verified: true,
    level: 12,
    points: 15420,
    interests: ['путешествия', 'еда', 'культура', 'визы'],
    followersCount: 2340,
    followingCount: 156,
    postsCount: 89,
    isFollowing: false,
    isFriend: false,
    showNearby: true,
    createdAt: '2022-03-15T10:00:00Z',
  },
  {
    id: 'user-2',
    username: 'alex_nomad',
    displayName: 'Алексей Номад',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    bio: 'Digital nomad | Бали → Вьетнам → Таиланд',
    city: 'Хошимин',
    role: 'vip',
    verified: false,
    level: 7,
    points: 4560,
    interests: ['коворкинги', 'IT', 'серфинг'],
    followersCount: 890,
    followingCount: 234,
    postsCount: 45,
    isFollowing: true,
    isFriend: true,
    createdAt: '2023-01-20T14:30:00Z',
  },
  {
    id: 'user-3',
    username: 'katya_bali',
    displayName: 'Катя с Бали',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    bio: 'Йога-инструктор на Бали 🧘‍♀️ Веду ретриты',
    city: 'Убуд',
    role: 'spacer',
    verified: false,
    level: 4,
    points: 1230,
    interests: ['йога', 'здоровье', 'духовность'],
    followersCount: 456,
    followingCount: 123,
    postsCount: 28,
    isFollowing: false,
    isFriend: false,
    createdAt: '2023-06-10T09:15:00Z',
  },
];

export const currentUser: User = {
  id: 'current-user',
  username: 'traveler_ru',
  displayName: 'Путешественник',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  bio: 'Исследую Азию',
  city: 'Пхукет',
  role: 'vip',
  verified: false,
  level: 5,
  points: 2100,
  interests: ['пляжи', 'еда', 'дайвинг'],
  followersCount: 234,
  followingCount: 189,
  postsCount: 15,
  createdAt: '2023-09-01T12:00:00Z',
};

// =============================================================================
// NFT Бейджи
// =============================================================================

export const mockBadges: NFTBadge[] = [
  {
    id: 'badge-1',
    name: 'Первопроходец',
    image: '🏆',
    description: 'Один из первых 1000 пользователей',
    rarity: 'legendary',
    earnedAt: '2022-03-15T10:00:00Z',
  },
  {
    id: 'badge-2',
    name: 'Гуру Таиланда',
    image: '🇹🇭',
    description: 'Опубликовано 50+ постов о Таиланде',
    rarity: 'epic',
    earnedAt: '2023-06-20T14:30:00Z',
  },
  {
    id: 'badge-3',
    name: 'Квестер',
    image: '🎯',
    description: 'Пройдено 10 квестов',
    rarity: 'rare',
    earnedAt: '2024-01-15T16:45:00Z',
  },
];

// =============================================================================
// Посты
// =============================================================================

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: mockUsers[0],
    type: 'text',
    privacy: 'public',
    content:
      'Нашла потрясающее кафе в Бангкоке с видом на храм! Кофе отличный, цены демократичные. Рекомендую для работы — быстрый WiFi и кондиционер 🥤☕',
    media: [
      {
        id: 'media-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
      },
    ],
    tags: ['бангкок', 'кафе', 'коворкинг'],
    location: {
      name: 'Wat Arun Area, Bangkok',
      coordinates: { lat: 13.7439, lng: 100.4883 },
    },
    likesCount: 124,
    commentsCount: 18,
    sharesCount: 5,
    savesCount: 32,
    isLiked: false,
    isSaved: true,
    createdAt: '2024-11-26T14:30:00Z',
    updatedAt: '2024-11-26T14:30:00Z',
  },
  {
    id: 'post-2',
    author: mockUsers[1],
    type: 'poll',
    privacy: 'public',
    content: 'Планирую переезд в новую страну. Куда бы вы посоветовали?',
    poll: {
      id: 'poll-1',
      question: 'Лучшая страна для digital nomad в 2024?',
      options: [
        { id: 'opt-1', text: 'Таиланд', votes: 145 },
        { id: 'opt-2', text: 'Вьетнам', votes: 89 },
        { id: 'opt-3', text: 'Индонезия (Бали)', votes: 112 },
        { id: 'opt-4', text: 'Малайзия', votes: 34 },
      ],
      totalVotes: 380,
      userVote: 'opt-1',
    },
    tags: ['опрос', 'nomad', 'переезд'],
    likesCount: 89,
    commentsCount: 45,
    sharesCount: 12,
    savesCount: 8,
    isLiked: true,
    isSaved: false,
    createdAt: '2024-11-25T10:15:00Z',
    updatedAt: '2024-11-25T10:15:00Z',
  },
  {
    id: 'post-3',
    author: mockUsers[2],
    type: 'place-report',
    privacy: 'public',
    content:
      'Была в этом спа-центре — просто восторг! Настоящий балийский массаж, уютная атмосфера. Цена за 2 часа — 500k IDR (~$32). Очень рекомендую!',
    media: [
      {
        id: 'media-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
      },
      {
        id: 'media-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
      },
    ],
    attachments: {
      type: 'place',
      place: {
        id: 'place-1',
        name: 'Karsa Spa Ubud',
        address: 'Jl. Bangkiang Sidem, Ubud, Bali',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
        rating: 4.8,
      },
    },
    tags: ['бали', 'спа', 'массаж', 'отзыв'],
    location: {
      name: 'Ubud, Bali',
      coordinates: { lat: -8.5069, lng: 115.2625 },
    },
    likesCount: 67,
    commentsCount: 12,
    sharesCount: 8,
    savesCount: 45,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-24T16:45:00Z',
    updatedAt: '2024-11-24T16:45:00Z',
  },
  {
    id: 'post-4',
    author: mockUsers[0],
    type: 'event-report',
    privacy: 'public',
    content:
      'Вчера была на Loy Krathong — это просто магия! Тысячи фонариков над рекой, музыка, танцы. Обязательно приезжайте в ноябре!',
    media: [
      {
        id: 'media-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1602442787305-decbd65be507?w=800',
        thumbnail: 'https://images.unsplash.com/photo-1602442787305-decbd65be507?w=400',
      },
    ],
    attachments: {
      type: 'event',
      event: {
        id: 'event-1',
        title: 'Loy Krathong Festival 2024',
        date: '2024-11-15T18:00:00Z',
        location: 'Chiang Mai, Thailand',
        image: 'https://images.unsplash.com/photo-1602442787305-decbd65be507?w=400',
      },
    },
    tags: ['таиланд', 'фестиваль', 'loykrathong'],
    likesCount: 234,
    commentsCount: 28,
    sharesCount: 45,
    savesCount: 89,
    isLiked: true,
    isSaved: true,
    isNominated: true,
    nominatedTo: 'pulse',
    createdAt: '2024-11-16T09:00:00Z',
    updatedAt: '2024-11-16T09:00:00Z',
  },
  {
    id: 'post-5',
    author: mockUsers[1],
    type: 'quest-report',
    privacy: 'public',
    content:
      'Прошёл квест "Храмы Бангкока"! 5 храмов за день, 15км пешком, но оно того стоило. Получил 500 Points и NFT бейдж 🏆',
    attachments: {
      type: 'quest',
      quest: {
        id: 'quest-1',
        title: 'Храмы Бангкока',
        description: 'Посетите 5 главных храмов столицы',
        image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
        points: 500,
      },
    },
    tags: ['квест', 'бангкок', 'храмы'],
    likesCount: 156,
    commentsCount: 22,
    sharesCount: 18,
    savesCount: 34,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-20T11:30:00Z',
    updatedAt: '2024-11-20T11:30:00Z',
  },
  {
    id: 'post-6',
    author: mockUsers[0],
    type: 'text',
    privacy: 'friends',
    content:
      'Друзья, кто знает хорошего стоматолога в Бангкоке? Нужна консультация по имплантам. Желательно с русскоязычным персоналом 🦷',
    tags: ['бангкок', 'медицина', 'вопрос'],
    likesCount: 12,
    commentsCount: 8,
    sharesCount: 0,
    savesCount: 2,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-27T08:00:00Z',
    updatedAt: '2024-11-27T08:00:00Z',
  },
];

// =============================================================================
// Группы
// =============================================================================

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Русские в Таиланде',
    slug: 'russians-thailand',
    description:
      'Сообщество русскоязычных в Таиланде. Делимся опытом, помогаем друг другу, организуем встречи.',
    cover: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200',
    avatar: '🇹🇭',
    privacy: 'public',
    membersCount: 12450,
    postsCount: 3456,
    admins: [mockUsers[0]],
    moderators: [mockUsers[1]],
    tags: ['таиланд', 'экспаты', 'сообщество'],
    rules: [
      'Уважайте друг друга',
      'Без политики',
      'Спам = бан',
      'Реклама только в специальных постах',
    ],
    isMember: true,
    isAdmin: false,
    isModerator: false,
    createdAt: '2020-05-10T10:00:00Z',
  },
  {
    id: 'group-2',
    name: 'Digital Nomads Asia',
    slug: 'digital-nomads-asia',
    description:
      'Для тех, кто работает удалённо из Азии. Коворкинги, визы, банки, налоги.',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    avatar: '💻',
    privacy: 'public',
    membersCount: 8920,
    postsCount: 2134,
    admins: [mockUsers[1]],
    moderators: [],
    tags: ['nomad', 'удалёнка', 'коворкинг'],
    isMember: true,
    isAdmin: false,
    isModerator: false,
    createdAt: '2021-02-15T14:30:00Z',
  },
  {
    id: 'group-3',
    name: 'Бали Йога Retreat',
    slug: 'bali-yoga-retreat',
    description: 'Йога, медитация, ретриты на Бали. Расписание классов, отзывы, рекомендации.',
    cover: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200',
    avatar: '🧘',
    privacy: 'closed',
    membersCount: 2340,
    postsCount: 567,
    admins: [mockUsers[2]],
    moderators: [],
    tags: ['бали', 'йога', 'медитация'],
    isMember: false,
    isAdmin: false,
    isModerator: false,
    createdAt: '2022-08-20T09:00:00Z',
  },
];

// =============================================================================
// Сообщения (DM)
// =============================================================================

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-2',
    content: 'Привет! Видел твой пост про кафе. Можешь скинуть адрес?',
    isRead: true,
    createdAt: '2024-11-26T15:00:00Z',
  },
  {
    id: 'msg-2',
    senderId: 'current-user',
    content: 'Привет! Да, конечно. Это на Charoenkrung Road, рядом с пристанью Tha Tien',
    isRead: true,
    createdAt: '2024-11-26T15:05:00Z',
  },
  {
    id: 'msg-3',
    senderId: 'user-2',
    content: 'Спасибо! Обязательно загляну',
    isRead: false,
    createdAt: '2024-11-26T15:10:00Z',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participants: [currentUser, mockUsers[1]],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    updatedAt: '2024-11-26T15:10:00Z',
  },
  {
    id: 'conv-2',
    participants: [currentUser, mockUsers[0]],
    lastMessage: {
      id: 'msg-4',
      senderId: 'user-1',
      content: 'Будешь на встрече в субботу?',
      isRead: true,
      createdAt: '2024-11-25T18:30:00Z',
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    updatedAt: '2024-11-25T18:30:00Z',
  },
];

// =============================================================================
// Уведомления
// =============================================================================

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'like',
    actor: mockUsers[0],
    target: {
      type: 'post',
      id: 'post-1',
      preview: 'Нашла потрясающее кафе в Бангкоке...',
    },
    isRead: false,
    createdAt: '2024-11-27T10:00:00Z',
  },
  {
    id: 'notif-2',
    type: 'comment',
    actor: mockUsers[1],
    target: {
      type: 'post',
      id: 'post-1',
      preview: 'Отличное место! Был там на прошлой неделе',
    },
    isRead: false,
    createdAt: '2024-11-27T09:30:00Z',
  },
  {
    id: 'notif-3',
    type: 'follow',
    actor: mockUsers[2],
    isRead: true,
    createdAt: '2024-11-26T16:00:00Z',
  },
  {
    id: 'notif-4',
    type: 'points',
    actor: mockUsers[0], // system, но используем для примера
    data: {
      points: 50,
    },
    isRead: true,
    createdAt: '2024-11-26T12:00:00Z',
  },
  {
    id: 'notif-5',
    type: 'level_up',
    actor: mockUsers[0], // system
    data: {
      level: 5,
    },
    isRead: true,
    createdAt: '2024-11-25T10:00:00Z',
  },
];

// =============================================================================
// Сохранённое
// =============================================================================

export const mockSaves: Save[] = [
  {
    id: 'save-1',
    userId: 'current-user',
    type: 'post',
    targetId: 'post-1',
    title: 'Кафе с видом на храм в Бангкоке',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    createdAt: '2024-11-26T14:35:00Z',
  },
  {
    id: 'save-2',
    userId: 'current-user',
    type: 'place',
    targetId: 'place-1',
    title: 'Karsa Spa Ubud',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    description: 'Спа-центр в Убуде',
    createdAt: '2024-11-24T17:00:00Z',
  },
  {
    id: 'save-3',
    userId: 'current-user',
    type: 'event',
    targetId: 'event-1',
    title: 'Loy Krathong Festival 2024',
    image: 'https://images.unsplash.com/photo-1602442787305-decbd65be507?w=400',
    createdAt: '2024-11-16T09:05:00Z',
  },
];

// =============================================================================
// Dashboard данные
// =============================================================================

export const mockDashboardStats: DashboardStats = {
  points: 2100,
  g2aBalance: 0,
  weeklyDelta: 450,
  level: 5,
  levelProgress: 65,
  postsCount: 15,
  draftsCount: 3,
  savedCount: 12,
  guidesCount: 2,
  weeklyPointsEarned: 650,
  weeklyPointsSpent: 200,
};

export const mockQuickActions: QuickAction[] = [
  {
    id: 'create-post',
    label: 'Создать пост',
    icon: 'Edit',
    href: '/space/community/feed?compose=true',
    color: 'blue',
  },
  {
    id: 'create-guide',
    label: 'Создать гайд',
    icon: 'BookOpen',
    href: '/atlas/guides/new',
    color: 'blue',
  },
  {
    id: 'invite-friend',
    label: 'Пригласить друга',
    icon: 'UserPlus',
    href: '/space/referrals',
    color: 'orange',
    badge: 'Бонус',
  },
  {
    id: 'start-quest',
    label: 'Начать квест',
    icon: 'Trophy',
    href: '/space/quests',
    color: 'purple',
  },
  {
    id: 'get-voucher',
    label: 'Оформить ваучер',
    icon: 'Ticket',
    href: '/space/vouchers',
    color: 'green',
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'quest',
    title: 'Храмы Бангкока',
    description: 'Посетите 5 главных храмов столицы',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
    href: '/space/quests/quest-1',
    points: 500,
  },
  {
    id: 'rec-2',
    type: 'voucher',
    title: 'Скидка 10% в кафе',
    description: 'Действует до конца месяца',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    href: '/space/vouchers/voucher-1',
    points: 200,
  },
  {
    id: 'rec-3',
    type: 'event',
    title: 'Loy Krathong Festival',
    description: 'Фестиваль фонариков в Чиангмае',
    image: 'https://images.unsplash.com/photo-1602442787305-decbd65be507?w=400',
    href: '/pulse/events/event-1',
  },
  {
    id: 'rec-4',
    type: 'place',
    title: 'Karsa Spa Ubud',
    description: 'Рекомендуется рядом с вами',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    href: '/atlas/places/place-1',
  },
];

export const mockActivityItems: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'like',
    actor: mockUsers[0],
    target: {
      type: 'post',
      id: 'post-1',
      preview: 'Нашла потрясающее кафе в Бангкоке...',
    },
    createdAt: '2024-11-27T10:00:00Z',
  },
  {
    id: 'act-2',
    type: 'comment',
    actor: mockUsers[1],
    target: {
      type: 'post',
      id: 'post-1',
      preview: 'Отличное место! Был там на прошлой неделе',
    },
    createdAt: '2024-11-27T09:30:00Z',
  },
  {
    id: 'act-3',
    type: 'follow',
    actor: mockUsers[2],
    createdAt: '2024-11-26T16:00:00Z',
  },
  {
    id: 'act-4',
    type: 'points',
    data: {
      points: 50,
    },
    createdAt: '2024-11-26T12:00:00Z',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    type: 'earn',
    amount: 50,
    currency: 'points',
    description: 'Лайк на вашем посте',
    relatedId: 'post-1',
    createdAt: '2024-11-27T10:00:00Z',
  },
  {
    id: 'txn-2',
    type: 'quest',
    amount: 500,
    currency: 'points',
    description: 'Завершён квест "Храмы Бангкока"',
    relatedId: 'quest-1',
    createdAt: '2024-11-26T14:00:00Z',
  },
  {
    id: 'txn-3',
    type: 'spend',
    amount: 200,
    currency: 'points',
    description: 'Покупка ваучера "Скидка 10% в кафе"',
    relatedId: 'voucher-1',
    createdAt: '2024-11-25T16:00:00Z',
  },
  {
    id: 'txn-4',
    type: 'referral',
    amount: 100,
    currency: 'points',
    description: 'Реферальный бонус',
    relatedId: 'referral-1',
    createdAt: '2024-11-24T10:00:00Z',
  },
];

export const mockQuests: Quest[] = [
  {
    id: 'quest-1',
    title: 'Храмы Бангкока',
    description: 'Посетите 5 главных храмов столицы',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
    points: 500,
    difficulty: 'medium',
    category: 'культура',
    status: 'completed',
    progress: 100,
    completedAt: '2024-11-26T14:00:00Z',
  },
  {
    id: 'quest-2',
    title: 'Пляжи Пхукета',
    description: 'Посетите 3 лучших пляжа острова',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    points: 300,
    difficulty: 'easy',
    category: 'отдых',
    status: 'active',
    progress: 66,
  },
  {
    id: 'quest-3',
    title: 'Уличная еда Бангкока',
    description: 'Попробуйте 10 блюд уличной еды',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    points: 400,
    difficulty: 'medium',
    category: 'еда',
    status: 'available',
  },
];

export const mockVouchers: Voucher[] = [
  {
    id: 'voucher-1',
    title: 'Скидка 10% в кафе',
    description: 'Действует до конца месяца',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400',
    discount: '10%',
    pointsCost: 200,
    expiresAt: '2024-12-31T23:59:59Z',
    isAvailable: true,
  },
  {
    id: 'voucher-2',
    title: '500 THB в спа-центре',
    description: 'Скидка на массаж',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400',
    discount: '500 THB',
    pointsCost: 500,
    expiresAt: '2024-12-15T23:59:59Z',
    isAvailable: true,
  },
];

// =============================================================================
// Weekly Goals (Достижения недели)
// =============================================================================

export const mockWeeklyGoals: WeeklyGoal[] = [
  {
    id: 'goal-1',
    title: 'Пройти 1 квест',
    icon: '🗺️',
    target: 1,
    current: 0,
    type: 'quest',
    pointsReward: 100,
  },
  {
    id: 'goal-2',
    title: 'Посетить новое место в Atlas',
    icon: '📍',
    target: 1,
    current: 0,
    type: 'place',
    pointsReward: 50,
  },
  {
    id: 'goal-3',
    title: 'Написать 1 гайд',
    icon: '✍️',
    target: 1,
    current: 0,
    type: 'guide',
    pointsReward: 200,
  },
  {
    id: 'goal-4',
    title: 'Пригласить 1 друга',
    icon: '👤',
    target: 1,
    current: 0,
    type: 'referral',
    pointsReward: 150,
  },
];

// =============================================================================
// Дополнительные mock-данные для страниц
// =============================================================================

// Черновики постов
export const mockDrafts: Post[] = [
  {
    id: 'draft-1',
    author: currentUser,
    type: 'text',
    privacy: 'public',
    content: 'Хочу поделиться опытом переезда в Таиланд...',
    tags: ['переезд', 'таиланд'],
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    savesCount: 0,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-27T10:00:00Z',
    updatedAt: '2024-11-27T10:00:00Z',
  },
  {
    id: 'draft-2',
    author: currentUser,
    type: 'place-report',
    privacy: 'public',
    content: 'Отличное место для работы в Бангкоке...',
    tags: ['коворкинг', 'бангкок'],
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    savesCount: 0,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-26T15:00:00Z',
    updatedAt: '2024-11-26T15:00:00Z',
  },
  {
    id: 'draft-3',
    author: currentUser,
    type: 'guide',
    privacy: 'public',
    content: 'Как получить визу в Таиланд: полный гайд...',
    tags: ['виза', 'таиланд', 'гайд'],
    likesCount: 0,
    commentsCount: 0,
    sharesCount: 0,
    savesCount: 0,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-11-25T12:00:00Z',
    updatedAt: '2024-11-25T12:00:00Z',
  },
];

// Дополнительные квесты
export const mockQuestsExtended: Quest[] = [
  ...mockQuests,
  {
    id: 'quest-4',
    title: 'Ночные рынки Бангкока',
    description: 'Посетите 3 ночных рынка',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be4c8f?w=400',
    points: 350,
    difficulty: 'easy',
    category: 'еда',
    status: 'available',
  },
  {
    id: 'quest-5',
    title: 'Водопады Пхукета',
    description: 'Посетите 2 водопада на острове',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    points: 250,
    difficulty: 'easy',
    category: 'природа',
    status: 'available',
  },
];

// Дополнительные ваучеры
export const mockVouchersExtended: Voucher[] = [
  ...mockVouchers,
  {
    id: 'voucher-3',
    title: 'Скидка 15% на экскурсию',
    description: 'На любую экскурсию по Бангкоку',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400',
    discount: '15%',
    pointsCost: 300,
    expiresAt: '2024-12-20T23:59:59Z',
    isAvailable: true,
  },
  {
    id: 'voucher-4',
    title: 'Бесплатный коктейль',
    description: 'В баре на пляже',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    discount: '1 шт',
    pointsCost: 150,
    expiresAt: '2024-12-10T23:59:59Z',
    isAvailable: true,
  },
];

// Дополнительные транзакции
export const mockTransactionsExtended: Transaction[] = [
  ...mockTransactions,
  {
    id: 'txn-5',
    type: 'earn',
    amount: 25,
    currency: 'points',
    description: 'Комментарий на вашем посте',
    relatedId: 'post-1',
    createdAt: '2024-11-23T14:00:00Z',
  },
  {
    id: 'txn-6',
    type: 'bonus',
    amount: 100,
    currency: 'points',
    description: 'Еженедельный бонус за активность',
    createdAt: '2024-11-22T10:00:00Z',
  },
  {
    id: 'txn-7',
    type: 'spend',
    amount: 150,
    currency: 'points',
    description: 'Покупка ваучера "Бесплатный коктейль"',
    relatedId: 'voucher-4',
    createdAt: '2024-11-21T18:00:00Z',
  },
];

// Дополнительные NFT бейджи
export const mockBadgesExtended: NFTBadge[] = [
  ...mockBadges,
  {
    id: 'badge-4',
    name: 'Исследователь',
    description: 'Посетил 20+ мест в Atlas',
    image: '🗺️',
    rarity: 'rare',
    earnedAt: '2024-10-15T12:00:00Z',
  },
  {
    id: 'badge-5',
    name: 'Социальный',
    image: '👥',
    description: '100+ подписчиков',
    rarity: 'common',
    earnedAt: '2024-09-20T10:00:00Z',
  },
  {
    id: 'badge-6',
    name: 'Мастер квестов',
    image: '🏅',
    description: 'Завершено 25+ квестов',
    rarity: 'epic',
    earnedAt: '2024-11-10T16:00:00Z',
  },
];

