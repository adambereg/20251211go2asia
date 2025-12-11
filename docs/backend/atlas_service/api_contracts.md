# Atlas Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/atlas/v1/`**

Atlas Service предоставляет API для работы со странами, городами, районами и местами (POI). Это *read-heavy* сервис, основной источник геоданных для всей экосистемы Go2Asia.

---

# 1. Общие принципы

- Все ответы — JSON.
- Авторизация:
  - публичные **GET** доступны без токена (по продуктовой стратегии);
  - операции создания/изменения требуют JWT от User Service.
- Данные локализуются через параметр `lang` (опционально).
- Поддерживается постраничная отдача (`page`, `page_size`) или `limit` / `offset`.

---

# 2. Countries API

## **GET `/api/atlas/v1/countries`**
Список стран.

**Параметры:**
- `status` — `active` / `hidden` (опц.)

**Ответ:**
```json
[
  {
    "id": "vn",
    "name": "Вьетнам",
    "slug": "vietnam",
    "iso_code": "VN",
    "center": { "lat": 15.9, "lng": 107.6 }
  }
]
```

---

## **GET `/api/atlas/v1/countries/{id}`**
Детали конкретной страны.

**Ответ:**
```json
{
  "id": "vn",
  "name": "Вьетнам",
  "slug": "vietnam",
  "iso_code": "VN",
  "cities": [
    { "id": "phu-quoc", "name": "Фукуок" }
  ]
}
```

---

# 3. Cities API

## **GET `/api/atlas/v1/cities`**
Вернёт список городов, опционально — фильтр по стране.

**Параметры:**
- `country_id`
- `status` — опционально

**Ответ:**
```json
[
  {
    "id": "phu-quoc",
    "country_id": "vn",
    "name": "Фукуок",
    "slug": "phu-quoc",
    "center": { "lat": 10.289, "lng": 103.984 }
  }
]
```

---

## **GET `/api/atlas/v1/cities/{id}`**
Вернёт детали города.

---

# 4. Districts API (если используется)

## **GET `/api/atlas/v1/districts`**
Фильтрация по `city_id`.

## **GET `/api/atlas/v1/districts/{id}`**

---

# 5. Places API (основной блок)

## **GET `/api/atlas/v1/places`**
Поиск и фильтрация мест.

**Параметры:**
- `country_id`
- `city_id`
- `district_id`
- `type` — один или несколько
- `tags` — список тегов
- `rf_only` — bool
- `q` — строка поиска
- `limit`, `offset` или `page`, `page_size`

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "long-beach",
      "city_id": "phu-quoc",
      "type": "beach",
      "name": "Long Beach",
      "latitude": 10.20,
      "longitude": 103.96,
      "tags": ["sunset", "swimming"],
      "rf_badge": false
    }
  ],
  "total": 120,
  "page": 1,
  "page_size": 20
}
```

---

## **GET `/api/atlas/v1/places/{id}`**
Детальная карточка места.

**Ответ:**
```json
{
  "id": "long-beach",
  "city_id": "phu-quoc",
  "type": "beach",
  "name": "Long Beach",
  "description_short": "Популярный пляж...",
  "description_full": "...",
  "latitude": 10.20,
  "longitude": 103.96,
  "tags": ["sunset", "swimming"],
  "photos": [
    { "url": "https://cdn/1.jpg", "type": "image" }
  ],
  "rf_badge": false,
  "rating_avg": 4.7,
  "rating_count": 129
}
```

---

## **GET `/api/atlas/v1/places/nearby`**
Поиск мест рядом с точкой.

**Параметры:**
- `lat` *(обязателен)*
- `lng` *(обязателен)*
- `radius` (по умолчанию 1500 м)
- `type`
- `tags`
- `rf_only`

**Ответ:**
```json
[
  {
    "id": "long-beach",
    "distance_m": 134,
    "type": "beach"
  }
]
```

---

# 6. Categories & Tags

## **GET `/api/atlas/v1/categories`**
Вернёт список типов мест.

## **GET `/api/atlas/v1/tags`**
Вернёт список тегов.

---

# 7. Autocomplete API

## **GET `/api/atlas/v1/places/autocomplete?q=`**
Для подсказок в поиске.

**Ответ:**
```json
[
  { "id": "long-beach", "name": "Long Beach", "city": "Phu Quoc" }
]
```

---

# 8. Admin API (только atlas_editor / admin)

## **POST `/api/atlas/v1/places`**
Создание черновика.

**Body:**
```json
{
  "city_id": "phu-quoc",
  "name": "Новый пляж",
  "type": "beach",
  "latitude": 10.21,
  "longitude": 103.95,
  "tags": ["sunset"]
}
```

---

## **PATCH `/api/atlas/v1/places/{id}`**
Обновление данных места.

---

## **POST `/api/atlas/v1/places/{id}/publish`**
Публикация (переход `draft` → `published`).

---

## **POST `/api/atlas/v1/places/{id}/archive`**
Архивирование места.

---

# 9. Event Bus (события)

Atlas публикует следующие события:

### **`atlas.place_created`**
### **`atlas.place_updated`**
### **`atlas.place_published`**
### **`atlas.place_archived`**
### **`atlas.place_rf_flag_changed`**

**Пример события:**
```json
{
  "event": "atlas.place_published",
  "timestamp": "2025-11-01T12:00:00Z",
  "payload": {
    "place_id": "long-beach",
    "city_id": "phu-quoc"
  }
}
```

Эти события слушают:
- Guru Service (для обновления кеша и поиска),
- RF Service (если это партнёрское место),
- Pulse / Rielt / Media (по необходимости).

---

# 10. Версионирование API

- Текущая версия: **v1**
- Ломающие изменения должны переводиться в **v2** (`/api/atlas/v2/...`)

---

# 11. Статус документа

Этот файл является **единым источником правды** для всех агентов Cursor (Architect, API-Dev, Integration-Dev).  
Любое изменение API должно вноситься **в этот файл**, а не только в код.
