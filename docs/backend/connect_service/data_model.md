# Connect Service — Data Model

Connect Service хранит **экономические события**, **правила наград** и **фактические действия по наградам**.
Он не ведёт балансы — этим занимается Points Service.

## 1. EconomicEvent

Нормализованное экономическое событие, по которому Connect Service должен принять решение.

### Поля

- `id` (uuid, pk) — внутренний идентификатор события Connect.
- `external_id` (string, nullable, unique) — идемпотентный идентификатор исходного события
  (например, `quest_event_id`, `booking_id`, `referral_event_id`).
- `event_type` (string) — тип события (бизнесовой семантики), например:
  - `referral.joined`,
  - `referral.subjoined`,
  - `user.upgraded_to_vip`,
  - `user.upgraded_to_pro`,
  - `quest.completed`,
  - `voucher.premium_purchased`,
  - `rielt.booking_paid`,
  - `rf_partner.review_created`,
  - `reaction.repost`,
  - `reaction.short_review`,
  - `reaction.completed`,
  - и др.
- `source_service` (string) — от какого сервиса пришло событие (`referral_service`, `quest_service`, `voucher_service`, `reactions_service`, `rielt_service`, `rf_service` и т.п.).
- `actor_user_id` (uuid, nullable) — пользователь, который инициировал действие
  (например, путешественник, прошедший квест или сделавший покупку).
- `primary_subject_user_id` (uuid, nullable) — пользователь, в отношении которого рассматривается награда
  (например, спонсор по реферальной программе, PRO-автор квеста, владелец RF-места и т.п.).
- `context` (jsonb) — контекст события:
  - идентификаторы сущностей (`quest_id`, `rf_place_id`, `rielt_listing_id`, `voucher_id` и т.п.),
  - суммы (`amount_points`, `amount_fiat`, `price_g2a`, `discount_percent`),
  - детализация (`rating`, `city_id`, `country`, `is_premium_voucher`, `is_first_purchase`, уровень реферала и т.д.).
- `status` (enum/string):
  - `pending` — событие принято, но награды ещё не рассчитаны,
  - `processed` — награды рассчитаны и отправлены,
  - `skipped` — награды не полагаются (условия не выполнены),
  - `failed` — ошибка при обработке (для отладки).
- `created_at` (timestamp)
- `processed_at` (timestamp, nullable)

### Индексы

- по `external_id` (уникальный) — защита от повторной обработки,
- по `event_type`,
- по `actor_user_id`,
- по `primary_subject_user_id`.

---

## 2. RewardRule

Правило, описывающее, какие награды выдать при наступлении того или иного события и при выполнении условий.

### Поля

- `id` (uuid, pk)
- `name` (string) — человекочитаемое название правила (`referral_first_level_registration`, `quest_completion_base_reward`, и т.п.).
- `description` (text) — описание для админов/документации.
- `event_type` (string) — какое событие триггерит правило (`referral.joined`, `quest.completed`, `voucher.premium_purchased` и т.д.).
- `condition` (jsonb) — условие применения:
  - простые фильтры:
    - `{"field": "context.is_premium_voucher", "op": "==", "value": true}`,
    - `{"field": "context.rating", "op": ">=", "value": 4}`,
  - либо более сложное дерево условий (AND/OR).
- `rewards` (jsonb) — список наград, которые выдать, если условие выполняется.
  Пример:
  ```json
  {
    "rewards": [
      {
        "type": "points",
        "target": "actor",       // actor / sponsor / sponsor2 / pro_author / rf_owner
        "amount": 100,
        "currency": "points"
      },
      {
        "type": "points",
        "target": "sponsor",
        "amount": 50,
        "currency": "points",
        "locked_until": "vip_or_pro" // выдаётся только после апгрейда
      },
      {
        "type": "nft",
        "target": "actor",
        "badge_type": "quest_completed_10",
        "conditions": { "min_completions": 10 }
      }
    ]
  }
  ```
- `priority` (integer) — порядок применения, если несколько правил подходят под одно событие.
- `enabled` (bool)
- `effective_from` (timestamp, nullable) — дата начала действия.
- `effective_to` (timestamp, nullable) — дата окончания (для временных кампаний).
- `created_at`, `updated_at`

### Идея

RewardRule позволяет:

- добавлять/изменять экономику без изменения кода,
- запускать временные кампании,
- разруливать коллизии при множестве подходящих правил по приоритету.

---

## 3. RewardAction

Фактическое «обещание» Connect Service выдать награду, с привязкой к конкретному событию и пользователю.

Connect не проводит транзакции баланса сам, но логирует все свои решения.

### Поля

- `id` (uuid, pk)
- `economic_event_id` (uuid, fk → EconomicEvent)
- `rule_id` (uuid, fk → RewardRule, nullable) — какое правило сработало (если применимо).
- `target_user_id` (uuid) — кому полагается награда.
- `reward_type` (enum/string):
  - `points`,
  - `nft`,
  - `g2a_offchain`,
  - `g2a_onchain` (вызов через Gateway).
- `amount` (numeric, nullable) — количество Points или G2A.
- `currency` (string, nullable) — `points`, `g2a`, др.
- `badge_type` (string, nullable) — тип NFT-бейджа (если `reward_type = nft`).
- `locked_until_condition` (string, nullable):
  - `vip_or_pro`, `none`, `manual_approval`, и т.п.
- `status` (enum/string):
  - `pending` — награда определена, но ещё не выполнена,
  - `dispatched` — команда отправлена в Points/NFT/Gateway,
  - `completed` — награда успешно применена (по callback’у или внутреннему подтверждению),
  - `failed` — ошибка при исполнении команды (для ручного разруливания).
- `error_code` (string, nullable)
- `created_at`, `updated_at`

### Индексы

- по `economic_event_id`,
- по `target_user_id`,
- по `status`.

---

## 4. Campaign (опционально, Фаза 2+)

Высокоуровневая сущность «кампании» — набор правил и метаданных.

### Поля

- `id` (uuid, pk)
- `name` (string)
- `description` (text)
- `status` (draft/active/paused/completed)
- `config` (jsonb) — дополнительные параметры (коэффициенты, лимиты).
- `created_at`, `updated_at`

RewardRule может иметь ссылку на кампанию (`campaign_id`), чтобы группировать правила.

---

## 5. AuditLog (simplified)

Для простоты можно использовать:

- `EconomicEvent` + `RewardAction` как полноценный аудит,
- либо развернуть отдельную таблицу `audit_logs` для внутренних тех. событий rule engine
  (полезно на поздних этапах).
