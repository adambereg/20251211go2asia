'use client';

/**
 * Rielt.Market Asia - Description
 * Описание + "Для кого подходит"
 */

import { Users, Briefcase, Calendar } from 'lucide-react';
import type { Listing } from '../types';

interface DescriptionProps {
  listing: Listing;
}

const TARGET_AUDIENCES = [
  {
    id: 'families',
    label: 'Для семей',
    icon: Users,
    check: (listing: Listing) => listing.amenities.childFriendly && (listing.bedrooms || 0) >= 2,
  },
  {
    id: 'nomads',
    label: 'Для цифровых кочевников',
    icon: Briefcase,
    check: (listing: Listing) => listing.amenities.workspace && listing.amenities.wifi,
  },
  {
    id: 'long-stay',
    label: 'Долгосрочная аренда',
    icon: Calendar,
    check: (listing: Listing) => listing.rentalType === 'long-term',
  },
];

export function Description({ listing }: DescriptionProps) {
  const suitableFor = TARGET_AUDIENCES.filter((audience) => audience.check(listing));

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Описание</h2>
      <p className="text-slate-700 leading-relaxed whitespace-pre-line">
        {listing.description}
      </p>

      {/* Для кого подходит */}
      {suitableFor.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Для кого подходит
          </h3>
          <div className="flex flex-wrap gap-3">
            {suitableFor.map((audience) => {
              const Icon = audience.icon;
              return (
                <div
                  key={audience.id}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <Icon className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-emerald-900">{audience.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

