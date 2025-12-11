import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export interface PopularPlacesCardProps {
  image: string;
  category: string;
  name: string;
  country: string;
  href: string;
}

export function PopularPlacesCard({
  image,
  category,
  name,
  country,
  href,
}: PopularPlacesCardProps) {
  return (
    <Link href={href}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all">
        <div className="relative h-32 sm:h-40">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-3 sm:p-4">
          <p className="text-xs text-slate-500 mb-1">{category}</p>
          <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">{name}</h3>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-slate-600">
            <MapPin size={14} />
            <span>{country}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

