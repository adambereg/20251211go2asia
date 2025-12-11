'use client';

import { useState, useMemo } from 'react';
import { Chip } from '@go2asia/ui';
import { AchievementCard } from './AchievementCard';
import type { Achievement, AchievementStatus, ModuleType } from '../types';

interface AchievementsListProps {
  achievements: Achievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  const [selectedStatus, setSelectedStatus] = useState<AchievementStatus | 'all'>('all');
  const [selectedModule, setSelectedModule] = useState<ModuleType | 'all'>('all');

  const filteredAchievements = useMemo(() => {
    let result = [...achievements];

    if (selectedStatus !== 'all') {
      result = result.filter((ach) => ach.status === selectedStatus);
    }

    if (selectedModule !== 'all') {
      result = result.filter((ach) => ach.module === selectedModule);
    }

    return result;
  }, [achievements, selectedStatus, selectedModule]);

  const modules: (ModuleType | 'all')[] = [
    'all',
    'space',
    'atlas',
    'pulse',
    'rf',
    'quest',
    'guru',
  ];

  return (
    <div className="space-y-4">
      {/* Фильтры */}
      <div className="space-y-3">
        {/* По статусу */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Статус</h4>
          <div className="flex flex-wrap gap-2">
            {(['all', 'locked', 'in_progress', 'completed'] as const).map((status) => (
              <Chip
                key={status}
                size="sm"
                selected={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
              >
                {status === 'all'
                  ? 'Все'
                  : status === 'locked'
                    ? 'Заблокированные'
                    : status === 'in_progress'
                      ? 'В процессе'
                      : 'Полученные'}
              </Chip>
            ))}
          </div>
        </div>

        {/* По модулю */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Модуль</h4>
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <Chip
                key={module}
                size="sm"
                selected={selectedModule === module}
                onClick={() => setSelectedModule(module)}
              >
                {module === 'all' ? 'Все' : module}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Список достижений */}
      <div className="space-y-3">
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>Достижения не найдены</p>
            <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
}

