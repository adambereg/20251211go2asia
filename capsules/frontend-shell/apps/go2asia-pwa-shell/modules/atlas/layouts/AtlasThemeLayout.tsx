import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Badge, Chip } from '@go2asia/ui';
import { Clock, Eye, Tag } from 'lucide-react';

export interface AtlasThemeLayoutProps {
  title: string;
  description?: string;
  tags?: string[];
  lastUpdatedAt?: string;
  viewsCount?: number;
  heroImageUrl?: string;
  heroImageAlt?: string;
  children: ReactNode;
}

// Базовый layout страницы темы в Atlas Asia.
// Содержит шапку, мета-информацию и hero-блок.
export const AtlasThemeLayout: FC<AtlasThemeLayoutProps> = ({
  title,
  description,
  tags = [],
  lastUpdatedAt = 'обновление в разработке',
  viewsCount,
  heroImageUrl,
  heroImageAlt,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Image */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Link */}
          <Link
            href="/atlas/themes"
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
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm sm:text-base text-white/80">
                    {description}
                  </p>
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
                {description && (
                  <p className="text-lg text-slate-600 mb-3">{description}</p>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Chip key={index}>
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>
          )}

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

export default AtlasThemeLayout;

