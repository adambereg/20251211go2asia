import type { Metadata } from 'next';
import { ChecklistView } from '@/modules/atlas';

export const metadata: Metadata = {
  title: 'Чеклист Atlas Asia | Go2Asia',
  description:
    'Практические чеклисты Atlas Asia по переезду, подготовке к поездке и жизни в Юго-Восточной Азии.',
};

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Пока только каркас; шаги чеклиста будут приходить из контент-сервиса Atlas.
  return (
    <ChecklistView
      title="Чеклист в разработке"
      description="Шаги и галочки появятся после подключения практикумов и контент-квестов."
      items={[]}
    />
  );
}


