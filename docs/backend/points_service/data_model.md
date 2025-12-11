# Points Service — Data Model

Сервис использует модель **журнала транзакций (ledger)**:
- каждая операция записывается как отдельная транзакция;
- транзакции не изменяются;
- текущий баланс можно получить как сумму всех `completed` операций по пользователю.

Для оптимизации могут использоваться агрегированные таблицы балансов.

---

## 1. PointsTransaction

Базовая сущность — запись в журнале операций.

### Поля

- `id` (uuid, pk) — внутренний идентификатор транзакции.
- `external_id` (string, unique, nullable) — внешний идемпотентный ID, передаваемый вызывающим сервисом:
  - например, `connect_reward_action_id`, `quest_purchase_id`, `voucher_purchase_id`.
- `user_id` (uuid) — идентификатор пользователя, чей баланс изменяется.
- `type` (enum/string):
  - `credit` — начисление Points,
  - `debit` — списание Points,
  - `hold` — постановка в холд (резервирование),
  - `release` — освобождение холда (частично или полностью).
- `amount` (numeric, > 0) — величина операции (в Points).
- `currency` (string) — на этапе MVP: всегда `"points"`.
  - в будущем возможно добавление колонок `currency`/`wallet_type` для других офчейн-валют.
- `reason` (string) — краткая причина операции:
  - `quest.completed_reward`,
  - `quest.purchase`,
  - `voucher.premium_purchase`,
  - `rielt.booking_paid`,
  - `referral.reward_level1`,
  - и т.п.
- `source_service` (string) — кто инициировал:
  - `connect_service`,
  - `quest_service`,
  - `voucher_service`,
  - `rielt_service`,
  - др.
- `source_event_id` (string/uuid, nullable) — идентификатор события в исходном сервисе:
  - например, `connect_reward_action_id` или `booking_id`.
- `metadata` (jsonb) — произвольные детали:
  - `quest_id`, `rf_partner_id`, `listing_id`, `voucher_id`, `referral_level`, `campaign_id` и др.
- `status` (enum/string):
  - `pending` — транзакция создана, но ещё не применена (опционально, при двухфазной модели),
  - `completed` — успешно применена к балансу,
  - `failed` — не применена (ошибка).
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Индексы

- по `user_id` — для выборки транзакций пользователя;
- по `external_id` — для идемпотентности;
- по `(source_service, source_event_id)` — для диагностики;
- по `created_at` — для аналитики.

---

## 2. PointsHold

Сущность для **резервирования** части баланса (например, при покупке квеста, бронировании жилья, оплате премиум-ваучера):

- сначала сумма ставится в холд,
- при успешном завершении операции — холд конвертируется в списание,
- при отмене — холд снимается.

### Поля

- `id` (uuid, pk)
- `user_id` (uuid)
- `amount` (numeric, > 0)
- `currency` (string, `"points"`)
- `status` (enum/string):
  - `active` — активный холд;
  - `released` — холд был освобождён (средства вернулись в доступный баланс без списания);
  - `captured` — холд был «захвачен» и конвертирован в списание;
  - `cancelled` — холд был отменён по ошибке/истечению срока.
- `related_transaction_id` (uuid, nullable):
  - ссылка на транзакцию типа `hold`, которая его породила;
- `expires_at` (timestamp, nullable) — срок жизни холда (по бизнес-логике).
- `created_at`, `updated_at`

### Примечания

- холды можно реализовывать либо отдельной таблицей, либо как часть `PointsTransaction` с особыми типами;
- при запросе «доступный баланс» учитываются активные холды.

---

## 3. UserBalance (кэш-агрегат)

Теоретически баланс всегда можно вычислить как сумму транзакций.  
Однако для производительности часто удобно хранить **агрегированную** таблицу балансов:

### Поля

- `user_id` (uuid, pk)
- `available_balance` (numeric) — баланс, доступный для трат (учитывая холды).
- `total_balance` (numeric) — общий баланс (включая средства в холде).
- `currency` (string, `"points"`)
- `updated_at` (timestamp)

### Обновление

- после каждой `completed` транзакции Points Service:
  - пересчитывает баланс по формуле:
    - `total_balance = total_balance + credit - debit`
    - `available_balance = total_balance - sum(active_holds)`

---

## 4. IdempotencyKey (опционально)

Если хотите отделить `external_id` от транзакций, можно иметь таблицу:

- `idempotency_key`:
  - `key` (string, pk)
  - `last_transaction_id` (uuid, nullable)
  - `created_at`, `expires_at`

Но в MVP достаточно поля `external_id` в `PointsTransaction`.
