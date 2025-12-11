import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export const metadata: Metadata = {
  title: 'Помощь и документация - Go2Asia',
  description: 'FAQ, документация и контакты поддержки',
  openGraph: {
    title: 'Помощь и документация - Go2Asia',
    description: 'FAQ, документация и контакты поддержки',
    type: 'website',
  },
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={HelpCircle}
        title="Помощь"
        description="FAQ, документация и контакты поддержки"
        gradientFrom="from-slate-500"
        gradientTo="to-slate-600"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-body text-slate-600">
              Раздел помощи находится в разработке. Здесь будет FAQ, документация и контакты поддержки.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}


























