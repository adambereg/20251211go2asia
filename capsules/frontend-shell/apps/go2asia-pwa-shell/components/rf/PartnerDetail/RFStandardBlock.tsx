'use client';

import { Card, CardContent } from '@go2asia/ui';
import { VerifiedBadge } from '../Shared';
import { CheckCircle2, Calendar } from 'lucide-react';
import type { Partner } from '../types';

interface RFStandardBlockProps {
  partner: Partner;
}

export function RFStandardBlock({ partner }: RFStandardBlockProps) {
  const basicItems = partner.rfStatus.checklist.filter((item) => item.category === 'basic');
  const additionalItems = partner.rfStatus.checklist.filter((item) => item.category === 'additional');
  const allMet = partner.rfStatus.checklist.every((item) => item.status);
  const basicMet = basicItems.every((item) => item.status);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Russian Friendly стандарт</h2>
          {partner.rfStatus.verified && (
            <div className="flex items-center gap-2">
              <VerifiedBadge />
              <span className="text-sm text-slate-600">Проверено PRO</span>
            </div>
          )}
        </div>

        {partner.rfStatus.verifiedAt && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Calendar size={16} />
            <span>Последняя проверка: {new Date(partner.rfStatus.verifiedAt).toLocaleDateString('ru-RU')}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Базовые требования */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Базовые требования</h3>
            <div className="space-y-2">
              {basicItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.status ? (
                    <CheckCircle2 size={20} className="text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                  )}
                  <span className={item.status ? 'text-slate-900' : 'text-slate-500'}>{item.requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные требования */}
          {additionalItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Дополнительные требования</h3>
              <div className="space-y-2">
                {additionalItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {item.status ? (
                      <CheckCircle2 size={20} className="text-green-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                    <span className={item.status ? 'text-slate-900' : 'text-slate-500'}>{item.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Статус */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {allMet ? (
                <>
                  <CheckCircle2 size={24} className="text-green-600" />
                  <span className="font-semibold text-green-600">Соответствует всем требованиям RF стандарта</span>
                </>
              ) : basicMet ? (
                <>
                  <div className="w-6 h-6 rounded-full border-2 border-amber-500" />
                  <span className="font-semibold text-amber-600">Частично соответствует</span>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-full border-2 border-red-500" />
                  <span className="font-semibold text-red-600">Требуется обновление</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

