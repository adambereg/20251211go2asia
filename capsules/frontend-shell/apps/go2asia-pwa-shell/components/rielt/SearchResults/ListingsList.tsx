'use client';

/**
 * Rielt.Market Asia - ListingsList
 * Список объявлений в результатах поиска
 */

import { ListingCard } from '../ListingCard';
import { EmptyState } from '../Shared/EmptyState';
import type { ListingWithDistance } from '../types';

interface ListingsListProps {
  listings: ListingWithDistance[];
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
}

export function ListingsList({ listings, selectedId, onSelect }: ListingsListProps) {
  if (listings.length === 0) {
    return (
      <EmptyState
        title="Объявления не найдены"
        description="Попробуйте изменить параметры поиска или фильтры"
      />
    );
  }

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <div
          key={listing.id}
          onClick={() => onSelect?.(listing.id)}
          className={selectedId === listing.id ? 'ring-2 ring-emerald-500 rounded-xl' : ''}
        >
          <ListingCard
            listing={listing}
            showDistance={!!listing.distance}
            distance={listing.distance}
          />
        </div>
      ))}
    </div>
  );
}



















