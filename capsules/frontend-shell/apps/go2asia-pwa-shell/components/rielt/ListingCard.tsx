'use client';

/**
 * Rielt.Market Asia - ListingCard
 * Универсальная карточка объявления
 */

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Wifi, Home, Users } from 'lucide-react';
// Badge будет использоваться напрямую, без импорта из @go2asia/ui
import type { Listing } from './types';
import { formatDistance } from './utils/geo';

interface ListingCardProps {
  listing: Listing;
  showDistance?: boolean;
  distance?: number;
}

export function ListingCard({ listing, showDistance, distance }: ListingCardProps) {
  const price = listing.rentalType === 'long-term' 
    ? listing.pricing.perMonth 
    : listing.pricing.perNight;

  const priceLabel = listing.rentalType === 'long-term' ? 'месяц' : 'ночь';

  return (
    <Link
      href={`/rielt/listings/${listing.id}`}
      className="group bg-white rounded-xl border-2 border-slate-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      {/* Фото */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={listing.coverPhoto || listing.photos[0] || '/placeholder-listing.jpg'}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Бейджи */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          {listing.isRF && (
            <span className="px-1.5 py-0.5 bg-green-600 text-white rounded text-xs font-bold shadow-lg">
              RF
            </span>
          )}
          {listing.proVerification?.verified && (
            <div className="px-2 py-1 bg-green-500 text-white rounded text-xs font-bold flex items-center gap-1">
              <span>✓</span>
              PRO
            </div>
          )}
          {listing.isNew && (
            <div className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold">
              Новое
            </div>
          )}
          {listing.isInstant && (
            <div className="px-2 py-1 bg-purple-500 text-white rounded text-xs font-bold">
              Instant
            </div>
          )}
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Заголовок и локация */}
        <h3 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-slate-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">
            {listing.address.district || listing.address.city}, {listing.address.country}
          </span>
          {showDistance && distance && (
            <span className="ml-1">• {formatDistance(distance)}</span>
          )}
        </div>

        {/* Метаданные */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
          {listing.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{listing.rating.toFixed(1)}</span>
              {listing.reviewsCount && (
                <span className="text-slate-400">({listing.reviewsCount})</span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{listing.maxGuests} гостей</span>
          </div>
        </div>

        {/* Удобства (чипы) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {listing.amenities.wifi && (
            <div className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Wi-Fi
            </div>
          )}
          {listing.amenities.workspace && (
            <div className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center gap-1">
              <Home className="w-3 h-3" />
              Рабочее место
            </div>
          )}
          {listing.amenities.kitchen && (
            <div className="px-2 py-1 bg-slate-100 rounded-lg text-xs text-slate-700">
              Кухня
            </div>
          )}
        </div>

        {/* Цена */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ${price}
            </span>
            <span className="text-sm text-slate-600 ml-1">/ {priceLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

