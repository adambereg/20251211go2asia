/**
 * Place Card Component
 * Карточка места для списка
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Place } from '@/lib/api/atlas/types';

interface PlaceCardProps {
  place: Place;
  cityName?: string;
  countryName?: string;
  rating?: number;
  reviewsCount?: number;
}

export function PlaceCard({
  place,
  cityName,
  countryName,
  rating,
  reviewsCount,
}: PlaceCardProps) {
  return (
    <Link
      href={`/atlas/places/${place.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {place.hero_image_url && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={place.hero_image_url}
            alt={place.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{place.name}</h3>
          {rating !== undefined && (
            <div className="flex items-center gap-1 ml-2">
              <svg
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        {(cityName || countryName) && (
          <p className="text-sm text-gray-500 mb-2">
            {[cityName, countryName].filter(Boolean).join(', ')}
          </p>
        )}
        {place.type && (
          <span className="inline-block px-2 py-1 text-xs font-medium text-sky-600 bg-sky-50 rounded mb-2">
            {place.type}
          </span>
        )}
        <p className="text-gray-600 text-sm line-clamp-2">{place.short_description}</p>
        {reviewsCount !== undefined && reviewsCount > 0 && (
          <p className="text-xs text-gray-500 mt-2">{reviewsCount} отзывов</p>
        )}
      </div>
    </Link>
  );
}



