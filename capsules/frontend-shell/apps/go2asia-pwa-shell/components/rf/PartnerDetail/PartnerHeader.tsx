'use client';

import { Star, MapPin, DollarSign, Clock, Bookmark, Share2 } from 'lucide-react';
import { Badge, Button } from '@go2asia/ui';
import { RFBadge, VerifiedBadge } from '../Shared';
import { PARTNER_CATEGORY_LABELS } from '../types';
import type { Partner } from '../types';

interface PartnerHeaderProps {
  partner: Partner;
  onSave?: () => void;
  onShare?: () => void;
}

export function PartnerHeader({ partner, onSave }: PartnerHeaderProps) {
  const isOpen = checkIfOpen(partner.hours);

  return (
    <div className="space-y-4">
      {/* Название и бейджи */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <RFBadge />
            {partner.rfStatus.verified && <VerifiedBadge />}
            <Badge variant="info">{PARTNER_CATEGORY_LABELS[partner.category]}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{partner.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onSave}>
            <Bookmark size={16} className="mr-1" />
            Сохранить
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 size={16} className="mr-1" />
            Поделиться
          </Button>
        </div>
      </div>

      {/* Метаданные */}
      <div className="flex flex-wrap items-center gap-4 text-slate-600">
        {partner.stats.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star size={18} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{partner.stats.rating.toFixed(1)}</span>
            <span>({partner.stats.reviewsCount} отзывов)</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <DollarSign size={18} />
          <span className="font-medium">{partner.attributes.averageCheck}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span>
            {partner.address.district && `${partner.address.district}, `}
            {partner.address.city}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={18} />
          <span className={isOpen ? 'text-green-600 font-medium' : 'text-slate-600'}>
            {isOpen ? 'Открыто сейчас' : 'Закрыто'}
          </span>
        </div>
      </div>

      {/* Статистика */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-600 pt-2 border-t border-slate-200">
        <span>{partner.stats.views} просмотров</span>
        <span>{partner.stats.saves} сохранений</span>
        {partner.stats.vouchersReceived > 0 && (
          <span className="text-blue-600 font-medium">
            {partner.stats.vouchersReceived} ваучеров получено
          </span>
        )}
      </div>
    </div>
  );
}

function checkIfOpen(hours: Partner['hours']): boolean {
  const now = new Date();
  const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][
    now.getDay()
  ];
  const todayHours = hours[dayName];
  if (!todayHours || todayHours.closed) return false;

  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
  return currentTime >= todayHours.open && currentTime <= todayHours.close;
}

