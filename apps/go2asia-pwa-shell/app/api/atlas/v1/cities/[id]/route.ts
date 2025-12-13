/**
 * Atlas City Detail API Route
 * API route для получения данных города (mock)
 */

import { NextResponse } from 'next/server';
import { mockCityPageData } from '@/lib/api/atlas/mocks';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = mockCityPageData[id];

  if (!data) {
    return NextResponse.json(
      {
        status: 'error',
        error: {
          code: 'NOT_FOUND',
          message: 'City not found',
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



