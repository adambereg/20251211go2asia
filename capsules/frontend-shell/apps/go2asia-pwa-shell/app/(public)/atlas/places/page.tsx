import type { Metadata } from 'next';
import { PlacesClient } from './PlacesClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Места Юго-Восточной Азии | Atlas Asia',
  description:
    'Каталог мест Atlas Asia: города, достопримечательности, Russian Friendly локации и партнёрские заведения.',
  openGraph: {
    title: 'Места Юго-Восточной Азии',
    description: 'Каталог мест Atlas Asia: города, достопримечательности, Russian Friendly локации и партнёрские заведения.',
    type: 'website',
  },
};

export default function PlacesIndexPage() {
  return <PlacesClient />;
}
