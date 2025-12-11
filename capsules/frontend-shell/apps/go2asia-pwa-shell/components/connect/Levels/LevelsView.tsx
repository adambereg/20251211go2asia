'use client';

import { ConnectHero, ConnectNav } from '../Shared';
import { LevelProgress } from './LevelProgress';
import { AchievementsList } from './AchievementsList';
import type { LevelsData } from '../types';
import { mockLevelsData } from '../mockData';

interface LevelsViewProps {
  initialData?: LevelsData;
}

export function LevelsView({ initialData = mockLevelsData }: LevelsViewProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <ConnectNav />
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Прогресс уровня */}
        <LevelProgress level={initialData.level} />

        {/* Достижения */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Достижения</h2>
          <AchievementsList achievements={initialData.achievements} />
        </div>
      </div>
    </div>
  );
}

