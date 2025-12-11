'use client';

import { Card } from '@go2asia/ui';
import { ModuleIcon } from '../Shared';
import type { SourceContribution, ModuleType } from '../types';
import { MODULE_LABELS } from '../types';

interface SourcesListProps {
  sources: Record<ModuleType, SourceContribution>;
}

export function SourcesList({ sources }: SourcesListProps) {
  const sourcesArray = Object.entries(sources) as [ModuleType, SourceContribution][];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Источники наград</h3>
      <div className="space-y-3">
        {sourcesArray.map(([module, contribution]) => (
          <div key={module} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <ModuleIcon module={module} size={20} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{MODULE_LABELS[module]}</p>
                <p className="text-xs text-slate-500">{contribution.points} Points</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{contribution.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

