'use client';

/**
 * Quest Asia - Quest Card
 * Универсальная карточка квеста
 */

import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Trophy, Zap } from 'lucide-react';
import type { Quest } from './types';
import { QUEST_TYPE_LABELS, DIFFICULTY_LABELS, QUEST_TYPE_COLORS, DIFFICULTY_COLORS } from './types';

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  return (
    <Link
      href={`/quest/${quest.id}`}
      className="group relative overflow-hidden rounded-xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all bg-white"
    >
      {/* Обложка */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={quest.coverPhoto}
          alt={quest.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {quest.badges.map((badge, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-semibold rounded-md bg-white/90 backdrop-blur-sm text-slate-900"
            >
              {badge.label}
            </span>
          ))}
        </div>
        
        {/* Тип квеста */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-semibold text-white"
          style={{ backgroundColor: QUEST_TYPE_COLORS[quest.type] }}
        >
          {QUEST_TYPE_LABELS[quest.type]}
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {quest.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {quest.description}
        </p>

        {/* Метаданные */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{quest.duration} мин</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{quest.city}</span>
          </div>
          
          <div
            className="px-2 py-1 rounded text-xs font-semibold"
            style={{
              backgroundColor: `${DIFFICULTY_COLORS[quest.difficulty]}20`,
              color: DIFFICULTY_COLORS[quest.difficulty],
            }}
          >
            {DIFFICULTY_LABELS[quest.difficulty]}
          </div>
        </div>

        {/* Награды */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-900">
              {quest.rewards.points} очков
            </span>
          </div>
          
          {quest.rewards.nftBadges.length > 0 && (
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-slate-600">NFT</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

