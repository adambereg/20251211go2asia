'use client';

/**
 * Quest Asia - NFT Badge Display
 * Отображение NFT-бейджа
 */

import { useState } from 'react';
import { Sparkles, Award, Share2 } from 'lucide-react';
import type { NFTBadge, NFTBadgeRarity } from '@/components/quest/types';

interface NFTBadgeDisplayProps {
  badge: NFTBadge;
}

const RARITY_COLORS: Record<NFTBadgeRarity, string> = {
  common: 'from-slate-400 to-slate-500',
  rare: 'from-blue-400 to-blue-500',
  epic: 'from-purple-400 to-purple-500',
  legendary: 'from-amber-400 to-amber-500',
};

const RARITY_LABELS: Record<NFTBadgeRarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
};

export function NFTBadgeDisplay({ badge }: NFTBadgeDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Я получил NFT-бейдж "${badge.name}" в Go2Asia!`,
        text: badge.description,
        url: window.location.href,
      });
    } else {
      // Fallback: копируем в буфер обмена
      navigator.clipboard.writeText(
        `Я получил NFT-бейдж "${badge.name}" в Go2Asia! ${badge.description}`
      );
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 border-slate-200 p-6 transition-all hover:shadow-lg ${
        isHovered ? 'scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Изображение бейджа */}
      <div className="relative mb-4">
        <div
          className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${RARITY_COLORS[badge.rarity]} p-1 shadow-lg`}
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {badge.image ? (
              <img
                src={badge.image}
                alt={badge.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Award className="w-12 h-12 text-slate-400" />
            )}
          </div>
        </div>
        {isHovered && (
          <button
            onClick={handleShare}
            className="absolute top-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
            aria-label="Поделиться"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Информация о бейдже */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-900">{badge.name}</h3>
        </div>
        <p className="text-sm text-slate-600 mb-3">{badge.description}</p>
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${RARITY_COLORS[badge.rarity]} text-white`}
        >
          {RARITY_LABELS[badge.rarity]}
        </div>
      </div>
    </div>
  );
}

