'use client';

import { Card } from '@go2asia/ui';
import { Users, Coins, Wallet } from 'lucide-react';

interface ReferralContributionProps {
  points: number;
  g2a: number;
  percentage: number;
}

export function ReferralContribution({ points, g2a, percentage }: ReferralContributionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-900">Вклад рефералов</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-slate-600">Points от рефералов</span>
          </div>
          <span className="text-sm font-semibold text-slate-900">{points.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-slate-600">G2A от рефералов-партнёров</span>
          </div>
          <span className="text-sm font-semibold text-slate-900">{g2a.toLocaleString()}</span>
        </div>
        <div className="pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Процент от общего баланса</span>
            <span className="text-lg font-bold text-emerald-600">{percentage}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

