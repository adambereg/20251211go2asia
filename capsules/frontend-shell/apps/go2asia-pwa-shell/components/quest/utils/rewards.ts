/**
 * Quest Asia - Rewards Utils
 * Утилиты для работы с наградами
 */

import type { Quest, QuestStep, StepResult, NFTBadge } from '../types';

/**
 * Вычислить базовые очки за шаг
 */
export function calculateStepPoints(step: QuestStep, multiplier: number = 1): number {
  return Math.round(step.rewards.points * multiplier);
}

/**
 * Вычислить множитель за скорость
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
 * Вычислить множитель за серийность
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
 * Вычислить общие очки за квест
 */
export function calculateQuestPoints(
  quest: Quest,
  stepResults: StepResult[],
  multipliers: {
    speed?: number;
    noHint?: number;
    streak?: number;
  } = {}
): number {
  let totalPoints = 0;

  // Очки за шаги
  stepResults.forEach((result) => {
    let stepPoints = result.points;
    
    // Применяем множители
    if (multipliers.speed) {
      stepPoints = Math.round(stepPoints * multipliers.speed);
    }
    if (multipliers.noHint) {
      stepPoints = Math.round(stepPoints * multipliers.noHint);
    }
    if (multipliers.streak) {
      stepPoints = Math.round(stepPoints * multipliers.streak);
    }
    
    totalPoints += stepPoints;
  });

  // Очки за финиш
  totalPoints += quest.rewards.points;

  return totalPoints;
}

/**
 * Проверить, выполнены ли условия для NFT-бейджа
 */
export function checkNFTBadgeRequirements(
  badge: NFTBadge,
  userStats: {
    questsCompleted: number;
    totalPoints: number;
    completedQuestIds: string[];
  }
): boolean {
  if (badge.requirements.questsCompleted && userStats.questsCompleted < badge.requirements.questsCompleted) {
    return false;
  }
  
  if (badge.requirements.pointsRequired && userStats.totalPoints < badge.requirements.pointsRequired) {
    return false;
  }
  
  if (badge.requirements.specificQuests) {
    const hasAllQuests = badge.requirements.specificQuests.every((questId) =>
      userStats.completedQuestIds.includes(questId)
    );
    if (!hasAllQuests) {
      return false;
    }
  }
  
  return true;
}

/**
 * Получить доступные NFT-бейджи для пользователя
 */
export function getAvailableNFTBadges(
  badges: NFTBadge[],
  userStats: {
    questsCompleted: number;
    totalPoints: number;
    completedQuestIds: string[];
  }
): NFTBadge[] {
  return badges.filter((badge) => checkNFTBadgeRequirements(badge, userStats));
}

/**
 * Вычислить итоговые очки из результатов шагов
 */
export function calculateTotalPoints(
  stepResults: { [stepId: string]: StepResult },
  baseReward: number
): number {
  let total = baseReward;
  
  Object.values(stepResults).forEach((result) => {
    if (result.completed && result.points > 0) {
      total += result.points;
    }
  });
  
  return total;
}

