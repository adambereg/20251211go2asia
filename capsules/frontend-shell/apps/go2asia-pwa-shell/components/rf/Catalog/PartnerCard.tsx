'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, Badge } from '@go2asia/ui';
import { MapPin, Star, Wifi, Zap, Baby, DollarSign } from 'lucide-react';
import { RFBadge, VerifiedBadge, VoucherRibbon } from '../Shared';
import type { Partner } from '../types';
import { PARTNER_CATEGORY_LABELS } from '../types';

interface PartnerCardProps {
  partner: Partner;
  viewMode?: 'grid' | 'list';
}

export function PartnerCard({ partner }: PartnerCardProps) {

  return (
    <Link href={`/rf/${partner.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative aspect-[3/2] overflow-hidden rounded-t-xl">
          <Image
            src={partner.coverImage}
            alt={partner.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <RFBadge />
            {partner.rfStatus.verified && <VerifiedBadge />}
          </div>
          {partner.stats.vouchersReceived > 0 && (
            <div className="absolute top-3 right-3">
              <VoucherRibbon />
            </div>
          )}
        </div>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {/* Название и категория */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 line-clamp-2">
                {partner.name}
              </h3>
              <p className="text-sm text-slate-600">{PARTNER_CATEGORY_LABELS[partner.category]}</p>
            </div>

            {/* Описание */}
            <p className="text-sm text-slate-700 line-clamp-2">{partner.description}</p>

            {/* Метаданные */}
            <div className="flex items-center gap-4 text-sm text-slate-600">
              {partner.stats.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium">{partner.stats.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({partner.stats.reviewsCount})</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <DollarSign size={16} />
                <span>{partner.attributes.averageCheck}</span>
              </div>
              {partner.address.city && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{partner.address.city}</span>
                </div>
              )}
            </div>

            {/* Атрибуты */}
            <div className="flex flex-wrap gap-2 pt-2">
              {partner.attributes.wifi && (
                <Badge variant="info" className="text-xs">
                  <Wifi size={12} className="mr-1" />
                  Wi-Fi
                </Badge>
              )}
              {partner.attributes.outlets && (
                <Badge variant="info" className="text-xs">
                  <Zap size={12} className="mr-1" />
                  Розетки
                </Badge>
              )}
              {partner.attributes.kidFriendly && (
                <Badge variant="info" className="text-xs">
                  <Baby size={12} className="mr-1" />
                  Для детей
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

