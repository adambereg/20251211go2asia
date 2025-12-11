'use client';

import { Card, Button } from '@go2asia/ui';
import { ArrowRight } from 'lucide-react';
import { ModuleIcon } from '../Shared';
import type { NextAction } from '../types';

interface NextActionsProps {
  actions: NextAction[];
}

export function NextActions({ actions }: NextActionsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Рекомендуемые действия</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Card key={action.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 rounded-lg">
                <ModuleIcon module={action.module} size={24} className="text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">{action.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{action.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-emerald-600">
                      +{action.reward.points || 0} Points
                    </span>
                    {action.reward.nft && (
                      <span className="text-xs text-purple-600">+ NFT</span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      // Deeplink будет реализован позже
                      window.location.href = action.deeplink;
                    }}
                  >
                    Начать
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

