import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@go2asia/ui';
import { Clock, Eye } from 'lucide-react';

export interface AtlasCountryTab {
  id: string;
  label: string;
}

export interface AtlasCountryLayoutProps {
  countryName: string;
  flagEmoji?: string;
  tldr?: string;
  lastUpdatedAt?: string;
  viewsCount?: number;
  tabs?: AtlasCountryTab[];
  activeTabId?: string;
  headerSlot?: ReactNode;
  heroImageUrl?: string;
  heroImageAlt?: string;
  children: ReactNode;
}

const DEFAULT_TABS: AtlasCountryTab[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'history', label: 'История' },
  { id: 'geography', label: 'География' },
  { id: 'culture', label: 'Культура' },
  { id: 'living', label: 'Проживание' },
  { id: 'visas', label: 'Визы' },
  { id: 'business', label: 'Бизнес' },
];

// Базовый layout страницы страны в Atlas Asia.
// Содержит шапку, мета-информацию и навигацию по вкладкам.
export const AtlasCountryLayout: FC<AtlasCountryLayoutProps> = ({
  countryName,
  flagEmoji = '🌏',
  tldr,
  lastUpdatedAt = 'обновление в разработке',
  viewsCount,
  tabs = DEFAULT_TABS,
  activeTabId = 'overview',
  headerSlot,
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
            href="/atlas/countries"
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
                alt={heroImageAlt || countryName}
                className="absolute inset-0 w-full h-full object-cover object-center"
                sizes="(min-width: 1280px) 1200px, 100vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 pointer-events-none">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {countryName}
                </h1>
                {flagEmoji && (
                  <p className="text-lg sm:text-xl text-white/90 font-normal">
                    {flagEmoji} {countryName}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Fallback: Simple Header without Image */
            <div className="mb-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl" aria-hidden="true">
                  {flagEmoji}
                </div>
                <div className="flex-1">
                  <h1 className="text-h1 md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                    {countryName}
                  </h1>
                </div>
              </div>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Badge variant="verified">Проверено редакцией</Badge>
            {headerSlot}
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

export default AtlasCountryLayout;


