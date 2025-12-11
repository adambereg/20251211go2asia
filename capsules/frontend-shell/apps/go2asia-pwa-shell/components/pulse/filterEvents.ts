/**
 * Утилита для фильтрации событий по заданным фильтрам
 */

import { Event, EventFilters } from './types';

export function filterEvents(events: Event[], filters: EventFilters): Event[] {
  let filtered = [...events];

  // Поиск по названию, описанию, организатору, тегам
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(searchLower);
      const descriptionMatch = event.description?.toLowerCase().includes(searchLower);
      const organizerMatch = event.organizer?.name.toLowerCase().includes(searchLower);
      const tagsMatch = event.tags?.some((tag) => tag.toLowerCase().includes(searchLower));
      
      return titleMatch || descriptionMatch || organizerMatch || tagsMatch;
    });
  }

  // Фильтр по стране
  if (filters.country) {
    filtered = filtered.filter((event) => event.location?.country === filters.country);
  }

  // Фильтр по городу
  if (filters.city) {
    filtered = filtered.filter((event) => event.location?.city === filters.city);
  }

  // Фильтр по категории
  if (filters.category) {
    filtered = filtered.filter((event) => event.category === filters.category);
  }

  // Фильтр по масштабу
  if (filters.scale) {
    filtered = filtered.filter((event) => event.scale === filters.scale);
  }

  // Фильтр по цене
  if (filters.price) {
    if (filters.price === 'free') {
      filtered = filtered.filter((event) => event.price?.type === 'free');
    } else if (filters.price === 'paid') {
      filtered = filtered.filter((event) => event.price?.type === 'paid');
    }
  }

  // Фильтр по языку
  if (filters.language) {
    filtered = filtered.filter((event) => event.language === filters.language);
  }

  // Фильтр по времени
  if (filters.timeFilter) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Находим следующую субботу для фильтра "выходные"
    const nextSaturday = new Date(today);
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7 || 7;
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    const nextSunday = new Date(nextSaturday);
    nextSunday.setDate(nextSaturday.getDate() + 1);

    switch (filters.timeFilter) {
      case 'today':
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.startDate);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate.getTime() === today.getTime();
        });
        break;
      case 'tomorrow':
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.startDate);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate.getTime() === tomorrow.getTime();
        });
        break;
      case 'weekend':
        filtered = filtered.filter((event) => {
          const eventDate = new Date(event.startDate);
          eventDate.setHours(0, 0, 0, 0);
          const dayOfWeek = eventDate.getDay();
          return dayOfWeek === 0 || dayOfWeek === 6; // Суббота или воскресенье
        });
        break;
    }
  }

  // Фильтр по диапазону дат
  if (filters.dateRange) {
    if (filters.dateRange.start) {
      const start = new Date(filters.dateRange.start);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= start;
      });
    }
    if (filters.dateRange.end) {
      const end = new Date(filters.dateRange.end);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate <= end;
      });
    }
  }

  return filtered;
}

