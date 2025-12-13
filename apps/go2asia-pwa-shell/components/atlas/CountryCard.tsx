/**
 * Country Card Component
 * Карточка страны для списка
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Country } from '@/lib/api/atlas/types';

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/atlas/countries/${country.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {country.hero_image_url && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={country.hero_image_url}
            alt={country.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{country.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{country.short_description}</p>
        {country.region && (
          <div className="mt-3">
            <span className="inline-block px-2 py-1 text-xs font-medium text-sky-600 bg-sky-50 rounded">
              {country.region}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}



