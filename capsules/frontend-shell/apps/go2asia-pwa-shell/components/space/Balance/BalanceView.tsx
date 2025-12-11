'use client';

import { Card, Badge } from '@go2asia/ui';
import { TrendingUp, TrendingDown, Wallet, Trophy, Ticket, UserPlus } from 'lucide-react';
import type { Transaction, DashboardStats } from '../types';
import { mockTransactionsExtended, mockDashboardStats } from '../mockData';

const TRANSACTION_ICONS = {
  earn: TrendingUp,
  spend: TrendingDown,
  bonus: Trophy,
  referral: UserPlus,
  quest: Trophy,
  voucher: Ticket,
};

const TRANSACTION_COLORS = {
  earn: 'text-green-600',
  spend: 'text-red-600',
  bonus: 'text-purple-600',
  referral: 'text-orange-600',
  quest: 'text-sky-600',
  voucher: 'text-blue-600',
};

function formatTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'только что';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} дн назад`;
  return `${Math.floor(diffInSeconds / 604800)} нед назад`;
}

export function BalanceView() {
  const stats = mockDashboardStats;
  const transactions = mockTransactionsExtended;

  return (
    <div className="space-y-6">
      {/* Текущий баланс */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Space Points</h2>
            <Wallet className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {stats.points.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">
              +{stats.weeklyPointsEarned} заработано за неделю
            </span>
          </div>
        </Card>

        <Card className="border-2 border-slate-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">G2A Balance</h2>
            <Wallet className="h-5 w-5 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {stats.g2aBalance.toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">
            Внутренняя валюта Go2Asia
          </div>
        </Card>
      </div>

      {/* История транзакций */}
      <Card className="border-2 border-slate-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          История транзакций
        </h2>
        <div className="space-y-3">
          {transactions.map((txn) => {
            const Icon = TRANSACTION_ICONS[txn.type];
            const colorClass = TRANSACTION_COLORS[txn.type];
            const isPositive = txn.type === 'earn' || txn.type === 'bonus' || txn.type === 'referral' || txn.type === 'quest';

            return (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {txn.description}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatTimeAgo(txn.createdAt)}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : '-'}{txn.amount} {txn.currency === 'points' ? 'Points' : 'G2A'}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
