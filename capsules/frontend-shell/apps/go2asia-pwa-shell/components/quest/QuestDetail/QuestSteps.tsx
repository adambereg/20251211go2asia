'use client';

/**
 * Quest Asia - Quest Steps
 * Список шагов квеста с мини-картой
 */

import { MapPin, QrCode, HelpCircle, Camera, Video, Calendar, CheckCircle } from 'lucide-react';
import type { Quest } from '../types';
import { STEP_TYPE_LABELS } from '../types';

interface QuestStepsProps {
  quest: Quest;
}

const STEP_TYPE_ICONS: Record<string, typeof MapPin> = {
  'geo-checkin': MapPin,
  'qr-code': QrCode,
  'quiz': HelpCircle,
  'photo': Camera,
  'video': Video,
  'pulse-event': Calendar,
  'task': CheckCircle,
};

export function QuestSteps({ quest }: QuestStepsProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Маршрут</h2>
      
      <div className="space-y-4">
        {quest.steps.map((step, index) => {
          const Icon = STEP_TYPE_ICONS[step.type] || MapPin;
          
          return (
            <div
              key={step.id}
              className="flex gap-4 p-4 rounded-lg border-2 border-slate-200 hover:border-purple-300 transition-colors"
            >
              {/* Номер шага */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                {index + 1}
              </div>
              
              {/* Контент шага */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-600 uppercase">
                    {STEP_TYPE_LABELS[step.type]}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 mb-2">{step.description}</p>
                
                {/* Дополнительная информация */}
                <div className="flex flex-wrap gap-2 text-sm text-slate-500">
                  {step.coordinates && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {step.radius ? `Радиус: ${step.radius}м` : 'Геолокация'}
                    </span>
                  )}
                  {step.questions && (
                    <span>{step.questions.length} вопросов</span>
                  )}
                  {step.mediaType && (
                    <span>{step.mediaType === 'photo' ? 'Фото' : 'Видео'}</span>
                  )}
                  {step.rewards.points > 0 && (
                    <span className="font-semibold text-amber-600">
                      +{step.rewards.points} очков
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Мини-карта (заглушка) */}
      <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
        <div className="text-sm text-slate-600 mb-2">Маршрут на карте</div>
        <div className="h-48 bg-slate-200 rounded flex items-center justify-center text-slate-500">
          Карта будет здесь
        </div>
      </div>
    </div>
  );
}

