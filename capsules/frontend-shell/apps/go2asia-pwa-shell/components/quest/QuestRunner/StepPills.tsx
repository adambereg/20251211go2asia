'use client';

/**
 * Quest Asia - Step Pills
 * Пилюли шагов квеста
 */

import { Check } from 'lucide-react';
import type { QuestStep } from '../types';
import { isStepCompleted } from '../utils/steps';

interface StepPillsProps {
  steps: QuestStep[];
  currentStepIndex: number;
  completedSteps: string[];
}

export function StepPills({ steps, currentStepIndex, completedSteps }: StepPillsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((step, index) => {
        const isCompleted = isStepCompleted(step.id, completedSteps);
        const isCurrent = index === currentStepIndex;
        const isPast = index < currentStepIndex;

        return (
          <div
            key={step.id}
            className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
              ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-purple-600 text-white ring-2 ring-purple-300 ring-offset-2'
                  : isPast
                  ? 'bg-slate-300 text-slate-600'
                  : 'bg-slate-200 text-slate-500'
              }
            `}
            title={step.title}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              index + 1
            )}
          </div>
        );
      })}
    </div>
  );
}

