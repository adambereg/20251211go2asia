import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent } from '@go2asia/ui';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Настройки - Go2Asia',
  description: 'Настройки аккаунта и приложения',
  openGraph: {
    title: 'Настройки - Go2Asia',
    description: 'Настройки аккаунта и приложения',
    type: 'website',
  },
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={SettingsIcon}
        title="Настройки"
        description="Настройки аккаунта, уведомлений и приватности"
        gradientFrom="from-slate-500"
        gradientTo="to-slate-600"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-h2 md:text-3xl font-bold text-slate-900 mb-4">
              Настройки аккаунта
            </h2>
            <p className="text-body text-slate-600">
              Страница настроек находится в разработке. Здесь будут настройки аккаунта, уведомлений, приватности и безопасности.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}




















