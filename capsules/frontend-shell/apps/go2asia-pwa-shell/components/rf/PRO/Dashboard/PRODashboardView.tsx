'use client';

import { ProgressCards } from './ProgressCards';
import { ActivePartners } from './ActivePartners';
import { RewardsSummary } from './RewardsSummary';
import { mockPROCurator } from '../../mockData';

export function PRODashboardView() {
  // В реальном приложении здесь будет загрузка данных текущего PRO-куратора
  const curator = mockPROCurator;

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Добро пожаловать, PRO-куратор!
        </h1>
        <p className="text-slate-600">
          Управляйте партнёрами, проводите проверки и отслеживайте вознаграждения
        </p>
      </div>

      {/* Карточки прогресса */}
      <ProgressCards curator={curator} />

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivePartners />
        <RewardsSummary curator={curator} />
      </div>
    </div>
  );
}

