'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Map, Calendar, BookOpen, Users } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/atlas', label: 'Atlas', icon: Map },
  { href: '/pulse', label: 'Pulse', icon: Calendar },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/space', label: 'Space', icon: Users, requiresAuth: true },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Скрываем навигацию на страницах аутентификации
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          // Пропускаем элементы, требующие аутентификации, если пользователь не авторизован
          if (item.requiresAuth && !isSignedIn) {
            return null;
          }

          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-sky-600' : 'text-gray-600'
              }`}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-gray-600'}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}













