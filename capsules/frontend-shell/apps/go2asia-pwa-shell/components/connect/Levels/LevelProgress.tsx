'use client';

import { Card } from '@go2asia/ui';
import { Award } from 'lucide-react';
import type { Level } from '../types';

interface LevelProgressProps {
  level: Level;
}

export function LevelProgress({ level }: LevelProgressProps) {
  const progressPercent = (level.xp / level.next_level_xp) * 100;
  const pointsNeeded = level.next_level_xp - level.xp;

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Level {level.current}</h2>
          <p className="text-sm text-slate-600 mt-1">
            {level.xp} / {level.next_level_xp} XP
          </p>
        </div>
        <div className="p-3 bg-emerald-100 rounded-full">
          <Award className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
      </div>

      <p className="text-sm font-medium text-slate-700 mb-4">
        +{pointsNeeded} Points до Level Up
      </p>

      {/* Bonuses */}
      {level.bonuses && level.bonuses.length > 0 && (
        <div>
          <p className="text-xs font-medium text-slate-600 mb-2">Бонусы уровня:</p>
          <div className="flex flex-wrap gap-2">
            {level.bonuses.map((bonus, index) => (
              <span key={index} className="text-xs text-slate-600">
                {bonus.description}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

