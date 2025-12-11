import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Globe } from 'lucide-react';
import { AtlasMainNav } from '@/modules/atlas';
import { AtlasSearchBar } from '@/modules/atlas';
import { Card, CardContent } from '@go2asia/ui';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Темы Atlas Asia',
  description:
    'Тематические хабы Atlas Asia: визы, налоги, образование, медицина, связь и другие ключевые вопросы жизни в ЮВА.',
  openGraph: {
    title: 'Темы Atlas Asia',
    description: 'Тематические хабы Atlas Asia: визы, налоги, образование, медицина, связь и другие ключевые вопросы жизни в ЮВА.',
    type: 'website',
  },
};

const themes = [
  {
    id: 'visas',
    title: 'Визы и миграция',
    description: 'Типы виз, правила въезда, риски и обновления регламентов.',
    heroImage: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg',
    tags: ['регламенты', 'обновления', 'переезд', 'туристы'],
  },
  {
    id: 'taxes',
    title: 'Налоги и работа',
    description: 'Фриланс, удалёнка, бизнес-структуры и базовые налоговые режимы.',
    heroImage: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    tags: ['фриланс', 'бизнес', 'налоги'],
  },
  {
    id: 'education',
    title: 'Образование и дети',
    description: 'Школы, садики, курсы и семейные сценарии переезда.',
    heroImage: 'https://images.pexels.com/photos/2491286/pexels-photo-2491286.jpeg',
    tags: ['школы', 'семья', 'переезд'],
  },
  {
    id: 'medicine',
    title: 'Медицина',
    description: 'Медицинское обслуживание, страховка, клиники и врачи в ЮВА.',
    heroImage: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
    tags: ['клиники', 'страховка', 'врачи'],
  },
  {
    id: 'communication',
    title: 'Связь и интернет',
    description: 'Мобильная связь, интернет, VPN и цифровые сервисы.',
    heroImage: 'https://images.pexels.com/photos/774691/pexels-photo-774691.jpeg',
    tags: ['SIM', 'VPN', 'интернет'],
  },
  {
    id: 'banking',
    title: 'Банки и финтех',
    description: 'Банковские счета, карты, переводы и финансовые сервисы.',
    heroImage: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
    tags: ['банки', 'карты', 'переводы'],
  },
];

export default function ThemesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title="Atlas Asia"
        description="«Живой» вики-справочник по странам Юго-Восточной Азии с UGC и редакционной поддержкой"
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />

      {/* Top controls: internal nav + search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <AtlasMainNav />
        <AtlasSearchBar />
      </section>

      {/* Themes Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-6">
          Темы
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme) => (
            <Link key={theme.id} href={`/atlas/themes/${theme.id}`}>
              <Card hover className="h-full overflow-hidden p-0 !border-0">
                {theme.heroImage && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={theme.heroImage}
                      alt={theme.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-h3 md:text-xl font-bold text-slate-900 mb-2">
                    {theme.title}
                  </h3>
                  <p className="text-small text-slate-600">
                    {theme.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


