# Reactions Service — Roadmap (Unified Reactions + Threads)

## Этап 1 — Ядро реакций

- Реализовать:
  - `Reaction` (like, bookmark, completed, rating, short_review, feedback),
  - `ReactionAggregate`,
  - базовые endpoint’ы:
    - `POST /reactions`,
    - `GET /reactions/list`,
    - `POST /stats/batch`, `GET /stats`.
- Интеграции:
  - Space (лайки/репосты можно добавить позже),
  - Atlas (рейтинги/отзывы, was_here/want_to_visit),
  - RF (рейтинги/отзывы партнёров).

## Этап 2 — Репосты и социальная активность

- Добавить:
  - `type = "repost"` и тесную интеграцию со Space Service;
  - UI сценарии репостов и «репостов с мнением».
- События:
  - `reaction.created` (repost) как основной социальный сигнал.

## Этап 3 — Threads / Inquiry Model

- Модели:
  - `Thread`, `ThreadAggregate`.
- Реакции:
  - `question`, `contact_request`, `thread_reply`.
- Интеграции:
  - Rielt, Quest, Pulse, RF (для сценариев обращений).
- Уведомления:
  - связка с Notification Service.

## Этап 4 — Reports, модерация и антифрод

- Реализовать:
  - `ReactionReport`,
  - admin/moderator endpoint’ы,
  - интеграцию с Moderation/Trust & Safety.
- Антифрод:
  - лимиты на создание отзывов/вопросов/лайков,
  - базовые эвристики.

## Этап 5 — Расширенные сигналы и аналитика

- Вывод:
  - «топовые места», «трендовые события», «лучшие квесты» по реакции пользователей.
- Интеграция с Recommendation/AI:
  - использование реакции как сигналов для персонализации лент и рекомендаций.
- Вынесение тяжёлых аналитических задач в отдельные сервисы / DWH.

---

Эта дорожная карта позволяет постепенно, безопасно и последовательно внедрять
реакционную модель общения в экосистеме Go2Asia, начиная с простых лайков/отзывов
и заканчивая асинхронными ветками общения и рекомендательными сценариями.
