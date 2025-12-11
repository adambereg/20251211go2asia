'use client';

/**
 * Quest Asia - Quest Runner Client
 * Основной компонент для прохождения квеста
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Quest, QuestProgress, StepResult, Coordinates } from '@/components/quest/types';
import { QuestProgressBar } from '@/components/quest/QuestRunner/QuestProgressBar';
import { StepPills } from '@/components/quest/QuestRunner/StepPills';
import { StepGeoCheckin } from '@/components/quest/QuestRunner/Steps/StepGeoCheckin';
import { StepQRCode } from '@/components/quest/QuestRunner/Steps/StepQRCode';
import { StepQuiz } from '@/components/quest/QuestRunner/Steps/StepQuiz';
import { StepMedia } from '@/components/quest/QuestRunner/Steps/StepMedia';
import { StepPulseEvent } from '@/components/quest/QuestRunner/Steps/StepPulseEvent';
import { StepTask } from '@/components/quest/QuestRunner/Steps/StepTask';
import { QuestRunnerActions } from '@/components/quest/QuestRunner/QuestRunnerActions';
import { getCurrentStep, calculateProgress } from '@/components/quest/utils/steps';
import { isOnline, subscribeToOnlineStatus } from '@/components/quest/utils/offline';
import { Pause, X } from 'lucide-react';

interface QuestRunnerClientProps {
  quest: Quest;
}

/**
 * Сохранить прогресс в localStorage
 */
function saveProgressToLocal(progress: QuestProgress): void {
  try {
    localStorage.setItem(`quest-progress-${progress.questId}`, JSON.stringify({
      ...progress,
      startedAt: progress.startedAt.toISOString(),
      completedAt: progress.completedAt?.toISOString(),
      pausedAt: progress.pausedAt?.toISOString(),
      offlineData: {
        ...progress.offlineData,
        lastSyncAt: progress.offlineData.lastSyncAt?.toISOString(),
      },
      stepResults: Object.fromEntries(
        Object.entries(progress.stepResults).map(([key, value]) => [
          key,
          {
            ...value,
            completedAt: value.completedAt.toISOString(),
          },
        ])
      ),
    }));
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
  }
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

export function QuestRunnerClient({ quest }: QuestRunnerClientProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<QuestProgress | null>(null);
  const [isOnlineState, setIsOnlineState] = useState(true);
  const [showHint, setShowHint] = useState(false);

  // Инициализация прогресса
  useEffect(() => {
    // Пробуем загрузить существующий прогресс
    const savedProgress = loadProgressFromLocal(quest.id);
    
    if (savedProgress && savedProgress.status === 'active') {
      setProgress(savedProgress);
    } else {
      // Создаём новый прогресс
      const newProgress: QuestProgress = {
        questId: quest.id,
        userId: 'demo-user', // TODO: получить из контекста авторизации
        status: 'active',
        currentStep: 0,
        completedSteps: [],
        startedAt: new Date(),
        offlineData: {
          cached: true,
          pendingActions: [],
        },
        stepResults: {},
      };
      setProgress(newProgress);
      saveProgressToLocal(newProgress);
    }
  }, [quest.id]);

  // Подписка на статус сети
  useEffect(() => {
    setIsOnlineState(isOnline());
    const unsubscribe = subscribeToOnlineStatus(setIsOnlineState);
    return unsubscribe;
  }, []);

  // Сохранение прогресса при изменениях
  useEffect(() => {
    if (progress) {
      saveProgressToLocal(progress);
    }
  }, [progress]);

  const currentStepData = progress ? getCurrentStep(quest.steps, progress.currentStep) : null;
  const progressPercent = progress ? calculateProgress(quest.steps, progress.completedSteps) : 0;

  const handleStepComplete = useCallback((stepId: string, result: StepResult) => {
    if (!progress) return;

    const newProgress: QuestProgress = {
      ...progress,
      currentStep: progress.currentStep + 1,
      completedSteps: [...progress.completedSteps, stepId],
      stepResults: {
        ...progress.stepResults,
        [stepId]: result,
      },
      offlineData: {
        ...progress.offlineData,
        pendingActions: [
          ...progress.offlineData.pendingActions,
          {
            id: `action-${Date.now()}`,
            type: 'step-completion',
            questId: quest.id,
            stepId,
            data: result,
            createdAt: new Date(),
            retries: 0,
          },
        ],
      },
    };

    // Проверяем, завершён ли квест
    if (newProgress.currentStep >= quest.steps.length) {
      newProgress.status = 'completed';
      newProgress.completedAt = new Date();
      // Переход на экран награды
      setTimeout(() => {
        router.push(`/quest/${quest.id}/complete`);
      }, 1000);
    }

    setProgress(newProgress);
  }, [progress, quest.id, quest.steps.length, router]);

  const handleSkipStep = useCallback(() => {
    if (!progress || !currentStepData) return;
    if (!currentStepData.validation.skipAllowed) return;

    const penalty = currentStepData.validation.skipPenalty;
    const newProgress: QuestProgress = {
      ...progress,
      currentStep: progress.currentStep + 1,
      stepResults: {
        ...progress.stepResults,
        [currentStepData.id]: {
          stepId: currentStepData.id,
          completed: false,
          completedAt: new Date(),
          method: 'geo', // По умолчанию
          data: {},
          points: -penalty,
          synced: false,
        },
      },
    };

    if (newProgress.currentStep >= quest.steps.length) {
      newProgress.status = 'completed';
      newProgress.completedAt = new Date();
    }

    setProgress(newProgress);
  }, [progress, currentStepData, quest.steps.length]);

  const handlePause = useCallback(() => {
    if (!progress) return;

    const newProgress: QuestProgress = {
      ...progress,
      status: 'paused',
      pausedAt: new Date(),
    };

    setProgress(newProgress);
    router.push(`/quest/${quest.id}`);
  }, [progress, quest.id, router]);

  const handleExit = useCallback(() => {
    if (confirm('Вы уверены, что хотите выйти? Прогресс будет сохранён.')) {
      router.push(`/quest/${quest.id}`);
    }
  }, [quest.id, router]);

  if (!progress || !currentStepData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-slate-900">{quest.title}</h1>
            <button
              onClick={handleExit}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Выйти"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          
          <QuestProgressBar progress={progressPercent} />
          
          <div className="mt-4">
            <StepPills
              steps={quest.steps}
              currentStepIndex={progress.currentStep}
              completedSteps={progress.completedSteps}
            />
          </div>
        </div>
      </div>

      {/* Офлайн-индикатор */}
      {!isOnlineState && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
          <span className="font-semibold">Офлайн-режим</span> — прогресс сохраняется локально
        </div>
      )}

      {/* Текущий шаг */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                {progress.currentStep + 1}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{currentStepData.title}</h2>
                <p className="text-slate-600 mt-1">{currentStepData.description}</p>
              </div>
            </div>
          </div>

          {/* Компонент шага по типу */}
          {currentStepData.type === 'geo-checkin' && (
            <StepGeoCheckin
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
          {currentStepData.type === 'qr-code' && (
            <StepQRCode
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
          {currentStepData.type === 'quiz' && (
            <StepQuiz
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
          {(currentStepData.type === 'photo' || currentStepData.type === 'video') && (
            <StepMedia
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
          {currentStepData.type === 'pulse-event' && (
            <StepPulseEvent
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
          {currentStepData.type === 'task' && (
            <StepTask
              step={currentStepData}
              onComplete={(result) => handleStepComplete(currentStepData.id, result)}
            />
          )}
        </div>
      </div>

      {/* Нижняя панель действий */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
        <QuestRunnerActions
          step={currentStepData}
          hint={currentStepData.hint}
          showHint={showHint}
          onToggleHint={() => setShowHint(!showHint)}
          onSkip={handleSkipStep}
          onPause={handlePause}
          canSkip={currentStepData.validation.skipAllowed}
          skipPenalty={currentStepData.validation.skipPenalty}
        />
      </div>
    </div>
  );
}

