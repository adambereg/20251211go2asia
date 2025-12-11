'use client';

import { Chip } from '@go2asia/ui';
import { PARTNER_CATEGORY_LABELS, type PartnerCategory } from '../types';

interface FilterChipsProps {
  selectedCategory?: PartnerCategory | 'all';
  onCategoryChange: (category: PartnerCategory | 'all') => void;
  selectedFilters?: {
    hasVoucher?: boolean;
    verified?: boolean;
    openNow?: boolean;
    kidFriendly?: boolean;
    wifi?: boolean;
    outlets?: boolean;
  };
  onFilterChange?: (filter: string, value: boolean) => void;
}

const CATEGORIES: (PartnerCategory | 'all')[] = [
  'all',
  'cafe',
  'restaurant',
  'coworking',
  'market',
  'service',
  'housing',
];

export function FilterChips({
  selectedCategory = 'all',
  onCategoryChange,
  selectedFilters = {},
  onFilterChange,
}: FilterChipsProps) {
  return (
    <div className="space-y-4">
      {/* Категории */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Категории</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onClick={() => onCategoryChange(category)}
              size="md"
            >
              {category === 'all' ? 'Все' : PARTNER_CATEGORY_LABELS[category]}
            </Chip>
          ))}
        </div>
      </div>

      {/* Дополнительные фильтры */}
      {onFilterChange && (
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Фильтры</h4>
          <div className="flex flex-wrap gap-2">
            <Chip
              selected={selectedFilters.hasVoucher || false}
              onClick={() => onFilterChange('hasVoucher', !selectedFilters.hasVoucher)}
              size="md"
            >
              Есть ваучер
            </Chip>
            <Chip
              selected={selectedFilters.verified || false}
              onClick={() => onFilterChange('verified', !selectedFilters.verified)}
              size="md"
            >
              Проверено PRO
            </Chip>
            <Chip
              selected={selectedFilters.openNow || false}
              onClick={() => onFilterChange('openNow', !selectedFilters.openNow)}
              size="md"
            >
              Открыто сейчас
            </Chip>
            <Chip
              selected={selectedFilters.kidFriendly || false}
              onClick={() => onFilterChange('kidFriendly', !selectedFilters.kidFriendly)}
              size="md"
            >
              Подходит семьям
            </Chip>
            <Chip
              selected={selectedFilters.wifi || false}
              onClick={() => onFilterChange('wifi', !selectedFilters.wifi)}
              size="md"
            >
              Wi-Fi
            </Chip>
            <Chip
              selected={selectedFilters.outlets || false}
              onClick={() => onFilterChange('outlets', !selectedFilters.outlets)}
              size="md"
            >
              Розетки
            </Chip>
          </div>
        </div>
      )}
    </div>
  );
}


