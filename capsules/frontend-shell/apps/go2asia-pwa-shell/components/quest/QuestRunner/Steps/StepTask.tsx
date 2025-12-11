'use client';

/**
 * Quest Asia - Step Task
 * Компонент для задачи в месте
 */

import { useState } from 'react';
import { CheckSquare, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import type { QuestStep, StepResult } from '@/components/quest/types';

interface StepTaskProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepTask({ step, onComplete }: StepTaskProps) {
  const [completed, setCompleted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const confirmationMethod = step.confirmationMethod || 'check';

  const handleComplete = () => {
    if (confirmationMethod === 'code' && !confirmationCode.trim()) {
      setError('Введите код подтверждения');
      return;
    }

    setCompleted(true);
    setError(null);

    // Имитация подтверждения
    setTimeout(() => {
      const result: StepResult = {
        stepId: step.id,
        completed: true,
        completedAt: new Date(),
        method: 'task',
        data: {
          confirmation: confirmationCode || 'completed',
        },
        points: step.rewards.points,
        synced: false,
      };

      onComplete(result);
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Информация о задаче */}
      <div className="bg-slate-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckSquare className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">Выполните задачу</p>
            {step.placeId && (
              <p className="text-xs text-slate-600 mt-1">
                Место ID: {step.placeId}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Описание задачи */}
      <div className="bg-white border-2 border-slate-200 rounded-lg p-5">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
        <p className="text-slate-600 mb-4">{step.description}</p>
        
        {step.taskDescription && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-900 font-semibold mb-2">Детали задачи:</p>
            <p className="text-sm text-purple-800">{step.taskDescription}</p>
          </div>
        )}

        {/* Геолокация (если есть) */}
        {step.coordinates && (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>
              Координаты: {step.coordinates.lat.toFixed(6)}, {step.coordinates.lng.toFixed(6)}
            </span>
          </div>
        )}
      </div>

      {/* Метод подтверждения */}
      {confirmationMethod === 'code' && (
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Код подтверждения
          </label>
          <input
            type="text"
            value={confirmationCode}
            onChange={(e) => {
              setConfirmationCode(e.target.value);
              setError(null);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleComplete();
              }
            }}
            placeholder="Введите код"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:outline-none"
            disabled={completed}
          />
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Кнопка подтверждения */}
      {!completed && (
        <button
          onClick={handleComplete}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          {confirmationMethod === 'code' ? 'Подтвердить код' : 'Задача выполнена'}
        </button>
      )}

      {/* Успех */}
      {completed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-800 font-semibold">
              Задача выполнена!
            </p>
          </div>
        </div>
      )}

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

