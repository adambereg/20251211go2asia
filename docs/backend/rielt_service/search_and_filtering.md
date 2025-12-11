# Rielt Service — Search & Filtering

## Каталог (поиск объявлений)

Основная точка входа — `/api/rielt/v1/catalog`.

### Фильтры (MVP)

- География:
  - `country_id`,
  - `city_id`,
  - `area_name` (строка, частичное совпадение).
- Тип:
  - `listing_type` (`rent_long`, `rent_short`).
- Цена:
  - `min_price`, `max_price` — зависят от типа:
    - для `rent_long` → `price_per_month`,
    - для `rent_short` → `price_per_day`.
- Параметры:
  - `bedrooms_min`, `bedrooms_max`,
  - `bathrooms_min`,
  - `area_min`, `area_max`,
  - `furnished`.
- Удобства:
  - `amenities=wifi&amenities=air_conditioner` и т.п.
- Партнёрские объекты:
  - `is_partner_object=true` — фильтр/буст.

### Сортировка

- `sort=newest` — по `published_at DESC` (по умолчанию).
- `sort=price_asc`, `sort=price_desc`.
- В будущем:
  - `sort=popular` — по просмотрам/заявкам.

### Пагинация

- `page` (по умолчанию 1),
- `page_size` (по умолчанию 20, максимум 50).

---

## Карта

Endpoint `/catalog/map`:

- Возвращает минимальный набор:
  - `listing_id`, `lat`, `lng`, `price`, `bedrooms`, `is_partner_object`.
- Фильтры аналогичны `/catalog`,
- Дополнительно:
  - `bbox` или `lat/lng + radius`.

---

## Поиск по тексту (Фаза 2+)

- `q` — поиск по `title` и, возможно, `description` (ILIKE %q% или fulltext).
- Работает в связке с другими фильтрами (город/цена и т.п.).

---

## Админ-поиск

Отдельный endpoint (например, `/admin/listings`):

- Поиск объявлений для модерации/поддержки:
  - по `author_user_id`,
  - по статусу (`draft`, `published`, `archived`),
  - по диапазону дат создания,
  - по `city_id`, `country_id`.

