'use client';

/**
 * Guru Asia - Client Component
 * Главный клиентский компонент с Split UI (карта + список)
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Navigation,
  Locate,
  AlertCircle,
  Map as MapIcon,
  List,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@go2asia/ui';

// Компоненты Guru (динамический импорт карты для SSR)
const GuruMapView = dynamic(
  () => import('@/components/guru/GuruMapView'),
  { ssr: false, loading: () => <MapSkeleton /> }
);

import { GuruFiltersComponent as GuruFilters } from '@/components/guru/GuruFilters';
import { GuruListView } from '@/components/guru/GuruListView';
import { useGeolocation } from '@/components/guru/hooks/useGeolocation';

// Типы и утилиты
import type {
  GuruFilters as GuruFiltersType,
  GuruObjectWithDistance,
  Coordinates,
} from '@/components/guru/types';
import { DEFAULT_FILTERS } from '@/components/guru/types';
import { mockObjects, DEFAULT_CENTER } from '@/components/guru/mockObjects';
import { addDistanceToObjects } from '@/components/guru/utils/geo';
import { applyFilters, queryStringToFilters, filtersToQueryString } from '@/components/guru/utils/filters';
import { applySorting } from '@/components/guru/utils/ranking';

// =============================================================================
// Скелетон карты
// =============================================================================

const MapSkeleton: React.FC = () => (
  <div className="w-full h-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
    <MapIcon className="w-12 h-12 text-slate-300" />
  </div>
);

// =============================================================================
// Режим отображения (мобильный)
// =============================================================================

type ViewMode = 'map' | 'list' | 'split';

// =============================================================================
// Основной компонент
// =============================================================================

export const GuruClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Геолокация
  const {
    position: userPosition,
    loading: locationLoading,
    error: locationError,
    requestLocation,
  } = useGeolocation();

  // Состояние
  const [filters, setFilters] = useState<GuruFiltersType>(() => {
    // Инициализация из URL
    const urlFilters = queryStringToFilters(searchParams.toString());
    return { ...DEFAULT_FILTERS, ...urlFilters };
  });
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<ViewMode>('split'); // По умолчанию split (карта + список)
  const [mapExpanded, setMapExpanded] = useState(false);

  // Позиция для карты (пользователь или дефолт)
  const mapCenter: Coordinates = useMemo(() => {
    return userPosition || DEFAULT_CENTER;
  }, [userPosition]);

  // Фильтрация и сортировка объектов
  const filteredObjects: GuruObjectWithDistance[] = useMemo(() => {
    // 1. Добавляем расстояние
    const objectsWithDistance = addDistanceToObjects(mockObjects, mapCenter);

    // 2. Фильтруем по радиусу
    const inRadius = objectsWithDistance.filter(
      (obj) => obj.distance <= filters.radius
    );

    // 3. Применяем фильтры
    const filtered = applyFilters(inRadius, filters);

    // 4. Сортируем
    const sorted = applySorting(filtered, filters.sortMode);

    return sorted;
  }, [mapCenter, filters]);

  // Синхронизация фильтров с URL
  useEffect(() => {
    const queryString = filtersToQueryString(filters);
    const currentQuery = searchParams.toString();

    if (queryString !== currentQuery) {
      router.replace(`/guru${queryString ? `?${queryString}` : ''}`, {
        scroll: false,
      });
    }
  }, [filters, router, searchParams]);

  // Запрос геолокации при монтировании
  useEffect(() => {
    // Небольшая задержка для лучшего UX
    const timer = setTimeout(() => {
      requestLocation();
    }, 500);

    return () => clearTimeout(timer);
  }, [requestLocation]);

  // Обработчики
  const handleFilterChange = useCallback((newFilters: GuruFiltersType) => {
    setFilters(newFilters);
    setSelectedObjectId(null);
  }, []);

  const handleFilterReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSelectedObjectId(null);
  }, []);

  const handleObjectSelect = useCallback((objectId: string) => {
    setSelectedObjectId((prev) => (prev === objectId ? null : objectId));
  }, []);

  const handleCenterOnUser = useCallback(() => {
    if (!userPosition) {
      requestLocation();
    }
  }, [userPosition, requestLocation]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      {/* Заголовок */}
      <header className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {userPosition ? (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <Navigation className="w-4 h-4" />
                Местоположение определено
              </p>
            ) : locationLoading ? (
              <p className="text-sm text-slate-500">Определение местоположения...</p>
            ) : locationError ? (
              <p className="text-sm text-amber-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {locationError.message}
              </p>
            ) : (
              <p className="text-sm text-slate-500">Местоположение не определено</p>
            )}
            <h1 className="text-xl font-bold text-slate-900">Guru Asia</h1>
            <p className="text-sm text-slate-500">
              {filteredObjects.length} объектов в радиусе {filters.radius} м
            </p>
          </div>

          {/* Кнопки управления (мобильные) */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant={mobileView === 'map' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMobileView('map')}
            >
              <MapIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={mobileView === 'list' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMobileView('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Кнопка центрирования */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCenterOnUser}
            className="hidden md:flex"
          >
            <Locate className="w-4 h-4 mr-2" />
            Центрировать
          </Button>
        </div>
      </header>

      {/* Основной контент */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Карта (Desktop: левая колонка 45%, Mobile: верх) */}
        <div
          className={`
            relative
            ${mobileView === 'list' ? 'hidden' : 'block'}
            ${mobileView === 'map' ? 'flex-1' : mapExpanded ? 'h-[60vh]' : 'h-[40vh]'}
            md:h-auto md:w-[45%] md:flex-shrink-0 md:block
          `}
        >
          <GuruMapView
            objects={filteredObjects}
            userPosition={userPosition}
            radius={filters.radius}
            selectedObjectId={selectedObjectId}
            onObjectSelect={handleObjectSelect}
            className="w-full h-full"
          />

          {/* Кнопка расширения карты (мобильная) */}
          {mobileView === 'split' && (
            <button
              type="button"
              onClick={() => setMapExpanded(!mapExpanded)}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 md:hidden
                         bg-white px-4 py-1 rounded-full shadow-md border border-slate-200
                         flex items-center gap-1 text-sm text-slate-600"
            >
              {mapExpanded ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Свернуть карту
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Развернуть карту
                </>
              )}
            </button>
          )}
        </div>

        {/* Правая панель: фильтры + список */}
        <div
          className={`
            flex-1 flex flex-col overflow-hidden bg-slate-50
            ${mobileView === 'map' ? 'hidden' : 'block'}
            md:block
          `}
        >
          {/* Фильтры - компактные на мобильных */}
          <div className="md:p-4 border-b border-slate-200 bg-white md:bg-transparent">
            <GuruFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleFilterReset}
              objectCount={filteredObjects.length}
            />
          </div>

          {/* Список объектов */}
          <div className="flex-1 overflow-y-auto">
            <GuruListView
              objects={filteredObjects}
              selectedObjectId={selectedObjectId}
              sortMode={filters.sortMode}
              onSortChange={(mode) =>
                handleFilterChange({ ...filters, sortMode: mode })
              }
              onObjectSelect={handleObjectSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruClient;

