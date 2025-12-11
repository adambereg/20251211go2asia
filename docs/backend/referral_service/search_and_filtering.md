# Referral Service — Search & Filtering

## Пользовательская статистика

`GET /my/stats` — агрегированная информация по всем активным кампаниям для конкретного пользователя.  
Сложные фильтры для пользователского уровня не нужны.

---

## Admin / Reports

### Список кампаний

`GET /admin/campaigns` — фильтры:

- `status` (`active`, `paused`, `archived`),
- `campaign_type`.

### Отчёты по пользователям

`GET /admin/reports/users` — фильтры:

- `campaign_id`,
- `from`, `to` (диапазон дат по `occurred_at` ReferralEvent),
- `min_points_earned`,
- `min_referred`.

---

## Индексация

Рекомендуемые индексы:

- `ReferralEvent`:
  - по `campaign_id`, `referrer_user_id`, `referred_user_id`, `business_partner_id`,
  - по `event_type`, `occurred_at`.

- `ReferralReward`:
  - по `beneficiary_user_id`, `status`.

- `ReferralRelation`:
  - по `referred_user_id` (поиск "кто меня пригласил"),
  - по `referrer_user_id` (список моих рефералов).
