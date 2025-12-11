'use client';

/**
 * Quest Asia - Quest About
 * Блок "О квесте"
 */

import { Clock, MapPin, Sun, AlertCircle, ListChecks } from 'lucide-react';
import type { Quest } from '../types';
import { DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '../types';

interface QuestAboutProps {
  quest: Quest;
}

const BEST_TIME_LABELS: Record<string, string> = {
  morning: 'Утро',
  afternoon: 'День',
  evening: 'Вечер',
  night: 'Ночь',
};

export function QuestAbout({ quest }: QuestAboutProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">О квесте</h2>
      
      <div className="space-y-4">
        {/* Метаданные */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-sm text-slate-600">Длительность</div>
              <div className="font-semibold text-slate-900">{quest.duration} мин</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-sm text-slate-600">Локация</div>
              <div className="font-semibold text-slate-900">
                {quest.city}
                {quest.district && `, ${quest.district}`}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <ListChecks className="w-5 h-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-sm text-slate-600">Шагов</div>
              <div className="font-semibold text-slate-900">{quest.steps.length}</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-slate-600 mt-0.5" />
            <div>
              <div className="text-sm text-slate-600">Сложность</div>
              <div
                className="font-semibold"
                style={{ color: DIFFICULTY_COLORS[quest.difficulty] }}
              >
                {DIFFICULTY_LABELS[quest.difficulty]}
              </div>
            </div>
          </div>
        </div>

        {/* Лучшее время */}
        {quest.bestTime && (
          <div className="flex items-start gap-2 pt-4 border-t border-slate-200">
            <Sun className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <div className="text-sm text-slate-600 mb-1">Лучшее время суток</div>
              <div className="font-semibold text-slate-900">
                {BEST_TIME_LABELS[quest.bestTime]}
              </div>
            </div>
          </div>
        )}

        {/* Стартовая точка */}
        <div className="pt-4 border-t border-slate-200">
          <div className="text-sm text-slate-600 mb-2">Стартовая точка</div>
          <div className="font-medium text-slate-900 mb-2">{quest.startPoint.address}</div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${quest.startPoint.coordinates.lat},${quest.startPoint.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm inline-flex items-center gap-1"
          >
            Открыть в картах
            <MapPin className="w-4 h-4" />
          </a>
        </div>

        {/* Рекомендации по подготовке */}
        {quest.preparation && quest.preparation.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-600 mb-3">Рекомендуемая подготовка</div>
            <ul className="space-y-2">
              {quest.preparation.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span className="text-slate-900">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

