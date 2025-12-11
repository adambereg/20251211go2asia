'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Partner } from '../types';

interface GalleryProps {
  partner: Partner;
}

export function Gallery({ partner }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allImages = [partner.coverImage, ...partner.gallery];
  const currentImage = allImages[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 text-white hover:text-slate-300 z-10"
        >
          <X size={32} />
        </button>
        <button
          onClick={handlePrevious}
          className="absolute left-4 text-white hover:text-slate-300 z-10"
        >
          <ChevronLeft size={32} />
        </button>
        <div className="relative w-full h-full max-w-7xl mx-auto">
          <Image
            src={currentImage}
            alt={`${partner.name} - фото ${selectedIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <button
          onClick={handleNext}
          className="absolute right-4 text-white hover:text-slate-300 z-10"
        >
          <ChevronRight size={32} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
          {selectedIndex + 1} / {allImages.length}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-slate-100">
      {/* Главное фото */}
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={currentImage}
          alt={partner.name}
          fill
          className="object-cover cursor-pointer"
          onClick={() => setIsFullscreen(true)}
          priority
        />
        {/* Навигация */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        {/* Счётчик */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Миниатюры */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 p-2 bg-white">
          {allImages.slice(0, 4).map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                selectedIndex === idx ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <Image src={image} alt={`Миниатюра ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

