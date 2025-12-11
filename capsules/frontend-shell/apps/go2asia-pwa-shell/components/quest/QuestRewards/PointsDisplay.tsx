'use client';

/**
 * Quest Asia - Points Display
 * Отображение начисленных очков с анимацией
 */

import { useState, useEffect } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  basePoints?: number;
}

export function PointsDisplay({ points, basePoints }: PointsDisplayProps) {
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (points === 0) return;

    const duration = 2000; // 2 секунды
    const steps = 60;
    const increment = points / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newValue = Math.min(Math.round(increment * currentStep), points);
      setDisplayedPoints(newValue);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [points]);

  const bonus = basePoints ? points - basePoints : 0;
  const hasBonus = bonus > 0;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 p-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Trophy className="w-8 h-8 text-amber-600" />
        <h2 className="text-2xl font-bold text-slate-900">Очки</h2>
      </div>

      <div className="mb-4">
        <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
          {displayedPoints.toLocaleString()}
        </div>
        {isAnimating && (
          <div className="text-sm text-amber-600 mt-2 animate-pulse">Подсчёт...</div>
        )}
      </div>

      {hasBonus && (
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
          <TrendingUp className="w-4 h-4" />
          Бонус: +{bonus.toLocaleString()} очков
        </div>
      )}

      {basePoints && (
        <p className="text-sm text-slate-600 mt-4">
          Базовые очки: {basePoints.toLocaleString()}
        </p>
      )}
    </div>
  );
}

