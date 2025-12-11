'use client';

/**
 * Rielt.Market Asia - Amenities
 * Удобства (грид иконок)
 */

import {
  Wifi,
  Monitor,
  Utensils,
  Car,
  Baby,
  Dog,
  Waves,
  Wind,
  Building,
  Dumbbell,
  Shield,
  ArrowUpDown,
} from 'lucide-react';
import type { Listing } from '../types';

interface AmenitiesProps {
  listing: Listing;
}

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  wifi: Wifi,
  workspace: Monitor,
  kitchen: Utensils,
  parking: Car,
  childFriendly: Baby,
  petsAllowed: Dog,
  pool: Waves,
  ac: Wind,
  gym: Dumbbell,
  security: Shield,
  elevator: ArrowUpDown,
};

const AMENITY_LABELS: Record<string, string> = {
  wifi: 'Wi-Fi',
  workspace: 'Рабочее место',
  kitchen: 'Кухня',
  washingMachine: 'Стиральная машина',
  parking: 'Парковка',
  childFriendly: 'Для детей',
  petsAllowed: 'С животными',
  pool: 'Бассейн',
  ac: 'Кондиционер',
  balcony: 'Балкон',
  gym: 'Фитнес-зал',
  security: 'Охрана',
  elevator: 'Лифт',
};

export function Amenities({ listing }: AmenitiesProps) {
  const amenities = Object.entries(listing.amenities)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  if (amenities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Удобства</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((key) => {
          const Icon = AMENITY_ICONS[key] || Building;
          const label = AMENITY_LABELS[key] || key;

          return (
            <div
              key={key}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <Icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-700 font-medium">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

