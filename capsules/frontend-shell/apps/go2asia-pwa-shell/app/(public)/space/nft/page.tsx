import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'NFT Badges | Space Asia | Go2Asia',
  description: 'Ваши NFT значки и достижения в экосистеме Go2Asia',
};

export default function NFTPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        NFT Badges
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится ваша коллекция NFT значков
        и достижений, заработанных в экосистеме Go2Asia.
      </p>
    </main>
  );
}
