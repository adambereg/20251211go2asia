import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Мои квесты - Quest Asia | Go2Asia',
  description: 'Управляйте своими активными и завершёнными квестами',
};

export default function MyQuestsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Мои квесты
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится управление вашими активными
        и завершёнными квестами в Quest Asia.
      </p>
    </main>
  );
}
