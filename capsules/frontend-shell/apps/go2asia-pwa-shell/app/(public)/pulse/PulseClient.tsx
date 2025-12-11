'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CalendarView } from '@/components/pulse';
import { Event, EventFilters } from '@/components/pulse/types';

interface PulseClientProps {
  events: Event[];
}

// Утилита для парсинга фильтров из URL
function parseFiltersFromURL(searchParams: URLSearchParams): EventFilters {
  const filters: EventFilters = {};

  const country = searchParams.get('country');
  if (country) filters.country = country;

  const city = searchParams.get('city');
  if (city) filters.city = city;

  const category = searchParams.get('category');
  if (category) filters.category = category;

  const scale = searchParams.get('scale');
  if (scale && ['country', 'city', 'place'].includes(scale)) {
    filters.scale = scale as 'country' | 'city' | 'place';
  }

  const price = searchParams.get('price');
  if (price && ['free', 'paid'].includes(price)) {
    filters.price = price as 'free' | 'paid';
  }

  const language = searchParams.get('language');
  if (language && ['ru', 'en', 'local'].includes(language)) {
    filters.language = language as 'ru' | 'en' | 'local';
  }

  const timeFilter = searchParams.get('time');
  if (timeFilter && ['today', 'tomorrow', 'weekend'].includes(timeFilter)) {
    filters.timeFilter = timeFilter as 'today' | 'tomorrow' | 'weekend';
  }

  const search = searchParams.get('search');
  if (search) filters.search = search;

  return filters;
}

// Утилита для обновления URL с фильтрами
function updateURLWithFilters(router: ReturnType<typeof useRouter>, filters: EventFilters) {
  const params = new URLSearchParams();

  if (filters.country) params.set('country', filters.country);
  if (filters.city) params.set('city', filters.city);
  if (filters.category) params.set('category', filters.category);
  if (filters.scale) params.set('scale', filters.scale);
  if (filters.price) params.set('price', filters.price);
  if (filters.language) params.set('language', filters.language);
  if (filters.timeFilter) params.set('time', filters.timeFilter);
  if (filters.search) params.set('search', filters.search);

  const queryString = params.toString();
  const newUrl = queryString ? `/pulse?${queryString}` : '/pulse';
  
  router.replace(newUrl, { scroll: false });
}

export function PulseClient({ events }: PulseClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [filters, setFilters] = useState<EventFilters>(() => 
    parseFiltersFromURL(searchParams)
  );

  // Синхронизируем фильтры с URL при изменении searchParams
  useEffect(() => {
    const urlFilters = parseFiltersFromURL(searchParams);
    setFilters(urlFilters);
  }, [searchParams]);

  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
    updateURLWithFilters(router, newFilters);
  };

  const handleEventClick = (event: Event) => {
    router.push(`/pulse/${event.id}`);
  };

  return (
    <CalendarView
      events={events}
      initialView="month"
      filters={filters}
      onFiltersChange={handleFiltersChange}
      onEventClick={handleEventClick}
    />
  );
}

