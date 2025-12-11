import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Статистика | Кабинет партнёра | Russian Friendly',
  description: 'Статистика просмотров, ваучеров и отзывов',
};

export default function MerchantStatsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Статистика партнёра
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится статистика просмотров,
        ваучеров и отзывов для партнёров Russian Friendly.
      </p>
    </main>
  );
}
