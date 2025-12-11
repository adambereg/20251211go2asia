'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Ticket, Bookmark, MapPin, Share2 } from 'lucide-react';
import { Button } from '@go2asia/ui';
import type { Partner } from '../types';

interface CTAPanelProps {
  partner: Partner;
  onGetVoucher?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

export function CTAPanel({ partner, onGetVoucher, onSave, onShare }: CTAPanelProps) {
  const hasVouchers = partner.stats.vouchersReceived > 0;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Основная CTA */}
          {hasVouchers && (
            <Button variant="primary" size="lg" className="w-full" onClick={onGetVoucher}>
              <Ticket size={20} className="mr-2" />
              Получить ваучер
            </Button>
          )}

          {/* Дополнительные действия */}
          <div className="space-y-2">
            <Button variant="secondary" size="md" className="w-full" onClick={onSave}>
              <Bookmark size={18} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="secondary" size="md" className="w-full" onClick={onShare}>
              <Share2 size={18} className="mr-2" />
              Поделиться
            </Button>
            <Button variant="secondary" size="md" className="w-full">
              <MapPin size={18} className="mr-2" />
              Открыть в Guru
            </Button>
          </div>

          {/* Статистика */}
          <div className="pt-4 border-t border-slate-200 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Просмотров:</span>
              <span className="font-medium">{partner.stats.views}</span>
            </div>
            <div className="flex justify-between">
              <span>Сохранений:</span>
              <span className="font-medium">{partner.stats.saves}</span>
            </div>
            {hasVouchers && (
              <div className="flex justify-between">
                <span>Ваучеров получено:</span>
                <span className="font-medium text-blue-600">{partner.stats.vouchersReceived}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

