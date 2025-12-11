# Atlas Asia — API Contracts  
Версия 1.0

Этот документ описывает **API-контракты клиентского PWA-модуля Atlas Asia**, который обращается к Atlas Service и агрегированным данным (RF, Pulse, Quest, Rielt, Reactions).

Backend-спецификация представлена отдельно в:  
`docs/backend/atlas_service/api_contracts.md`

Здесь описывается именно **frontend-facing API**, предоставляемый API Gateway.

---

# 1. Общие правила API

Все эндпоинты имеют префикс:

```
/api/atlas/v1/
```

Формат:

```json
{
  "status": "ok",
  "data": { ... },
  "meta": { ... }
}
```

Ошибка:

```json
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "Place not found"
  }
}
```

Кэширование ответов:

| Тип данных         | TTL     |
|-------------------|---------|
| страна            | 24h     |
| город             | 6h      |
| место             | 1h      |
| поисковые списки  | 10–30m  |

---

# 2. Countries API

## 2.1. Получить список стран

### GET `/api/atlas/v1/countries`

**Query parameters:**

| Параметр | Тип | Значение |
|---------|-----|----------|
| `active_only` | boolean | default = true |
| `region` | string | "sea", "asia", etc |

**Response:**

```json
{
  "status": "ok",
  "data": {
    "countries": [
      {
        "country_id": "vn",
        "slug": "vietnam",
        "name": "Вьетнам",
        "short_description": "Страна...",
        "hero_image_url": "...",
        "cities_count": 12,
        "featured_cities": [
          { "city_id": "danang", "name": "Дананг" }
        ]
      }
    ]
  }
}
```

---

## 2.2. Получить данные страны

### GET `/api/atlas/v1/countries/{country_id}`

**Response:**

```json
{
  "status": "ok",
  "data": {
    "country": { ...Country },
    "content": { ...CountryContentSections },
    "cities": [ ...CityListItem ]
  }
}
```

---

# 3. Cities API

## 3.1. Список городов страны

### GET `/api/atlas/v1/countries/{country_id}/cities`

Возвращает массив `CityListItem[]`.

---

## 3.2. Получить данные города

### GET `/api/atlas/v1/cities/{city_id}`

**Response:**

```json
{
  "status": "ok",
  "data": {
    "city": { ...City },
    "content": { ...CityContent },
    "featured_places": [ ...PlaceCardModel ],
    "other_places": [ ...PlaceCardModel ],
    "rf_partners_block": { ... },
    "events_block": { ... },
    "rentals_block": { ... },
    "walks_and_adventures_block": { ... }
  }
}
```

---

# 4. Places API

## 4.1. Список мест города

### GET `/api/atlas/v1/cities/{city_id}/places`

**Query parameters:**

| Параметр | Тип | Описание |
|---------|------|----------|
| `type` | string[] | фильтр по типу |
| `categories` | string[] | фильтр по категориям |
| `tags` | string[] | фильтр по тегам |
| `has_rf_only` | boolean | только RF-партнёры |
| `has_quests_only` | boolean | только места с квестами |
| `has_events_only` | boolean | только места с событиями |

**Response:**

```json
{
  "status": "ok",
  "data": {
    "places": [ ...PlaceCardModel ]
  }
}
```

---

## 4.2. Получить данные места

### GET `/api/atlas/v1/places/{place_id}`

**Response:**

```json
{
  "status": "ok",
  "data": {
    "place": { ...Place },
    "description": { "format": "markdown", "body": "..." },
    "rf_venue_block": { ... },
    "events_block": { ... },
    "quests_block": { ... },
    "rentals_block": { ... },
    "rating_summary": { ... },
    "reactions_counters": { ... },
    "top_short_reviews": [ ... ]
  }
}
```

---

# 5. Search API

## 5.1. Универсальный поиск по Atlas

### GET `/api/atlas/v1/search`

**Query parameters:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `q` | string | поисковый запрос |
| `type` | enum | country / city / place |
| `city_id` | string | фильтрация внутри города |

**Response:**

```json
{
  "status": "ok",
  "data": {
    "results": [
      {
        "object_type": "place",
        "place_id": "dragon_bridge",
        "name": "Мост Дракон",
        "image_url": "...",
        "city_name": "Дананг"
      }
    ]
  }
}
```

---

# 6. Интеграционные API

## 6.1. RF Partners (Russian Friendly)

### GET `/api/atlas/v1/cities/{city_id}/rf-partners`

```json
{
  "status": "ok",
  "data": {
    "partners": [ ...RFPartnerCard ]
  }
}
```

---

## 6.2. Pulse Events (события)

### GET `/api/atlas/v1/places/{place_id}/events`

```json
{
  "status": "ok",
  "data": {
    "total_events": 3,
    "upcoming_events": [ ...EventPreview ]
  }
}
```

---

## 6.3. Quest Block

### GET `/api/atlas/v1/places/{place_id}/quests`

```json
{
  "status": "ok",
  "data": {
    "total_quests": 2,
    "quests_preview": [ ...QuestCardPreview ]
  }
}
```

---

## 6.4. Rentals Block (Real estate preview)

### GET `/api/atlas/v1/cities/{city_id}/rentals-preview`

```json
{
  "status": "ok",
  "data": {
    "total_listings": 54,
    "sample_listings": [ ...RentalPreview ]
  }
}
```

---

## 6.5. Reactions Summary

### GET `/api/atlas/v1/places/{place_id}/reactions`

```json
{
  "status": "ok",
  "data": {
    "rating_summary": { ... },
    "reactions_counters": { ... },
    "top_short_reviews": [ ... ]
  }
}
```

---

# 7. Ошибки

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid filter parameter"
  }
}
```

---

# 8. Roadmap

**Phase 1 (MVP)**  
- Каталог стран, городов и мест  
- Поиск  
- Агрегированные блоки (RF, события, квесты, жильё)  
- Реакции: рейтинги, короткие отзывы  

**Phase 2**  
- AI-маршруты  
- Персонализированные подборки  

**Phase 3**  
- Генеративный AI-путеводитель  
- Прогнозный интерес  
