/**
 * Quest Asia - Steps Utils
 * Утилиты для работы с шагами квестов
 */

import type { QuestStep, StepResult } from '../types';

/**
 * Получить следующий шаг квеста
 */
export function getNextStep(steps: QuestStep[], currentStepIndex: number): QuestStep | null {
  if (currentStepIndex >= steps.length - 1) {
    return null;
  }
  return steps[currentStepIndex + 1];
}

/**
 * Получить предыдущий шаг квеста
 */
export function getPreviousStep(steps: QuestStep[], currentStepIndex: number): QuestStep | null {
  if (currentStepIndex <= 0) {
    return null;
  }
  return steps[currentStepIndex - 1];
}

/**
 * Проверить, завершён ли шаг
 */
export function isStepCompleted(stepId: string, completedSteps: string[]): boolean {
  return completedSteps.includes(stepId);
}

/**
 * Вычислить прогресс прохождения квеста (в процентах)
 */
export function calculateProgress(steps: QuestStep[], completedSteps: string[]): number {
  if (steps.length === 0) return 0;
  return Math.round((completedSteps.length / steps.length) * 100);
}

/**
 * Получить текущий шаг по индексу
 */
export function getCurrentStep(steps: QuestStep[], currentStepIndex: number): QuestStep | null {
  if (currentStepIndex < 0 || currentStepIndex >= steps.length) {
    return null;
  }
  return steps[currentStepIndex];
}

/**
 * Проверить, можно ли пропустить шаг
 */
export function canSkipStep(step: QuestStep): boolean {
  return step.validation.skipAllowed;
}

/**
 * Получить штраф за пропуск шага
 */
export function getSkipPenalty(step: QuestStep): number {
  return step.validation.skipPenalty;
}

