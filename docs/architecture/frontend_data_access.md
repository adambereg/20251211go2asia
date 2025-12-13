# Frontend Data Access Architecture — Архитектура доступа к данным

**Дата:** 2025-01-14  
**Роль:** Architect  
**Модуль:** Atlas Asia (Phase 1.1)

---

## 1. Обзор

Документ описывает архитектуру доступа к данным для фронтенд-модулей Go2Asia, на примере Atlas Asia. Архитектура обеспечивает:
- Единообразный доступ к API
- Типизацию данных
- Обработку ошибок
- Кэширование и офлайн-доступ
- Интеграцию с React Query

---

## 2. Структура API-слоя

### 2.1. Общая структура директорий

```
apps/go2asia-pwa-shell/
├── lib/
│   ├── api/
│   │   ├── client.ts          # Базовый HTTP-клиент
│   │   ├── types.ts           # Общие типы (ErrorResponse, ApiResponse)
│   │   ├── errors.ts          # Классы ошибок и обработка
│   │   └── atlas/
│   │       ├── types.ts       # Типы DTO для Atlas
│   │       ├── client.ts      # Atlas API методы
│   │       └── hooks.ts       # React Query hooks для Atlas
│   └── hooks/
│       └── useRole.ts         # Существующий хук
```

---

## 3. Базовый HTTP-клиент

### 3.1. Файл: `lib/api/client.ts`

**Назначение:** Единая точка для всех HTTP-запросов к backend API.

**Функциональность:**
- Настройка baseUrl из `NEXT_PUBLIC_API_URL`
- Таймаут запросов (по умолчанию 10 секунд)
- Автоматическое добавление заголовков (Authorization, Content-Type)
- Обработка ошибок (network, 4xx, 5xx)
- Типизация запросов и ответов

**Пример реализации:**

```typescript
// lib/api/client.ts
import { ApiError, NetworkError, TimeoutError } from './errors';

export interface RequestConfig extends RequestInit {
  timeout?: number;
}

const DEFAULT_TIMEOUT = 10000; // 10 секунд

async function fetchWithTimeout(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { timeout = DEFAULT_TIMEOUT, ...fetchConfig } = config;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TimeoutError('Request timeout');
    }
    throw new NetworkError('Network request failed');
  }
}

export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetchWithTimeout(url, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API error: ${response.statusText}`,
        await response.json().catch(() => ({}))
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError || error instanceof NetworkError || error instanceof TimeoutError) {
      throw error;
    }
    throw new NetworkError('Unknown error occurred');
  }
}
```

---

## 4. Обработка ошибок

### 4.1. Файл: `lib/api/errors.ts`

**Назначение:** Классы ошибок и утилиты для обработки.

**Классы ошибок:**
- `NetworkError` — ошибки сети (нет соединения, таймаут)
- `ApiError` — ошибки API (4xx, 5xx)
- `TimeoutError` — таймаут запроса
- `ValidationError` — ошибки валидации (400)

**Пример:**

```typescript
// lib/api/errors.ts
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, data?: unknown) {
    super(400, message, data);
    this.name = 'ValidationError';
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}
```

---

## 5. Типы данных

### 5.1. Файл: `lib/api/types.ts`

**Назначение:** Общие типы для API-ответов.

```typescript
// lib/api/types.ts
export interface ApiResponse<T> {
  status: 'ok' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
```

### 5.2. Файл: `lib/api/atlas/types.ts`

**Назначение:** Типы DTO для Atlas модуля.

```typescript
// lib/api/atlas/types.ts
export interface Country {
  id: string;
  slug: string;
  name: string;
  name_en?: string;
  region: string;
  short_description: string;
  hero_image_url?: string;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  country_id: string;
  slug: string;
  name: string;
  name_en?: string;
  short_description: string;
  hero_image_url?: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface Place {
  id: string;
  city_id: string;
  country_id: string;
  slug: string;
  name: string;
  type: string;
  categories: string[];
  tags?: string[];
  short_description: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  hero_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CountryPageData {
  country: Country;
  content: {
    overview?: string;
    history?: string;
    geography?: string;
    culture?: string;
    living?: string;
    visas?: string;
    business?: string;
  };
  cities: City[];
}

export interface CityPageData {
  city: City;
  content: {
    overview?: string;
    districts?: Array<{
      id: string;
      name: string;
      description: string;
    }>;
  };
  featured_places: Place[];
  other_places?: Place[];
}

export interface PlacePageData {
  place: Place;
  description?: string;
  rating_summary?: {
    average_rating: number;
    ratings_count: number;
  };
}
```

---

## 6. Atlas API клиент

### 6.1. Файл: `lib/api/atlas/client.ts`

**Назначение:** Методы для работы с Atlas API.

```typescript
// lib/api/atlas/client.ts
import { apiClient } from '../client';
import { ApiResponse } from '../types';
import type {
  Country,
  City,
  Place,
  CountryPageData,
  CityPageData,
  PlacePageData,
} from './types';

export interface GetCountriesParams {
  active_only?: boolean;
  region?: string;
}

export interface GetCitiesParams {
  country_id?: string;
  active_only?: boolean;
}

export interface GetPlacesParams {
  city_id?: string;
  type?: string[];
  categories?: string[];
  tags?: string[];
  has_rf_only?: boolean;
  has_quests_only?: boolean;
  has_events_only?: boolean;
}

export const atlasApi = {
  // Countries
  async getCountries(params?: GetCountriesParams): Promise<Country[]> {
    const queryParams = new URLSearchParams();
    if (params?.active_only !== undefined) {
      queryParams.append('active_only', String(params.active_only));
    }
    if (params?.region) {
      queryParams.append('region', params.region);
    }
    
    const response = await apiClient<ApiResponse<{ countries: Country[] }>>(
      `/api/atlas/v1/countries?${queryParams.toString()}`
    );
    
    return response.data?.countries || [];
  },

  async getCountry(countryId: string): Promise<CountryPageData> {
    const response = await apiClient<ApiResponse<CountryPageData>>(
      `/api/atlas/v1/countries/${countryId}`
    );
    
    if (!response.data) {
      throw new Error('Country not found');
    }
    
    return response.data;
  },

  // Cities
  async getCities(params?: GetCitiesParams): Promise<City[]> {
    const queryParams = new URLSearchParams();
    if (params?.country_id) {
      queryParams.append('country_id', params.country_id);
    }
    if (params?.active_only !== undefined) {
      queryParams.append('active_only', String(params.active_only));
    }
    
    const response = await apiClient<ApiResponse<{ cities: City[] }>>(
      `/api/atlas/v1/cities?${queryParams.toString()}`
    );
    
    return response.data?.cities || [];
  },

  async getCity(cityId: string): Promise<CityPageData> {
    const response = await apiClient<ApiResponse<CityPageData>>(
      `/api/atlas/v1/cities/${cityId}`
    );
    
    if (!response.data) {
      throw new Error('City not found');
    }
    
    return response.data;
  },

  // Places
  async getPlaces(params?: GetPlacesParams): Promise<Place[]> {
    const queryParams = new URLSearchParams();
    if (params?.city_id) {
      queryParams.append('city_id', params.city_id);
    }
    if (params?.type) {
      params.type.forEach(t => queryParams.append('type', t));
    }
    if (params?.categories) {
      params.categories.forEach(c => queryParams.append('categories', c));
    }
    if (params?.has_rf_only) {
      queryParams.append('has_rf_only', 'true');
    }
    if (params?.has_quests_only) {
      queryParams.append('has_quests_only', 'true');
    }
    if (params?.has_events_only) {
      queryParams.append('has_events_only', 'true');
    }
    
    const response = await apiClient<ApiResponse<{ places: Place[] }>>(
      `/api/atlas/v1/places?${queryParams.toString()}`
    );
    
    return response.data?.places || [];
  },

  async getPlace(placeId: string): Promise<PlacePageData> {
    const response = await apiClient<ApiResponse<PlacePageData>>(
      `/api/atlas/v1/places/${placeId}`
    );
    
    if (!response.data) {
      throw new Error('Place not found');
    }
    
    return response.data;
  },
};
```

---

## 7. React Query Hooks

### 7.1. Файл: `lib/api/atlas/hooks.ts`

**Назначение:** React Query hooks для Atlas API.

**Преимущества:**
- Автоматическое кэширование
- Автоматическая инвалидация
- Loading и error states
- Retry логика
- Refetch при фокусе/реконнекте

```typescript
// lib/api/atlas/hooks.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { atlasApi } from './client';
import type {
  Country,
  City,
  Place,
  CountryPageData,
  CityPageData,
  PlacePageData,
  GetCountriesParams,
  GetCitiesParams,
  GetPlacesParams,
} from './types';

// Query keys
export const atlasKeys = {
  all: ['atlas'] as const,
  countries: () => [...atlasKeys.all, 'countries'] as const,
  country: (id: string) => [...atlasKeys.countries(), id] as const,
  cities: (params?: GetCitiesParams) => [...atlasKeys.all, 'cities', params] as const,
  city: (id: string) => [...atlasKeys.all, 'cities', id] as const,
  places: (params?: GetPlacesParams) => [...atlasKeys.all, 'places', params] as const,
  place: (id: string) => [...atlasKeys.all, 'places', id] as const,
};

// Hooks
export function useCountries(params?: GetCountriesParams, options?: UseQueryOptions<Country[]>) {
  return useQuery({
    queryKey: atlasKeys.countries(),
    queryFn: () => atlasApi.getCountries(params),
    staleTime: 24 * 60 * 60 * 1000, // 24 часа
    ...options,
  });
}

export function useCountry(countryId: string, options?: UseQueryOptions<CountryPageData>) {
  return useQuery({
    queryKey: atlasKeys.country(countryId),
    queryFn: () => atlasApi.getCountry(countryId),
    enabled: !!countryId,
    staleTime: 24 * 60 * 60 * 1000, // 24 часа
    ...options,
  });
}

export function useCities(params?: GetCitiesParams, options?: UseQueryOptions<City[]>) {
  return useQuery({
    queryKey: atlasKeys.cities(params),
    queryFn: () => atlasApi.getCities(params),
    staleTime: 6 * 60 * 60 * 1000, // 6 часов
    ...options,
  });
}

export function useCity(cityId: string, options?: UseQueryOptions<CityPageData>) {
  return useQuery({
    queryKey: atlasKeys.city(cityId),
    queryFn: () => atlasApi.getCity(cityId),
    enabled: !!cityId,
    staleTime: 6 * 60 * 60 * 1000, // 6 часов
    ...options,
  });
}

export function usePlaces(params?: GetPlacesParams, options?: UseQueryOptions<Place[]>) {
  return useQuery({
    queryKey: atlasKeys.places(params),
    queryFn: () => atlasApi.getPlaces(params),
    staleTime: 60 * 60 * 1000, // 1 час
    ...options,
  });
}

export function usePlace(placeId: string, options?: UseQueryOptions<PlacePageData>) {
  return useQuery({
    queryKey: atlasKeys.place(placeId),
    queryFn: () => atlasApi.getPlace(placeId),
    enabled: !!placeId,
    staleTime: 60 * 60 * 1000, // 1 час
    ...options,
  });
}
```

---

## 8. Кэширование и офлайн-доступ

### 8.1. React Query кэширование

**Настройка в `app/providers.tsx`:**
- `staleTime`: время, в течение которого данные считаются свежими
- `gcTime`: время хранения в кэше после unmount
- `refetchOnWindowFocus`: автоматический refetch при фокусе
- `refetchOnReconnect`: автоматический refetch при восстановлении соединения

**Стратегия для Atlas:**
- Страны: `staleTime: 24h` (редко меняются)
- Города: `staleTime: 6h` (меняются реже)
- Места: `staleTime: 1h` (могут обновляться чаще)

### 8.2. Service Worker кэширование

**Файл:** `app/sw.js/route.ts` (расширение существующего)

**Стратегия:**
- **Cache First** для просмотренных страниц (офлайн-доступ)
- **Network First** для новых запросов (свежие данные)

**Реализация:**

```typescript
// Обновлённый Service Worker
const ATLAS_CACHE_NAME = 'go2asia-atlas-v1';
const MAX_CACHED_COUNTRIES = 5;
const MAX_CACHED_CITIES = 10;
const MAX_CACHED_PLACES = 20;

// Кэширование просмотренных страниц
async function cacheAtlasPage(request: Request, response: Response) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/atlas/countries/')) {
    // Кэшируем страницу страны
    const cache = await caches.open(ATLAS_CACHE_NAME);
    await cache.put(request, response.clone());
    
    // Ограничиваем количество кэшированных стран
    const keys = await cache.keys();
    const countryKeys = keys.filter(k => k.url.includes('/atlas/countries/'));
    if (countryKeys.length > MAX_CACHED_COUNTRIES) {
      await cache.delete(countryKeys[0]);
    }
  }
  
  // Аналогично для городов и мест
}

// Обработка fetch с Cache First для просмотренных страниц
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/atlas/')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Пробуем обновить в фоне
          fetch(event.request).then((response) => {
            if (response.ok) {
              cacheAtlasPage(event.request, response);
            }
          }).catch(() => {});
          
          return cachedResponse;
        }
        
        // Network First для новых запросов
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cacheAtlasPage(event.request, response);
          }
          return response;
        }).catch(() => {
          // Fallback на кэш, если сеть недоступна
          return caches.match(event.request);
        });
      })
    );
  }
});
```

### 8.3. Уведомление об офлайне

**Компонент:** `components/atlas/OfflineNotification.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';

export function OfflineNotification() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 text-center">
      <p>Вы в режиме офлайн. Показываются кэшированные данные.</p>
    </div>
  );
}
```

---

## 9. Error Boundaries

### 9.1. Глобальный Error Boundary

**Файл:** `components/ErrorBoundary.tsx`

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Что-то пошло не так</h1>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message || 'Произошла ошибка'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg"
              >
                Перезагрузить страницу
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

### 9.2. Использование в layout

```typescript
// app/atlas/layout.tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```

---

## 10. Структура страниц Atlas

### 10.1. App Router структура

```
app/
├── atlas/
│   ├── layout.tsx              # Layout с ErrorBoundary
│   ├── page.tsx                # Главная страница Atlas
│   ├── countries/
│   │   ├── page.tsx           # Список стран
│   │   └── [id]/
│   │       └── page.tsx       # Страница страны
│   ├── cities/
│   │   ├── page.tsx           # Список городов
│   │   └── [id]/
│   │       └── page.tsx       # Страница города
│   └── places/
│       ├── page.tsx           # Список мест
│       └── [id]/
│           └── page.tsx       # Страница места
```

### 10.2. Пример страницы (Server Component)

```typescript
// app/atlas/countries/page.tsx
import { useCountries } from '@/lib/api/atlas/hooks';
import { CountriesList } from '@/components/atlas/CountriesList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function CountriesPage() {
  const { data: countries, isLoading, error } = useCountries();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!countries || countries.length === 0) {
    return <div>Страны не найдены</div>;
  }

  return <CountriesList countries={countries} />;
}
```

---

## 11. Резюме архитектурных решений

### 11.1. Преимущества

1. **Единообразие:** Все API-запросы идут через один клиент
2. **Типизация:** Полная типизация TypeScript для всех DTO
3. **Кэширование:** React Query + Service Worker для офлайн-доступа
4. **Обработка ошибок:** Централизованная обработка через классы ошибок
5. **Переиспользование:** Hooks можно использовать в любом компоненте

### 11.2. Ограничения MVP

- Mock данные допускаются для демонстрации
- Базовая интеграция карт (Leaflet или статическая)
- Ограниченное количество кэшируемых страниц (5/10/20)

### 11.3. Будущие улучшения

- Background sync для обновления кэша
- Оптимистичные обновления (для будущих мутаций)
- Infinite scroll для списков
- Виртуализация длинных списков

---

## 12. Связанные документы

- `docs/ops/phase1_atlas_requirements.md` — требования
- `docs/modules/atlas/api_contracts.md` — контракты API
- `docs/modules/atlas/data_model.md` — модель данных
- `docs/architecture/fe_architecture.md` — общая архитектура фронтенда

---

**Дата создания:** 2025-01-14  
**Версия:** 1.0  
**Статус:** ✅ Готово для передачи Planner




