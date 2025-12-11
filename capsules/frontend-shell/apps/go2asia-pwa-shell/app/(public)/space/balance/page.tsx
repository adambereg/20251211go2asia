import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Баланс | Space Asia | Go2Asia',
  description: 'Ваш баланс Points и G2A токенов в экосистеме Go2Asia',
};

export default function BalancePage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Баланс
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится информация о вашем балансе
        Points и G2A токенов, а также история транзакций.
      </p>
    </main>
  );
}
