import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Badge, Chip } from '@go2asia/ui';
import { MapPin, Clock, Eye, Star, BookOpen } from 'lucide-react';

export interface AtlasGuideLayoutProps {
  title: string;
  cityName?: string;
  countryName?: string;
  guideType?: string;
  readingTime?: number;
  duration?: string;
  difficulty?: 'light' | 'medium' | 'hard';
  audience?: string[];
  isEditor?: boolean;
  isUGC?: boolean;
  isPartner?: boolean;
  rating?: number;
  tags?: string[];
  lastUpdatedAt?: string;
  viewsCount?: number;
  heroImageUrl?: string;
  heroImageAlt?: string;
  children: ReactNode;
}

// Базовый layout страницы гайда в Atlas Asia.
// Содержит шапку, мета-информацию и hero-блок.
export const AtlasGuideLayout: FC<AtlasGuideLayoutProps> = ({
  title,
  cityName,
  countryName,
  guideType,
  readingTime,
  duration,
  difficulty,
  audience = [],
  isEditor,
  isUGC,
  isPartner,
  rating,
  tags = [],
  lastUpdatedAt = 'обновление в разработке',
  viewsCount,
  heroImageUrl,
  heroImageAlt,
  children,
}) => {
  const locationLabel = [cityName, countryName].filter(Boolean).join(', ');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Image */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Link */}
          <Link
            href="/atlas/guides"
            className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-sky-600 mb-4 transition-colors"
          >
            <span>←</span>
            <span>Назад к списку</span>
          </Link>

          {/* Hero Image Block */}
          {heroImageUrl ? (
            <div
              className="
                relative w-full overflow-hidden rounded-2xl mb-6
                h-36 sm:h-44 md:h-56 lg:h-64
                xl:h-96
              "
            >
              <img
                src={heroImageUrl}
                alt={heroImageAlt || title}
                className="absolute inset-0 w-full h-full object-cover object-center"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 pointer-events-none">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {title}
                </h1>
                {locationLabel && (
                  <p className="text-sm sm:text-base text-white/80 mb-2">
                    <MapPin size={14} className="inline mr-1" />
                    {locationLabel}
                  </p>
                )}
                {duration && (
                  <p className="text-sm text-white/80 mb-1">
                    <Clock size={14} className="inline mr-1" />
                    {duration}
                  </p>
                )}
                {rating !== undefined && (
                  <div className="flex items-center gap-2 text-white/90">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Fallback: Simple Header without Image */
            <div className="mb-6">
              <div className="flex-1">
                <h1 className="text-h1 md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                  {title}
                </h1>
                {locationLabel && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <MapPin size={14} />
                    <span>{locationLabel}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags and Status Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {guideType && (
              <Chip>{guideType}</Chip>
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Chip key={index}>
                    {tag}
                  </Chip>
                ))}
              </div>
            )}
            {isEditor && (
              <Badge variant="editor">От редакции</Badge>
            )}
            {isUGC && (
              <Badge variant="ugc">UGC</Badge>
            )}
            {isPartner && (
              <Badge variant="russian-friendly">Партнёр</Badge>
            )}
            {readingTime && (
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <BookOpen size={14} />
                <span>{readingTime} мин чтения</span>
              </div>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="verified">Проверено редакцией</Badge>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {lastUpdatedAt}
              </span>
              {viewsCount !== undefined && (
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {viewsCount.toLocaleString('ru-RU')} просмотров
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AtlasGuideLayout;

