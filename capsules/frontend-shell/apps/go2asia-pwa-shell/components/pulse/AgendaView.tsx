'use client';

import React, { useMemo } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { Event, EventFilters } from './types';
import { Card, CardContent } from '@go2asia/ui';

export interface AgendaViewProps {
  events: Event[];
  filters?: EventFilters;
  onEventClick?: (event: Event) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  filters: _filters,
  onEventClick,
}) => {
  // Группируем события по датам
  const groupedEvents = useMemo(() => {
    const grouped = new Map<string, Event[]>();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Фильтруем только будущие события или события сегодня
    const futureEvents = events
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= now;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    futureEvents.forEach((event) => {
      const eventDate = new Date(event.startDate);
      eventDate.setHours(0, 0, 0, 0);
      const dateKey = eventDate.toISOString().split('T')[0];

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(event);
    });

    return Array.from(grouped.entries()).map(([dateKey, events]) => ({
      date: new Date(dateKey),
      events: events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
    }));
  }, [events]);

  const formatDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      return 'Сегодня';
    }
    if (eventDate.getTime() === tomorrow.getTime()) {
      return 'Завтра';
    }

    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (groupedEvents.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">Нет предстоящих событий</h3>
        <p className="text-sm text-slate-600">
          Ближайшие события появятся здесь
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedEvents.map((group, groupIndex) => (
        <div key={groupIndex} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Заголовок даты */}
          <div className="bg-sky-50 border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-bold text-slate-900">
                {formatDate(group.date)}
              </h3>
              <span className="text-sm text-slate-600">
                ({group.events.length} {group.events.length === 1 ? 'событие' : 'событий'})
              </span>
            </div>
          </div>

          {/* Список событий дня */}
          <div className="divide-y divide-slate-200">
            {group.events.map((event) => (
              <Card
                key={event.id}
                hover
                onClick={() => onEventClick?.(event)}
                className="cursor-pointer rounded-none border-0 shadow-none hover:bg-slate-50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Время */}
                    <div className="flex-shrink-0 w-20 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm font-medium text-sky-600 mb-1">
                        <Clock className="w-4 h-4" />
                        {formatTime(event.startDate)}
                      </div>
                      {event.endDate && (
                        <div className="text-xs text-slate-500">
                          до {formatTime(event.endDate)}
                        </div>
                      )}
                    </div>

                    {/* Информация о событии */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                        {event.title}
                      </h4>
                      
                      {event.description && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">
                              {event.location.name || event.location.address}
                            </span>
                          </div>
                        )}

                        {event.category && (
                          <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                            {event.category}
                          </span>
                        )}

                        {event.price?.type === 'free' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Бесплатно
                          </span>
                        )}
                      </div>

                      {/* Бейджи */}
                      {event.badges && event.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {event.badges.map((badge) => (
                            <span
                              key={badge}
                              className="text-xs px-2 py-1 rounded bg-sky-100 text-sky-700 font-medium"
                            >
                              {badge === 'verified' && '✓ Проверено'}
                              {badge === 'russian-friendly' && '🇷🇺 RF'}
                              {badge === 'free' && 'Бесплатно'}
                              {badge === 'repeating' && 'Повторяется'}
                              {badge === 'virtual-event' && 'Онлайн'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
