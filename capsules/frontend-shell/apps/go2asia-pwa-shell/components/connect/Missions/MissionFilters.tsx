'use client';

import { Chip } from '@go2asia/ui';
import type { ModuleType, MissionType, MissionStatus } from '../types';

interface MissionFiltersProps {
  selectedModule: ModuleType | 'all';
  selectedType: MissionType | 'all';
  selectedStatus: MissionStatus | 'all';
  onModuleChange: (module: ModuleType | 'all') => void;
  onTypeChange: (type: MissionType | 'all') => void;
  onStatusChange: (status: MissionStatus | 'all') => void;
}

export function MissionFilters({
  selectedModule,
  selectedType,
  selectedStatus,
  onModuleChange,
  onTypeChange,
  onStatusChange,
}: MissionFiltersProps) {
  const modules: (ModuleType | 'all')[] = [
    'all',
    'space',
    'atlas',
    'pulse',
    'rf',
    'quest',
    'guru',
  ];

  const types: (MissionType | 'all')[] = ['all', 'daily', 'weekly', 'seasonal'];

  const statuses: (MissionStatus | 'all')[] = ['all', 'new', 'in_progress', 'completed', 'expired'];

  return (
    <div className="space-y-3 mb-6">
      {/* По модулю */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Модуль</h4>
        <div className="flex flex-wrap gap-2">
          {modules.map((module) => (
            <Chip
              key={module}
              size="sm"
              selected={selectedModule === module}
              onClick={() => onModuleChange(module)}
            >
              {module === 'all' ? 'Все' : module}
            </Chip>
          ))}
        </div>
      </div>

      {/* По типу */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Тип</h4>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <Chip
              key={type}
              size="sm"
              selected={selectedType === type}
              onClick={() => onTypeChange(type)}
            >
              {type === 'all'
                ? 'Все'
                : type === 'daily'
                  ? 'Дневные'
                  : type === 'weekly'
                    ? 'Недельные'
                    : 'Сезонные'}
            </Chip>
          ))}
        </div>
      </div>

      {/* По статусу */}
      <div>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Статус</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Chip
              key={status}
              size="sm"
              selected={selectedStatus === status}
              onClick={() => onStatusChange(status)}
            >
              {status === 'all'
                ? 'Все'
                : status === 'new'
                  ? 'Новые'
                  : status === 'in_progress'
                    ? 'В процессе'
                    : status === 'completed'
                      ? 'Завершённые'
                      : 'Просроченные'}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

