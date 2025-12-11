/**
 * Guru Asia - Component Exports
 */

// Компоненты
export { ObjectCard } from './ObjectCard';
export { GuruFiltersComponent as GuruFilters } from './GuruFilters';
export { GuruListView } from './GuruListView';

// Динамический импорт для карты (SSR-safe)
export { default as GuruMapViewDynamic } from './GuruMapView';

// Типы
export * from './types';

// Утилиты
export * from './utils/geo';
export * from './utils/filters';
export * from './utils/ranking';

// Хуки
export { useGeolocation, useWatchPosition, DEFAULT_POSITION } from './hooks/useGeolocation';

// Демо-данные
export {
  mockObjects,
  mockPlaces,
  mockEvents,
  mockHousing,
  mockPeople,
  mockQuests,
  DEFAULT_CENTER,
  OBJECT_COUNTS,
} from './mockObjects';

