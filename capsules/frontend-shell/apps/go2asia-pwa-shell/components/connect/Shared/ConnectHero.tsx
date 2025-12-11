'use client';

import { ModuleHero } from '@/components/modules';
import { Wallet } from 'lucide-react';

interface ConnectHeroProps {
  subtitle?: string;
}

export function ConnectHero({ subtitle }: ConnectHeroProps) {
  return (
    <ModuleHero
      icon={Wallet}
      title="Connect Asia"
      description={subtitle || 'Центр экономики и геймификации Go2Asia'}
      gradientFrom="from-emerald-500"
      gradientTo="to-teal-600"
    />
  );
}

