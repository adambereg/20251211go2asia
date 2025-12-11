'use client';

import { Wallet, Coins, Award } from 'lucide-react';
import { Card, Button } from '@go2asia/ui';
import type { Balances } from '../types';

interface BalanceCardsProps {
  balances: Balances;
  onViewHistory?: () => void;
  onTopUp?: () => void;
  onWithdraw?: () => void;
  onViewNFT?: () => void;
}

export function BalanceCards({
  balances,
  onViewHistory,
  onTopUp,
  onWithdraw,
  onViewNFT,
}: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Points Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Coins className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">Points</h3>
              <p className="text-3xl font-bold text-slate-900">{balances.points.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 mb-4">+350 за последние 30 дней</p>
        <Button variant="secondary" size="sm" onClick={onViewHistory} className="w-full">
          История
        </Button>
      </Card>

      {/* G2A Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 rounded-lg">
              <Wallet className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">G2A Tokens</h3>
              <p className="text-3xl font-bold text-slate-900">{balances.g2a.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 mb-4">≈ ${(balances.g2a * 0.1).toFixed(2)} USD</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={onTopUp} className="flex-1">
            Пополнить
          </Button>
          <Button variant="secondary" size="sm" onClick={onWithdraw} className="flex-1">
            Вывести
          </Button>
        </div>
      </Card>

      {/* NFT Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">NFT Badges</h3>
              <p className="text-3xl font-bold text-slate-900">{balances.nft_count}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          {balances.nft_legendary_count || 0} легендарных
        </p>
        <Button variant="secondary" size="sm" onClick={onViewNFT} className="w-full">
          Просмотреть
        </Button>
      </Card>
    </div>
  );
}

