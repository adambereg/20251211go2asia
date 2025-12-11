'use client';

/**
 * Quest Asia - Completed Quest Card
 * Карточка завершённого квеста
 */

import { useRouter } from 'next/navigation';
import { Trophy, MapPin, Clock, CheckCircle2, Star } from 'lucide-react';
import type { Quest, QuestProgress } from '@/components/quest/types';
import { calculateTotalPoints } from '@/components/quest/utils/rewards';
import { QUEST_TYPE_LABELS, DIFFICULTY_LABELS } from '@/components/quest/types';
/**
 * Форматировать дату в относительный формат
 */
function formatTimeAgo(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'только что';
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'минуту' : minutes < 5 ? 'минуты' : 'минут'} назад`;
  if (hours < 24) return `${hours} ${hours === 1 ? 'час' : hours < 5 ? 'часа' : 'часов'} назад`;
  if (days < 7) return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'} назад`;
  return date.toLocaleDateString('ru-RU');
}

interface CompletedQuestCardProps {
  quest: Quest;
  progress: QuestProgress;
}

export function CompletedQuestCard({ quest, progress }: CompletedQuestCardProps) {
  const router = useRouter();
  
  const totalPoints = calculateTotalPoints(progress.stepResults, quest.rewards.points);
  const completionTime = progress.completedAt && progress.startedAt
    ? Math.round((progress.completedAt.getTime() - progress.startedAt.getTime()) / 60000)
    : 0;

  const handleViewRewards = () => {
    router.push(`/quest/${quest.id}/complete`);
  };

  const handleViewDetails = () => {
    router.push(`/quest/${quest.id}`);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-emerald-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Изображение */}
        <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={quest.coverPhoto}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/50 to-transparent flex items-end justify-center pb-2">
            <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Завершён
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 mb-1 truncate">
                {quest.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {quest.city}
                </span>
                <span>•</span>
                <span>{QUEST_TYPE_LABELS[quest.type]}</span>
                <span>•</span>
                <span>{DIFFICULTY_LABELS[quest.difficulty]}</span>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-600 mb-1">Очки</p>
              <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                {totalPoints.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Время</p>
              <p className="text-lg font-bold text-slate-900 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {completionTime} мин
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Шагов</p>
              <p className="text-lg font-bold text-slate-900">
                {progress.completedSteps.length} / {quest.steps.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Завершён</p>
              <p className="text-sm font-semibold text-slate-700">
                {progress.completedAt ? formatTimeAgo(progress.completedAt) : 'Недавно'}
              </p>
            </div>
          </div>

          {/* Бейджи */}
          {quest.rewards.nftBadges.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-slate-600 mb-2">Полученные бейджи:</p>
              <div className="flex flex-wrap gap-2">
                {quest.rewards.nftBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-1 text-xs font-semibold text-purple-700"
                  >
                    {badge.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Действия */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleViewRewards}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Trophy className="w-4 h-4" />
              Посмотреть награды
            </button>
            <button
              onClick={handleViewDetails}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Подробнее
            </button>
            <button
              onClick={() => router.push(`/quest/${quest.id}?review=true`)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Star className="w-4 h-4" />
              Оставить отзыв
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

