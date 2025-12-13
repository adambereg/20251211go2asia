/**
 * Atlas Place Detail API Route
 * API route для получения данных места (mock)
 */

import { NextResponse } from 'next/server';
import { mockPlacePageData } from '@/lib/api/atlas/mocks';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const data = mockPlacePageData[id];

  if (!data) {
    return NextResponse.json(
      {
        status: 'error',
        error: {
          code: 'NOT_FOUND',
          message: 'Place not found',
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



