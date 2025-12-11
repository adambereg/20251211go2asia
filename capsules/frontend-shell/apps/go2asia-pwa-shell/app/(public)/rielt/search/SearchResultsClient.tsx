'use client';

/**
 * Rielt.Market Asia - Search Results Client Component
 * Страница результатов поиска с фильтрацией и картой
 */

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchResultsView } from '@/components/rielt/SearchResults/SearchResultsView';
import { mockListings } from '@/components/rielt';
import type { SearchFilters, ListingWithDistance } from '@/components/rielt/types';
import { applyFilters } from '@/components/rielt/utils/filters';
import { sortListings } from '@/components/rielt/utils/sorting';
import { addDistancesToListings } from '@/components/rielt/utils/geo';

export function SearchResultsClient() {
  const searchParams = useSearchParams();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Парсим параметры из URL
  const filtersFromURL = useMemo((): Partial<SearchFilters> => {
    const filters: Partial<SearchFilters> = {};

    // Город
    const city = searchParams.get('city');
    if (city) {
      filters.location = { city };
    }

    // rentalType
    const rentalType = searchParams.get('rentalType') as 'short-term' | 'long-term' | null;
    if (rentalType) {
      filters.rentalType = rentalType;
    }

    // sortBy
    const sortBy = searchParams.get('sortBy') as SearchFilters['sortBy'];
    if (sortBy) {
      filters.sortBy = sortBy;
    }

    // amenities
    const workspace = searchParams.get('workspace') === 'true';
    const wifi = searchParams.get('wifi') === 'true';
    const childFriendly = searchParams.get('childFriendly') === 'true';
    if (workspace || wifi || childFriendly) {
      filters.amenities = {};
      if (workspace) filters.amenities.workspace = true;
      if (wifi) filters.amenities.wifi = true;
      if (childFriendly) filters.amenities.childFriendly = true;
    }

    // bedrooms
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) {
      // Это будет обработано в фильтрах
    }

    return filters;
  }, [searchParams]);

  // Получаем геолокацию пользователя
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Если геолокация недоступна, используем дефолтную позицию (Бангкок)
          setUserLocation({ lat: 13.7563, lng: 100.5018 });
        }
      );
    } else {
      setUserLocation({ lat: 13.7563, lng: 100.5018 });
    }
  }, []);

  // Применяем фильтры и сортировку
  const filteredAndSortedListings = useMemo(() => {
    let listings: ListingWithDistance[] = [...mockListings];

    // Добавляем расстояния, если есть геолокация
    if (userLocation) {
      listings = addDistancesToListings(listings, userLocation);
    }

    // Применяем фильтры
    const fullFilters: SearchFilters = {
      ...filtersFromURL,
      types: ['apartment', 'house', 'studio', 'room', 'coliving'],
      sortBy: filtersFromURL.sortBy || 'recommended',
    } as SearchFilters;

    // Фильтр по городу
    if (filtersFromURL.location?.city) {
      listings = listings.filter(
        (listing) =>
          listing.address.city.toLowerCase() === filtersFromURL.location!.city!.toLowerCase()
      );
    }

    // Фильтр по типу аренды
    if (filtersFromURL.rentalType) {
      listings = listings.filter((listing) => listing.rentalType === filtersFromURL.rentalType);
    }

    // Фильтр по удобствам
    if (filtersFromURL.amenities) {
      if (filtersFromURL.amenities.workspace) {
        listings = listings.filter((listing) => listing.amenities.workspace === true);
      }
      if (filtersFromURL.amenities.wifi) {
        listings = listings.filter((listing) => listing.amenities.wifi === true);
      }
      if (filtersFromURL.amenities.childFriendly) {
        listings = listings.filter((listing) => listing.amenities.childFriendly === true);
      }
    }

    // Фильтр по количеству спален
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) {
      const bedroomsNum = parseInt(bedrooms);
      listings = listings.filter((listing) => (listing.bedrooms || 0) >= bedroomsNum);
    }

    // Применяем остальные фильтры
    listings = applyFilters(listings, fullFilters);

    // Сортируем
    listings = sortListings(listings, fullFilters.sortBy);

    return listings;
  }, [mockListings, filtersFromURL, userLocation, searchParams]);

  return (
    <SearchResultsView
      listings={filteredAndSortedListings}
      filters={filtersFromURL}
      userLocation={userLocation}
    />
  );
}



















