/**
 * Places List Page
 * Страница списка мест
 */

'use client';

import { useSearchParams } from 'next/navigation';
import { usePlaces } from '@/lib/api/atlas/hooks';
import { PlacesList } from '@/components/atlas/PlacesList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PlacesPage() {
  const searchParams = useSearchParams();
  const cityId = searchParams.get('city_id') || undefined;
  const type = searchParams.get('type')?.split(',') || undefined;
  const hasRfOnly = searchParams.get('has_rf_only') === 'true';
  const hasQuestsOnly = searchParams.get('has_quests_only') === 'true';
  const hasEventsOnly = searchParams.get('has_events_only') === 'true';

  const { data: places, isLoading, error, refetch } = usePlaces(
    {
      city_id: cityId,
      type,
      has_rf_only: hasRfOnly || undefined,
      has_quests_only: hasQuestsOnly || undefined,
      has_events_only: hasEventsOnly || undefined,
    },
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!places || places.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Места не найдены"
          message={cityId ? 'В этом городе пока нет мест' : 'Попробуйте изменить фильтры'}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Места</h1>
        <p className="text-lg text-gray-600">
          {cityId ? 'Места в выбранном городе' : 'Исследуйте интересные локации'}
        </p>
      </div>
      <PlacesList places={places} />
    </div>
  );
}



