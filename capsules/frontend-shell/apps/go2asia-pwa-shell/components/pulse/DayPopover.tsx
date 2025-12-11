'use client';

import React, { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import { CalendarDay, Event } from './types';
import { Card, CardContent } from '@go2asia/ui';

export interface DayPopoverProps {
  day: CalendarDay;
  position: { x: number; y: number };
  onClose: () => void;
  onEventClick?: (event: Event) => void;
  onDateClick?: (date: Date) => void;
}

export const DayPopover: React.FC<DayPopoverProps> = ({
  day,
  position,
  onClose,
  onEventClick,
  onDateClick,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 w-full max-w-md"
      style={{
        left: `${Math.min(position.x - 200, window.innerWidth - 420)}px`,
        top: `${position.y}px`,
      }}
    >
      <Card className="shadow-xl border border-slate-200">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-sky-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-h3 md:text-2xl font-bold text-white">
                {formatDate(day.date)}
              </h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-white/90">
              {day.events.length} {day.events.length === 1 ? 'событие' : 'событий'}
            </div>
          </div>

          {/* Events list */}
          <div className="max-h-[400px] overflow-y-auto">
            {day.events.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm">На этот день нет событий</p>
                <button
                  onClick={() => {
                    onDateClick?.(day.date);
                    onClose();
                  }}
                  className="mt-4 text-sky-600 hover:text-sky-700 text-sm font-medium"
                >
                  Перейти к дню →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      onEventClick?.(event);
                      onClose();
                    }}
                    className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <h4 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
                      {event.title}
                    </h4>
                    
                    {event.description && (
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="space-y-1.5 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTime(event.startDate)}
                          {event.endDate && ` - ${formatTime(event.endDate)}`}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1">
                            {event.location.name || event.location.address || event.location.city}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Badges */}
                    {event.badges && event.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.badges.map((badge) => (
                          <span
                            key={badge}
                            className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-700"
                          >
                            {badge === 'verified' && '✓ Проверено'}
                            {badge === 'russian-friendly' && '🇷🇺 RF'}
                            {badge === 'free' && 'Бесплатно'}
                            {badge === 'repeating' && 'Повторяется'}
                            {badge === 'event-started' && 'Началось'}
                            {badge === 'virtual-event' && 'Онлайн'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {day.events.length > 0 && (
            <div className="border-t border-slate-200 p-3 bg-slate-50">
              <button
                onClick={() => {
                  onDateClick?.(day.date);
                  onClose();
                }}
                className="w-full text-center text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                Показать все события дня →
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

