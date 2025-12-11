# RF Service — Validation Rules

## BusinessPartner

- `name`:
  - обязательно,
  - длина 2–200 символов.
- `category`:
  - одна из поддерживаемых категорий (`cafe`, `hotel`, `tour_agency`, …).
- `country_id`, `city_id`:
  - обязательны,
  - должны соответствовать справочникам Atlas.
- `rf_level`:
  - по умолчанию `basic`,
  - повышенные уровни (silver/gold/platinum) устанавливаются модератором.

Контакты:

- хотя бы один из каналов (`phone`, `telegram`, `website`, `instagram`) желателен.
- базовая валидация форматов (URL, телефон).

Статусы:

- `status`:
  - при создании пользователем/PRO → `pending_review`,
  - `active` может выставлять только `admin`.
- Переходы:
  - `draft` → `pending_review` → `active` → (`suspended` или `archived`).

Экономика:

- `default_discount_percent`:
  - `0 ≤ x ≤ 100` (обычно ≤ 50).
- `default_cashback_points_percent`:
  - `0 ≤ x ≤ 100`.
- `economics.premium_business_reward_g2a`, `economics.premium_pro_reward_g2a`:
  - `≥ 0`,
  - могут быть ограничены максимальными лимитами (на уровне бизнес-логики).

---

## PartnerLocation

- `business_partner_id` — обязателен.
- `address` — обязателен.
- Если заданы `latitude`/`longitude`:
  - должны находиться в допустимом диапазоне.
- `atlas_place_id`:
  - при наличии — должен существовать в Atlas (проверка через интеграцию/отложенную валидацию).

---

## PartnerUserRole

- Один `user_id` может иметь только одну активную роль на партнёре (`owner` или `manager`).
- Переходы статусов:
  - `invited` → `active` → `revoked`.

---

## Валидация при работе с ваучерами

- При привязке `default_voucher_ids` и `default_premium_voucher_ids`:
  - может быть выполнена soft-валидация через Voucher Service:
    - ID существуют,
    - класс ваучера соответствует (`standard` / `premium`).
- В случае недоступности Voucher Service — можно сохранять ID, но логировать проблемы.
