import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Квесты | Space Asia | Go2Asia',
  description: 'Ваши квесты и достижения в Space Asia',
};

export default function QuestsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Квесты
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится информация о ваших квестах
        и достижениях в Space Asia.
      </p>
    </main>
  );
}
