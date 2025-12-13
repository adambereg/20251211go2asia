/**
 * Cities List Page
 * Страница списка городов
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { useCities } from '@/lib/api/atlas/hooks';
import { CitiesList } from '@/components/atlas/CitiesList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CitiesPage() {
  const searchParams = useSearchParams();
  const countryId = searchParams.get('country_id') || undefined;

  const { data: cities, isLoading, error, refetch } = useCities(
    { active_only: true, country_id: countryId },
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!cities || cities.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Города не найдены"
          message={countryId ? 'В этой стране пока нет городов' : 'Попробуйте изменить фильтры'}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Города</h1>
        <p className="text-lg text-gray-600">
          {countryId ? 'Города в выбранной стране' : 'Выберите город для изучения'}
        </p>
      </div>
      <CitiesList cities={cities} />
    </div>
  );
}



