# NFT Service — API Contracts

Версия: **v1**  
Базовый префикс (внутренний): `/api/nft/v1/`

NFT Service — **service-to-service API** + вспомогательные admin-эндпоинты.

---

## 1. Выдать или апгрейдить NFT (через RewardAction)

### POST `/internal/reward`

Основной вход Connect Service.

**Смысл:**  
Connect сообщает: «Пользователь X по правилу R заслужил NFT-типа T с прогрессом P».  
NFT Service:

- обновляет прогресс,
- создаёт NFTInstance (если его ещё нет),
- поднимает уровень, если достигнут порог.

**Request пример:**
```json
{
  "external_id": "reward_action_uuid",
  "user_id": "user-123",
  "type_code": "explorer",
  "increment": {
    "quest_completed_count": 1
  },
  "force_issue_if_not_exists": true,
  "source_service": "connect_service",
  "source_event_id": "event-uuid",
  "metadata_overrides": {
    "last_quest_id": "q-100"
  }
}
```

**Ответ (успешный):**
```json
{
  "nft_id": "nft-uuid",
  "type_code": "explorer",
  "user_id": "user-123",
  "current_level": 2,
  "status": "active",
  "onchain_status": "not_minted",
  "metadata": {
    "quest_completed_count": 5,
    "level": 2
  },
  "created": false,
  "leveled_up": true
}
```

Идемпотентность:

- по `external_id`:
  - повторный запрос вернёт тот же результат и не создаст дубли.

---

## 2. Создать NFT напрямую (админ / системный сценарий)

### POST `/internal/mint_simple`

Используется реже, для спец-наград или ручных корректировок.

**Request:**
```json
{
  "external_id": "manual-grant-uuid",
  "user_id": "user-123",
  "type_code": "top_referrer",
  "level": 1,
  "metadata": {
    "campaign_id": "autumn-2025"
  },
  "source_service": "admin_panel"
}
```

**Response:**
```json
{
  "nft_id": "uuid",
  "current_level": 1,
  "status": "active",
  "onchain_status": "not_minted"
}
```

---

## 3. Отправить NFT на ончейн-минт

### POST `/internal/nft/{nft_id}/submit_onchain`

Инициатор:

- сам NFT Service (фоновый воркер по правилам `auto_mint_onchain`),
- или пользователь через UI → API Gateway → NFT Service.

**Request (без тела или с опциями):**
```json
{
  "force": false
}
```

Проверки:

- `status = active`,
- `onchain_status in (not_minted, failed)`.

**Response:**
```json
{
  "nft_id": "uuid",
  "onchain_status": "pending"
}
```

---

## 4. Callback от Blockchain Gateway

### POST `/internal/onchain/callback`

Вызов из Blockchain Gateway после транзакции в TON.

**Request:**
```json
{
  "nft_id": "uuid",
  "status": "minted",
  "onchain_token_id": "123456789",
  "tx_hash": "0xabcd...",
  "chain": "ton-mainnet",
  "error": null
}
```

или при ошибке:

```json
{
  "nft_id": "uuid",
  "status": "failed",
  "onchain_token_id": null,
  "tx_hash": null,
  "chain": "ton-mainnet",
  "error": "INSUFFICIENT_GAS"
}
```

**Response 200:**
```json
{ "ok": true }
```

NFT Service:

- обновляет `onchain_status`,
- записывает `onchain_token_id` и детали в AuditLog.

---

## 5. Получить список NFT пользователя

### GET `/internal/user/{user_id}`

Опциональные query-параметры:

- `type_code`
- `only_active` (bool, по умолчанию true)
- `include_progress` (bool)

**Response:**
```json
{
  "user_id": "user-123",
  "items": [
    {
      "nft_id": "uuid-1",
      "type_code": "explorer",
      "current_level": 2,
      "status": "active",
      "onchain_status": "minted",
      "onchain_token_id": "123456",
      "metadata": {
        "quest_completed_count": 7,
        "level": 2
      }
    },
    {
      "nft_id": "uuid-2",
      "type_code": "rf_reviewer",
      "current_level": 1,
      "status": "active",
      "onchain_status": "not_minted",
      "metadata": {
        "rf_reviews_posted": 3,
        "level": 1
      }
    }
  ],
  "progress": [
    {
      "type_code": "explorer",
      "counters": {
        "quest_completed_count": 7
      }
    }
  ]
}
```

Используется:

- в профиле пользователя,
- в Connect / Space, чтобы отрисовать «витрину достижений».

---

## 6. Получить один NFT

### GET `/internal/nft/{nft_id}`

**Response:**
```json
{
  "nft_id": "uuid",
  "type_code": "explorer",
  "user_id": "user-123",
  "current_level": 2,
  "status": "active",
  "onchain_status": "minted",
  "onchain_token_id": "123456",
  "metadata": { ... }
}
```

---

## 7. Поиск/фильтрация NFT (админ / аналитика)

### GET `/internal/search`

Параметры:

- `user_id`
- `type_code`
- `min_level`, `max_level`
- `status`
- `onchain_status`
- `date_from`, `date_to`
- `page`, `page_size`

**Response:**
```json
{
  "items": [ /* список NFT */ ],
  "page": 1,
  "page_size": 20,
  "total": 135
}
```

---

## 8. Управление типами и правилами (admin-only)

### GET `/internal/types`
### POST `/internal/types`
### PATCH `/internal/types/{id}`

### GET `/internal/types/{id}/levels`
### POST `/internal/types/{id}/levels`
### PATCH `/internal/levels/{level_id}`

Эти эндпоинты будут использоваться только административными инструментами (через отдельный auth).
