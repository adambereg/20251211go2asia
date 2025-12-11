'use client';

/**
 * Rielt.Market Asia - AvailabilityCalendar
 * Календарь доступности (для краткосрока)
 */

import { useState } from 'react';
import type { Listing } from '../types';
import { isDateAvailable, formatDate } from '../utils/calendar';

interface AvailabilityCalendarProps {
  listing: Listing;
  onDatesChange?: (dates: { checkIn?: Date; checkOut?: Date }) => void;
}

export function AvailabilityCalendar({ listing, onDatesChange }: AvailabilityCalendarProps) {
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(null);

  if (!listing.availability) {
    return null;
  }

  const calendar = listing.availability.calendar;
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const handleDateClick = (date: Date) => {
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Начинаем новый выбор
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);
      onDatesChange?.({ checkIn: date });
    } else if (selectedCheckIn && !selectedCheckOut) {
      // Выбираем дату выезда
      if (date > selectedCheckIn) {
        setSelectedCheckOut(date);
        onDatesChange?.({ checkIn: selectedCheckIn, checkOut: date });
      } else {
        // Если выбрали дату раньше заезда, меняем заезд
        setSelectedCheckIn(date);
        onDatesChange?.({ checkIn: date });
      }
    }
  };

  const generateCalendarDays = () => {
    const days: Date[] = [];
    const start = new Date(today);
    start.setDate(1); // Первый день месяца

    // Дни предыдущего месяца для заполнения недели
    const firstDayOfWeek = start.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(start);
      date.setDate(date.getDate() - i - 1);
      days.push(date);
    }

    // Дни текущего месяца
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0); // Последний день месяца

    for (let i = 1; i <= end.getDate(); i++) {
      const date = new Date(start);
      date.setDate(i);
      days.push(date);
    }

    return days;
  };

  const days = generateCalendarDays();

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Доступность</h2>
      
      {listing.availability.instantBooking && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-green-800 font-medium">
            ✓ Мгновенное бронирование доступно
          </span>
        </div>
      )}

      {/* Календарь */}
      <div className="grid grid-cols-7 gap-2">
        {/* Заголовки дней недели */}
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
            {day}
          </div>
        ))}

        {/* Дни */}
        {days.map((date, index) => {
          const dateStr = date.toISOString().split('T')[0];
          const isAvailable = isDateAvailable(date, calendar);
          const isPast = date < today;
          const isSelected =
            selectedCheckIn?.toDateString() === date.toDateString() ||
            selectedCheckOut?.toDateString() === date.toDateString();
          const isInRange =
            selectedCheckIn &&
            selectedCheckOut &&
            date > selectedCheckIn &&
            date < selectedCheckOut;

          return (
            <button
              key={index}
              onClick={() => !isPast && isAvailable && handleDateClick(date)}
              disabled={isPast || !isAvailable}
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${isPast || !isAvailable
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 border-2 border-transparent'
                }
                ${isSelected ? 'bg-emerald-600 text-white border-emerald-600' : ''}
                ${isInRange ? 'bg-emerald-100 text-emerald-900' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Легенда */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-600"></div>
          <span className="text-slate-600">Выбранные даты</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-100"></div>
          <span className="text-slate-600">Диапазон</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-100"></div>
          <span className="text-slate-600">Недоступно</span>
        </div>
      </div>
    </div>
  );
}

