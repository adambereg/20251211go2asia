# Media Service — Поиск и фильтрация

## Цели

- Дать пользователю удобную навигацию по контенту:
  - ленты по рубрикам, темам, странам, городам;
  - поиск по словам и тегам.
- Поддержать интеграции (Atlas, Pulse, Guru):
  - быстрый поиск релевантных статей по локациям и событиям.

## Основные фильтры

1. **Статус**
   - для публичных лент — только `published`;
   - для админок — полный набор (`draft`, `pending_review`, `scheduled`, `rejected`, `archived`).

2. **Тип/категория**
   - `type` — `news`, `guide`, `story`, `review`, `opinion`, `ugc`;
   - `category_id` — рубрика блога.

3. **Геопривязка**
   - `country_id`, `city_id`, `place_id`;
   - для событий: `event_id`.

4. **Источник**
   - `source_type` — `editorial`, `pro`, `partner`, `ugc_space_post`;
   - `partner_id` — материалы конкретного партнёра;
   - `author_user_id`.

5. **Время**
   - `published_from`, `published_to`;
   - быстрые пресеты:
     - “последние 7 дней”,
     - “последний месяц”.

6. **Теги и темы**
   - `tags` — список через запятую;
   - в будущем — отдельные тематические хабы.

7. **Текстовый поиск**
   - `q` по:
     - `title`, `subtitle`, `description_short`, части `content`.

## Сортировка

- `published_at_desc` (по умолчанию) — свежие выше.
- `published_at_asc` — для хронологического просмотра.
- `popular` — по просмотрам/лайкам (Фаза 2–3).
- `featured` (в комбинации: сначала помеченные, потом остальные).

## Реализация поиска

### MVP (v1)

- Использование индексов Postgres:
  - `status`, `published_at`, `category_id`, `city_id`, `source_type`.
- Поиск по `q`:
  - ILIKE по `title`, `description_short` (и, частично, по `content`).

### Расширенный поиск (Фаза 2–3)

- Вынос в специализированный движок:
  - Meilisearch / OpenSearch:
    - индекс статей:
      - текстовые поля — поисковые,
      - `category_id`, `tags`, `language`, `country_id`, `city_id` — фильтруемые,
      - `published_at`, `views_count` — сортируемые.
- Обновление индекса:
  - при создании/обновлении/публикации статей.

## Особенности для интеграций

- **Atlas/Pulse/Guru**:
  - используют минимальный набор фильтров:
    - `status=published`,
    - `country_id`/`city_id`/`place_id`/`event_id`,
    - `limit` (обычно 3–10 статей).
- Ответы для виджетов должны быть лёгкими:
  - без `content`, только краткие карточки (title, slug, short, cover).  
