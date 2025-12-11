import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'PRO Dashboard | Russian Friendly | Go2Asia',
  description: 'Панель управления PRO-куратора',
};

export default function PRODashboardPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        PRO Dashboard
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится панель управления PRO-куратора
        Russian Friendly.
      </p>
    </main>
  );
}
