import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Rielt.Market Asia - Недвижимость в ЮВА | Go2Asia',
  description: 'Поиск недвижимости для аренды и покупки в Юго-Восточной Азии',
  openGraph: {
    title: 'Rielt.Market Asia - Недвижимость в ЮВА',
    description: 'Поиск недвижимости для аренды и покупки в ЮВА',
    type: 'website',
  },
};

export default function RieltPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Rielt.Market Asia
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится поиск недвижимости для аренды
        и покупки в Юго-Восточной Азии.
      </p>
    </main>
  );
}
