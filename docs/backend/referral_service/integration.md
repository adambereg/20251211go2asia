# Referral Service — Integrations

## User Service

### Регистрация пользователя

- При регистрации новый пользователь может передать `referral_code` (например, через query-параметр в ссылке).
- User Service вызывает:
  - `POST /api/referral/v1/internal/user-registered`
  - Referral Service создаёт `ReferralRelation` и реферальные события.

### Профиль и статистика

- Личный кабинет пользователя может показывать:
  - список ссылок (`GET /my/links`),
  - статистику (`GET /my/stats`).

### Обновление роли пользователя (unlock наград)

- Когда пользователь апгрейдится до VIP или PRO, User Service вызывает:
  - `POST /api/referral/v1/internal/user-role-upgraded`
- Referral Service:
  - находит все `ReferralReward` для этого пользователя со статусом `locked`,
  - проверяет `required_min_role` и `new_role`,
  - переводит подходящие награды в `pending`,
  - далее Reward Worker начисляет Points/G2A через Points/Token Service.

---

## RF Service

- При онбординге бизнес-партнёра:
  - RF Service знает `onboarding_user_id` (кто привёл партнёра);
  - вызывает `POST /internal/partner-onboarded`;
  - Referral Service создаёт `PartnerReferralRelation`, `ReferralEvent` и `ReferralReward`.

---

## Quest Service

- При покупке квеста:
  - Quest Service знает, был ли применён реферальный код/ссылка;
  - определяет `referrer_user_id` по ReferralRelation (1-й уровень) и его “родителя” (2-й уровень);
  - вызывает `POST /internal/event` с `event_type = quest_purchased`.

---

## Voucher Service

- При покупке премиум-ваучера:
  - Voucher Service вызывает `POST /internal/event` с `event_type = voucher_premium_purchased`;
  - Referral Service рассчитывает вознаграждения для реферера (1-й уровень) и субреферера (2-й уровень), часть может быть сразу заблокирована.

---

## Rielt Service

- При подтверждённой броне:
  - Rielt Service вызывает `POST /internal/event` с `event_type = rielt_booking_made`;
  - Referral Service рассчитывает награды по кампании (`purchase`), используя `amount_base` (например, стоимость брони или комиссию).

---

## Points Service

- Referral Service не хранит балансы, но:
  - создаёт `ReferralReward` с `points_amount`;
  - Reward Worker:
    - вызывает Points Service для начисления;
    - обновляет `ReferralReward.status` и `external_tx_id`.

---

## Token / Blockchain Gateway

- Для G2A-наград:
  - Referral Service создаёт `ReferralReward` с `g2a_amount`;
  - Reward Worker:
    - вызывает Token/Blockchain Gateway для перевода G2A;
    - обновляет `status`/`external_tx_id`.

---

## Logging / Analytics

- Все `ReferralEvent` и `ReferralReward` могут отправляться в общий Analytics/Logging Service:
  - для построения витрин по эффективности кампаний;
  - оценки LTV реферальных пользователей.
