'use client';

/**
 * Quest Asia - Quest Header
 * Обложка и краткий питч квеста
 */

import Image from 'next/image';
import type { Quest } from '../types';
import { QUEST_TYPE_LABELS, QUEST_TYPE_COLORS } from '../types';

interface QuestHeaderProps {
  quest: Quest;
}

export function QuestHeader({ quest }: QuestHeaderProps) {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      <Image
        src={quest.coverPhoto}
        alt={quest.title}
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Контент */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Бейджи */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quest.badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-semibold rounded-md bg-white/90 backdrop-blur-sm text-slate-900"
              >
                {badge.label}
              </span>
            ))}
            <span
              className="px-3 py-1 text-sm font-semibold rounded-md text-white"
              style={{ backgroundColor: QUEST_TYPE_COLORS[quest.type] }}
            >
              {QUEST_TYPE_LABELS[quest.type]}
            </span>
          </div>
          
          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {quest.title}
          </h1>
          
          {/* Описание */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            {quest.description}
          </p>
        </div>
      </div>
    </div>
  );
}

