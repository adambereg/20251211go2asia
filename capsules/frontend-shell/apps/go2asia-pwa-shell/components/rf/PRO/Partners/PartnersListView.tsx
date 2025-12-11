'use client';

import { Card, CardContent, Badge, Button } from '@go2asia/ui';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { VerifiedBadge } from '../../Shared';
import { mockPartners } from '../../mockData';
import { PARTNER_CATEGORY_LABELS } from '../../types';
import type { PartnerCategory } from '../../types';

export function PartnersListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'pending'>('all');

  // В реальном приложении здесь будет загрузка партнёров текущего PRO-куратора
  let partners = mockPartners;

  // Фильтрация
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    partners = partners.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.address.city.toLowerCase().includes(query)
    );
  }

  if (selectedCategory !== 'all') {
    partners = partners.filter((p) => p.category === selectedCategory);
  }

  if (verificationFilter === 'verified') {
    partners = partners.filter((p) => p.rfStatus.verified);
  } else if (verificationFilter === 'pending') {
    partners = partners.filter((p) => !p.rfStatus.verified);
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Мои партнёры</h1>
        <p className="text-slate-600">Управляйте партнёрами и отслеживайте их статус</p>
      </div>

      {/* Поиск и фильтры */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по названию или городу..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            Все категории
          </Button>
          {(['cafe', 'restaurant', 'coworking', 'market'] as PartnerCategory[]).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {PARTNER_CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={verificationFilter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setVerificationFilter('all')}
          >
            Все статусы
          </Button>
          <Button
            variant={verificationFilter === 'verified' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setVerificationFilter('verified')}
          >
            Проверено PRO
          </Button>
          <Button
            variant={verificationFilter === 'pending' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setVerificationFilter('pending')}
          >
            Ожидает проверки
          </Button>
        </div>
      </div>

      {/* Таблица партнёров */}
      <div className="space-y-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={`/rf/${partner.id}`}>
                      <h3 className="font-semibold text-slate-900 hover:text-purple-600">
                        {partner.name}
                      </h3>
                    </Link>
                    {partner.rfStatus.verified && <VerifiedBadge />}
                    <Badge variant="info">{PARTNER_CATEGORY_LABELS[partner.category]}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    {partner.address.city}, {partner.address.country} • Рейтинг:{' '}
                    {partner.stats.rating.toFixed(1)} ({partner.stats.reviewsCount} отзывов)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!partner.rfStatus.verified && (
                    <Link href={`/rf/pro/verifications?partner=${partner.id}`}>
                      <Button variant="primary" size="sm">
                        Проверить
                      </Button>
                    </Link>
                  )}
                  <Link href={`/rf/${partner.id}`}>
                    <Button variant="secondary" size="sm">
                      Открыть
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

