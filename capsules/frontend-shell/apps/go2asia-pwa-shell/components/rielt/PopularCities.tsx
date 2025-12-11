'use client';

/**
 * Rielt.Market Asia - PopularCities
 * Секция "Популярно сейчас" (города/районы)
 */

import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const POPULAR_CITIES = [
  { name: 'Бангкок', country: 'Таиланд', count: 124, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400' },
  { name: 'Пхукет', country: 'Таиланд', count: 89, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
  { name: 'Бали', country: 'Индонезия', count: 156, image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400' },
  { name: 'Хошимин', country: 'Вьетнам', count: 67, image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400' },
  { name: 'Куала-Лумпур', country: 'Малайзия', count: 45, image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400' },
  { name: 'Сингапур', country: 'Сингапур', count: 78, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400' },
];

export function PopularCities() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Популярно сейчас
        </h2>
        <Link
          href="/rielt/search"
          className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2"
        >
          Все города
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {POPULAR_CITIES.map((city) => (
          <Link
            key={city.name}
            href={`/rielt/search?city=${encodeURIComponent(city.name)}`}
            className="group relative overflow-hidden rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-xs text-white opacity-95">{city.country}</span>
              </div>
              <h3 className="font-bold text-sm md:text-base text-white">{city.name}</h3>
              <p className="text-xs text-white opacity-95 mt-1">{city.count} объявлений</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

