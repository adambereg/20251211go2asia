'use client';

import { useState, useMemo } from 'react';
import { ConnectHero, ConnectNav } from '../Shared';
import { PointsTab } from './PointsTab';
import { G2ATab } from './G2ATab';
import { NFTTab } from './NFTTab';
import { useGetBalance } from '@go2asia/sdk/balance';
import { useGetTransactions } from '@go2asia/sdk/transactions';
import type { WalletData, NFTWalletData } from '../types';
import { mockWalletData, mockNFTWalletData } from '../mockData';

interface WalletViewProps {
  initialWalletData?: WalletData;
  initialNFTData?: NFTWalletData;
}

export function WalletView({
  initialWalletData,
  initialNFTData,
}: WalletViewProps) {
  const [activeTab, setActiveTab] = useState<'points' | 'g2a' | 'nft'>('points');
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);

  // Загружаем баланс из Token Service
  const { data: balanceData, isLoading: balanceLoading } = useGetBalance();
  
  // Загружаем транзакции с курсорной пагинацией
  const { data: transactionsData, isLoading: transactionsLoading } = useGetTransactions({ 
    limit: 20,
    cursor: cursor,
  });

  // Преобразуем данные из API в формат компонента
  const walletData = useMemo(() => {
    if (initialWalletData) return initialWalletData;

    // Используем реальные данные из API, если они есть, иначе моки
    const balance = balanceData !== undefined
      ? {
          points: balanceData.points || 0,
          g2a: parseFloat(String(balanceData.g2a || '0')),
          nft_count: 0, // TODO: получить из NFT badges API
          nft_legendary_count: 0, // TODO: получить из NFT badges API
        }
      : mockWalletData.balance;

    // Объединяем все загруженные транзакции
    const transactions: typeof mockWalletData.transactions = transactionsData?.items && transactionsData.items.length > 0
      ? transactionsData.items.map((tx) => {
      const metadata = tx.metadata as Record<string, unknown> | null;
      const txModule = (metadata?.module as string) || 'space'; // По умолчанию 'space'
      
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
      : mockWalletData.transactions;

    return {
      balance,
      transactions,
      pagination: {
        page: 1,
        per_page: 20,
        total: transactions.length,
        has_more: transactionsData?.hasMore || false,
      },
    };
  }, [balanceData, transactionsData, initialWalletData]);

  const nftData = useMemo(() => {
    if (initialNFTData) return initialNFTData;
    return mockNFTWalletData; // TODO: получить из NFT badges API
  }, [initialNFTData]);

  const handleLoadMore = () => {
    if (transactionsData?.nextCursor) {
      setCursor(transactionsData.nextCursor);
    }
  };

  // Показываем состояние загрузки
  if (balanceLoading || transactionsLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <ConnectNav />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-slate-600">Загрузка данных кошелька...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <ConnectNav />
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Вкладки */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('points')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'points'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Points
            </button>
            <button
              onClick={() => setActiveTab('g2a')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'g2a'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              G2A
            </button>
            <button
              onClick={() => setActiveTab('nft')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'nft'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NFT
            </button>
          </div>
        </div>

        {/* Контент вкладок */}
        {activeTab === 'points' && (
          <PointsTab data={walletData} onLoadMore={handleLoadMore} />
        )}
        {activeTab === 'g2a' && (
          <G2ATab data={walletData} onLoadMore={handleLoadMore} />
        )}
        {activeTab === 'nft' && <NFTTab nfts={nftData.nfts} />}
      </div>
    </div>
  );
}

