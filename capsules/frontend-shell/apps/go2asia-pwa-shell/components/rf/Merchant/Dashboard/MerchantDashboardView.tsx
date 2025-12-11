'use client';

import { StatsCards } from './StatsCards';
import { QuickActions } from './QuickActions';
import { Card, CardContent } from '@go2asia/ui';
import { mockPartners } from '../../mockData';
import type { Partner } from '../../types';

export function MerchantDashboardView() {
  // В реальном приложении здесь будет загрузка данных партнёра текущего пользователя
  // Для MVP используем первый партнёр из mock данных
  const partner: Partner = mockPartners[0];

  return (
    <div className="space-y-6">
      {/* Приветствие */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Добро пожаловать, {partner.name}!
        </h1>
        <p className="text-slate-600">
          Управляйте своим профилем, ваучерами и отслеживайте статистику
        </p>
      </div>

      {/* Статистика */}
      <StatsCards stats={partner.stats} />

      {/* Быстрые действия */}
      <QuickActions />

      {/* Статус проверки */}
      <Card className="border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Статус проверки</h3>
          {partner.rfStatus.verified ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-700">Проверено PRO</p>
                <p className="text-sm text-slate-600">
                  Последняя проверка: {partner.rfStatus.verifiedAt ? new Date(partner.rfStatus.verifiedAt).toLocaleDateString('ru-RU') : '—'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-amber-700">Ожидает проверки</p>
                <p className="text-sm text-slate-600">
                  Ваш профиль будет проверен PRO-куратором в ближайшее время
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

