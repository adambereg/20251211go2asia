# RF Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/rf/v1/`**

RF Service предоставляет REST API для:

- публичного каталога бизнес-партнёров Russian Friendly,
- управления партнёрами и их точками (admin / partner),
- получения базовой информации о партнёре другими сервисами (internal API).

Этот файл описывает только **контракты HTTP API**. Структура данных подробно раскрыта в `data_model.md`.

---

## 1. Публичный каталог

### 1.1. GET `/catalog/partners`

Список бизнес-партнёров для каталога Russian Friendly.

**Query-параметры (MVP):**

- `country_id` — фильтр по стране.
- `city_id` — фильтр по городу.
- `category` — тип бизнеса (`cafe`, `hotel`, `tour_agency`, …).
- `tags` — повторяющийся параметр: `tags=vegan_friendly&tags=family_friendly`.
- `rf_level` — `basic` | `silver` | `gold` | `platinum`.
- `near_lat`, `near_lng`, `radius_km` — поиск партнёров рядом.
- `has_vouchers` — `true|false` (наличие любых ваучеров).
- `has_premium_vouchers` — `true|false` (наличие премиум-ваучеров).
- `sort` — `rating_desc` | `popular` | `distance` | `newest`.
- `page`, `page_size`.

**Пример ответа:**
```json
{
  "items": [
    {
      "id": "partner-uuid",
      "slug": "phuket-cafe-ru",
      "name": "Phuket Cafe RU",
      "short_description": "Кафе с русским меню рядом с пляжем",
      "category": "cafe",
      "tags": ["russian_speaking_staff", "family_friendly"],
      "country_id": "th",
      "city_id": "phuket",
      "rf_level": "gold",
      "is_verified": true,
      "main_location": {
        "id": "location-uuid",
        "address": "Patong Beach, Soi 1",
        "latitude": 7.895,
        "longitude": 98.298,
        "atlas_place_id": "atlas_place_123"
      },
      "default_discount_percent": 10,
      "average_rating": 4.7,
      "total_reviews": 125,
      "has_vouchers": true,
      "has_premium_vouchers": true
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 42
}
```

---

### 1.2. GET `/partners/{id}`

Детальная карточка бизнес-партнёра.

**Права доступа:** публично доступно (для чтения), но может не включать чувствительные контакты в будущем.

**Пример ответа:**
```json
{
  "id": "partner-uuid",
  "slug": "phuket-cafe-ru",
  "name": "Phuket Cafe RU",
  "description": "Подробное описание заведения, атмосферы, кухни...",
  "category": "cafe",
  "tags": ["russian_speaking_staff", "family_friendly"],
  "country_id": "th",
  "city_id": "phuket",
  "rf_level": "gold",
  "is_verified": true,
  "contacts": {
    "website": "https://phuketcafe.ru",
    "phone": "+66-123-456-789",
    "telegram": "@phuketcafe",
    "instagram": "@phuketcafe"
  },
  "default_discount_percent": 10,
  "default_cashback_points_percent": 5,
  "economics": {
    "premium_business_reward_g2a": 200,
    "premium_pro_reward_g2a": 50
  },
  "locations": [
    {
      "id": "loc-1",
      "name": "Основной зал",
      "address": "Patong Beach, Soi 1",
      "latitude": 7.895,
      "longitude": 98.298,
      "atlas_place_id": "atlas_place_123",
      "show_in_rf_catalog": true
    }
  ],
  "vouchers": {
    "default_voucher_ids": ["voucher-basic-10"],
    "default_premium_voucher_ids": ["voucher-premium-brunch-2025"]
  },
  "stats": {
    "average_rating": 4.7,
    "total_reviews": 125,
    "total_vouchers_redeemed": 300,
    "total_premium_vouchers_sold": 25
  },
  "pro_curator": {
    "user_id": "pro-user-uuid",
    "display_name": "Иван, PRO-спейсер",
    "visible_in_guru": true
  }
}
```

---

### 1.3. GET `/partners/{id}/locations`

Получение списка физических точек партнёра.

**Пример ответа:**
```json
{
  "items": [
    {
      "id": "loc-1",
      "name": "Основной зал",
      "address": "Patong Beach, Soi 1",
      "latitude": 7.895,
      "longitude": 98.298,
      "atlas_place_id": "atlas_place_123",
      "status": "active",
      "show_in_rf_catalog": true,
      "show_on_map": true
    }
  ]
}
```

---

## 2. Управление партнёрами (Admin / Partner / PRO)

Все операции управления требуют JWT и проверки ролей.

### 2.1. POST `/partners`

Создание бизнес-партнёра.

**Кто может вызывать:**
- `pro` — создаёт черновик (обычно `pending_review`);
- `admin` — может сразу создать активного партнёра.

**Пример запроса:**
```json
{
  "name": "Phuket Cafe RU",
  "category": "cafe",
  "country_id": "th",
  "city_id": "phuket",
  "rf_level": "basic",
  "supports_russian": true,
  "tags": ["russian_speaking_staff"],
  "description": "Кафе с русскоязычным персоналом рядом с пляжем",
  "onboarding_pro_user_id": "pro-user-uuid"
}
```

**Пример ответа 201:**
```json
{
  "id": "partner-uuid",
  "status": "pending_review"
}
```

---

### 2.2. PATCH `/partners/{id}`

Обновление информации о бизнес-партнёре.

**Кто может вызывать:**
- `partner_owner` / `partner_manager` этого партнёра;
- `admin`.

**Пример запроса (частичное обновление):**
```json
{
  "rf_level": "gold",
  "default_discount_percent": 10,
  "default_cashback_points_percent": 5,
  "economics": {
    "premium_business_reward_g2a": 200,
    "premium_pro_reward_g2a": 50
  }
}
```

**Ответ:**
```json
{
  "id": "partner-uuid",
  "rf_level": "gold",
  "default_discount_percent": 10,
  "default_cashback_points_percent": 5,
  "economics": {
    "premium_business_reward_g2a": 200,
    "premium_pro_reward_g2a": 50
  }
}
```

---

### 2.3. POST `/partners/{id}/locations`

Создание новой точки партнёра.

**Пример запроса:**
```json
{
  "name": "Филиал на Кароне",
  "address": "Karon Beach, Soi 2",
  "latitude": 7.843,
  "longitude": 98.295,
  "atlas_place_id": "atlas_place_456",
  "show_in_rf_catalog": true,
  "show_on_map": true
}
```

**Ответ 201:**
```json
{
  "id": "location-uuid",
  "status": "active"
}
```

---

### 2.4. PATCH `/locations/{id}`

Обновление параметров точки.

**Частичные примеры полей:**
```json
{
  "address": "New address",
  "status": "temporarily_closed",
  "show_in_rf_catalog": false
}
```

---

### 2.5. GET `/my/partners`

Список партнёров, к которым текущий пользователь имеет роль `owner` или `manager`.

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "partner-uuid",
      "name": "Phuket Cafe RU",
      "rf_level": "gold",
      "status": "active",
      "role": "owner"
    }
  ]
}
```

---

## 3. Работа с ваучерами на уровне партнёра

### 3.1. PATCH `/partners/{id}/vouchers`

Привязка списков ваучеров к партнёру.

> RF Service не создаёт ваучеры, а только хранит ссылки на `voucher_id`  
> из Voucher Service.

**Пример запроса:**
```json
{
  "default_voucher_ids": ["voucher-basic-10"],
  "default_premium_voucher_ids": ["voucher-premium-brunch-2025"]
}
```

**Ответ:**
```json
{
  "id": "partner-uuid",
  "default_voucher_ids": ["voucher-basic-10"],
  "default_premium_voucher_ids": ["voucher-premium-brunch-2025"]
}
```

---

## 4. Internal API для других сервисов

### 4.1. GET `/internal/partners/{id}/basic`

Базовый payload о партнёре для использования другими сервисами (Voucher, Points, Token, Quest, Rielt, Atlas и др.).

**Аутентификация:** сервисный JWT / internal network.

**Пример ответа:**
```json
{
  "id": "partner-uuid",
  "name": "Phuket Cafe RU",
  "slug": "phuket-cafe-ru",
  "category": "cafe",
  "country_id": "th",
  "city_id": "phuket",
  "rf_level": "gold",
  "status": "active",
  "default_discount_percent": 10,
  "default_cashback_points_percent": 5,
  "default_voucher_ids": ["voucher-basic-10"],
  "default_premium_voucher_ids": ["voucher-premium-brunch-2025"],
  "economics": {
    "premium_business_reward_g2a": 200,
    "premium_pro_reward_g2a": 50
  }
}
```

---

### 4.2. GET `/internal/partners/by-location`

Поиск партнёров по `atlas_place_id` или геопозиции.

**Query-параметры:**

- `atlas_place_id` — если нужна прямая связка место → партнёр;
- `lat`, `lng`, `radius_km` — если нужен поиск вокруг координаты.

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "partner-uuid",
      "name": "Phuket Cafe RU",
      "rf_level": "gold",
      "status": "active"
    }
  ]
}
```

---

## 5. Версионирование

- Текущая версия API: **v1** (`/api/rf/v1/...`).
- Ломающие изменения должны выпускаться как `/api/rf/v2/...` с параллельной поддержкой v1.

---

## 6. Статус документа

Этот документ описывает **только HTTP-контракты RF Service**.  
Все детали моделей данных и бизнес-правил задаются в отдельных файлах:

- `data_model.md`
- `validation_rules.md`
- `security.md`
- `integration.md`
