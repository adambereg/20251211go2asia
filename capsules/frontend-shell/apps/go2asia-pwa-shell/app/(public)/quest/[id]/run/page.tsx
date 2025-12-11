import { notFound } from 'next/navigation';
import { mockQuests } from '@/components/quest/mockQuests';
import { QuestRunnerClient } from './QuestRunnerClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quest = mockQuests.find((q) => q.id === id);

  if (!quest) {
    return {};
  }

  return {
    title: `Прохождение: ${quest.title} - Quest Asia | Go2Asia`,
    description: `Проходите квест "${quest.title}"`,
  };
}

export default async function QuestRunnerPage({ params }: PageProps) {
  const { id } = await params;
  const quest = mockQuests.find((q) => q.id === id);

  if (!quest) {
    notFound();
  }

  return <QuestRunnerClient quest={quest} />;
}

