/**
 * Quest Asia - Quest Utils
 * Утилиты для работы с квестами
 */

import type { Quest, QuestFilters, SortMode } from '../types';

/**
 * Фильтрация квестов по фильтрам
 */
export function filterQuests(quests: Quest[], filters: QuestFilters): Quest[] {
  return quests.filter((quest) => {
    // Фильтр по городу
    if (filters.city && quest.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    // Фильтр по району
    if (filters.district && quest.district?.toLowerCase() !== filters.district.toLowerCase()) {
      return false;
    }

    // Фильтр по длительности
    if (filters.duration) {
      if (filters.duration.min && quest.duration < filters.duration.min) {
        return false;
      }
      if (filters.duration.max && quest.duration > filters.duration.max) {
        return false;
      }
    }

    // Фильтр по типу
    if (filters.type && filters.type.length > 0 && !filters.type.includes(quest.type)) {
      return false;
    }

    // Фильтр по сложности
    if (filters.difficulty && filters.difficulty.length > 0 && !filters.difficulty.includes(quest.difficulty)) {
      return false;
    }

    // Фильтр RF-бонус
    if (filters.rfBonus && !quest.badges.some((badge) => badge.type === 'rf')) {
      return false;
    }

    // Фильтр офлайн-доступность
    if (filters.offlineAvailable !== undefined && quest.offlineAvailable !== filters.offlineAvailable) {
      return false;
    }

    // Фильтр по сезону
    if (filters.season && quest.season?.id !== filters.season) {
      return false;
    }

    return true;
  });
}

/**
 * Сортировка квестов
 */
export function sortQuests(quests: Quest[], sortMode: SortMode): Quest[] {
  const sorted = [...quests];

  switch (sortMode) {
    case 'relevance':
      // По релевантности (рейтинг, популярность)
      sorted.sort((a, b) => {
        const aScore = (a.stats?.averageRating || 0) * (a.stats?.completions || 0);
        const bScore = (b.stats?.averageRating || 0) * (b.stats?.completions || 0);
        return bScore - aScore;
      });
      break;

    case 'newest':
      sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;

    case 'popular':
      sorted.sort((a, b) => (b.stats?.completions || 0) - (a.stats?.completions || 0));
      break;

    case 'duration':
      sorted.sort((a, b) => a.duration - b.duration);
      break;

    case 'difficulty':
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      sorted.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      break;
  }

  return sorted;
}

/**
 * Подсчёт активных фильтров
 */
export function countActiveFilters(filters: QuestFilters): number {
  let count = 0;
  if (filters.city) count++;
  if (filters.district) count++;
  if (filters.duration?.min || filters.duration?.max) count++;
  if (filters.type && filters.type.length > 0) count++;
  if (filters.difficulty && filters.difficulty.length > 0) count++;
  if (filters.rfBonus) count++;
  if (filters.offlineAvailable !== undefined) count++;
  if (filters.season) count++;
  return count;
}

