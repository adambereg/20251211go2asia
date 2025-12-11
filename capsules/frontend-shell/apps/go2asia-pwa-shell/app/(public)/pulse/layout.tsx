'use client';

import { Suspense } from 'react';

export default function PulseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Загрузка календаря...</div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

