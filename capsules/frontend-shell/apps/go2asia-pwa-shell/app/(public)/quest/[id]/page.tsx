import type { Metadata } from 'next';
import { QuestDetailClient } from './QuestDetailClient';
import { mockQuests } from '@/components/quest/mockQuests';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quest = mockQuests.find((q) => q.id === id);

  if (!quest) {
    return {
      title: 'Квест не найден | Quest Asia',
    };
  }

  return {
    title: `${quest.title} | Quest Asia`,
    description: quest.description,
    openGraph: {
      title: quest.title,
      description: quest.description,
      images: [quest.coverPhoto],
      type: 'website',
    },
  };
}

export default async function QuestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quest = mockQuests.find((q) => q.id === id);

  if (!quest) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Квест не найден</h1>
          <p className="text-slate-600">Квест с ID "{id}" не существует.</p>
        </div>
      </div>
    );
  }

  return <QuestDetailClient quest={quest} />;
}

