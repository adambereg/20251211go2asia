'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  Trophy,
  Ticket,
  Wallet,
  Award,
  UserPlus,
  Settings,
} from 'lucide-react';
import { cn } from '@go2asia/ui';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: '/space', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/space/community', label: 'Сообщество', icon: Users },
  { href: '/space/posts', label: 'Мои публикации', icon: FileText },
  { href: '/space/quests', label: 'Квесты', icon: Trophy },
  { href: '/space/vouchers', label: 'Ваучеры', icon: Ticket },
  { href: '/space/balance', label: 'Баланс', icon: Wallet },
  { href: '/space/nft', label: 'NFT', icon: Award },
  { href: '/space/referrals', label: 'Рефералы', icon: UserPlus },
  { href: '/space/settings', label: 'Настройки', icon: Settings },
];

interface SpaceNavProps {
  className?: string;
  variant?: 'vertical' | 'horizontal';
}

export function SpaceNav({ className, variant = 'vertical' }: SpaceNavProps) {
  const pathname = usePathname();

  if (variant === 'horizontal') {
    return (
      <nav className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/space'
              ? pathname === '/space'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 rounded-lg px-3 py-2 min-w-[80px] transition-colors whitespace-nowrap',
                isActive
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn('space-y-1', className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/space'
            ? pathname === '/space'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
              'text-sm font-medium',
              isActive
                ? 'bg-sky-50 text-sky-700'
                : 'text-slate-700 hover:bg-slate-50'
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

