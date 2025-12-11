'use client';

import { ModuleHero } from '@/components/modules';
import { PulseClient } from './PulseClient';
import { Globe } from 'lucide-react';
import { useGetEvents } from '@go2asia/sdk/pulse';
import { useMemo } from 'react';
import type { Event } from '@/components/pulse/types';

export function PulseClientWrapper() {
  // Загружаем события из API
  const { data: eventsData, isLoading } = useGetEvents({
    limit: 100, // Загружаем больше событий для календаря
  });

  // Преобразуем данные из API в формат компонента
  const events = useMemo(() => {
    if (!eventsData?.items) return [];
    return eventsData.items.map((event): Event => ({
      id: event.id,
      title: event.title,
      description: event.description || undefined,
      startDate: new Date(event.startTime),
      endDate: event.endTime ? new Date(event.endTime) : new Date(event.startTime),
      location: {
        name: '', // TODO: Get location name when API supports it
        city: '', // TODO: Get city name from cityId when API supports it
        country: '', // TODO: Get country name when API supports it
        address: '', // TODO: Get address when API supports it
        placeId: event.placeId || undefined,
      },
      category: event.category || undefined,
      organizer: undefined, // TODO: Get organizer when API supports it
      price: undefined, // TODO: Get price when API supports it
      language: 'ru', // TODO: Get language when API supports it
      cover: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg', // TODO: Get coverImage when API supports it
      attendeesCount: 0, // TODO: Get attendeesCount when API supports it
    }));
  }, [eventsData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <ModuleHero
          icon={Globe}
          title="Pulse Asia"
          description="События и мероприятия в Юго-Восточной Азии"
          gradientFrom="from-sky-500"
          gradientTo="to-sky-600"
        />
        <div className="flex items-center justify-center py-12">
          <div className="text-slate-600">Загрузка событий...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ModuleHero
        icon={Globe}
        title="Pulse Asia"
        description="События и мероприятия в Юго-Восточной Азии"
        gradientFrom="from-sky-500"
        gradientTo="to-sky-600"
      />
      <PulseClient events={events} />
    </div>
  );
}
