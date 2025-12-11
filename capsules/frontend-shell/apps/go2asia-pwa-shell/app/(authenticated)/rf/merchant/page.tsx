import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Кабинет партнёра | Russian Friendly | Go2Asia',
  description: 'Управление профилем партнёра, ваучерами и статистикой',
};

export default function MerchantDashboardPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Кабинет партнёра
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится управление профилем партнёра,
        ваучерами и статистикой для партнёров Russian Friendly.
      </p>
    </main>
  );
}
