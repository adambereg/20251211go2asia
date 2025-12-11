import type { Metadata } from 'next';
import { CitiesClient } from './CitiesClient';

export const metadata: Metadata = {
  title: 'Города Юго-Восточной Азии | Go2Asia Atlas',
  description: 'Список всех городов Юго-Восточной Азии в Go2Asia Atlas',
  openGraph: {
    title: 'Города Юго-Восточной Азии',
    description: 'Исследуйте города региона и их уникальные особенности',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

export default function CitiesPage() {
  return <CitiesClient />;
}
