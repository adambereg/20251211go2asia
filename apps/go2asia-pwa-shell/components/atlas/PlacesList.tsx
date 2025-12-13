/**
 * Places List Component
 * Список мест
 */

import { PlaceCard } from './PlaceCard';
import type { Place } from '@/lib/api/atlas/types';

interface PlacesListProps {
  places: Place[];
  citiesMap?: Record<string, string>;
  countriesMap?: Record<string, string>;
}

export function PlacesList({ places, citiesMap, countriesMap }: PlacesListProps) {
  if (places.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          cityName={citiesMap?.[place.city_id]}
          countryName={countriesMap?.[place.country_id]}
        />
      ))}
    </div>
  );
}



