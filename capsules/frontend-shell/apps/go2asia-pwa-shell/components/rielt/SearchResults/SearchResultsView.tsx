'use client';

/**
 * Rielt.Market Asia - SearchResultsView
 * Главный компонент страницы результатов поиска (split layout)
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ListingsList } from './ListingsList';
import { FiltersPanel } from './FiltersPanel';
import { SortDropdown } from './SortDropdown';
import type { ListingWithDistance, SearchFilters } from '../types';

// Динамический импорт карты с отключением SSR, так как Leaflet использует window
const ListingsMap = dynamic(() => import('./ListingsMap').then((mod) => ({ default: mod.ListingsMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-full rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
      <p className="text-slate-500">Загрузка карты...</p>
    </div>
  ),
});

interface SearchResultsViewProps {
  listings: ListingWithDistance[];
  filters: Partial<SearchFilters>;
  userLocation: { lat: number; lng: number } | null;
}

export function SearchResultsView({
  listings,
  filters: initialFilters,
  userLocation,
}: SearchResultsViewProps) {
  const [filters, setFilters] = useState<Partial<SearchFilters>>(initialFilters);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Заголовок и сортировка */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {listings.length} {listings.length === 1 ? 'объявление' : 'объявлений'}
          </h1>
          {filters.location?.city && (
            <p className="text-slate-600 mt-1">в {filters.location.city}</p>
          )}
        </div>
        <SortDropdown
          value={filters.sortBy || 'recommended'}
          onChange={(sortBy) => setFilters({ ...filters, sortBy })}
        />
      </div>

      {/* Фильтры (sticky сверху) */}
      <div className="sticky top-16 z-10 bg-white border-b border-slate-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6">
        <FiltersPanel filters={filters} onChange={setFilters} />
      </div>

      {/* Split layout: List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Список объявлений */}
        <div className="lg:col-span-1">
          <ListingsList
            listings={listings}
            selectedId={selectedListingId}
            onSelect={setSelectedListingId}
          />
        </div>

        {/* Карта */}
        <div className="lg:col-span-1 lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)]">
          <ListingsMap
            listings={listings}
            userLocation={userLocation}
            selectedId={selectedListingId}
            onSelect={setSelectedListingId}
          />
        </div>
      </div>
    </div>
  );
}

