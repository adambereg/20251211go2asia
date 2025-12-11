'use client';

import { Card, Button, Chip } from '@go2asia/ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ModuleIcon } from '../Shared';
import type { Transaction } from '../types';

interface ActivityFeedProps {
  transactions: Transaction[];
  maxItems?: number;
}

export function ActivityFeed({ transactions, maxItems = 10 }: ActivityFeedProps) {
  const displayedTransactions = transactions.slice(0, maxItems);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} мин назад`;
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`;
    } else if (diffDays < 7) {
      return `${diffDays} дн назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">Последняя активность</h2>
        <Link href="/connect/wallet">
          <Button variant="secondary" size="sm">
            Показать все
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {displayedTransactions.length > 0 ? (
          displayedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="p-2 bg-slate-100 rounded-lg">
                <ModuleIcon module={transaction.module} size={20} className="text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(transaction.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === 'credit' ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {transaction.amount} {transaction.currency === 'points' ? 'Points' : 'G2A'}
                    </span>
                  </div>
                </div>
                {transaction.tags && transaction.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {transaction.tags.map((tag) => (
                      <Chip key={tag} size="sm">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>У вас пока нет транзакций</p>
            <p className="text-sm mt-1">Выполните миссию, чтобы получить первые Points!</p>
          </div>
        )}
      </div>
    </Card>
  );
}

