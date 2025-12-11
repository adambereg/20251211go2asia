'use client';

import { Card, CardContent } from '@go2asia/ui';
import { Badge } from '@go2asia/ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VerifiedBadge } from '../../Shared';
import { mockPartners } from '../../mockData';
import { PARTNER_CATEGORY_LABELS } from '../../types';

export function ActivePartners() {
  // В реальном приложении здесь будет загрузка партнёров текущего PRO-куратора
  const activePartners = mockPartners.slice(0, 3);

  return (
    <Card className="border-purple-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Активные партнёры</h3>
          <Link href="/rf/pro/partners">
            <span className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 cursor-pointer">
              Все партнёры
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
        <div className="space-y-3">
          {activePartners.map((partner) => (
            <Link
              key={partner.id}
              href={`/rf/${partner.id}`}
              className="block p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{partner.name}</h4>
                    {partner.rfStatus.verified && <VerifiedBadge />}
                  </div>
                  <p className="text-sm text-slate-600">
                    {PARTNER_CATEGORY_LABELS[partner.category]} • {partner.address.city}
                  </p>
                </div>
                <Badge variant="info">{partner.stats.rating.toFixed(1)} ⭐</Badge>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

