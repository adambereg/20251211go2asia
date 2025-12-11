import type { Metadata } from 'next';
import { TopicHubView } from '@/modules/atlas';

export const metadata: Metadata = {
  title: 'Тематический хаб Atlas Asia | Go2Asia',
  description:
    'Тематические хабы Atlas Asia: визы, налоги, образование, медицина и другие ключевые темы переезда.',
};

export default async function TopicHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Позже slug будет мапиться на конкретный хаб (Визы, Налоги и т.п.) через SDK.
  const title = 'Тематический хаб в разработке';

  return (
    <TopicHubView
      title={title}
      description="Здесь будут собраны статьи, гайды, подборки и практикумы по выбранной теме."
      sections={[
        {
          id: 'editorial',
          title: 'Редакционные материалы',
          description:
            'Краткие и актуальные обзоры от редакции и PRO-спейсеров.',
        },
        {
          id: 'guides',
          title: 'Гайды и подборки',
          description:
            'Маршруты, подборки районов, списки сервисов и практические советы.',
        },
      ]}
    />
  );
}


