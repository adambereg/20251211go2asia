'use client';

import { Card } from '@go2asia/ui';
import { CheckCircle2, Lock, Award } from 'lucide-react';
import type { Achievement } from '../types';
import { ModuleIcon } from '../Shared';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const progressPercent = (achievement.progress / achievement.max_progress) * 100;
  const isCompleted = achievement.status === 'completed';
  const isLocked = achievement.status === 'locked';

  return (
    <Card className={`p-4 ${isLocked ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Иконка */}
        <div
          className={`p-3 rounded-lg flex-shrink-0 ${
            isCompleted
              ? 'bg-emerald-100'
              : isLocked
                ? 'bg-slate-100'
                : 'bg-blue-100'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : isLocked ? (
            <Lock className="w-6 h-6 text-slate-400" />
          ) : (
            <Award className="w-6 h-6 text-blue-600" />
          )}
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{achievement.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
            </div>
            {achievement.module && (
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <ModuleIcon module={achievement.module} size={16} className="text-slate-600" />
              </div>
            )}
          </div>

          {/* Прогресс */}
          {!isLocked && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Прогресс</span>
                <span>
                  {achievement.progress} / {achievement.max_progress}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Подсказка */}
          {achievement.hint && !isCompleted && (
            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
              <span className="font-medium">Как добрать:</span> {achievement.hint}
            </div>
          )}

          {/* Награда */}
          {isCompleted && (
            <div className="mt-2 flex items-center gap-2 text-xs">
              {achievement.reward.points && (
                <span className="text-emerald-600 font-medium">
                  +{achievement.reward.points} Points
                </span>
              )}
              {achievement.reward.nft && (
                <span className="text-purple-600 font-medium">+ NFT</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

