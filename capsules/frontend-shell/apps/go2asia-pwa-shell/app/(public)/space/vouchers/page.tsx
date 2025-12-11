import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Ваучеры | Space Asia | Go2Asia',
  description: 'Ваши ваучеры и специальные предложения',
};

export default function VouchersPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Ваучеры
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится информация о ваших ваучерах
        и специальных предложениях в Space Asia.
      </p>
    </main>
  );
}
