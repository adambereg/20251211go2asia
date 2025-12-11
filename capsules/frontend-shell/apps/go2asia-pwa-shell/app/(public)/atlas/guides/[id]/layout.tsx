'use client';

import type { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { AtlasGuideLayout } from '@/modules/atlas';
import {
  Info,
  Route,
  Map,
  MapPin,
  HelpCircle,
  Calendar,
  MessageCircle,
  History,
} from 'lucide-react';
import { useGetArticleBySlug } from '@go2asia/sdk/blog';
import { Skeleton } from '@go2asia/ui';

const sideNavItems = [
  { key: 'overview', label: 'Обзор', icon: Info, href: '' },
  { key: 'route', label: 'Маршрут / План', icon: Route, href: 'route' },
  { key: 'map', label: 'Карта', icon: Map, href: 'map' },
  { key: 'places', label: 'Подборки мест', icon: MapPin, href: 'places' },
  { key: 'tips', label: 'Практическая информация', icon: HelpCircle, href: 'tips' },
  { key: 'events', label: 'События рядом', icon: Calendar, href: 'events' },
  { key: 'reviews', label: 'Отзывы и опыт', icon: MessageCircle, href: 'reviews' },
  { key: 'versions', label: 'Версии / Обновления', icon: History, href: 'versions' },
] as const;

export default function GuideLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const guideIdFromUrl = params?.id as string;
  const guideId = pathname.split('/').slice(0, 4).join('/'); // /atlas/guides/[id]

  // Загружаем данные гайда из API через SDK hook (используем slug из URL)
  const { 
    data: articleData, 
    isLoading 
  } = useGetArticleBySlug(guideIdFromUrl || '');

  // Определяем данные гайда из API
  const title = articleData?.title || 'Загрузка...';
  const cityName = ''; // TODO: Get city name when API supports it
  const countryName = ''; // TODO: Get country name when API supports it
  const heroImageUrl = articleData?.coverImage || 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg';
  const heroImageAlt = articleData?.title || 'Гайд';
  const guideType = articleData?.category || '';
  const readingTime = 0; // TODO: Get readingTime when API supports it
  const duration = ''; // TODO: Get duration when API supports it
  const tags = articleData?.tags || [];
  const rating = 0; // TODO: Get rating when API supports it
  const lastUpdatedAt = articleData?.updatedAt
    ? `Последнее обновление: ${new Date(articleData.updatedAt).toLocaleDateString('ru-RU')}`
    : 'Последнее обновление: 17.11.2025';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <AtlasGuideLayout
      title={title}
      cityName={cityName}
      countryName={countryName}
      guideType={guideType}
      readingTime={readingTime}
      duration={duration}
      isEditor={true}
      rating={rating}
      tags={tags}
      lastUpdatedAt={lastUpdatedAt}
      viewsCount={1234}
      heroImageUrl={heroImageUrl}
      heroImageAlt={heroImageAlt}
    >
      <div className="space-y-6">
        {/* Горизонтальное меню для мобильных */}
        <div className="lg:hidden">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="font-semibold text-slate-900 mb-3 text-sm">
              Структура справочника
            </div>
            <nav className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3">
              {sideNavItems.map((item) => {
                const Icon = item.icon;
                const href = item.href === '' ? guideId : `${guideId}/${item.href}`;
                const isActive =
                  item.href === '' ? pathname === guideId : pathname === href;
                return (
                  <Link
                    key={item.key}
                    href={href}
                    className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 min-w-[80px] transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs text-center leading-tight">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Основной контент с вертикальным меню на десктопе */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Вертикальное меню для десктопа */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
              <div className="font-semibold text-slate-900 mb-3">
                Структура справочника
              </div>
              <nav className="space-y-1">
                {sideNavItems.map((item) => {
                  const Icon = item.icon;
                  const href = item.href === '' ? guideId : `${guideId}/${item.href}`;
                  const isActive =
                    item.href === '' ? pathname === guideId : pathname === href;
                  return (
                    <Link
                      key={item.key}
                      href={href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors ${
                        isActive
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Контент */}
          <section>{children}</section>
        </div>
      </div>
    </AtlasGuideLayout>
  );
}

