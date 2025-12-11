'use client';

import { Card, CardContent, Badge } from '@go2asia/ui';
import { Award, Coins } from 'lucide-react';
import { mockPRORewardTransactions, mockPROCurator } from '../../mockData';

export function RewardsView() {
  const curator = mockPROCurator;
  const transactions = mockPRORewardTransactions;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'onboarding':
        return 'Онбординг';
      case 'verification':
        return 'Проверка';
      case 'partner_activity':
        return 'Активность партнёра';
      default:
        return type;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="info" className="bg-green-100 text-green-700">Завершено</Badge>;
      case 'pending':
        return <Badge variant="info" className="bg-amber-100 text-amber-700">Ожидает</Badge>;
      default:
        return <Badge variant="info">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Вознаграждения</h1>
        <p className="text-slate-600">Отслеживайте заработанные Points и G2A</p>
      </div>

      {/* Баланс */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Всего Points</p>
                <p className="text-3xl font-bold text-slate-900">
                  {curator.stats.totalRewards.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Coins size={24} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Баланс G2A</p>
                <p className="text-3xl font-bold text-slate-900">
                  {curator.stats.g2aBalance.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* История транзакций */}
      <Card className="border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">История транзакций</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-slate-900">{getTypeLabel(tx.type)}</span>
                    {getStatusBadge(tx.status)}
                  </div>
                  <p className="text-sm text-slate-600">
                    Партнёр: {tx.partnerId} • {new Date(tx.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    +{tx.amount.toLocaleString('ru-RU')} {tx.currency === 'points' ? 'Points' : 'G2A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

