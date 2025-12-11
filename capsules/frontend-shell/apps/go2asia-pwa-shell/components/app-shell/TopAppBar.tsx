'use client';

import { useRouter } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useAuthMode } from '../../contexts/AuthModeContext';
import { useAppShell } from './AppShellProvider';
import { TopAppBar as UITopAppBar } from '@go2asia/ui';

// В Next.js NEXT_PUBLIC_* переменные доступны и на сервере, и на клиенте
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Компонент-обертка для условного использования Clerk
function ClerkUserWrapper({ children }: { children: (user: ReturnType<typeof useUser>) => React.ReactNode }) {
  if (!isClerkConfigured) {
    return <>{children({ isLoaded: true, isSignedIn: false, user: null })}</>;
  }
  // Если Clerk настроен, используем отдельный компонент, который всегда вызывает хук
  return <ClerkUserWrapperInner>{children}</ClerkUserWrapperInner>;
}

function ClerkUserWrapperInner({ children }: { children: (user: ReturnType<typeof useUser>) => React.ReactNode }) {
  const user = useUser();
  return <>{children(user)}</>;
}

export function TopAppBar() {
  const router = useRouter();
  const { isAuthenticated: devModeAuthenticated } = useAuthMode();
  const { openSideDrawer } = useAppShell();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Mock данные пользователя для development режима
  const mockUser = {
    initials: 'ИП',
    name: 'Иван Петров',
    email: 'ivan@example.com',
  };

  return (
    <ClerkUserWrapper>
      {({ isLoaded, isSignedIn, user }) => {
        // Если Clerk не настроен или в development - используем переключатель
        const isAuthenticated = isClerkConfigured && process.env.NODE_ENV === 'production'
          ? isSignedIn
          : devModeAuthenticated;

        if (isClerkConfigured && process.env.NODE_ENV === 'production' && !isLoaded) {
          return null;
        }

        const userData = isClerkConfigured && process.env.NODE_ENV === 'production' && isSignedIn && user
          ? {
              initials: getInitials(user.fullName || user.firstName),
              name: user.fullName || user.firstName || 'Пользователь',
              email: user.primaryEmailAddress?.emailAddress || '',
            }
          : isAuthenticated
            ? mockUser
            : undefined;

        const topAppBar = (
          <UITopAppBar
            onMenuClick={openSideDrawer}
            onHomeClick={() => router.push('/')}
            onSearchClick={() => {
              // TODO: открыть поиск
            }}
            onAuthClick={() => {
              // Clerk обработает через SignInButton wrapper
            }}
            onProfileClick={() => {
              router.push('/profile');
            }}
            user={userData}
          />
        );

        // В production с настроенным Clerk оборачиваем в SignInButton
        if (isClerkConfigured && process.env.NODE_ENV === 'production') {
          return <SignInButton mode="modal">{topAppBar}</SignInButton>;
        }

        return topAppBar;
      }}
    </ClerkUserWrapper>
  );
}
