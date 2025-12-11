import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ваучеры | Russian Friendly | Go2Asia',
  description: 'Специальные предложения и ваучеры от партнёров Russian Friendly в Юго-Восточной Азии',
  openGraph: {
    title: 'Ваучеры | Russian Friendly',
    description: 'Специальные предложения от партнёров Russian Friendly',
    type: 'website',
  },
};

export default function VouchersPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Ваучеры Russian Friendly
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится каталог специальных предложений
        и ваучеров от партнёров Russian Friendly в Юго-Восточной Азии.
      </p>
    </main>
  );
}
