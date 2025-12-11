'use client';

import { AtlasHomeView } from '@/modules/atlas';
import { useGetCountries, useGetPlaces } from '@go2asia/sdk/atlas';
import { useMemo } from 'react';
import { Skeleton, SkeletonCard } from '@go2asia/ui';

export function AtlasHomeClient() {
  // Загружаем страны из API
  const { 
    data: countriesData, 
    isLoading: countriesLoading
  } = useGetCountries({
    limit: 20,
  });

  // Загружаем популярные места из API
  const { 
    data: placesData, 
    isLoading: placesLoading
  } = useGetPlaces({
    limit: 3,
  });

  // Преобразуем данные из API в формат компонента
  const countries = useMemo(() => {
    if (!countriesData?.items) return [];
    return countriesData.items.map((country) => ({
      id: country.id,
      name: country.name,
      flag: country.flag || '🌏',
      placesCount: country.placesCount || 0,
      description: country.description || '',
      heroImage: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg', // TODO: Get heroImage when API supports it
    }));
  }, [countriesData]);

  const popularPlaces = useMemo(() => {
    if (!placesData?.items) return [];
    return placesData.items.map((place) => ({
      id: place.id,
      title: place.name,
      city: '', // TODO: Get city name from cityId when API supports it
      country: '', // TODO: Get country name when API supports it
      rating: 0, // TODO: Get rating when API supports it
      reviewsCount: 0, // TODO: Get reviews count when API supports it
    }));
  }, [placesData]);

  const isLoading = countriesLoading || placesLoading;

  // Показываем состояние загрузки с Skeleton компонентами (только при первой загрузке)
  if (isLoading && !countriesData && !placesData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Показываем данные (как в Pulse и Blog - без проверки ошибок)
  // Если данных нет из-за ошибок, показываем пустые списки
  return <AtlasHomeView countries={countries} popularPlaces={popularPlaces} />;
}
