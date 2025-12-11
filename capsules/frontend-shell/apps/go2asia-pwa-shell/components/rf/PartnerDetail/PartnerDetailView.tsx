'use client';

import { Gallery } from './Gallery';
import { PartnerHeader } from './PartnerHeader';
import { AboutBlock } from './AboutBlock';
import { AddressBlock } from './AddressBlock';
import { VouchersBlock } from './VouchersBlock';
import { RFStandardBlock } from './RFStandardBlock';
import { ReviewsBlock } from './ReviewsBlock';
import { CTAPanel } from './CTAPanel';
import { RFHero, RFMainNav } from '../Shared';
import type { Partner } from '../types';

interface PartnerDetailViewProps {
  partner: Partner;
}

export function PartnerDetailView({ partner }: PartnerDetailViewProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <RFHero subtitle="Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <RFMainNav />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Галерея */}
        <section className="mb-8">
          <Gallery partner={partner} />
        </section>

        {/* Заголовок */}
        <section className="mb-8">
          <PartnerHeader partner={partner} />
        </section>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка */}
          <div className="lg:col-span-2 space-y-8">
            <AboutBlock partner={partner} />
            <AddressBlock partner={partner} />
            <VouchersBlock partner={partner} />
            <RFStandardBlock partner={partner} />
            <ReviewsBlock partner={partner} />
          </div>

          {/* Правая колонка (sticky) */}
          <div className="lg:col-span-1">
            <CTAPanel partner={partner} />
          </div>
        </div>
      </div>
    </div>
  );
}

