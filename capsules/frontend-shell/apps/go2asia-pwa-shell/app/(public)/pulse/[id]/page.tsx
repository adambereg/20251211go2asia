import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EventDetail } from '@/components/pulse/EventDetail';
import { mockEventsById } from '@/components/pulse/mockEvents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = mockEventsById[id];

  if (!event) {
    return {
      title: 'Событие не найдено | Pulse Asia',
    };
  }

  return {
    title: `${event.title} | Pulse Asia`,
    description: event.description || `Событие ${event.title} в ${event.location?.city || event.location?.country}`,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = mockEventsById[id];

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}

