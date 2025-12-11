'use client';

/**
 * Rielt.Market Asia - Reviews
 * Отзывы (UGC)
 */

import Image from 'next/image';
import { Star, CheckCircle } from 'lucide-react';
import type { Listing } from '../types';

interface ReviewsProps {
  listing: Listing;
}

// TODO: Получать отзывы из API
const mockReviews = [
  {
    id: '1',
    authorName: 'Анна Петрова',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Отличное место! Всё соответствует описанию, чисто, уютно. Владелец очень отзывчивый. Рекомендую!',
    photos: [],
    verifiedBooking: true,
    curatorVerified: true,
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: '2',
    authorName: 'Дмитрий Соколов',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    text: 'Хорошая студия в центре. Wi-Fi работает отлично, есть всё необходимое для работы. Единственный минус - немного шумно по вечерам.',
    photos: [],
    verifiedBooking: true,
    curatorVerified: false,
    createdAt: '2025-01-10T00:00:00Z',
  },
];

export function Reviews({ listing }: ReviewsProps) {
  const reviews = mockReviews; // В реальности получать из listing.reviews или API

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Отзывы</h2>
        <p className="text-slate-600">Пока нет отзывов. Станьте первым!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Отзывы ({reviews.length})
        </h2>
        {/* TODO: Добавить сортировку */}
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-slate-200 last:border-0">
            <div className="flex items-start gap-4">
              {/* Аватар */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                {review.authorAvatar ? (
                  <Image
                    src={review.authorAvatar}
                    alt={review.authorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-bold text-slate-400">
                    {review.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Контент */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-slate-900">{review.authorName}</span>
                  {review.verifiedBooking && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Проверенная бронь
                    </span>
                  )}
                  {review.curatorVerified && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                      Проверено куратором
                    </span>
                  )}
                </div>

                {/* Рейтинг */}
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Текст отзыва */}
                <p className="text-slate-700 mb-3">{review.text}</p>

                {/* Фото отзыва */}
                {review.photos && review.photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {review.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-slate-200"
                      >
                        <Image
                          src={photo}
                          alt={`Фото от ${review.authorName}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Дата */}
                <div className="text-sm text-slate-500">
                  {new Date(review.createdAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

