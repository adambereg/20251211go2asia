/**
 * Quest Asia - Offline Utils
 * Утилиты для работы с офлайн-режимом
 */

import type { QuestProgress, PendingAction } from '../types';

/**
 * Проверить, есть ли активный квест в офлайн-режиме
 */
export function hasOfflineQuest(progress: QuestProgress | null): boolean {
  return progress !== null && progress.offlineData.cached;
}

/**
 * Получить количество ожидающих действий
 */
export function getPendingActionsCount(progress: QuestProgress | null): number {
  if (!progress) return 0;
  return progress.offlineData.pendingActions.length;
}

/**
 * Проверить, нужна ли синхронизация
 */
export function needsSync(progress: QuestProgress | null): boolean {
  if (!progress) return false;
  
  // Есть ожидающие действия
  if (progress.offlineData.pendingActions.length > 0) {
    return true;
  }
  
  // Есть незасинхронизированные результаты шагов
  const unsyncedResults = Object.values(progress.stepResults).filter((result) => !result.synced);
  return unsyncedResults.length > 0;
}

/**
 * Получить время последней синхронизации
 */
export function getLastSyncTime(progress: QuestProgress | null): Date | null {
  if (!progress || !progress.offlineData.lastSyncAt) {
    return null;
  }
  return progress.offlineData.lastSyncAt;
}

/**
 * Проверить, есть ли интернет
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

/**
 * Подписаться на изменения статуса сети
 */
export function subscribeToOnlineStatus(callback: (online: boolean) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

