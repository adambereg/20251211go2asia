'use client';

import { SpaceNav } from './SpaceNav';

interface SpaceLayoutProps {
  children: React.ReactNode;
}

export function SpaceLayout({ children }: SpaceLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Боковое меню для десктопа */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">
                  Личный кабинет
                </h2>
                <SpaceNav />
              </div>
            </div>
          </aside>

          {/* Горизонтальное меню для мобильных */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm mb-6">
              <div className="font-semibold text-slate-900 mb-3 text-sm">
                Личный кабинет
              </div>
              <div className="overflow-x-auto pb-2 -mx-3 px-3">
                <SpaceNav variant="horizontal" />
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}

