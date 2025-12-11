'use client';

import { Card, CardContent } from '@go2asia/ui';
import { ReviewCard } from '../Shared';
import { Button } from '@go2asia/ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { mockReviews } from '../mockData';
import type { Partner } from '../types';

interface ReviewsBlockProps {
  partner: Partner;
}

export function ReviewsBlock({ partner }: ReviewsBlockProps) {
  const partnerReviews = mockReviews.filter((r) => r.partnerId === partner.id).slice(0, 5);

  if (partnerReviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Отзывы</h2>
          <p className="text-slate-600">Пока нет отзывов. Будьте первым!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Отзывы ({partner.stats.reviewsCount})
          </h2>
          <Link href={`/rf/${partner.id}/reviews`}>
            <Button variant="secondary" size="sm">
              Все отзывы
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {partnerReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

