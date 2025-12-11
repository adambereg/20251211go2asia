'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, Award, Users, Target, BarChart } from 'lucide-react';
import { Button } from '@go2asia/ui';

export function ConnectNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/connect', label: 'Dashboard', icon: Home },
    { href: '/connect/wallet', label: 'Кошелёк', icon: Wallet },
    { href: '/connect/levels', label: 'Уровни', icon: Award },
    { href: '/connect/referrals', label: 'Рефералы', icon: Users },
    { href: '/connect/missions', label: 'Миссии', icon: Target },
    { href: '/connect/analytics', label: 'Аналитика', icon: BarChart },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? 'primary' : 'secondary'}
              size="sm"
              className="flex items-center gap-2"
            >
              <Icon size={16} />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

