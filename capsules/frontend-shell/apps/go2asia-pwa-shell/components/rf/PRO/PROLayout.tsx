'use client';

import Link from 'next/link';
import { Button } from '@go2asia/ui';
import { ArrowLeft } from 'lucide-react';
import { PRONav } from './PRONav';
import { RFHero, RFMainNav } from '../Shared';

interface PROLayoutProps {
  children: React.ReactNode;
}

export function PROLayout({ children }: PROLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <RFHero subtitle="Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии" />

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <RFMainNav />
      </div>

      {/* Навигация назад к публичному каталогу */}
      <div className="bg-white border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/rf">
            <Button variant="secondary" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Боковое меню для десктопа */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-purple-900 mb-4">
                  PRO Dashboard
                </h2>
                <PRONav />
              </div>
            </div>
          </aside>

          {/* Горизонтальное меню для мобильных */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-purple-200 bg-white p-3 shadow-sm mb-6">
              <div className="font-semibold text-purple-900 mb-3 text-sm">
                PRO Dashboard
              </div>
              <PRONav variant="horizontal" />
            </div>
          </div>

          {/* Основной контент */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

