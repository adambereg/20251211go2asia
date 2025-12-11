# 🎨 Frontend Playbook Go2Asia v2

> **Полное руководство по фронтенд-разработке экосистемы Go2Asia с мультиагентной архитектурой**

**Версия:** 2.0  
**Дата:** 2025-01-14  
**Статус:** Активно

---

## 📋 Содержание

1. [Введение](#1-введение)
2. [Архитектура фронтенда Go2Asia v2](#2-архитектура-фронтенда-go2asia-v2)
3. [UI Design System v2](#3-ui-design-system-v2)
4. [UX-паттерны](#4-ux-паттерны)
5. [Карточная библиотека (Card Pattern Library)](#5-карточная-библиотека-card-pattern-library)
6. [Правила миграции UI из архивной капсулы](#6-правила-миграции-ui-из-архивной-капсулы)
7. [Правила для мультиагентной разработки](#7-правила-для-мультиагентной-разработки)
8. [Стандарты кода](#8-стандарты-кода)
9. [API-интеграция](#9-api-интеграция)
10. [Примеры](#10-примеры)

---

## 1. Введение

### 1.1 Роль Playbook в мультиагентной разработке

Frontend Playbook — это **единый источник правды** для всех AI агентов, работающих над фронтендом Go2Asia v2. Документ определяет:

- ✅ **Стандарты разработки** — как создавать новые компоненты и страницы
- ✅ **Архитектурные принципы** — структура Feature Capsules и модулей
- ✅ **UI/UX паттерны** — единые паттерны для всех модулей
- ✅ **Правила миграции** — как переносить код из архивной капсулы
- ✅ **Процессы работы** — порядок действий для агентов

### 1.2 Принцип работы с архивной капсулой

**Ключевой принцип:**

> **Старый UI — источник знаний, новый UI — новая архитектура**

Архивная капсула (`capsules/frontend-shell/`) содержит:
- ✅ **UX-паттерны** — как должны выглядеть страницы
- ✅ **Композиции компонентов** — структура и расположение элементов
- ✅ **Дизайн-токены** — цвета, типографика, отступы
- ✅ **Типы данных** — структура данных для модулей

**НЕ переносим:**
- ❌ Импорты и пути к файлам
- ❌ Моки данных
- ❌ Старую систему аутентификации
- ❌ Устаревшие хуки и паттерны

### 1.3 Назначение для агентов

#### Architect Agent
- Использует Playbook для проектирования новых модулей
- Определяет структуру Feature Capsules
- Планирует интеграцию с backend сервисами

#### Frontend Dev Agent
- Следует стандартам кода из Playbook
- Использует UI Design System v2
- Применяет UX-паттерны при создании страниц

#### Reviewer Agent
- Проверяет соответствие кода стандартам Playbook
- Валидирует использование дизайн-системы
- Контролирует правильность миграции

#### Worker Agent
- Выполняет задачи по шаблонам из Playbook
- Создаёт компоненты по стандартам
- Интегрирует данные через API

---

## 2. Архитектура фронтенда Go2Asia v2

### 2.1 Модель Feature Capsules

Go2Asia v2 использует архитектуру **Feature Capsules** — изолированных модулей с чёткими границами.

```
go2asia-monorepo/
├── apps/
│   └── go2asia-pwa-shell/     # Главное приложение
│       ├── app/               # Next.js App Router
│       │   ├── (public)/     # Публичные модули
│       │   │   ├── atlas/    # Feature Capsule: Atlas
│       │   │   ├── pulse/    # Feature Capsule: Pulse
│       │   │   ├── blog/     # Feature Capsule: Blog
│       │   │   └── ...
│       │   └── (authenticated)/ # Защищённые модули
│       │       └── connect/   # Feature Capsule: Connect
│       └── features/          # Feature Capsules (изолированные модули)
│           ├── atlas-ui/      # Atlas UI Feature Capsule
│           │   ├── components/
│           │   ├── hooks/
│           │   ├── types/
│           │   └── utils/
│           ├── pulse-ui/      # Pulse UI Feature Capsule
│           └── ...
├── packages/
│   ├── ui/                    # Shared UI компоненты
│   ├── design-system/         # Дизайн-система
│   ├── sdk/                   # API клиент
│   └── types/                 # Общие типы
└── services/                   # Backend микросервисы
    ├── atlas-service/
    ├── pulse-service/
    └── ...
```

### 2.2 Структура Feature Capsule

Каждая Feature Capsule изолирована и содержит:

```
features/atlas-ui/
├── components/          # UI компоненты модуля
│   ├── CountryCard.tsx
│   ├── CityCard.tsx
│   └── PlaceCard.tsx
├── hooks/               # React хуки модуля
│   ├── useCountries.ts
│   └── usePlaces.ts
├── types/               # TypeScript типы модуля
│   └── index.ts
├── utils/               # Утилиты модуля
│   └── formatters.ts
├── pages/               # Страницы модуля (опционально)
│   └── CountriesPage.tsx
└── index.ts             # Публичный API модуля
```

**Правила изоляции:**
- ✅ Feature Capsule может импортировать только из `packages/`
- ✅ Feature Capsule НЕ может импортировать из других Feature Capsules
- ✅ Общение между Capsules только через общие пакеты или через backend API

### 2.3 Связь UI ↔ Backend Services

```
┌─────────────────┐
│  Frontend UI    │
│  (Feature       │
│   Capsules)     │
└────────┬────────┘
         │ HTTP/GraphQL
         │
┌────────▼────────┐
│  API Gateway    │
│  (Cloudflare)   │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
┌───▼───┐ ┌──▼───┐  ┌───▼───┐  ┌───▼───┐
│ Atlas │ │Pulse│  │Content│  │ Token │
│Service│ │Service│ │Service│  │Service│
└───────┘ └──────┘  └───────┘  └───────┘
```

**Принципы:**
- UI получает данные через API Gateway
- Используется автогенерируемый SDK из OpenAPI
- Типы синхронизируются автоматически

### 2.4 Структура модулей

Каждый модуль экосистемы имеет свою Feature Capsule:

| Модуль | Feature Capsule | Backend Service | Роут |
|--------|----------------|-----------------|------|
| Atlas | `features/atlas-ui/` | `atlas-service` | `/atlas` |
| Pulse | `features/pulse-ui/` | `pulse-service` | `/pulse` |
| Blog | `features/blog-ui/` | `content-service` | `/blog` |
| Quest | `features/quest-ui/` | `quest-service` | `/quest` |
| RF | `features/rf-ui/` | `rf-service` | `/rf` |
| Rielt | `features/rielt-ui/` | `rielt-service` | `/rielt` |
| Space | `features/space-ui/` | `space-service` | `/space` |
| Guru | `features/guru-ui/` | `guru-service` | `/guru` |
| Connect | `features/connect-ui/` | `connect-service` | `/connect` |

### 2.5 Разделение кода

#### Модули (Feature Capsules)
- Изолированная логика модуля
- Компоненты, специфичные для модуля
- Хуки для работы с данными модуля

#### Страницы (App Router)
- Роутинг и метаданные
- Композиция компонентов из Feature Capsules
- Server Components для SEO

#### Компоненты (Shared UI)
- Переиспользуемые UI компоненты
- Базовые компоненты дизайн-системы
- Общие паттерны

#### Shared (Packages)
- Дизайн-система
- SDK для API
- Общие типы и утилиты

---

## 3. UI Design System v2

### 3.1 Дизайн-токены

**Расположение:** `packages/design-system/design-tokens.json`

**Структура токенов:**
```json
{
  "colors": {
    "brand": {
      "primary": "#0EA5E9",
      "primaryHover": "#0284C7"
    },
    "modules": {
      "atlas": { "from": "#0EA5E9", "to": "#0284C7" },
      "pulse": { "from": "#0EA5E9", "to": "#0284C7" },
      "rielt": { "from": "#10B981", "to": "#059669" },
      "quest": { "from": "#8B5CF6", "to": "#7C3AED" },
      "rf": { "from": "#3B82F6", "to": "#2563EB" },
      "connect": { "from": "#F59E0B", "to": "#D97706" }
    }
  },
  "typography": {
    "fontFamily": {
      "sans": ["Inter", "system-ui", "sans-serif"]
    }
  },
  "spacing": { ... },
  "shadows": { ... }
}
```

**Использование:**
```typescript
// В компонентах используй значения из токенов
import tokens from '@go2asia/design-system/tokens';

const primaryColor = tokens.colors.brand.primary;
```

### 3.2 Базовые UI-компоненты

Все базовые компоненты находятся в `packages/ui/`:

#### Button
```typescript
import { Button } from '@go2asia/ui';

<Button variant="primary" size="md">
  Кнопка
</Button>
```

**Варианты:** `primary`, `secondary`, `ghost`, `danger`  
**Размеры:** `sm`, `md`, `lg`

#### Card
```typescript
import { Card, CardHeader, CardContent, CardFooter } from '@go2asia/ui';

<Card>
  <CardHeader>Заголовок</CardHeader>
  <CardContent>Контент</CardContent>
  <CardFooter>Футер</CardFooter>
</Card>
```

#### Badge
```typescript
import { Badge } from '@go2asia/ui';

<Badge variant="success">Успех</Badge>
```

**Варианты:** `success`, `warning`, `error`, `info`, `default`

#### Skeleton
```typescript
import { Skeleton, SkeletonCard } from '@go2asia/ui';

<Skeleton className="h-4 w-32" />
<SkeletonCard />
```

#### SectionHeader
```typescript
import { SectionHeader } from '@go2asia/ui';

<SectionHeader
  title="Заголовок секции"
  description="Описание секции"
  action={<Button>Действие</Button>}
/>
```

### 3.3 Принципы отображения изображений

**Стандарты:**
- Используй `next/image` для оптимизации
- Обязательные `alt` атрибуты
- Lazy loading по умолчанию
- Placeholder для загрузки

```typescript
import Image from 'next/image';

<Image
  src={imageUrl}
  alt="Описание изображения"
  width={400}
  height={300}
  className="rounded-lg object-cover"
  placeholder="blur"
/>
```

### 3.4 Правила для карточек

**Структура карточки:**
```
┌─────────────────────────┐
│  [Изображение]          │
├─────────────────────────┤
│  Заголовок              │
│  Описание               │
│  [Метаданные]           │
│  [Действия]             │
└─────────────────────────┘
```

**Обязательные элементы:**
- Изображение (если есть)
- Заголовок
- Описание или краткая информация
- Метаданные (рейтинг, дата, локация и т.д.)

### 3.5 Layout-паттерны

#### Hero Section
```typescript
<section className="bg-gradient-to-br from-sky-500 to-sky-600 text-white py-12 lg:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      Заголовок
    </h1>
    <p className="text-lg text-white/90">
      Описание
    </p>
  </div>
</section>
```

#### Content Section
```typescript
<section className="py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SectionHeader title="Заголовок" />
    <div className="mt-8">
      {/* Контент */}
    </div>
  </div>
</section>
```

### 3.6 Стандарты типографики

**Заголовки:**
- **H1:** `text-3xl md:text-4xl lg:text-5xl font-bold`
- **H2:** `text-2xl md:text-3xl font-bold`
- **H3:** `text-xl md:text-2xl font-bold`

**Текст:**
- **Body:** `text-base leading-6`
- **Small:** `text-sm md:text-base leading-5`
- **Tiny:** `text-xs md:text-sm leading-4`

### 3.7 Цвета модулей

Каждый модуль имеет свой градиент для Hero секций:

| Модуль | Градиент | Классы Tailwind |
|--------|----------|-----------------|
| Atlas | Sky Blue | `from-sky-500 to-sky-600` |
| Pulse | Sky Blue | `from-sky-500 to-sky-600` |
| Blog | Sky Blue | `from-sky-500 to-sky-600` |
| Rielt | Emerald | `from-emerald-500 to-emerald-600` |
| Quest | Purple | `from-purple-500 to-purple-600` |
| RF | Blue | `from-blue-500 to-blue-600` |
| Connect | Amber | `from-amber-500 to-amber-600` |

---

## 4. UX-паттерны

### 4.1 Overview Page (Главная страница модуля)

**Назначение:** Показать обзор модуля, основные элементы, быстрый доступ.

**Структура:**
```
┌─────────────────────────────────┐
│  Hero Section                   │
│  (Градиент, заголовок, описание)│
├─────────────────────────────────┤
│  Быстрые фильтры                │
├─────────────────────────────────┤
│  Популярные элементы            │
│  [Card] [Card] [Card]           │
├─────────────────────────────────┤
│  Все элементы                   │
│  [Grid of Cards]                │
└─────────────────────────────────┘
```

**Пример:** `/atlas`, `/pulse`, `/blog`

### 4.2 Details Page (Детальная страница)

**Назначение:** Показать полную информацию об элементе.

**Структура:**
```
┌─────────────────────────────────┐
│  Hero Section                   │
│  (Изображение, заголовок)       │
├─────────────────────────────────┤
│  Tabs Navigation                │
│  [Обзор] [Детали] [Отзывы]     │
├─────────────────────────────────┤
│  Tab Content                    │
│  (Контент выбранной вкладки)    │
└─────────────────────────────────┘
```

**Пример:** `/atlas/countries/[id]`, `/pulse/[id]`, `/blog/[slug]`

### 4.3 List Page (Список элементов)

**Назначение:** Показать список элементов с фильтрацией и поиском.

**Структура:**
```
┌─────────────────────────────────┐
│  Search Bar                     │
├─────────────────────────────────┤
│  Filters                        │
│  [Chip] [Chip] [Chip]          │
├─────────────────────────────────┤
│  Results                        │
│  [Card] [Card] [Card]           │
│  [Card] [Card] [Card]           │
└─────────────────────────────────┘
```

**Пример:** `/atlas/countries`, `/atlas/cities`, `/rf`

### 4.4 Filter Page (Страница с фильтрами)

**Назначение:** Расширенная фильтрация и поиск.

**Структура:**
```
┌─────────────────────────────────┐
│  Search Header                  │
├──────────┬───────────────────────┤
│ Filters  │ Results               │
│ Sidebar  │ [Card] [Card]         │
│          │ [Card] [Card]         │
│          │                       │
└──────────┴───────────────────────┘
```

**Пример:** `/rielt/search`, `/atlas/places`

### 4.5 Hero Patterns

#### Standard Hero
```typescript
<section className="bg-gradient-to-br from-sky-500 to-sky-600 text-white py-12 lg:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
      Заголовок
    </h1>
    <p className="text-lg text-white/90 mb-6">
      Описание
    </p>
  </div>
</section>
```

#### Hero with Image
```typescript
<section className="relative h-64 md:h-96">
  <Image
    src={heroImage}
    alt="Hero"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/40 flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
        Заголовок
      </h1>
    </div>
  </div>
</section>
```

### 4.6 Content Blocks

#### Text Block
```typescript
<div className="prose prose-slate max-w-none">
  <h2>Заголовок</h2>
  <p>Текст контента...</p>
</div>
```

#### Media Block
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Image src={image1} alt="..." />
  <Image src={image2} alt="..." />
</div>
```

#### Stats Block
```typescript
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="text-center">
    <div className="text-2xl font-bold">100+</div>
    <div className="text-sm text-slate-600">Элементов</div>
  </div>
  {/* ... */}
</div>
```

### 4.7 Skeleton Loaders

**Использование:**
```typescript
import { Skeleton, SkeletonCard } from '@go2asia/ui';

{isLoading ? (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {items.map(item => <ItemCard key={item.id} item={item} />)}
  </div>
)}
```

---

## 5. Карточная библиотека (Card Pattern Library)

### 5.1 PlaceCard (Карточка места)

**Использование:** Atlas, Guru

**Обязательные элементы:**
- Изображение места
- Название места
- Локация (город, страна)
- Рейтинг (если есть)
- Краткое описание

**Пример:**
```typescript
<Card className="overflow-hidden">
  <div className="relative h-48">
    <Image
      src={place.image}
      alt={place.name}
      fill
      className="object-cover"
    />
  </div>
  <CardContent className="p-4">
    <h3 className="text-xl font-bold mb-2">{place.name}</h3>
    <p className="text-sm text-slate-600 mb-2">
      {place.city}, {place.country}
    </p>
    {place.rating && (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm">{place.rating}</span>
      </div>
    )}
  </CardContent>
</Card>
```

### 5.2 EventCard (Карточка события)

**Использование:** Pulse

**Обязательные элементы:**
- Дата события (badge overlay)
- Название события
- Локация
- Время
- Организатор (если есть)
- Бейджи (verified, free, russian-friendly)

**Пример:**
```typescript
<Card className="relative overflow-hidden">
  <div className="absolute top-2 right-2 z-10">
    <Badge variant="default">{formatDate(event.startDate)}</Badge>
  </div>
  {event.cover && (
    <div className="relative h-32">
      <Image src={event.cover} alt={event.title} fill className="object-cover" />
    </div>
  )}
  <CardContent className="p-4">
    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
    <p className="text-sm text-slate-600 mb-2">
      {event.location?.name}
    </p>
    <div className="flex items-center gap-2 flex-wrap">
      {event.badges?.map(badge => (
        <Badge key={badge} variant="info">{badge}</Badge>
      ))}
    </div>
  </CardContent>
</Card>
```

### 5.3 ArticleCard (Карточка статьи)

**Использование:** Blog

**Обязательные элементы:**
- Изображение статьи
- Заголовок
- Автор и дата
- Время чтения
- Категория
- Краткое описание

**Пример:**
```typescript
<Card className="overflow-hidden">
  <div className="relative h-48">
    <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
  </div>
  <CardContent className="p-4">
    <Badge variant="info" className="mb-2">{article.category}</Badge>
    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
    <p className="text-sm text-slate-600 mb-2 line-clamp-2">
      {article.excerpt}
    </p>
    <div className="flex items-center gap-4 text-xs text-slate-500">
      <span>{article.author}</span>
      <span>{formatDate(article.publishedAt)}</span>
      <span>{article.readTime} мин</span>
    </div>
  </CardContent>
</Card>
```

### 5.4 PartnerCard (Карточка партнёра)

**Использование:** Russian Friendly

**Обязательные элементы:**
- Логотип/изображение партнёра
- Название
- Категория
- Рейтинг
- Средний чек
- Локация
- Бейдж "Russian Friendly"

**Пример:**
```typescript
<Card className="overflow-hidden">
  <div className="relative h-40">
    <Image src={partner.coverImage} alt={partner.name} fill className="object-cover" />
    {partner.russianFriendly && (
      <div className="absolute top-2 left-2">
        <Badge variant="success">Russian Friendly</Badge>
      </div>
    )}
  </div>
  <CardContent className="p-4">
    <h3 className="text-lg font-bold mb-1">{partner.name}</h3>
    <Badge variant="default" className="mb-2">{partner.category}</Badge>
    <div className="flex items-center gap-2 mb-2">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-sm">{partner.rating}</span>
      <span className="text-sm text-slate-500">({partner.reviewsCount})</span>
    </div>
    <p className="text-xs text-slate-600">{partner.address.city}</p>
  </CardContent>
</Card>
```

### 5.5 ListingCard (Карточка объявления)

**Использование:** Rielt

**Обязательные элементы:**
- Галерея изображений
- Цена
- Тип недвижимости
- Характеристики (комнаты, площадь)
- Локация
- Дата публикации

**Пример:**
```typescript
<Card className="overflow-hidden">
  <div className="relative h-48">
    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
    <div className="absolute top-2 right-2">
      <Badge variant="info">{listing.type}</Badge>
    </div>
  </div>
  <CardContent className="p-4">
    <div className="text-2xl font-bold mb-2">
      {listing.price} {listing.currency}
    </div>
    <h3 className="text-lg font-bold mb-2">{listing.title}</h3>
    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
      <span>{listing.bedrooms} спален</span>
      <span>{listing.bathrooms} ванных</span>
      <span>{listing.area} м²</span>
    </div>
    <p className="text-xs text-slate-500">{listing.location.address}</p>
  </CardContent>
</Card>
```

### 5.6 QuestCard (Карточка квеста)

**Использование:** Quest

**Обязательные элементы:**
- Обложка квеста
- Название
- Тип квеста
- Сложность
- Длительность
- Награды (поинты, NFT)
- Бейджи (RF, offline, season)

**Пример:**
```typescript
<Card className="overflow-hidden">
  <div className="relative h-40">
    <Image src={quest.coverPhoto} alt={quest.title} fill className="object-cover" />
    <div className="absolute top-2 left-2 flex gap-2">
      {quest.badges.map(badge => (
        <Badge key={badge.type} variant="info">{badge.label}</Badge>
      ))}
    </div>
  </div>
  <CardContent className="p-4">
    <h3 className="text-lg font-bold mb-2">{quest.title}</h3>
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="default">{quest.type}</Badge>
      <Badge variant={getDifficultyVariant(quest.difficulty)}>
        {quest.difficulty}
      </Badge>
    </div>
    <div className="flex items-center justify-between text-sm">
      <span>{quest.duration} мин</span>
      <span className="font-bold">{quest.rewards.points} поинтов</span>
    </div>
  </CardContent>
</Card>
```

### 5.7 PostCard (Карточка поста)

**Использование:** Space

**Обязательные элементы:**
- Аватар автора
- Имя автора
- Тип поста
- Контент (текст/медиа)
- Лайки и комментарии
- Время публикации

**Пример:**
```typescript
<Card>
  <CardHeader className="p-4">
    <div className="flex items-center gap-3">
      <Avatar src={post.author.avatar} alt={post.author.name} />
      <div>
        <div className="font-bold">{post.author.name}</div>
        <div className="text-xs text-slate-500">{formatTime(post.createdAt)}</div>
      </div>
    </div>
  </CardHeader>
  <CardContent className="p-4">
    <p className="mb-4">{post.content}</p>
    {post.media && (
      <div className="grid grid-cols-2 gap-2 mb-4">
        {post.media.map(media => (
          <Image key={media.id} src={media.url} alt="" width={200} height={200} />
        ))}
      </div>
    )}
    <div className="flex items-center gap-4 text-sm">
      <button className="flex items-center gap-1">
        <Heart className="w-4 h-4" />
        {post.likesCount}
      </button>
      <button className="flex items-center gap-1">
        <MessageCircle className="w-4 h-4" />
        {post.commentsCount}
      </button>
    </div>
  </CardContent>
</Card>
```

---

## 6. Правила миграции UI из архивной капсулы

### 6.1 Что можно переносить

#### ✅ Структуры и композиции
- Структура страниц (какие секции, в каком порядке)
- Композиция компонентов (как компоненты расположены)
- Иерархия информации (что важнее, что второстепенно)

#### ✅ UX-паттерны
- Паттерны навигации (табы, фильтры, поиск)
- Паттерны отображения данных (списки, карточки, детали)
- Паттерны взаимодействия (модалки, формы, действия)

#### ✅ Дизайн-токены
- Цвета модулей
- Типографика
- Отступы и размеры
- Тени и эффекты

#### ✅ Типы данных
- Интерфейсы данных (структура объектов)
- Enum типы
- Вспомогательные типы

### 6.2 Что нельзя переносить

#### ❌ Импорты и пути
```typescript
// БЫЛО (в капсуле):
import { Button } from '@go2asia/ui';
import { useGetCountries } from '@go2asia/sdk/atlas';

// СТАЛО (в новой архитектуре):
import { Button } from '@go2asia/ui'; // ✅ Можно, если пакет существует
import { useCountries } from '@/features/atlas-ui/hooks'; // ✅ Новый путь
```

#### ❌ Моки данных
```typescript
// БЫЛО (в капсуле):
import { mockCountries } from './mockData';
const countries = mockCountries;

// СТАЛО (в новой архитектуре):
const { data: countries } = useCountries(); // ✅ Реальный API
```

#### ❌ Старая аутентификация
```typescript
// БЫЛО (в капсуле):
import { useUser } from '@clerk/nextjs';

// СТАЛО (в новой архитектуре):
import { useAuth } from '@/features/auth/hooks'; // ✅ Новая система
```

#### ❌ Устаревшие хуки
```typescript
// БЫЛО (в капсуле):
const { data } = useGetCountries({ limit: 20 });

// СТАЛО (в новой архитектуре):
const { data } = useCountries({ limit: 20 }); // ✅ Новый хук
```

### 6.3 Формула Migration-Mode

**Шаг 1: Анализ**
1. Изучи страницу/компонент в капсуле
2. Определи структуру и композицию
3. Выдели UX-паттерны
4. Определи типы данных

**Шаг 2: Планирование**
1. Определи, какие компоненты нужны
2. Определи, какие хуки нужны
3. Определи структуру Feature Capsule
4. Составь план миграции

**Шаг 3: Создание структуры**
1. Создай Feature Capsule (если нужно)
2. Создай типы данных
3. Создай хуки для данных
4. Создай компоненты

**Шаг 4: Миграция паттернов**
1. Перенеси структуру страницы
2. Перенеси композицию компонентов
3. Примени дизайн-токены
4. Адаптируй под новую архитектуру

**Шаг 5: Интеграция данных**
1. Подключи реальные API
2. Замени моки на данные
3. Добавь обработку ошибок
4. Добавь loading состояния

**Шаг 6: Тестирование**
1. Проверь визуальное соответствие
2. Проверь функциональность
3. Проверь адаптивность
4. Проверь производительность

### 6.4 Примеры миграции

#### Пример 1: Миграция Overview страницы

**БЫЛО (в капсуле):**
```typescript
// app/(public)/atlas/page.tsx
import { AtlasHomeClient } from './AtlasHomeClient';

export default function AtlasPage() {
  return <AtlasHomeClient />;
}

// AtlasHomeClient.tsx
'use client';
import { useGetCountries } from '@go2asia/sdk/atlas';
import { mockCountries } from './mockData';

export function AtlasHomeClient() {
  const { data } = useGetCountries({ limit: 20 });
  const countries = data?.items || mockCountries;
  
  return (
    <div>
      <Hero />
      <CountriesList countries={countries} />
    </div>
  );
}
```

**СТАЛО (в новой архитектуре):**
```typescript
// app/(public)/atlas/page.tsx
import { AtlasOverviewPage } from '@/features/atlas-ui/pages';

export default function AtlasPage() {
  return <AtlasOverviewPage />;
}

// features/atlas-ui/pages/AtlasOverviewPage.tsx
'use client';
import { useCountries } from '../hooks';
import { Hero } from '../components/Hero';
import { CountriesList } from '../components/CountriesList';

export function AtlasOverviewPage() {
  const { data: countries, isLoading } = useCountries({ limit: 20 });
  
  return (
    <div>
      <Hero />
      <CountriesList countries={countries} isLoading={isLoading} />
    </div>
  );
}
```

#### Пример 2: Миграция карточки места

**БЫЛО (в капсуле):**
```typescript
// components/atlas/components/PlaceCard.tsx
import { Card } from '@go2asia/ui';

interface PlaceCardProps {
  place: {
    id: string;
    title: string;
    city: string;
    country: string;
    rating?: number;
  };
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Card>
      <h3>{place.title}</h3>
      <p>{place.city}, {place.country}</p>
      {place.rating && <div>{place.rating}</div>}
    </Card>
  );
}
```

**СТАЛО (в новой архитектуре):**
```typescript
// features/atlas-ui/components/PlaceCard.tsx
import { Card, CardContent } from '@go2asia/ui';
import Image from 'next/image';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden">
      {place.image && (
        <div className="relative h-48">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{place.name}</h3>
        <p className="text-sm text-slate-600 mb-2">
          {place.city}, {place.country}
        </p>
        {place.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{place.rating}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

#### Пример 3: Миграция фильтров

**БЫЛО (в капсуле):**
```typescript
// components/pulse/EventFilters.tsx
'use client';
import { useState } from 'react';

export function EventFilters() {
  const [timeFilter, setTimeFilter] = useState('all');
  
  return (
    <div>
      <button onClick={() => setTimeFilter('today')}>Сегодня</button>
      <button onClick={() => setTimeFilter('tomorrow')}>Завтра</button>
      {/* ... */}
    </div>
  );
}
```

**СТАЛО (в новой архитектуре):**
```typescript
// features/pulse-ui/components/EventFilters.tsx
'use client';
import { Chip } from '@go2asia/ui';
import { useEventFilters } from '../hooks';

export function EventFilters() {
  const { timeFilter, setTimeFilter } = useEventFilters();
  
  return (
    <div className="flex gap-2 flex-wrap">
      <Chip
        selected={timeFilter === 'today'}
        onClick={() => setTimeFilter('today')}
      >
        Сегодня
      </Chip>
      <Chip
        selected={timeFilter === 'tomorrow'}
        onClick={() => setTimeFilter('tomorrow')}
      >
        Завтра
      </Chip>
      {/* ... */}
    </div>
  );
}
```

---

## 7. Правила для мультиагентной разработки

### 7.1 Как агент должен анализировать старый код

**Шаг 1: Изучение структуры**
1. Открой файл в архивной капсуле
2. Изучи структуру компонента/страницы
3. Определи основные элементы
4. Выдели паттерны композиции

**Шаг 2: Выделение паттернов**
1. Определи тип страницы (Overview, Details, List)
2. Определи используемые карточки
3. Определи паттерны навигации
4. Определи паттерны фильтрации

**Шаг 3: Анализ данных**
1. Изучи типы данных
2. Определи источники данных
3. Определи необходимые API вызовы
4. Определи структуру Feature Capsule

### 7.2 Как агент должен создавать новую страницу

**Шаг 1: Планирование**
1. Определи структуру Feature Capsule
2. Определи необходимые компоненты
3. Определи необходимые хуки
4. Составь план реализации

**Шаг 2: Создание структуры**
1. Создай Feature Capsule (если нужно)
2. Создай типы данных
3. Создай хуки для данных
4. Создай базовые компоненты

**Шаг 3: Реализация страницы**
1. Создай страницу в App Router
2. Примени UX-паттерны из Playbook
3. Используй компоненты из дизайн-системы
4. Подключи данные через хуки

**Шаг 4: Интеграция**
1. Подключи реальные API
2. Добавь обработку ошибок
3. Добавь loading состояния
4. Добавь empty states

### 7.3 Порядок действий (Workflow)

```
1. Анализ
   ├── Изучение архивной капсулы
   ├── Выделение паттернов
   └── Определение структуры

2. Планирование
   ├── Определение Feature Capsule
   ├── Определение компонентов
   └── Составление плана

3. Создание структуры
   ├── Feature Capsule
   ├── Типы данных
   └── Хуки

4. Реализация
   ├── Компоненты
   ├── Страницы
   └── Интеграция данных

5. Тестирование
   ├── Визуальное соответствие
   ├── Функциональность
   └── Производительность

6. Ревью
   ├── Проверка стандартов
   ├── Проверка дизайн-системы
   └── Проверка архитектуры
```

### 7.4 Правила общения между агентами

#### Architect → Worker
```
Architect: "Создай Feature Capsule для модуля Atlas"
Worker: "Изучаю архивную капсулу, определяю структуру..."
Worker: "Создаю Feature Capsule: features/atlas-ui/"
Worker: "Создаю типы данных на основе капсулы"
Worker: "Создаю хуки для работы с API"
Worker: "Готово. Feature Capsule создана."
```

#### Worker → Reviewer
```
Worker: "Создал компонент PlaceCard"
Reviewer: "Проверяю соответствие стандартам..."
Reviewer: "✅ Использованы компоненты из дизайн-системы"
Reviewer: "✅ Применены правильные типы"
Reviewer: "✅ Соответствует карточному паттерну"
Reviewer: "Одобрено."
```

#### Frontend Dev → Architect
```
Frontend Dev: "Нужен новый паттерн для отображения карт"
Architect: "Изучаю требования..."
Architect: "Добавляю паттерн MapView в Playbook"
Architect: "Обновляю документацию"
Architect: "Паттерн добавлен в раздел UX-паттерны"
```

---

## 8. Стандарты кода

### 8.1 Структура файлов

#### Feature Capsule
```
features/[module]-ui/
├── components/          # UI компоненты
│   ├── [Component].tsx
│   └── index.ts
├── hooks/               # React хуки
│   ├── use[Resource].ts
│   └── index.ts
├── types/               # TypeScript типы
│   └── index.ts
├── utils/               # Утилиты
│   └── [utility].ts
├── pages/               # Страницы (опционально)
│   └── [Page].tsx
└── index.ts             # Публичный API
```

#### Страница в App Router
```
app/(public)/[module]/
├── page.tsx             # Server Component
├── [id]/
│   └── page.tsx        # Детальная страница
└── layout.tsx          # Layout модуля
```

### 8.2 Правила именования

#### Компоненты
- **PascalCase:** `PlaceCard.tsx`, `EventFilters.tsx`
- **Имена файлов:** совпадают с именем компонента

#### Хуки
- **camelCase с префиксом `use`:** `useCountries.ts`, `useEvents.ts`
- **Имена файлов:** совпадают с именем хука

#### Типы
- **PascalCase:** `Place`, `Event`, `Country`
- **Интерфейсы:** `PlaceCardProps`, `EventFiltersProps`

#### Утилиты
- **camelCase:** `formatDate.ts`, `filterEvents.ts`
- **Имена файлов:** совпадают с именем функции

### 8.3 Правила разделения по Feature Capsules

**Принцип:** Один модуль = одна Feature Capsule

**Правила:**
- ✅ Компоненты модуля находятся в `features/[module]-ui/components/`
- ✅ Хуки модуля находятся в `features/[module]-ui/hooks/`
- ✅ Типы модуля находятся в `features/[module]-ui/types/`
- ❌ Компоненты модуля НЕ находятся в `components/[module]/`
- ❌ Хуки модуля НЕ находятся в глобальных хуках

### 8.4 JSX-стандарты

#### Форматирование
```typescript
// ✅ Правильно
<Card className="overflow-hidden">
  <CardContent className="p-4">
    <h3 className="text-xl font-bold">{title}</h3>
  </CardContent>
</Card>

// ❌ Неправильно
<Card className="overflow-hidden"><CardContent className="p-4"><h3 className="text-xl font-bold">{title}</h3></CardContent></Card>
```

#### Атрибуты
```typescript
// ✅ Правильно
<Image
  src={imageUrl}
  alt="Описание"
  width={400}
  height={300}
/>

// ❌ Неправильно
<Image src={imageUrl} alt="Описание" width={400} height={300} />
```

#### Условный рендеринг
```typescript
// ✅ Правильно
{isLoading ? (
  <SkeletonCard />
) : (
  <PlaceCard place={place} />
)}

// ✅ Правильно
{place.rating && (
  <div className="rating">{place.rating}</div>
)}
```

### 8.5 Tailwind-правила

#### Использование классов
```typescript
// ✅ Правильно - используй утилиты Tailwind
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">

// ❌ Неправильно - не создавай кастомные классы без необходимости
<div className="custom-card">
```

#### Адаптивность
```typescript
// ✅ Правильно - mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ❌ Неправильно - desktop-first
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

#### Цвета модулей
```typescript
// ✅ Правильно - используй цвета из дизайн-токенов
<div className="bg-gradient-to-br from-sky-500 to-sky-600">

// ❌ Неправильно - не используй произвольные цвета
<div className="bg-blue-500">
```

---

## 9. API-интеграция

### 9.1 Архитектура новых API

**Backend Services:**
- `atlas-service` - данные Atlas (страны, города, места)
- `pulse-service` - события и афиша
- `content-service` - статьи и контент
- `quest-service` - квесты и миссии
- `rf-service` - партнёры и ваучеры
- `rielt-service` - недвижимость
- `space-service` - социальная сеть
- `guru-service` - объекты на карте
- `connect-service` - кошелёк и достижения

**API Gateway:**
- Единая точка входа: `https://api.go2asia.space/v1/`
- Маршрутизация к сервисам
- Аутентификация и авторизация
- Rate limiting и кэширование

### 9.2 Правила для data-hooks

**Структура хука:**
```typescript
// features/atlas-ui/hooks/useCountries.ts
import { useQuery } from '@tanstack/react-query';
import { atlasApi } from '@go2asia/sdk';

export function useCountries(params?: { limit?: number }) {
  return useQuery({
    queryKey: ['countries', params],
    queryFn: () => atlasApi.getCountries(params),
  });
}
```

**Правила:**
- ✅ Хуки находятся в `features/[module]-ui/hooks/`
- ✅ Используют React Query для кэширования
- ✅ Типизированы через автогенерируемый SDK
- ✅ Обрабатывают ошибки

### 9.3 Как UI получает данные в v2

**Процесс:**
```
1. Компонент вызывает хук
   ↓
2. Хук использует React Query
   ↓
3. React Query проверяет кэш
   ↓
4. Если нет в кэше → запрос к API Gateway
   ↓
5. API Gateway маршрутизирует к сервису
   ↓
6. Сервис возвращает данные
   ↓
7. Данные кэшируются и возвращаются компоненту
```

**Пример:**
```typescript
// features/atlas-ui/components/CountriesList.tsx
'use client';
import { useCountries } from '../hooks';
import { CountryCard } from './CountryCard';
import { SkeletonCard } from '@go2asia/ui';

export function CountriesList() {
  const { data: countries, isLoading, error } = useCountries({ limit: 20 });
  
  if (isLoading) {
    return <SkeletonCard count={3} />;
  }
  
  if (error) {
    return <div>Ошибка загрузки</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {countries?.map(country => (
        <CountryCard key={country.id} country={country} />
      ))}
    </div>
  );
}
```

---

## 10. Примеры

### 10.1 Пример новой страницы (Overview)

```typescript
// app/(public)/atlas/page.tsx
import type { Metadata } from 'next';
import { AtlasOverviewPage } from '@/features/atlas-ui/pages';

export const metadata: Metadata = {
  title: 'Atlas Asia - Go2Asia',
  description: 'Исследуйте страны, города и места Юго-Восточной Азии',
};

export default function AtlasPage() {
  return <AtlasOverviewPage />;
}

// features/atlas-ui/pages/AtlasOverviewPage.tsx
'use client';
import { useCountries, usePopularPlaces } from '../hooks';
import { Hero } from '../components/Hero';
import { CountriesList } from '../components/CountriesList';
import { PopularPlaces } from '../components/PopularPlaces';
import { QuickFilters } from '../components/QuickFilters';

export function AtlasOverviewPage() {
  const { data: countries, isLoading: countriesLoading } = useCountries({ limit: 20 });
  const { data: popularPlaces, isLoading: placesLoading } = usePopularPlaces({ limit: 3 });
  
  return (
    <div>
      <Hero
        title="Atlas Asia"
        description="Энциклопедия мест Юго-Восточной Азии"
        gradient="from-sky-500 to-sky-600"
      />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickFilters />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Популярные места</h2>
            <PopularPlaces places={popularPlaces} isLoading={placesLoading} />
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Все страны</h2>
            <CountriesList countries={countries} isLoading={countriesLoading} />
          </div>
        </div>
      </section>
    </div>
  );
}
```

### 10.2 Пример карточки

```typescript
// features/atlas-ui/components/PlaceCard.tsx
import { Card, CardContent } from '@go2asia/ui';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {place.image && (
        <div className="relative h-48">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{place.name}</h3>
        <p className="text-sm text-slate-600 mb-2">
          {place.city}, {place.country}
        </p>
        {place.rating && (
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{place.rating}</span>
            {place.reviewsCount && (
              <span className="text-xs text-slate-500 ml-1">
                ({place.reviewsCount})
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 10.3 Пример подключения дизайн-системы

```typescript
// features/atlas-ui/components/Hero.tsx
import { ModuleIcon } from 'lucide-react';

interface HeroProps {
  title: string;
  description: string;
  gradient?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function Hero({ 
  title, 
  description, 
  gradient = 'from-sky-500 to-sky-600',
  icon: Icon = ModuleIcon 
}: HeroProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient} text-white py-12 lg:py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>
        </div>
        <p className="text-lg text-white/90">
          {description}
        </p>
      </div>
    </section>
  );
}
```

### 10.4 Пример feature-capsule структуры

```
features/atlas-ui/
├── components/
│   ├── Hero.tsx
│   ├── CountryCard.tsx
│   ├── CityCard.tsx
│   ├── PlaceCard.tsx
│   ├── CountriesList.tsx
│   ├── PopularPlaces.tsx
│   ├── QuickFilters.tsx
│   └── index.ts
├── hooks/
│   ├── useCountries.ts
│   ├── useCities.ts
│   ├── usePlaces.ts
│   ├── usePopularPlaces.ts
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   ├── formatters.ts
│   └── index.ts
├── pages/
│   ├── AtlasOverviewPage.tsx
│   ├── CountryDetailsPage.tsx
│   └── index.ts
└── index.ts
```

**Публичный API (`index.ts`):**
```typescript
// Экспорт компонентов
export { Hero, CountryCard, CityCard, PlaceCard } from './components';
export { CountriesList, PopularPlaces, QuickFilters } from './components';

// Экспорт хуков
export { useCountries, useCities, usePlaces } from './hooks';

// Экспорт типов
export type { Country, City, Place } from './types';

// Экспорт страниц
export { AtlasOverviewPage, CountryDetailsPage } from './pages';
```

---

## 📚 Дополнительные ресурсы

- [PHASE0_RESTART_PLAYBOOK.md](../planning/PHASE0_RESTART_PLAYBOOK.md) - Общий инженерный Playbook
- [Архивная капсула](../../capsules/frontend-shell/) - Референс UI из предыдущей версии
- [Дизайн-система](../../packages/design-system/) - Дизайн-токены и компоненты

---

**Версия:** 2.0  
**Дата:** 2025-01-14  
**Статус:** Активно  
**Для использования:** Вся команда разработки Go2Asia v2

