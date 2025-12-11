# Rielt.Market Asia — API Contracts

Базовый префикс:
/api/rielt

---

## 1. Properties

### GET /properties
Параметры:
- city_id?
- district_id?
- type?
- min_price?
- max_price?
- amenities?
- page?
- sort? (price_asc, price_desc, newest)

Ответ:
{
"items": [...Property],
"pagination": {...}
}

### GET /properties/{id}
Ответ:
{
"property": {...},
"listings": [...],
"owner": {...}
}

### POST /properties (auth required)
Тело:
{
"type": "apartment",
"city_id": "...",
"district_id": "...",
"price_month": 800,
"amenities": ["wifi", "kitchen"],
"photos": ["url1", "url2"]
}

---

## 2. Listings

### POST /listings
{
"property_id": "...",
"title": "...",
"description": "...",
"price": 900,
"available_from": "2025-01-10"
}

### PATCH /listings/{id}/boost
{
"boost_level": "basic"
}

---

## 3. Favorites

### POST /favorites/{property_id}
### DELETE /favorites/{property_id}
### GET /favorites

---

## 4. Booking Requests

### POST /booking
{
"property_id": "...",
"message": "...",
"requested_from": "...",
"requested_to": "..."
}

### GET /booking?owner_id=...

---

## 5. Verification

### POST /verification/{property_id}
{
"verification_type": "video_call"
}

### PATCH /verification/{id}
(для модераторов)

---

## 6. AI Endpoints

### POST /ai/match
{
"city": "Phu Quoc",
"budget": 600,
"amenities": ["wifi", "kitchen"],
"preferred_districts": ["Duong Dong"]
}

Ответ — список рекомендуемых квартир + пояснение AI.

### POST /ai/analysis
Принимает URL или текст объявления и извлекает:
- удобства,
- район,
- риски,
- ориентировочную цену.
