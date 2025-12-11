'use client';

import React, { useState } from 'react';
import { Card, CardContent, Badge } from '@go2asia/ui';
import { Image, User, CheckCircle2, Heart, MessageCircle } from 'lucide-react';

interface UGCPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isCurator?: boolean;
    isUGC?: boolean;
  };
  content: string;
  images?: string[];
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
}

interface EventUGCBlockProps {
  eventId: string;
}

// Mock данные UGC постов (в реальности будут загружаться из API)
const mockUGCPosts: Record<string, UGCPost[]> = {
  '1': [
    {
      id: 'ugc-1',
      author: {
        id: 'user-1',
        name: 'Анна К.',
        avatar: undefined,
        isUGC: true,
      },
      content: 'Отличная йога-сессия! Очень расслабляюще, особенно на рассвете. Рекомендую всем, кто хочет начать день с позитива.',
      images: ['https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg'],
      createdAt: new Date('2025-11-23T08:00:00'),
      likesCount: 12,
      commentsCount: 3,
    },
    {
      id: 'ugc-2',
      author: {
        id: 'user-2',
        name: 'PRO Куратор Мария',
        avatar: undefined,
        isCurator: true,
      },
      content: 'Проверено куратором. Отличное мероприятие, организаторы очень внимательные. Всем рекомендую!',
      createdAt: new Date('2025-11-23T09:00:00'),
      likesCount: 25,
      commentsCount: 5,
    },
  ],
  '5': [
    {
      id: 'ugc-3',
      author: {
        id: 'user-3',
        name: 'Дмитрий С.',
        avatar: undefined,
        isUGC: true,
      },
      content: 'Потрясающий мастер-класс! Научился готовить пад тай как настоящий таец. Все ингредиенты свежие, инструктор объясняет на русском. Обязательно вернусь!',
      images: [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
        'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      ],
      createdAt: new Date('2025-11-25T14:00:00'),
      likesCount: 18,
      commentsCount: 7,
    },
  ],
};

export const EventUGCBlock: React.FC<EventUGCBlockProps> = ({ eventId }) => {
  const [posts, setPosts] = useState<UGCPost[]>(mockUGCPosts[eventId] || []);
  const [filter, setFilter] = useState<'all' | 'with-photos' | 'curated'>('all');
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Фильтрация постов
  const filteredPosts = posts.filter((post) => {
    if (filter === 'with-photos' && (!post.images || post.images.length === 0)) {
      return false;
    }
    if (filter === 'curated' && !post.author.isCurator) {
      return false;
    }
    return true;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleLoadMore = () => {
    // TODO: Загрузка следующих постов через cursor-based пагинацию
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // В реальности здесь будет загрузка с сервера
    }, 500);
  };

  if (filteredPosts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Отчёты сообщества</h2>
          <p className="text-slate-600 text-center py-8">
            Пока нет отчётов о событии. После мероприятия здесь появятся фото и впечатления участников.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {/* Заголовок и фильтры */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Отчёты сообщества</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter('with-photos')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'with-photos'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Image className="w-4 h-4 inline mr-1" />
              С фото
            </button>
            <button
              onClick={() => setFilter('curated')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                filter === 'curated'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Проверено куратором
            </button>
          </div>
        </div>

        {/* Список постов */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
              {/* Автор */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">{post.author.name}</span>
                    {post.author.isCurator && (
                      <Badge variant="verified" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Проверено куратором
                      </Badge>
                    )}
                    {post.author.isUGC && (
                      <Badge variant="info" className="text-xs">
                        UGC
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>

              {/* Контент */}
              <p className="text-slate-700 mb-3 whitespace-pre-line">{post.content}</p>

              {/* Изображения */}
              {post.images && post.images.length > 0 && (
                <div className={`grid gap-2 mb-3 ${
                  post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
                }`}>
                  {post.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src={image}
                        alt={`Фото ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Действия */}
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <button className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  {post.likesCount}
                </button>
                <button className="flex items-center gap-1 hover:text-sky-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.commentsCount}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Загрузить ещё" */}
        {cursor && (
          <div className="mt-6 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Загрузка...' : 'Загрузить ещё'}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

