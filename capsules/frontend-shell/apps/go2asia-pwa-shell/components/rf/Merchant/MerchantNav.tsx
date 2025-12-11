'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Ticket,
  MessageSquare,
  BarChart3,
  Settings,
} from 'lucide-react';

interface MerchantNavProps {
  variant?: 'vertical' | 'horizontal';
}

const navItems = [
  { href: '/rf/merchant', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rf/merchant/profile', label: 'Профиль', icon: Store },
  { href: '/rf/merchant/vouchers', label: 'Ваучеры', icon: Ticket },
  { href: '/rf/merchant/reviews', label: 'Отзывы', icon: MessageSquare },
  { href: '/rf/merchant/stats', label: 'Статистика', icon: BarChart3 },
  { href: '/rf/merchant/settings', label: 'Настройки', icon: Settings },
];

export function MerchantNav({ variant = 'vertical' }: MerchantNavProps) {
  const pathname = usePathname();

  if (variant === 'horizontal') {
    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50 border border-transparent'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

