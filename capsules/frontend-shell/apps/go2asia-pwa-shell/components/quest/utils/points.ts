/**
 * Quest Asia - Points System
 * Улучшенная система начисления очков с множителями
 */

import type { Quest, QuestStep, StepResult, QuestProgress } from '../types';

/**
 * Интерфейс для множителей очков
 */
export interface PointsMultipliers {
  speed?: number; // Множитель за скорость (1.0 - 1.2)
  noHint?: number; // Множитель за прохождение без подсказок (1.0 или 1.3)
  streak?: number; // Множитель за серийность (1.0 - 1.1)
  perfect?: number; // Множитель за идеальное прохождение (1.0 или 1.2)
}

/**
 * Вычислить очки за шаг с учётом множителей
 */
export function calculateStepPointsWithMultipliers(
  step: QuestStep,
  multipliers: PointsMultipliers = {}
): number {
  let points = step.rewards.points;

  // Применяем множители
  if (multipliers.speed) {
    points = Math.round(points * multipliers.speed);
  }
  if (multipliers.noHint) {
    points = Math.round(points * multipliers.noHint);
  }
  if (multipliers.streak) {
    points = Math.round(points * multipliers.streak);
  }
  if (multipliers.perfect) {
    points = Math.round(points * multipliers.perfect);
  }

  return points;
}

/**
 * Вычислить множитель за скорость прохождения
 */
export function calculateSpeedMultiplier(
  step: QuestStep,
  timeSpent: number, // секунды
  averageTime: number // секунды
): number {
  if (timeSpent <= averageTime * 0.5) {
    return 1.2; // +20% за очень быстрое прохождение
  }
  if (timeSpent <= averageTime * 0.75) {
    return 1.1; // +10% за быстрое прохождение
  }
  return 1.0;
}

/**
 * Вычислить множитель за прохождение без подсказок
 */
export function calculateNoHintMultiplier(usedHint: boolean): number {
  return usedHint ? 1.0 : 1.3; // +30% за прохождение без подсказок
}

/**
 * Вычислить множитель за серийность (последовательные квесты)
 */
export function calculateStreakMultiplier(consecutiveQuests: number): number {
  if (consecutiveQuests >= 10) {
    return 1.1; // +10% за 10+ последовательных квестов
  }
  if (consecutiveQuests >= 5) {
    return 1.05; // +5% за 5+ последовательных квестов
  }
  return 1.0;
}

/**
 * Вычислить множитель за идеальное прохождение (все шаги без пропусков)
 */
export function calculatePerfectMultiplier(
  completedSteps: number,
  totalSteps: number
): number {
  if (completedSteps === totalSteps) {
    return 1.2; // +20% за идеальное прохождение
  }
  return 1.0;
}

/**
 * Вычислить общие очки за квест с учётом всех множителей
 */
export function calculateTotalQuestPoints(
  quest: Quest,
  stepResults: { [stepId: string]: StepResult },
  multipliers: PointsMultipliers = {}
): number {
  let totalPoints = 0;

  // Очки за шаги
  Object.values(stepResults).forEach((result) => {
    if (result.completed && result.points > 0) {
      let stepPoints = result.points;

      // Применяем множители к очкам шага
      if (multipliers.speed) {
        stepPoints = Math.round(stepPoints * multipliers.speed);
      }
      if (multipliers.noHint) {
        stepPoints = Math.round(stepPoints * multipliers.noHint);
      }
      if (multipliers.streak) {
        stepPoints = Math.round(stepPoints * multipliers.streak);
      }
      if (multipliers.perfect) {
        stepPoints = Math.round(stepPoints * multipliers.perfect);
      }

      totalPoints += stepPoints;
    }
  });

  // Очки за финиш (базовые очки квеста)
  let finishPoints = quest.rewards.points;
  
  // Применяем множители к финишным очкам
  if (multipliers.streak) {
    finishPoints = Math.round(finishPoints * multipliers.streak);
  }
  if (multipliers.perfect) {
    finishPoints = Math.round(finishPoints * multipliers.perfect);
  }

  totalPoints += finishPoints;

  return totalPoints;
}

/**
 * Получить количество последовательных завершённых квестов
 */
export function getConsecutiveQuestsCount(
  progresses: QuestProgress[]
): number {
  const completed = progresses
    .filter((p) => p.status === 'completed' && p.completedAt)
    .sort((a, b) => (b.completedAt!.getTime() - a.completedAt!.getTime()));

  if (completed.length === 0) return 0;

  let streak = 1;
  for (let i = 1; i < completed.length; i++) {
    const prevDate = completed[i - 1].completedAt!;
    const currDate = completed[i].completedAt!;
    const daysDiff = Math.floor(
      (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

