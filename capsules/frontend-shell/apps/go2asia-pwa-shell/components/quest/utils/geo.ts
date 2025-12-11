/**
 * Quest Asia - Geo Utils
 * Утилиты для работы с геолокацией
 */

import type { Coordinates } from '../types';

/**
 * Вычислить расстояние между двумя точками (формула гаверсинуса)
 * @returns Расстояние в метрах
 */
export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371000; // Радиус Земли в метрах
  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
      Math.cos(toRadians(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Преобразовать градусы в радианы
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Проверить, находится ли точка в радиусе
 */
export function isWithinRadius(
  point: Coordinates,
  center: Coordinates,
  radius: number // метры
): boolean {
  const distance = calculateDistance(point, center);
  return distance <= radius;
}

/**
 * Вычислить скорость перемещения между двумя точками
 * @returns Скорость в м/с
 */
export function calculateSpeed(
  point1: Coordinates,
  point2: Coordinates,
  timeDiff: number // секунды
): number {
  if (timeDiff <= 0) return 0;
  const distance = calculateDistance(point1, point2);
  return distance / timeDiff;
}

/**
 * Проверить скорость перемещения (анти-телепорт)
 * Максимальная скорость пешком: ~2 м/с (7.2 км/ч)
 * Максимальная скорость на транспорте: ~30 м/с (108 км/ч)
 */
export function isValidSpeed(speed: number, maxSpeed: number = 30): boolean {
  return speed <= maxSpeed;
}

