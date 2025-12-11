/**
 * Quest Asia - Validation Utils
 * Утилиты для валидации (анти-чит)
 */

import type { Coordinates, StepResult, MediaFile } from '../types';
import { calculateSpeed, isValidSpeed } from './geo';

/**
 * Валидация гео-чек-ина
 */
export function validateGeoCheckIn(
  userLocation: Coordinates,
  targetLocation: Coordinates,
  radius: number,
  previousLocation?: Coordinates,
  previousTime?: Date
): { valid: boolean; reason?: string } {
  // Проверка радиуса
  const distance = Math.sqrt(
    Math.pow(userLocation.lat - targetLocation.lat, 2) +
      Math.pow(userLocation.lng - targetLocation.lng, 2)
  ) * 111000; // Примерное преобразование в метры

  if (distance > radius) {
    return {
      valid: false,
      reason: `Вы находитесь слишком далеко от точки. Расстояние: ${Math.round(distance)}м`,
    };
  }

  // Проверка скорости перемещения (если есть предыдущая локация)
  if (previousLocation && previousTime) {
    const timeDiff = (Date.now() - previousTime.getTime()) / 1000; // секунды
    const speed = calculateSpeed(previousLocation, userLocation, timeDiff);
    
    if (!isValidSpeed(speed)) {
      return {
        valid: false,
        reason: 'Подозрительно высокая скорость перемещения',
      };
    }
  }

  return { valid: true };
}

/**
 * Валидация QR-кода
 */
export function validateQRCode(scannedCode: string, expectedCode: string): { valid: boolean; reason?: string } {
  if (scannedCode.toLowerCase().trim() === expectedCode.toLowerCase().trim()) {
    return { valid: true };
  }
  return {
    valid: false,
    reason: 'Неверный QR-код',
  };
}

/**
 * Валидация ответов на квиз
 */
export function validateQuizAnswers(
  answers: number[],
  correctAnswers: number[]
): { valid: boolean; score: number; reason?: string } {
  if (answers.length !== correctAnswers.length) {
    return {
      valid: false,
      score: 0,
      reason: 'Неверное количество ответов',
    };
  }

  let correctCount = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      correctCount++;
    }
  }

  const score = correctCount / correctAnswers.length;
  const valid = score >= 0.7; // Минимум 70% правильных ответов

  return {
    valid,
    score,
    reason: valid ? undefined : 'Недостаточно правильных ответов',
  };
}

/**
 * Валидация медиа-файла (EXIF данные)
 */
export function validateMediaFile(
  media: MediaFile,
  expectedLocation?: Coordinates,
  expectedTime?: Date
): { valid: boolean; reason?: string } {
  // Проверка EXIF данных
  if (media.metadata?.exif) {
    // Проверка времени
    if (expectedTime && media.metadata.exif.dateTime) {
      const mediaTime = new Date(media.metadata.exif.dateTime);
      const timeDiff = Math.abs(mediaTime.getTime() - expectedTime.getTime());
      const maxTimeDiff = 5 * 60 * 1000; // 5 минут

      if (timeDiff > maxTimeDiff) {
        return {
          valid: false,
          reason: 'Время съёмки не соответствует времени выполнения задания',
        };
      }
    }

    // Проверка координат
    if (expectedLocation && media.metadata.exif.coordinates) {
      const distance = Math.sqrt(
        Math.pow(media.metadata.exif.coordinates.lat - expectedLocation.lat, 2) +
          Math.pow(media.metadata.exif.coordinates.lng - expectedLocation.lng, 2)
      ) * 111000; // Примерное преобразование в метры

      if (distance > 100) {
        // 100 метров допуск
        return {
          valid: false,
          reason: 'Место съёмки не соответствует месту выполнения задания',
        };
      }
    }
  }

  return { valid: true };
}

/**
 * Проверка уникальности медиа-файла (хеш)
 */
export function checkMediaUniqueness(mediaHash: string, existingHashes: string[]): boolean {
  return !existingHashes.includes(mediaHash);
}

