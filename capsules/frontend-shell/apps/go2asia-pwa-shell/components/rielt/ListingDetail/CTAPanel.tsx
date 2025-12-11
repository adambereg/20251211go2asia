'use client';

/**
 * Rielt.Market Asia - CTAPanel
 * Sticky панель действий (бронирование)
 */

import { useState } from 'react';
import { Heart, Share2, Calendar, Users, DollarSign } from 'lucide-react';
import type { Listing } from '../types';
import { calculateNights } from '../utils/calendar';

interface CTAPanelProps {
  listing: Listing;
  selectedDates: { checkIn?: Date; checkOut?: Date };
  onDatesChange: (dates: { checkIn?: Date; checkOut?: Date }) => void;
}

export function CTAPanel({ listing, selectedDates, onDatesChange }: CTAPanelProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [guests, setGuests] = useState(1);

  const price = listing.rentalType === 'long-term' 
    ? listing.pricing.perMonth 
    : listing.pricing.perNight;

  const priceLabel = listing.rentalType === 'long-term' ? 'месяц' : 'ночь';

  // Расчёт итоговой цены
  let totalPrice = 0;
  if (listing.rentalType === 'short-term' && selectedDates.checkIn && selectedDates.checkOut) {
    const nights = calculateNights(selectedDates.checkIn, selectedDates.checkOut);
    totalPrice = (price || 0) * nights;
    if (listing.pricing.cleaningFee) {
      totalPrice += listing.pricing.cleaningFee;
    }
    if (listing.pricing.serviceFee) {
      totalPrice += listing.pricing.serviceFee;
    }
  } else if (listing.rentalType === 'long-term') {
    totalPrice = price || 0;
  }

  const handleBook = () => {
    // TODO: Переход на страницу бронирования
    alert('Функция бронирования будет реализована позже');
  };

  const handleRequest = () => {
    // TODO: Отправка запроса владельцу
    alert('Функция отправки запроса будет реализована позже');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: listing.description,
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
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 sticky top-24">
      {/* Цена */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-slate-900">
            ${price}
          </span>
          <span className="text-lg text-slate-600">/ {priceLabel}</span>
        </div>
        {listing.pricing.cleaningFee && (
          <div className="text-sm text-slate-500">
            + ${listing.pricing.cleaningFee} уборка
          </div>
        )}
      </div>

      {/* Форма бронирования (для краткосрока) */}
      {listing.rentalType === 'short-term' && (
        <div className="space-y-4 mb-6">
          <div className="border-2 border-slate-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Даты
            </label>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {selectedDates.checkIn && selectedDates.checkOut
                  ? `${selectedDates.checkIn.toLocaleDateString('ru-RU')} — ${selectedDates.checkOut.toLocaleDateString('ru-RU')}`
                  : 'Выберите даты'}
              </span>
            </div>
          </div>

          <div className="border-2 border-slate-200 rounded-lg p-3">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Гости
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <input
                type="number"
                min={1}
                max={listing.maxGuests}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="flex-1 border-0 focus:outline-none text-slate-900"
              />
            </div>
          </div>

          {/* Итоговая цена */}
          {totalPrice > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-700">Итого:</span>
                <span className="text-xl font-bold text-slate-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Кнопки действий */}
      <div className="space-y-3">
        {listing.isInstant ? (
          <button
            onClick={handleBook}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            Забронировать
          </button>
        ) : (
          <button
            onClick={handleRequest}
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            Отправить запрос
          </button>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex-1 px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            Сохранить
          </button>
          <button
            onClick={handleShare}
            className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Поделиться
          </button>
        </div>
      </div>

      {/* RF-ваучер */}
      {listing.rfVoucher && (
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-emerald-500 text-white rounded text-xs font-bold">
              RF
            </span>
            <span className="font-semibold text-emerald-900">
              {listing.rfVoucher.title}
            </span>
          </div>
          <p className="text-sm text-emerald-800 mb-2">
            {listing.rfVoucher.description}
          </p>
          <button className="text-sm text-emerald-700 font-medium hover:text-emerald-800">
            Показать условия →
          </button>
        </div>
      )}
    </div>
  );
}

