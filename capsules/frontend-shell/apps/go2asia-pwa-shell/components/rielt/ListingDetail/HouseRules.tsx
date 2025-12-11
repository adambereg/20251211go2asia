'use client';

/**
 * Rielt.Market Asia - HouseRules
 * Домашние правила
 */

import { CheckCircle, XCircle } from 'lucide-react';
import type { Listing } from '../types';

interface HouseRulesProps {
  listing: Listing;
}

export function HouseRules({ listing }: HouseRulesProps) {
  const rules = listing.houseRules;

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Домашние правила</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          {rules.smoking ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-slate-700">
            {rules.smoking ? 'Разрешено курение' : 'Курение запрещено'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {rules.pets ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-slate-700">
            {rules.pets ? 'Животные разрешены' : 'Животные запрещены'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {rules.parties ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-slate-700">
            {rules.parties ? 'Вечеринки разрешены' : 'Вечеринки запрещены'}
          </span>
        </div>

        {rules.deposit && (
          <div className="pt-3 border-t border-slate-200">
            <span className="text-slate-700">
              Залог: <strong>${rules.deposit}</strong>
            </span>
          </div>
        )}

        {rules.prepayment && (
          <div>
            <span className="text-slate-700">
              Предоплата: <strong>${rules.prepayment}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

