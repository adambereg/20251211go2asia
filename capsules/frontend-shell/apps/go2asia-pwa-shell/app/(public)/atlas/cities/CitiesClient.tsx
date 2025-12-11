'use client';

import Link from 'next/link';
import { Card, CardContent, Skeleton, SkeletonCard } from '@go2asia/ui';
import { ModuleHero } from '@/components/modules';
import { Globe, MapPin, Building2 } from 'lucide-react';
import { AtlasMainNav } from '@/modules/atlas';
import { AtlasSearchBar } from '@/modules/atlas';
import { useGetCities } from '@go2asia/sdk/atlas';
import { useMemo, useState } from 'react';

export function CitiesClient() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  
  // Загружаем города из API
  const { 
    data: citiesData, 
    isLoading
  } = useGetCities({
    limit: 50,
    cursor,
  });

  // Преобразуем данные из API
  const cities = useMemo(() => {
    if (!citiesData?.items) return [];
    return citiesData.items.map((city) => ({
      id: city.id,
      name: city.name,
      countryId: city.countryId,
      description: city.description || '',
      placesCount: city.placesCount || 0,
    }));
  }, [citiesData]);

  // Показываем состояние загрузки
  if (isLoading && !citiesData) {
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

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-slate-600" />
          <h2 className="text-h2 md:text-3xl font-bold text-slate-900">
            Города
          </h2>
        </div>
        
        {cities.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link key={city.id} href={`/atlas/cities/${city.id}`}>
                  <Card hover className="h-full overflow-hidden p-0 !border-0">
                    <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      {city.description && (
                        <p className="text-small text-slate-600 mb-3 line-clamp-2">
                          {city.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} className="flex-shrink-0" />
                        <span>
                          {city.placesCount || 0} мест
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Пагинация */}
            {citiesData?.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCursor(citiesData.nextCursor || undefined)}
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
            <p className="text-slate-600">Города не найдены</p>
          </div>
        )}
      </section>
    </div>
  );
}

