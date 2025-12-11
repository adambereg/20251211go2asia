'use client';

/**
 * Rielt.Market Asia - EditorPicks
 * Секция "Подборки редакции"
 */

import { Users, Briefcase, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mockListings } from './mockListings';
import { ListingCard } from './ListingCard';

const EDITOR_PICKS = [
  {
    id: 'families',
    title: 'Для семей',
    description: 'Просторные апартаменты и дома с детскими удобствами',
    icon: Users,
    filter: { childFriendly: true, bedrooms: 2 },
  },
  {
    id: 'nomads',
    title: 'Для цифровых кочевников',
    description: 'Жильё с рабочими местами и быстрым интернетом',
    icon: Briefcase,
    filter: { workspace: true, wifi: true },
  },
  {
    id: 'long-term',
    title: 'Долгосрочная аренда',
    description: 'Выгодные предложения от 1 месяца',
    icon: Calendar,
    filter: { rentalType: 'long-term' },
  },
];

export function EditorPicks() {
  // Фильтруем объявления для каждой подборки
  const getListingsForPick = (filter: Record<string, any>) => {
    return mockListings
      .filter((listing) => {
        if (filter.rentalType && listing.rentalType !== filter.rentalType) return false;
        if (filter.childFriendly && !listing.amenities.childFriendly) return false;
        if (filter.workspace && !listing.amenities.workspace) return false;
        if (filter.wifi && !listing.amenities.wifi) return false;
        if (filter.bedrooms && (listing.bedrooms || 0) < filter.bedrooms) return false;
        return true;
      })
      .slice(0, 3);
  };

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
        Подборки редакции
      </h2>

      <div className="space-y-8">
        {EDITOR_PICKS.map((pick) => {
          const Icon = pick.icon;
          const listings = getListingsForPick(pick.filter);

          return (
            <div key={pick.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{pick.title}</h3>
                  <p className="text-sm text-slate-600">{pick.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href={(() => {
                    const params = new URLSearchParams();
                    if (pick.filter.rentalType) {
                      params.set('rentalType', pick.filter.rentalType);
                    }
                    if (pick.filter.workspace) {
                      params.set('workspace', 'true');
                    }
                    if (pick.filter.wifi) {
                      params.set('wifi', 'true');
                    }
                    if (pick.filter.childFriendly) {
                      params.set('childFriendly', 'true');
                    }
                    if (pick.filter.bedrooms) {
                      params.set('bedrooms', pick.filter.bedrooms.toString());
                    }
                    return `/rielt/search?${params.toString()}`;
                  })()}
                  className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 inline-flex"
                >
                  Показать все
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

