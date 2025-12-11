# Blockchain Gateway Service — API Contracts

Префикс внутренних маршрутов: `/internal/blockchain/v1/`

Все эндпоинты — **service-to-service only**, не доступны напрямую с фронтенда.

---

## 1. Операции с G2A токеном

### 1.1. Mint G2A

**POST** `/g2a/mint`

Инициатор: Connect Service / Points Service.

**Request:**
```json
{
  "external_id": "reward_action_123",
  "user_id": "user-uuid",
  "amount": 150,
  "to_address": "EQD.....TON",
  "source_service": "connect_service",
  "reason": "reward_for_quest_campaign"
}
```

**Ответ:**
```json
{
  "task_id": "task-uuid",
  "status": "pending"
}
```

---

### 1.2. Transfer G2A (вывод пользователю)

**POST** `/g2a/transfer`

**Request:**
```json
{
  "external_id": "withdraw_2025_0001",
  "user_id": "user-uuid",
  "amount": 250,
  "from_account": "custody_main",
  "to_address": "EQD.....TON",
  "source_service": "connect_service"
}
```

**Response:**
```json
{
  "task_id": "task-uuid",
  "status": "pending"
}
```

---

### 1.3. Burn G2A

**POST** `/g2a/burn`

**Request:**
```json
{
  "external_id": "burn_987",
  "user_id": "user-uuid",
  "amount": 100,
  "reason": "convert_to_points",
  "source_service": "points_service"
}
```

**Response:**
```json
{
  "task_id": "task-uuid",
  "status": "pending"
}
```

---

## 2. Операции с NFT

### 2.1. Mint NFT

**POST** `/nft/mint`

Инициатор: NFT Service.

**Request:**
```json
{
  "external_id": "nft_reward_123",
  "user_id": "user-uuid",
  "nft_id": "offchain-nft-id",
  "metadata": {
    "type_code": "explorer",
    "level": 3,
    "title": "Explorer III",
    "description": "Пройдено 10 квестов",
    "image_url": "https://cdn.go2asia.app/nft/explorer3.png",
    "attributes": {
      "quests_completed": 10,
      "cities": 3
    }
  },
  "source_service": "nft_service"
}
```

**Response:**
```json
{
  "task_id": "task-uuid",
  "status": "pending"
}
```

---

### 2.2. Upgrade NFT (burn + mint)

**POST** `/nft/upgrade`

**Request:**
```json
{
  "external_id": "nft_upgrade_555",
  "user_id": "user-uuid",
  "nft_id": "offchain-nft-id",
  "current_onchain_token_id": "123456",
  "new_metadata": {
    "type_code": "explorer",
    "level": 4,
    "title": "Explorer IV",
    "description": "Пройдено 20 квестов",
    "image_url": "https://cdn.go2asia.app/nft/explorer4.png",
    "attributes": {
      "quests_completed": 20,
      "cities": 5
    }
  },
  "source_service": "nft_service"
}
```

Ответ аналогичен `nft/mint`.

---

## 3. Привязка TON-кошелька (Wallet Linking)

### 3.1. Запрос на привязку

**POST** `/wallet/link/request`

Инициатор: User Service / BFF.

**Request:**
```json
{
  "user_id": "user-uuid",
  "ton_address": "EQD.....TON"
}
```

**Response:**
```json
{
  "challenge": "random_string_to_sign"
}
```

---

### 3.2. Подтверждение владения кошельком

**POST** `/wallet/link/confirm`

**Request:**
```json
{
  "user_id": "user-uuid",
  "ton_address": "EQD.....TON",
  "signature": "base64-encoded-signature",
  "challenge": "random_string_to_sign"
}
```

**Response (успех):**
```json
{
  "user_id": "user-uuid",
  "ton_address": "EQD.....TON",
  "verified": true
}
```

---

## 4. Статус задачи

### GET `/task/{task_id}`

**Response:**
```json
{
  "task_id": "task-uuid",
  "status": "confirmed",
  "task_type": "g2a_transfer",
  "tx_hash": "0xabc...",
  "last_error": null,
  "created_at": "...",
  "updated_at": "..."
}
```

---

## 5. Callback от TON / ноды / TonAPI

### POST `/callback/tx`

Вызывается внутренним тон-адаптером/воркером после получения информации о транзакции.

**Request:**
```json
{
  "task_id": "task-uuid",
  "status": "confirmed",
  "tx_hash": "0xabc...",
  "block": 9999999,
  "raw": {
    "lt": "...",
    "fee": 0.02,
    "timestamp": 1733660000
  }
}
```

В случае неуспеха:

```json
{
  "task_id": "task-uuid",
  "status": "failed",
  "error": "NOT_ENOUGH_GAS",
  "tx_hash": null,
  "raw": { "code": 123, "message": "..." }
}
```

**Response:**
```json
{ "ok": true }
```
