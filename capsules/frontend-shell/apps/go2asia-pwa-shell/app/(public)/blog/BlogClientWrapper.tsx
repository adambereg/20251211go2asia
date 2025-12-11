'use client';

import { ModuleHero } from '@/components/modules';
import { Globe, Clock, User, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, Chip, Badge } from '@go2asia/ui';
import Link from 'next/link';
import { useGetArticles } from '@go2asia/sdk/blog';
import { useMemo } from 'react';

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';
  if (diffDays < 7) return `${diffDays} дня назад`;
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
}

export function BlogClientWrapper() {
  // Загружаем статьи из API
  const { data: articlesData, isLoading } = useGetArticles({
    limit: 20,
    // featured: true, // TODO: Add featured filter when API supports it
  });

  // Преобразуем данные из API
  const featuredArticle = useMemo(() => {
    if (!articlesData?.items || articlesData.items.length === 0) return null;
    const article = articlesData.items[0]; // TODO: Use featured article when API supports it
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      subtitle: article.excerpt || '',
      cover: article.coverImage || 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg',
      readingTime: 10, // TODO: Get readingTime when API supports it
      insights: article.tags?.slice(0, 3) || [],
      badges: ['EDITORIAL', 'Выбор редакции'], // TODO: Determine badge based on type when API supports it
      relatedThemes: article.tags?.slice(0, 3) || [],
    };
  }, [articlesData]);

  const editorialArticles = useMemo(() => {
    if (!articlesData?.items) return [];
    return articlesData.items
      .slice(0, 4) // TODO: Filter by type when API supports it
      .map((article) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || '',
        cover: article.coverImage || 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg',
        author: {
          name: 'Редакция Go2Asia', // TODO: Get author name when API supports it
          avatar: null,
        },
        publishedAt: article.publishedAt || article.createdAt || '',
        readingTime: 5, // TODO: Get readingTime when API supports it
        type: article.category || 'Гайд',
        badges: ['EDITORIAL'],
      }));
  }, [articlesData]);

  const ugcArticles = useMemo(() => {
    if (!articlesData?.items) return [];
    return articlesData.items
      .slice(4, 6) // TODO: Filter by type when API supports it
      .map((article) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || '',
        cover: article.coverImage || 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
        author: {
          name: 'Пользователь', // TODO: Get author name when API supports it
          avatar: null,
        },
        publishedAt: article.publishedAt || article.createdAt || '',
        readingTime: 7, // TODO: Get readingTime when API supports it
        type: 'Колонка',
        badges: ['UGC', 'Проверено редакцией'],
      }));
  }, [articlesData]);

  const rubricFilters = ['Путешествия', 'Городская жизнь', 'Культура', 'Работа', 'Финансы', 'Образование', 'Outdoor', 'Технологии/AI'];
  const formatFilters = ['Гайд', 'Лонгрид', 'Интервью', 'Репортаж', 'Подборка', 'Колонка'];
  const readingTimeFilters = ['5 мин', '10 мин', '20 мин'];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ModuleHero
          icon={Globe}
          title="Blog Asia"
          description="Медиа-площадка Go2Asia: редакционные материалы, UGC-статьи, тематические подборки и спецпроекты"
          gradientFrom="from-sky-500"
          gradientTo="to-sky-600"
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-600">Загрузка статей...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title="Blog Asia"
        description="Медиа-площадка Go2Asia: редакционные материалы, UGC-статьи, тематические подборки и спецпроекты"
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Hero-блок "Тема номера" */}
      {featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href={`/blog/${featuredArticle.slug}`}>
            <Card hover className="overflow-hidden">
              {featuredArticle.cover && (
                <div className="relative w-full h-96 overflow-hidden">
                  <img
                    src={featuredArticle.cover}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredArticle.badges.map((badge, index) => (
                        <Badge key={index} variant={badge === 'EDITORIAL' ? 'editor' : 'popular'}>
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">{featuredArticle.title}</h2>
                    <p className="text-lg text-white/90 mb-4">{featuredArticle.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredArticle.insights.map((insight, index) => (
                        <Chip key={index} size="sm" className="bg-white/20 text-white border-white/30">
                          {insight}
                        </Chip>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{featuredArticle.readingTime} мин чтения</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {featuredArticle.relatedThemes.map((theme, index) => (
                          <span key={index} className="text-sm">#{theme}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </Link>
        </section>
      )}

      {/* Чип-фильтры */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2">Рубрики</div>
              <div className="flex flex-wrap gap-2">
                {rubricFilters.map((rubric) => (
                  <Chip key={rubric}>{rubric}</Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2">Формат</div>
              <div className="flex flex-wrap gap-2">
                {formatFilters.map((format) => (
                  <Chip key={format}>{format}</Chip>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 mb-2">Время чтения</div>
              <div className="flex flex-wrap gap-2">
                {readingTimeFilters.map((time) => (
                  <Chip key={time}>{time}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Главные сегодня */}
      {editorialArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Главные сегодня</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorialArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card hover className="h-full flex flex-col overflow-hidden p-0 !border-0">
                  {article.cover && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <img
                        src={article.cover}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {article.badges.map((badge, index) => (
                          <Badge key={index} variant={badge === 'EDITORIAL' ? 'editor' : 'ugc'} className="text-xs mb-1">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info" className="text-xs">{article.type}</Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} />
                        {article.readingTime} мин
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-xs text-slate-500">
                        {formatDate(article.publishedAt)}
                      </div>
                      <span className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                        Читать →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Выбор сообщества */}
      {ugcArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Выбор сообщества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ugcArticles.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card hover className="h-full flex flex-col overflow-hidden p-0 !border-0">
                  {article.cover && (
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={article.cover}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {article.badges.map((badge, index) => (
                          <Badge key={index} variant={badge === 'UGC' ? 'ugc' : 'verified'} className="text-xs mb-1">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info" className="text-xs">{article.type}</Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={12} />
                        {article.readingTime} мин
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                          <User size={14} className="text-slate-600" />
                        </div>
                        <div className="text-xs">
                          <div className="font-medium text-slate-900">{article.author.name}</div>
                          <div className="text-slate-500">{formatDate(article.publishedAt)}</div>
                        </div>
                      </div>
                      <span className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                        Читать →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

