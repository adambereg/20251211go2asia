/**
 * Rielt.Market Asia - Geo
 * Функции работы с геолокацией
 */

import type { Coordinates, Listing, ListingWithDistance } from '../types';

/**
 * Вычислить расстояние между двумя точками (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Радиус Земли в метрах
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Преобразовать градусы в радианы
 */
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Вычислить время ходьбы (примерно 80 м/мин)
 */
export function calculateWalkingTime(distanceMeters: number): number {
  return Math.round(distanceMeters / 80); // минуты
}

/**
 * Добавить расстояние к объявлениям относительно точки
 */
export function addDistancesToListings(
  listings: Listing[],
  center: Coordinates
): ListingWithDistance[] {
  return listings.map((listing) => {
    const distance = calculateDistance(
      center.lat,
      center.lng,
      listing.address.coordinates.lat,
      listing.address.coordinates.lng
    );
    return {
      ...listing,
      distance,
      walkingTime: calculateWalkingTime(distance),
    };
  });
}

/**
 * Форматировать расстояние для отображения
 */
export function formatDistance(distanceMeters: number): string {
  if (distanceMeters < 1000) {
    return `${Math.round(distanceMeters)} м`;
  }
  return `${(distanceMeters / 1000).toFixed(1)} км`;
}

