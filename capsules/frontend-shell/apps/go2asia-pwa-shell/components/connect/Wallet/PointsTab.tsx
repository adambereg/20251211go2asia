'use client';

import { Card } from '@go2asia/ui';
import { Coins } from 'lucide-react';
import { TransactionList } from './TransactionList';
import type { WalletData } from '../types';

interface PointsTabProps {
  data: WalletData;
  onLoadMore?: () => void;
}

export function PointsTab({ data, onLoadMore }: PointsTabProps) {
  const pointsTransactions = data.transactions.filter((tx) => tx.currency === 'points');

  return (
    <div className="space-y-6">
      {/* Баланс */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-lg">
            <Coins className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Баланс Points</h3>
            <p className="text-4xl font-bold text-slate-900">{data.balance.points.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* История транзакций */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">История транзакций</h2>
        <TransactionList
          transactions={pointsTransactions}
          onLoadMore={onLoadMore}
          hasMore={data.pagination?.has_more}
        />
      </div>
    </div>
  );
}

