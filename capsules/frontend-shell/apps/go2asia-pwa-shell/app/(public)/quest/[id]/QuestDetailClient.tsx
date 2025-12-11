'use client';

/**
 * Quest Asia - Quest Detail Client Component
 * Детальная страница квеста
 */

import { QuestHeader } from '@/components/quest/QuestDetail/QuestHeader';
import { QuestAbout } from '@/components/quest/QuestDetail/QuestAbout';
import { QuestRewards } from '@/components/quest/QuestDetail/QuestRewards';
import { QuestSteps } from '@/components/quest/QuestDetail/QuestSteps';
import { QuestCTA } from '@/components/quest/QuestDetail/QuestCTA';
import type { Quest } from '@/components/quest/types';

interface QuestDetailClientProps {
  quest: Quest;
}

export function QuestDetailClient({ quest }: QuestDetailClientProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <QuestHeader quest={quest} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-8">
            <QuestAbout quest={quest} />
            <QuestSteps quest={quest} />
          </div>

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <QuestRewards quest={quest} />
              <QuestCTA quest={quest} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

