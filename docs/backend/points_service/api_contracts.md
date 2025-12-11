# Points Service — API Contracts

Версия: **v1**  
Базовый путь (внутренний): `/api/points/v1/`

Points Service предоставляет **только внутренний API** для других микросервисов.  
Логика:
- доменные сервисы (Quest, Voucher, Rielt и т.д.) могут использовать Points для оплат/холдов,
- Connect Service — для наград (credit).

---

## 1. Начисление Points (credit)

### POST `/internal/credit`

Начисляет Points пользователю.

**Request:**
```json
{
  "external_id": "reward-action-uuid",
  "user_id": "user-uuid",
  "amount": 150,
  "currency": "points",
  "reason": "quest.completed_reward",
  "source_service": "connect_service",
  "source_event_id": "event-uuid",
  "metadata": {
    "quest_id": "quest-uuid",
    "campaign_id": "campaign-uuid"
  }
}
```

**Response 200:**
```json
{
  "transaction_id": "tx-uuid",
  "status": "completed",
  "new_balance": 12450
}
```

Особенности:

- если приходит повторный запрос с тем же `external_id`:
  - сервис должен вернуть **тот же** `transaction_id` и не создавать новую транзакцию,
  - это обеспечивает идемпотентность.

---

## 2. Списание Points (debit)

Сценарий: покупка квестов, ваучеров, внутренняя оплата.

### POST `/internal/debit`

**Request:**
```json
{
  "external_id": "quest-purchase-uuid",
  "user_id": "user-uuid",
  "amount": 500,
  "currency": "points",
  "reason": "quest.purchase",
  "source_service": "quest_service",
  "source_event_id": "quest-run-uuid",
  "metadata": {
    "quest_id": "quest-uuid"
  }
}
```

**Возможные ответы:**

- `200 OK` при успехе:
  ```json
  {
    "transaction_id": "tx-uuid",
    "status": "completed",
    "new_balance": 900
  }
  ```
- `400 Bad Request` если данные некорректны.
- `409 Conflict` (или `422`) если недостаточно средств:
  ```json
  {
    "error": "INSUFFICIENT_FUNDS",
    "current_balance": 300
  }
  ```

---

## 3. Холды (hold)

Холды используются, когда нужно **зарезервировать** сумму перед заключительной операцией.

### POST `/internal/hold`

**Request:**
```json
{
  "external_id": "booking-hold-uuid",
  "user_id": "user-uuid",
  "amount": 1000,
  "currency": "points",
  "reason": "rielt.booking_hold",
  "source_service": "rielt_service",
  "source_event_id": "booking-uuid",
  "metadata": {
    "listing_id": "listing-uuid"
  }
}
```

**Response:**
```json
{
  "hold_id": "hold-uuid",
  "status": "active",
  "available_balance": 500
}
```

Ошибки:

- `INSUFFICIENT_FUNDS` — если нет достаточного доступного баланса для создания холда.

---

## 4. Освобождение холда (release)

Используется при отмене операции или при частичном освобождении средств.

### POST `/internal/hold/{hold_id}/release`

**Request:**
```json
{
  "amount": 1000
}
```

Если сумма не указана — освобождается весь холд.

**Response:**
```json
{
  "hold_id": "hold-uuid",
  "status": "released",
  "available_balance": 1500
}
```

---

## 5. Конвертация холда в списание (capture)

Вариант: вместо отдельного `debit`, можно реализовать endpoint «захвата» холда:

### POST `/internal/hold/{hold_id}/capture`

- создаётся транзакция `debit` на сумму холда,
- холд помечается как `captured`.

**Response:**
```json
{
  "hold_id": "hold-uuid",
  "status": "captured",
  "transaction_id": "tx-uuid",
  "new_balance": 500
}
```

---

## 6. Получение баланса

### GET `/internal/balance/{user_id}`

**Response:**
```json
{
  "user_id": "user-uuid",
  "currency": "points",
  "available_balance": 1200,
  "total_balance": 1500,
  "updated_at": "2025-01-10T10:00:00Z"
}
```

---

## 7. История транзакций

### GET `/internal/transactions`

**Query:**

- `user_id` (обязательный в большинстве случаев),
- `type` (credit/debit/hold/release),
- `source_service`,
- `reason`,
- `date_from`, `date_to`,
- `status`,
- `page`, `page_size`.

**Response:**
```json
{
  "items": [
    {
      "id": "tx-uuid",
      "external_id": "reward-action-uuid",
      "type": "credit",
      "amount": 150,
      "currency": "points",
      "reason": "quest.completed_reward",
      "source_service": "connect_service",
      "source_event_id": "event-uuid",
      "status": "completed",
      "created_at": "2025-01-10T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```
