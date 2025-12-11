# Quest Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/quest/v1/`**

Quest Service предоставляет:

- публичный каталог квестов (для просмотра и выбора),
- операции покупки и прохождения квестов,
- API создания/редактирования квестов для PRO и админов,
- internal API для других микросервисов.

Этот документ описывает **только HTTP-контракты Quest Service**.  
Структура данных вынесена в `data_model.md`.

---

## 1. Публичный каталог

### 1.1. GET `/catalog/quests`

Список опубликованных квестов.

**Query-параметры (MVP):**

- `country_id` — страна.
- `city_id` — город.
- `mode` — `location` | `online`.
- `quest_type` — `single` | `group`.
- `tags` — повторяющийся параметр: `tags=food&tags=kids`.
- `rf_partner_id` — конкретный RF-партнёр.
- `atlas_place_id` — квесты, содержащие шаги в этом месте.
- `has_premium_voucher` — `true|false`.
- `available_now` — `true|false` (учёт `start_at`/`end_at`).
- `sort` — `popular` | `newest` | `price_asc` | `duration_asc`.
- `page`, `page_size`.

**Пример ответа:**
```json
{
  "items": [
    {
      "id": "quest-uuid",
      "slug": "phuket-street-food-walk",
      "title": "Уличная еда Пхукета",
      "short_description": "Прогулка по лучшим точкам стрит-фуда с русским PRO-гидом",
      "quest_type": "single",
      "mode": "location",
      "structure_type": "linear",
      "difficulty": "medium",
      "duration_estimate_minutes": 120,
      "price_points": 500,
      "country_id": "th",
      "city_id": "phuket",
      "main_atlas_place_id": "atlas_place_123",
      "primary_rf_partner_id": "partner-uuid",
      "tags": ["food", "walk", "phuket"],
      "is_featured": true,
      "rating": 4.9,
      "completed_runs_count": 37
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 10
}
```

---

### 1.2. GET `/quests/{id}`

Детальная информация о квесте.

**Пример ответа:**
```json
{
  "id": "quest-uuid",
  "slug": "phuket-street-food-walk",
  "title": "Уличная еда Пхукета",
  "subtitle": "С PRO-гидом Иваном",
  "description": "Полное описание маршрута, особенностей и условий...",
  "quest_type": "single",
  "mode": "location",
  "structure_type": "linear",
  "difficulty": "medium",
  "duration_estimate_minutes": 120,
  "price_points": 500,
  "country_id": "th",
  "city_id": "phuket",
  "main_atlas_place_id": "atlas_place_123",
  "primary_rf_partner_id": "partner-uuid",
  "rf_partner_ids": ["partner-uuid", "partner-uuid-2"],
  "tags": ["food", "walk", "phuket"],
  "requires_space_post": true,
  "space_group_id": "space-group-uuid",
  "reward_points": 0,
  "reward_nft_template_id": "nft-template-quest-phuket-food",
  "reward_badge_label": "Покоритель уличной еды Пхукета",
  "pro_reward_points_per_purchase": 100,
  "status": "published",
  "author": {
    "user_id": "pro-user-uuid",
    "display_name": "Иван (PRO-гид)"
  },
  "steps": [
    {
      "id": "step-1",
      "order_index": 1,
      "title": "Старт в кафе RF-партнёра",
      "checkpoint_type": "gps",
      "atlas_place_id": "atlas_place_123",
      "rf_partner_id": "partner-uuid",
      "radius_meters": 100,
      "is_required": true
    },
    {
      "id": "step-2",
      "order_index": 2,
      "title": "Сфотографируй своё любимое блюдо",
      "checkpoint_type": "photo",
      "is_required": true
    },
    {
      "id": "step-3",
      "order_index": 3,
      "title": "Купи премиум-ваучер на десерт",
      "checkpoint_type": "premium_voucher",
      "required_premium_voucher_id": "voucher-premium-dessert"
    }
  ]
}
```

---

## 2. Покупка и запуск квеста

### 2.1. POST `/runs`

Покупка квеста и создание `QuestRun`.

**Требования:**

- пользователь должен быть **VIP-спейсером или выше**;
- списание Points происходит в Points Service, а Quest Service вызывается после успешной оплаты.

**Request:**
```json
{
  "quest_id": "quest-uuid",
  "group_members": [
    "user-uuid-1",
    "user-uuid-2"
  ]
}
```

**Response 201:**
```json
{
  "id": "quest-run-uuid",
  "quest_id": "quest-uuid",
  "status": "active",
  "purchase_points": 500,
  "purchase_time": "2025-01-01T10:00:00Z"
}
```

Коды ошибок (пример):

- `400` — некорректный запрос (не VIP, превышен `max_runs_per_user` и т.п.).
- `404` — квест не найден или не опубликован.
- `409` — конфликт (уже есть активный `QuestRun` для этого квеста).

---

### 2.2. GET `/runs/my`

Список активных и завершённых квестов текущего пользователя.

**Query-параметры:**

- `status` (опционально) — фильтр (`active`, `completed`, `failed`, ...).
- `page`, `page_size`.

**Пример ответа:**
```json
{
  "items": [
    {
      "id": "quest-run-uuid",
      "quest_id": "quest-uuid",
      "title": "Уличная еда Пхукета",
      "status": "active",
      "purchase_time": "2025-01-01T10:00:00Z",
      "completed_at": null,
      "progress": {
        "completed_steps": 1,
        "total_steps": 3
      }
    }
  ]
}
```

---

### 2.3. GET `/runs/{run_id}`

Подробности прохождения конкретного квеста.

**Response (пример):**
```json
{
  "id": "quest-run-uuid",
  "quest_id": "quest-uuid",
  "status": "active",
  "purchase_points": 500,
  "purchase_time": "2025-01-01T10:00:00Z",
  "completed_at": null,
  "steps": [
    {
      "step_id": "step-1",
      "title": "Старт в кафе RF-партнёра",
      "checkpoint_type": "gps",
      "status": "completed"
    },
    {
      "step_id": "step-2",
      "title": "Сфотографируй своё любимое блюдо",
      "checkpoint_type": "photo",
      "status": "pending"
    }
  ]
}
```

---

## 3. Выполнение чекпоинтов

Для всех эндпоинтов требуется авторизация и принадлежность к `QuestRun`.

### 3.1. POST `/runs/{run_id}/checkpoints/{step_id}/submit-gps`

**Request:**
```json
{
  "latitude": 7.895,
  "longitude": 98.298
}
```

**Response:**
```json
{
  "checkpoint_progress_id": "cp-uuid",
  "status": "auto_verified",
  "completed_at": "2025-01-01T11:00:00Z"
}
```

---

### 3.2. POST `/runs/{run_id}/checkpoints/{step_id}/submit-photo`

**Request:**
```json
{
  "photo_media_id": "media-uuid"
}
```

**Response:**
```json
{
  "checkpoint_progress_id": "cp-uuid",
  "status": "auto_verified",
  "completed_at": "2025-01-01T11:02:00Z"
}
```

---

### 3.3. POST `/runs/{run_id}/checkpoints/{step_id}/submit-qr`

**Request:**
```json
{
  "qr_value": "scanned-value"
}
```

**Response:**
```json
{
  "checkpoint_progress_id": "cp-uuid",
  "status": "auto_verified",
  "completed_at": "2025-01-01T11:03:00Z"
}
```

---

### 3.4. POST `/runs/{run_id}/checkpoints/{step_id}/submit-quiz`

**Request:**
```json
{
  "answers": {
    "type": "single_choice",
    "selected_option_ids": ["opt-2"]
  }
}
```

**Response:**
```json
{
  "checkpoint_progress_id": "cp-uuid",
  "status": "auto_verified",
  "completed_at": "2025-01-01T11:05:00Z"
}
```

Если авто-проверка невозможна/сомнительна → `status = "awaiting_review"`.

---

## 4. Привязка поста в Space Asia и завершение квеста

### 4.1. POST `/runs/{run_id}/attach-space-post`

Привязка поста-отчёта Space Asia к прохождению квеста.

**Request:**
```json
{
  "space_post_id": "space-post-uuid"
}
```

**Response:**
```json
{
  "success": true
}
```

---

### 4.2. POST `/runs/{run_id}/complete`

Попытка завершить квест.

Логика (внутри сервиса):

1. Проверить выполнение обязательных шагов.
2. Если `requires_space_post = true`:
   - должен быть привязан `space_post_id`;
   - при необходимости — одобрен PRO/модератором.

**Response (успех):**
```json
{
  "success": true,
  "status": "completed",
  "reward": {
    "nft_template_id": "nft-template-quest-phuket-food",
    "issued": true
  }
}
```

**Response (ошибка):**
```json
{
  "success": false,
  "error_code": "SPACE_POST_REQUIRED",
  "message": "Для завершения квеста требуется опубликованный и одобренный отчёт в Space."
}
```

---

## 5. Управление квестами (PRO / Admin)

### 5.1. POST `/quests`

Создание квеста (черновик).

**Request (пример):**
```json
{
  "title": "Уличная еда Пхукета",
  "quest_type": "single",
  "mode": "location",
  "structure_type": "linear",
  "difficulty": "medium",
  "price_points": 500,
  "country_id": "th",
  "city_id": "phuket",
  "main_atlas_place_id": "atlas_place_123",
  "requires_space_post": true,
  "space_group_id": "space-group-uuid",
  "rf_partner_ids": ["partner-uuid"],
  "reward_nft_template_id": "nft-template-quest-phuket-food",
  "reward_badge_label": "Покоритель уличной еды Пхукета",
  "pro_reward_points_per_purchase": 100
}
```

**Response 201:**
```json
{
  "id": "quest-uuid",
  "status": "draft"
}
```

---

### 5.2. PATCH `/quests/{id}`

Частичное обновление квеста.

---

### 5.3. PUT `/quests/{id}/steps`

Полная замена списка шагов.

**Request (пример):**
```json
{
  "steps": [
    {
      "order_index": 1,
      "title": "Старт в кафе RF-партнёра",
      "checkpoint_type": "gps",
      "atlas_place_id": "atlas_place_123",
      "rf_partner_id": "partner-uuid",
      "radius_meters": 100,
      "is_required": true
    },
    {
      "order_index": 2,
      "title": "Сфотографируй своё любимое блюдо",
      "checkpoint_type": "photo",
      "is_required": true
    },
    {
      "order_index": 3,
      "title": "Купи премиум-ваучер на десерт",
      "checkpoint_type": "premium_voucher",
      "rf_partner_id": "partner-uuid",
      "required_premium_voucher_id": "voucher-premium-dessert",
      "is_required": false
    }
  ]
}
```

---

### 5.4. POST `/quests/{id}/publish`

Публикация квеста.

- Для PRO:
  - может переводить в `pending_review`,
  - фактическую публикацию делает admin.
- Для admin:
  - может сразу поставить `status=published`.

**Response:**
```json
{
  "id": "quest-uuid",
  "status": "published"
}
```

---

### 5.5. GET `/my/quests`

Список квестов, созданных текущим PRO.

---

## 6. Admin / Internal API

### 6.1. POST `/admin/runs/{run_id}/approve-space-post`

Одобрение PRO/модератором финального поста.

**Request:**
```json
{
  "approved": true
}
```

**Response:**
```json
{
  "success": true,
  "space_post_approved": true
}
```

---

### 6.2. GET `/internal/quests/{id}/basic`

Базовая информация о квесте для других сервисов (Points, RF, Atlas, Recommendations и т.п.).

**Response (пример):**
```json
{
  "id": "quest-uuid",
  "title": "Уличная еда Пхукета",
  "quest_type": "single",
  "mode": "location",
  "price_points": 500,
  "reward_nft_template_id": "nft-template-quest-phuket-food",
  "pro_reward_points_per_purchase": 100,
  "status": "published"
}
```

---

## 7. Версионирование

- Текущая версия: **v1** (`/api/quest/v1/...`).
- Ломающие изменения добавляются как `/api/quest/v2/...` с параллельной поддержкой v1.
