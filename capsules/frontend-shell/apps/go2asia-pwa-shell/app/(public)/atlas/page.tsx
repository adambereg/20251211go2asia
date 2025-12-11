import type { Metadata } from 'next';
import { AtlasHomeClient } from './AtlasHomeClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Atlas Asia - Путеводитель по Юго-Восточной Азии | Go2Asia',
  description: 'Исследуйте страны, города и места Юго-Восточной Азии с Go2Asia Atlas',
  openGraph: {
    title: 'Atlas Asia - Путеводитель по Юго-Восточной Азии',
    description: 'Исследуйте страны, города и места Юго-Восточной Азии',
    type: 'website',
  },
};

export default function AtlasPage() {
  return <AtlasHomeClient />;
}
