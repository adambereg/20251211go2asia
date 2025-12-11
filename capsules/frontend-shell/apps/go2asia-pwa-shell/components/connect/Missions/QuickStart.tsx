'use client';

import { Card, Button } from '@go2asia/ui';
import { Target, ArrowRight } from 'lucide-react';
import { ModuleIcon } from '../Shared';
import type { ModuleType } from '../types';

interface QuickAction {
  label: string;
  module: ModuleType;
  deeplink: string;
}

const quickActions: QuickAction[] = [
  { label: 'Запустить квест', module: 'quest', deeplink: '/quest' },
  { label: 'Открыть группу в Space', module: 'space', deeplink: '/space' },
  { label: 'Добавить отзыв в RF', module: 'rf', deeplink: '/rf/merchant/reviews' },
  { label: 'Создать гайд в Atlas', module: 'atlas', deeplink: '/atlas/create' },
];

export function QuickStart() {
  const handleAction = (deeplink: string) => {
    window.location.href = deeplink;
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-slate-900">Быстрый старт</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.label}
            variant="secondary"
            size="sm"
            onClick={() => handleAction(action.deeplink)}
            className="justify-start"
          >
            <ModuleIcon module={action.module} size={16} className="mr-2" />
            {action.label}
            <ArrowRight size={14} className="ml-auto" />
          </Button>
        ))}
      </div>
    </Card>
  );
}

