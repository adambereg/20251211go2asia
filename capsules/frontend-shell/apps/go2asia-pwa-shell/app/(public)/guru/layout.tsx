import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guru Asia — Рядом с тобой | Go2Asia',
  description:
    'Интерактивный гид по местам, событиям, жилью и людям рядом с вами. Найдите всё интересное в радиусе 10-15 минут пешком.',
  keywords: [
    'guru asia',
    'рядом со мной',
    'места поблизости',
    'события рядом',
    'карта',
    'новосибирск',
    'go2asia',
  ],
};

export default function GuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

