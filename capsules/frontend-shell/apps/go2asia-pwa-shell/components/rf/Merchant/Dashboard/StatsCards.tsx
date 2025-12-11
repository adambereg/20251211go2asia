'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Eye, Ticket, CheckCircle2, Star } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    views: number;
    vouchersReceived: number;
    vouchersRedeemed: number;
    rating: number;
    reviewsCount: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Просмотры',
      value: stats.views.toLocaleString('ru-RU'),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Ваучеров получено',
      value: stats.vouchersReceived.toLocaleString('ru-RU'),
      icon: Ticket,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ваучеров погашено',
      value: stats.vouchersRedeemed.toLocaleString('ru-RU'),
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Рейтинг',
      value: stats.rating > 0 ? stats.rating.toFixed(1) : '—',
      subtitle: `${stats.reviewsCount} отзывов`,
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card key={idx} className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                  {card.subtitle && (
                    <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
                  )}
                </div>
                <div className={`${card.bgColor} ${card.color} p-2 rounded-lg`}>
                  <Icon size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

