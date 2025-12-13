/**
 * Place Detail Page
 * Страница детальной информации о месте
 */

'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlace } from '@/lib/api/atlas/hooks';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface PlacePageProps {
  params: Promise<{ id: string }>;
}

export default function PlacePage({ params }: PlacePageProps) {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = usePlace(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return null;
  }

  const { place, description, rating_summary } = data;

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
        <Link href="/atlas/places" className="hover:text-sky-600">
          Места
        </Link>
        {' / '}
        <span className="text-gray-900">{place.name}</span>
      </nav>

      {/* Hero Section */}
      {place.hero_image_url && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={place.hero_image_url}
            alt={place.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{place.name}</h1>
            {place.type && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-sky-600 bg-sky-50 rounded">
                {place.type}
              </span>
            )}
          </div>
          {rating_summary && (
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <div className="text-lg font-semibold text-gray-900">
                  {rating_summary.average_rating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {rating_summary.ratings_count} отзывов
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-lg text-gray-600">{place.short_description}</p>
      </div>

      {/* Address */}
      {place.address && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-700">{place.address}</p>
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Описание</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        </section>
      )}

      {/* Categories and Tags */}
      {(place.categories.length > 0 || place.tags) && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Категории</h2>
          <div className="flex flex-wrap gap-2">
            {place.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded"
              >
                {category}
              </span>
            ))}
            {place.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium text-sky-600 bg-sky-50 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}



