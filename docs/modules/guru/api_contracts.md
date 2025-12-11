# Guru Asia — API Contracts

> Важно: Guru Asia как модуль — это **фронтенд‑PWA**, а не отдельный backend‑сервис.  
> Описанные ниже контракты — это клиентские запросы к API‑шлюзу/микросервисам, которыми должен оперировать фронтенд Guru.

Версия: 1.0

---

## 1. Получение ближайших объектов (Guru Feed)

### GET `/api/guru/feed`

Возвращает агрегированную ленту объектов вокруг пользователя с учётом фильтров.

#### Query‑параметры

- `lat` — широта (required)
- `lng` — долгота (required)
- `radius_m` — радиус поиска в метрах (по умолчанию 1000)
- `city_id` — текущий город (optional)
- `time_from` — ISO datetime, окно «от» (по умолчанию `now`)
- `time_to` — ISO datetime, окно «до» (по умолчанию `now + 24h`)
- `types` — CSV типов (`place,event,rf_partner,quest,accommodation`)
- `categories` — CSV категорий (еда, бар, экскурсия …)
- `open_now` — bool
- `only_verified` — bool
- `only_rf_friendly` — bool
- `with_vouchers` — bool
- `sort_by` — `distance|time|rating|price`
- `limit` — количество карточек (по умолчанию 50)
- `offset` — смещение для пагинации

#### Response 200

```json
{
  "items": [
    {
      "id": "atlas_place:123",
      "source_type": "atlas_place",
      "source_id": "123",
      "display_type": "place",
      "title": "Coffee Bean",
      "subtitle": "Кофейня рядом с вами",
      "hero_image_url": "https://...",
      "distance_m": 180,
      "duration_min": 60,
      "rating": 4.7,
      "reviews_count": 153,
      "price_from": 150,
      "price_currency": "THB",
      "time_info": {
        "start_time": null,
        "end_time": null,
        "is_all_day": null,
        "is_open_now": true
      },
      "location": {
        "lat": 13.123,
        "lng": 100.456,
        "formatted_address": "Bangkok, ..."
      },
      "tags": ["кофейня", "Wi‑Fi"],
      "badges": ["Партнёр RF"],
      "rf_partner_id": "rf_45",
      "has_vouchers": true,
      "quest_id": null,
      "is_editorial_pick": false
    }
  ],
  "session": {
    "session_id": "uuid",
    "radius_m": 1000,
    "city_id": "city_bkk"
  }
}
```

---

## 2. AI‑подсказки и готовые сценарии

### POST `/api/guru/ai/suggestions`

Запрос на генерацию персонализированных подсказок (выполняется через AI Gateway).

#### Request body

```json
{
  "user_id": "u1",
  "role": "vip",
  "location": { "lat": 13.123, "lng": 100.456 },
  "radius_m": 1500,
  "time_window": {
    "from": "2025-12-08T18:00:00Z",
    "to": "2025-12-08T23:00:00Z"
  },
  "preferences": {
    "mood": ["спокойно", "вид на реку"],
    "for_whom": ["пара"],
    "budget_level": "medium"
  }
}
```

#### Response 200

```json
{
  "suggestions": [
    {
      "id": "sg_1",
      "title": "Вечер для двоих рядом с вами",
      "description": "Спокойная прогулка + ужин с видом на реку",
      "items": [
        { "feed_item_id": "atlas_place:234", "rank": 1, "note": "Начните здесь к закату" },
        { "feed_item_id": "pulse_event:567", "rank": 2, "note": "Живой джаз в 20:00" }
      ],
      "reasoning_short": "Вы VIP, пара, рядом есть хорошие виды и джаз‑бар"
    }
  ]
}
```

---

## 3. Интеракции пользователя (реакции/сохранения)

Все действия пользователя фиксируются через Reactions Service; Guru лишь дергает его API.

### POST `/api/reactions` (через Reactions Service)

Создать реакцию/действие в контексте Guru (лайк, сохранение, отметка «был здесь», вопрос и т.д.).

```json
{
  "type": "bookmark",
  "target_type": "guru_item",
  "target_id": "atlas_place:123",
  "user_id": "u1",
  "payload": {
    "source_type": "atlas_place",
    "source_id": "123"
  }
}
```

---

## 4. Вспомогательные эндпоинты

### 4.1. История сессий пользователя

GET `/api/guru/history`

Возвращает последние сессии и избранные объекты для блока «Вы недавно смотрели».

---

## 5. Интеграция с другими модулями (маршрутизация)

На клиенте Guru не хранит собственный router, а использует общий роутинг PWA‑оболочки:

- При клике **«Открыть место»** → переход на страницу места в Atlas:
  - `/atlas/places/{place_id}`
- При клике **«Событие»** → `/pulse/events/{event_id}`
- При клике **«Партнёр RF»** → `/rf/partners/{partner_id}`
- При клике **«Квест»** → `/quest/{quest_id}`
- При клике **«Жильё»** → `/rielt/listings/{listing_id}`

Guru отвечает только за то, чтобы передать корректные ID и контекст (например, UTM/реферальные параметры для аналитики).

