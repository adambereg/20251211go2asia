/**
 * Quest Asia - Leaderboard Utils
 * Утилиты для работы с лидербордом
 */

import type { LeaderboardEntry, LeaderboardFilters } from '../types';

/**
 * Получить мок-данные лидерборда
 */
export async function getMockLeaderboard(
  filters: LeaderboardFilters
): Promise<{ entries: LeaderboardEntry[]; userRank: number | null }> {
  // Имитация задержки API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Генерируем мок-данные
  const mockEntries: LeaderboardEntry[] = [
    {
      userId: 'user-1',
      username: 'QuestMaster',
      avatar: 'https://i.pravatar.cc/150?img=1',
      points: 15420,
      questsCompleted: 23,
      rank: 1,
      isVIP: true,
      badges: [],
    },
    {
      userId: 'user-2',
      username: 'TempleRunner',
      avatar: 'https://i.pravatar.cc/150?img=2',
      points: 12850,
      questsCompleted: 19,
      rank: 2,
      isPRO: true,
      badges: [],
    },
    {
      userId: 'user-3',
      username: 'StreetFoodHero',
      avatar: 'https://i.pravatar.cc/150?img=3',
      points: 11200,
      questsCompleted: 17,
      rank: 3,
      badges: [],
    },
    {
      userId: 'user-4',
      username: 'NightExplorer',
      avatar: 'https://i.pravatar.cc/150?img=4',
      points: 9850,
      questsCompleted: 15,
      rank: 4,
      isVIP: true,
      badges: [],
    },
    {
      userId: 'user-5',
      username: 'CultureSeeker',
      avatar: 'https://i.pravatar.cc/150?img=5',
      points: 8750,
      questsCompleted: 13,
      rank: 5,
      badges: [],
    },
    {
      userId: 'user-6',
      username: 'AdventureLover',
      avatar: 'https://i.pravatar.cc/150?img=6',
      points: 7650,
      questsCompleted: 11,
      rank: 6,
      isPRO: true,
      badges: [],
    },
    {
      userId: 'user-7',
      username: 'CityWanderer',
      avatar: 'https://i.pravatar.cc/150?img=7',
      points: 6800,
      questsCompleted: 10,
      rank: 7,
      badges: [],
    },
    {
      userId: 'user-8',
      username: 'HistoryBuff',
      avatar: 'https://i.pravatar.cc/150?img=8',
      points: 5900,
      questsCompleted: 9,
      rank: 8,
      badges: [],
    },
    {
      userId: 'user-9',
      username: 'FoodieExplorer',
      avatar: 'https://i.pravatar.cc/150?img=9',
      points: 5200,
      questsCompleted: 8,
      rank: 9,
      badges: [],
    },
    {
      userId: 'user-10',
      username: 'TravelEnthusiast',
      avatar: 'https://i.pravatar.cc/150?img=10',
      points: 4500,
      questsCompleted: 7,
      rank: 10,
      badges: [],
    },
    {
      userId: 'current-user',
      username: 'Вы',
      avatar: undefined,
      points: 3200,
      questsCompleted: 5,
      rank: 15,
      badges: [],
    },
  ];

  // Применяем фильтры
  let filtered = [...mockEntries];

  if (filters.vipOnly) {
    filtered = filtered.filter((e) => e.isVIP);
  }

  if (filters.proOnly) {
    filtered = filtered.filter((e) => e.isPRO);
  }

  // Пересчитываем ранги после фильтрации
  filtered = filtered
    .sort((a, b) => b.points - a.points)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  const userEntry = filtered.find((e) => e.userId === 'current-user');
  const userRank = userEntry ? userEntry.rank : null;

  return {
    entries: filtered,
    userRank,
  };
}

/**
 * Получить позицию пользователя в лидерборде
 */
export function getUserRank(
  leaderboard: LeaderboardEntry[],
  userId: string
): number | null {
  const entry = leaderboard.find((e) => e.userId === userId);
  return entry ? entry.rank : null;
}

