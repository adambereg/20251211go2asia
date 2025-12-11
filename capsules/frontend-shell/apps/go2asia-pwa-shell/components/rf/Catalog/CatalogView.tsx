'use client';

import { useState, useMemo } from 'react';
import { Handshake, Grid3x3, List } from 'lucide-react';
import { Button, EmptyState } from '@go2asia/ui';
import { SearchHeader } from './SearchHeader';
import { FilterChips } from './FilterChips';
import { PartnerGrid } from './PartnerGrid';
import { SectionsBlock } from './SectionsBlock';
import { RFMainNav, RFHero } from '../Shared';
import type { Partner, PartnerCategory } from '../types';
import { mockPartners } from '../mockData';

interface CatalogViewProps {
  initialPartners?: Partner[];
}

export function CatalogView({ initialPartners = mockPartners }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    hasVoucher: false,
    verified: false,
    openNow: false,
    kidFriendly: false,
    wifi: false,
    outlets: false,
  });

  // Фильтрация партнёров
  const filteredPartners = useMemo(() => {
    let result = [...initialPartners];

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (partner) =>
          partner.name.toLowerCase().includes(query) ||
          partner.address.city.toLowerCase().includes(query) ||
          partner.address.country.toLowerCase().includes(query) ||
          partner.description.toLowerCase().includes(query)
      );
    }

    // Категория
    if (selectedCategory !== 'all') {
      result = result.filter((partner) => partner.category === selectedCategory);
    }

    // Дополнительные фильтры
    if (filters.hasVoucher) {
      result = result.filter((partner) => partner.stats.vouchersReceived > 0);
    }
    if (filters.verified) {
      result = result.filter((partner) => partner.rfStatus.verified);
    }
    if (filters.kidFriendly) {
      result = result.filter((partner) => partner.attributes.kidFriendly);
    }
    if (filters.wifi) {
      result = result.filter((partner) => partner.attributes.wifi);
    }
    if (filters.outlets) {
      result = result.filter((partner) => partner.attributes.outlets);
    }

    return result;
  }, [initialPartners, searchQuery, selectedCategory, filters]);

  // Новые партнёры (созданные за последнюю неделю)
  const newPartners = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return initialPartners
      .filter((p) => new Date(p.createdAt) > weekAgo)
      .slice(0, 6);
  }, [initialPartners]);

  // Подборки PRO (заглушки)
  const proCollections = useMemo(
    () => [
      {
        title: 'Завтраки',
        partners: initialPartners.filter((p) => p.category === 'cafe' || p.category === 'restaurant').slice(0, 3),
      },
      {
        title: 'Рабочие кафе',
        partners: initialPartners.filter((p) => p.attributes.wifi && p.attributes.outlets).slice(0, 3),
      },
      {
        title: 'Семейные',
        partners: initialPartners.filter((p) => p.attributes.kidFriendly).slice(0, 3),
      },
    ],
    [initialPartners]
  );

  const handleFilterChange = (filter: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <RFHero />

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
        {/* Фильтры и режим просмотра */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              {filteredPartners.length} {filteredPartners.length === 1 ? 'партнёр' : 'партнёров'}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 size={16} className="mr-1" />
                Сетка
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List size={16} className="mr-1" />
                Список
              </Button>
            </div>
          </div>

          <FilterChips
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Результаты поиска */}
        {filteredPartners.length > 0 ? (
          <>
            <PartnerGrid partners={filteredPartners} viewMode={viewMode} />
          </>
        ) : (
          <EmptyState
            icon={<Handshake size={32} />}
            title="Партнёры не найдены"
            description="Попробуйте изменить параметры поиска или фильтры"
          />
        )}

        {/* Секции (если нет активного поиска/фильтров) */}
        {!searchQuery && selectedCategory === 'all' && Object.values(filters).every((v) => !v) && (
          <div className="mt-12">
            <SectionsBlock
              newPartners={newPartners}
              proCollections={proCollections}
            />
          </div>
        )}
      </div>
    </div>
  );
}

