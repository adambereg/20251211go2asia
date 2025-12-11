'use client';

import { Card, Button, Badge } from '@go2asia/ui';
import Image from 'next/image';
import { Ticket, Clock, CheckCircle2 } from 'lucide-react';
import type { Voucher } from '../types';
import { mockVouchersExtended } from '../mockData';

export function VouchersView() {
  const vouchers = mockVouchersExtended;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((voucher) => (
          <Card
            key={voucher.id}
            className="border-2 border-slate-200 p-4 md:p-6 hover:border-sky-300 transition-colors"
          >
            {voucher.image && (
              <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden bg-slate-200">
                <Image
                  src={voucher.image}
                  alt={voucher.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{voucher.title}</h3>
                <Badge variant="new" size="sm">
                  {voucher.discount}
                </Badge>
              </div>
              <p className="text-sm text-slate-600">{voucher.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1 text-sky-600">
                  <Ticket className="h-4 w-4" />
                  <span className="font-medium">{voucher.pointsCost} Points</span>
                </div>
                {voucher.expiresAt && (
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>
                      До{' '}
                      {new Date(voucher.expiresAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="primary"
                className="w-full"
                disabled={!voucher.isAvailable}
                icon={Ticket}
                iconPosition="left"
              >
                {voucher.isAvailable ? 'Оформить ваучер' : 'Недоступен'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
