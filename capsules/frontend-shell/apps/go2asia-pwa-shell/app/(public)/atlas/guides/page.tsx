import type { Metadata } from 'next';
import { GuidesClient } from './GuidesClient';

export const metadata: Metadata = {
  title: 'Гайды Atlas Asia',
  description:
    'Подборки и маршруты по странам и городам Юго-Восточной Азии: для новичков, путешественников и PRO-спейсеров.',
  openGraph: {
    title: 'Гайды Atlas Asia',
    description: 'Подборки и маршруты по странам и городам Юго-Восточной Азии',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  return <GuidesClient />;
}
