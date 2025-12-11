'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGetCities } from '@go2asia/sdk/atlas';
import { useGetCountryById } from '@go2asia/sdk/atlas';
import { Skeleton } from '@go2asia/ui';
import { MapPin } from 'lucide-react';

export default function CountryCitiesPage() {
  const params = useParams();
  const countryId = params?.id as string;

  // Загружаем данные страны для получения названия
  const { data: countryData } = useGetCountryById(countryId || '');

  // Загружаем города страны из API
  const { 
    data: citiesData, 
    isLoading 
  } = useGetCities({
    limit: 50,
    countryId: countryId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  const cities = citiesData?.items || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Города</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4 space-y-4">
          {cities.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {countryData?.name ? `Города ${countryData.name}` : 'Города'}
              </h3>
              <div className="space-y-3">
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/atlas/cities/${city.id}`}
                    className="block rounded-lg border border-slate-200 p-3 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                  >
                    <div className="font-semibold text-slate-900 mb-1">{city.name}</div>
                    {city.description && (
                      <div className="text-sm text-slate-600 mb-2">
                        {city.description}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      {city.placesCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {city.placesCount} мест
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-600">
              Города не найдены
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

