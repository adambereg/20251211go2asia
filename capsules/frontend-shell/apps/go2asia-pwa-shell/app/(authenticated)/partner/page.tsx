import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Панель партнёра - Go2Asia',
  description: 'Панель управления для партнёров Go2Asia',
  openGraph: {
    title: 'Панель партнёра - Go2Asia',
    description: 'Панель управления для партнёров Go2Asia',
    type: 'website',
  },
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Briefcase}
        title="Панель партнёра"
        description="Управление контентом и статистика для партнёров"
        gradientFrom="from-orange-500"
        gradientTo="to-orange-600"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-4">
              Панель управления
            </h2>
            <p className="text-body text-slate-600">
              Панель партнёра находится в разработке. Здесь будет статистика, управление контентом и настройки для партнёров.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}




















