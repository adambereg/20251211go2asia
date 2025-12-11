'use client';

import { PartnerCard } from './PartnerCard';
import type { Partner } from '../types';

interface PartnerGridProps {
  partners: Partner[];
  viewMode?: 'grid' | 'list';
}

export function PartnerGrid({ partners, viewMode = 'grid' }: PartnerGridProps) {
  if (partners.length === 0) {
    return null;
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-4';

  return (
    <div className={gridClasses}>
      {partners.map((partner) => (
        <PartnerCard key={partner.id} partner={partner} viewMode={viewMode} />
      ))}
    </div>
  );
}


