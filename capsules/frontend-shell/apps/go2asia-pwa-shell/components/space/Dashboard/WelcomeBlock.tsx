'use client';

import Link from 'next/link';
import { Card, Avatar, Badge } from '@go2asia/ui';
import { MapPin, TrendingUp } from 'lucide-react';
import type { User } from '../types';
import { ROLE_LABELS, ROLE_COLORS } from '../types';

interface WelcomeBlockProps {
  user: User;
  levelProgress: number;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function WelcomeBlock({ user, levelProgress }: WelcomeBlockProps) {
  const roleColor = ROLE_COLORS[user.role];

  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Аватар */}
        <div className="relative">
          <Avatar initials={getInitials(user.displayName)} size="lg" />
          {user.verified && (
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <Badge variant="verified" size="sm" />
            </div>
          )}
        </div>

        {/* Информация */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {/* Мини-аватар с бейджем рядом с именем */}
            <div className="flex items-center gap-2">
              <Avatar initials={getInitials(user.displayName)} size="sm" />
              <h1 className="text-2xl font-bold text-slate-900">
                Привет, {user.displayName.split(' ')[0]}!
              </h1>
            </div>
            <Badge
              className={`${roleColor.bg} ${roleColor.text} border-0`}
              size="md"
            >
              {ROLE_LABELS[user.role]}
            </Badge>
          </div>

          {/* Город */}
          {user.city && (
            <div className="flex items-center gap-1.5 text-slate-600 mb-3">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{user.city}</span>
            </div>
          )}

          {/* Прогресс уровня */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Уровень {user.level}</span>
              <span className="text-slate-500">
                {levelProgress}% до уровня {user.level + 1}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="flex items-center gap-4 sm:flex-col sm:items-end">
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">
              {user.points.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">Points</div>
          </div>
        </div>
      </div>
    </Card>
  );
}


