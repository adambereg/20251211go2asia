'use client';

/**
 * Quest Asia - Quest Home Client Component
 * Главная страница модуля Quest Asia
 */

import { ModuleHero } from '@/components/modules';
import { Target } from 'lucide-react';
import { QuestCard } from '@/components/quest/QuestCard';
import { mockQuests } from '@/components/quest/mockQuests';

export function QuestHomeClient() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Target}
        title="Quest Asia"
        description="Проходите квесты, выполняйте миссии и получайте награды"
        gradientFrom="from-purple-500"
        gradientTo="to-purple-600"
      />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Доступные квесты
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>
    </div>
  );
}

