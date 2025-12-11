'use client';

import { ModuleHero } from '@/components/modules';
import { Handshake } from 'lucide-react';

interface RFHeroProps {
  subtitle?: string;
}

export function RFHero({ subtitle }: RFHeroProps) {
  return (
    <ModuleHero
      icon={Handshake}
      title="Russian Friendly"
      description={subtitle || 'Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии'}
      gradientFrom="from-blue-500"
      gradientTo="to-blue-600"
    />
  );
}


