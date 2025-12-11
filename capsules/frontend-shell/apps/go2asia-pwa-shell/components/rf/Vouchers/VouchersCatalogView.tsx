'use client';

import { useState, useMemo } from 'react';
import { Ticket } from 'lucide-react';
import { EmptyState, Chip } from '@go2asia/ui';
import { SearchHeader } from '../Catalog/SearchHeader';
import { VoucherGrid } from './VoucherGrid';
import { RFMainNav, RFHero } from '../Shared';
import type { Voucher, PartnerCategory } from '../types';
import { PARTNER_CATEGORY_LABELS } from '../types';
import { mockVouchers } from '../mockData';

interface VouchersCatalogViewProps {
  initialVouchers?: Voucher[];
}

export function VouchersCatalogView({ initialVouchers = mockVouchers }: VouchersCatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<Voucher['type'] | 'all'>('all');

  // Фильтрация ваучеров
  const filteredVouchers = useMemo(() => {
    let result = [...initialVouchers];

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (voucher) =>
          voucher.title.toLowerCase().includes(query) ||
          voucher.description.toLowerCase().includes(query) ||
          voucher.partner.name.toLowerCase().includes(query) ||
          voucher.partner.address.city.toLowerCase().includes(query)
      );
    }

    // Категория партнёра
    if (selectedCategory !== 'all') {
      result = result.filter((voucher) => voucher.partner.category === selectedCategory);
    }

    // Тип ваучера
    if (selectedType !== 'all') {
      result = result.filter((voucher) => voucher.type === selectedType);
    }

    // Только активные ваучеры
    result = result.filter((voucher) => {
      const now = new Date();
      const expiresAt = new Date(voucher.expiresAt);
      return expiresAt > now && voucher.stats.remaining > 0;
    });

    return result;
  }, [initialVouchers, searchQuery, selectedCategory, selectedType]);

  // Группировка по категориям партнёров
  const vouchersByCategory = useMemo(() => {
    const grouped: Record<string, Voucher[]> = {};
    filteredVouchers.forEach((voucher) => {
      const category = voucher.partner.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(voucher);
    });
    return grouped;
  }, [filteredVouchers]);

  // Удалено: vouchersByCategory пока не используется

  const categories: (PartnerCategory | 'all')[] = [
    'all',
    'cafe',
    'restaurant',
    'coworking',
    'market',
    'service',
    'housing',
  ];

  const voucherTypes: (Voucher['type'] | 'all')[] = ['all', 'discount_percent', 'discount_fixed', 'gift'];

  return (
    <div className="min-h-screen bg-slate-50">
      <RFHero subtitle="Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <RFMainNav />
      </div>

      {/* Поиск */}
      <SearchHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
      />

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Фильтры */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {filteredVouchers.length} {filteredVouchers.length === 1 ? 'ваучер' : 'ваучеров'}
            </h2>
          </div>

          {/* Категории */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Категории партнёров</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Chip
                  key={category}
                  selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  size="md"
                >
                  {category === 'all' ? 'Все' : PARTNER_CATEGORY_LABELS[category]}
                </Chip>
              ))}
            </div>
          </div>

          {/* Типы ваучеров */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Типы ваучеров</h3>
            <div className="flex flex-wrap gap-2">
              {voucherTypes.map((type) => (
                <Chip
                  key={type}
                  selected={selectedType === type}
                  onClick={() => setSelectedType(type)}
                  size="md"
                >
                  {type === 'all'
                    ? 'Все'
                    : type === 'discount_percent'
                      ? 'Скидка %'
                      : type === 'discount_fixed'
                        ? 'Фиксированная скидка'
                        : 'Подарок'}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Результаты */}
        {filteredVouchers.length > 0 ? (
          <VoucherGrid vouchers={filteredVouchers} />
        ) : (
          <EmptyState
            icon={<Ticket size={32} />}
            title="Ваучеры не найдены"
            description="Попробуйте изменить параметры поиска или фильтры"
          />
        )}
      </div>
    </div>
  );
}

