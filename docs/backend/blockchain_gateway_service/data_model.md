# Blockchain Gateway Service — Data Model

Основная сущность — **BlockchainTask**. Вокруг неё строятся остальные структуры.

## 1. BlockchainTask

Каждая on-chain операция отображается как задача.

### Поля

- `id` (uuid, pk) — идентификатор задачи.
- `external_id` (string, unique per source_service) — идемпотентный ID, приходящий от инициирующего сервиса (например, reward_action_id из Connect).
- `task_type` (enum):
  - `g2a_mint`
  - `g2a_burn`
  - `g2a_transfer`
  - `nft_mint`
  - `nft_upgrade`
  - `wallet_link_validation`
- `payload` (jsonb) — параметры операции:
  - для G2A:
    - `user_id`
    - `amount`
    - `to_address`
    - `from_address` / `custody_wallet`
    - `reason`
  - для NFT:
    - `user_id`
    - `nft_id` (offchain ID из NFT Service)
    - `metadata` (type_code, level, image_url, description, extras)
  - для wallet linking:
    - `user_id`
    - `ton_address`
    - `challenge`
    - `signature`
- `status` (enum):
  - `pending` — задача создана, ожидает обработки.
  - `signed` — сформирована и подписана транзакция.
  - `sent` — транзакция отправлена в сеть TON.
  - `confirmed` — операция подтверждена.
  - `failed` — операция завершилась ошибкой.
- `tx_hash` (string, nullable) — хэш транзакции.
- `ton_op_id` (string, nullable) — ID операции/сообщения в TON (если используется).
- `retry_count` (int) — количество повторных попыток.
- `last_error` (text, nullable) — последнее сообщение об ошибке.
- `source_service` (string) — инициатор: `connect_service`, `nft_service`, `points_service`, `user_service`, `admin`.
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Индексы

- `unique(external_id, source_service)`
- `idx_blockchain_tasks_status`
- `idx_blockchain_tasks_user_id`
- `idx_blockchain_tasks_tx_hash`

---

## 2. WalletBinding

Привязка внешнего TON‑адреса к пользователю Go2Asia.

### Поля

- `user_id` (uuid, pk-part)
- `ton_address` (string, pk-part)
- `verified` (bool) — подтверждён ли адрес.
- `verification_method` (enum: `signature`, `tonconnect`).
- `created_at` (timestamp)
- `verified_at` (timestamp, nullable)
- `is_primary` (bool) — основной адрес для выводов.

Индексы:

- `idx_wallet_binding_user_id`
- `unique(ton_address)` — один адрес не может принадлежать двум пользователям.

---

## 3. GatewayAuditLog

Журнал всех критичных действий.

### Поля

- `id` (uuid, pk)
- `task_id` (uuid, nullable) — может быть null для системных событий.
- `action` (string):
  - `task_created`
  - `task_signed`
  - `task_sent`
  - `task_confirmed`
  - `task_failed`
  - `wallet_link_requested`
  - `wallet_link_verified`
  - `security_violation`
- `details` (jsonb) — расшифровка, включая коды ошибок, tx_hash, блок и т.п.
- `created_at` (timestamp)

---

## 4. KeyVaultReference (опционально)

Если требуется явно фиксировать в БД параметры ключей.

### Поля

- `key_id` (string, pk)
- `purpose` (enum: `g2a_minter`, `nft_minter`, `custody_wallet_main`, `custody_wallet_reserve`)
- `algorithm` (string) — например, `ed25519`.
- `hsm_slot` (string) — идентификатор в HSM/Vault.
- `created_at` (timestamp)

Обычно полноценная инфа о ключах хранится в внешнем Vault, а в БД — только ссылки/псевдонимы.
