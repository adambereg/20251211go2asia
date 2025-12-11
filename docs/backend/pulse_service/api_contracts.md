# Pulse Service — API Contracts

Pulse Service предоставляет REST API для работы с событиями: афиша, архив, фильтрация, интеграция с другими модулями.

---

## 1. Общие принципы

- Формат ответов — JSON.
- Публичные `GET` эндпоинты доступны без авторизации (по продуктовой стратегии).
- Операции создания/редактирования требуют JWT токен от User Service с соответствующей ролью (PRO, PARTNER, EDITOR, ADMIN).
- Параметры постраничности:
  - `page` (>=1), `page_size` (по умолчанию 20, максимум 100),  
    или
  - `limit` / `offset` (для интеграций).

---

## 2. Список событий

### GET `/api/pulse/v1/events`

Возвращает список событий с фильтрами.

**Параметры (query):**

- География:
  - `country_id`
  - `city_id`
  - `place_id`
- Время:
  - `date_from` (ISO date / datetime)
  - `date_to` (ISO date / datetime)
  - `mode` — предустановки: `today`, `tomorrow`, `weekend`, `upcoming`, `past`.
- Категории и теги:
  - `category_id`
  - `tags` — список (через запятую).
- Статус/тип:
  - `status` — `upcoming` / `past` / `all` (по умолчанию `upcoming` = `published` и `starts_at >= now()`).
  - `free_only` — bool.
  - `rf_only` — bool (события от RF-партнёров).
- Прочее:
  - `q` — строка поиска (название, описание).
  - `sort` — `starts_at_asc` (по умолчанию), `starts_at_desc`, `popular` (Фаза 2).
  - `page`, `page_size` или `limit`, `offset`.

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "phu-quoc-sunset-tour-2025-01-01",
      "title": "Sunset-тур по Фукуоку",
      "subtitle": "Закат и ужин у моря",
      "city_id": "phu-quoc",
      "place_id": "long-beach",
      "category_id": "tour",
      "starts_at": "2025-01-01T16:00:00+07:00",
      "ends_at": "2025-01-01T20:00:00+07:00",
      "is_free": false,
      "min_price": 500000,
      "max_price": 1200000,
      "currency": "VND",
      "rf_badge": true,
      "featured": true
    }
  ],
  "total": 42,
  "page": 1,
  "page_size": 20
}
```

---

## 3. Детали события

### GET `/api/pulse/v1/events/{id}`

Возвращает полную информацию о событии.

**Ответ (пример):**
```json
{
  "id": "phu-quoc-sunset-tour-2025-01-01",
  "slug": "phu-quoc-sunset-tour-2025-01-01",
  "title": "Sunset-тур по Фукуоку",
  "subtitle": "Закат и ужин у моря",
  "description_short": "Вечерний тур с встречей заката и ужином.",
  "description_full": "Полное описание программы тура...",
  "category_id": "tour",
  "tags": ["sunset", "boat", "seafood"],
  "starts_at": "2025-01-01T16:00:00+07:00",
  "ends_at": "2025-01-01T20:00:00+07:00",
  "timezone": "Asia/Ho_Chi_Minh",
  "status": "published",
  "country_id": "vn",
  "city_id": "phu-quoc",
  "place_id": "long-beach",
  "is_online": false,
  "online_url": null,
  "is_free": false,
  "min_price": 500000,
  "max_price": 1200000,
  "currency": "VND",
  "organizer_user_id": "user-uuid",
  "organizer_partner_id": "partner-uuid",
  "organizer_name": "Phu Quoc Sunset Tours",
  "rf_badge": true,
  "featured": true,
  "cover_image_url": "https://cdn.go2asia/pulse/events/sunset-tour.jpg",
  "created_at": "2024-12-01T10:00:00Z",
  "updated_at": "2024-12-10T10:00:00Z",
  "published_at": "2024-12-10T10:00:00Z"
}
```

---

## 4. События рядом (для Guru)

### GET `/api/pulse/v1/events/nearby`

Используется Guru Service для получений событий вокруг координат.

**Параметры:**

- `lat` (обязательно)
- `lng` (обязательно)
- `radius` — радиус в метрах (по умолчанию 3000)
- `time_window` — `now`, `today`, `upcoming` (по умолчанию `upcoming`)
- `category_id` (опц.)
- `rf_only` (опц.)

**Ответ:**
```json
[
  {
    "id": "phu-quoc-sunset-tour-2025-01-01",
    "title": "Sunset-тур по Фукуоку",
    "distance_m": 850,
    "starts_at": "2025-01-01T16:00:00+07:00",
    "category_id": "tour",
    "city_id": "phu-quoc",
    "place_id": "long-beach",
    "rf_badge": true
  }
]
```

---

## 5. Категории и теги

### GET `/api/pulse/v1/categories`

Возвращает список категорий событий.

**Ответ:**
```json
[
  { "id": "concert", "name": "Концерты" },
  { "id": "tour", "name": "Туры и экскурсии" },
  { "id": "meetup", "name": "Встречи и митапы" }
]
```

### GET `/api/pulse/v1/tags`

(опционально на MVP, если нужен отдельный справочник)

---

## 6. Админ/Организатор API

### POST `/api/pulse/v1/events`

Создание события (черновик).

**Требует авторизации** (роль PRO/EDITOR/PARTNER/ADMIN).

**Пример тела запроса:**
```json
{
  "title": "Sunset-тур по Фукуоку",
  "description_short": "Вечерний тур с закатом и ужином.",
  "description_full": "Расширенное описание программы...",
  "category_id": "tour",
  "tags": ["sunset", "boat"],
  "starts_at": "2025-01-01T16:00:00+07:00",
  "ends_at": "2025-01-01T20:00:00+07:00",
  "timezone": "Asia/Ho_Chi_Minh",
  "country_id": "vn",
  "city_id": "phu-quoc",
  "place_id": "long-beach",
  "is_online": false,
  "is_free": false,
  "min_price": 500000,
  "max_price": 1200000,
  "currency": "VND",
  "organizer_partner_id": "partner-uuid",
  "organizer_name": "Phu Quoc Sunset Tours"
}
```

**Ответ:**
```json
{
  "id": "phu-quoc-sunset-tour-2025-01-01",
  "status": "draft"
}
```

---

### PATCH `/api/pulse/v1/events/{id}`

Обновление события (если статус `draft` или `published`, с ограничениями).

---

### POST `/api/pulse/v1/events/{id}/publish`

Публикация события.

- Проверка обязательных полей (даты, место или `online_url`).
- Статус: `draft` → `published`.

**Сайд-эффекты:**

- публикация события в Event Bus: `pulse.event_published`;
- возможные пуши/уведомления подписчикам (через Notification Service, Фаза 2).

---

### POST `/api/pulse/v1/events/{id}/cancel`

Отмена события.

- статус: `published` → `cancelled`;
- публикация события `pulse.event_cancelled`.

---

### POST `/api/pulse/v1/events/{id}/feature`

(Фаза 2 — только редакторы/админы) — пометить событие как рекомендованное (`featured`).

---

## 7. Пользовательские эндпоинты (Фаза 2)

### GET `/api/pulse/v1/my/events`

Личные события пользователя (как организатора или участника).

**Параметры:**

- `role` — `organizer` / `attendee` / `favorite`.
- `status` — фильтр по статусу.

---

## 8. Event Bus (события)

Pulse публикует события в шину:

- `pulse.event_created`
- `pulse.event_updated`
- `pulse.event_published`
- `pulse.event_cancelled`
- `pulse.event_finished` (по наступлению `ends_at`, может быть асинхронный джоб)
- (Фаза 2) `pulse.event_attendance_changed`

**Пример сообщения:**
```json
{
  "event": "pulse.event_published",
  "timestamp": "2025-01-01T08:00:00Z",
  "payload": {
    "event_id": "phu-quoc-sunset-tour-2025-01-01",
    "city_id": "phu-quoc",
    "starts_at": "2025-01-01T16:00:00+07:00",
    "rf_badge": true
  }
}
```

Эти события используют:

- Guru Service — обновляет свой кеш событий “рядом”.
- Space/Content Service — создаёт/обновляет чаты и посты про событие (Фаза 2).
- Quest Service — валидирует шаги квестов, основанные на посещении событий.
- Connect / Token Service — начисляет награды активным организаторам.

---

## 9. Версионирование

- Текущая версия API: **v1** (`/api/pulse/v1/...`).
- Ломающие изменения → **v2** с сохранением старой версии на период миграции.

---

## 10. Статус документа

Файл является единым источником правды по API Pulse Service.  
Любые изменения в коде должны быть отражены здесь.
