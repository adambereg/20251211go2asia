import type { Metadata } from 'next';
import { CountriesClient } from './CountriesClient';

export const metadata: Metadata = {
  title: 'Страны Юго-Восточной Азии | Go2Asia Atlas',
  description: 'Список всех стран Юго-Восточной Азии в Go2Asia Atlas',
  openGraph: {
    title: 'Страны Юго-Восточной Азии',
    description: 'Исследуйте страны Юго-Восточной Азии',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function CountriesPage() {
  return <CountriesClient />;
}

