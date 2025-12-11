'use client';

/**
 * Rielt.Market Asia - NewListings
 * Секция "Новое на этой неделе"
 */

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mockListings } from './mockListings';
import { ListingCard } from './ListingCard';

export function NewListings() {
  // Фильтруем объявления, созданные за последние 7 дней
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const newListings = mockListings
    .filter((listing) => {
      const createdAt = new Date(listing.createdAt);
      return createdAt >= weekAgo;
    })
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 6);

  if (newListings.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
        Новое на этой неделе
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      <div className="mt-4">
        <Link
          href="/rielt/search?sortBy=newest"
          className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 inline-flex"
        >
          Показать все
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

