'use client';

/**
 * Quest Asia - Quest CTA
 * Кнопка "Начать квест"
 */

import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';
import type { Quest } from '../types';

interface QuestCTAProps {
  quest: Quest;
}

export function QuestCTA({ quest }: QuestCTAProps) {
  const router = useRouter();

  const handleStartQuest = () => {
    // TODO: Сохранить квест в активные и кэшировать
    // Переход на экран прохождения
    router.push(`/quest/${quest.id}/run`);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <button
        onClick={handleStartQuest}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Play className="w-5 h-5" />
        Начать квест
      </button>
      
      <p className="text-xs text-slate-500 text-center mt-3">
        Квест будет сохранён локально для офлайн-прохождения
      </p>
    </div>
  );
}

