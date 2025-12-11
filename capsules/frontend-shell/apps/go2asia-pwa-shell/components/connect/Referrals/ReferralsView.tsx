'use client';

import { useState, useMemo } from 'react';
import { ConnectHero, ConnectNav } from '../Shared';
import { Button, Card } from '@go2asia/ui';
import { Plus } from 'lucide-react';
import { ReferralStats } from './ReferralStats';
import { ReferralCard } from './ReferralCard';
import { InviteModal } from './InviteModal';
import { useGetReferralStats } from '@go2asia/sdk/referrals';
import { useGetReferralTree } from '@go2asia/sdk/referrals';
import type { ReferralsData, ReferralStats as ReferralStatsType, Referral } from '../types';
import { mockReferralsData } from '../mockData';

interface ReferralsViewProps {
  initialData?: ReferralsData;
}

export function ReferralsView({ initialData }: ReferralsViewProps) {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Загружаем статистику рефералов из API
  const { data: referralStatsData, isLoading: statsLoading } = useGetReferralStats();
  
  // Загружаем дерево рефералов из API
  const { data: referralTreeData, isLoading: treeLoading } = useGetReferralTree({ depth: 2 });

  // Преобразуем данные из API в формат компонента
  const data = useMemo(() => {
    if (initialData) return initialData;

    // Преобразуем статистику из API
    const stats: ReferralStatsType = referralStatsData
      ? {
          total_users: referralStatsData.totalReferrals || 0,
          total_partners: 0, // API не возвращает отдельно партнёров
          earned_points: referralStatsData.totalEarned || 0,
          earned_g2a: 0, // API не возвращает G2A отдельно
        }
      : mockReferralsData.stats;

    // Преобразуем дерево рефералов в плоский список
    const referrals: Referral[] = referralTreeData?.referrals
      ? referralTreeData.referrals.map((node): Referral => ({
          id: node.userId,
          type: 'user' as const,
          name: [node.firstName, node.lastName].filter(Boolean).join(' ') || node.email || 'Пользователь',
          avatar: undefined,
          status: node.isActive ? 'active' : 'inactive',
          earned_rewards: {
            points: 0, // TODO: получить из API если доступно
            g2a: 0,
          },
          invited_at: node.registeredAt,
          missions_completed: 0, // TODO: получить из API если доступно
          missions_total: 0,
        }))
      : mockReferralsData.referrals;

    const referralLink = referralStatsData?.referralCode
      ? `https://go2asia.space/invite/${referralStatsData.referralCode}`
      : mockReferralsData.referral_link;

    return {
      stats,
      referrals,
      referral_link: referralLink,
      referral_qr: mockReferralsData.referral_qr, // TODO: генерировать QR код
    };
  }, [referralStatsData, referralTreeData, initialData]);

  const isLoading = statsLoading || treeLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <ConnectNav />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-slate-600">Загрузка данных рефералов...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <ConnectHero subtitle="Центр экономики и геймификации Go2Asia" />

        {/* Навигация */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <ConnectNav />
        </div>

        {/* Основной контент */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Заголовок и кнопка приглашения */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Реферальная программа
              </h1>
              <p className="text-slate-600 mt-1">
                Приглашайте друзей и партнёров, получайте награды
              </p>
            </div>
            <Button variant="primary" onClick={() => setInviteModalOpen(true)}>
              <Plus size={16} className="mr-2" />
              Пригласить
            </Button>
          </div>

          {/* Статистика */}
          <ReferralStats stats={data.stats} />

          {/* Список рефералов */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Мои рефералы</h2>
            {data.referrals.length > 0 ? (
              <div className="space-y-3">
                {data.referrals.map((referral) => (
                  <ReferralCard key={referral.id} referral={referral} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-slate-500 mb-2">У вас пока нет рефералов</p>
                <p className="text-sm text-slate-400 mb-4">
                  Пригласите друзей и получите бонусы!
                </p>
                <Button variant="primary" onClick={() => setInviteModalOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Пригласить друга
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Модал приглашения */}
      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        referralLink={data.referral_link}
        referralQR={data.referral_qr}
      />
    </>
  );
}

