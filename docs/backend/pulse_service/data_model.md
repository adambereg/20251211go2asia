# Pulse Service — Модель данных

## Основные сущности

### 1. Event (Событие)

Базовая сущность Pulse.

Поля (v1):

- `id` (uuid) — уникальный идентификатор события.
- `slug` (string, unique per city) — человекочитаемый идентификатор для URL.
- `title` (string) — название события.
- `subtitle` (string, nullable) — подзаголовок.
- `description_short` (string) — короткое описание (для карточки/афиши).
- `description_full` (text) — полный текст.

- `category_id` (fk → EventCategory) — тип события (концерт, экскурсия, митап…).
- `tags` (array<string> или связь через EventTag) — дополнительные теги.

Время и статус:

- `starts_at` (timestamp with tz) — время начала.
- `ends_at` (timestamp with tz, nullable) — время окончания.
- `timezone` (string, IANA, напр. `Asia/Ho_Chi_Minh`).
- `status` (enum):
  - `draft`
  - `published`
  - `cancelled`
  - `finished`

Локация:

- `country_id` (string, fk → Atlas.Country.id)
- `city_id` (string, fk → Atlas.City.id)
- `place_id` (string, fk → Atlas.Place.id, nullable для онлайн-событий)
- `is_online` (bool, default false)
- `online_url` (string, nullable) — ссылка для онлайн-формата.

Организатор и источники:

- `organizer_user_id` (uuid, fk → UserService, nullable)
- `organizer_partner_id` (uuid, fk → RF Service, nullable)
- `organizer_name` (string) — отображаемое имя (для внешних организаторов).
- `source` (enum) — `editorial`, `pro`, `rf_partner`, `ugc`.

Монетизация:

- `is_free` (bool)
- `min_price` (numeric, nullable)
- `max_price` (numeric, nullable)
- `currency` (string, nullable, ISO-код, напр. `VND`).

Мета:

- `language` (string, напр. `ru`, `en`).
- `cover_image_url` (string, nullable).
- `rf_badge` (bool) — подсветка, что событие от RF-партнёра.
- `featured` (bool) — признак рекомендованного события.
- `created_by` (uuid, fk → UserService).
- `updated_by` (uuid, fk → UserService).
- `created_at`, `updated_at` (timestamps).
- `published_at` (timestamp, nullable).
- `cancelled_at` (timestamp, nullable).

### 2. EventCategory

- `id` (string) — машинный идентификатор, например `concert`, `tour`, `meetup`.
- `name` (string) — локализованное название категории.
- `slug` (string).
- `description` (string, nullable).
- `icon` (string, nullable).
- `order` (int) — сортировка.

### 3. EventTag (возможный отдельный справочник)

Если нужен явный справочник тегов:

- `id` (uuid)
- `name`
- `slug`
- связь многие-ко-многим `event_tags (event_id, tag_id)`.

На MVP теги могут храниться просто в массиве строк у Event.

### 4. EventMedia (Фаза 2)

Отдельная таблица для медиа:

- `id` (uuid)
- `event_id`
- `type` (image, video)
- `url`
- `order`

### 5. EventStats (Фаза 2)

Агрегированная статистика:

- `event_id`
- `views_count`
- `favorites_count`
- `attendees_count` (если будет учёт участия).

Эти данные могут приходить из Space/Content/Quest/Connect.

## Связи с другими сервисами

- **Atlas Service**:
  - `country_id`, `city_id`, `place_id` — ключевые связи с гео-слоем.
  - При показе события фронт/агрегаторы (Guru, Atlas) могут дергать Atlas для информации о месте.

- **User Service**:
  - `organizer_user_id`, `created_by`, `updated_by` — идентификация пользователей и PRO-организаторов.

- **RF Service**:
  - `organizer_partner_id` и флаг `rf_badge` — привязка к партнёрскому заведению.

- **Connect / Token Service** (Фаза 2):
  - события активности организаторов для расчёта Points/NFT.

- **Space / Content Service** (Фаза 2):
  - связь с чатами или постами события через внешние идентификаторы (например, `space_thread_id`).

## Индексы и оптимизация

Рекомендуемые индексы:

- `(city_id, starts_at, status)` — для списков событий по городу.
- `GIST/BTREE` по `(starts_at)` — для фильтров по времени.
- `GIN(tags)` — для поиска по тегам (если массив).
- `status` + `featured` — быстрый выбор рекомендованных событий.
- `place_id` — для связки с Atlas и интеграций с конкретной локацией.
