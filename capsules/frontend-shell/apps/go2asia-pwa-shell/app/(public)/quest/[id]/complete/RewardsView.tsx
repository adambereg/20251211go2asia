'use client';

/**
 * Quest Asia - Rewards View
 * Главный компонент экрана награды после завершения квеста
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Quest, QuestProgress } from '@/components/quest/types';
import { RewardsAnimation } from '@/components/quest/QuestRewards/RewardsAnimation';
import { PointsDisplay } from '@/components/quest/QuestRewards/PointsDisplay';
import { NFTBadgeDisplay } from '@/components/quest/QuestRewards/NFTBadgeDisplay';
import { RewardsActions } from '@/components/quest/QuestRewards/RewardsActions';
import { calculateTotalPoints } from '@/components/quest/utils/rewards';
import { Trophy, Sparkles } from 'lucide-react';

interface RewardsViewProps {
  quest: Quest;
}

/**
 * Загрузить прогресс из localStorage
 */
function loadProgressFromLocal(questId: string): QuestProgress | null {
  try {
    const stored = localStorage.getItem(`quest-progress-${questId}`);
    if (!stored) return null;

    const data = JSON.parse(stored);
    return {
      ...data,
      startedAt: new Date(data.startedAt),
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      pausedAt: data.pausedAt ? new Date(data.pausedAt) : undefined,
      offlineData: {
        ...data.offlineData,
        lastSyncAt: data.offlineData.lastSyncAt ? new Date(data.offlineData.lastSyncAt) : undefined,
      },
      stepResults: Object.fromEntries(
        Object.entries(data.stepResults).map(([key, value]: [string, any]) => [
          key,
          {
            ...value,
            completedAt: new Date(value.completedAt),
          },
        ])
      ),
    } as QuestProgress;
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error);
    return null;
  }
}

export function RewardsView({ quest }: RewardsViewProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<QuestProgress | null>(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Загружаем прогресс из localStorage
    const savedProgress = loadProgressFromLocal(quest.id);
    
    if (!savedProgress || savedProgress.status !== 'completed') {
      // Если квест не завершён, перенаправляем на детальную страницу
      router.push(`/quest/${quest.id}`);
      return;
    }

    setProgress(savedProgress);
    
    // Вычисляем итоговые очки
    const points = calculateTotalPoints(savedProgress.stepResults, quest.rewards.points);
    setTotalPoints(points);

    // Скрываем анимацию через 3 секунды
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [quest.id, quest.rewards.points, router]);

  if (!progress) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Загрузка...</div>
      </div>
    );
  }

  const earnedBadges = quest.rewards.nftBadges || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      {/* Анимация конфетти */}
      {showAnimation && <RewardsAnimation />}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-full mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Поздравляем!
          </h1>
          <p className="text-xl text-slate-600">
            Вы завершили квест "{quest.title}"
          </p>
        </div>

        {/* Награды */}
        <div className="space-y-6 mb-8">
          {/* Очки */}
          <PointsDisplay points={totalPoints} basePoints={quest.rewards.points} />

          {/* NFT-бейджи */}
          {earnedBadges.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold">NFT-бейджи</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {earnedBadges.map((badge) => (
                  <NFTBadgeDisplay key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Статистика прохождения */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Статистика</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-600">Шагов выполнено</p>
              <p className="text-2xl font-bold text-purple-600">
                {progress.completedSteps.length} / {quest.steps.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Время прохождения</p>
              <p className="text-2xl font-bold text-purple-600">
                {progress.completedAt && progress.startedAt
                  ? Math.round(
                      (progress.completedAt.getTime() - progress.startedAt.getTime()) / 60000
                    )
                  : 0}{' '}
                мин
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Очков заработано</p>
              <p className="text-2xl font-bold text-emerald-600">{totalPoints}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Бейджей получено</p>
              <p className="text-2xl font-bold text-purple-600">{earnedBadges.length}</p>
            </div>
          </div>
        </div>

        {/* Действия */}
        <RewardsActions quest={quest} />
      </div>
    </div>
  );
}

