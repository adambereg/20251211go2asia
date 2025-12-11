import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Профиль заведения | Кабинет партнёра | Russian Friendly',
  description: 'Редактирование информации о заведении',
};

export default function MerchantProfilePage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Профиль заведения
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится редактирование информации
        о заведении для партнёров Russian Friendly.
      </p>
    </main>
  );
}
