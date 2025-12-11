'use client';

import { PartnerGrid } from './PartnerGrid';
import type { Partner } from '../types';

interface SectionsBlockProps {
  nearbyPartners?: Partner[];
  newPartners?: Partner[];
  proCollections?: {
    title: string;
    partners: Partner[];
  }[];
}

export function SectionsBlock({
  nearbyPartners = [],
  newPartners = [],
  proCollections = [],
}: SectionsBlockProps) {
  return (
    <div className="space-y-8">
      {/* Рядом с вами */}
      {nearbyPartners.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Рядом с вами</h2>
          <PartnerGrid partners={nearbyPartners} />
        </section>
      )}

      {/* Новые партнёры недели */}
      {newPartners.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Новые партнёры недели</h2>
          <PartnerGrid partners={newPartners} />
        </section>
      )}

      {/* Подборки PRO */}
      {proCollections.length > 0 && (
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Подборки PRO</h2>
          <div className="space-y-6">
            {proCollections.map((collection, idx) => (
              <div key={idx}>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">{collection.title}</h3>
                <PartnerGrid partners={collection.partners} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

