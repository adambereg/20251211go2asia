'use client';

/**
 * Rielt.Market Asia - Location
 * Локация + "Что рядом" (Atlas/Pulse)
 */

import { MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Listing } from '../types';

interface LocationProps {
  listing: Listing;
}

export function Location({ listing }: LocationProps) {
  // TODO: Интеграция с Atlas API для получения мест рядом
  // TODO: Интеграция с Pulse API для получения событий рядом
  
  const nearbyPlaces = [
    { id: '1', name: 'Кафе Coffee Bean', distance: '200 м', type: 'place' },
    { id: '2', name: 'Коворкинг Hub', distance: '350 м', type: 'place' },
    { id: '3', name: 'Супермаркет 7-Eleven', distance: '150 м', type: 'place' },
  ];

  const nearbyEvents = [
    { id: '1', name: 'Йога на пляже', date: 'Сегодня, 18:00', distance: '500 м', type: 'event' },
  ];

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Где находится</h2>
      
      {/* Адрес */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-2">
          <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-slate-900">
              {listing.address.street && `${listing.address.street}, `}
              {listing.address.building && `${listing.address.building}, `}
              {listing.address.district && `${listing.address.district}, `}
              {listing.address.city}, {listing.address.country}
            </div>
            <Link
              href={`/atlas/cities/${listing.address.city.toLowerCase()}`}
              className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1 mt-1"
            >
              Посмотреть на карте
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Что рядом */}
      <div className="space-y-4">
        {/* Места рядом */}
        {nearbyPlaces.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">Места рядом</h3>
              <Link
                href={`/atlas/places?nearby=${listing.address.coordinates.lat},${listing.address.coordinates.lng}`}
                className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
              >
                Все места
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {nearbyPlaces.map((place) => (
                <Link
                  key={place.id}
                  href={`/atlas/places/${place.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-700">{place.name}</span>
                  <span className="text-sm text-slate-500">{place.distance}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* События рядом */}
        {nearbyEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900">События рядом</h3>
              <Link
                href={`/pulse?nearby=${listing.address.coordinates.lat},${listing.address.coordinates.lng}`}
                className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
              >
                Все события
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {nearbyEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/pulse/${event.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <div className="text-slate-700">{event.name}</div>
                    <div className="text-sm text-slate-500">{event.date}</div>
                  </div>
                  <span className="text-sm text-slate-500">{event.distance}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

