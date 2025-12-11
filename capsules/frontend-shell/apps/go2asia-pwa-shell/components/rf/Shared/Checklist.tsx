'use client';

import { Card, CardContent } from '@go2asia/ui';
import { CheckCircle2, Circle } from 'lucide-react';
import type { RFChecklistItem } from '../types';

interface ChecklistProps {
  checklist: RFChecklistItem[];
  showProgress?: boolean;
  className?: string;
}

export function Checklist({ checklist, showProgress = true, className }: ChecklistProps) {
  const basicItems = checklist.filter((item) => item.category === 'basic');
  const additionalItems = checklist.filter((item) => item.category === 'additional');
  const completedCount = checklist.filter((item) => item.status).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  return (
    <Card className={className}>
      <CardContent className="p-4 md:p-6">
        {showProgress && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-900">Стандарт Russian Friendly</h3>
              <span className="text-sm font-medium text-slate-600">
                {completedCount} / {checklist.length}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Прогресс: {progress}%</p>
          </div>
        )}

        <div className="space-y-6">
          {basicItems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Базовые требования</h4>
              <ul className="space-y-2">
                {basicItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    {item.status ? (
                      <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle size={20} className="text-slate-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.status ? 'text-slate-900' : 'text-slate-500'}`}>
                      {item.requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {additionalItems.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Дополнительные требования</h4>
              <ul className="space-y-2">
                {additionalItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    {item.status ? (
                      <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle size={20} className="text-slate-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.status ? 'text-slate-900' : 'text-slate-500'}`}>
                      {item.requirement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

