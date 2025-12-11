import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Вознаграждения | PRO Dashboard | Russian Friendly',
  description: 'История вознаграждений PRO-куратора',
};

export default function PRORewardsPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Вознаграждения PRO
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится история вознаграждений
        PRO-куратора в Russian Friendly.
      </p>
    </main>
  );
}
