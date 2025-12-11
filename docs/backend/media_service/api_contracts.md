# Media Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/media/v1/`**

Media Service предоставляет REST API для работы со статьями блога, рубриками и тегами, а также для интеграции с другими модулями.

---

## 1. Общие принципы

- Формат ответов: **JSON**.
- Публичные `GET` эндпоинты (ленты и статьи со статусом `published`) доступны без авторизации.
- Создание/редактирование/модерация требуют JWT от User Service с соответствующими ролями.
- Постраничность:
  - `page` (>=1), `page_size` (по умолчанию 20, макс. 100)  
    или
  - `limit` / `offset` (для интеграций).

---

## 2. Лента статей

### GET `/api/media/v1/articles`

Возвращает список статей с фильтрами.

**Параметры (query):**

- Статус и тип:
  - `status` — `published` / `draft` / `pending_review` / `scheduled` / `archived` / `all`  
    (без авторизации разрешён только `published`).
  - `type` — `news`, `guide`, `story`, `review`, `opinion`, `ugc`.
- Классификация:
  - `category_id`
  - `tags` — список через запятую.
- Геопривязка:
  - `country_id`
  - `city_id`
  - `place_id`
  - `event_id`
- Источник:
  - `source_type` — `editorial`, `pro`, `partner`, `ugc_space_post`.
  - `partner_id`
  - `author_user_id`
- Время:
  - `published_from` (ISO datetime)
  - `published_to` (ISO datetime)
- Поиск/сорт:
  - `q` — текстовый поиск по заголовку/описанию.
  - `sort` — `published_at_desc` (по умолчанию), `published_at_asc`, `popular`.
- Постраничность:
  - `page`, `page_size` или `limit`, `offset`.

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "vietnam-longstay-guide",
      "slug": "vietnam-longstay-guide",
      "title": "Гайд: как уехать на зимовку во Вьетнам",
      "subtitle": "От виз до выбора города",
      "description_short": "Подробный гайд по зимовке во Вьетнаме...",
      "category_id": "guides",
      "type": "guide",
      "tags": ["vietnam", "longstay", "visa"],
      "language": "ru",
      "cover_image_url": "https://cdn.go2asia/blog/vn-guide.jpg",
      "published_at": "2025-01-10T08:00:00Z",
      "country_id": "vn",
      "city_id": null
    }
  ],
  "total": 128,
  "page": 1,
  "page_size": 20
}
```

---

## 3. Детали статьи

### GET `/api/media/v1/articles/{id_or_slug}`

`id_or_slug` — UUID или `slug` (поддержка обоих вариантов).

**Ответ (пример):**
```json
{
  "id": "vietnam-longstay-guide",
  "slug": "vietnam-longstay-guide",
  "title": "Гайд: как уехать на зимовку во Вьетнам",
  "subtitle": "От виз до выбора города",
  "description_short": "Подробный гайд по зимовке во Вьетнаме...",
  "content": "<p>Полный текст статьи...</p>",
  "type": "guide",
  "category_id": "guides",
  "tags": ["vietnam", "longstay", "visa"],
  "language": "ru",
  "cover_image_url": "https://cdn.go2asia/blog/vn-guide.jpg",
  "og_image_url": "https://cdn.go2asia/blog/vn-guide-og.jpg",
  "status": "published",
  "published_at": "2025-01-10T08:00:00Z",
  "scheduled_at": null,
  "source_type": "editorial",
  "author_user_id": "user-uuid",
  "author_display_name": "Редакция Go2Asia",
  "country_id": "vn",
  "city_id": null,
  "place_id": null,
  "event_id": null,
  "quest_id": null,
  "read_time_minutes": 12,
  "views_count": 10342,
  "likes_count": 480,
  "shares_count": 120,
  "created_at": "2024-12-20T10:00:00Z",
  "updated_at": "2024-12-25T10:00:00Z"
}
```

---

## 4. Ленты по контексту (Atlas / Pulse / Guru)

### GET `/api/media/v1/articles/by-location`

Подборка статей по локации (для Atlas и Guru).

**Параметры:**

- `country_id` (опц.)
- `city_id` (опц.)
- `place_id` (опц.)
- `limit` (по умолчанию 10, макс. 50)

**Ответ:** массив укороченных карточек статей.

---

### GET `/api/media/v1/articles/by-event`

Подборка статей по событию (для Pulse).

**Параметры:**

- `event_id` (обязательно)
- `limit`

---

## 5. Категории и теги

### GET `/api/media/v1/categories`

Список категорий.

```json
[
  { "id": "news", "name": "Новости" },
  { "id": "guides", "name": "Гайды" },
  { "id": "stories", "name": "Истории" }
]
```

### GET `/api/media/v1/tags`

(если реализован отдельный справочник)

---

## 6. Создание и редактирование статей

### POST `/api/media/v1/articles`

Создание статьи (черновик или `pending_review`).

**Требует авторизации** (роль `editor`, `admin`, либо `pro`/`partner` с ограничениями).

**Пример тела:**
```json
{
  "title": "Гайд: как уехать на зимовку во Вьетнам",
  "subtitle": "От виз до выбора города",
  "description_short": "Подробный гайд по зимовке во Вьетнаме...",
  "content": "<p>Полный текст статьи...</p>",
  "type": "guide",
  "category_id": "guides",
  "tags": ["vietnam", "longstay", "visa"],
  "language": "ru",
  "cover_image_url": "https://cdn.go2asia/blog/vn-guide.jpg",
  "country_id": "vn",
  "city_id": null,
  "place_id": null,
  "source_type": "editorial",
  "status": "draft"
}
```

**Ответ:**
```json
{
  "id": "vietnam-longstay-guide",
  "status": "draft"
}
```

---

### PATCH `/api/media/v1/articles/{id}`

Обновление статьи.  
Доступ зависит от роли и `status` (например, нельзя править чужую опубликованную статью без прав редактора).

---

### POST `/api/media/v1/articles/{id}/submit`

Отправка статьи на модерацию (PRO/partner → редакция).

- `status`: `draft` → `pending_review`.

---

### POST `/api/media/v1/articles/{id}/publish`

Публикация статьи.

- проверка обязательных полей (title, content, category, язык, минимум одна привязка или тема);
- `status`: `draft`/`pending_review`/`scheduled` → `published`;
- установка `published_at`, если не установлено.

**Сайд-эффекты:**

- публикация события в Event Bus: `media.article_published`;
- опциональный вызов Space/Content для создания анонса (Фаза 2);
- опциональный вызов Notification Service (рассылки/пуш-уведомления).

---

### POST `/api/media/v1/articles/{id}/schedule`

Планирование отложенной публикации:

**Body:**
```json
{
  "scheduled_at": "2025-01-10T08:00:00Z"
}
```

`status`: `draft` / `pending_review` → `scheduled`.

Фоновый воркер публикует статью в указанное время.

---

### POST `/api/media/v1/articles/{id}/reject`

Отклонение статьи модерацией.

- `status`: `pending_review` → `rejected`,
- (опц.) поле `reject_reason`.

---

### POST `/api/media/v1/articles/{id}/archive`

Архивация опубликованной статьи.

- `status`: `published` → `archived`.

---

## 7. Импорт UGC из Space (Фаза 2)

### POST `/api/media/v1/import/space-post`

Импортирует пост из Space/Content в виде статьи.

**Body:**
```json
{
  "space_post_id": "post-uuid",
  "category_id": "stories",
  "type": "ugc",
  "tags": ["vietnam", "digital-nomad"],
  "language": "ru"
}
```

- Media Service запрашивает Content Service, получает текст/медиа поста.
- Создаёт статью с `source_type = "ugc_space_post"`, `status = "pending_review"`.

---

## 8. Event Bus

Media Service публикует события:

- `media.article_created`
- `media.article_updated`
- `media.article_published`
- `media.article_archived`
- `media.article_popular` (Фаза 2–3, при достижении порогов популярности)

**Пример:**
```json
{
  "event": "media.article_published",
  "timestamp": "2025-01-10T08:00:00Z",
  "payload": {
    "article_id": "vietnam-longstay-guide",
    "slug": "vietnam-longstay-guide",
    "category_id": "guides",
    "language": "ru",
    "country_id": "vn",
    "city_id": null
  }
}
```

Эти события слушают:

- Guru (подборка новостей “рядом” по городу/стране),
- Space/Content (создать анонс),
- Connect/Token (начисление Points за популярный контент),
- Notification (уведомление подписчиков).

---

## 9. Версионирование

- Текущая версия: **v1** (`/api/media/v1/...`).
- Ломающие изменения → `v2` с параллельной поддержкой `v1` на период миграции.

---

## 10. Статус документа

Этот файл — **единый источник правды по API Media Service**.  
Любые изменения в коде должны быть отражены здесь.
