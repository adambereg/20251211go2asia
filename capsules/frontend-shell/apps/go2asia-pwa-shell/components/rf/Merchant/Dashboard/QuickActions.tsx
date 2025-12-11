'use client';

import { Card, CardContent, Button } from '@go2asia/ui';
import { Plus, Ticket, MessageSquare, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      label: 'Создать ваучер',
      href: '/rf/merchant/vouchers?action=create',
      icon: Plus,
      variant: 'primary' as const,
    },
    {
      label: 'Управление ваучерами',
      href: '/rf/merchant/vouchers',
      icon: Ticket,
      variant: 'secondary' as const,
    },
    {
      label: 'Ответить на отзывы',
      href: '/rf/merchant/reviews',
      icon: MessageSquare,
      variant: 'secondary' as const,
    },
    {
      label: 'Посмотреть статистику',
      href: '/rf/merchant/stats',
      icon: BarChart3,
      variant: 'secondary' as const,
    },
  ];

  return (
    <Card className="border-blue-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Button variant={action.variant} size="md" className="w-full justify-start">
                  <Icon size={18} className="mr-2" />
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

