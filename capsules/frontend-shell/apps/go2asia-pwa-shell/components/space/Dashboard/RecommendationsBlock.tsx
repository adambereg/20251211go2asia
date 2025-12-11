'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, Badge } from '@go2asia/ui';
import { Trophy, Ticket, Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Recommendation } from '../types';

interface RecommendationsBlockProps {
  recommendations: Recommendation[];
}

const typeIcons = {
  quest: Trophy,
  voucher: Ticket,
  event: Calendar,
  place: MapPin,
};

const typeLabels = {
  quest: 'Квест',
  voucher: 'Ваучер',
  event: 'Событие',
  place: 'Место',
};

export function RecommendationsBlock({
  recommendations,
}: RecommendationsBlockProps) {
  const recentRecommendations = recommendations.slice(0, 4);

  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Рекомендации</h2>
        <Link
          href="/space/quests"
          className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
        >
          Все
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recentRecommendations.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-slate-500 text-sm">
            Пока нет рекомендаций
          </div>
        ) : (
          recentRecommendations.map((rec) => {
            const Icon = typeIcons[rec.type];
            const label = typeLabels[rec.type];

            return (
              <Link
                key={rec.id}
                href={rec.href}
                className="group relative overflow-hidden rounded-lg border-2 border-slate-200 hover:border-sky-300 transition-all hover:shadow-md"
              >
                {rec.image && (
                  <div className="relative h-32 w-full bg-slate-200">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="info" size="sm">
                        <Icon className="h-3 w-3" />
                        {label}
                      </Badge>
                    </div>
                    {rec.points && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="ugc" size="sm">
                          +{rec.points} Points
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
                    {rec.title}
                  </h3>
                  {rec.description && (
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {rec.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </Card>
  );
}


