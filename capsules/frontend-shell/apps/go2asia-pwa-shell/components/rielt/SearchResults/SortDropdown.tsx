'use client';

/**
 * Rielt.Market Asia - SortDropdown
 * Выпадающий список сортировок
 */

import { ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '../types';
import type { SearchFilters } from '../types';

interface SortDropdownProps {
  value: SearchFilters['sortBy'];
  onChange: (value: SearchFilters['sortBy']) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentOption = SORT_OPTIONS.find((opt) => opt.value === value) || SORT_OPTIONS[0];

  return (
    <div className="relative">
      <select
        value={value || 'recommended'}
        onChange={(e) => onChange(e.target.value as SearchFilters['sortBy'])}
        className="appearance-none px-4 py-2 pr-8 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white font-medium text-slate-700"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}



















