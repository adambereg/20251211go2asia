import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quest Asia - Квесты и миссии | Go2Asia',
  description: 'Проходите квесты, выполняйте миссии и получайте награды',
  openGraph: {
    title: 'Quest Asia - Квесты и миссии',
    description: 'Проходите квесты, выполняйте миссии и получайте награды',
    type: 'website',
  },
};

export default function QuestPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Quest Asia
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится каталог квестов и миссий,
        которые вы сможете проходить для получения наград и достижений.
      </p>
    </main>
  );
}
