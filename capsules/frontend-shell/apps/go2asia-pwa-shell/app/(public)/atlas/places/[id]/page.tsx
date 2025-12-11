'use client';

import { useParams } from 'next/navigation';
import { useGetPlaceById } from '@go2asia/sdk/atlas';
import { Skeleton } from '@go2asia/ui';

export default function PlaceOverviewPage() {
  const params = useParams();
  const placeId = params?.id as string;

  const { 
    data: placeData, 
    isLoading 
  } = useGetPlaceById(placeId || '');

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!placeData) {
    return (
      <div className="text-center py-12 text-slate-600">
        Данные о месте не найдены.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Обзор</h2>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Описание */}
        <div className="px-4 py-4 text-sm text-slate-700 space-y-2">
          <p>
            {placeData.description || 'Нет описания.'}
          </p>
        </div>

        {/* Ключевая информация */}
        <div className="border-t border-slate-100 px-4 py-4">
          <h3 className="font-semibold text-slate-900 mb-3">Ключевая информация</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {placeData.type && (
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  Тип
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  {placeData.type}
                </div>
              </div>
            )}
            {placeData.latitude && placeData.longitude && (
              <>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Широта
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {placeData.latitude.toFixed(4)}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 px-4 py-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    Долгота
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {placeData.longitude.toFixed(4)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Категории */}
        {placeData.categories && placeData.categories.length > 0 && (
          <div className="border-t border-slate-100 px-4 py-4">
            <h3 className="font-semibold text-slate-900 mb-3">Категории</h3>
            <div className="flex flex-wrap gap-2">
              {placeData.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Метаданные */}
        <div className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          Последнее обновление: {placeData.updatedAt ? new Date(placeData.updatedAt).toLocaleDateString('ru-RU') : 'Неизвестно'}
        </div>
      </section>
    </div>
  );
}
