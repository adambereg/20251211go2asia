import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Рефералы | Space Asia | Go2Asia',
  description: 'Ваша реферальная программа и статистика',
};

export default function ReferralsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Реферальная программа
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится ваша реферальная программа,
        статистика приглашённых пользователей и награды.
      </p>
    </main>
  );
}
