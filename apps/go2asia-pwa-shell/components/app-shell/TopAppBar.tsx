'use client';

import { useRouter } from 'next/navigation';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { Menu, Search, Home } from 'lucide-react';
import { useAppShell } from './AppShellProvider';

export function TopAppBar() {
  const router = useRouter();
  const { openSideDrawer } = useAppShell();
  const { isLoaded, isSignedIn, user } = useUser();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="h-16" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Левая часть: меню и логотип */}
          <div className="flex items-center gap-4">
            <button
              onClick={openSideDrawer}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2"
              aria-label="Главная страница"
            >
              <span className="text-xl font-bold text-sky-600">Go2Asia</span>
            </button>
          </div>

          {/* Правая часть: поиск и профиль */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // TODO: открыть поиск
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Поиск"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </button>

            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium">
                  Войти
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}













