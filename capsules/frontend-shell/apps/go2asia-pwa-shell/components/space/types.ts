/**
 * Space Asia - Types
 * Типы для модуля социальной сети Go2Asia
 */

// =============================================================================
// Базовые типы
// =============================================================================

/** Координаты (широта, долгота) */
export interface Coordinates {
  lat: number;
  lng: number;
}

/** Роль пользователя в экосистеме */
export type UserRole = 'spacer' | 'vip' | 'pro';

/** Приватность поста */
export type PostPrivacy = 'private' | 'friends' | 'group' | 'public';

/** Тип поста */
export type PostType =
  | 'text'
  | 'media'
  | 'poll'
  | 'place-report'
  | 'event-report'
  | 'quest-report'
  | 'guide';

/** Тип медиа */
export type MediaType = 'image' | 'video';

/** Тип вложения */
export type AttachmentType = 'place' | 'event' | 'quest' | 'guide' | 'housing';

/** Тип уведомления */
export type NotificationType =
  | 'like'
  | 'comment'
  | 'mention'
  | 'follow'
  | 'group_invite'
  | 'group_post'
  | 'points'
  | 'nft'
  | 'level_up';

/** Тип сохранённого элемента */
export type SaveType = 'post' | 'place' | 'event' | 'quest' | 'housing' | 'guide';

// =============================================================================
// Пользователь
// =============================================================================

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  city?: string;
  role: UserRole;
  verified: boolean;
  level: number;
  points: number;
  interests: string[];
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
  isFriend?: boolean;
  showNearby?: boolean; // Для PRO: показывать на карте
  createdAt: string;
}

/** NFT бейдж пользователя */
export interface NFTBadge {
  id: string;
  name: string;
  image: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: string;
}

// =============================================================================
// Пост
// =============================================================================

export interface Post {
  id: string;
  author: User;
  type: PostType;
  privacy: PostPrivacy;
  content: string;
  media?: Media[];
  poll?: Poll;
  attachments?: Attachments;
  tags?: string[];
  location?: {
    name: string;
    coordinates: Coordinates;
  };
  groupId?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  savesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  isNominated?: boolean;
  nominatedTo?: 'atlas' | 'blog' | 'pulse';
  createdAt: string;
  updatedAt: string;
}

/** Медиа файл */
export interface Media {
  id: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  duration?: number; // для видео, в секундах
}

/** Опрос */
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVote?: string; // id выбранного варианта
  expiresAt?: string;
  isMultiple?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

/** Вложения (ссылки на другие модули) */
export interface Attachments {
  type: AttachmentType;
  place?: {
    id: string;
    name: string;
    address: string;
    image?: string;
    rating?: number;
  };
  event?: {
    id: string;
    title: string;
    date: string;
    location: string;
    image?: string;
  };
  quest?: {
    id: string;
    title: string;
    description: string;
    image?: string;
    points: number;
  };
  guide?: {
    id: string;
    title: string;
    excerpt: string;
    image?: string;
  };
  housing?: {
    id: string;
    title: string;
    price: string;
    image?: string;
  };
}

// =============================================================================
// Комментарий
// =============================================================================

export interface Comment {
  id: string;
  author: User;
  content: string;
  likesCount: number;
  isLiked: boolean;
  replies?: Comment[];
  createdAt: string;
}

// =============================================================================
// Группа
// =============================================================================

export type GroupPrivacy = 'public' | 'closed' | 'invite';

export interface Group {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover?: string;
  avatar?: string;
  privacy: GroupPrivacy;
  membersCount: number;
  postsCount: number;
  admins: User[];
  moderators: User[];
  tags: string[];
  rules?: string[];
  isMember: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  createdAt: string;
}

// =============================================================================
// Сообщения (DM)
// =============================================================================

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  media?: Media[];
  attachments?: Attachments;
  isRead: boolean;
  createdAt: string;
}

// =============================================================================
// Уведомления
// =============================================================================

export interface Notification {
  id: string;
  type: NotificationType;
  actor: User;
  target?: {
    type: 'post' | 'comment' | 'group';
    id: string;
    preview?: string;
  };
  data?: {
    points?: number;
    level?: number;
    nftName?: string;
  };
  isRead: boolean;
  createdAt: string;
}

// =============================================================================
// Сохранённое (Save)
// =============================================================================

export interface Save {
  id: string;
  userId: string;
  type: SaveType;
  targetId: string;
  title: string;
  image?: string;
  description?: string;
  createdAt: string;
}

// =============================================================================
// Фильтры ленты
// =============================================================================

export type FeedFilter = 'my' | 'friends' | 'groups' | 'trending' | 'saved' | 'following';

export interface FeedFiltersState {
  active: FeedFilter;
  groupId?: string;
}

// =============================================================================
// Константы
// =============================================================================

export const PRIVACY_LABELS: Record<PostPrivacy, string> = {
  private: 'Только я',
  friends: 'Друзья',
  group: 'Группа',
  public: 'Все',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  spacer: 'Спейсер',
  vip: 'VIP',
  pro: 'PRO',
};

export const ROLE_COLORS: Record<UserRole, { bg: string; text: string }> = {
  spacer: { bg: 'bg-slate-100', text: 'text-slate-700' },
  vip: { bg: 'bg-amber-100', text: 'text-amber-700' },
  pro: { bg: 'bg-purple-100', text: 'text-purple-700' },
};

export const FEED_FILTER_LABELS: Record<FeedFilter, string> = {
  my: 'Моё',
  friends: 'Друзья',
  groups: 'Группы',
  trending: 'Тренды',
  saved: 'Сохранённое',
  following: 'Подписки',
};

// =============================================================================
// Dashboard (Личный Кабинет)
// =============================================================================

/** Статистика Dashboard */
export interface DashboardStats {
  points: number;
  g2aBalance: number;
  weeklyDelta: number; // Изменение за неделю
  level: number;
  levelProgress: number; // 0-100
  postsCount: number;
  draftsCount: number;
  savedCount: number;
  guidesCount: number;
  weeklyPointsEarned: number;
  weeklyPointsSpent: number;
}

/** Быстрое действие */
export interface QuickAction {
  id: string;
  label: string;
  icon: string; // Название иконки из lucide-react
  href: string;
  color?: 'blue' | 'purple' | 'green' | 'orange';
  badge?: string; // Опциональный бейдж (например, "New")
}

/** Рекомендация */
export interface Recommendation {
  id: string;
  type: 'quest' | 'voucher' | 'event' | 'place';
  title: string;
  description?: string;
  image?: string;
  href: string;
  points?: number;
  badge?: string;
}

/** Активность пользователя */
export interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'points' | 'level_up';
  actor?: User;
  target?: {
    type: 'post' | 'comment' | 'user';
    id: string;
    preview?: string;
  };
  data?: {
    points?: number;
    level?: number;
  };
  createdAt: string;
}

/** Транзакция баланса */
export interface Transaction {
  id: string;
  type: 'earn' | 'spend' | 'bonus' | 'referral' | 'quest' | 'voucher';
  amount: number;
  currency: 'points' | 'g2a';
  description: string;
  relatedId?: string; // ID связанного объекта (квест, реферал и т.д.)
  createdAt: string;
}

/** Квест */
export interface Quest {
  id: string;
  title: string;
  description: string;
  image?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  status: 'available' | 'active' | 'completed';
  progress?: number; // 0-100 для активных
  completedAt?: string;
  expiresAt?: string;
}

/** Ваучер */
export interface Voucher {
  id: string;
  title: string;
  description: string;
  image?: string;
  discount: string; // "10%", "500 THB"
  pointsCost: number;
  expiresAt?: string;
  isAvailable: boolean;
}

/** Настройки профиля */
export interface ProfileSettings {
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showNearby: boolean; // Для PRO
    showActivity: boolean;
  };
  notifications: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    mentions: boolean;
    points: boolean;
    quests: boolean;
  };
  language: 'ru' | 'en' | 'th';
  devices?: Array<{
    id: string;
    name: string;
    lastActive: string;
    isCurrent: boolean;
  }>;
  kyc?: {
    status: 'pending' | 'verified' | 'rejected';
    verifiedAt?: string;
  };
}

/** Персональная цель на неделю */
export interface WeeklyGoal {
  id: string;
  title: string;
  icon: string; // Эмодзи или название иконки
  target: number;
  current: number;
  type: 'quest' | 'place' | 'guide' | 'referral' | 'post';
  pointsReward?: number;
}

