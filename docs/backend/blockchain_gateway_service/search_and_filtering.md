# Blockchain Gateway Service — Search & Filtering

Поиск в Blockchain Gateway необходим:

- для админ-интерфейсов,
- для мониторинга и отладки,
- для внутренней аналитики on-chain активности.

## 1. Поиск по BlockchainTask

Параметры фильтрации:

- `task_type`:
  - g2a_mint, g2a_burn, g2a_transfer, nft_mint, nft_upgrade, wallet_link_validation.
- `status`:
  - pending, signed, sent, confirmed, failed.
- `user_id`:
  - все операции конкретного пользователя.
- `external_id`:
  - найти операцию по идентификатору из Connect/NFT/Points.
- `source_service`:
  - кто инициировал (connect, nft, points, admin).
- `date_from`, `date_to`:
  - по `created_at`.
- `tx_hash`:
  - поиск по конкретной транзакции в TON.

Пример эндпоинта (internal/admin):

`GET /internal/blockchain/v1/admin/tasks?status=pending&task_type=g2a_transfer`

---

## 2. Поиск по WalletBinding

Параметры:

- `user_id`
- `ton_address`
- `verified = true/false`

Использование:

- отображение привязанных кошельков в admin-интерфейсе,
- поиск конфликтов (когда пользователь жалуется: "мой адрес уже занят").

---

## 3. Использование на практике

- Поддержка дашборда:
  - «Сколько операций в очереди?»
  - «Сколько подтверждено / завалено за последние 24 часа?»
- Отладка:
  - поиск конкретной операции по `external_id` (из Connect) или `tx_hash`.
