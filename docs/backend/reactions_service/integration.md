# Reactions Service — Integrations (Unified Reactions + Threads)

## Space / Content Service (Space Asia)

- **Реакции на посты:**
  - лайки → `type = "like"`;
  - репосты → `type = "repost"`, `payload.space_post_id` — ID нового поста;
  - короткие отзывы/комментарии к постам → `type = "short_review"` или `feedback`.
- **Статистика по постам:**
  - аггрегаты (лайки, репосты, short_review) через `POST /stats/batch`.
- **Лента активности пользователя:**
  - Space может показывать репосты и отзывы на базе `GET /reactions/user`.

---

## Atlas Asia (места)

- **Реакции:**
  - `like` — отметка «понравилось место»;
  - `short_review` / `feedback` — отзывы о месте;
  - `rating` — оценка места;
  - `was_here`, `want_to_visit` — статусные реакции.
- **Статистика:**
  - `likes_count`, `rating_avg`, `short_reviews_count`, `was_here_count`, `want_to_visit_count` — через `POST /stats/batch`.

---

## Pulse Asia (события)

- **Реакции:**
  - `like`,
  - `short_review` / `feedback`,
  - `rating` (опционально),
  - `going`, `interested` — RSVP-статусы.
- **Статистика:**
  - кол-во участников (`going_count`), интересующихся (`interested_count`),
  - общее качество (рейтинги/отзывы).

---

## Blog / Media

- **Реакции:**
  - `like`, `repost`, `short_review`.
- **Статистика:**
  - через универсальный `/stats/batch`.

---

## Russian Friendly (RF)

- **Отзывы и рейтинги о заведениях:**
  - `rating` + `short_review` / `feedback` на `target_type = "rf_partner"`.
- **Статистика:**
  - RF может периодически считывать агрегаты рейтинга и отзывов и денормализовывать в свою БД.

---

## Quest Service

- **Завершение квестов:**
  - `type = "completed"` на `target_type = "quest"`, `target_id = quest_id`.
- **Отзывы:**
  - `short_review` / `feedback`,
  - по необходимости — `rating`.
- **Геймификация:**
  - Connect / Points могут начислять награды за реакции типа `completed`, `short_review`, `rating`.

---

## Voucher Service

- **Отзывы на ваучеры / опыт использования:**
  - `short_review` / `feedback` с `target_type = "voucher"` или `voucher_redemption`.

---

## Rielt Service

- **Обратная связь по жилью / хозяевам:**
  - `rating` + `short_review` / `feedback` для:
    - `rielt_listing`,
    - `rielt_booking`,
    - `host_profile` (опционально).
- **Inquiry / Thread:**
  - вопрос по объявлению:
    - `type = "question"` с `target_type = "rielt_listing"` → создаётся `Thread`;
  - ответы:
    - `type = "thread_reply"` с `payload.thread_id`.

---

## Notification Service

Подписывается на события:

- `reaction.created`:
  - `type = "repost"` → уведомить автора исходного контента;
  - `type = "short_review"` / `feedback` → уведомить автора/владельца сущности (или RF-партнёра).
- `thread.reply.created`:
  - уведомить вторую сторону ветки общения (инициатора или target).

---

## Connect / Points / NFT / Token Services

- Подписываются на `reaction.created`:
  - `type = "repost"` — начисление Points/NFT за продвижение контента;
  - `type = "completed"` — награды за прохождение квеста;
  - `type = "short_review"` / `feedback` — награды за качественные отзывы (по правилам кампаний).

---

## Moderation / Trust & Safety

- Получают события:
  - `reaction.created` (особенно для типов `short_review`, `feedback`, `question`, `thread_reply`);
  - `reaction.flagged` (когда пользователи подают жалобы).
- Могут инициировать модераторские действия:
  - скрытие реакции,
  - блокировка пользователя,
  - метки риска для RF-партнёров/объявлений.

---

## Event Bus

Основные типы событий:

- `reaction.created`
- `reaction.deleted`
- `reaction.flagged`
- `thread.reply.created`

Формат событий может включать:

- `reaction_id`, `type`, `user_id`, `target_type`, `target_id`,
- `thread_id` (если применимо),
- ключевые данные `payload` (либо только идентификаторы для последующей загрузки из сервиса).
