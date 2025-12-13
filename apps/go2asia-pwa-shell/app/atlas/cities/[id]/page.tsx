/**
 * City Detail Page
 * Страница детальной информации о городе
 */

'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCity } from '@/lib/api/atlas/hooks';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { PlacesList } from '@/components/atlas/PlacesList';

interface CityPageProps {
  params: Promise<{ id: string }>;
}

export default function CityPage({ params }: CityPageProps) {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = useCity(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return null;
  }

  const { city, content, featured_places, other_places } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-sky-600">
          Главная
        </Link>
        {' / '}
        <Link href="/atlas" className="hover:text-sky-600">
          Atlas
        </Link>
        {' / '}
        <Link href="/atlas/cities" className="hover:text-sky-600">
          Города
        </Link>
        {' / '}
        <span className="text-gray-900">{city.name}</span>
      </nav>

      {/* Hero Section */}
      {city.hero_image_url && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={city.hero_image_url}
            alt={city.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{city.name}</h1>
        <p className="text-lg text-gray-600">{city.short_description}</p>
      </div>

      {/* Content Sections */}
      {content.overview && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Обзор</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.overview}</p>
          </div>
        </section>
      )}

      {content.districts && content.districts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Районы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.districts.map((district) => (
              <div key={district.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{district.name}</h3>
                <p className="text-gray-600 text-sm">{district.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.lifestyle && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Образ жизни</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.lifestyle}</p>
          </div>
        </section>
      )}

      {/* Featured Places */}
      {featured_places && featured_places.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Популярные места</h2>
          <PlacesList places={featured_places} />
        </section>
      )}

      {/* Other Places */}
      {other_places && other_places.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Другие места</h2>
          <PlacesList places={other_places} />
        </section>
      )}
    </div>
  );
}



