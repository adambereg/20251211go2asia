'use client';

/**
 * Rielt.Market Asia - FiltersPanel
 * Панель фильтров (sticky сверху)
 */

import { X } from 'lucide-react';
import type { SearchFilters } from '../types';

interface FiltersPanelProps {
  filters: Partial<SearchFilters>;
  onChange: (filters: Partial<SearchFilters>) => void;
}

export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const handleRemoveFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onChange(newFilters);
  };

  const activeFilters: Array<{ key: keyof SearchFilters; label: string }> = [];

  if (filters.location?.city) {
    activeFilters.push({ key: 'location', label: `Город: ${filters.location.city}` });
  }
  if (filters.rentalType) {
    activeFilters.push({
      key: 'rentalType',
      label: filters.rentalType === 'short-term' ? 'Краткосрочно' : 'Долгосрочно',
    });
  }
  if (filters.amenities?.workspace) {
    activeFilters.push({ key: 'amenities', label: 'Рабочее место' });
  }
  if (filters.amenities?.wifi) {
    activeFilters.push({ key: 'amenities', label: 'Wi-Fi' });
  }
  if (filters.amenities?.childFriendly) {
    activeFilters.push({ key: 'amenities', label: 'Для детей' });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter, index) => (
        <button
          key={index}
          onClick={() => handleRemoveFilter(filter.key)}
          className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg font-medium flex items-center gap-2 hover:bg-emerald-200 transition-colors"
        >
          {filter.label}
          <X className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}



















