/**
 * Guru Asia - Geo Utils
 * Утилиты для геопространственных вычислений
 */

import type { Coordinates, GuruObject, GuruObjectWithDistance } from '../types';

/**
 * Вычисляет расстояние между двумя точками по формуле Haversine
 * @param lat1 Широта точки 1
 * @param lng1 Долгота точки 1
 * @param lat2 Широта точки 2
 * @param lng2 Долгота точки 2
 * @returns Расстояние в метрах
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3; // Радиус Земли в метрах
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Вычисляет время пешком (примерно 80 м/мин)
 * @param distanceMeters Расстояние в метрах
 * @returns Время в минутах (округлённое)
 */
export function calculateWalkingTime(distanceMeters: number): number {
  const WALKING_SPEED = 80; // метров в минуту (~4.8 км/ч)
  return Math.ceil(distanceMeters / WALKING_SPEED);
}

/**
 * Фильтрует объекты по радиусу от точки
 * @param objects Массив объектов
 * @param center Центральная точка (позиция пользователя)
 * @param radiusMeters Радиус в метрах
 * @returns Отфильтрованные объекты
 */
export function filterByRadius(
  objects: GuruObject[],
  center: Coordinates,
  radiusMeters: number
): GuruObject[] {
  return objects.filter((obj) => {
    const distance = calculateDistance(center.lat, center.lng, obj.lat, obj.lng);
    return distance <= radiusMeters;
  });
}

/**
 * Добавляет расстояние и время пешком к объектам
 * @param objects Массив объектов
 * @param center Центральная точка (позиция пользователя)
 * @returns Объекты с расстоянием
 */
export function addDistanceToObjects(
  objects: GuruObject[],
  center: Coordinates
): GuruObjectWithDistance[] {
  return objects.map((obj) => {
    const distance = calculateDistance(center.lat, center.lng, obj.lat, obj.lng);
    const walkingTime = calculateWalkingTime(distance);
    return {
      ...obj,
      distance: Math.round(distance),
      walkingTime,
    };
  });
}

/**
 * Сортирует объекты по расстоянию (ближайшие первые)
 * @param objects Массив объектов с расстоянием
 * @returns Отсортированные объекты
 */
export function sortByDistance(
  objects: GuruObjectWithDistance[]
): GuruObjectWithDistance[] {
  return [...objects].sort((a, b) => a.distance - b.distance);
}

/**
 * Форматирует расстояние для отображения
 * @param meters Расстояние в метрах
 * @returns Отформатированная строка
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} м`;
  }
  return `${(meters / 1000).toFixed(1)} км`;
}

/**
 * Форматирует время пешком для отображения
 * @param minutes Время в минутах
 * @returns Отформатированная строка
 */
export function formatWalkingTime(minutes: number): string {
  if (minutes < 60) {
    return `~${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `~${hours} ч ${mins} мин` : `~${hours} ч`;
}

/**
 * Вычисляет bounding box для радиуса вокруг точки
 * @param center Центральная точка
 * @param radiusMeters Радиус в метрах
 * @returns Bounding box [minLat, minLng, maxLat, maxLng]
 */
export function getBoundingBox(
  center: Coordinates,
  radiusMeters: number
): [number, number, number, number] {
  // Приблизительные значения
  // 1 градус широты ≈ 111 км
  // 1 градус долготы ≈ 111 км * cos(широта)
  const latOffset = radiusMeters / 111000;
  const lngOffset = radiusMeters / (111000 * Math.cos((center.lat * Math.PI) / 180));

  return [
    center.lat - latOffset, // minLat
    center.lng - lngOffset, // minLng
    center.lat + latOffset, // maxLat
    center.lng + lngOffset, // maxLng
  ];
}

/**
 * Проверяет, находится ли точка внутри bounding box
 * @param point Точка для проверки
 * @param bounds Bounding box [minLat, minLng, maxLat, maxLng]
 * @returns true если точка внутри
 */
export function isPointInBounds(
  point: Coordinates,
  bounds: [number, number, number, number]
): boolean {
  const [minLat, minLng, maxLat, maxLng] = bounds;
  return (
    point.lat >= minLat &&
    point.lat <= maxLat &&
    point.lng >= minLng &&
    point.lng <= maxLng
  );
}

