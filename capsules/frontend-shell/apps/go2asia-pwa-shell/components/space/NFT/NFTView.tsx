'use client';

import { useState } from 'react';
import { Card, Chip, Badge } from '@go2asia/ui';
import { Award, Sparkles } from 'lucide-react';
import type { NFTBadge } from '../types';
import { mockBadgesExtended } from '../mockData';

type RarityFilter = 'all' | 'common' | 'rare' | 'epic' | 'legendary';

const RARITY_LABELS = {
  common: 'Обычные',
  rare: 'Редкие',
  epic: 'Эпические',
  legendary: 'Легендарные',
};

const RARITY_COLORS = {
  common: 'bg-slate-100 text-slate-700',
  rare: 'bg-blue-100 text-blue-700',
  epic: 'bg-purple-100 text-purple-700',
  legendary: 'bg-yellow-100 text-yellow-700',
};

export function NFTView() {
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all');

  const filteredBadges = mockBadgesExtended.filter(
    (badge) => rarityFilter === 'all' || badge.rarity === rarityFilter
  );

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Chip
          selected={rarityFilter === 'all'}
          onClick={() => setRarityFilter('all')}
          size="md"
        >
          Все NFT
        </Chip>
        {(['epic', 'rare', 'common'] as const).map((rarity) => (
          <Chip
            key={rarity}
            selected={rarityFilter === rarity}
            onClick={() => setRarityFilter(rarity)}
            size="md"
          >
            {RARITY_LABELS[rarity]}
          </Chip>
        ))}
      </div>

      {/* Коллекция NFT */}
      {filteredBadges.length === 0 ? (
        <Card className="border-2 border-slate-200 p-8">
          <div className="text-center text-slate-500">
            Нет NFT в этой категории
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => (
            <Card
              key={badge.id}
              className="border-2 border-slate-200 p-4 md:p-6 hover:border-sky-300 transition-colors text-center"
            >
              <div className="space-y-3">
                <div className="text-6xl mb-2">{badge.image}</div>
                <h3 className="font-semibold text-slate-900">{badge.name}</h3>
                <p className="text-sm text-slate-600">{badge.description}</p>
                <Badge
                  className={RARITY_COLORS[badge.rarity]}
                  size="md"
                >
                  {RARITY_LABELS[badge.rarity]}
                </Badge>
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                  Получено:{' '}
                  {new Date(badge.earnedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Coming Soon - Mint on-chain */}
      <Card className="border-2 border-slate-200 p-4 md:p-6 bg-slate-50 opacity-60">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-slate-400" />
          <div>
            <h3 className="font-semibold text-slate-900">Mint on-chain</h3>
            <p className="text-sm text-slate-500">Скоро: возможность минтить NFT на блокчейне</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
