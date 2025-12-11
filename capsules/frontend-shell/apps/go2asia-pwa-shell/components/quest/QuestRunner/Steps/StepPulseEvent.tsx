'use client';

/**
 * Quest Asia - Step Pulse Event
 * Компонент для события Pulse
 */

import { useState } from 'react';
import { Calendar, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { QuestStep, StepResult } from '@/components/quest/types';

interface StepPulseEventProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepPulseEvent({ step, onComplete }: StepPulseEventProps) {
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  if (!step.eventId) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-800">Событие не настроено для этого шага</p>
        </div>
      </div>
    );
  }

  const handleOpenEvent = () => {
    // Переход на страницу события в модуле Pulse
    router.push(`/pulse/events/${step.eventId}`);
  };

  const handleConfirm = () => {
    setConfirmed(true);

    // Имитация подтверждения участия
    setTimeout(() => {
      const result: StepResult = {
        stepId: step.id,
        completed: true,
        completedAt: new Date(),
        method: 'pulse',
        data: {
          eventId: step.eventId,
        },
        points: step.rewards.points,
        synced: false,
      };

      onComplete(result);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Информация о событии */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Посетите событие</p>
            <p className="text-xs text-slate-600 mt-1">
              Откройте событие в модуле Pulse и подтвердите участие
            </p>
          </div>
        </div>
      </div>

      {/* Описание шага */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
        <p className="text-slate-600">{step.description}</p>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleOpenEvent}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-5 h-5" />
          Открыть событие в Pulse
        </button>

        {!confirmed && (
          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Подтвердить участие
          </button>
        )}

        {confirmed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800 font-semibold">
                Участие подтверждено!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Подсказка */}
      {step.hint && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Подсказка:</span> {step.hint}
          </p>
        </div>
      )}
    </div>
  );
}

