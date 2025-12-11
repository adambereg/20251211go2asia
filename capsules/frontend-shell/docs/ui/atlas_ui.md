# Atlas Asia - UI Документация

> **Документация UI модуля Atlas Asia - энциклопедия мест Юго-Восточной Азии**

**Версия:** 1.0  
**Дата:** 2025-01-14

---

## 📋 Обзор

Atlas Asia - модуль энциклопедии мест, стран, городов и гайдов Юго-Восточной Азии.

**Роут:** `/atlas`  
**Тип:** Публичный модуль (SSR/SSG для SEO)

---

## 🗺️ Структура страниц

### Главная страница

**Роут:** `/atlas`  
**Файл:** `app/(public)/atlas/page.tsx`  
**Компонент:** `AtlasHomeClient.tsx`

**Содержимое:**
- Hero секция с описанием модуля
- Список стран
- Популярные места
- Быстрые ссылки на инструменты

### Страны

**Роут:** `/atlas/countries` - список стран  
**Роут:** `/atlas/countries/[id]` - страница страны

**Подстраницы страны:**
- `/atlas/countries/[id]` - Обзор
- `/atlas/countries/[id]/visas` - Визы
- `/atlas/countries/[id]/living` - Жизнь
- `/atlas/countries/[id]/transport` - Транспорт
- `/atlas/countries/[id]/culture` - Культура
- `/atlas/countries/[id]/history` - История
- `/atlas/countries/[id]/geography` - География
- `/atlas/countries/[id]/places` - Места
- `/atlas/countries/[id]/cities` - Города
- `/atlas/countries/[id]/reviews` - Отзывы
- `/atlas/countries/[id]/gallery` - Галерея
- `/atlas/countries/[id]/map` - Карта
- `/atlas/countries/[id]/phrasebook` - Разговорник
- `/atlas/countries/[id]/weather` - Погода
- `/atlas/countries/[id]/business` - Бизнес
- `/atlas/countries/[id]/calculator` - Калькулятор стоимости жизни

### Города

**Роут:** `/atlas/cities` - список городов  
**Роут:** `/atlas/cities/[id]` - страница города

**Подстраницы города:**
- `/atlas/cities/[id]` - Обзор
- `/atlas/cities/[id]/districts` - Районы
- `/atlas/cities/[id]/places` - Места
- `/atlas/cities/[id]/accommodation` - Жильё
- `/atlas/cities/[id]/food` - Еда
- `/atlas/cities/[id]/nightlife` - Ночная жизнь
- `/atlas/cities/[id]/shopping` - Шопинг
- `/atlas/cities/[id]/transport` - Транспорт
- `/atlas/cities/[id]/guides` - Гайды
- `/atlas/cities/[id]/tips` - Советы
- `/atlas/cities/[id]/reviews` - Отзывы
- `/atlas/cities/[id]/budget` - Бюджет
- `/atlas/cities/[id]/weather` - Погода

### Места

**Роут:** `/atlas/places` - список мест  
**Роут:** `/atlas/places/[id]` - страница места

**Подстраницы места:**
- `/atlas/places/[id]` - Обзор
- `/atlas/places/[id]/gallery` - Галерея
- `/atlas/places/[id]/map` - Карта
- `/atlas/places/[id]/reviews` - Отзывы
- `/atlas/places/[id]/guides` - Гайды
- `/atlas/places/[id]/history` - История
- `/atlas/places/[id]/nearby-places` - Близкие места
- `/atlas/places/[id]/nearby-services` - Близкие сервисы
- `/atlas/places/[id]/partners` - Партнёры
- `/atlas/places/[id]/tips` - Советы

### Гайды

**Роут:** `/atlas/guides` - список гайдов  
**Роут:** `/atlas/guides/[id]` - страница гайда

**Подстраницы гайда:**
- `/atlas/guides/[id]` - Обзор
- `/atlas/guides/[id]/route` - Маршрут
- `/atlas/guides/[id]/places` - Места
- `/atlas/guides/[id]/events` - События
- `/atlas/guides/[id]/tips` - Советы
- `/atlas/guides/[id]/reviews` - Отзывы
- `/atlas/guides/[id]/map` - Карта
- `/atlas/guides/[id]/versions` - Версии

### Темы

**Роут:** `/atlas/themes` - список тем  
**Роут:** `/atlas/themes/[id]` - страница темы

**Подстраницы темы:**
- `/atlas/themes/[id]` - Обзор
- `/atlas/themes/[id]/places` - Места
- `/atlas/themes/[id]/guides` - Гайды
- `/atlas/themes/[id]/events` - События
- `/atlas/themes/[id]/countries` - Страны
- `/atlas/themes/[id]/reviews` - Отзывы
- `/atlas/themes/[id]/tips` - Советы
- `/atlas/themes/[id]/versions` - Версии

### Инструменты

**Роуты:**
- `/atlas/tools/calculators/cost-of-living` - Калькулятор стоимости жизни
- `/atlas/tools/calculators/visa` - Калькулятор виз
- `/atlas/tools/checklists/[slug]` - Чеклисты

---

## 🧩 Компоненты

### Расположение

Все компоненты находятся в `components/atlas/`

### Структура компонентов

```
components/atlas/
├── components/        # UI компоненты модуля
│   ├── CountryCard.tsx
│   ├── CityCard.tsx
│   ├── PlaceCard.tsx
│   └── ...
├── layouts/          # Layout компоненты
│   ├── CountryLayout.tsx
│   ├── CityLayout.tsx
│   └── ...
├── utils/            # Утилиты
│   └── ...
└── index.ts          # Экспорты
```

### Основные компоненты

#### CountryCard

Карточка страны:

```typescript
interface CountryCardProps {
  id: string;
  name: string;
  flag: string;
  placesCount: number;
  description: string;
  heroImage?: string;
}
```

#### CityCard

Карточка города:

```typescript
interface CityCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  image?: string;
}
```

#### PlaceCard

Карточка места:

```typescript
interface PlaceCardProps {
  id: string;
  title: string;
  city: string;
  country: string;
  rating?: number;
  reviewsCount?: number;
  image?: string;
}
```

---

## 🎨 Стилизация

### Цвета модуля

- **Градиент Hero:** `from-sky-500 to-sky-600`
- **Основной цвет:** `sky-500`
- **Hover:** `sky-600`

### Типографика

- **Заголовок модуля:** H1 (`text-3xl md:text-4xl lg:text-5xl`)
- **Заголовки секций:** H2 (`text-2xl md:text-3xl`)
- **Заголовки карточек:** H3 (`text-xl md:text-2xl`)

---

## 📚 Типы данных

### Основные типы

```typescript
interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  placesCount: number;
  heroImage?: string;
}

interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  image?: string;
}

interface Place {
  id: string;
  title: string;
  city: string;
  country: string;
  rating?: number;
  reviewsCount?: number;
  image?: string;
}
```

---

## 🔗 Интеграция с API

### Использование SDK

```typescript
import { useGetCountries, useGetPlaces } from '@go2asia/sdk/atlas';

const { data, isLoading } = useGetCountries({ limit: 20 });
```

### Замена моков

⚠️ **ВАЖНО:** В капсуле используются моки данных. При адаптации замените на реальные API вызовы:

```typescript
// БЫЛО (в капсуле):
const countries = mockCountries;

// СТАЛО (в новой архитектуре):
const { data: countries } = useGetCountries();
```

---

## 📝 Особенности реализации

### SEO оптимизация

- Все публичные страницы используют Server Components
- Метаданные для каждой страницы
- Sitemap включает все страны, города, места

### Карты

- Используется Leaflet для отображения карт
- Интеграция с местами из Atlas

### Фильтрация

- Фильтры по странам, городам, категориям
- Поиск по названию и описанию

---

## 🔗 Связанные документы

- [ui_structure.md](./ui_structure.md) - Общая структура UI
- [design_system.md](./design_system.md) - Дизайн-система

---

**Версия:** 1.0  
**Дата:** 2025-01-14

