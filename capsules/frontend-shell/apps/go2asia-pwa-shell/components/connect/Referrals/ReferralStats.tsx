'use client';

import { Card } from '@go2asia/ui';
import { Users, Store, Coins, Wallet } from 'lucide-react';
import type { ReferralStats as ReferralStatsType } from '../types';

interface ReferralStatsProps {
  stats: ReferralStatsType;
}

export function ReferralStats({ stats }: ReferralStatsProps) {
  const cards = [
    {
      title: 'Приглашено пользователей',
      value: stats.total_users,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Приглашено партнёров',
      value: stats.total_partners,
      icon: Store,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Заработано Points',
      value: stats.earned_points,
      icon: Coins,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Заработано G2A',
      value: stats.earned_g2a,
      icon: Wallet,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-slate-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-slate-900">{card.value.toLocaleString()}</p>
              </div>
              <div className={`${card.bgColor} ${card.color} p-2 rounded-lg`}>
                <Icon size={20} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

