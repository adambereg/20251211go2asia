import type { Metadata } from 'next';
import { AnalyticsView } from '@/components/connect/Analytics/AnalyticsView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Аналитика | Connect Asia | Go2Asia',
  description: 'Отслеживайте эффективность и источники наград',
};

export default function AnalyticsPage() {
  return <AnalyticsView />;
}
