/**
 * Rielt.Market Asia - Listing Detail Page
 * Детальная страница объявления о жилье
 */

import { notFound } from 'next/navigation';
import { ListingDetailClient } from './ListingDetailClient';
import { mockListings } from '@/components/rielt';

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return <ListingDetailClient listing={listing} />;
}

