/**
 * Guru Asia - Ranking Utils
 * Утилиты для ранжирования и сортировки объектов
 */

import type { GuruObjectWithDistance, SortMode } from '../types';

/** Веса для ранжирования */
interface RankingWeights {
  proximity: number;
  openNow: number;
  popularity: number;
  freshness: number;
  rfBoost: number;
}

/** Веса по умолчанию (сумма = 1) */
const DEFAULT_WEIGHTS: RankingWeights = {
  proximity: 0.35,
  openNow: 0.25,
  popularity: 0.20,
  freshness: 0.10,
  rfBoost: 0.10,
};

/** Веса для режима "Ближе" */
const PROXIMITY_WEIGHTS: RankingWeights = {
  proximity: 0.60,
  openNow: 0.15,
  popularity: 0.10,
  freshness: 0.05,
  rfBoost: 0.10,
};

/** Веса для режима "Сейчас" */
const NOW_WEIGHTS: RankingWeights = {
  proximity: 0.20,
  openNow: 0.50,
  popularity: 0.15,
  freshness: 0.05,
  rfBoost: 0.10,
};

/** Веса для режима "Топ" */
const POPULAR_WEIGHTS: RankingWeights = {
  proximity: 0.15,
  openNow: 0.10,
  popularity: 0.50,
  freshness: 0.10,
  rfBoost: 0.15,
};

/**
 * Получает веса для режима сортировки
 */
function getWeightsForMode(mode: SortMode): RankingWeights {
  switch (mode) {
    case 'proximity':
      return PROXIMITY_WEIGHTS;
    case 'now':
      return NOW_WEIGHTS;
    case 'popular':
      return POPULAR_WEIGHTS;
    default:
      return DEFAULT_WEIGHTS;
  }
}

/**
 * Нормализует расстояние в score 0-1 (ближе = выше)
 * @param distance Расстояние в метрах
 * @param maxRadius Максимальный радиус (по умолчанию 1200м)
 */
function normalizeProximity(distance: number, maxRadius: number = 1200): number {
  if (distance <= 0) return 1;
  if (distance >= maxRadius) return 0;
  return 1 - distance / maxRadius;
}

/**
 * Нормализует популярность в score 0-1 (логарифмическая шкала)
 * @param popularity Количество лайков/сейвов
 * @param maxPopularity Максимальная популярность в системе
 */
function normalizePopularity(
  popularity: number = 0,
  maxPopularity: number = 1000
): number {
  if (popularity <= 0) return 0;
  // Логарифмическая нормализация для сглаживания разницы
  return Math.log(popularity + 1) / Math.log(maxPopularity + 1);
}

/**
 * Нормализует свежесть в score 0-1 (экспоненциальное затухание)
 * @param updatedAt Дата обновления (ISO string)
 * @param halfLifeDays Период полураспада в днях
 */
function normalizeFreshness(
  updatedAt?: string,
  halfLifeDays: number = 30
): number {
  if (!updatedAt) return 0.5; // Средний score для объектов без даты

  const now = new Date();
  const updated = new Date(updatedAt);
  const ageMs = now.getTime() - updated.getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  // Экспоненциальное затухание
  return Math.exp(-ageDays / halfLifeDays);
}

/**
 * Проверяет, открыт/активен ли объект сейчас
 */
function isOpenNow(obj: GuruObjectWithDistance): boolean {
  switch (obj.type) {
    case 'place':
      return obj.isOpen === true;
    case 'event':
      return obj.isHappeningNow === true;
    case 'person':
      return obj.isAvailableNow === true;
    case 'housing':
      return obj.availableNow === true;
    case 'quest':
      return true; // Квесты всегда доступны
    default:
      return false;
  }
}

/**
 * Вычисляет общий score для объекта
 * @param obj Объект с расстоянием
 * @param mode Режим сортировки
 * @returns Score от 0 до 1
 */
export function calculateScore(
  obj: GuruObjectWithDistance,
  mode: SortMode
): number {
  const weights = getWeightsForMode(mode);

  // Компоненты score
  const proximityScore = normalizeProximity(obj.distance);
  const openNowScore = isOpenNow(obj) ? 1 : 0;
  const popularityScore = normalizePopularity(obj.popularity);
  const freshnessScore = normalizeFreshness(obj.updatedAt);
  const rfBoostScore = obj.isRF ? 1 : 0;

  // Взвешенная сумма
  const score =
    weights.proximity * proximityScore +
    weights.openNow * openNowScore +
    weights.popularity * popularityScore +
    weights.freshness * freshnessScore +
    weights.rfBoost * rfBoostScore;

  return score;
}

/**
 * Ранжирует объекты по score
 * @param objects Массив объектов с расстоянием
 * @param mode Режим сортировки
 * @returns Отсортированные объекты с score
 */
export function rankObjects(
  objects: GuruObjectWithDistance[],
  mode: SortMode
): GuruObjectWithDistance[] {
  // Вычисляем score для каждого объекта
  const objectsWithScore = objects.map((obj) => ({
    ...obj,
    score: calculateScore(obj, mode),
  }));

  // Сортируем по score (убывание)
  return objectsWithScore.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

/**
 * Простая сортировка по расстоянию (для режима "Ближе")
 */
export function sortByProximity(
  objects: GuruObjectWithDistance[]
): GuruObjectWithDistance[] {
  return [...objects].sort((a, b) => a.distance - b.distance);
}

/**
 * Сортировка по актуальности (для режима "Сейчас")
 * Сначала открытые/активные, потом по расстоянию
 */
export function sortByNow(
  objects: GuruObjectWithDistance[]
): GuruObjectWithDistance[] {
  return [...objects].sort((a, b) => {
    const aOpen = isOpenNow(a) ? 1 : 0;
    const bOpen = isOpenNow(b) ? 1 : 0;

    // Сначала по статусу "открыто"
    if (aOpen !== bOpen) {
      return bOpen - aOpen;
    }

    // Затем по расстоянию
    return a.distance - b.distance;
  });
}

/**
 * Сортировка по популярности (для режима "Топ")
 * Сначала по рейтингу, потом по популярности
 */
export function sortByPopular(
  objects: GuruObjectWithDistance[]
): GuruObjectWithDistance[] {
  return [...objects].sort((a, b) => {
    // Сначала по рейтингу
    const aRating = a.rating ?? 0;
    const bRating = b.rating ?? 0;
    if (aRating !== bRating) {
      return bRating - aRating;
    }

    // Затем по популярности
    const aPopularity = a.popularity ?? 0;
    const bPopularity = b.popularity ?? 0;
    if (aPopularity !== bPopularity) {
      return bPopularity - aPopularity;
    }

    // В конце по расстоянию
    return a.distance - b.distance;
  });
}

/**
 * Применяет сортировку в зависимости от режима
 * @param objects Массив объектов
 * @param mode Режим сортировки
 * @returns Отсортированные объекты
 */
export function applySorting(
  objects: GuruObjectWithDistance[],
  mode: SortMode
): GuruObjectWithDistance[] {
  switch (mode) {
    case 'proximity':
      return sortByProximity(objects);
    case 'now':
      return sortByNow(objects);
    case 'popular':
      return sortByPopular(objects);
    default:
      // Используем ранжирование по умолчанию
      return rankObjects(objects, mode);
  }
}

