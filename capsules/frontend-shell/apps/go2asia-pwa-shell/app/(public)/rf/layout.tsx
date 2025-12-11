import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Russian Friendly Asia | Партнёрская программа | Go2Asia',
  description:
    'Каталог проверенных Russian Friendly мест и сервисов в Юго-Восточной Азии. Рестораны, кафе, коворкинги, магазины с особыми условиями для русскоязычных путешественников.',
  openGraph: {
    title: 'Russian Friendly Asia | Партнёрская программа | Go2Asia',
    description: 'Каталог проверенных Russian Friendly мест в ЮВА',
    type: 'website',
  },
};

export default function RFLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

