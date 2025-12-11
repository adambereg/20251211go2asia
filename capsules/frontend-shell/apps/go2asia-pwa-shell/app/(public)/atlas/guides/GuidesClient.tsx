'use client';

import Link from 'next/link';
import { Card, CardContent, Chip, Skeleton, SkeletonCard } from '@go2asia/ui';
import { ModuleHero } from '@/components/modules';
import { Globe, Clock } from 'lucide-react';
import { AtlasMainNav } from '@/modules/atlas';
import { AtlasSearchBar } from '@/modules/atlas';
import { useGetArticles } from '@go2asia/sdk/blog';
import { useMemo, useState } from 'react';

export function GuidesClient() {
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  
  // Загружаем гайды из API (статьи с типом guide)
  // Примечание: если API поддерживает фильтрацию по типу, добавить category: 'guide'
  const { 
    data: guidesData, 
    isLoading
  } = useGetArticles({
    limit: 20,
    cursor,
    // category: 'guide', // TODO: Add when API supports guide category filter
  });

  // Преобразуем данные из API
  const guides = useMemo(() => {
    if (!guidesData?.items) return [];
    return guidesData.items.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt || '',
      coverImage: article.coverImage,
      category: article.category,
      tags: article.tags || [],
      publishedAt: article.publishedAt || article.createdAt || '',
      // TODO: Get city name when API supports it
      // TODO: Get country name when API supports it
      // TODO: Get readingTime when API supports it
      // TODO: Get duration when API supports it
      // TODO: Get difficulty when API supports it
      // TODO: Get audience when API supports it
      // TODO: Get rating when API supports it
      // TODO: Get reviews count when API supports it
    }));
  }, [guidesData]);

  // Показываем состояние загрузки
  if (isLoading && !guidesData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ModuleHero
          icon={Globe}
          title="Atlas Asia"
          description="«Живой» вики-справочник по странам Юго-Восточной Азии с UGC и редакционной поддержкой"
          gradientFrom="from-sky-500"
          gradientTo="to-sky-600"
        />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <AtlasMainNav />
          <AtlasSearchBar />
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Skeleton className="h-12 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </div>
    );
  }


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

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip>Все типы</Chip>
          <Chip>Маршруты и планы</Chip>
          <Chip>Практика и документы</Chip>
          <Chip>Жизнь на месте</Chip>
          <Chip>Еда / культура</Chip>
          <Chip>Подборки мест</Chip>
          <Chip>Сезонные</Chip>
          <Chip>Безопасность</Chip>
        </div>
      </section>

      {/* Guides Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-6">
          Все гайды
        </h2>
        {guides.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link key={guide.id} href={`/atlas/guides/${guide.slug || guide.id}`}>
                  <Card hover className="h-full overflow-hidden p-0 !border-0">
                    {guide.coverImage ? (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={guide.coverImage}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          {/* TODO: Add editor badge when API supports it */}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{guide.title}</h3>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{guide.title}</h3>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      {guide.excerpt && (
                        <p className="text-small text-slate-600 mb-3 line-clamp-2">
                          {guide.excerpt}
                        </p>
                      )}
                      {guide.category && (
                        <div className="mb-3">
                          <Chip size="sm" className="bg-slate-100 text-slate-700">
                            {guide.category}
                          </Chip>
                        </div>
                      )}
                      {guide.tags && guide.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {guide.tags.slice(0, 3).map((tag) => (
                            <Chip key={tag} size="sm" className="bg-slate-100 text-slate-700">
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        {guide.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>
                              {new Date(guide.publishedAt).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {/* Пагинация */}
            {guidesData?.hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCursor(guidesData.nextCursor || undefined)}
                  disabled={isLoading}
                  className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Загрузка...' : 'Загрузить ещё'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600">Гайды не найдены</p>
          </div>
        )}
      </section>
    </div>
  );
}

