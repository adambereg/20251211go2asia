'use client';

/**
 * Quest Asia - Leaderboard Filters
 * Фильтры для лидерборда
 */

import { MapPin, Calendar, Crown, Star } from 'lucide-react';
import type { LeaderboardFilters } from '@/components/quest/types';

interface LeaderboardFiltersProps {
  filters: LeaderboardFilters;
  onFiltersChange: (filters: LeaderboardFilters) => void;
}

const cities = ['Бангкок', 'Пхукет', 'Чиангмай', 'Хошимин', 'Бали', 'Сингапур'];

export function LeaderboardFilters({ filters, onFiltersChange }: LeaderboardFiltersProps) {
  const handlePeriodChange = (period: 'week' | 'month' | 'season' | 'all-time') => {
    onFiltersChange({ ...filters, period });
  };

  const handleCityChange = (city: string | undefined) => {
    onFiltersChange({ ...filters, city: city === filters.city ? undefined : city });
  };

  const handleVIPToggle = () => {
    onFiltersChange({ ...filters, vipOnly: !filters.vipOnly, proOnly: false });
  };

  const handlePROToggle = () => {
    onFiltersChange({ ...filters, proOnly: !filters.proOnly, vipOnly: false });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <div className="space-y-4">
        {/* Период */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Период
          </label>
          <div className="flex flex-wrap gap-2">
            {(['week', 'month', 'season', 'all-time'] as const).map((period) => {
              const labels = {
                week: 'Неделя',
                month: 'Месяц',
                season: 'Сезон',
                'all-time': 'За всё время',
              };
              return (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`
                    px-4 py-2 rounded-lg font-medium text-sm transition-colors
                    ${
                      filters.period === period
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }
                  `}
                >
                  {labels[period]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Город */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Город
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCityChange(undefined)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-colors
                ${
                  !filters.city
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }
              `}
            >
              Все города
            </button>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${
                    filters.city === city
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* VIP/PRO */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Статус
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleVIPToggle}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2
                ${
                  filters.vipOnly
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }
              `}
            >
              <Crown className="w-4 h-4" />
              Только VIP
            </button>
            <button
              onClick={handlePROToggle}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2
                ${
                  filters.proOnly
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }
              `}
            >
              <Star className="w-4 h-4" />
              Только PRO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

