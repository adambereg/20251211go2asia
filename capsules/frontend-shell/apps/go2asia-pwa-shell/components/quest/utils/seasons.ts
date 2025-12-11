/**
 * Quest Asia - Seasons Utils
 * Утилиты для работы с сезонами
 */

import type { QuestSeason, QuestProgress } from '../types';
import { currentSeason } from '../mockQuests';

/**
 * Получить текущий сезон
 */
export function getCurrentSeason(): QuestSeason {
  return currentSeason;
}

/**
 * Проверить, активен ли сезон
 */
export function isSeasonActive(season: QuestSeason): boolean {
  const now = new Date();
  return now >= season.startDate && now <= season.endDate;
}

/**
 * Получить прогресс по сезону
 */
export function getSeasonProgress(
  season: QuestSeason,
  completedQuests: QuestProgress[]
): {
  completed: number;
  total: number;
  percentage: number;
  milestones: {
    reached: boolean;
    quests: number;
    reward?: string;
  }[];
} {
  const seasonQuests = completedQuests.filter((progress) => {
    // В реальном приложении здесь будет проверка seasonId
    return progress.completedAt && progress.completedAt >= season.startDate && progress.completedAt <= season.endDate;
  });

  const completed = seasonQuests.length;
  const total = 20; // Примерное количество квестов в сезоне

  const milestones = [
    { quests: 5, reward: 'Сезонный бейдж "Новичок"' },
    { quests: 10, reward: 'Сезонный бейдж "Опытный"' },
    { quests: 15, reward: 'Сезонный бейдж "Мастер"' },
    { quests: 20, reward: 'Сезонный бейдж "Легенда"' },
  ].map((milestone) => ({
    ...milestone,
    reached: completed >= milestone.quests,
  }));

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
    milestones,
  };
}

/**
 * Получить оставшееся время до конца сезона
 */
export function getTimeUntilSeasonEnd(season: QuestSeason): {
  days: number;
  hours: number;
  minutes: number;
  isEndingSoon: boolean;
} {
  const now = new Date();
  const diff = season.endDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isEndingSoon: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days,
    hours,
    minutes,
    isEndingSoon: days <= 7,
  };
}

