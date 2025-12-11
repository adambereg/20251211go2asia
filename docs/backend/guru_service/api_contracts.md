# Guru Service — API Contracts (Updated with contacts)

Версия: **v1**  
Базовый путь: **`/api/guru/v1/`**

Guru Service агрегирует данные разных сервисов и отдаёт единую ленту объектов “рядом” — места, события, жильё, партнёрские точки, квесты и **PRO-гуру (людей рядом)**.

---

## 1. Общие принципы

- Формат ответов: **JSON**.
- Основные методы — `GET`, агрегирующие данные Atlas/Pulse/Rielt/RF/Quest/User/Space.
- Персональные настройки требуют авторизации (JWT от User Service).
- Публичные `GET /nearby` и `GET /nearby/...` могут работать без JWT (гостевой режим, без персонализации).

---

## 2. Главный эндпоинт — Nearby Feed

### GET `/api/guru/v1/nearby`

Единая лента объектов рядом с пользователем.

**Параметры (query):**

- Гео:
  - `lat`, `lng` — обязательные
  - `radius` — по умолчанию 3000, максимум 20000
- Типы сущностей:
  - `types`: `place,event,housing,partner_venue,quest,guru`
- Фильтры:
  - `open_now`, `rf_only`, `budget_level`, `tags`
  - `include_guru` — разрешает или скрывает PRO
- Время:
  - `time_window`: `now`, `today`, `tonight`, `weekend`, `upcoming`
- Сортировка:
  - `distance`, `rating`, `popular`, `mixed`
- Пагинация:
  - `page`, `page_size`

**Ответ (пример):**
```json
{
  "items": [
    {
      "id": "atlas_place:long-beach",
      "source": "atlas_place",
      "entity_type": "place",
      "title": "Long Beach",
      "subtitle": "Главный пляж Фукуока",
      "description_short": "Длинный песчаный пляж с кафе, барами и закатами.",
      "lat": 10.202,
      "lng": 103.956,
      "distance_m": 450,
      "city_id": "phu-quoc",
      "country_id": "vn",
      "is_rf": false,
      "is_open_now": true,
      "tags": ["beach", "sunset"],
      "image_url": "https://cdn.go2asia/atlas/places/long-beach.jpg",
      "rating": 4.7,
      "price_level": null,
      "payload": {
        "place_kind": "beach"
      }
    },
    {
      "id": "pulse_event:phu-quoc-sunset-tour-2025-01-01",
      "source": "pulse_event",
      "entity_type": "event",
      "title": "Sunset-тур по Фукуоку",
      "subtitle": "Закат и ужин у моря",
      "description_short": "Вечерний тур с прогулкой на лодке и ужином.",
      "lat": 10.210,
      "lng": 103.960,
      "distance_m": 980,
      "city_id": "phu-quoc",
      "country_id": "vn",
      "is_rf": true,
      "is_open_now": false,
      "tags": ["tour", "sunset", "seafood"],
      "image_url": "https://cdn.go2asia/pulse/events/sunset-tour.jpg",
      "payload": {
        "starts_at": "2025-01-01T16:00:00+07:00",
        "ends_at": "2025-01-01T20:00:00+07:00",
        "min_price": 500000,
        "currency": "VND"
      }
    },
    {
      "id": "guru_pro:user-uuid-123",
      "source": "guru_pro",
      "entity_type": "guru",
      "title": "Алексей — ваш гид по Фукуоку",
      "subtitle": "PRO-спейсер, экскурсии и помощь с релокацией",
      "description_short": "Организую индивидуальные туры, помогаю с зимовкой, знаю все лучшие кафе и пляжи.",
      "lat": 10.208,
      "lng": 103.955,
      "distance_m": 600,
      "city_id": "phu-quoc",
      "country_id": "vn",
      "is_rf": false,
      "is_open_now": null,
      "tags": ["guide", "relocation", "kids"],
      "image_url": "https://cdn.go2asia/avatars/user-uuid-123.jpg",
      "rating": 4.9,
      "price_level": "medium",
      "payload": {
        "pro_user_id": "user-uuid-123",
        "languages": ["ru", "en"],
        "specialties": ["guide", "relocation", "kids"],
        "hourly_rate_from": 1500000,
        "currency": "VND",
        "contacts": {
          "telegram": "@phuquoc_guru",
          "phone": "+84-123-456-789",
          "whatsapp": "+84-123-456-789",
          "website": "https://phuquoc-guru.com"
        }
      }
    }
  ],
  "page": 1,
  "page_size": 50,
  "total": 123
}
```

---

## 3. Nearby по отдельным типам

### GET `/api/guru/v1/nearby/gurus`

Параметры:

- `lat`, `lng`, `radius`
- или `city_id`
- `languages`
- `specialties`
- `budget_level`
- sort: `distance`, `rating`, `popular`

Ответ — массив `GuruEntity` с `entity_type = "guru"`.

---

## 4. Пресеты What-To-Do

### GET `/api/guru/v1/what-to-do`

Параметры:

- `lat`, `lng`
- `preset`:  
  `tonight`, `with_kids`, `cheap_food`, `work_and_chill`,  
  `consult_with_guru`, …

---

## 5. Настройки пользователя

### GET `/api/guru/v1/preferences/me`  
### PUT `/api/guru/v1/preferences/me`

(Без изменений, формат сохранён.)

---

## 6. История

### GET `/api/guru/v1/history`  
### DELETE `/api/guru/v1/history`

(Только для авторизованных пользователей.)

---

## 7. Saved Entities  

### GET `/api/guru/v1/saved`  
### POST `/api/guru/v1/saved`  
### DELETE `/api/guru/v1/saved/{id}`  

---

## 8. Internal API  

### POST `/api/guru/v1/internal/rebuild-cache`

---

## 9. Версионирование

- Текущая версия: `v1`
- Ломающие изменения — новая версия API

---

## 10. Статус документа

Этот файл является **единственным источником правды** по API Guru Service.
Любые изменения кода должны сопровождаться обновлением документа.
