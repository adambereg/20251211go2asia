'use client';

import { useState, useMemo } from 'react';
import { ConnectHero, ConnectNav } from '../Shared';
import { Card } from '@go2asia/ui';
import { MissionCard } from './MissionCard';
import { MissionFilters } from './MissionFilters';
import { QuickStart } from './QuickStart';
import type { MissionsData, ModuleType, MissionType, MissionStatus } from '../types';
import { mockMissionsData } from '../mockData';

interface MissionsViewProps {
  initialData?: MissionsData;
}

export function MissionsView({ initialData = mockMissionsData }: MissionsViewProps) {
  const [selectedModule, setSelectedModule] = useState<ModuleType | 'all'>('all');
  const [selectedType, setSelectedType] = useState<MissionType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<MissionStatus | 'all'>('all');

  const filteredMissions = useMemo(() => {
    let result = [...initialData.missions];

    if (selectedModule !== 'all') {
      result = result.filter((mission) => mission.module === selectedModule);
    }

    if (selectedType !== 'all') {
      result = result.filter((mission) => mission.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      result = result.filter((mission) => mission.status === selectedStatus);
    }

    return result;
  }, [initialData.missions, selectedModule, selectedType, selectedStatus]);

  const handleStart = (deeplink: string) => {
    window.location.href = deeplink;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <ConnectNav />
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Миссии</h1>
          <p className="text-slate-600 mt-1">
            Выполняйте задания и получайте награды
          </p>
        </div>

        {/* Быстрый старт */}
        <QuickStart />

        {/* Фильтры */}
        <MissionFilters
          selectedModule={selectedModule}
          selectedType={selectedType}
          selectedStatus={selectedStatus}
          onModuleChange={setSelectedModule}
          onTypeChange={setSelectedType}
          onStatusChange={setSelectedStatus}
        />

        {/* Список миссий */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {filteredMissions.length} {filteredMissions.length === 1 ? 'миссия' : 'миссий'}
          </h2>
          {filteredMissions.length > 0 ? (
            <div className="space-y-3">
              {filteredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onStart={() => handleStart(mission.deeplink)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-500 mb-2">Миссии не найдены</p>
              <p className="text-sm text-slate-400">
                Попробуйте изменить фильтры или проверьте позже
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

