'use client';

import { useRouter } from 'next/navigation';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { X, Home, Map, Calendar, BookOpen, Users, Gift, Settings, Shield } from 'lucide-react';
import { useAppShell } from './AppShellProvider';
import { useRole } from '@/lib/hooks/useRole';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  requiresRole?: string[];
}

const menuItems: MenuItem[] = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/atlas', label: 'Atlas Asia', icon: Map },
  { href: '/pulse', label: 'Pulse Asia', icon: Calendar },
  { href: '/blog', label: 'Blog Asia', icon: BookOpen },
  { href: '/guru', label: 'Guru Nearby', icon: Map },
  { href: '/quest', label: 'Quest Asia', icon: Gift },
  { href: '/rf', label: 'Russian Friendly', icon: Users },
  { href: '/rielt', label: 'Rielt Asia', icon: Home },
  { href: '/space', label: 'Space', icon: Users, requiresAuth: true },
  { href: '/connect', label: 'Connect', icon: Gift, requiresAuth: true },
  { href: '/settings', label: 'Настройки', icon: Settings, requiresAuth: true },
  { href: '/admin', label: 'Админ-панель', icon: Shield, requiresAuth: true, requiresRole: ['admin'] },
];

export function SideDrawer() {
  const router = useRouter();
  const { isOpen, closeSideDrawer } = useAppShell();
  const { isSignedIn } = useUser();
  const role = useRole();

  if (!isOpen) {
    return null;
  }

  const filteredItems = menuItems.filter((item) => {
    if (item.requiresAuth && !isSignedIn) {
      return false;
    }
    if (item.requiresRole && !item.requiresRole.includes(role)) {
      return false;
    }
    return true;
  });

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={closeSideDrawer}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Меню</h2>
            <button
              onClick={closeSideDrawer}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Закрыть меню"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* User section */}
          <div className="p-4 border-b border-gray-200">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-12 h-12',
                    },
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Профиль</p>
                  <p className="text-xs text-gray-500">Роль: {role}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium">
                  Войти
                </button>
              </SignInButton>
            )}
          </div>

          {/* Menu items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {filteredItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => {
                        router.push(item.href);
                        closeSideDrawer();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}













