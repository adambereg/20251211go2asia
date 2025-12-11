'use client';

import { useState, useMemo } from 'react';
import { Card, Chip, Button } from '@go2asia/ui';
import { ModuleIcon } from '../Shared';
import type { Transaction, ModuleType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function TransactionList({ transactions, onLoadMore, hasMore }: TransactionListProps) {
  const [selectedModule, setSelectedModule] = useState<ModuleType | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'credit' | 'debit'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Фильтр по модулю
    if (selectedModule !== 'all') {
      result = result.filter((tx) => tx.module === selectedModule);
    }

    // Фильтр по типу
    if (selectedType !== 'all') {
      result = result.filter((tx) => tx.type === selectedType);
    }

    // Фильтр по периоду
    if (selectedPeriod !== 'all') {
      const now = new Date();
      result = result.filter((tx) => {
        const txDate = new Date(tx.created_at);
        const diffMs = now.getTime() - txDate.getTime();
        const diffDays = Math.floor(diffMs / 86400000);

        switch (selectedPeriod) {
          case 'today':
            return diffDays === 0;
          case 'week':
            return diffDays <= 7;
          case 'month':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    return result;
  }, [transactions, selectedModule, selectedType, selectedPeriod]);

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

  const modules: (ModuleType | 'all')[] = [
    'all',
    'space',
    'atlas',
    'pulse',
    'rf',
    'quest',
    'guru',
  ];

  return (
    <div className="space-y-4">
      {/* Фильтры */}
      <div className="space-y-3">
        {/* По модулю */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Модуль</h4>
          <div className="flex flex-wrap gap-2">
            {modules.map((module) => (
              <Chip
                key={module}
                size="sm"
                selected={selectedModule === module}
                onClick={() => setSelectedModule(module)}
              >
                {module === 'all' ? 'Все' : module}
              </Chip>
            ))}
          </div>
        </div>

        {/* По типу */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Тип</h4>
          <div className="flex flex-wrap gap-2">
            {(['all', 'credit', 'debit'] as const).map((type) => (
              <Chip
                key={type}
                size="sm"
                selected={selectedType === type}
                onClick={() => setSelectedType(type)}
              >
                {type === 'all'
                  ? 'Все'
                  : type === 'credit'
                    ? 'Начисления'
                    : 'Списания'}
              </Chip>
            ))}
          </div>
        </div>

        {/* По периоду */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Период</h4>
          <div className="flex flex-wrap gap-2">
            {(['all', 'today', 'week', 'month'] as const).map((period) => (
              <Chip
                key={period}
                size="sm"
                selected={selectedPeriod === period}
                onClick={() => setSelectedPeriod(period)}
              >
                {period === 'all'
                  ? 'Все'
                  : period === 'today'
                    ? 'Сегодня'
                    : period === 'week'
                      ? 'Неделя'
                      : 'Месяц'}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Список транзакций */}
      <div className="space-y-2">
        {filteredTransactions.length > 0 ? (
          <>
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <ModuleIcon module={transaction.module} size={20} className="text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">
                          {transaction.description}
                        </p>
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
              </Card>
            ))}
            {hasMore && onLoadMore && (
              <div className="pt-4 text-center">
                <Button variant="secondary" onClick={onLoadMore}>
                  Загрузить ещё
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-slate-500">Транзакции не найдены</p>
            <p className="text-sm text-slate-400 mt-1">
              Попробуйте изменить фильтры
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

