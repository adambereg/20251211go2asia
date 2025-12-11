# RF Service — Search & Filtering

## Каталог партнёров

Основной endpoint: `GET /api/rf/v1/catalog/partners`.

### Фильтры

- География:
  - `country_id`
  - `city_id`
- Тип и формат:
  - `category` — `cafe`, `restaurant`, `hotel`, `tour_agency` и т.п.
  - `tags` — массив тегов (кухня, атмосфера, особенности).
- Статус и уровень:
  - `rf_level` — приоритетные “gold/platinum” партнёры.
  - `is_verified` — только проверенные.
- Локация:
  - `near_lat`, `near_lng`, `radius_km` — поиск рядом.
- Ваучеры:
  - `has_premium_vouchers=true` — для отображения премиум-оферов.
  - `has_basic_vouchers=true`.

### Сортировка

- `rating_desc` — по среднему рейтингу (по умолчанию).
- `popular` — по количеству визитов/редемпшенов.
- `distance` — по расстоянию от пользователя (если заданы координаты).
- `newest` — по дате активации партнёра.

### Пагинация

- `page`, `page_size` (стандарт, по умолчанию `page=1`, `page_size=20`).

---

## Поиск по внутренним API

- `GET /internal/partners/{id}/basic`:
  - используется как точечный запрос, без сложной фильтрации.
- Возможное расширение:
  - `GET /internal/partners/by-location` — поиск по `atlas_place_id` или bbox.

---

## Индексация

Рекомендованные индексы:

- `country_id, city_id, category, rf_level`.
- GIN-индекс по `tags`.
- Гео-индекс по координатам PartnerLocation (PostGIS).
