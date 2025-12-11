'use client';

import { Card, Badge } from '@go2asia/ui';
import { User, Store, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Avatar } from '@go2asia/ui';
import type { Referral } from '../types';

interface ReferralCardProps {
  referral: Referral;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ReferralCard({ referral }: ReferralCardProps) {
  const getStatusIcon = () => {
    switch (referral.status) {
      case 'completed_mission':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'registered':
        return <Clock className="w-4 h-4 text-slate-400" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-slate-400" />;
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (referral.status) {
      case 'completed_mission':
        return 'Завершил миссию';
      case 'active':
        return 'Активен';
      case 'registered':
        return 'Зарегистрирован';
      case 'inactive':
        return 'Неактивен';
      default:
        return referral.status;
    }
  };

  const getStatusColor = () => {
    switch (referral.status) {
      case 'completed_mission':
        return 'bg-emerald-100 text-emerald-700';
      case 'active':
        return 'bg-blue-100 text-blue-700';
      case 'registered':
        return 'bg-slate-100 text-slate-600';
      case 'inactive':
        return 'bg-slate-100 text-slate-400';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        {/* Аватар */}
        <Avatar
          initials={getInitials(referral.name)}
          size="md"
        />

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900">{referral.name}</h3>
                {referral.type === 'partner' ? (
                  <Store className="w-4 h-4 text-slate-400" />
                ) : (
                  <User className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <p className="text-xs text-slate-500">
                Приглашён {formatDate(referral.invited_at)}
              </p>
            </div>
            <Badge className={`${getStatusColor()} flex items-center gap-1`}>
              {getStatusIcon()}
              {getStatusLabel()}
            </Badge>
          </div>

          {/* Прогресс миссий (только для пользователей) */}
          {referral.type === 'user' && referral.missions_completed !== undefined && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Миссии</span>
                <span>
                  {referral.missions_completed} / {referral.missions_total || 0}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{
                    width: `${
                      referral.missions_total
                        ? (referral.missions_completed / referral.missions_total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Заработанные награды */}
          <div className="flex items-center gap-4 text-sm">
            {referral.earned_rewards.points > 0 && (
              <div>
                <span className="text-slate-600">Points: </span>
                <span className="font-semibold text-emerald-600">
                  +{referral.earned_rewards.points}
                </span>
              </div>
            )}
            {referral.earned_rewards.g2a > 0 && (
              <div>
                <span className="text-slate-600">G2A: </span>
                <span className="font-semibold text-teal-600">
                  +{referral.earned_rewards.g2a}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

