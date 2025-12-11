'use client';

import Link from 'next/link';
import { Card, CardContent, Chip, Skeleton, SkeletonCard } from '@go2asia/ui';
import { ModuleHero } from '@/components/modules';
import { Globe } from 'lucide-react';
import { AtlasMainNav } from '@/modules/atlas';
import { AtlasSearchBar } from '@/modules/atlas';
import { useGetPlaces } from '@go2asia/sdk/atlas';
import { useMemo, useState } from 'react';

export function PlacesClient() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  
  // Загружаем места из API
  const { 
    data: placesData, 
    isLoading
  } = useGetPlaces({
    limit: 20,
    cursor,
  });

  // Преобразуем данные из API
  const places = useMemo(() => {
    if (!placesData?.items) return [];
    return placesData.items.map((place) => ({
      id: place.id,
      title: place.name,
      description: place.description || '',
      cityId: place.cityId,
      categories: place.categories || [],
      photos: place.photos || [],
      // TODO: Get city name from cityId when API supports it
      // TODO: Get country name when API supports it
      // TODO: Get rating when API supports it
      // TODO: Get reviews count when API supports it
    }));
  }, [placesData]);

  // Показываем состояние загрузки
  if (isLoading && !placesData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ModuleHero
          icon={Globe}
          title="Atlas Asia"
          description="«Живой» вики-справочник по странам Юго-Восточной Азии с UGC и редакционной поддержкой"
          gradientFrom="from-sky-500"
          gradientTo="to-sky-600"
        />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <AtlasMainNav />
          <AtlasSearchBar />
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-12 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title="Atlas Asia"
        description="«Живой» вики-справочник по странам Юго-Восточной Азии с UGC и редакционной поддержкой"
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Top controls: internal nav + search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <AtlasMainNav />
        <AtlasSearchBar />
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip>Все типы</Chip>
          <Chip>Природа</Chip>
          <Chip>Храмы</Chip>
          <Chip>Рынки</Chip>
          <Chip>Парки</Chip>
          <Chip>Viewpoint</Chip>
          <Chip>Пляжи</Chip>
          <Chip>Музеи</Chip>
        </div>
      </section>

      {/* Places Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-6">
          Топовые места
        </h2>
        {places.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <Link key={place.id} href={`/atlas/places/${place.id}`}>
                  <Card hover className="h-full overflow-hidden p-0 !border-0">
                    {place.photos && place.photos.length > 0 ? (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={place.photos[0]}
                          alt={place.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          {/* TODO: Add partner badge when API supports it */}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{place.title}</h3>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{place.title}</h3>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      {place.description && (
                        <p className="text-small text-slate-600 mb-3 line-clamp-2">
                          {place.description}
                        </p>
                      )}
                      {place.categories && place.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {place.categories.slice(0, 3).map((category) => (
                            <Chip key={category} size="sm" className="bg-slate-100 text-slate-700">
                              {category}
                            </Chip>
                          ))}
                        </div>
                      )}
                      {/* TODO: Add rating and reviews when API supports it */}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Пагинация */}
            {placesData?.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCursor(placesData.nextCursor || undefined)}
                  disabled={isLoading}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Загрузка...' : 'Загрузить ещё'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">Места не найдены</p>
          </div>
        )}
      </section>
    </div>
  );
}

