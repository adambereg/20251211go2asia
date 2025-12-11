'use client';

import { Card, CardContent } from '@go2asia/ui';
import { MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@go2asia/ui';
import Link from 'next/link';
import type { Partner } from '../types';

interface AddressBlockProps {
  partner: Partner;
}

export function AddressBlock({ partner }: AddressBlockProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={24} />
          Адрес
        </h2>
        <div className="space-y-4">
          {/* Полный адрес */}
          <div>
            <p className="text-slate-700 font-medium">{partner.address.fullAddress}</p>
            <p className="text-slate-600 text-sm mt-1">
              {partner.address.district && `${partner.address.district}, `}
              {partner.address.city}, {partner.address.country}
            </p>
          </div>

          {/* Ссылки */}
          <div className="flex flex-wrap gap-2">
            <Link href={`/atlas/cities/${partner.address.city.toLowerCase()}`}>
              <Button variant="secondary" size="sm">
                <MapPin size={16} className="mr-1" />
                В Atlas
              </Button>
            </Link>
            {partner.address.coordinates && (
              <Link
                href={`https://www.google.com/maps?q=${partner.address.coordinates.lat},${partner.address.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm">
                  <ExternalLink size={16} className="mr-1" />
                  Google Maps
                </Button>
              </Link>
            )}
            <Link href={`/guru?lat=${partner.address.coordinates?.lat}&lng=${partner.address.coordinates?.lng}`}>
              <Button variant="secondary" size="sm">
                Показать в Guru
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

