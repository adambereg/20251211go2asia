import type { Metadata } from 'next';
import { VerificationsListView } from '@/components/rf/PRO';

export const metadata: Metadata = {
  title: 'Проверки | PRO Dashboard | Russian Friendly',
  description: 'Проведение проверок партнёров по стандарту Russian Friendly',
};

export default function PROVerificationsPage() {
  return <VerificationsListView />;
}

