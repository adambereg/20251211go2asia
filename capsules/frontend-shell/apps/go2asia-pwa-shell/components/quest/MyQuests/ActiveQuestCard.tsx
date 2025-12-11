'use client';

/**
 * Quest Asia - Active Quest Card
 * Карточка активного квеста с прогрессом
 */

import { useRouter } from 'next/navigation';
import { Play, Pause, MapPin, Clock, WifiOff } from 'lucide-react';
import type { Quest, QuestProgress } from '@/components/quest/types';
import { calculateProgress } from '@/components/quest/utils/steps';
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

interface ActiveQuestCardProps {
  quest: Quest;
  progress: QuestProgress;
  isOnline: boolean;
}

export function ActiveQuestCard({ quest, progress, isOnline }: ActiveQuestCardProps) {
  const router = useRouter();
  
  const progressPercent = calculateProgress(quest.steps, progress.completedSteps);
  const timeSpent = progress.startedAt
    ? Math.round((Date.now() - progress.startedAt.getTime()) / 60000)
    : 0;

  const handleContinue = () => {
    router.push(`/quest/${quest.id}/run`);
  };

  const handleViewDetails = () => {
    router.push(`/quest/${quest.id}`);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Изображение */}
        <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={quest.coverPhoto}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          {!isOnline && progress.offlineData.cached && (
            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              Офлайн
            </div>
          )}
          {progress.status === 'paused' && (
            <div className="absolute top-2 left-2 bg-slate-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Pause className="w-3 h-3" />
              На паузе
            </div>
          )}
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

          {/* Прогресс */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">
                Прогресс: {progress.completedSteps.length} / {quest.steps.length} шагов
              </span>
              <span className="text-sm font-semibold text-purple-600">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Статистика */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Начат {formatTimeAgo(progress.startedAt)}
            </span>
            {timeSpent > 0 && (
              <span>Время: {timeSpent} мин</span>
            )}
          </div>

          {/* Действия */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              {progress.status === 'paused' ? 'Продолжить' : 'Продолжить'}
            </button>
            <button
              onClick={handleViewDetails}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

