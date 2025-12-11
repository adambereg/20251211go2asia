import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Russian Friendly - Партнёрская программа | Go2Asia',
  description: 'Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии',
  openGraph: {
    title: 'Russian Friendly - Партнёрская программа',
    description: 'Каталог проверенных Russian Friendly мест и сервисов в ЮВА',
    type: 'website',
  },
};

export default function RFPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Russian Friendly
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится каталог проверенных Russian Friendly
        мест и сервисов в Юго-Восточной Азии.
      </p>
    </main>
  );
}
