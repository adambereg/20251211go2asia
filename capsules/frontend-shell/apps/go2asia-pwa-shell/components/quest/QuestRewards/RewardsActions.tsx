'use client';

/**
 * Quest Asia - Rewards Actions
 * Кнопки действий после завершения квеста
 */

import { useRouter } from 'next/navigation';
import { Share2, Star, MapPin, ArrowRight, Heart } from 'lucide-react';
import type { Quest } from '@/components/quest/types';

interface RewardsActionsProps {
  quest: Quest;
}

export function RewardsActions({ quest }: RewardsActionsProps) {
  const router = useRouter();

  const handleShare = () => {
    const text = `Я завершил квест "${quest.title}" в Go2Asia! 🎉`;
    const url = window.location.origin + `/quest/${quest.id}`;

    if (navigator.share) {
      navigator.share({
        title: text,
        text: text,
        url: url,
      });
    } else {
      // Fallback: копируем в буфер обмена
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  const handleReview = () => {
    // TODO: Открыть модальное окно с формой отзыва
    alert('Функция отзыва будет реализована позже');
  };

  const handleSaveRoute = () => {
    // TODO: Сохранить маршрут в Atlas
    router.push(`/atlas/routes/new?quest=${quest.id}`);
  };

  const handleFindSimilar = () => {
    // Переход на главную страницу квестов с фильтрами
    router.push(`/quest?city=${quest.city}&type=${quest.type}`);
  };

  return (
    <div className="space-y-4">
      {/* Основные действия */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          <Share2 className="w-5 h-5" />
          Поделиться
        </button>

        <button
          onClick={handleReview}
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          <Star className="w-5 h-5" />
          Оставить отзыв
        </button>

        <button
          onClick={handleSaveRoute}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
        >
          <MapPin className="w-5 h-5" />
          Сохранить маршрут
        </button>
      </div>

      {/* Дополнительные действия */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleFindSimilar}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Найти похожие квесты
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => router.push('/quest')}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-300 hover:border-purple-500 text-slate-700 hover:text-purple-600 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          <Heart className="w-4 h-4" />
          Вернуться к квестам
        </button>
      </div>
    </div>
  );
}

