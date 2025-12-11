# Referral Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/referral/v1/`**

Referral Service предоставляет:

- пользовательские API (получение реферальных ссылок, статистика);
- API для PRO/админов (кампании, отчёты);
- internal API для других микросервисов (регистрация реферальных событий);
- internal API для реакции на апгрейд роли пользователя (разблокировка наград).

Этот документ описывает только HTTP-контракты.  
Структура данных — в `data_model.md`.

---

## 1. Пользовательские ссылки и статистика

### 1.1. GET `/my/links`

Список реферальных ссылок текущего пользователя.

**Query-параметры:**

- `campaign_type` (опционально) — `user_invite`, `partner_onboarding`, `purchase`.

**Пример ответа:**
```json
{
  "items": [
    {
      "id": "link-uuid",
      "campaign_id": "camp-user-invite",
      "campaign_type": "user_invite",
      "code": "ADAM123",
      "url": "https://go2asia.space/ref/ADAM123",
      "created_at": "2025-01-01T10:00:00Z",
      "is_active": true
    }
  ]
}
```

---

### 1.2. POST `/my/links`

Создать новую реферальную ссылку для текущего пользователя в рамках определённой кампании.

**Request:**
```json
{
  "campaign_code": "user_invite_default",
  "deep_link_payload": {
    "module": "space",
    "target": "app_home"
  }
}
```

**Response 201:**
```json
{
  "id": "link-uuid",
  "code": "ADAM123",
  "url": "https://go2asia.space/ref/ADAM123"
}
```

---

### 1.3. GET `/my/stats`

Базовая статистика по реферальной активности пользователя.

**Response (пример):**
```json
{
  "campaigns": [
    {
      "campaign_id": "camp-user-invite",
      "campaign_type": "user_invite",
      "name": "Приглашай друзей",
      "total_referred_users": 12,
      "total_events": 30,
      "total_points_earned": 3500,
      "total_g2a_earned": 0
    }
  ]
}
```

---

## 2. Реферальные связи user → user

### 2.1. POST `/public/track-click/{code}`

Endpoint, вызываемый фронтендом при переходе по реферальной ссылке (для аналитики).

**Response:**
```json
{
  "code": "ADAM123",
  "campaign_code": "user_invite_default",
  "valid": true
}
```

---

### 2.2. POST `/internal/user-registered`

Internal endpoint для User Service: регистрация нового пользователя и связывание с реферером (1-й уровень).

**Request:**
```json
{
  "new_user_id": "user-new-uuid",
  "referral_code": "ADAM123",
  "campaign_code": "user_invite_default",
  "registered_at": "2025-01-01T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "referrer_user_id": "user-ref-uuid",
  "relation_id": "relation-uuid"
}
```

Если код невалиден, `success=false`, но регистрация пользователя в User Service всё равно происходит — Referral Service только дополняет данные реферальной связью.

---

## 3. Рефералы к бизнес-партнёрам RF

### 3.1. POST `/internal/partner-onboarded`

Internal endpoint для RF Service.  
Используется, когда бизнес-партнёр завершил онбординг.

**Request:**
```json
{
  "business_partner_id": "partner-uuid",
  "onboarding_user_id": "user-uuid",
  "campaign_code": "partner_onboarding_default",
  "occurred_at": "2025-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "referral_event_id": "evt-uuid"
}
```

Referral Service создаёт:

- `PartnerReferralRelation` (если ещё нет),
- `ReferralEvent` типа `rf_partner_onboarded`,
- один или несколько `ReferralReward` для приглашавшего пользователя.

---

## 4. Реферальные события покупок / бронирований

### 4.1. POST `/internal/event`

Общий internal endpoint для регистрации реферальных событий (покупка квеста, премиум-ваучера, брони и т.д.).

**Request (пример для покупки квеста):**
```json
{
  "event_type": "quest_purchased",
  "campaign_code": "quest_purchase_default",
  "referrer_user_id": "user-ref-uuid",
  "referred_user_id": "user-buyer-uuid",
  "subject_type": "quest",
  "subject_id": "quest-uuid",
  "amount_base": 500,
  "occurred_at": "2025-01-02T09:00:00Z",
  "metadata": {
    "quest_run_id": "quest-run-uuid"
  }
}
```

**Response:**
```json
{
  "success": true,
  "referral_event_id": "evt-uuid",
  "rewards": [
    {
      "beneficiary_user_id": "user-ref-uuid",
      "beneficiary_level": 1,
      "points_amount": 100,
      "g2a_amount": 0
    },
    {
      "beneficiary_user_id": "user-upper-uuid",
      "beneficiary_level": 2,
      "points_amount": 50,
      "g2a_amount": 0,
      "status": "locked"
    }
  ]
}
```

> Уровень 2 (субреферал) может быть сразу помечен как `locked`, если кампания требует `locked_until_role` для получения этих наград.

---

## 5. Admin API (кампании, отчёты)

### 5.1. GET `/admin/campaigns`

Список всех кампаний.

---

### 5.2. POST `/admin/campaigns`

Создание кампании.

**Request (сокращённо):**
```json
{
  "code": "quest_purchase_default",
  "name": "Рефералка по квестам",
  "campaign_type": "purchase",
  "scope": {
    "module": "quest"
  },
  "reward_rules": {
    "levels": {
      "level1": {
        "points_per_purchase": 10
      },
      "level2": {
        "points_per_purchase": 5,
        "locked_until_role": "vip"
      }
    }
  }
}
```

---

### 5.3. PATCH `/admin/campaigns/{id}`

Обновление кампании / статуса (`active`, `paused`, `archived`).

---

### 5.4. GET `/admin/reports/users`

Агрегированный отчёт по пользователям (referrer’ам).

**Query-параметры:**

- `campaign_id` (опционально),
- `from`, `to` (диапазон дат),
- `min_points_earned`, `min_referred`.

**Response (пример):**
```json
{
  "items": [
    {
      "user_id": "user-ref-uuid",
      "total_referred_users": 10,
      "total_events": 25,
      "total_points_earned": 3200,
      "total_g2a_earned": 0
    }
  ]
}
```

---

## 6. Internal: апгрейд роли и разблокировка наград

### 6.1. POST `/internal/user-role-upgraded`

Endpoint от User Service для разблокировки наград субрефералов и включения начислений за покупки.

**Request:**
```json
{
  "user_id": "user-uuid",
  "old_role": "user",
  "new_role": "vip",
  "occurred_at": "2025-01-10T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "unlocked_rewards_count": 37
}
```

Логика внутри Referral Service:

- найти все `ReferralReward` для данного пользователя со статусом `locked`,
- проверить `required_min_role` и `new_role`,
- перевести подходящие награды в `pending`, чтобы Reward Worker мог их начислить.

---

## 7. Версионирование

- Текущая версия API: **v1** (`/api/referral/v1/...`).
- Ломающие изменения должны выпускаться как `/api/referral/v2/...` с параллельной поддержкой v1.
