import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'О проекте - Go2Asia',
  description: 'Информация о проекте Go2Asia, команде и контактах',
  openGraph: {
    title: 'О проекте - Go2Asia',
    description: 'Информация о проекте Go2Asia, команде и контактах',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Info}
        title="О проекте"
        description="Информация о проекте Go2Asia, команде и контактах"
        gradientFrom="from-slate-500"
        gradientTo="to-slate-600"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-4">
              О Go2Asia
            </h2>
            <p className="text-body text-slate-600">
              Страница "О проекте" находится в разработке. Здесь будет информация о проекте, команде и контактах.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}




















