'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  UserPlus,
  CheckSquare,
  Award,
  ArrowLeft,
} from 'lucide-react';

interface PRONavProps {
  variant?: 'vertical' | 'horizontal';
}

const navItems = [
  { href: '/rf/pro', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rf/pro/partners', label: 'Мои партнёры', icon: Store },
  { href: '/rf/pro/onboarding', label: 'Онбординг', icon: UserPlus },
  { href: '/rf/pro/verifications', label: 'Проверки', icon: CheckSquare },
  { href: '/rf/pro/rewards', label: 'Вознаграждения', icon: Award },
];

export function PRONav({ variant = 'vertical' }: PRONavProps) {
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
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
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
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
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

