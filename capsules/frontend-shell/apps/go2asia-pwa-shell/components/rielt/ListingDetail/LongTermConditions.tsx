'use client';

/**
 * Rielt.Market Asia - LongTermConditions
 * Условия долгосрока
 */

import { Calendar, DollarSign, Zap } from 'lucide-react';
import type { Listing } from '../types';

interface LongTermConditionsProps {
  listing: Listing;
}

export function LongTermConditions({ listing }: LongTermConditionsProps) {
  if (!listing.longTermConditions) {
    return null;
  }

  const conditions = listing.longTermConditions;

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Условия долгосрочной аренды</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-slate-900">Срок аренды</div>
            <div className="text-slate-600">
              Минимум {conditions.minMonths} {conditions.minMonths === 1 ? 'месяц' : 'месяцев'}
              {conditions.maxMonths && `, максимум ${conditions.maxMonths} месяцев`}
            </div>
          </div>
        </div>

        {conditions.deposit && (
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-900">Залог</div>
              <div className="text-slate-600">${conditions.deposit}</div>
            </div>
          </div>
        )}

        {conditions.utilities && (
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-slate-900">Коммунальные услуги</div>
              <div className="text-slate-600">
                {conditions.utilities === 'included' ? 'Включены в стоимость' : 'Оплачиваются отдельно'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

