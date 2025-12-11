'use client';

import { useState } from 'react';
import { Card, Button } from '@go2asia/ui';
import { Wallet } from 'lucide-react';
import { TransactionList } from './TransactionList';
import { BridgeModal } from './BridgeModal';
import type { WalletData } from '../types';

interface G2ATabProps {
  data: WalletData;
  onLoadMore?: () => void;
}

export function G2ATab({ data, onLoadMore }: G2ATabProps) {
  const [bridgeModalOpen, setBridgeModalOpen] = useState(false);
  const [bridgeMode, setBridgeMode] = useState<'topup' | 'withdraw'>('topup');
  const g2aTransactions = data.transactions.filter((tx) => tx.currency === 'g2a');

  const handleTopUp = () => {
    setBridgeMode('topup');
    setBridgeModalOpen(true);
  };

  const handleWithdraw = () => {
    setBridgeMode('withdraw');
    setBridgeModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Баланс */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-teal-100 rounded-lg">
                <Wallet className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">Баланс G2A</h3>
                <p className="text-4xl font-bold text-slate-900">{data.balance.g2a.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            ≈ ${(data.balance.g2a * 0.1).toFixed(2)} USD
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={handleTopUp} className="flex-1">
              Пополнить
            </Button>
            <Button variant="secondary" onClick={handleWithdraw} className="flex-1">
              Вывести
            </Button>
          </div>
        </Card>

        {/* История транзакций */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">История операций</h2>
          <TransactionList
            transactions={g2aTransactions}
            onLoadMore={onLoadMore}
            hasMore={data.pagination?.has_more}
          />
        </div>
      </div>

      {/* Bridge Modal */}
      <BridgeModal
        isOpen={bridgeModalOpen}
        onClose={() => setBridgeModalOpen(false)}
        mode={bridgeMode}
        currentBalance={data.balance.g2a}
      />
    </>
  );
}

