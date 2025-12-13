/**
 * Country Detail Page
 * Страница детальной информации о стране
 */

'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCountry } from '@/lib/api/atlas/hooks';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { CitiesList } from '@/components/atlas/CitiesList';

interface CountryPageProps {
  params: Promise<{ id: string }>;
}

export default function CountryPage({ params }: CountryPageProps) {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = useCountry(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={() => refetch()} />;
  }

  if (!data) {
    return null;
  }

  const { country, content, cities } = data;

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
        <Link href="/atlas/countries" className="hover:text-sky-600">
          Страны
        </Link>
        {' / '}
        <span className="text-gray-900">{country.name}</span>
      </nav>

      {/* Hero Section */}
      {country.hero_image_url && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={country.hero_image_url}
            alt={country.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{country.name}</h1>
        <p className="text-lg text-gray-600">{country.short_description}</p>
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

      {content.history && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">История</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.history}</p>
          </div>
        </section>
      )}

      {content.geography && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">География</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.geography}</p>
          </div>
        </section>
      )}

      {content.culture && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Культура</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.culture}</p>
          </div>
        </section>
      )}

      {content.visas && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Визы</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.visas}</p>
          </div>
        </section>
      )}

      {content.business && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Бизнес</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{content.business}</p>
          </div>
        </section>
      )}

      {/* Cities Section */}
      {cities && cities.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Города</h2>
          <CitiesList cities={cities} />
        </section>
      )}
    </div>
  );
}



