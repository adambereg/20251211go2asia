# NFT Service — Data Model

Модель NFT Service опирается на несколько ключевых сущностей:

1. **NFTType** — описание типа бейджа и базовые правила.
2. **NFTLevelRule** — уровни внутри типа (Level I, II, III).
3. **NFTInstance** — конкретный экземпляр бейджа у пользователя.
4. **NFTProgress** — накопительный прогресс по достижению.
5. **NFTMintQueue** — задачи на ончейн-минт.
6. **NFTAuditLog** — история всех изменений.

---

## 1. NFTType — тип бейджа

Каталог достижений.

### Поля

- `id` (uuid, pk)
- `code` (string, unique)
  - `explorer`
  - `city_explorer`
  - `rf_reviewer`
  - `quest_author`
  - `premium_voucher_user`
- `title` (string) — название для UI.
- `description` (text).
- `category` (enum/string):
  - `traveler`,
  - `pro_creator`,
  - `rf_reputation`,
  - `referral`,
  - `system`.
- `base_image_url` (string) — базовая иконка, может модифицироваться уровнем.
- `is_onchain_capable` (bool) — может ли этот тип иметь ончейн-представление.
- `default_onchain_policy` (enum/string):
  - `never` — никогда не выводим в блокчейн;
  - `rare_and_above` — только уровни/редкости выше порога;
  - `by_user_request` — по явному действию пользователя;
  - `always` — любой экземпляр может быть ончейн.
- `metadata_schema` (jsonb) — описание динамических полей метаданных:
  - пример:
    ```json
    {
      "properties": {
        "level": { "type": "integer", "minimum": 1 },
        "quest_completed_count": { "type": "integer", "minimum": 0 },
        "city_count": { "type": "integer", "minimum": 0 }
      },
      "required": ["level"]
    }
    ```
- `created_at`, `updated_at`.

Индексы:
- `unique(code)`.

---

## 2. NFTLevelRule — уровни внутри типа

Описывает шаги прогресса и условия повышения уровня.

### Поля

- `id` (uuid, pk)
- `type_id` (uuid → NFTType)
- `level` (integer) — 1, 2, 3...
- `title` (string) — для конкретного уровня (может отличаться от базового).
- `description` (text).
- `rarity` (enum: `common`, `uncommon`, `rare`, `epic`, `legendary`).
- `image_url` (string, nullable) — иконка для данного уровня.
- `conditions` (jsonb) — формализованные условия:
  - примеры:
    ```json
    {
      "quest_completed_count": { "gte": 5 },
      "unique_cities_visited": { "gte": 3 }
    }
    ```
- `auto_mint_onchain` (bool) — минтить ли на блокчейне при достижении этого уровня по умолчанию.
- `order` (integer) — порядок уровней.
- `created_at`, `updated_at`.

---

## 3. NFTInstance — экземпляр NFT у пользователя

Физическая запись о том, что «пользователь X имеет бейдж Y уровня Z».

### Поля

- `id` (uuid, pk)
- `type_id` (uuid → NFTType)
- `user_id` (uuid)
- `current_level` (integer) — соответствует одному из NFTLevelRule.level.
- `status` (enum/string):
  - `active` — бейдж активен;
  - `revoked` — бейдж отозван (например, при мошенничестве);
  - `burned_onchain` — ончейн-версия сожжена и оффчейн помечен как выведенный/перенесённый.
- `onchain_token_id` (string, nullable) — ID токена в TON (если был минт).
- `onchain_status` (enum/string):
  - `not_minted` — не выпускался;
  - `pending` — в процессе выпуска;
  - `minted` — успешно выпущен;
  - `failed` — неудачный минт.
- `metadata` (jsonb):
  - фактические данные по этому экземпляру (число квестов, городов и т.п.).
- `external_id` (string, nullable) — идемпотентный ID от Connect (RewardAction id).
- `source_service` (string) — `connect_service`, `quest_service`, `referral_service` и др.
- `source_event_id` (string, nullable).
- `created_at`, `updated_at`.

Индексы:
- по `user_id`;
- по `type_id`;
- по `(user_id, type_id)` — быстро найти актуальный бейдж типа;
- по `external_id` (unique, nullable);
- по `onchain_token_id` (unique, nullable).

---

## 4. NFTProgress — накопительный прогресс

Не каждый прогресс немедленно создаёт NFT. Иногда сначала идёт накопление, затем — выдача/апгрейд.  
Эта сущность хранит собранную статистику для расчёта уровней.

### Поля

- `id` (uuid, pk)
- `type_id` (uuid → NFTType)
- `user_id` (uuid)
- `counters` (jsonb):
  - `quest_completed_count`,
  - `unique_cities_visited`,
  - `rf_reviews_posted`,
  - `partners_invited`,
  - и т.д.
- `last_event_at` (timestamp) — когда прогресс в последний раз обновлялся.
- `created_at`, `updated_at`.

Индексы:
- `(user_id, type_id)`.

---

## 5. NFTMintQueue — задачи на ончейн-минт

Очередь, связанная с Blockchain Gateway.

### Поля

- `id` (uuid, pk)
- `nft_instance_id` (uuid → NFTInstance)
- `status`:
  - `pending`,
  - `sent`,
  - `confirmed`,
  - `failed`.
- `retry_count` (int)
- `last_error` (text, nullable)
- `created_at`, `updated_at`.

---

## 6. NFTAuditLog — аудит операций

История всех значимых изменений.

### Поля

- `id` (uuid, pk)
- `nft_instance_id` (uuid, nullable) — может быть null для событий по типу (NFTType).
- `action` (string):
  - `created`,
  - `level_up`,
  - `metadata_updated`,
  - `submitted_onchain`,
  - `minted_onchain`,
  - `burned_onchain`,
  - `revoked`.
- `actor_service` (string) — кто инициировал: `connect_service`, `admin`, `system`.
- `details` (jsonb).
- `created_at`.
