import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Globe } from 'lucide-react';
import { Card, CardContent, Chip, Badge } from '@go2asia/ui';
import { Clock, User } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const categoryName = id.charAt(0).toUpperCase() + id.slice(1);
  return {
    title: `${categoryName} - Blog Asia | Go2Asia`,
    description: `Статьи рубрики ${categoryName} в Blog Asia`,
  };
}

const categories: Record<string, { title: string; description: string }> = {
  travel: { title: 'Путешествия', description: 'Маршруты, советы, впечатления' },
  work: { title: 'Работа в ЮВА', description: 'Фриланс, удалёнка, бизнес' },
  culture: { title: 'Культура / Еда', description: 'Традиции, кухня, праздники' },
  lifestyle: { title: 'Городская жизнь', description: 'Районы, жильё, быт' },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = categories[id] || { title: 'Рубрика', description: '' };

  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title={`${category.title} - Blog Asia`}
        description={category.description}
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Filters */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <Chip selected>Все</Chip>
            <Chip>Гайд</Chip>
            <Chip>Лонгрид</Chip>
            <Chip>Подборка</Chip>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Главные в рубрике</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for articles */}
          <div className="text-center text-slate-500 py-12">
            Статьи рубрики "{category.title}" будут здесь
          </div>
        </div>

        {/* Atlas Integration */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Места этой рубрики</h2>
          <div className="text-center text-slate-500 py-8">
            Интеграция с Atlas: места, связанные с рубрикой "{category.title}"
          </div>
        </div>

        {/* Pulse Integration */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">События по теме</h2>
          <div className="text-center text-slate-500 py-8">
            Интеграция с Pulse: события, связанные с рубрикой "{category.title}"
          </div>
        </div>
      </section>
    </div>
  );
}

