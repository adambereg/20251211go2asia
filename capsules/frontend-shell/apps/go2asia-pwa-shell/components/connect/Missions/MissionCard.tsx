'use client';

import { Card, Button, Badge } from '@go2asia/ui';
import { ArrowRight, Clock, Coins, Award, CheckCircle2 } from 'lucide-react';
import { ModuleIcon } from '../Shared';
import type { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
  onStart: () => void;
}

export function MissionCard({ mission, onStart }: MissionCardProps) {
  const getStatusColor = () => {
    switch (mission.status) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'expired':
        return 'bg-slate-100 text-slate-400 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusLabel = () => {
    switch (mission.status) {
      case 'completed':
        return 'Завершена';
      case 'in_progress':
        return 'В процессе';
      case 'expired':
        return 'Просрочена';
      default:
        return 'Новая';
    }
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMs < 0) return 'Истекла';
    if (diffHours < 24) return `Истекает через ${diffHours} ч`;
    return `Истекает через ${diffDays} дн`;
  };

  const progressPercent =
    mission.max_progress > 0 ? (mission.progress / mission.max_progress) * 100 : 0;

  return (
    <Card className={`p-4 border-2 ${getStatusColor()}`}>
      <div className="flex items-start gap-4">
        {/* Иконка модуля */}
        <div className="p-2 bg-white rounded-lg border border-slate-200">
          <ModuleIcon module={mission.module} size={24} className="text-slate-600" />
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">{mission.title}</h3>
              <p className="text-sm text-slate-600">{mission.description}</p>
            </div>
            <Badge className={getStatusColor()}>{getStatusLabel()}</Badge>
          </div>

          {/* Прогресс */}
          {mission.status === 'in_progress' && mission.max_progress > 1 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Прогресс</span>
                <span>
                  {mission.progress} / {mission.max_progress}
                </span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Награда и дедлайн */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {mission.reward.points && (
                <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                  <Coins size={16} />
                  +{mission.reward.points} Points
                </div>
              )}
              {mission.reward.nft && (
                <div className="flex items-center gap-1 text-sm font-medium text-purple-600">
                  <Award size={16} />
                  NFT
                </div>
              )}
            </div>
            {mission.deadline && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                {formatDeadline(mission.deadline)}
              </div>
            )}
          </div>

          {/* Кнопка действия */}
          {mission.status !== 'completed' && mission.status !== 'expired' && (
            <Button
              variant={mission.status === 'in_progress' ? 'primary' : 'secondary'}
              size="sm"
              onClick={onStart}
              className="w-full"
            >
              {mission.status === 'in_progress' ? 'Продолжить' : 'Начать'}
              <ArrowRight size={16} className="ml-1" />
            </Button>
          )}
          {mission.status === 'completed' && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 size={16} />
              <span>Миссия завершена</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

