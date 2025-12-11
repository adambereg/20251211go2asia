'use client';

import Link from 'next/link';
import { Card, Button } from '@go2asia/ui';
import { Wallet, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import type { DashboardStats } from '../types';

interface AssetsBlockProps {
  stats: DashboardStats;
}

export function AssetsBlock({ stats }: AssetsBlockProps) {
  const isPositiveDelta = stats.weeklyDelta >= 0;

  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Цифровые активы</h2>
        <Wallet className="h-5 w-5 text-slate-400" />
      </div>

      <div className="space-y-4">
        {/* Space Points */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg">
          <div>
            <div className="text-sm text-slate-600 mb-1">Space Points</div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.points.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm mb-1">
              {isPositiveDelta ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">
                    +{stats.weeklyDelta}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    {stats.weeklyDelta}
                  </span>
                </>
              )}
            </div>
            <div className="text-xs text-slate-500">за неделю</div>
          </div>
        </div>

        {/* G2A Balance */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div>
            <div className="text-sm text-slate-600 mb-1">G2A Balance</div>
            <div className="text-2xl font-bold text-slate-900">
              {stats.g2aBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link href="/space/balance?action=earn">
            <Button variant="secondary" className="w-full">
              Заработать
            </Button>
          </Link>
          <Link href="/space/balance?action=spend">
            <Button variant="secondary" className="w-full">
              Потратить
            </Button>
          </Link>
        </div>

        {/* Ссылка на баланс */}
        <Link
          href="/space/balance"
          className="flex items-center justify-center gap-2 text-sm text-sky-600 hover:text-sky-700 font-medium pt-2"
        >
          Подробнее
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

