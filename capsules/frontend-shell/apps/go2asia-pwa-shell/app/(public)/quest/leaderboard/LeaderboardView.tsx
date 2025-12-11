'use client';

/**
 * Quest Asia - Leaderboard View
 * Главный компонент лидерборда
 */

import { useState, useEffect } from 'react';
import { LeaderboardFilters } from '@/components/quest/Gamification/LeaderboardFilters';
import { LeaderboardRow } from '@/components/quest/Gamification/LeaderboardRow';
import { EmptyState } from '@/components/quest/Shared/EmptyState';
import type { LeaderboardEntry, LeaderboardFilters as LeaderboardFiltersType } from '@/components/quest/types';
import { Trophy, Medal, Award } from 'lucide-react';
import { getMockLeaderboard } from '@/components/quest/utils/leaderboard';

export function LeaderboardView() {
  const [filters, setFilters] = useState<LeaderboardFiltersType>({
    period: 'week',
    city: undefined,
    vipOnly: false,
    proOnly: false,
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем лидерборд с учётом фильтров
    const loadLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await getMockLeaderboard(filters);
        setLeaderboard(data.entries);
        setUserRank(data.userRank);
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [filters]);

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Лидерборд
          </h1>
          <p className="text-slate-600">
            Топ игроков Quest Asia по городам, неделям и сезонам
          </p>
        </div>

        {/* Фильтры */}
        <LeaderboardFilters filters={filters} onFiltersChange={setFilters} />

        {/* Топ-3 */}
        {!loading && topThree.length > 0 && (
          <div className="mt-8 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Топ-3</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2-е место */}
              {topThree[1] && (
                <div className="order-2 md:order-1">
                  <div className="bg-white rounded-xl border-2 border-slate-300 p-6 text-center relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-slate-400 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        2
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <Medal className="w-16 h-16 text-slate-400 mx-auto" />
                    </div>
                    <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-3 overflow-hidden">
                      {topThree[1].avatar ? (
                        <img src={topThree[1].avatar} alt={topThree[1].username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400">
                          {topThree[1].username[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{topThree[1].username}</h3>
                    <p className="text-sm text-slate-600 mb-2">{topThree[1].points.toLocaleString()} очков</p>
                    <p className="text-xs text-slate-500">{topThree[1].questsCompleted} квестов</p>
                  </div>
                </div>
              )}

              {/* 1-е место */}
              {topThree[0] && (
                <div className="order-1 md:order-2">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl border-2 border-amber-500 p-6 text-center relative shadow-lg">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-amber-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold">
                        1
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <Trophy className="w-20 h-20 text-white mx-auto" />
                    </div>
                    <div className="w-24 h-24 rounded-full bg-white mx-auto mb-3 overflow-hidden border-4 border-amber-300">
                      {topThree[0].avatar ? (
                        <img src={topThree[0].avatar} alt={topThree[0].username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-amber-600">
                          {topThree[0].username[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-white mb-1">{topThree[0].username}</h3>
                    <p className="text-sm text-amber-100 mb-2">{topThree[0].points.toLocaleString()} очков</p>
                    <p className="text-xs text-amber-200">{topThree[0].questsCompleted} квестов</p>
                  </div>
                </div>
              )}

              {/* 3-е место */}
              {topThree[2] && (
                <div className="order-3">
                  <div className="bg-white rounded-xl border-2 border-amber-300 p-6 text-center relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-amber-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        3
                      </div>
                    </div>
                    <div className="mt-4 mb-4">
                      <Award className="w-16 h-16 text-amber-500 mx-auto" />
                    </div>
                    <div className="w-20 h-20 rounded-full bg-amber-100 mx-auto mb-3 overflow-hidden">
                      {topThree[2].avatar ? (
                        <img src={topThree[2].avatar} alt={topThree[2].username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-amber-600">
                          {topThree[2].username[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{topThree[2].username}</h3>
                    <p className="text-sm text-slate-600 mb-2">{topThree[2].points.toLocaleString()} очков</p>
                    <p className="text-xs text-slate-500">{topThree[2].questsCompleted} квестов</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Остальной лидерборд */}
        {!loading && rest.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Остальные места</h2>
            <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
              {rest.map((entry, index) => (
                <LeaderboardRow
                  key={entry.userId}
                  entry={entry}
                  rank={entry.rank}
                  isCurrentUser={entry.userId === 'current-user'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Позиция пользователя */}
        {!loading && userRank !== null && userRank > 3 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Ваша позиция</h2>
            <div className="bg-white rounded-xl border-2 border-purple-500 overflow-hidden">
              {leaderboard.find((e) => e.userId === 'current-user') && (
                <LeaderboardRow
                  entry={leaderboard.find((e) => e.userId === 'current-user')!}
                  rank={userRank}
                  isCurrentUser={true}
                />
              )}
            </div>
          </div>
        )}

        {/* Пустое состояние */}
        {!loading && leaderboard.length === 0 && (
          <EmptyState
            icon={Trophy}
            title="Лидерборд пуст"
            description="Пока нет данных для отображения. Станьте первым!"
          />
        )}

        {/* Загрузка */}
        {loading && (
          <div className="mt-8">
            <div className="bg-white rounded-xl border-2 border-slate-200 p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Загрузка лидерборда...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
