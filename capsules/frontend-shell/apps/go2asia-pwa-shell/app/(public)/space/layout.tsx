import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Space Asia | Личный Кабинет | Go2Asia',
  description:
    'Личный кабинет Go2Asia. Управляйте профилем, активностью, квестами, балансом и социальными функциями в экосистеме Go2Asia.',
  openGraph: {
    title: 'Space Asia | Личный Кабинет | Go2Asia',
    description: 'Личный центр управления в экосистеме Go2Asia',
    type: 'website',
  },
};

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

