import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Мои посты | Space Asia | Go2Asia',
  description: 'Ваши посты и публикации в Space Asia',
};

export default function MyPostsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Мои посты
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится ваша лента постов и публикаций
        в Space Asia.
      </p>
    </main>
  );
}
