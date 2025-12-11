'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Eye, Ticket, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import { mockPartners } from '../../mockData';

export function StatsView() {
  // В реальном приложении здесь будет загрузка статистики текущего партнёра
  const partner = mockPartners[0];
  const stats = partner.stats;

  const statsCards = [
    {
      title: 'Просмотры профиля',
      value: stats.views.toLocaleString('ru-RU'),
      change: '+12%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Ваучеров получено',
      value: stats.vouchersReceived.toLocaleString('ru-RU'),
      change: '+8%',
      icon: Ticket,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ваучеров погашено',
      value: stats.vouchersRedeemed.toLocaleString('ru-RU'),
      change: '+15%',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Средний рейтинг',
      value: stats.rating > 0 ? stats.rating.toFixed(1) : '—',
      change: '+0.2',
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Статистика</h1>
        <p className="text-slate-600">Отслеживайте эффективность вашего заведения</p>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`${card.bgColor} ${card.color} p-2 rounded-lg`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <TrendingUp size={14} />
                    {card.change}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Детальная статистика</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Сохранений профиля</span>
                <span className="font-semibold text-slate-900">{stats.saves}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Количество отзывов</span>
                <span className="font-semibold text-slate-900">{stats.reviewsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Конверсия ваучеров</span>
                <span className="font-semibold text-slate-900">
                  {stats.vouchersReceived > 0
                    ? ((stats.vouchersRedeemed / stats.vouchersReceived) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Рекомендации</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• Регулярно обновляйте ваучеры для привлечения новых клиентов</p>
              <p>• Отвечайте на отзывы для улучшения рейтинга</p>
              <p>• Добавляйте новые фото в галерею для повышения просмотров</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

