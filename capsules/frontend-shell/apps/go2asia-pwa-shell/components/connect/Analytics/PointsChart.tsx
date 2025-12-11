'use client';

import { Card } from '@go2asia/ui';
import type { PointsChartData } from '../types';

interface PointsChartProps {
  data: PointsChartData[];
  period: string;
}

export function PointsChart({ data, period }: PointsChartProps) {
  // Простая визуализация без библиотеки графиков (для MVP)
  // В будущем можно заменить на Recharts или Chart.js

  const maxPoints = Math.max(...data.map((d) => d.points), 0);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Points за {period === '30d' ? '30 дней' : period === '7d' ? '7 дней' : 'сезон'}
      </h3>
      <div className="space-y-2">
        {data.map((item, index) => {
          const heightPercent = maxPoints > 0 ? (item.points / maxPoints) * 100 : 0;
          return (
            <div key={index} className="flex items-end gap-2">
              <div className="text-xs text-slate-500 w-16 text-right">
                {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
              </div>
              <div className="flex-1 bg-slate-100 rounded h-8 relative">
                <div
                  className="bg-gradient-to-t from-emerald-500 to-teal-600 rounded h-full transition-all"
                  style={{ width: `${heightPercent}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-700">
                  {item.points}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

