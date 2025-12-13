/**
 * Atlas Cities API Route
 * API route для получения списка городов (mock)
 */

import { NextResponse } from 'next/server';
import { mockCities } from '@/lib/api/atlas/mocks';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active_only') !== 'false';
  const countryId = searchParams.get('country_id');

  let cities = mockCities;

  if (activeOnly) {
    cities = cities.filter((c) => c.is_active);
  }

  if (countryId) {
    cities = cities.filter((c) => c.country_id === countryId);
  }

  return NextResponse.json({
    status: 'ok',
    data: {
      cities,
    },
  });
}



