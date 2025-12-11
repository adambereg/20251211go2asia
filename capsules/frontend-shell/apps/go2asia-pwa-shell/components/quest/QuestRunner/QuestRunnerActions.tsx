'use client';

/**
 * Quest Asia - Quest Runner Actions
 * Нижняя панель действий для экрана прохождения
 */

import { Lightbulb, SkipForward, Pause } from 'lucide-react';
import type { QuestStep } from '@/components/quest/types';

interface QuestRunnerActionsProps {
  step: QuestStep;
  hint?: string;
  showHint: boolean;
  onToggleHint: () => void;
  onSkip: () => void;
  onPause: () => void;
  canSkip: boolean;
  skipPenalty: number;
}

export function QuestRunnerActions({
  step,
  hint,
  showHint,
  onToggleHint,
  onSkip,
  onPause,
  canSkip,
  skipPenalty,
}: QuestRunnerActionsProps) {
  return (
    <div className="px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Подсказка */}
        {hint && (
          <button
            onClick={onToggleHint}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              showHint
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className={`w-4 h-4 ${showHint ? 'fill-amber-600' : ''}`} />
            <span className="hidden sm:inline">Подсказка</span>
          </button>
        )}

        <div className="flex-1" />

        {/* Пропустить */}
        {canSkip && (
          <button
            onClick={onSkip}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <SkipForward className="w-4 h-4" />
            <span className="hidden sm:inline">
              Пропустить {skipPenalty > 0 && `(-${skipPenalty} очков)`}
            </span>
          </button>
        )}

        {/* Пауза */}
        <button
          onClick={onPause}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
        >
          <Pause className="w-4 h-4" />
          <span className="hidden sm:inline">Пауза</span>
        </button>
      </div>

      {/* Отображение подсказки */}
      {showHint && hint && (
        <div className="mt-4 max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0 fill-amber-600" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Подсказка</p>
                <p className="text-sm text-amber-800">{hint}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

