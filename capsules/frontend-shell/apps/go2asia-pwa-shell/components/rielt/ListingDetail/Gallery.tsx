'use client';

/**
 * Rielt.Market Asia - Gallery
 * Hero-галерея с фото объявления
 */

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Listing } from '../types';

interface GalleryProps {
  listing: Listing;
}

export function Gallery({ listing }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = listing.photos.length > 0 ? listing.photos : ['/placeholder-listing.jpg'];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-200">
      {/* Главное фото */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={photos[currentIndex]}
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />

        {/* Навигация */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </button>
          </>
        )}

        {/* Индикатор текущего фото */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Фото ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Бейджи поверх фото */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {listing.isRF && (
            <span className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg font-semibold text-sm flex items-center gap-1.5 shadow-lg">
              <span>✓</span>
              Russian Friendly
            </span>
          )}
          {listing.proVerification?.verified && (
            <div className="px-3 py-1.5 bg-green-500 text-white rounded-lg font-semibold text-sm flex items-center gap-1.5 shadow-lg">
              <span>✓</span>
              Проверено PRO
            </div>
          )}
          {listing.isNew && (
            <div className="px-3 py-1.5 bg-blue-500 text-white rounded-lg font-semibold text-sm shadow-lg">
              Новое
            </div>
          )}
          {listing.isInstant && (
            <div className="px-3 py-1.5 bg-purple-500 text-white rounded-lg font-semibold text-sm shadow-lg">
              Мгновенное бронирование
            </div>
          )}
        </div>
      </div>

      {/* Миниатюры (если фото больше 1) */}
      {photos.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-2">
          {photos.slice(0, 6).map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-emerald-500'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <Image
                src={photo}
                alt={`Фото ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

