/**
 * Guru Asia - useGeolocation Hook
 * Хук для получения геолокации пользователя
 */

import { useState, useEffect, useCallback } from 'react';
import type { UserPosition } from '../types';

/** Ошибки геолокации */
export type GeolocationError = {
  code: number;
  message: string;
};

/** Опции геолокации */
export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/** Состояние хука */
export interface GeolocationState {
  position: UserPosition | null;
  loading: boolean;
  error: GeolocationError | null;
  isSupported: boolean;
  permissionStatus: PermissionState | null;
}

/** Возвращаемое значение хука */
export interface UseGeolocationReturn extends GeolocationState {
  requestLocation: () => void;
  clearError: () => void;
}

/** Опции по умолчанию */
const DEFAULT_OPTIONS: GeolocationOptions = {
  enableHighAccuracy: false, // Менее точный, но быстрее и меньше батареи
  timeout: 10000, // 10 секунд
  maximumAge: 60000, // 1 минута кэш
};

/** Дефолтная позиция (Новосибирск, центр) - fallback */
export const DEFAULT_POSITION: UserPosition = {
  lat: 54.9833,
  lng: 82.8964,
  accuracy: 5000, // 5 км (IP-based)
};

/**
 * Хук для получения геолокации пользователя
 * @param options Опции геолокации
 * @returns Состояние геолокации и методы
 */
export function useGeolocation(
  options: GeolocationOptions = DEFAULT_OPTIONS
): UseGeolocationReturn {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    loading: false,
    error: null,
    isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
    permissionStatus: null,
  });

  // Проверяем статус разрешения
  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const checkPermission = async () => {
      try {
        if ('permissions' in navigator) {
          const result = await navigator.permissions.query({ name: 'geolocation' });
          setState((prev) => ({ ...prev, permissionStatus: result.state }));

          // Слушаем изменения статуса
          result.addEventListener('change', () => {
            setState((prev) => ({ ...prev, permissionStatus: result.state }));
          });
        }
      } catch {
        // Permissions API не поддерживается
      }
    };

    checkPermission();
  }, []);

  // Обработчик успешного получения позиции
  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setState((prev) => ({
      ...prev,
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
      },
      loading: false,
      error: null,
    }));

    // Сохраняем в localStorage для кэширования
    try {
      localStorage.setItem(
        'guruLastPosition',
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      );
    } catch {
      // localStorage недоступен
    }
  }, []);

  // Обработчик ошибки
  const handleError = useCallback((error: GeolocationPositionError) => {
    let message = 'Не удалось определить местоположение';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'Доступ к геолокации запрещён';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Местоположение недоступно';
        break;
      case error.TIMEOUT:
        message = 'Превышено время ожидания';
        break;
    }

    setState((prev) => ({
      ...prev,
      error: { code: error.code, message },
      loading: false,
    }));

    // Пробуем использовать кэшированную позицию
    try {
      const cached = localStorage.getItem('guruLastPosition');
      if (cached) {
        const cachedPosition = JSON.parse(cached) as UserPosition;
        const age = Date.now() - (cachedPosition.timestamp ?? 0);

        // Используем кэш, если ему меньше 10 минут
        if (age < 10 * 60 * 1000) {
          setState((prev) => ({
            ...prev,
            position: cachedPosition,
          }));
          return;
        }
      }
    } catch {
      // localStorage недоступен
    }

    // Fallback на дефолтную позицию
    setState((prev) => ({
      ...prev,
      position: DEFAULT_POSITION,
    }));
  }, []);

  // Запрос геолокации
  const requestLocation = useCallback(() => {
    if (!state.isSupported) {
      setState((prev) => ({
        ...prev,
        error: { code: 0, message: 'Геолокация не поддерживается браузером' },
        position: DEFAULT_POSITION,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: options.enableHighAccuracy,
        timeout: options.timeout,
        maximumAge: options.maximumAge,
      }
    );
  }, [state.isSupported, handleSuccess, handleError, options]);

  // Очистка ошибки
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // Пробуем загрузить кэшированную позицию при монтировании
  useEffect(() => {
    try {
      const cached = localStorage.getItem('guruLastPosition');
      if (cached) {
        const cachedPosition = JSON.parse(cached) as UserPosition;
        const age = Date.now() - (cachedPosition.timestamp ?? 0);

        // Используем кэш, если ему меньше 5 минут
        if (age < 5 * 60 * 1000) {
          setState((prev) => ({
            ...prev,
            position: cachedPosition,
          }));
        }
      }
    } catch {
      // localStorage недоступен
    }
  }, []);

  return {
    ...state,
    requestLocation,
    clearError,
  };
}

/**
 * Хук для отслеживания позиции в реальном времени
 * @param options Опции геолокации
 * @returns Состояние геолокации
 */
export function useWatchPosition(
  options: GeolocationOptions = DEFAULT_OPTIONS
): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    loading: true,
    error: null,
    isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
    permissionStatus: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: { code: 0, message: 'Геолокация не поддерживается браузером' },
        position: DEFAULT_POSITION,
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState((prev) => ({
          ...prev,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          },
          loading: false,
          error: null,
        }));
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          error: { code: error.code, message: error.message },
          loading: false,
          position: DEFAULT_POSITION,
        }));
      },
      {
        enableHighAccuracy: options.enableHighAccuracy,
        timeout: options.timeout,
        maximumAge: options.maximumAge,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return state;
}

