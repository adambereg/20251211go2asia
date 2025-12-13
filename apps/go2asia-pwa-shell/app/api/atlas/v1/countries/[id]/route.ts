/**
 * Atlas Country Detail API Route
 * API route для получения данных страны (mock)
 */

import { NextResponse } from 'next/server';
import { mockCountryPageData } from '@/lib/api/atlas/mocks';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = mockCountryPageData[id];

  if (!data) {
    return NextResponse.json(
      {
        status: 'error',
        error: {
          code: 'NOT_FOUND',
          message: 'Country not found',
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    data,
  });
}



