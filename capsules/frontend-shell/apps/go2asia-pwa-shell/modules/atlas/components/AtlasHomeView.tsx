import type { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@go2asia/ui';
import { ModuleHero } from '@/components/modules';
import { Globe, MapPin } from 'lucide-react';
import { AtlasMainNav } from './AtlasMainNav';
import { AtlasSearchBar } from './AtlasSearchBar';

export interface AtlasHomeCountry {
  id: string;
  name: string;
  flag?: string;
  code?: string;
  description?: string;
  placesCount?: number;
  heroImage?: string;
}

export interface AtlasHomePopularPlace {
  id: string;
  title: string;
  city?: string;
  country?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface AtlasHomeViewProps {
  countries: AtlasHomeCountry[];
  popularPlaces: AtlasHomePopularPlace[];
}

// Главная страница Atlas Asia: страны и популярные места.
// Не содержит бизнес-логики и не делает API-вызовов — только рендерит переданные данные.
export const AtlasHomeView: FC<AtlasHomeViewProps> = ({
  countries,
  popularPlaces,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title="Atlas Asia"
        description="«Живой» вики-справочник по странам Юго-Восточной Азии с UGC и редакционной поддержкой"
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Top controls: internal nav + search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <AtlasMainNav />
        <AtlasSearchBar />
      </section>

      {/* Countries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-6">
          Страны
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Link key={country.id} href={`/atlas/countries/${country.id}`}>
              <Card hover className="h-full overflow-hidden">
                {country.heroImage && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={country.heroImage}
                      alt={country.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {country.flag && (
                      <div className="absolute top-4 left-4 text-4xl">{country.flag}</div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{country.name}</h3>
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  {!country.heroImage && (
                    <div className="flex items-start gap-4 mb-4">
                      {country.flag && (
                        <div className="text-4xl" aria-hidden="true">
                          {country.flag}
                        </div>
                      )}
                      <h3 className="text-h3 md:text-2xl font-bold text-slate-900">
                        {country.name}
                      </h3>
                    </div>
                  )}
                  {country.description && (
                    <p className="text-small text-slate-600 mb-3 line-clamp-2">
                      {country.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="flex-shrink-0" />
                    <span>
                      {country.placesCount
                        ? `${country.placesCount} мест`
                        : 'Места в разработке'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Places */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-6">
          Популярные места
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPlaces.map((place) => (
            <Link key={place.id} href={`/atlas/places/${place.id}`}>
              <Card hover>
                <CardContent className="p-5">
                  <h3 className="text-h3 md:text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
                    {place.title}
                  </h3>
                  {(place.city || place.country) && (
                    <p className="text-small text-slate-600 mb-3">
                      {[place.city, place.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                  {(place.rating || place.reviewsCount) && (
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {place.rating && (
                        <span className="flex items-center gap-1">
                          <span className="text-amber-500" aria-hidden="true">
                            ⭐
                          </span>
                          {place.rating}
                        </span>
                      )}
                      {place.reviewsCount && (
                        <span>{place.reviewsCount} отзывов</span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AtlasHomeView;


