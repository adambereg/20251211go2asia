'use client';

import type { ReactNode } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AtlasThemeLayout } from '@/modules/atlas';
import {
  Info,
  Globe2,
  BookOpen,
  MapPin,
  HelpCircle,
  Calendar,
  MessageCircle,
  History,
} from 'lucide-react';

// Моковые данные для разных тем (fallback, если API не работает)
const mockThemes: Record<string, { title: string; description: string; heroImageUrl: string; heroImageAlt: string; tags: string[] }> = {
  visas: {
    title: 'Визы и миграция',
    description: 'Типы виз, правила въезда, риски и обновления регламентов.',
    heroImageUrl: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg',
    heroImageAlt: 'Визы и миграция',
    tags: ['регламенты', 'обновления', 'переезд', 'туристы'],
  },
  taxes: {
    title: 'Налоги и работа',
    description: 'Фриланс, удалёнка, бизнес-структуры и базовые налоговые режимы.',
    heroImageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    heroImageAlt: 'Налоги и работа',
    tags: ['фриланс', 'бизнес', 'налоги'],
  },
  education: {
    title: 'Образование и дети',
    description: 'Школы, садики, курсы и семейные сценарии переезда.',
    heroImageUrl: 'https://images.pexels.com/photos/2491286/pexels-photo-2491286.jpeg',
    heroImageAlt: 'Образование и дети',
    tags: ['школы', 'семья', 'переезд'],
  },
  medicine: {
    title: 'Медицина',
    description: 'Медицинское обслуживание, страховка, клиники и врачи в ЮВА.',
    heroImageUrl: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
    heroImageAlt: 'Медицина',
    tags: ['клиники', 'страховка', 'врачи'],
  },
  communication: {
    title: 'Связь и интернет',
    description: 'Мобильная связь, интернет, VPN и цифровые сервисы.',
    heroImageUrl: 'https://images.pexels.com/photos/774691/pexels-photo-774691.jpeg',
    heroImageAlt: 'Связь и интернет',
    tags: ['SIM', 'VPN', 'интернет'],
  },
  banking: {
    title: 'Банки и финтех',
    description: 'Банковские счета, карты, переводы и финансовые сервисы.',
    heroImageUrl: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    heroImageAlt: 'Банки и финтех',
    tags: ['банки', 'карты', 'переводы'],
  },
};

const sideNavItems = [
  { key: 'overview', label: 'Обзор', icon: Info, href: '' },
  { key: 'countries', label: 'По странам', icon: Globe2, href: 'countries' },
  { key: 'guides', label: 'Гайды по теме', icon: BookOpen, href: 'guides' },
  { key: 'places', label: 'Подборки мест', icon: MapPin, href: 'places' },
  { key: 'tips', label: 'Практическая информация', icon: HelpCircle, href: 'tips' },
  { key: 'events', label: 'События рядом', icon: Calendar, href: 'events' },
  { key: 'reviews', label: 'Отзывы и опыт', icon: MessageCircle, href: 'reviews' },
  { key: 'versions', label: 'Версии и обновления', icon: History, href: 'versions' },
] as const;

interface ThemeData {
  title: string;
  description?: string;
  heroImage?: string;
  tags?: string[];
  updatedAt?: string;
}

export default function ThemeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const themeIdFromUrl = params?.id as string;
  const themeId = pathname.split('/').slice(0, 4).join('/'); // /atlas/themes/[id]

  const [themeData, setThemeData] = useState<ThemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем данные темы из API
  useEffect(() => {
    if (!themeIdFromUrl) {
      setIsLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.go2asia.space';
    fetch(`${apiUrl}/v1/api/content/themes/${themeIdFromUrl}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data) {
          setThemeData(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [themeIdFromUrl]);

  // Определяем данные темы: сначала из API, потом из моков, потом дефолт
  const themeIdKey = themeIdFromUrl?.toLowerCase() || '';
  const fallbackMockTheme = mockThemes[themeIdKey] || mockThemes.visas;
  
  const title = themeData?.title || fallbackMockTheme.title;
  const description = themeData?.description || fallbackMockTheme.description;
  const heroImageUrl = themeData?.heroImage || fallbackMockTheme.heroImageUrl;
  const heroImageAlt = themeData?.title || fallbackMockTheme.heroImageAlt;
  const tags = themeData?.tags || fallbackMockTheme.tags;
  const lastUpdatedAt = themeData?.updatedAt
    ? `Последнее обновление: ${new Date(themeData.updatedAt).toLocaleDateString('ru-RU')}`
    : 'Последнее обновление: 17.11.2025';

  return (
    <AtlasThemeLayout
      title={title}
      description={description}
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
                const href = item.href === '' ? themeId : `${themeId}/${item.href}`;
                const isActive =
                  item.href === '' ? pathname === themeId : pathname === href;
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
                  const href = item.href === '' ? themeId : `${themeId}/${item.href}`;
                  const isActive =
                    item.href === '' ? pathname === themeId : pathname === href;
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
    </AtlasThemeLayout>
  );
}

