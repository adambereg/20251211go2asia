import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Guru Asia - Интерактивный гид | Go2Asia',
  description: 'Интерактивный гид "рядом с тобой" для поиска мест и объектов в Юго-Восточной Азии',
  openGraph: {
    title: 'Guru Asia - Интерактивный гид',
    description: 'Интерактивный гид "рядом с тобой" для поиска мест и объектов',
    type: 'website',
  },
};

export default function GuruPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Guru Asia
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится интерактивный гид "рядом с тобой"
        для поиска мест и объектов в Юго-Восточной Азии.
      </p>
    </main>
  );
}
