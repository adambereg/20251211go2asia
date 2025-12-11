'use client';

/**
 * Quest Asia - Step Geo Check-in
 * Компонент для гео-чек-ина шага
 */

import { useState, useEffect } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { QuestStep, StepResult, Coordinates } from '@/components/quest/types';
import { isWithinRadius } from '@/components/quest/utils/geo';
import { validateGeoCheckIn } from '@/components/quest/utils/validation';

interface StepGeoCheckinProps {
  step: QuestStep;
  onComplete: (result: StepResult) => void;
}

export function StepGeoCheckin({ step, onComplete }: StepGeoCheckinProps) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // Получение геолокации пользователя
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);

        // Вычисляем расстояние до цели
        if (step.coordinates) {
          const dist = Math.sqrt(
            Math.pow(coords.lat - step.coordinates.lat, 2) +
              Math.pow(coords.lng - step.coordinates.lng, 2)
          ) * 111000; // Примерное преобразование в метры
          setDistance(Math.round(dist));
        }
      },
      (err) => {
        setError('Не удалось получить геолокацию. Проверьте разрешения.');
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [step.coordinates]);

  const handleCheckIn = async () => {
    if (!userLocation || !step.coordinates || !step.radius) {
      setError('Не удалось определить ваше местоположение');
      return;
    }

    setIsChecking(true);
    setError(null);

    // Валидация
    const validation = validateGeoCheckIn(userLocation, step.coordinates, step.radius);

    if (!validation.valid) {
      setError(validation.reason || 'Проверка не пройдена');
      setIsChecking(false);
      return;
    }

    // Проверка радиуса
    if (!isWithinRadius(userLocation, step.coordinates, step.radius)) {
      setError(`Вы находитесь слишком далеко. Радиус: ${step.radius}м`);
      setIsChecking(false);
      return;
    }

    // Успешный чек-ин
    setTimeout(() => {
      const result: StepResult = {
        stepId: step.id,
        completed: true,
        completedAt: new Date(),
        method: 'geo',
        data: {
          coordinates: userLocation,
        },
        points: step.rewards.points,
        synced: false,
      };

      onComplete(result);
      setIsChecking(false);
    }, 500);
  };

  const isInRadius = userLocation && step.coordinates && step.radius
    ? isWithinRadius(userLocation, step.coordinates, step.radius)
    : false;

  return (
    <div className="space-y-4">
      {/* Информация о месте */}
      {step.coordinates && (
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">Целевая точка</p>
              <p className="text-xs text-slate-600 mt-1">
                Радиус: {step.radius || 100}м
              </p>
              {step.placeId && (
                <p className="text-xs text-purple-600 mt-1">
                  Место ID: {step.placeId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Статус геолокации */}
      {!userLocation && !error && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="text-sm text-blue-800">Определение вашего местоположения...</p>
          </div>
        </div>
      )}

      {/* Расстояние до цели */}
      {userLocation && distance !== null && (
        <div className={`rounded-lg p-4 ${
          isInRadius
            ? 'bg-green-50 border border-green-200'
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            {isInRadius ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
            <div>
              <p className={`text-sm font-semibold ${
                isInRadius ? 'text-green-800' : 'text-amber-800'
              }`}>
                {isInRadius ? 'Вы в радиусе!' : 'Подойдите ближе'}
              </p>
              <p className={`text-xs mt-1 ${
                isInRadius ? 'text-green-700' : 'text-amber-700'
              }`}>
                Расстояние: {distance}м (требуется: {step.radius || 100}м)
              </p>
            </div>
          </div>
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

      {/* Кнопка чек-ина */}
      <button
        onClick={handleCheckIn}
        disabled={!isInRadius || isChecking}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          isInRadius && !isChecking
            ? 'bg-purple-600 hover:bg-purple-700 text-white'
            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
        }`}
      >
        {isChecking ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Проверка...
          </span>
        ) : (
          'Выполнить чек-ин'
        )}
      </button>
    </div>
  );
}

