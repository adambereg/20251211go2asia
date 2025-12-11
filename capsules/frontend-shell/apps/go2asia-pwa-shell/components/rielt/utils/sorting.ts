/**
 * Rielt.Market Asia - Sorting
 * Функции сортировки объявлений
 */

import type { ListingWithDistance, SearchFilters } from '../types';

/**
 * Отсортировать объявления по выбранному критерию
 */
export function sortListings(
  listings: ListingWithDistance[],
  sortBy: SearchFilters['sortBy'] = 'recommended'
): ListingWithDistance[] {
  const sorted = [...listings];

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = getPrice(a);
        const priceB = getPrice(b);
        if (!priceA && !priceB) return 0;
        if (!priceA) return 1;
        if (!priceB) return -1;
        return priceA - priceB;
      });

    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = getPrice(a);
        const priceB = getPrice(b);
        if (!priceA && !priceB) return 0;
        if (!priceA) return -1;
        if (!priceB) return 1;
        return priceB - priceA;
      });

    case 'distance':
      return sorted.sort((a, b) => {
        const distA = a.distance ?? Infinity;
        const distB = b.distance ?? Infinity;
        return distA - distB;
      });

    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

    case 'rating':
      return sorted.sort((a, b) => {
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        return ratingB - ratingA;
      });

    case 'recommended':
    default:
      // Комплексная сортировка: RF + PRO + рейтинг + новизна
      return sorted.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // RF бонус
        if (a.isRF) scoreA += 10;
        if (b.isRF) scoreB += 10;

        // PRO проверка бонус
        if (a.proVerification?.verified) scoreA += 5;
        if (b.proVerification?.verified) scoreB += 5;

        // Рейтинг
        scoreA += (a.rating ?? 0) * 2;
        scoreB += (b.rating ?? 0) * 2;

        // Новизна (более новые выше)
        const daysA = (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        const daysB = (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        scoreA += Math.max(0, 5 - daysA); // Бонус за новизну (до 5 дней)
        scoreB += Math.max(0, 5 - daysB);

        return scoreB - scoreA;
      });
  }
}

/**
 * Получить цену объявления (ночь или месяц)
 */
function getPrice(listing: ListingWithDistance): number | undefined {
  return listing.pricing.perNight ?? listing.pricing.perMonth;
}

