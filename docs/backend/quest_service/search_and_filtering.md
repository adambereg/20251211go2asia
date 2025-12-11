# Quest Service — Search & Filtering

## Основной endpoint каталога

`GET /api/quest/v1/catalog/quests`

### Фильтры

- **География**
  - `country_id`
  - `city_id`
- **Тип**
  - `quest_type` — одиночный/групповой.
  - `mode` — `location` / `online`.
- **Структура**
  - `structure_type` — `linear`, `open`, `campaign`.
- **Тематика**
  - `tags` — список тегов.
- **Связанные сущности**
  - `rf_partner_id` — квесты, где задействован конкретный RF-партнёр.
  - `atlas_place_id` — квесты, содержащие шаги в этом месте.
- **Доступность**
  - `available_now=true` — учитывает `start_at` / `end_at`.
- **Стоимость**
  - `price_min`, `price_max` (Points).

### Сортировка

- `popular` — по количеству завершённых прохождений.
- `newest` — по `published_at`.
- `price_asc` / `price_desc`.
- `duration_asc` / `duration_desc`.

### Пагинация

- `page` (1 по умолчанию),
- `page_size` (20 по умолчанию, максимум, например, 50).

---

## Поиск для Atlas вкладки “Городские прогулки и приключения”

- Atlas вызывает `GET /catalog/quests` с:
  - `city_id` = текущий город,
  - `mode=location`,
  - `available_now=true`.

---

## Индексы

Рекомендуемые индексы:

- по `city_id`, `mode`, `status`, `published_at`.
- GIN по `tags` (если нужны текстовые фильтры).
- по `primary_rf_partner_id` и `main_atlas_place_id`, если активно используются.
