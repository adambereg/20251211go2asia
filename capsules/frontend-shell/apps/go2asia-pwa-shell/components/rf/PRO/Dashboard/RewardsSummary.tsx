'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Award, Coins } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PROCurator } from '../../types';

interface RewardsSummaryProps {
  curator: PROCurator;
}

export function RewardsSummary({ curator }: RewardsSummaryProps) {
  return (
    <Card className="border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Вознаграждения</h3>
          <Link href="/rf/pro/rewards">
            <span className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 cursor-pointer">
              Подробнее
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Всего Points</p>
                <p className="text-xl font-bold text-slate-900">
                  {curator.stats.totalRewards.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Coins size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Баланс G2A</p>
                <p className="text-xl font-bold text-slate-900">
                  {curator.stats.g2aBalance.toLocaleString('ru-RU')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

