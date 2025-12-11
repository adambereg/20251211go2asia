# Rielt Service — Модель данных

## 1. PropertyObject (объект недвижимости)

Базовая сущность — физический объект (квартира/дом/апарт-отель и т.п.).

- `id` (uuid, pk)
- `owner_user_id` (uuid, fk → User Service) — владелец/управляющий (не всегда = автор объявления).
- `type` (enum):
  - `apartment`,
  - `house`,
  - `room`,
  - `studio`,
  - `villa`,
  - `condo`,
  - `other`.
- `title` (string) — краткое название “2-комн. квартира в центре”.
- `description` (text, nullable) — расширенное описание (для админки/агента).
- `country_id` (string) — код страны (atlas-совместимый).
- `city_id` (string) — идентификатор города (из Atlas).
- `area_name` (string, nullable) — район/микрорайон.
- `address_line` (string, nullable) — адрес (без излишне точных данных в публичке, по бизнес-правилам).
- `lat` / `lng` (float, nullable) — координаты (для карты).
- `is_partner_object` (bool, default: false) — если объект принадлежит Russian Friendly партнёру.
- `created_at`, `updated_at`.

Удобства (базовая денормализация, можно jsonb):

- `amenities` (jsonb / array<string>):
  - `wifi`, `air_conditioner`, `washing_machine`, `kitchen`, `parking`, `pool`, …

---

## 2. Listing (объявление)

Конкретное предложение аренды/продажи.

- `id` (uuid, pk)
- `property_object_id` (uuid, fk → PropertyObject)
- `author_user_id` (uuid, fk → User) — кто разместил объявление (владелец/агент).
- `listing_type` (enum):
  - `rent_long`,
  - `rent_short`,
  - `sale` (можно отложить, оставить как “будущее”).
- `title` (string)
- `description` (text)
- `currency` (string) — `VND`, `THB`, `USD`, …
- `price_per_month` (numeric, nullable)
- `price_per_day` (numeric, nullable)
- `price_total` (numeric, nullable) — для продажи/долгосрочной аренды, если нужно.
- `security_deposit` (numeric, nullable)
- `min_rental_term_months` (int, nullable)
- `max_rental_term_months` (int, nullable)
- `available_from` (date, nullable)
- `available_to` (date, nullable)

Параметры:

- `bedrooms` (int)
- `bathrooms` (int)
- `area_sqm` (numeric, nullable)
- `floor` (int, nullable)
- `total_floors` (int, nullable)
- `furnished` (enum): `no`, `partial`, `full`.

Медиа:

- `photos` (jsonb) — массив `{ "media_id": "uuid", "order": 1 }`.
- `video_tour_media_id` (string, nullable).

Статусы:

- `status` (enum):
  - `draft`,
  - `published`,
  - `paused`,
  - `archived`,
  - `booked`,
  - `rented`.
- `visibility` (enum):
  - `public`,
  - `registered_only`,
  - `hidden` (например, только по прямой ссылке).
- `created_at`, `updated_at`, `published_at`.

---

## 3. ListingContactPolicy (опционально)

Для некоторых объявлений контакты показываются сразу, для других — только после заявки.

- `listing_id` (fk)
- `show_contacts_immediately` (bool, default: true)
- `contact_phone` (string, nullable)
- `contact_telegram` (string, nullable)
- `contact_whatsapp` (string, nullable)
- `contact_email` (string, nullable)

(Можно вынести в отдельную таблицу, либо хранить в Listing как jsonb.)

---

## 4. TenantRequest (заявка арендатора)

Отклик/заявка на объявление.

- `id` (uuid, pk)
- `listing_id` (uuid, fk → Listing)
- `tenant_user_id` (uuid, fk → User) — кто подал заявку.
- `message` (text, nullable) — сопроводительное сообщение.
- `desired_move_in_date` (date, nullable)
- `desired_term_months` (int, nullable)
- `budget_per_month` (numeric, nullable) — если отличается от цены объявления.

Статусы:

- `status` (enum):
  - `new`,
  - `viewed`,
  - `in_dialog`,
  - `rejected`,
  - `approved`,
  - `cancelled_by_tenant`.
- `created_at`, `updated_at`.

---

## 5. SavedListing (избранное)

Списки избранных объявлений.

- `id` (uuid, pk)
- `user_id` (uuid, fk → User)
- `listing_id` (uuid, fk → Listing)
- `created_at`.

---

## 6. ListingViewStat (упрощённая статистика просмотров)

- `listing_id` (pk, fk → Listing)
- `views_total` (int)
- `views_last_30_days` (int)
- `last_view_at` (timestamp)

(Может быть реализовано как агрегация событий в Analytics/Logging, но базово можно хранить здесь.)

---

## Индексы

Рекомендуемые индексы:

- `property_object.city_id`, `property_object.country_id`.
- `listing.property_object_id`.
- `listing.status`, `listing.listing_type`, `listing.currency`.
- `listing.price_per_month`, `listing.price_per_day`.
- `listing.created_at`, `listing.published_at`.
- `tenant_request.listing_id`, `tenant_request.tenant_user_id`.
