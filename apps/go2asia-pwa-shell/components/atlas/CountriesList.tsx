/**
 * Countries List Component
 * Список стран
 */

import { CountryCard } from './CountryCard';
import type { Country } from '@/lib/api/atlas/types';

interface CountriesListProps {
  countries: Country[];
}

export function CountriesList({ countries }: CountriesListProps) {
  if (countries.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  );
}



