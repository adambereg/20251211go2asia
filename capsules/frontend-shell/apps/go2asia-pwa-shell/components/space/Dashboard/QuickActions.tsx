'use client';

import Link from 'next/link';
import { Card, Badge } from '@go2asia/ui';
import {
  Edit,
  BookOpen,
  UserPlus,
  Trophy,
  Ticket,
  type LucideIcon,
} from 'lucide-react';
import type { QuickAction } from '../types';

interface QuickActionsProps {
  actions: QuickAction[];
}

const iconMap: Record<string, LucideIcon> = {
  Edit,
  BookOpen,
  UserPlus,
  Trophy,
  Ticket,
};

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
};

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="border-2 border-slate-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Быстрые действия
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((action) => {
          const Icon = iconMap[action.icon] || Edit;
          const colorClass = colorClasses[action.color || 'blue'];

          return (
            <Link
              key={action.id}
              href={action.href}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${colorClass}`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {action.badge && (
                  <Badge
                    variant="new"
                    size="sm"
                    className="absolute -top-2 -right-2"
                  >
                    {action.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

