/**
 * Cities List Component
 * Список городов
 */

import { CityCard } from './CityCard';
import type { City } from '@/lib/api/atlas/types';

interface CitiesListProps {
  cities: City[];
  countriesMap?: Record<string, string>;
}

export function CitiesList({ cities, countriesMap }: CitiesListProps) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          countryName={countriesMap?.[city.country_id]}
        />
      ))}
    </div>
  );
}



