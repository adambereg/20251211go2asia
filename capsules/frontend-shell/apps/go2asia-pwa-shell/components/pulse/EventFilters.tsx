'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Calendar, DollarSign, Globe, Tag, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { EventFilters as EventFiltersType } from './types';
import { Chip, Button } from '@go2asia/ui';

export interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
}

// Категории событий
const categories = [
  { value: 'Еда', label: 'Еда' },
  { value: 'Культура', label: 'Культура' },
  { value: 'Музыка', label: 'Музыка' },
  { value: 'Спорт', label: 'Спорт' },
  { value: 'IT', label: 'IT' },
  { value: 'Сообщество', label: 'Сообщество' },
  { value: 'Семья', label: 'Семья' },
  { value: 'Ночная жизнь', label: 'Ночная жизнь' },
];

// Страны (демо-данные)
const countries = [
  { value: 'Таиланд', label: 'Таиланд' },
  { value: 'Вьетнам', label: 'Вьетнам' },
  { value: 'Индонезия', label: 'Индонезия' },
  { value: 'Сингапур', label: 'Сингапур' },
  { value: 'Малайзия', label: 'Малайзия' },
];

// Города (демо-данные)
const cities = [
  { value: 'Бангкок', label: 'Бангкок', country: 'Таиланд' },
  { value: 'Пхукет', label: 'Пхукет', country: 'Таиланд' },
  { value: 'Чиангмай', label: 'Чиангмай', country: 'Таиланд' },
  { value: 'Ханой', label: 'Ханой', country: 'Вьетнам' },
  { value: 'Хошимин', label: 'Хошимин', country: 'Вьетнам' },
  { value: 'Бали', label: 'Бали', country: 'Индонезия' },
  { value: 'Сингапур', label: 'Сингапур', country: 'Сингапур' },
];

// Масштаб
const scales = [
  { value: 'country', label: 'Страна' },
  { value: 'city', label: 'Город' },
  { value: 'place', label: 'Место' },
];

// Цена
const priceOptions = [
  { value: 'all', label: 'Все' },
  { value: 'free', label: 'Бесплатно' },
  { value: 'paid', label: 'Платно' },
];

// Язык
const languages = [
  { value: 'all', label: 'Все' },
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'local', label: 'Местный' },
];

// Время
const timeFilters = [
  { value: 'all', label: 'Все' },
  { value: 'today', label: 'Сегодня' },
  { value: 'tomorrow', label: 'Завтра' },
  { value: 'weekend', label: 'Выходные' },
];

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [availableCities, setAvailableCities] = useState(cities);
  const [isExpanded, setIsExpanded] = useState(false); // По умолчанию скрыто на мобильных

  // Обновляем доступные города при изменении страны
  useEffect(() => {
    if (filters.country) {
      setAvailableCities(cities.filter(city => city.country === filters.country));
      // Сбрасываем город, если он не относится к выбранной стране
      if (filters.city && !cities.find(c => c.value === filters.city && c.country === filters.country)) {
        onFiltersChange({ ...filters, city: undefined });
      }
    } else {
      setAvailableCities(cities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.country]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleCategoryToggle = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleCountryChange = (country: string | undefined) => {
    onFiltersChange({
      ...filters,
      country,
      city: undefined, // Сбрасываем город при смене страны
    });
  };

  const handleCityChange = (city: string | undefined) => {
    onFiltersChange({ ...filters, city });
  };

  const handleScaleToggle = (scale: 'country' | 'city' | 'place') => {
    onFiltersChange({
      ...filters,
      scale: filters.scale === scale ? undefined : scale,
    });
  };

  const handlePriceChange = (price: 'free' | 'paid' | 'all') => {
    onFiltersChange({
      ...filters,
      price: price === 'all' ? undefined : price,
    });
  };

  const handleLanguageChange = (language: 'ru' | 'en' | 'local' | 'all') => {
    onFiltersChange({
      ...filters,
      language: language === 'all' ? undefined : language,
    });
  };

  const handleTimeFilterChange = (timeFilter: 'today' | 'tomorrow' | 'weekend' | 'all') => {
    onFiltersChange({
      ...filters,
      timeFilter: timeFilter === 'all' ? undefined : timeFilter,
    });
  };

  const handleClearFilters = () => {
    const clearedFilters: EventFiltersType = {};
    onFiltersChange(clearedFilters);
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    filters.country ||
    filters.city ||
    filters.category ||
    filters.scale ||
    filters.price ||
    filters.language ||
    filters.timeFilter ||
    filters.search
  );

  // Компактное отображение активных фильтров
  const activeFiltersList: string[] = [];
  if (filters.country) activeFiltersList.push(filters.country);
  if (filters.city) activeFiltersList.push(filters.city);
  if (filters.category) activeFiltersList.push(filters.category);
  if (filters.scale) {
    const scaleLabel = scales.find(s => s.value === filters.scale)?.label;
    if (scaleLabel) activeFiltersList.push(scaleLabel);
  }
  if (filters.price && filters.price !== 'all') {
    const priceLabel = priceOptions.find(p => p.value === filters.price)?.label;
    if (priceLabel) activeFiltersList.push(priceLabel);
  }
  if (filters.language && filters.language !== 'all') {
    const langLabel = languages.find(l => l.value === filters.language)?.label;
    if (langLabel) activeFiltersList.push(langLabel);
  }
  if (filters.timeFilter && filters.timeFilter !== 'all') {
    const timeLabel = timeFilters.find(t => t.value === filters.timeFilter)?.label;
    if (timeLabel) activeFiltersList.push(timeLabel);
  }

  return (
    <div className="bg-white border-b border-slate-200 sticky top-[64px] lg:top-[120px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Компактная версия для мобильных (когда фильтры скрыты) */}
        <div className="lg:hidden py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {hasActiveFilters ? (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Filter className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                    {activeFiltersList.slice(0, 2).map((filter, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-sky-100 text-sky-700 rounded-full truncate"
                      >
                        {filter}
                      </span>
                    ))}
                    {activeFiltersList.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                        +{activeFiltersList.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-slate-600">Фильтры</span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex-shrink-0"
            >
              {isExpanded ? (
                <>
                  Скрыть
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Показать
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Полная версия фильтров */}
        <div className={`${isExpanded ? 'block' : 'hidden'} lg:block py-4`}>
        {/* Поиск */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию, организатору, тегам..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 rounded"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Основные фильтры */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Гео: Страна */}
          <div className="relative">
            <select
              value={filters.country || ''}
              onChange={(e) => handleCountryChange(e.target.value || undefined)}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none cursor-pointer"
            >
              <option value="">Все страны</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Гео: Город */}
          {filters.country && (
            <div className="relative">
              <select
                value={filters.city || ''}
                onChange={(e) => handleCityChange(e.target.value || undefined)}
                className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none cursor-pointer"
              >
                <option value="">Все города</option>
                {availableCities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          )}

          {/* Масштаб */}
          <div className="flex items-center gap-2">
            {scales.map((scale) => (
              <Chip
                key={scale.value}
                selected={filters.scale === scale.value}
                onClick={() => handleScaleToggle(scale.value as 'country' | 'city' | 'place')}
                className="cursor-pointer"
              >
                {scale.label}
              </Chip>
            ))}
          </div>

          {/* Цена */}
          <div className="relative">
            <select
              value={filters.price || 'all'}
              onChange={(e) => handlePriceChange(e.target.value as 'free' | 'paid' | 'all')}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none cursor-pointer"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <DollarSign className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Язык */}
          <div className="relative">
            <select
              value={filters.language || 'all'}
              onChange={(e) => handleLanguageChange(e.target.value as 'ru' | 'en' | 'local' | 'all')}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Время */}
          <div className="relative">
            <select
              value={filters.timeFilter || 'all'}
              onChange={(e) => handleTimeFilterChange(e.target.value as 'today' | 'tomorrow' | 'weekend' | 'all')}
              className="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none cursor-pointer"
            >
              {timeFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Кнопка очистки */}
          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearFilters}
              className="ml-auto border border-slate-300"
            >
              <X className="w-4 h-4 mr-1" />
              Очистить
            </Button>
          )}
        </div>

          {/* Расширенные фильтры: Категории */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600 mr-2">Категории:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Chip
                  key={category.value}
                  selected={filters.category === category.value}
                  onClick={() => handleCategoryToggle(category.value)}
                  className="cursor-pointer"
                >
                  {category.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
