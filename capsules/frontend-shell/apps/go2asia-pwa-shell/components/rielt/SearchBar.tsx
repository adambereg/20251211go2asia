'use client';

/**
 * Rielt.Market Asia - SearchBar
 * Поисковая строка с полями: город, даты, гости, тип аренды
 */

import { useState } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import type { SearchFilters } from './types';

interface SearchBarProps {
  onSearch: (filters: Partial<SearchFilters>) => void;
  initialFilters?: SearchFilters;
}

export function SearchBar({ onSearch, initialFilters }: SearchBarProps) {
  const [city, setCity] = useState(initialFilters?.location?.city || '');
  const [checkIn, setCheckIn] = useState(initialFilters?.checkIn || '');
  const [checkOut, setCheckOut] = useState(initialFilters?.checkOut || '');
  const [guests, setGuests] = useState(initialFilters?.guests || 1);
  const [rentalType, setRentalType] = useState<'short-term' | 'long-term'>(
    (initialFilters?.rentalType as 'short-term' | 'long-term') || 'short-term'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: { city },
      checkIn: rentalType === 'short-term' ? checkIn : undefined,
      checkOut: rentalType === 'short-term' ? checkOut : undefined,
      guests,
      rentalType,
    });
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 md:p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Переключатель типа аренды */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setRentalType('short-term')}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
              rentalType === 'short-term'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Краткосрочно
          </button>
          <button
            type="button"
            onClick={() => setRentalType('long-term')}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors ${
              rentalType === 'long-term'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Долгосрочно
          </button>
        </div>

        {/* Поля поиска */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Город */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Куда?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Даты (только для краткосрока) */}
          {rentalType === 'short-term' && (
            <>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  placeholder="Заезд"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  placeholder="Выезд"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Гости */}
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              placeholder="Гости"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              min={1}
              max={20}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Кнопка поиска */}
        <button
          type="submit"
          className="w-full md:w-auto md:px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Search className="w-5 h-5" />
          Найти жильё
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

