'use client';

import React, { useMemo } from 'react';
import { Clock, MapPin, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Event, EventFilters } from './types';
import { Card, CardContent, Badge } from '@go2asia/ui';

export interface DayViewProps {
  date: Date;
  events: Event[];
  filters?: EventFilters;
  onEventClick?: (event: Event) => void;
  onDateChange?: (date: Date) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  date,
  events,
  filters: _filters,
  onEventClick,
  onDateChange,
}) => {
  // Цветовая схема по категориям событий (та же, что в WeekView)
  const categoryColorMap: Record<string, { dot: string; card: string; border: string }> = {
    'Культура': {
      dot: 'bg-cyan-400',
      card: 'bg-cyan-50',
      border: 'border-cyan-200',
    },
    'Музыка': {
      dot: 'bg-purple-400',
      card: 'bg-purple-50',
      border: 'border-purple-200',
    },
    'Еда': {
      dot: 'bg-green-400',
      card: 'bg-green-50',
      border: 'border-green-200',
    },
    'Спорт': {
      dot: 'bg-orange-400',
      card: 'bg-orange-50',
      border: 'border-orange-200',
    },
    'Образование': {
      dot: 'bg-blue-400',
      card: 'bg-blue-50',
      border: 'border-blue-200',
    },
    'IT': {
      dot: 'bg-indigo-400',
      card: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
    'Сообщество': {
      dot: 'bg-indigo-400',
      card: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
    'Семья': {
      dot: 'bg-pink-400',
      card: 'bg-pink-50',
      border: 'border-pink-200',
    },
    'Ночная жизнь': {
      dot: 'bg-amber-600',
      card: 'bg-amber-50',
      border: 'border-amber-200',
    },
  };

  // Получить цвет для события на основе категории
  const getEventColor = (category?: string) => {
    if (!category) {
      return {
        dot: 'bg-slate-400',
        card: 'bg-slate-50',
        border: 'border-slate-200',
      };
    }
    return categoryColorMap[category] || {
      dot: 'bg-slate-400',
      card: 'bg-slate-50',
      border: 'border-slate-200',
    };
  };

  // Фильтруем события для выбранного дня
  const dayEvents = useMemo(() => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    return events
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= dayStart && eventDate <= dayEnd;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [date, events]);

  // Генерируем дни недели вокруг выбранного дня
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Находим понедельник недели, в которой находится выбранный день
    const selectedDay = new Date(date);
    selectedDay.setHours(0, 0, 0, 0);
    const dayOfWeek = selectedDay.getDay();
    const monday = new Date(selectedDay);
    monday.setDate(selectedDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);
      
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === dayDate.getTime();
      });

      days.push({
        date: dayDate,
        isToday: dayDate.getTime() === today.getTime(),
        isSelected: dayDate.getTime() === selectedDay.getTime(),
        dayName: dayDate.toLocaleDateString('ru-RU', { weekday: 'short' }),
        dayNumber: dayDate.getDate(),
        events: dayEvents,
      });
    }
    return days;
  }, [date, events]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
    }).toUpperCase();
  };

  const handlePrevDay = () => {
    const prevDay = new Date(date);
    prevDay.setDate(prevDay.getDate() - 1);
    onDateChange?.(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange?.(nextDay);
  };

  const handleDayClick = (dayDate: Date) => {
    onDateChange?.(dayDate);
  };

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="space-y-6">
      {/* Большой блок с фокусной датой */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 shadow-sm p-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevDay}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Предыдущий день"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          
          <div className="text-center flex-1">
            <div className="text-sm font-medium text-slate-600 mb-2">
              {formatDayOfWeek(date)}
            </div>
            <div className="text-6xl md:text-7xl font-bold text-slate-900 mb-2">
              {date.getDate()}
            </div>
            <div className="text-sm text-slate-600">
              {date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </div>
            {dayEvents.length > 0 && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white/70 rounded-full">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">
                  {dayEvents.length} {dayEvents.length === 1 ? 'событие' : 'событий'}
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleNextDay}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Следующий день"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Полоса дней недели */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-4 overflow-x-auto">
          <button
            onClick={() => {
              const prevWeek = new Date(date);
              prevWeek.setDate(prevWeek.getDate() - 7);
              onDateChange?.(prevWeek);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Предыдущая неделя"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day.date)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-lg transition-all flex-1 min-w-[60px]
                  ${day.isSelected 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : day.isToday
                    ? 'bg-sky-50 text-sky-600 ring-2 ring-sky-600'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }
                `}
              >
                <div className="text-xs font-medium mb-1">{dayNames[index]}</div>
                <div className={`
                  text-xl font-bold mb-1
                  ${day.isSelected ? 'text-white' : ''}
                `}>
                  {day.dayNumber}
                </div>
                
                {/* Точки событий */}
                {day.events.length > 0 && (
                  <div className="flex items-center justify-center gap-0.5 flex-wrap">
                    {day.events.slice(0, 3).map((event) => {
                      const color = getEventColor(event.category);
                      return (
                        <div
                          key={event.id}
                          className={`w-1.5 h-1.5 rounded-full ${color.dot}`}
                          title={event.title}
                        />
                      );
                    })}
                    {day.events.length > 3 && (
                      <div className={`text-[8px] font-medium ${day.isSelected ? 'text-white/70' : 'text-slate-500'}`}>
                        +{day.events.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const nextWeek = new Date(date);
              nextWeek.setDate(nextWeek.getDate() + 7);
              onDateChange?.(nextWeek);
            }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Следующая неделя"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Список событий дня */}
      {dayEvents.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Нет событий на этот день</h3>
          <p className="text-sm text-slate-600">
            События появятся здесь, когда они будут добавлены
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dayEvents.map((event) => {
            const color = getEventColor(event.category);
            const eventDate = new Date(event.startDate);
            const isMultiDay = eventDate.toDateString() !== new Date(event.endDate).toDateString();
            
            return (
              <Card
                key={event.id}
                hover
                onClick={() => onEventClick?.(event)}
                className={`cursor-pointer border-2 ${color.card} ${color.border} transition-all hover:shadow-md`}
              >
                <CardContent className="p-6">
                  {/* Бейджи */}
                  {event.badges && event.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {event.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant={
                            badge === 'verified'
                              ? 'verified'
                              : badge === 'russian-friendly'
                              ? 'russian-friendly'
                              : badge === 'free'
                              ? 'info'
                              : 'info'
                          }
                        >
                          {badge === 'verified' && '✓ Проверено'}
                          {badge === 'russian-friendly' && '🇷🇺 RF'}
                          {badge === 'free' && 'Бесплатно'}
                          {badge === 'repeating' && 'Повторяется'}
                          {badge === 'virtual-event' && 'Онлайн'}
                          {badge === 'event-started' && 'Началось'}
                          {badge === 'event-over' && 'Завершено'}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Заголовок */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {event.title}
                  </h3>

                  {/* Описание */}
                  {event.description && (
                    <p className="text-slate-700 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {/* Время */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {formatTime(event.startDate)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                      {event.timezone && ` (${event.timezone})`}
                    </span>
                  </div>

                  {/* Местоположение */}
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">
                        {event.location.name || event.location.address}
                        {event.location.city && `, ${event.location.city}`}
                      </span>
                    </div>
                  )}

                  {/* Дополнительная информация */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-3 border-t border-slate-200">
                    {event.organizer && (
                      <div>
                        Организатор: <span className="font-medium">{event.organizer.name}</span>
                      </div>
                    )}
                    {event.attendeesCount !== undefined && (
                      <div>
                        Участников: <span className="font-medium">{event.attendeesCount}</span>
                        {event.maxAttendees && ` / ${event.maxAttendees}`}
                      </div>
                    )}
                    {event.price && (
                      <div>
                        {event.price.type === 'free' ? (
                          <span className="font-medium text-green-600">Бесплатно</span>
                        ) : (
                          <span className="font-medium">
                            {event.price.amount} {event.price.currency || 'THB'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
