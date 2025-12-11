'use client';

import Link from 'next/link';
import { Card, Avatar } from '@go2asia/ui';
import { Heart, MessageSquare, UserPlus, TrendingUp, ArrowRight } from 'lucide-react';
import type { ActivityItem, User } from '../types';
function formatTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'только что';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} дн назад`;
  return `${Math.floor(diffInSeconds / 604800)} нед назад`;
}

interface ActivityBlockProps {
  activities: ActivityItem[];
  currentUser: User;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const activityIcons = {
  like: Heart,
  comment: MessageSquare,
  follow: UserPlus,
  mention: MessageSquare,
  points: TrendingUp,
  level_up: TrendingUp,
};

const activityLabels = {
  like: 'лайкнул(а)',
  comment: 'прокомментировал(а)',
  follow: 'подписался(лась)',
  mention: 'упомянул(а)',
  points: 'получено',
  level_up: 'новый уровень',
};

export function ActivityBlock({ activities, currentUser }: ActivityBlockProps) {
  const recentActivities = activities.slice(0, 5);

  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Активность</h2>
        <Link
          href="/space/community/feed"
          className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
        >
          Все
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {recentActivities.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">
            Пока нет активности
          </div>
        ) : (
          recentActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            const label = activityLabels[activity.type];

            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {activity.actor ? (
                  <Avatar
                    initials={getInitials(activity.actor.displayName)}
                    size="sm"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-sky-600" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900">
                    {activity.actor ? (
                      <>
                        <span className="font-medium">
                          {activity.actor.displayName}
                        </span>{' '}
                        {label}
                        {activity.target && (
                          <>
                            {' '}
                            {activity.target.type === 'post' && 'ваш пост'}
                            {activity.target.type === 'comment' && 'ваш комментарий'}
                            {activity.target.type === 'user' && 'на вас'}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {activity.type === 'points' && (
                          <>
                            Получено{' '}
                            <span className="font-medium text-green-600">
                              +{activity.data?.points} Points
                            </span>
                          </>
                        )}
                        {activity.type === 'level_up' && (
                          <>
                            Достигнут{' '}
                            <span className="font-medium text-purple-600">
                              уровень {activity.data?.level}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {activity.target?.preview && (
                    <div className="text-xs text-slate-500 mt-1 truncate">
                      {activity.target.preview}
                    </div>
                  )}
                  <div className="text-xs text-slate-400 mt-1">
                    {formatTimeAgo(activity.createdAt)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

