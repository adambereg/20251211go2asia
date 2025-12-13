/**
 * City Card Component
 * Карточка города для списка
 */

import Link from 'next/link';
import Image from 'next/image';
import type { City } from '@/lib/api/atlas/types';

interface CityCardProps {
  city: City;
  countryName?: string;
}

export function CityCard({ city, countryName }: CityCardProps) {
  return (
    <Link
      href={`/atlas/cities/${city.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {city.hero_image_url && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={city.hero_image_url}
            alt={city.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{city.name}</h3>
        {countryName && (
          <p className="text-sm text-gray-500 mb-2">{countryName}</p>
        )}
        <p className="text-gray-600 text-sm line-clamp-2">{city.short_description}</p>
      </div>
    </Link>
  );
}



