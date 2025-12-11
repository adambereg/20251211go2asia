'use client';

/**
 * Rielt.Market Asia - Summary
 * Блок сводки: цена, правила, вместимость, тип
 */

import { MapPin, Users, Bed, Bath, Square, Star } from 'lucide-react';
import type { Listing } from '../types';

interface SummaryProps {
  listing: Listing;
}

export function Summary({ listing }: SummaryProps) {
  const price = listing.rentalType === 'long-term' 
    ? listing.pricing.perMonth 
    : listing.pricing.perNight;

  const priceLabel = listing.rentalType === 'long-term' ? 'месяц' : 'ночь';

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      {/* Заголовок и локация */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {listing.title}
        </h1>
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin className="w-5 h-5" />
          <span>
            {listing.address.district && `${listing.address.district}, `}
            {listing.address.city}, {listing.address.country}
          </span>
        </div>
      </div>

      {/* Рейтинг и отзывы */}
      {listing.rating && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-lg">{listing.rating.toFixed(1)}</span>
          </div>
          {listing.reviewsCount && (
            <span className="text-slate-600">
              ({listing.reviewsCount} {listing.reviewsCount === 1 ? 'отзыв' : 'отзывов'})
            </span>
          )}
        </div>
      )}

      {/* Параметры */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-400" />
          <div>
            <div className="text-sm text-slate-600">Гостей</div>
            <div className="font-semibold">{listing.maxGuests}</div>
          </div>
        </div>
        {listing.bedrooms !== undefined && (
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm text-slate-600">Спален</div>
              <div className="font-semibold">{listing.bedrooms}</div>
            </div>
          </div>
        )}
        {listing.beds !== undefined && (
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm text-slate-600">Кроватей</div>
              <div className="font-semibold">{listing.beds}</div>
            </div>
          </div>
        )}
        {listing.bathrooms !== undefined && (
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm text-slate-600">Ванных</div>
              <div className="font-semibold">{listing.bathrooms}</div>
            </div>
          </div>
        )}
        {listing.area && (
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-sm text-slate-600">Площадь</div>
              <div className="font-semibold">{listing.area} м²</div>
            </div>
          </div>
        )}
      </div>

      {/* Цена */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl md:text-4xl font-bold text-slate-900">
          ${price}
        </span>
        <span className="text-lg text-slate-600">/ {priceLabel}</span>
        {listing.pricing.cleaningFee && (
          <span className="text-sm text-slate-500 ml-auto">
            + ${listing.pricing.cleaningFee} уборка
          </span>
        )}
      </div>

      {/* Правила заезда/выезда */}
      {listing.houseRules.checkIn && listing.houseRules.checkOut && (
        <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Заезд: {listing.houseRules.checkIn}</span>
            <span>Выезд: {listing.houseRules.checkOut}</span>
          </div>
          {listing.houseRules.minStay && (
            <div className="mt-2">
              Минимальный срок: {listing.houseRules.minStay}{' '}
              {listing.houseRules.minStay === 1 ? 'ночь' : 'ночей'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

