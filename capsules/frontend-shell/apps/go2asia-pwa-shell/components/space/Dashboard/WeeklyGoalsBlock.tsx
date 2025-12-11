'use client';

import Link from 'next/link';
import { Card } from '@go2asia/ui';
import { Trophy, MapPin, BookOpen, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import type { WeeklyGoal } from '../types';

interface WeeklyGoalsBlockProps {
  goals: WeeklyGoal[];
}

const goalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '🗺️': Trophy,
  '📍': MapPin,
  '✍️': BookOpen,
  '👤': UserPlus,
};

const goalTypeIcons: Record<WeeklyGoal['type'], React.ComponentType<{ className?: string }>> = {
  quest: Trophy,
  place: MapPin,
  guide: BookOpen,
  referral: UserPlus,
  post: BookOpen,
};

export function WeeklyGoalsBlock({ goals }: WeeklyGoalsBlockProps) {
  const activeGoals = goals.filter((goal) => goal.current < goal.target);

  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Достижения недели
        </h2>
        <Link
          href="/space/quests"
          className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
        >
          Все цели
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {activeGoals.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm">
            Все цели выполнены! 🎉
          </div>
        ) : (
          activeGoals.map((goal) => {
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const Icon =
              goalIcons[goal.icon] || goalTypeIcons[goal.type] || Trophy;

            return (
              <div
                key={goal.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                {/* Иконка */}
                <div className="flex-shrink-0">
                  {goal.icon && goal.icon.match(/[\p{Emoji}]/u) ? (
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-xl">
                      {goal.icon}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-sky-600" />
                    </div>
                  )}
                </div>

                {/* Контент */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-slate-900">
                      {goal.title}
                    </h3>
                    {goal.pointsReward && (
                      <span className="text-xs font-medium text-sky-600">
                        +{goal.pointsReward} Points
                      </span>
                    )}
                  </div>

                  {/* Прогресс */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">
                        {goal.current} / {goal.target}
                      </span>
                      <span className="text-slate-500">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Статус */}
                {goal.current >= goal.target && (
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

