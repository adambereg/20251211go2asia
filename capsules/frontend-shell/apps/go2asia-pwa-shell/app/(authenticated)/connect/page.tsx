import type { Metadata } from 'next';
import { DashboardView } from '@/components/connect/Dashboard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard | Connect Asia | Go2Asia',
  description: 'Центр экономики и геймификации Go2Asia',
};

export default function ConnectPage() {
  return <DashboardView />;
}
