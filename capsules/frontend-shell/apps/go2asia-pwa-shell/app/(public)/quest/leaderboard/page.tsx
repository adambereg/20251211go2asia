import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Лидерборд - Quest Asia | Go2Asia',
  description: 'Топ игроков Quest Asia по городам, неделям и сезонам',
};

export default function LeaderboardPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Лидерборд Quest Asia
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится рейтинг игроков Quest Asia
        по городам, неделям и сезонам.
      </p>
    </main>
  );
}
