'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Badge, Button } from '@go2asia/ui';
import { Ticket, Percent, Gift, MapPin, Clock, ArrowRight } from 'lucide-react';
import type { Voucher } from '../types';
import { PARTNER_CATEGORY_LABELS } from '../types';

interface VoucherCardProps {
  voucher: Voucher;
}

export function VoucherCard({ voucher }: VoucherCardProps) {
  const getVoucherIcon = (type: Voucher['type']) => {
    switch (type) {
      case 'discount_percent':
      case 'discount_fixed':
        return Percent;
      case 'gift':
        return Gift;
      default:
        return Ticket;
    }
  };

  const formatVoucherValue = (voucher: Voucher) => {
    switch (voucher.type) {
      case 'discount_percent':
        return `-${voucher.value}%`;
      case 'discount_fixed':
        return `-${voucher.value} бат`;
      case 'gift':
        return voucher.title;
      default:
        return '';
    }
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const Icon = getVoucherIcon(voucher.type);
  const isExpiringSoon = new Date(voucher.expiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-xl">
        <Image
          src={voucher.partner.coverImage}
          alt={voucher.partner.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="new" className="text-sm font-semibold">
            <Icon size={14} className="mr-1" />
            {formatVoucherValue(voucher)}
          </Badge>
        </div>
        {isExpiringSoon && (
          <div className="absolute top-3 right-3">
            <Badge variant="info" className="text-xs bg-amber-500">
              <Clock size={12} className="mr-1" />
              Скоро истекает
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 md:p-6">
        <div className="space-y-3">
          {/* Партнёр */}
          <div>
            <Link href={`/rf/${voucher.partner.id}`}>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 hover:text-blue-600 transition-colors">
                {voucher.partner.name}
              </h3>
            </Link>
            <p className="text-sm text-slate-600">
              {PARTNER_CATEGORY_LABELS[voucher.partner.category]}
            </p>
          </div>

          {/* Название ваучера */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">{voucher.title}</h4>
            <p className="text-sm text-slate-600 line-clamp-2">{voucher.description}</p>
          </div>

          {/* Условия */}
          <div className="text-xs text-slate-500 space-y-1">
            <p>{voucher.conditions}</p>
            {voucher.limits.minCheck && (
              <p>Минимальный чек: {voucher.limits.minCheck} бат</p>
            )}
          </div>

          {/* Метаданные */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 pt-2 border-t border-slate-200">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{voucher.partner.address.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>До {formatExpiryDate(voucher.expiresAt)}</span>
            </div>
          </div>

          {/* Статистика */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Осталось: <span className="font-medium text-slate-700">{voucher.stats.remaining}</span> из{' '}
              {voucher.limits.total}
            </div>
            <Link href={`/rf/${voucher.partner.id}`}>
              <Button variant="primary" size="sm">
                Получить
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

