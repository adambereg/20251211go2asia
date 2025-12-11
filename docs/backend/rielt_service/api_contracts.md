# Rielt Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/rielt/v1/`**

Rielt Service отвечает за объявления недвижимости (аренда/продажа), заявки арендаторов и базовый каталог объектов в экосистеме Go2Asia.

---

## 1. Объекты и объявления

### 1.1. POST `/api/rielt/v1/listings`

Создать объявление (при необходимости с созданием объекта).

**Требует авторизации.**

**Request (пример):**
```json
{
  "property": {
    "id": null,
    "type": "apartment",
    "country_id": "vn",
    "city_id": "phu-quoc",
    "area_name": "Long Beach",
    "address_line": "улица 30/4, дом 12",
    "lat": 10.212,
    "lng": 103.967,
    "amenities": ["wifi", "air_conditioner", "washing_machine"]
  },
  "listing": {
    "listing_type": "rent_long",
    "title": "2-комн. квартира у Long Beach",
    "description": "Светлая квартира в 5 минутах от моря...",
    "currency": "VND",
    "price_per_month": 15000000,
    "security_deposit": 15000000,
    "min_rental_term_months": 3,
    "available_from": "2025-01-10",
    "bedrooms": 2,
    "bathrooms": 1,
    "area_sqm": 60,
    "floor": 3,
    "total_floors": 7,
    "furnished": "full",
    "photos": [
      { "media_id": "uuid-photo-1", "order": 1 },
      { "media_id": "uuid-photo-2", "order": 2 }
    ],
    "visibility": "public"
  },
  "contact_policy": {
    "show_contacts_immediately": true,
    "contact_phone": "+84-123-456-789",
    "contact_telegram": "@owner_vn"
  }
}
```

**Response 201:**
```json
{
  "property": {
    "id": "property-uuid",
    "type": "apartment",
    "country_id": "vn",
    "city_id": "phu-quoc",
    "area_name": "Long Beach",
    "address_line": "улица 30/4, дом 12",
    "lat": 10.212,
    "lng": 103.967,
    "amenities": ["wifi", "air_conditioner", "washing_machine"],
    "created_at": "2025-01-01T10:00:00Z",
    "updated_at": "2025-01-01T10:00:00Z"
  },
  "listing": {
    "id": "listing-uuid",
    "property_object_id": "property-uuid",
    "listing_type": "rent_long",
    "title": "2-комн. квартира у Long Beach",
    "description": "Светлая квартира в 5 минутах от моря...",
    "currency": "VND",
    "price_per_month": 15000000,
    "security_deposit": 15000000,
    "min_rental_term_months": 3,
    "available_from": "2025-01-10",
    "bedrooms": 2,
    "bathrooms": 1,
    "area_sqm": 60,
    "floor": 3,
    "total_floors": 7,
    "furnished": "full",
    "photos": [
      { "media_id": "uuid-photo-1", "order": 1 },
      { "media_id": "uuid-photo-2", "order": 2 }
    ],
    "status": "draft",
    "visibility": "public",
    "created_at": "2025-01-01T10:00:00Z",
    "updated_at": "2025-01-01T10:00:00Z"
  }
}
```

---

### 1.2. PATCH `/api/rielt/v1/listings/{id}`

Обновить данные объявления (автор или админ).

**Request (пример):**
```json
{
  "listing": {
    "title": "2-комн. квартира у Long Beach (обновлено)",
    "price_per_month": 16000000,
    "status": "published"
  },
  "property": {
    "amenities": ["wifi", "air_conditioner", "washing_machine", "parking"]
  },
  "contact_policy": {
    "show_contacts_immediately": true,
    "contact_phone": "+84-123-456-789"
  }
}
```

**Response 200:** обновлённый объект объявления.

---

### 1.3. GET `/api/rielt/v1/listings/{id}`

Получить подробную информацию по объявлению.

**Query params:**

- `include_property` — `true|false` (по умолчанию `true`),
- `include_contact` — `true|false` (по умолчанию `false` для гостя).

**Response (пример):**
```json
{
  "listing": {
    "id": "listing-uuid",
    "property_object_id": "property-uuid",
    "listing_type": "rent_long",
    "title": "2-комн. квартира у Long Beach",
    "description": "Светлая квартира в 5 минутах от моря...",
    "currency": "VND",
    "price_per_month": 15000000,
    "security_deposit": 15000000,
    "min_rental_term_months": 3,
    "available_from": "2025-01-10",
    "bedrooms": 2,
    "bathrooms": 1,
    "area_sqm": 60,
    "floor": 3,
    "total_floors": 7,
    "furnished": "full",
    "photos": [
      { "media_id": "uuid-photo-1", "order": 1 }
    ],
    "status": "published",
    "visibility": "public",
    "created_at": "2025-01-01T10:00:00Z",
    "updated_at": "2025-01-01T10:00:00Z"
  },
  "property": {
    "id": "property-uuid",
    "type": "apartment",
    "country_id": "vn",
    "city_id": "phu-quoc",
    "area_name": "Long Beach",
    "address_line": "улица 30/4, дом 12",
    "lat": 10.212,
    "lng": 103.967,
    "amenities": ["wifi", "air_conditioner", "washing_machine"]
  },
  "contact": {
    "phone": "+84-123-456-789",
    "telegram": "@owner_vn",
    "whatsapp": null,
    "email": null
  }
}
```

---

### 1.4. DELETE `/api/rielt/v1/listings/{id}`

Архивировать/удалить объявление (soft-delete: `status = "archived"`).

**Response:** `204 No Content`

---

### 1.5. GET `/api/rielt/v1/my/listings`

Список объявлений текущего пользователя (арендодателя/агента).

**Требует авторизации.**

**Query params:**

- `status` — фильтр по статусу (опционально),
- `listing_type` — `rent_long` | `rent_short` | `sale` (опционально),
- `page`, `page_size`.

**Response (пример):**
```json
{
  "items": [
    {
      "id": "listing-uuid",
      "property_object_id": "property-uuid",
      "listing_type": "rent_long",
      "title": "2-комн. квартира у Long Beach",
      "currency": "VND",
      "price_per_month": 15000000,
      "status": "published",
      "visibility": "public",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 3
}
```

---

## 2. Каталог для арендатора

### 2.1. GET `/api/rielt/v1/catalog`

Поиск объявлений.

**Query params (MVP-набор):**

- `country_id`
- `city_id`
- `area_name`
- `listing_type` — `rent_long` | `rent_short`
- `min_price`, `max_price`
- `bedrooms_min`, `bedrooms_max`
- `furnished` — `no` | `partial` | `full`
- `amenities` — несколько значений (например, `amenities=wifi&amenities=air_conditioner`)
- `is_partner_object` — `true|false`
- `sort` — `newest` | `price_asc` | `price_desc`
- `page`, `page_size`

**Response (пример):**
```json
{
  "items": [
    {
      "id": "listing-uuid",
      "property_object_id": "property-uuid",
      "title": "2-комн. квартира у Long Beach",
      "listing_type": "rent_long",
      "currency": "VND",
      "price_per_month": 15000000,
      "bedrooms": 2,
      "bathrooms": 1,
      "area_sqm": 60,
      "city_id": "phu-quoc",
      "country_id": "vn",
      "area_name": "Long Beach",
      "main_photo": { "media_id": "uuid-photo-1" },
      "is_partner_object": true,
      "status": "published"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 37
}
```

---

### 2.2. GET `/api/rielt/v1/catalog/map`

Упрощённая выдача для карты (только координаты и ключевые параметры).

**Query params:** те же, что и для `/catalog`, плюс (опционально):

- `lat`, `lng`, `radius_km`  
  или
- `bbox_north`, `bbox_south`, `bbox_east`, `bbox_west`

**Response (пример):**
```json
{
  "items": [
    {
      "id": "listing-uuid",
      "lat": 10.212,
      "lng": 103.967,
      "price_per_month": 15000000,
      "currency": "VND",
      "bedrooms": 2,
      "is_partner_object": true
    }
  ]
}
```

---

## 3. Заявки арендаторов

### 3.1. POST `/api/rielt/v1/listings/{id}/requests`

Создать заявку на объявление.

**Требует авторизации.**

**Request:**
```json
{
  "message": "Здравствуйте! Ищу жильё на 3 месяца с января.",
  "desired_move_in_date": "2025-01-15",
  "desired_term_months": 3,
  "budget_per_month": 15000000
}
```

**Response 201:**
```json
{
  "id": "request-uuid",
  "listing_id": "listing-uuid",
  "tenant_user_id": "tenant-uuid",
  "status": "new",
  "created_at": "2025-01-02T09:00:00Z",
  "updated_at": "2025-01-02T09:00:00Z"
}
```

---

### 3.2. GET `/api/rielt/v1/my/requests`

Список заявок текущего пользователя-арендатора.

**Response (пример):**
```json
{
  "items": [
    {
      "id": "request-uuid",
      "listing_id": "listing-uuid",
      "status": "new",
      "created_at": "2025-01-02T09:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 3.3. GET `/api/rielt/v1/my/listings/{id}/requests`

Список заявок по конкретному объявлению для его автора.

**Response (пример):**
```json
{
  "items": [
    {
      "id": "request-uuid",
      "listing_id": "listing-uuid",
      "tenant_user_id": "tenant-uuid",
      "status": "new",
      "created_at": "2025-01-02T09:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 3.4. PATCH `/api/rielt/v1/requests/{id}`

Изменение статуса заявки.

- Арендодатель/агент (автор объявления) может ставить:
  - `viewed`, `in_dialog`, `rejected`, `approved`.
- Арендатор может ставить:
  - `cancelled_by_tenant` (если заявка ещё не завершена).

**Request (пример):**
```json
{
  "status": "in_dialog"
}
```

**Response:** `204 No Content`

---

## 4. Избранное

### 4.1. POST `/api/rielt/v1/listings/{id}/favorite`

Добавить объявление в избранное.

**Требует авторизации.**

**Response:** `204 No Content`

---

### 4.2. DELETE `/api/rielt/v1/listings/{id}/favorite`

Удалить объявление из избранного.

**Response:** `204 No Content`

---

### 4.3. GET `/api/rielt/v1/my/favorites`

Список избранных объявлений пользователя.

**Response (пример):**
```json
{
  "items": [
    {
      "listing_id": "listing-uuid",
      "added_at": "2025-01-03T12:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

## 5. Статистика

### 5.1. POST `/api/rielt/v1/listings/{id}/view`

Отметить просмотр объявления (для подсчёта статистики).

**Response:** `204 No Content`

(Может использоваться фронтендом с учётом rate limit.)

---

### 5.2. GET `/api/rielt/v1/my/listings/{id}/stats`

Статистика для владельца объявления.

**Response (пример):**
```json
{
  "listing_id": "listing-uuid",
  "views_total": 124,
  "views_last_30_days": 37,
  "requests_total": 12,
  "requests_new": 3
}
```

---

## 6. Сервисные (internal) API

### 6.1. GET `/api/rielt/v1/internal/listings/{id}/basic`

Минимальный набор данных по объявлению для других сервисов (Atlas, RF, Content и т.п.).

**Response (пример):**
```json
{
  "id": "listing-uuid",
  "property_object_id": "property-uuid",
  "title": "2-комн. квартира у Long Beach",
  "listing_type": "rent_long",
  "currency": "VND",
  "price_per_month": 15000000,
  "city_id": "phu-quoc",
  "country_id": "vn",
  "area_name": "Long Beach",
  "is_partner_object": true,
  "status": "published"
}
```

---

## 7. Версионирование

- Текущая версия: **v1** (`/api/rielt/v1/...`).
- При появлении ломающих изменений вводится новая версия `/api/rielt/v2/...` с параллельной поддержкой v1.

---

## 8. Статус документа

Этот файл — **единый источник правды по публичному REST API Rielt Service**.  
Любые изменения в коде, влияющие на контракты, должны сопровождаться обновлением этого документа.
