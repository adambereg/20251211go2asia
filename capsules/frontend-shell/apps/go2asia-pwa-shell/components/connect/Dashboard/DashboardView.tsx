'use client';

import { ConnectHero, ConnectNav } from '../Shared';
import { BalanceCards } from './BalanceCards';
import { ProgressPanel } from './ProgressPanel';
import { NextActions } from './NextActions';
import { ActivityFeed } from './ActivityFeed';
import { useGetBalance } from '@go2asia/sdk/balance';
import { useGetReferralStats } from '@go2asia/sdk/referrals';
import { useGetTransactions } from '@go2asia/sdk/transactions';
import { useMemo } from 'react';
import type { DashboardData } from '../types';
import { mockDashboardData } from '../mockData';

interface DashboardViewProps {
  initialData?: DashboardData;
}

export function DashboardView({ initialData }: DashboardViewProps) {
  // Загружаем баланс из Token Service
  const { data: balanceData, isLoading: balanceLoading } = useGetBalance();
  
  // Загружаем статистику рефералов
  const { data: referralStats } = useGetReferralStats();
  
  // Загружаем последние транзакции
  const { data: transactionsData } = useGetTransactions({ limit: 10 });

  // Преобразуем данные из API в формат компонента
  const data = useMemo(() => {
    if (initialData) return initialData;
    
    // Используем реальные данные из API, если они есть, иначе моки
    const balances = balanceData !== undefined
      ? {
          points: balanceData.points || 0,
          g2a: parseFloat(String(balanceData.g2a || '0')),
          nft_count: 0, // TODO: получить из NFT badges API
          nft_legendary_count: 0, // TODO: получить из NFT badges API
        }
      : mockDashboardData.balances;

    const recentTransactions: typeof mockDashboardData.recent_transactions = transactionsData?.items && transactionsData.items.length > 0
      ? transactionsData.items.map((tx) => {
          const metadata = tx.metadata as Record<string, unknown> | null;
          const txModule = (metadata?.module as string) || 'space';
          
          return {
            id: tx.id,
            type: (tx.type === 'points_add' || tx.type === 'g2a_add' ? 'credit' : 'debit') as 'credit' | 'debit',
            amount: parseInt(String(tx.amount || '0')),
            currency: (tx.type?.includes('g2a') ? 'g2a' : 'points') as 'points' | 'g2a',
            module: (txModule as 'space' | 'atlas' | 'pulse' | 'rf' | 'quest' | 'guru'),
            description: tx.reason || '',
            created_at: tx.createdAt || new Date().toISOString(),
            tags: [],
            metadata: metadata || {},
          };
        })
      : mockDashboardData.recent_transactions;

    return {
      ...mockDashboardData,
      balances,
      recent_transactions: recentTransactions,
      referral_stats: referralStats || undefined,
    };
  }, [balanceData, transactionsData, referralStats, initialData]);

  // Показываем состояние загрузки
  if (balanceLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Загрузка данных...</p>
      </div>
    );
  }

  const handleViewHistory = () => {
    window.location.href = '/connect/wallet';
  };

  const handleTopUp = () => {
    // Mock действие - будет реализовано позже
    console.log('Top up G2A');
  };

  const handleWithdraw = () => {
    // Mock действие - будет реализовано позже
    console.log('Withdraw G2A');
  };

  const handleViewNFT = () => {
    window.location.href = '/connect/wallet?tab=nft';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <ConnectNav />
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Балансы */}
        <BalanceCards
          balances={data.balances}
          onViewHistory={handleViewHistory}
          onTopUp={handleTopUp}
          onWithdraw={handleWithdraw}
          onViewNFT={handleViewNFT}
        />

        {/* Прогресс уровня */}
        <ProgressPanel level={data.level} season={data.season} />

        {/* Рекомендуемые действия */}
        <NextActions actions={data.next_actions} />

        {/* Последняя активность */}
        <ActivityFeed transactions={data.recent_transactions} />
      </div>
    </div>
  );
}

