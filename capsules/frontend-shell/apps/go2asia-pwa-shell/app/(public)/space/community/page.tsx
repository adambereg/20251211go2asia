import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Space Asia — комьюнити | Go2Asia',
  description: 'Ваша персональная лента, друзья и активность по модулям Go2Asia',
};

export default function CommunityPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Space Asia — комьюнити
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится ваша персональная лента,
        друзья и активность по модулям Go2Asia.
      </p>
    </main>
  );
}
