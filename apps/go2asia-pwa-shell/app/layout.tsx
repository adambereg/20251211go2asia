import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Providers } from './providers';
import { AppShellProvider } from '@/components/app-shell';
import { TopAppBar } from '@/components/app-shell/TopAppBar';
import { BottomNav } from '@/components/app-shell/BottomNav';
import { SideDrawer } from '@/components/app-shell/SideDrawer';
import { SWRegister } from './sw-register';

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
  manifest: '/manifest.webmanifest',
  themeColor: '#0EA5E9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <head>
          <link rel="manifest" href="/manifest.webmanifest" />
          <meta name="theme-color" content="#0EA5E9" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </head>
        <body>
          <Providers>
            <AppShellProvider>
              <SWRegister />
              <TopAppBar />
              <main className="min-h-screen pb-16 md:pb-0">{children}</main>
              <BottomNav />
              <SideDrawer />
            </AppShellProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}


