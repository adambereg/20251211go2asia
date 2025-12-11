# Blog Asia — API Contracts

Версия 1.0

Документ описывает публичные и внутренние HTTP‑контракты модуля Blog Asia.
Фактическая реализация может быть инкапсулирована в Content Service, но контракты остаются стабильными для PWA‑клиентов.

---

## 1. Публичное API для PWA

### 1.1. Получить список статей (лента / подборки)

`GET /api/blog/articles`

Параметры query:

- `page` — номер страницы (по умолчанию 1).
- `page_size` — размер страницы (по умолчанию 20, максимум 50).
- `category` — slug рубрики (опционально).
- `tag` — slug тега (опционально, может быть несколько: `tag=visa&tag=digital-nomad`).
- `country` — id или slug страны Atlas (фильтр по связанным странам).
- `city` — id/slug города.
- `place` — id места.
- `sort` — `newest | popular | featured`.
- `search` — полнотекстовый поиск по заголовку/лиду/контенту.
- `only_featured` — `true/false` (вывод только выделенных статей для витрины).
- `series` — slug серии/хаба.

Пример ответа:

```json
{
  "page": 1,
  "page_size": 20,
  "total": 135,
  "items": [
    {
      "id": "a1",
      "slug": "10-luchshih-koworkingov-bangkoka",
      "title": "10 лучших коворкингов Бангкока",
      "subtitle": "Подборка проверенных мест для digital nomads",
      "cover_image_url": "https://cdn.go2asia.app/blog/a1.jpg",
      "reading_time_minutes": 7,
      "is_editorial": true,
      "is_partner": false,
      "published_at": "2025-12-01T10:00:00Z",
      "categories": [
        {"slug": "work-and-income", "name": "Работа и доход"}
      ],
      "tags": [
        {"slug": "digital-nomad", "name": "Digital nomad"}
      ],
      "countries": [
        {"id": "th", "name": "Таиланд"}
      ],
      "cities": [
        {"id": "bangkok", "name": "Бангкок"}
      ],
      "stats": {
        "views_total": 12345,
        "reactions_total": 320,
        "shares_total": 56
      }
    }
  ]
}
```

---

### 1.2. Получить одну статью

`GET /api/blog/articles/{slug}`

Параметры:

- `slug` — уникальный идентификатор статьи.

Опциональные query‑параметры:

- `include_related` — `true/false` (по умолчанию `true`).
- `include_seo` — `true/false`.

Пример ответа:

```json
{
  "id": "a1",
  "slug": "10-luchshih-koworkingov-bangkoka",
  "title": "10 лучших коворкингов Бангкока",
  "subtitle": "Подборка проверенных мест с быстрым Wi‑Fi...",
  "cover_image_url": "https://cdn.go2asia.app/blog/a1.jpg",
  "status": "published",
  "visibility": "public",
  "content_rich": { "type": "doc", "content": [/* ... */] },
  "reading_time_minutes": 7,
  "language": "ru",
  "is_editorial": true,
  "is_partner": false,
  "author": {
    "id": "u123",
    "display_name": "Мария PRO",
    "role": "PRO"
  },
  "countries": [
    {"id": "th", "name": "Таиланд"}
  ],
  "cities": [
    {"id": "bangkok", "name": "Бангкок"}
  ],
  "places": [
    {"id": "place1", "name": "Hubba"}
  ],
  "events": [],
  "quests": [],
  "partners": [],
  "series": [
    {"slug": "coworkings-asia", "title": "Коворкинги Азии"}
  ],
  "stats": {
    "views_total": 12345,
    "reactions_total": 320,
    "shares_total": 56
  },
  "seo": {
    "meta_title": "10 лучших коворкингов Бангкока — Blog Go2Asia",
    "meta_description": "Гид по коворкингам Бангкока для digital nomads...",
    "og_image_url": "https://cdn.go2asia.app/blog/a1-og.jpg"
  },
  "published_at": "2025-12-01T10:00:00Z",
  "updated_at": "2025-12-03T12:00:00Z"
}
```

---

### 1.3. Получить рубрики и теги

`GET /api/blog/categories`

```json
{
  "items": [
    {
      "slug": "travel",
      "name": "Путешествия",
      "description": "Маршруты, впечатления, советы по поездкам",
      "position": 1
    }
  ]
}
```

`GET /api/blog/tags`

Параметры:

- `search` — строка поиска.
- `category` — фильтр по категории тегов (например, `visa_type`).

---

### 1.4. Получить серии/хабы

`GET /api/blog/series`

Возвращает активные хабы и спецпроекты.

`GET /api/blog/series/{slug}`

Возвращает хаб + список статей внутри (с пагинацией).

---

## 2. Внутреннее API для редакторов и PRO‑кураторов

Эти маршруты доступны только через административный интерфейс (Space Admin / Backoffice).

### 2.1. Создать черновик статьи

`POST /internal/blog/articles`

Тело:

```json
{
  "title": "Черновик статьи",
  "subtitle": "Краткое описание",
  "content_rich": { "type": "doc", "content": [] },
  "language": "ru",
  "origin_post_id": "space_post_123",
  "category_slugs": ["travel"],
  "tag_slugs": ["digital-nomad"],
  "country_ids": ["th"],
  "city_ids": ["bangkok"]
}
```

Ответ:

```json
{
  "id": "a_new",
  "slug": "chernovik-stati",
  "status": "draft"
}
```

---

### 2.2. Обновить черновик / статью

`PUT /internal/blog/articles/{id}`

Поддерживает частичное обновление полей:
- `title`, `subtitle`, `content_rich`,
- `category_slugs`, `tag_slugs`,
- `country_ids`, `city_ids`, `place_ids`,
- `is_partner`, `is_editorial`,
- `seo` и др.

---

### 2.3. Публикация статьи

`POST /internal/blog/articles/{id}/publish`

Тело (опционально):

```json
{
  "published_at": "2025-12-01T10:00:00Z",
  "priority": 10,
  "featured_until": "2025-12-15T00:00:00Z"
}
```

Действия:

- меняет `status` на `published`,
- проставляет `published_at`,
- отправляет событие в Event Bus: `blog.article.published`.

---

### 2.4. Архивация / снятие с публикации

`POST /internal/blog/articles/{id}/archive`

Ставит статус `archived`, убирает из публичных выдач.

---

### 2.5. Управление редакционной очередью

`GET /internal/blog/editorial-queue`

Фильтры:
- `status`,
- `assigned_editor_id`,
- `origin_type`.

`POST /internal/blog/editorial-queue`

Создать карточку очереди (например, из Space‑поста или внешнего запроса).

`PATCH /internal/blog/editorial-queue/{id}`

Обновить статус, назначить редактора, добавить комментарии.

---

## 3. События и интеграция с другими сервисами

Blog Asia активно использует Event Bus для синхронизации и экономических наград.

### 3.1. Исходящие события

- `blog.article.published`
  - `article_id`
  - `author_id`
  - `is_partner`
  - `categories`, `tags`
  - `countries`, `cities`.

Используется:
- **Connect Service** — начисление Points/NFT автору и кураторам.
- **Notification Service** — уведомление подписчиков автора/тем.
- **Atlas/Pulse** — обновление блоков «Статьи по теме».

### 3.2. Входящие события

Blog Asia может реагировать на:

- `space.post.promoted_to_article`
  - создание черновика по посту/серии постов.
- `rf.partner.story_created`
  - создание партнёрского кейса/истории.
- `quest.completed` / `event.finished`
  - возможно, создание шаблонного черновика отчёта.

---

## 4. Авторизация и безопасность

- Публичные `/api/blog/...` — доступны без авторизации (read‑only).
- Внутренние `/internal/blog/...` — только через сервисный JWT и/или токен админ‑панели.
- Любые операции изменения статей логируются в Logging & Analytics Service (кто, когда, какие поля).
- Партнёрские материалы дополнительно помечаются атрибутами для CMP/юридического блока.