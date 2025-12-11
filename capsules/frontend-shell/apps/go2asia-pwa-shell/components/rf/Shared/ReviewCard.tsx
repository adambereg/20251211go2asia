'use client';

import Image from 'next/image';
import { Card, CardContent, Badge, Avatar } from '@go2asia/ui';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
      />
    ));
  };

  return (
    <Card className={className}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          <Avatar
            initials={getInitials(review.author.displayName)}
            size="md"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-slate-900">{review.author.displayName}</h4>
              {review.author.role === 'pro' && (
                <Badge variant="editor" className="text-xs">
                  PRO
                </Badge>
              )}
              {review.verifiedPurchase && (
                <Badge variant="verified" className="text-xs">
                  <CheckCircle2 size={10} className="mr-1" />
                  Проверенная покупка
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
              <span className="text-xs text-slate-500">
                {new Date(review.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="text-sm text-slate-700 mb-3">{review.text}</p>

            {review.photos && review.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {review.photos.map((photo, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={photo}
                      alt={`Фото от ${review.author.displayName}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {review.reply && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-slate-900">{review.reply.author}</span>
                  <Badge variant="info" className="text-xs">
                    Ответ партнёра
                  </Badge>
                </div>
                <p className="text-sm text-slate-700">{review.reply.text}</p>
                <span className="text-xs text-slate-500 mt-1 block">
                  {new Date(review.reply.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

