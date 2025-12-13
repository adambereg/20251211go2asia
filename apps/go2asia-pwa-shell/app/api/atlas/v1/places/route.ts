/**
 * Atlas Places API Route
 * API route для получения списка мест (mock)
 */

import { NextResponse } from 'next/server';
import { mockPlaces } from '@/lib/api/atlas/mocks';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get('city_id');
  const type = searchParams.getAll('type');
  const categories = searchParams.getAll('categories');
  const tags = searchParams.getAll('tags');
  const hasRfOnly = searchParams.get('has_rf_only') === 'true';
  const hasQuestsOnly = searchParams.get('has_quests_only') === 'true';
  const hasEventsOnly = searchParams.get('has_events_only') === 'true';

  let places = mockPlaces.filter((p) => p.is_active);

  if (cityId) {
    places = places.filter((p) => p.city_id === cityId);
  }

  if (type.length > 0) {
    places = places.filter((p) => type.includes(p.type));
  }

  if (categories.length > 0) {
    places = places.filter((p) =>
      categories.some((cat) => p.categories.includes(cat))
    );
  }

  if (tags.length > 0) {
    places = places.filter(
      (p) => p.tags && tags.some((tag) => p.tags!.includes(tag))
    );
  }

  // Фильтры has_rf_only, has_quests_only, has_events_only пока не реализованы в mock данных
  // В реальной реализации здесь будет проверка соответствующих флагов

  return NextResponse.json({
    status: 'ok',
    data: {
      places,
    },
  });
}



