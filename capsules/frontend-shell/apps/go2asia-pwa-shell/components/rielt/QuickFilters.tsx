'use client';

/**
 * Rielt.Market Asia - QuickFilters
 * Быстрые фильтры-чипы
 */

import { CheckCircle } from 'lucide-react';
import type { SearchFilters } from './types';

interface QuickFiltersProps {
  filters: SearchFilters;
  onChange: (filters: Partial<SearchFilters>) => void;
}

const QUICK_FILTERS = [
  { key: 'onlyRF', label: 'Только RF', icon: CheckCircle },
  { key: 'onlyPROVerified', label: 'Проверено PRO', icon: CheckCircle },
  { key: 'availableToday', label: 'Сегодня заселение', icon: CheckCircle },
  { key: 'instantBooking', label: 'Мгновенное бронирование', icon: CheckCircle },
] as const;

export function QuickFilters({ filters, onChange }: QuickFiltersProps) {
  const handleToggle = (key: keyof SearchFilters) => {
    const currentValue = filters[key];
    onChange({ [key]: !currentValue });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_FILTERS.map((filter) => {
        const Icon = filter.icon;
        const isActive = filters[filter.key as keyof SearchFilters] === true;

        return (
          <button
            key={filter.key}
            onClick={() => handleToggle(filter.key as keyof SearchFilters)}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isActive
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

