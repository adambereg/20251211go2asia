import type { Metadata } from 'next';
import { ModuleHero } from '@/components/modules';
import { Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rielt.Market - Поиск жилья | Go2Asia',
  description: 'Поиск краткосрочной и долгосрочной аренды жилья в Юго-Восточной Азии',
  openGraph: {
    title: 'Rielt.Market - Поиск жилья',
    description: 'Поиск краткосрочной и долгосрочной аренды жилья в Юго-Восточной Азии',
    type: 'website',
  },
};

export default function RieltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Building}
        title="Rielt.Market"
        description="Поиск краткосрочной и долгосрочной аренды жилья в Юго-Восточной Азии"
        gradientFrom="from-emerald-500"
        gradientTo="to-emerald-600"
      />
      {children}
    </div>
  );
}

