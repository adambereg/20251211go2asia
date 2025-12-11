/**
 * Guru Asia - Filter Utils
 * Утилиты для фильтрации объектов
 */

import type {
  GuruObjectWithDistance,
  GuruFilters,
  PlaceObject,
  EventObject,
  HousingObject,
  PersonObject,
  QuestObject,
} from '../types';

/**
 * Применяет все фильтры к массиву объектов
 * @param objects Массив объектов с расстоянием
 * @param filters Фильтры
 * @returns Отфильтрованные объекты
 */
export function applyFilters(
  objects: GuruObjectWithDistance[],
  filters: GuruFilters
): GuruObjectWithDistance[] {
  let filtered = objects;

  // 1. Фильтр по типам
  if (filters.types.length > 0 && filters.types.length < 5) {
    filtered = filtered.filter((obj) => filters.types.includes(obj.type));
  }

  // 2. Фильтр по поиску
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter((obj) => {
      const searchFields = [
        obj.title,
        obj.description,
        obj.address,
        obj.city,
      ].filter(Boolean);
      return searchFields.some((field) => field?.toLowerCase().includes(query));
    });
  }

  // 3. Фильтр по времени
  filtered = applyTimeFilter(filtered, filters.time);

  // 4. Фильтр по атрибутам мест
  filtered = applyPlaceAttrsFilter(filtered, filters.placeAttrs);

  // 5. Фильтр по атрибутам жилья
  filtered = applyHousingAttrsFilter(filtered, filters.housingAttrs);

  // 6. Фильтр по атрибутам людей
  filtered = applyPersonAttrsFilter(filtered, filters.personAttrs);

  // 7. Фильтр по атрибутам квестов
  filtered = applyQuestAttrsFilter(filtered, filters.questAttrs);

  return filtered;
}

/**
 * Применяет временной фильтр
 */
function applyTimeFilter(
  objects: GuruObjectWithDistance[],
  time: GuruFilters['time']
): GuruObjectWithDistance[] {
  if (time === 'all') return objects;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  
  // Выходные: ближайшие суббота и воскресенье
  const dayOfWeek = now.getDay();
  const daysUntilSaturday = dayOfWeek === 0 ? 6 : 6 - dayOfWeek;
  const saturday = new Date(today.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
  const sunday = new Date(saturday.getTime() + 24 * 60 * 60 * 1000);
  const monday = new Date(sunday.getTime() + 24 * 60 * 60 * 1000);

  return objects.filter((obj) => {
    // Для мест: проверяем isOpen
    if (obj.type === 'place') {
      const place = obj as PlaceObject;
      if (time === 'now') {
        return place.isOpen === true;
      }
      return true; // Места показываем всегда для today/weekend
    }

    // Для событий: проверяем дату
    if (obj.type === 'event') {
      const event = obj as EventObject;
      const eventStart = new Date(event.startDate);

      switch (time) {
        case 'now':
          return event.isHappeningNow === true;
        case 'today':
          return eventStart >= today && eventStart < tomorrow;
        case 'weekend':
          return eventStart >= saturday && eventStart < monday;
        default:
          return true;
      }
    }

    // Для людей: проверяем isAvailableNow
    if (obj.type === 'person') {
      const person = obj as PersonObject;
      if (time === 'now') {
        return person.isAvailableNow === true;
      }
      return true;
    }

    // Жильё и квесты показываем всегда
    return true;
  });
}

/**
 * Применяет фильтр по атрибутам мест
 */
function applyPlaceAttrsFilter(
  objects: GuruObjectWithDistance[],
  attrs: GuruFilters['placeAttrs']
): GuruObjectWithDistance[] {
  const hasActiveFilters = Object.values(attrs).some(Boolean);
  if (!hasActiveFilters) return objects;

  return objects.filter((obj) => {
    if (obj.type !== 'place') return true; // Пропускаем не-места

    const place = obj as PlaceObject;

    if (attrs.wifi && !place.hasWifi) return false;
    if (attrs.powerOutlets && !place.hasPowerOutlets) return false;
    if (attrs.coffee && !place.hasCoffee) return false;
    if (attrs.quiet && !place.isQuiet) return false;
    if (attrs.kidFriendly && !place.isKidFriendly) return false;
    if (attrs.rfPartner && !place.isRF) return false;

    return true;
  });
}

/**
 * Применяет фильтр по атрибутам жилья
 */
function applyHousingAttrsFilter(
  objects: GuruObjectWithDistance[],
  attrs: GuruFilters['housingAttrs']
): GuruObjectWithDistance[] {
  const hasActiveFilters = Object.values(attrs).some((v) => v !== undefined);
  if (!hasActiveFilters) return objects;

  return objects.filter((obj) => {
    if (obj.type !== 'housing') return true; // Пропускаем не-жильё

    const housing = obj as HousingObject;

    if (attrs.priceLevel && housing.priceLevel !== attrs.priceLevel) return false;
    if (attrs.availableNow && !housing.availableNow) return false;

    return true;
  });
}

/**
 * Применяет фильтр по атрибутам людей
 */
function applyPersonAttrsFilter(
  objects: GuruObjectWithDistance[],
  attrs: GuruFilters['personAttrs']
): GuruObjectWithDistance[] {
  const hasActiveFilters = Object.values(attrs).some(Boolean);
  if (!hasActiveFilters) return objects;

  return objects.filter((obj) => {
    if (obj.type !== 'person') return true; // Пропускаем не-людей

    const person = obj as PersonObject;

    if (attrs.isMentor && !person.isMentor) return false;
    if (attrs.isGuide && !person.isGuide) return false;
    if (attrs.availableNow && !person.isAvailableNow) return false;

    return true;
  });
}

/**
 * Применяет фильтр по атрибутам квестов
 */
function applyQuestAttrsFilter(
  objects: GuruObjectWithDistance[],
  attrs: GuruFilters['questAttrs']
): GuruObjectWithDistance[] {
  const hasActiveFilters = Object.values(attrs).some((v) => v !== undefined);
  if (!hasActiveFilters) return objects;

  return objects.filter((obj) => {
    if (obj.type !== 'quest') return true; // Пропускаем не-квесты

    const quest = obj as QuestObject;

    if (attrs.level && quest.level !== attrs.level) return false;
    if (attrs.duration && quest.duration !== attrs.duration) return false;
    if (attrs.hasRewards && !quest.hasRewards) return false;

    return true;
  });
}

/**
 * Подсчитывает количество активных фильтров
 */
export function countActiveFilters(filters: GuruFilters): number {
  let count = 0;

  if (filters.searchQuery.trim()) count++;
  if (filters.radius !== 1000) count++;
  if (filters.types.length < 5) count++;
  if (filters.time !== 'all') count++;

  // Атрибуты мест
  Object.values(filters.placeAttrs).forEach((v) => {
    if (v) count++;
  });

  // Атрибуты жилья
  Object.values(filters.housingAttrs).forEach((v) => {
    if (v !== undefined) count++;
  });

  // Атрибуты людей
  Object.values(filters.personAttrs).forEach((v) => {
    if (v) count++;
  });

  // Атрибуты квестов
  Object.values(filters.questAttrs).forEach((v) => {
    if (v !== undefined) count++;
  });

  return count;
}

/**
 * Сериализует фильтры в URL query string
 */
export function filtersToQueryString(filters: GuruFilters): string {
  const params = new URLSearchParams();

  if (filters.searchQuery) params.set('q', filters.searchQuery);
  if (filters.radius !== 1000) params.set('radius', String(filters.radius));
  if (filters.types.length < 5) params.set('types', filters.types.join(','));
  if (filters.time !== 'all') params.set('time', filters.time);
  if (filters.sortMode !== 'proximity') params.set('sort', filters.sortMode);

  // Атрибуты мест
  const placeAttrs = Object.entries(filters.placeAttrs)
    .filter(([, v]) => v)
    .map(([k]) => k);
  if (placeAttrs.length) params.set('placeAttrs', placeAttrs.join(','));

  // Атрибуты жилья
  if (filters.housingAttrs.priceLevel) {
    params.set('housingPrice', String(filters.housingAttrs.priceLevel));
  }
  if (filters.housingAttrs.availableNow) {
    params.set('housingAvailable', '1');
  }

  // Атрибуты людей
  const personAttrs = Object.entries(filters.personAttrs)
    .filter(([, v]) => v)
    .map(([k]) => k);
  if (personAttrs.length) params.set('personAttrs', personAttrs.join(','));

  // Атрибуты квестов
  if (filters.questAttrs.level) {
    params.set('questLevel', filters.questAttrs.level);
  }
  if (filters.questAttrs.duration) {
    params.set('questDuration', String(filters.questAttrs.duration));
  }
  if (filters.questAttrs.hasRewards) {
    params.set('questRewards', '1');
  }

  return params.toString();
}

/**
 * Парсит фильтры из URL query string
 */
export function queryStringToFilters(queryString: string): Partial<GuruFilters> {
  const params = new URLSearchParams(queryString);
  const filters: Partial<GuruFilters> = {};

  const q = params.get('q');
  if (q) filters.searchQuery = q;

  const radius = params.get('radius');
  if (radius) filters.radius = Number(radius) as GuruFilters['radius'];

  const types = params.get('types');
  if (types) filters.types = types.split(',') as GuruFilters['types'];

  const time = params.get('time');
  if (time) filters.time = time as GuruFilters['time'];

  const sort = params.get('sort');
  if (sort) filters.sortMode = sort as GuruFilters['sortMode'];

  // Атрибуты мест
  const placeAttrs = params.get('placeAttrs');
  if (placeAttrs) {
    filters.placeAttrs = {};
    placeAttrs.split(',').forEach((attr) => {
      (filters.placeAttrs as Record<string, boolean>)[attr] = true;
    });
  }

  // Атрибуты жилья
  const housingPrice = params.get('housingPrice');
  const housingAvailable = params.get('housingAvailable');
  if (housingPrice || housingAvailable) {
    filters.housingAttrs = {};
    if (housingPrice) filters.housingAttrs.priceLevel = Number(housingPrice) as 1 | 2 | 3;
    if (housingAvailable) filters.housingAttrs.availableNow = true;
  }

  // Атрибуты людей
  const personAttrs = params.get('personAttrs');
  if (personAttrs) {
    filters.personAttrs = {};
    personAttrs.split(',').forEach((attr) => {
      (filters.personAttrs as Record<string, boolean>)[attr] = true;
    });
  }

  // Атрибуты квестов
  const questLevel = params.get('questLevel');
  const questDuration = params.get('questDuration');
  const questRewards = params.get('questRewards');
  if (questLevel || questDuration || questRewards) {
    filters.questAttrs = {};
    if (questLevel) filters.questAttrs.level = questLevel as 'beginner' | 'advanced' | 'expert';
    if (questDuration) filters.questAttrs.duration = Number(questDuration) as 15 | 30 | 60;
    if (questRewards) filters.questAttrs.hasRewards = true;
  }

  return filters;
}

