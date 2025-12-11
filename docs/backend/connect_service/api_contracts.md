# Connect Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/connect/v1/`**

Connect Service предоставляет:

- внутренний API для других микросервисов,
- служебный API для админ-инструментов (работа с правилами, просмотр событий),
- не предоставляет публичного пользовательского API — пользователи работают через другие сервисы.

---

## 1. Внутренний API: события

### 1.1. POST `/internal/events`

Приём единичного экономического события от доменного микросервиса.

**Request:**
```json
{
  "external_id": "booking-12345",
  "event_type": "rielt.booking_paid",
  "source_service": "rielt_service",
  "actor_user_id": "user-renter-uuid",
  "primary_subject_user_id": "user-host-uuid",
  "context": {
    "listing_id": "listing-uuid",
    "city_id": "city-ho-chi-minh",
    "country": "VN",
    "amount_fiat": 500,
    "amount_points_spent": 2000,
    "is_first_booking_for_host": true
  }
}
```

**Response 202:**
```json
{
  "economic_event_id": "event-uuid",
  "status": "accepted"
}
```

Особенности:

- при повторном вызове с тем же `external_id` Connect Service:
  - либо возвращает уже существующий `economic_event_id`,
  - либо помечает событие как дубликат и не переобрабатывает его.

---

### 1.2. POST `/internal/events/batch`

Пакетная отправка событий (для массовых миграций/импорта).

**Request:**
```json
{
  "items": [
    {
      "external_id": "ref-evt-1",
      "event_type": "referral.joined",
      "source_service": "referral_service",
      "actor_user_id": "user-new-uuid",
      "primary_subject_user_id": "user-sponsor-uuid",
      "context": {
        "level": 1,
        "city_id": "city-phu-quoc"
      }
    },
    {
      "external_id": "quest-run-123",
      "event_type": "quest.completed",
      "source_service": "quest_service",
      "actor_user_id": "user-player-uuid",
      "primary_subject_user_id": "user-pro-author-uuid",
      "context": {
        "quest_id": "quest-uuid",
        "atlas_place_id": "atlas-place-uuid",
        "reward_base_points": 150
      }
    }
  ]
}
```

**Response:**
```json
{
  "accepted": 2
}
```

---

## 2. Внутренний API: правила наград

### 2.1. GET `/internal/rules`

Получение списка правил наград (для админ-интерфейса или отладки).

**Query-параметры (опционально):**

- `event_type` — фильтр по типу события,
- `enabled` — фильтр по активности.

**Response:**
```json
{
  "items": [
    {
      "id": "rule-uuid",
      "name": "referral_first_level_registration",
      "event_type": "referral.joined",
      "enabled": true,
      "priority": 10,
      "effective_from": "2025-01-01T00:00:00Z",
      "effective_to": null
    }
  ]
}
```

---

### 2.2. POST `/internal/rules`

Создание нового правила награды (операции только для админ-панели).

**Request (пример):**
```json
{
  "name": "referral_first_level_registration",
  "description": "Награда за регистрацию реферала первого уровня",
  "event_type": "referral.joined",
  "condition": {
    "field": "context.level",
    "op": "==",
    "value": 1
  },
  "rewards": {
    "rewards": [
      {
        "type": "points",
        "target": "sponsor",
        "amount": 100,
        "currency": "points",
        "locked_until": null
      }
    ]
  },
  "priority": 10,
  "enabled": true
}
```

**Response:**
```json
{
  "id": "rule-uuid",
  "created": true
}
```

---

### 2.3. PATCH `/internal/rules/{id}`

Обновление существующего правила.

**Request:**
```json
{
  "enabled": false,
  "priority": 20
}
```

---

### 2.4. DELETE `/internal/rules/{id}`

Деактивация/удаление правила.
Фактически может помечать как `enabled = false`.

---

## 3. Внутренний API: события/наградные действия (для аналитики)

### 3.1. GET `/internal/events`

Поиск экономических событий (диагностика и аналитика).

**Query-параметры:**

- `event_type`,
- `actor_user_id`,
- `primary_subject_user_id`,
- `status`,
- `date_from`, `date_to`,
- `page`, `page_size`.

**Response:**
```json
{
  "items": [
    {
      "id": "event-uuid",
      "external_id": "quest-run-123",
      "event_type": "quest.completed",
      "source_service": "quest_service",
      "actor_user_id": "user-player-uuid",
      "primary_subject_user_id": "user-pro-author-uuid",
      "context": {
        "quest_id": "quest-uuid",
        "atlas_place_id": "atlas-place-uuid",
        "reward_base_points": 150
      },
      "status": "processed",
      "created_at": "2025-01-10T10:00:00Z",
      "processed_at": "2025-01-10T10:00:01Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 3.2. GET `/internal/reward-actions`

Просмотр наградных действий (история решений Connect).

**Query-параметры:**

- `target_user_id`,
- `reward_type`,
- `status`,
- `date_from`, `date_to`,
- `event_type` (через join с `EconomicEvent`, опционально),
- `page`, `page_size`.

**Response:**
```json
{
  "items": [
    {
      "id": "reward-uuid",
      "economic_event_id": "event-uuid",
      "rule_id": "rule-uuid",
      "target_user_id": "user-pro-author-uuid",
      "reward_type": "points",
      "amount": 50,
      "currency": "points",
      "locked_until_condition": null,
      "status": "dispatched",
      "created_at": "2025-01-10T10:00:01Z",
      "updated_at": "2025-01-10T10:00:02Z"
    }
  ]
}
```

---

## 4. Event Bus / Outgoing API

Connect Service не открывает внешние REST endpoint’ы для Points/NFT/Gateway.
Вместо этого он:

- либо вызывает их **internal REST API**,
- либо публикует события:
  - `connect.reward.points`,
  - `connect.reward.nft`,
  - `connect.reward.g2a_offchain`,
  - `connect.reward.g2a_onchain`.

Payload таких событий:

```json
{
  "reward_action_id": "reward-uuid",
  "target_user_id": "user-uuid",
  "reward_type": "points",
  "amount": 100,
  "currency": "points",
  "reason": "quest.completed",
  "metadata": {
    "quest_id": "quest-uuid",
    "source_event_id": "event-uuid"
  }
}
```

Points/NFT/Blockchain Gateway после обработки могут публиковать:
- `connect.reward.completed`,
- `connect.reward.failed`,
чтобы Connect обновил статус `RewardAction`.
