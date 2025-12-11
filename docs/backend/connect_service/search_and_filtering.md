# Connect Service — Search & Filtering

Поиск и фильтрация в Connect Service нужны в основном:

- для админ-интерфейса (анализ экономики),
- для отладки правил,
- для внутренних отчётов.

## 1. Поиск по EconomicEvent

Endpoint: `GET /internal/events`

Возможные фильтры:

- `event_type` — тип события (`quest.completed`, `rielt.booking_paid` и т.д.),
- `source_service` — источник (`quest_service`, `rielt_service`, `referral_service`),
- `actor_user_id` — кто инициировал событие,
- `primary_subject_user_id` — кто является основным выгодоприобретателем,
- `status` — `pending`, `processed`, `skipped`, `failed`,
- `date_from`, `date_to` — интервал по `created_at`,
- пагинация: `page`, `page_size`.

Используется для:

- анализа, какие события генерируют награды,
- поиска проблемных событий (со статусом `failed` или `skipped`),
- отладки idempotency (по `external_id`).

### Индексы

- `(event_type, created_at)`,
- `(actor_user_id, created_at)`,
- `(primary_subject_user_id, created_at)`.

---

## 2. Поиск по RewardAction

Endpoint: `GET /internal/reward-actions`

Фильтры:

- `target_user_id` — кому выдавались награды,
- `reward_type` — `points`, `nft`, `g2a_offchain`, `g2a_onchain`,
- `status` — `pending`, `dispatched`, `completed`, `failed`,
- `event_type` — фильтрация по типу исходного события (через join с `EconomicEvent`),
- `rule_id` — по конкретному правилу,
- `date_from`, `date_to` — интервал по `created_at`,
- пагинация.

Используется для:

- восстановления истории наград,
- проверки корректности работы конкретного правила,
- анализа эффективности кампаний (через группировку по `rule_id`/`campaign_id`).

---

## 3. Поиск по RewardRule

Endpoint: `GET /internal/rules`

Фильтры:

- `event_type`,
- `enabled`,
- `effective_from <= now <= effective_to` (активные правила).

Используется для:

- отображения правил в админке,
- включения/выключения правил,
- проверки конфликтов и дублирующих правил.
