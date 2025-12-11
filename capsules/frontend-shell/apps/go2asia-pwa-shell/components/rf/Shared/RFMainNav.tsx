'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Ticket, Handshake } from 'lucide-react';
import { Button } from '@go2asia/ui';

export function RFMainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/rf', label: 'Каталог партнёров', icon: Handshake },
    { href: '/rf/vouchers', label: 'Ваучеры', icon: Ticket },
    { href: '/rf/merchant', label: 'Кабинет партнёра', icon: Store },
    { href: '/rf/pro', label: 'PRO Dashboard', icon: Store },
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

