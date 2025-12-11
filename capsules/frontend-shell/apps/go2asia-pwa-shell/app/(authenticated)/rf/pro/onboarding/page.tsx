import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Онбординг бизнесов | PRO Dashboard | Russian Friendly',
  description: 'Приглашение и обработка заявок новых бизнесов',
};

export default function PROOnboardingPage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-4">
        Онбординг бизнесов PRO
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Раздел в разработке. Скоро здесь появится приглашение и обработка
        заявок новых бизнесов для PRO-кураторов Russian Friendly.
      </p>
    </main>
  );
}
