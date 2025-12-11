'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/atlas/countries', label: 'Страны' },
  { href: '/atlas/cities', label: 'Города' },
  { href: '/atlas/places', label: 'Места' },
  { href: '/atlas/guides', label: 'Гайды' },
  { href: '/atlas/themes', label: 'Темы' },
] as const;

export function AtlasMainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm mb-6">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'border-sky-500 bg-sky-50 text-sky-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500 hover:text-sky-600'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default AtlasMainNav;


