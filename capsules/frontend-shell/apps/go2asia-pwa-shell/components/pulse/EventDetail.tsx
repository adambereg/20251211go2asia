'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Users,
  ExternalLink,
  Download,
  Heart,
  Share2,
  CheckCircle2,
  Flag,
  Tag,
  User,
} from 'lucide-react';
import { Event } from './types';
import { Card, CardContent, Badge, Button } from '@go2asia/ui';
import { EventUGCBlock } from './EventUGCBlock';

interface EventDetailProps {
  event: Event;
}

// Генерация ICS файла для добавления в календарь
function generateICS(event: Event): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const start = formatDate(event.startDate);
  const end = formatDate(event.endDate);
  const location = event.location
    ? `${event.location.name}${event.location.address ? `, ${event.location.address}` : ''}`
    : '';
  const description = event.description || '';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Go2Asia//Pulse Asia//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@go2asia.space`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// Скачивание ICS файла
function downloadICS(event: Event) {
  const icsContent = generateICS(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    // TODO: Отправка RSVP на сервер
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Сохранение события в избранное
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        // Пользователь отменил шаринг
      }
    } else {
      // Fallback: копирование в буфер обмена
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section с обложкой */}
      <div className="relative bg-white border-b border-slate-200">
        {event.cover ? (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={event.cover}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        ) : (
          <div className="h-32 md:h-48 bg-gradient-to-r from-sky-500 to-sky-600" />
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <Link href="/pulse" className="hover:text-sky-600">
              Pulse Asia
            </Link>
            <span>/</span>
            <span className="text-slate-900 line-clamp-1">{event.title}</span>
          </nav>

          {/* Заголовок и бейджи */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {event.title}
              </h1>

              {/* Бейджи */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.badges?.map((badge) => (
                  <Badge
                    key={badge}
                    variant={
                      badge === 'verified'
                        ? 'verified'
                        : badge === 'russian-friendly'
                        ? 'russian-friendly'
                        : 'info'
                    }
                  >
                    {badge === 'verified' && (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Проверено
                      </>
                    )}
                    {badge === 'russian-friendly' && (
                      <>
                        <Flag className="w-3 h-3 mr-1" />
                        RF
                      </>
                    )}
                    {badge === 'free' && 'Бесплатно'}
                    {badge === 'repeating' && 'Повторяется'}
                    {badge === 'virtual-event' && 'Онлайн'}
                  </Badge>
                ))}
                {event.category && (
                  <Badge variant="info">{event.category}</Badge>
                )}
              </div>
            </div>

            {/* Действия */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={isRSVPed ? 'primary' : 'secondary'}
                size="sm"
                onClick={handleRSVP}
              >
                <Users className="w-4 h-4 mr-1" />
                {isRSVPed ? 'Вы идёте' : 'RSVP'}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleSave}>
                <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                {isSaved ? 'Сохранено' : 'Сохранить'}
              </Button>
              <Button variant="secondary" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Поделиться
              </Button>
              <Button variant="secondary" size="sm" onClick={() => downloadICS(event)}>
                <Download className="w-4 h-4 mr-1" />
                В календарь
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* Описание */}
            {event.description && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">О событии</h2>
                  <p className="text-slate-700 whitespace-pre-line">{event.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Теги */}
            {event.tags && event.tags.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* UGC блок */}
            <EventUGCBlock eventId={event.id} />
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Дата и время */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-sky-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">
                        {formatDate(event.startDate)}
                      </div>
                      <div className="text-sm text-slate-600">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </div>
                      {event.timezone && (
                        <div className="text-xs text-slate-500 mt-1">
                          Часовой пояс: {event.timezone}
                        </div>
                      )}
                    </div>
                  </div>

                  {event.rrule && (
                    <div className="text-sm text-slate-600 pt-2 border-t border-slate-200">
                      <Badge variant="info">Повторяющееся событие</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Местоположение */}
            {event.location && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-sky-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{event.location.name}</div>
                        {event.location.address && (
                          <div className="text-sm text-slate-600 mt-1">
                            {event.location.address}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ссылки на Atlas */}
                    {event.atlasLinks && (
                      <div className="pt-3 border-t border-slate-200 space-y-2">
                        <div className="text-xs font-medium text-slate-600 mb-2">В Atlas:</div>
                        {event.atlasLinks.countryId && (
                          <Link
                            href={`/atlas/countries/${event.atlasLinks.countryId}`}
                            className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700"
                          >
                            <Globe className="w-4 h-4" />
                            {event.location.country}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                        {event.atlasLinks.cityId && (
                          <Link
                            href={`/atlas/cities/${event.atlasLinks.cityId}`}
                            className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700"
                          >
                            <MapPin className="w-4 h-4" />
                            {event.location.city}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                        {event.atlasLinks.placeId && (
                          <Link
                            href={`/atlas/places/${event.atlasLinks.placeId}`}
                            className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700"
                          >
                            <MapPin className="w-4 h-4" />
                            {event.location.name}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Организатор */}
            {event.organizer && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-600 mb-1">Организатор</div>
                      <div className="font-medium text-slate-900">{event.organizer.name}</div>
                      {event.organizer.type === 'pro' && (
                        <Badge variant="verified" className="mt-2">
                          PRO
                        </Badge>
                      )}
                      {event.organizer.type === 'partner' && (
                        <Badge variant="russian-friendly" className="mt-2">
                          Партнёр
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Участники */}
            {(event.attendeesCount !== undefined || event.maxAttendees !== undefined) && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-sky-600" />
                    <div>
                      <div className="font-medium text-slate-900">
                        {event.attendeesCount || 0}
                        {event.maxAttendees && ` / ${event.maxAttendees}`} участников
                      </div>
                      {event.maxAttendees && (
                        <div className="text-xs text-slate-600 mt-1">
                          {event.maxAttendees - (event.attendeesCount || 0)} мест осталось
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Цена */}
            {event.price && (
              <Card>
                <CardContent className="p-6">
                  <div className="font-medium text-slate-900">
                    {event.price.type === 'free' ? (
                      'Бесплатно'
                    ) : (
                      <>
                        {event.price.amount} {event.price.currency || 'THB'}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

