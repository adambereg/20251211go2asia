import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Globe } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const themeName = id.charAt(0).toUpperCase() + id.slice(1);
  return {
    title: `${themeName} - Blog Asia | Go2Asia`,
    description: `Тематическая подборка ${themeName} в Blog Asia`,
  };
}

const themes: Record<string, { title: string; description: string }> = {
  'digital-nomads': { title: 'Цифровые кочевники в ЮВА', description: 'Всё о жизни и работе digital nomads' },
  'life-with-kids': { title: 'Жизнь с детьми', description: 'Школы, садики, семейные сценарии' },
  'taxes': { title: 'Налоги', description: 'Налоговые режимы и практика' },
  'fintech': { title: 'Финтех', description: 'Банки, карты, переводы' },
};

export default async function ThemePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const theme = themes[id] || { title: 'Тема', description: '' };

  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title={`${theme.title} - Blog Asia`}
        description={theme.description}
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Hub Page Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Подборки Blog */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Подборки Blog</h2>
          <div className="text-center text-slate-500 py-8">
            Статьи по теме "{theme.title}"
          </div>
        </div>

        {/* Лучшие статьи */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Лучшие статьи</h2>
          <div className="text-center text-slate-500 py-8">
            Топовые материалы по теме
          </div>
        </div>

        {/* Гайды */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Гайды</h2>
          <div className="text-center text-slate-500 py-8">
            <Link href={`/atlas/guides?theme=${id}`} className="text-sky-600 hover:text-sky-700">
              Гайды по теме в Atlas →
            </Link>
          </div>
        </div>

        {/* Подборки мест (из Atlas) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Подборки мест</h2>
          <div className="text-center text-slate-500 py-8">
            <Link href={`/atlas/places?theme=${id}`} className="text-sky-600 hover:text-sky-700">
              Места по теме в Atlas →
            </Link>
          </div>
        </div>

        {/* События (из Pulse) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">События</h2>
          <div className="text-center text-slate-500 py-8">
            <Link href={`/pulse?theme=${id}`} className="text-sky-600 hover:text-sky-700">
              События по теме в Pulse →
            </Link>
          </div>
        </div>

        {/* Вопрос-ответ (из Space) */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Вопрос-ответ</h2>
          <div className="text-center text-slate-500 py-8">
            <Link href={`/space?theme=${id}`} className="text-sky-600 hover:text-sky-700">
              Обсуждения по теме в Space →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">FAQ</h2>
          <div className="text-center text-slate-500 py-8">
            Часто задаваемые вопросы по теме "{theme.title}"
          </div>
        </div>
      </section>
    </div>
  );
}

