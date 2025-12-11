import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Профиль - Go2Asia',
  description: 'Личный профиль пользователя',
  openGraph: {
    title: 'Профиль - Go2Asia',
    description: 'Личный профиль пользователя',
    type: 'website',
  },
};

export default function ProfilePage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Профиль
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится информация о вашем профиле,
        NFT коллекция и история активности в экосистеме Go2Asia.
      </p>
    </main>
  );
}



















