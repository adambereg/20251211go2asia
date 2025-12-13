/**
 * Countries List Page
 * Страница списка стран
 */

'use client';

import { useCountries } from '@/lib/api/atlas/hooks';
import { CountriesList } from '@/components/atlas/CountriesList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { EmptyState } from '@/components/ui/EmptyState';

export default function CountriesPage() {
  const { data: countries, isLoading, error, refetch } = useCountries({ active_only: true });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!countries || countries.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Страны не найдены"
          message="Попробуйте обновить страницу или изменить фильтры"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Страны</h1>
        <p className="text-lg text-gray-600">
          Выберите страну для изучения
        </p>
      </div>
      <CountriesList countries={countries} />
    </div>
  );
}



