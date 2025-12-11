'use client';

import { Card } from '@go2asia/ui';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SeasonPulseProps {
  position: number;
  pointsInSeason: number;
  trend: 'up' | 'down' | 'stable';
  forecastToGoal?: number;
}

export function SeasonPulse({ position, pointsInSeason, trend, forecastToGoal }: SeasonPulseProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-600';

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Пульс сезона</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Место в лидерборде</span>
          <span className="text-2xl font-bold text-slate-900">#{position}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Points в сезоне</span>
          <span className="text-xl font-semibold text-slate-900">{pointsInSeason.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Тренд</span>
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon size={16} />
            <span className="text-sm font-medium">
              {trend === 'up' ? 'Растёт' : trend === 'down' ? 'Падает' : 'Стабильно'}
            </span>
          </div>
        </div>
        {forecastToGoal && (
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Прогноз до цели: ~{forecastToGoal} дней
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

