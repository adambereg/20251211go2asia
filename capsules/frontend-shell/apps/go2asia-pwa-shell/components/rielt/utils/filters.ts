/**
 * Rielt.Market Asia - Filters
 * Функции фильтрации объявлений
 */

import type { Listing, ListingWithDistance, SearchFilters } from '../types';

/**
 * Применить фильтры к списку объявлений
 */
export function applyFilters(
  listings: ListingWithDistance[],
  filters: SearchFilters
): ListingWithDistance[] {
  let filtered = [...listings];

  // Фильтр по типу аренды
  if (filters.rentalType) {
    filtered = filtered.filter((listing) => listing.rentalType === filters.rentalType);
  }

  // Фильтр по типу жилья
  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter((listing) => filters.types!.includes(listing.type));
  }

  // Фильтр по цене
  if (filters.priceRange) {
    const { min, max, currency = 'USD' } = filters.priceRange;
    filtered = filtered.filter((listing) => {
      const price = filters.rentalType === 'long-term' 
        ? listing.pricing.perMonth 
        : listing.pricing.perNight;
      
      if (!price) return false;
      
      // Простое сравнение (в реальности нужна конвертация валют)
      if (min !== undefined && price < min) return false;
      if (max !== undefined && price > max) return false;
      
      return true;
    });
  }

  // Фильтр по удобствам
  if (filters.amenities) {
    const amenityKeys = Object.keys(filters.amenities) as Array<keyof typeof filters.amenities>;
    filtered = filtered.filter((listing) => {
      return amenityKeys.every((key) => {
        const filterValue = filters.amenities![key];
        if (filterValue === undefined) return true;
        return listing.amenities[key] === filterValue;
      });
    });
  }

  // Фильтр по правилам
  if (filters.rules) {
    const ruleKeys = Object.keys(filters.rules) as Array<keyof typeof filters.rules>;
    filtered = filtered.filter((listing) => {
      return ruleKeys.every((key) => {
        const filterValue = filters.rules![key];
        if (filterValue === undefined) return true;
        return listing.houseRules[key] === filterValue;
      });
    });
  }

  // Фильтр "Только RF"
  if (filters.onlyRF) {
    filtered = filtered.filter((listing) => listing.isRF === true);
  }

  // Фильтр "Только PRO-проверенные"
  if (filters.onlyPROVerified) {
    filtered = filtered.filter((listing) => listing.proVerification?.verified === true);
  }

  // Фильтр "Мгновенное бронирование"
  if (filters.instantBooking) {
    filtered = filtered.filter((listing) => listing.isInstant === true);
  }

  // Фильтр по доступности сегодня
  if (filters.availableToday) {
    const today = new Date().toISOString().split('T')[0];
    filtered = filtered.filter((listing) => {
      if (listing.rentalType === 'short-term' && listing.availability) {
        return listing.availability.calendar[today] === true;
      }
      return true; // Для долгосрока считаем всегда доступным
    });
  }

  // Фильтр по радиусу (если есть координаты)
  if (filters.location?.coordinates && filters.location?.radius) {
    filtered = filterByRadius(
      filtered,
      filters.location.coordinates,
      filters.location.radius * 1000 // км -> метры
    );
  }

  return filtered;
}

/**
 * Фильтр по радиусу от точки
 */
export function filterByRadius(
  listings: ListingWithDistance[],
  center: { lat: number; lng: number },
  radiusMeters: number
): ListingWithDistance[] {
  return listings.filter((listing) => {
    if (!listing.distance) {
      // Вычисляем расстояние если его нет
      const distance = calculateDistance(
        center.lat,
        center.lng,
        listing.address.coordinates.lat,
        listing.address.coordinates.lng
      );
      listing.distance = distance;
    }
    return listing.distance <= radiusMeters;
  });
}

/**
 * Вычислить расстояние между двумя точками (Haversine formula)
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
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

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Подсчитать количество активных фильтров
 */
export function countActiveFilters(filters: SearchFilters): number {
  let count = 0;

  if (filters.rentalType) count++;
  if (filters.types && filters.types.length > 0 && filters.types.length < 5) count++;
  if (filters.priceRange?.min || filters.priceRange?.max) count++;
  if (filters.amenities && Object.values(filters.amenities).some((v) => v === true)) count++;
  if (filters.rules && Object.values(filters.rules).some((v) => v !== undefined)) count++;
  if (filters.onlyRF) count++;
  if (filters.onlyPROVerified) count++;
  if (filters.instantBooking) count++;
  if (filters.availableToday) count++;
  if (filters.location?.radius) count++;

  return count;
}

