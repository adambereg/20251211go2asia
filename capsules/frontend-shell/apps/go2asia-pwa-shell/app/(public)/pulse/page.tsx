import type { Metadata } from 'next';
import { PulseClientWrapper } from './PulseClientWrapper';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pulse Asia - События и мероприятия | Go2Asia',
  description: 'Актуальные события и мероприятия в Юго-Восточной Азии',
};

export default function PulsePage() {
  return <PulseClientWrapper />;
}
