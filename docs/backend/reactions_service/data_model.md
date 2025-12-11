# Reactions Service — Data Model (Thread + Unified Reactions)

## Общие принципы

Любая сущность, с которой пользователь может взаимодействовать, описывается парой:

- `target_type` — строковый код типа сущности (`space_post`, `atlas_place`, `rf_partner`, `pulse_event`, `quest`, `rielt_listing`, `booking`, `blog_article`, `user_profile` и т.п.);
- `target_id` — строковый идентификатор сущности во внешнем сервисе.

Все взаимодействия фиксируются в таблице `Reaction` с различными `type` и `payload`.

---

## 1. Reaction

Единая модель для всех типов реакций.

### Поля

- `id` (uuid, pk)
- `user_id` (uuid, fk → User) — инициатор реакции.
- `target_type` (string) — код типа цели.
- `target_id` (string) — ID цели.
- `type` (string/enum) — тип реакции:
  - базовые: `like`, `repost`, `rating`, `short_review`, `feedback`, `completed`, `bookmark`,
  - вопросы и общение: `question`, `contact_request`, `thread_reply`,
  - статусные: `was_here`, `want_to_visit`, `going`, `interested`, др.
- `payload` (jsonb, nullable) — данные, зависящие от типа реакции:
  - для `rating`:
    ```json
    { "value": 5 }
    ```
  - для `short_review`:
    ```json
    { "text": "Короткий отзыв" }
    ```
  - для `feedback`:
    ```json
    { "text": "Более развёрнутая обратная связь" }
    ```
  - для `repost`:
    ```json
    {
      "space_post_id": "new-post-uuid",
      "comment_text": "Мой комментарий к репосту"
    }
    ```
  - для `question`:
    ```json
    {
      "thread_id": "thread-uuid",
      "text": "Вопрос организатору",
      "to_user_id": "target-user-uuid"
    }
    ```
  - для `contact_request`:
    ```json
    {
      "thread_id": "thread-uuid",
      "message": "Хочу уточнить детали брони",
      "to_user_id": "host-uuid"
    }
    ```
  - для `thread_reply`:
    ```json
    {
      "thread_id": "thread-uuid",
      "text": "Ответ в ветке",
      "is_from_initiator": true
    }
    ```
- `thread_id` (uuid, nullable) — если реакция принадлежит ветке общения.
- `meta` (jsonb, nullable) — технические метаданные (device, locale, client_version, ip_hash и т.п.).
- `status` (enum):
  - `active`
  - `hidden_by_user`
  - `hidden_by_moderator`
  - `deleted`
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Ограничения

- Для некоторых типов (например, `like`, `bookmark`, `completed`, `was_here`) разумно вводить
  уникальные ограничения вида:
  - (`user_id`, `target_type`, `target_id`, `type`).

---

## 2. Thread (ветка общения / запрос)

Упрощённая модель диалогов для сценариев:

- арендатор ↔ хозяин жилья,
- участник ↔ организатор события,
- путешественник ↔ PRO-гид,
- клиент ↔ бизнес-партнёр,
- и любые inquiry-сценарии.

Ветка создаётся:

- реакцией `question`,
- реакцией `contact_request`,
- либо системным событием (например, `booking_inquiry`).

### Поля

- `id` (uuid, pk)
- `initiator_user_id` (uuid, fk → User) — кто начал ветку.
- `target_user_id` (uuid, fk → User, nullable) — с кем ведётся общение (хост, организатор, PRO и т.п.).
- `target_type` (string) — к чему привязана ветка (например, `rielt_listing`, `booking`, `pulse_event`).
- `target_id` (string)
- `topic_type` (string/enum):
  - `question`,
  - `contact_request`,
  - `booking_inquiry`,
  - `event_inquiry`,
  - `general_feedback`,
  - и др.
- `status` (enum):
  - `open`,
  - `closed_by_initiator`,
  - `closed_by_target`,
  - `auto_closed`,
  - `archived`.
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `last_activity_at` (timestamp)

Привязка реакций к ветке:

- все `Reaction` с `thread_id = Thread.id` и типом `question`/`contact_request`/`thread_reply`
  считаются сообщениями ветки.

---

## 3. ReactionAggregate (по целевой сущности)

Агрегаты по сущности (место, событие, пост, партнёр и т.п.):

### Поля

- `id` (uuid, pk)
- `target_type` (string)
- `target_id` (string)
- `likes_count` (int)
- `reposts_count` (int)
- `bookmarks_count` (int)
- `short_reviews_count` (int)
- `feedback_count` (int)
- `rating_sum` (bigint)
- `rating_count` (int)
- `was_here_count` (int)
- `want_to_visit_count` (int)
- `going_count` (int)
- `interested_count` (int)
- `completed_count` (int) — сколько пользователей завершили квест/задачу.
- `updated_at` (timestamp)

Средний рейтинг:

- `rating_avg = rating_sum / rating_count` (на уровне API).

---

## 4. ThreadAggregate (опционально)

Агрегаты по ветке общения:

- `id` (uuid, pk)
- `thread_id` (uuid, fk → Thread)
- `messages_count` (int)
- `last_message_at` (timestamp)
- `last_message_from_user_id` (uuid)

---

## 5. ReactionReport (жалобы на реакции/сообщения)

Жалобы/репорты на реакции (включая `short_review`, `feedback`, `thread_reply` и др.).

### Поля

- `id` (uuid, pk)
- `reporter_user_id` (uuid, fk → User)
- `reaction_id` (uuid, fk → Reaction)
- `reason_code` (string/enum): `spam`, `abuse`, `fraud`, `other`.
- `details` (text, nullable)
- `status` (enum): `new`, `in_review`, `resolved`, `rejected`.
- `created_at`, `updated_at`

---

Такой набор моделей позволяет:

- описывать любые типы реакций одной таблицей `Reaction`;
- строить агрегаты по объектам (место/событие/партнёр/пост/бронь);
- поддерживать лёгкие асинхронные диалоги через `Thread` + реакции типа `thread_reply`.
