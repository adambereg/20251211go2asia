# Referral Service — Data Model

## 1. ReferralCampaign

Реферальная кампания — набор правил начисления за определённый тип событий.

### Поля

- `id` (uuid, pk)
- `code` (string, unique) — системный идентификатор.
- `name` (string)
- `description` (text, nullable)

Тип кампании:

- `campaign_type` (enum):
  - `user_invite` — приглашение новых пользователей;
  - `partner_onboarding` — привлечение бизнес-партнёров RF;
  - `purchase` — покупки (квесты, ваучеры, бронирования);
  - `custom` — прочие.

Область действия:

- `scope` (jsonb) — ограничения:
  - `module` (`quest`, `voucher`, `rielt`, `rf`, `space` и т.п.);
  - `country_id` / `city_id` (при необходимости);
  - `rf_partner_id` (для кампаний конкретного партнёра).

Правила вознаграждения (пример для двухуровневой схемы):

- `reward_rules` (jsonb), например:
  ```json
  {
    "levels": {
      "level1": {
        "points_per_registration": 100,
        "points_per_purchase": 10
      },
      "level2": {
        "points_per_registration": 50,
        "points_per_purchase": 5,
        "locked_until_role": "vip"
      }
    },
    "limits": {
      "max_events_per_referred": 1,
      "max_events_per_referrer": 500
    }
  }
  ```

Интерпретация:

- `level1` — награды за рефералов;
- `level2` — награды за субрефералов:
  - могут быть заблокированы, пока пользователь не достигнет роли `locked_until_role` (`vip`, `pro` и т.п.).

Статус и даты:

- `status` (enum): `draft`, `active`, `paused`, `archived`
- `start_at` (timestamp, nullable)
- `end_at` (timestamp, nullable)
- `created_at`, `updated_at`

---

## 2. ReferralLink

Реферальная ссылка / код, выдаваемая конкретному пользователю в рамках кампании.

### Поля

- `id` (uuid, pk)
- `campaign_id` (uuid, fk → ReferralCampaign)
- `owner_user_id` (uuid, fk → User) — кому принадлежит ссылка.
- `code` (string, unique) — короткий код (часть URL).
- `deep_link_payload` (jsonb, nullable) — информация о том, куда ведёт ссылка:
  - модуль/страница (`quest`, `voucher`, `rielt_listing`),
  - `target_id` (например, конкретный квест),
  - UTM-данные и пр.
- `created_at`, `updated_at`
- `is_active` (bool, default: true)

---

## 3. ReferralRelation

Факт прямой реферальной связи между referrer и referred (1-й уровень).

### Поля

- `id` (uuid, pk)
- `campaign_id` (uuid, fk → ReferralCampaign)
- `referrer_user_id` (uuid, fk → User) — тот, кто пригласил.
- `referred_user_id` (uuid, fk → User) — приглашённый пользователь.
- `referral_link_id` (uuid, fk → ReferralLink, nullable)
- `created_at` (timestamp)
- `source` (enum): `link`, `code`, `manual`, `import`

Для вычисления 2-го уровня (субрефералов) используется цепочка ReferralRelation:

- если A → B и B → C, то:
  - B — реферал A (1-й уровень);
  - C — субреферал A (2-й уровень).

---

## 4. PartnerReferralRelation

Связь пользователя (чаще PRO) ↔ бизнес-партнёр RF.

### Поля

- `id` (uuid, pk)
- `campaign_id` (uuid, fk)
- `referrer_user_id` (uuid, fk → User) — пригласивший пользователя.
- `business_partner_id` (uuid, fk → RF Service)
- `referral_link_id` (uuid, fk → ReferralLink, nullable)
- `created_at` (timestamp)
- `status` (enum): `pending_onboarding`, `onboarded`, `rejected`

---

## 5. ReferralEvent

Единичное событие, которое может иметь реферальное значение (регистрация, покупка квеста, покупка премиум-ваучера, бронь и т.д.).

### Поля

- `id` (uuid, pk)
- `campaign_id` (uuid, fk)
- `event_type` (string/enum):
  - `user_registered`,
  - `quest_purchased`,
  - `voucher_premium_purchased`,
  - `rielt_booking_made`,
  - `rf_partner_onboarded`,
  - и т.п.
- `referrer_user_id` (uuid, fk → User, nullable) — основной реферер (1-й уровень).
- `referred_user_id` (uuid, fk → User, nullable)
- `business_partner_id` (uuid, fk → RF Service, nullable)
- `subject_type` (string, nullable) — `quest`, `voucher`, `booking`, `partner`, ...
- `subject_id` (string, nullable) — ID сущности (например, `quest_id`).
- `amount_base` (numeric, nullable) — база для расчёта вознаграждения (стоимость покупки, цена ваучера и т.п.).
- `metadata` (jsonb, nullable)
- `occurred_at` (timestamp)
- `created_at` (timestamp)

---

## 6. ReferralReward

Факт рассчитанного вознаграждения по ReferralEvent.

### Поля

- `id` (uuid, pk)
- `referral_event_id` (uuid, fk → ReferralEvent)
- `beneficiary_user_id` (uuid, fk → User)
- `beneficiary_level` (smallint, nullable)
  - `1` — реферал (пригласитель для данного события),
  - `2` — субреферал (пригласитель уровня 2),
  - `null` — если уровень не применим (например, welcome-бонус приглашённому).
- `points_amount` (int, nullable)
- `g2a_amount` (numeric, nullable)

Статус:

- `status` (enum):
  - `pending` — готово к отправке в Points/Token,
  - `locked` — рассчитано, но заблокировано (например, до апгрейда роли),
  - `sent_to_points`,
  - `sent_to_token`,
  - `completed`,
  - `failed`.

Дополнительные поля:

- `required_min_role` (enum: `user`, `vip`, `pro`, nullable)
  - если задано, награда может перейти из `locked` в `pending`, когда роль пользователя достигнет этого уровня;
- `external_tx_id` (string, nullable)
- `created_at`, `updated_at`

---

## 7. ReferralStats

Агрегированная статистика по пользователю или партнёру.

### Поля

- `id` (uuid, pk)
- `user_id` (uuid, fk → User)
- `campaign_id` (uuid, fk → ReferralCampaign)
- `total_referred_users` (int)
- `total_events` (int)
- `total_points_earned` (bigint)
- `total_g2a_earned` (numeric)
- `updated_at` (timestamp)
