'use client';

/**
 * Quest Asia - Quest Progress Bar
 * Прогресс-бар прохождения квеста
 */

interface QuestProgressBarProps {
  progress: number; // 0-100
}

export function QuestProgressBar({ progress }: QuestProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">Прогресс</span>
        <span className="text-sm font-semibold text-purple-600">{progress}%</span>
      </div>
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

