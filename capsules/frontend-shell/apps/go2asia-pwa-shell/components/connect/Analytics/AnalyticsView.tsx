'use client';

import { useState } from 'react';
import { ConnectHero, ConnectNav } from '../Shared';
import { Chip } from '@go2asia/ui';
import { PointsChart } from './PointsChart';
import { SourcesList } from './SourcesList';
import { ReferralContribution } from './ReferralContribution';
import { SeasonPulse } from './SeasonPulse';
import type { AnalyticsData } from '../types';
import { mockAnalyticsData } from '../mockData';

interface AnalyticsViewProps {
  initialData?: AnalyticsData;
}

export function AnalyticsView({ initialData = mockAnalyticsData }: AnalyticsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | 'season'>('30d');

  const chartData =
    selectedPeriod === '7d'
      ? initialData.points_chart.data.slice(-7)
      : selectedPeriod === '30d'
        ? initialData.points_chart.data.slice(-30)
        : initialData.points_chart.data;

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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Моя статистика</h1>
          <p className="text-slate-600 mt-1">
            Отслеживайте эффективность и источники наград
          </p>
        </div>

        {/* Фильтр периода */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {(['7d', '30d', 'season'] as const).map((period) => (
              <Chip
                key={period}
                size="sm"
                selected={selectedPeriod === period}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === '7d'
                  ? '7 дней'
                  : period === '30d'
                    ? '30 дней'
                    : 'Сезон'}
              </Chip>
            ))}
          </div>
        </div>

        {/* График Points */}
        <div className="mb-6">
          <PointsChart data={chartData} period={selectedPeriod} />
        </div>

        {/* Источники наград и рефералы */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SourcesList sources={initialData.sources} />
          <ReferralContribution
            points={initialData.referral_contribution.points}
            g2a={initialData.referral_contribution.g2a}
            percentage={initialData.referral_contribution.percentage_of_total}
          />
        </div>

        {/* Пульс сезона */}
        {initialData.season_pulse && (
          <div>
            <SeasonPulse
              position={initialData.season_pulse.position}
              pointsInSeason={initialData.season_pulse.points_in_season}
              trend={initialData.season_pulse.trend}
              forecastToGoal={initialData.season_pulse.forecast_to_goal}
            />
          </div>
        )}
      </div>
    </div>
  );
}

