'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Ticket, Percent, Gift, ArrowRight } from 'lucide-react';
import { Button, Badge } from '@go2asia/ui';
import Link from 'next/link';
import type { Partner, Voucher } from '../types';
import { mockVouchers } from '../mockData';

interface VouchersBlockProps {
  partner: Partner;
}

export function VouchersBlock({ partner }: VouchersBlockProps) {
  const partnerVouchers = mockVouchers.filter((v) => v.partnerId === partner.id && v.stats.remaining > 0);

  if (partnerVouchers.length === 0) {
    return null;
  }

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Ticket size={24} />
            Активные ваучеры
          </h2>
          <Link href={`/rf/${partner.id}/vouchers`}>
            <Button variant="secondary" size="sm">
              Все ваучеры
              <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {partnerVouchers.map((voucher) => {
            const Icon = getVoucherIcon(voucher.type);
            return (
              <div
                key={voucher.id}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={20} className="text-blue-600" />
                      <h3 className="font-semibold text-slate-900">{voucher.title}</h3>
                      <Badge variant="new">{formatVoucherValue(voucher)}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{voucher.description}</p>
                    <p className="text-xs text-slate-500">{voucher.conditions}</p>
                    <div className="mt-2 text-xs text-slate-500">
                      Осталось: {voucher.stats.remaining} из {voucher.limits.total}
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    Получить
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

