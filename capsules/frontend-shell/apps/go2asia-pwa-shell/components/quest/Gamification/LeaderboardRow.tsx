'use client';

/**
 * Quest Asia - Leaderboard Row
 * Строка лидерборда
 */

import { Trophy, Crown, Star } from 'lucide-react';
import type { LeaderboardEntry } from '@/components/quest/types';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
}

export function LeaderboardRow({ entry, rank, isCurrentUser = false }: LeaderboardRowProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-amber-600';
    if (rank === 2) return 'text-slate-400';
    if (rank === 3) return 'text-amber-500';
    return 'text-slate-500';
  };

  return (
    <div
      className={`
        flex items-center gap-4 p-4 border-b border-slate-200 last:border-b-0
        ${isCurrentUser ? 'bg-purple-50' : 'hover:bg-slate-50'}
      `}
    >
      {/* Ранг */}
      <div className={`text-2xl font-bold ${getRankColor(rank)} w-12 text-center`}>
        {rank}
      </div>

      {/* Аватар */}
      <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.username} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-400">
            {entry.username[0].toUpperCase()}
          </div>
        )}
      </div>

      {/* Имя пользователя */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-lg ${isCurrentUser ? 'text-purple-700' : 'text-slate-900'}`}>
            {entry.username}
            {isCurrentUser && <span className="ml-2 text-sm text-purple-600">(Вы)</span>}
          </h3>
          {entry.isVIP && (
            <Crown className="w-5 h-5 text-amber-500" aria-label="VIP" />
          )}
          {entry.isPRO && (
            <Star className="w-5 h-5 text-purple-500" aria-label="PRO" />
          )}
        </div>
        <p className="text-sm text-slate-600">
          {entry.questsCompleted} квестов завершено
        </p>
      </div>

      {/* Очки */}
      <div className="text-right">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className={`text-xl font-bold ${isCurrentUser ? 'text-purple-700' : 'text-slate-900'}`}>
            {entry.points.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-slate-500">очков</p>
      </div>

      {/* Бейджи */}
      {entry.badges.length > 0 && (
        <div className="flex gap-1">
          {entry.badges.slice(0, 3).map((badge) => (
            <div
              key={badge.id}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-300"
              title={badge.name}
            >
              <img src={badge.image} alt={badge.name} className="w-full h-full object-cover" />
            </div>
          ))}
          {entry.badges.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              +{entry.badges.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

