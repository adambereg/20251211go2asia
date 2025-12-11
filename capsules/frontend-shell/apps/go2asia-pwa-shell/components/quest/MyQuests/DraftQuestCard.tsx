'use client';

/**
 * Quest Asia - Draft Quest Card
 * Карточка черновика квеста (для PRO-авторов)
 */

import { useRouter } from 'next/navigation';
import { FileEdit, MapPin, Clock, Edit, Trash2 } from 'lucide-react';
import type { Quest } from '@/components/quest/types';
import { QUEST_TYPE_LABELS, DIFFICULTY_LABELS } from '@/components/quest/types';

interface DraftQuestCardProps {
  quest: Quest;
}

export function DraftQuestCard({ quest }: DraftQuestCardProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/quest/${quest.id}/edit`);
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить этот черновик?')) {
      // TODO: Удалить черновик
      console.log('Delete draft:', quest.id);
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Изображение */}
        <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={quest.coverPhoto}
            alt={quest.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-slate-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <FileEdit className="w-3 h-3" />
            Черновик
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 mb-1 truncate">
                {quest.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {quest.city}
                </span>
                <span>•</span>
                <span>{QUEST_TYPE_LABELS[quest.type]}</span>
                <span>•</span>
                <span>{DIFFICULTY_LABELS[quest.difficulty]}</span>
              </div>
            </div>
          </div>

          {/* Описание */}
          <p className="text-slate-600 mb-4 line-clamp-2">{quest.description}</p>

          {/* Статистика */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {quest.duration} мин
            </span>
            <span>{quest.steps.length} шагов</span>
            <span>Обновлён {new Date(quest.updatedAt).toLocaleDateString('ru-RU')}</span>
          </div>

          {/* Действия */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              Редактировать
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

