import type { Metadata } from 'next';
import { PartnersListView } from '@/components/rf/PRO';

export const metadata: Metadata = {
  title: 'Мои партнёры | PRO Dashboard | Russian Friendly',
  description: 'Управление партнёрами PRO-куратора',
};

export default function PROPartnersPage() {
  return <PartnersListView />;
}

