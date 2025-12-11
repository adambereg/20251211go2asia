'use client';

/**
 * Rielt.Market Asia - Home Client Component
 * Главная страница с поиском и секциями контента
 */

import { useState } from 'react';
import { SearchBar } from '@/components/rielt/SearchBar';
import { QuickFilters } from '@/components/rielt/QuickFilters';
import { PopularCities } from '@/components/rielt/PopularCities';
import { EditorPicks } from '@/components/rielt/EditorPicks';
import { NewListings } from '@/components/rielt/NewListings';
import type { SearchFilters } from '@/components/rielt/types';

export function RieltHomeClient() {
  const [filters, setFilters] = useState<SearchFilters>({
    rentalType: 'short-term',
  });

  const handleSearch = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Переход на страницу результатов поиска
    const params = new URLSearchParams();
    if (updatedFilters.location?.city) {
      params.set('city', updatedFilters.location.city);
    }
    if (updatedFilters.checkIn) {
      params.set('checkIn', updatedFilters.checkIn);
    }
    if (updatedFilters.checkOut) {
      params.set('checkOut', updatedFilters.checkOut);
    }
    if (updatedFilters.guests) {
      params.set('guests', updatedFilters.guests.toString());
    }
    if (updatedFilters.rentalType) {
      params.set('rentalType', updatedFilters.rentalType);
    }
    
    window.location.href = `/rielt/search?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Поисковая строка */}
      <section className="mb-8">
        <SearchBar onSearch={handleSearch} initialFilters={filters} />
      </section>

      {/* Быстрые фильтры */}
      <section className="mb-8">
        <QuickFilters
          filters={filters}
          onChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
        />
      </section>

      {/* Популярные города */}
      <section className="mb-12">
        <PopularCities />
      </section>

      {/* Подборки редакции */}
      <section className="mb-12">
        <EditorPicks />
      </section>

      {/* Новое на этой неделе */}
      <section className="mb-12">
        <NewListings />
      </section>
    </div>
  );
}

