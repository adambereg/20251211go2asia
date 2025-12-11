'use client';

import { useParams } from 'next/navigation';
import { useGetCountryById } from '@go2asia/sdk/atlas';
import { Skeleton } from '@go2asia/ui';

export default function CountryOverviewPage() {
  const params = useParams();
  const countryId = params?.id as string;

  // Загружаем данные страны из API
  // enabled обрабатывается автоматически внутри hook (проверка на пустой id)
  const { 
    data: countryData, 
    isLoading 
  } = useGetCountryById(countryId || '');

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

  if (!countryData) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Обзор</h2>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          <p className="text-slate-600">Данные о стране не найдены.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Обзор</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* TL;DR полоса */}
        {countryData.description && (
          <div className="border-b border-slate-100 bg-sky-50 px-4 py-3 text-sm text-slate-800">
            {countryData.description}
          </div>
        )}

        {/* Основное описание */}
        {countryData.description && (
          <div className="px-4 py-4 text-sm text-slate-700 space-y-2">
            <p>{countryData.description}</p>
          </div>
        )}

        {/* Ключевые цифры */}
        <div className="grid gap-3 border-t border-slate-100 px-4 py-4 text-sm text-slate-800 sm:grid-cols-3">
          {countryData.code && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                ISO код
              </div>
              <div className="mt-1 font-semibold">{countryData.code}</div>
            </div>
          )}
          {countryData.citiesCount !== undefined && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Городов
              </div>
              <div className="mt-1 font-semibold">{countryData.citiesCount}</div>
            </div>
          )}
          {countryData.placesCount !== undefined && (
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Мест
              </div>
              <div className="mt-1 font-semibold">{countryData.placesCount}</div>
            </div>
          )}
        </div>

        {/* Метаданные */}
        {countryData.updatedAt && (
          <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            Последнее обновление: {new Date(countryData.updatedAt).toLocaleDateString('ru-RU')}
          </div>
        )}
      </section>
    </div>
  );
}
