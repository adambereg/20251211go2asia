'use client';

import { Card, CardContent, Button, Badge } from '@go2asia/ui';
import { MessageSquare, Reply } from 'lucide-react';
import { ReviewCard } from '../../Shared';
import { mockReviews } from '../../mockData';
import { mockPartners } from '../../mockData';

export function ReviewsListView() {
  // В реальном приложении здесь будет загрузка отзывов текущего партнёра
  const partnerId = mockPartners[0].id;
  const reviews = mockReviews.filter((r) => r.partnerId === partnerId);

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Отзывы</h1>
        <p className="text-slate-600">
          Управляйте отзывами клиентов и отвечайте на них
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Всего отзывов</p>
                <p className="text-2xl font-bold text-slate-900">{reviews.length}</p>
              </div>
              <MessageSquare size={24} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Средний рейтинг</p>
                <p className="text-2xl font-bold text-slate-900">
                  {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1)}
                </p>
              </div>
              <MessageSquare size={24} className="text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Без ответа</p>
                <p className="text-2xl font-bold text-slate-900">
                  {reviews.filter((r) => !r.reply).length}
                </p>
              </div>
              <Reply size={24} className="text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список отзывов */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-blue-200">
            <CardContent className="p-6">
              <ReviewCard review={review} />
              {!review.reply && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <Button variant="secondary" size="sm">
                    <Reply size={16} className="mr-2" />
                    Ответить на отзыв
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

