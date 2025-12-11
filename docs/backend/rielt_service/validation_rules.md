# Rielt Service — Validation Rules

## Объявление (Listing)

- `listing_type`:
  - одно из: `rent_long`, `rent_short`, `sale` (если используется).
- `title`:
  - обязательный,
  - длина: 5–200 символов.
- `description`:
  - обязательный для публичных объявлений,
  - длина: до 10–20k символов.
- `currency`:
  - допустимые коды (whitelist: `VND`, `THB`, `USD`, `KZT`, `RUB` и т.п. — список фиксируется отдельно).
- `price_per_month` / `price_per_day`:
  - ≥ 0,
  - обязательно одно из полей в зависимости от `listing_type`.
- `bedrooms`, `bathrooms`:
  - ≥ 0, разумные лимиты (например, ≤ 20).
- `area_sqm`:
  - ≥ 0, ≤ 1000 (чтобы отсеять бессмысленные значения).
- `furnished`:
  - `no`, `partial`, `full`.

Статусы:

- `status` может изменяться только по допустимым переходам:
  - `draft` → `published` / `archived`.
  - `published` → `paused` / `archived` / `booked` / `rented`.
  - `paused` → `published` / `archived`.
  - `booked` → `rented` / `published`.
  - `rented` → `archived`.
- Только автор/админ может менять статус.

## Объект (PropertyObject)

- `country_id`, `city_id`:
  - обязательны для всех публичных объявлений.
- `lat` / `lng`:
  - валидные координаты, если заданы.
- `amenities`:
  - только из списка допустимых значений (wifi, ac, washing_machine, …).

## Заявки (TenantRequest)

- `message`:
  - опционально, max 5000 символов.
- `desired_move_in_date`:
  - дата в будущем или ближайшем прошлом (по бизнес-правилам).
- `desired_term_months`:
  - ≥ 1, разумный максимум (например, ≤ 60).
- Изменение статуса:
  - `new` → `viewed` / `in_dialog` / `rejected`.
  - `in_dialog` → `approved` / `rejected`.
  - Арендатор может поставить `cancelled_by_tenant` из `new`/`in_dialog`.

## Избранное

- Дубликаты:
  - не допускаются (уникальный индекс по `user_id + listing_id`).

## Общие правила

- Все ID — UUID-формат.
- Строковые поля — нормализовать (trim пробелы, ограничивать длину).
- Для публичных API:
  - скрывать поля, не предназначенные для клиентов (например, внутренние moderator-flags, если появятся).
