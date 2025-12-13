/**
 * Atlas Countries API Route
 * API route для получения списка стран (mock)
 */

import { NextResponse } from 'next/server';
import { mockCountries } from '@/lib/api/atlas/mocks';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const activeOnly = searchParams.get('active_only') !== 'false';
  const region = searchParams.get('region');

  let countries = mockCountries;

  if (activeOnly) {
    countries = countries.filter((c) => c.is_active);
  }

  if (region) {
    countries = countries.filter((c) => c.region === region);
  }

  return NextResponse.json({
    status: 'ok',
    data: {
      countries,
    },
  });
}



