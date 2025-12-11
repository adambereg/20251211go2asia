import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Настройки | Space Asia | Go2Asia',
  description: 'Настройки вашего аккаунта в Space Asia',
};

export default function SettingsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Настройки
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится управление настройками
        вашего аккаунта в Space Asia.
      </p>
    </main>
  );
}
