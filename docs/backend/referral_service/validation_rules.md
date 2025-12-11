# Referral Service — Validation Rules

## ReferralCampaign

- `code`:
  - обязательное,
  - уникальное,
  - длина 3–64 символа.
- `status`:
  - только `draft`, `active`, `paused`, `archived`.
- `reward_rules`:
  - валидная JSON-структура;
  - числовые поля (`points_per_*`, `g2a_per_*`) ≥ 0;
  - `max_events_per_*` ≥ 0 или отсутствуют.

---

## ReferralLink

- `owner_user_id` и `campaign_id` обязательны.
- `code`:
  - уникальный, без пробелов,
  - генерация должна проверять коллизии.

---

## ReferralRelation

- Один `referred_user_id` в рамках одной кампании может иметь только одного `referrer_user_id` (уникальное ограничение).
- Повторная регистрация события `user_registered` для одного и того же `referred_user_id` в одной кампании игнорируется.

---

## ReferralEvent

- `event_type` должен быть допустимым для кампании.
- `campaign_code` должен соответствовать активной кампании (иначе ошибка 400).
- `amount_base`:
  - если задана, должна быть ≥ 0.
- Если для кампании требуется наличие `referrer_user_id`, а он не передан — ошибка.

---

## ReferralReward

- `points_amount` и `g2a_amount` не могут быть отрицательными.
- `beneficiary_level`:
  - либо `1`, либо `2`, либо `null` (если не применимо).
- Если `status = "locked"`, то:
  - `required_min_role` должен быть задан (`vip` или `pro`).
- Переходы статусов:
  - `locked` → `pending` — только по событию апгрейда роли (`user-role-upgraded`);
  - `pending` → `sent_*` → `completed`/`failed` — согласно логике Reward Worker.

---

## Идемпотентность

- Для критичных internal endpoint’ов (`/internal/user-registered`, `/internal/event`) рекомендуется использовать идемпотентные ключи (например, `external_event_id`), чтобы избегать повторных начислений.
