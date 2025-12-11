'use client';

import { Card, Badge, Button } from '@go2asia/ui';
import { UserPlus, TrendingUp, Award, Users } from 'lucide-react';
import { mockDashboardStats } from '../mockData';

export function ReferralsView() {
  const stats = mockDashboardStats;

  // Mock данные для рефералов
  const referralLevel = 3;
  const pointsToNextLevel = 500;
  const monthlyEarned = 1200;
  const monthlyLimit = 5000;
  const referralRank = 42;

  return (
    <div className="space-y-6">
      {/* Прогресс по уровням */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Личный прогресс
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Текущий уровень</span>
              <Badge variant="ugc" size="md">
                Уровень {referralLevel}
              </Badge>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                style={{ width: `${((pointsToNextLevel - 500) / pointsToNextLevel) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Осталось {pointsToNextLevel} Points до уровня {referralLevel + 1}
            </div>
          </div>
        </div>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-sky-600" />
            <div className="text-sm text-slate-600">Заработано в этом месяце</div>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {monthlyEarned.toLocaleString()} Points
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Лимит: {monthlyLimit.toLocaleString()} Points
          </div>
        </Card>

        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-purple-600" />
            <div className="text-sm text-slate-600">Реферальный рейтинг</div>
          </div>
          <div className="text-2xl font-bold text-slate-900">#{referralRank}</div>
          <div className="text-xs text-slate-500 mt-1">
            Среди всех пользователей
          </div>
        </Card>

        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-orange-600" />
            <div className="text-sm text-slate-600">Приглашено друзей</div>
          </div>
          <div className="text-2xl font-bold text-slate-900">8</div>
          <div className="text-xs text-slate-500 mt-1">
            Активных рефералов
          </div>
        </Card>
      </div>

      {/* Реферальная ссылка */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Пригласить друга
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
            <code className="flex-1 text-sm text-slate-700">
              https://go2asia.space/ref/abc123xyz
            </code>
            <Button variant="secondary" size="sm">
              Копировать
            </Button>
          </div>
          <div className="text-sm text-slate-600">
            За каждого приглашённого друга вы получите 100 Points, а ваш друг — 50 Points при регистрации
          </div>
        </div>
      </Card>
    </div>
  );
}
