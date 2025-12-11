import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthModeProvider } from '../contexts/AuthModeContext';
import { TopAppBar } from '../components/app-shell/TopAppBar';
import { BottomNav } from '../components/app-shell/BottomNav';
import { SideDrawer } from '../components/app-shell/SideDrawer';
import { AuthModeToggle } from '../components/dev/AuthModeToggle';
import { AppShellProvider } from '../components/app-shell/AppShellProvider';
import { ClerkAuthSetup } from '../components/auth/ClerkAuthSetup';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Go2Asia - Экосистема путешествий в Юго-Восточной Азии',
    template: '%s | Go2Asia',
  },
  description: 'Цифровая экосистема для жизни, путешествий и бизнеса в Юго-Восточной Азии',
  keywords: ['путешествия', 'Юго-Восточная Азия', 'Таиланд', 'Вьетнам', 'Индонезия'],
  authors: [{ name: 'Go2Asia Team' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://go2asia.space',
    siteName: 'Go2Asia',
    title: 'Go2Asia - Экосистема путешествий в Юго-Восточной Азии',
    description: 'Цифровая экосистема для жизни, путешествий и бизнеса в Юго-Восточной Азии',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go2Asia - Экосистема путешествий',
    description: 'Цифровая экосистема для жизни, путешествий и бизнеса в Юго-Восточной Азии',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.webmanifest',
  themeColor: '#1677FF',
};

// Проверяем, настроен ли Clerk (есть ли publishableKey)
// В Next.js NEXT_PUBLIC_* переменные доступны и на сервере, и на клиенте
const isClerkConfigured = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function AppContent({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthModeProvider>
        <AppShellProvider>
          {isClerkConfigured && <ClerkAuthSetup />}
          <html lang="ru">
            <body>
              <TopAppBar />
              <SideDrawer />
              <main className="min-h-screen pb-20 pt-16">
                {children}
              </main>
              <BottomNav />
              <AuthModeToggle />
            </body>
          </html>
        </AppShellProvider>
      </AuthModeProvider>
    </Providers>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Если Clerk настроен, используем его, иначе только AuthModeProvider
  if (isClerkConfigured) {
    return (
      <ClerkProvider>
        <AppContent>{children}</AppContent>
      </ClerkProvider>
    );
  }

  // В development режиме без Clerk используем только AuthModeProvider
  return <AppContent>{children}</AppContent>;
}
