'use client';

/**
 * Guru Asia - GuruListView
 * Список объектов с карточками и сортировкой
 */

import React, { useRef, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import type { GuruObjectWithDistance, SortMode } from './types';
import { SORT_OPTIONS } from './types';
import { ObjectCard } from './ObjectCard';

// =============================================================================
// Типы
// =============================================================================

interface GuruListViewProps {
  objects: GuruObjectWithDistance[];
  selectedObjectId: string | null;
  sortMode: SortMode;
  onSortChange: (mode: SortMode) => void;
  onObjectSelect: (objectId: string) => void;
  onObjectSave?: (objectId: string) => void;
  loading?: boolean;
  className?: string;
}

// =============================================================================
// Переключатель сортировки
// =============================================================================

interface SortSwitchProps {
  value: SortMode;
  onChange: (value: SortMode) => void;
}

const SortSwitch: React.FC<SortSwitchProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
            ${
              value === option.value
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// =============================================================================
// Пустое состояние
// =============================================================================

const EmptyState: React.FC<{ radius: number }> = ({ radius }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
      <MapPin className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">
      Ничего не найдено
    </h3>
    <p className="text-sm text-slate-500 max-w-xs">
      В радиусе {radius} м нет объектов, соответствующих вашим фильтрам.
      Попробуйте увеличить радиус или изменить фильтры.
    </p>
  </div>
);

// =============================================================================
// Состояние загрузки
// =============================================================================

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
    <p className="text-sm text-slate-500">Загрузка объектов...</p>
  </div>
);

// =============================================================================
// Основной компонент
// =============================================================================

export const GuruListView: React.FC<GuruListViewProps> = ({
  objects,
  selectedObjectId,
  sortMode,
  onSortChange,
  onObjectSelect,
  onObjectSave,
  loading = false,
  className = '',
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  // Скролл к выбранному объекту
  useEffect(() => {
    if (selectedObjectId && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedObjectId]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Заголовок с сортировкой */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{objects.length}</span>{' '}
          {objects.length === 1
            ? 'объект'
            : objects.length < 5
            ? 'объекта'
            : 'объектов'}
        </p>
        <SortSwitch value={sortMode} onChange={onSortChange} />
      </div>

      {/* Список */}
      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <LoadingState />
        ) : objects.length === 0 ? (
          <EmptyState radius={1000} />
        ) : (
          objects.map((object) => (
            <div
              key={object.id}
              ref={selectedObjectId === object.id ? selectedRef : undefined}
            >
              <ObjectCard
                object={object}
                isSelected={selectedObjectId === object.id}
                onClick={() => onObjectSelect(object.id)}
                onSave={() => onObjectSave?.(object.id)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuruListView;

