# Reactions Service — Validation Rules (Unified Reactions)

## Общие правила

- `target_type`:
  - обязателен,
  - должен соответствовать поддерживаемому списку типов сущностей (конфигурация сервиса).
- `target_id`:
  - обязательное непустое значение.
- `type`:
  - обязателен,
  - должен быть в списке допустимых типов (`like`, `repost`, `rating`, `short_review`, `feedback`, `completed`, `bookmark`, `question`, `contact_request`, `thread_reply`, статусные реакции и т.п.).

---

## Тип-специфичные проверки

### `like`, статусные реакции (`was_here`, `want_to_visit`, `going`, `interested`, др.)

- `payload`:
  - может быть пустым или содержать минимальные метаданные.
- Уникальность:
  - один `like`/`was_here`/`bookmark` на `(user_id, target_type, target_id, type)`.

---

### `repost`

- `payload`:
  - может содержать:
    - `comment_text` — текст до N символов;
    - `space_post_id` — ID созданного поста в Space (в случае «репоста с мнением»).
- Обязательные поля:
  - либо `comment_text`, либо `space_post_id`, либо оба.

---

### `rating`

- `payload.value`:
  - обязателен,
  - целое число,
  - диапазон по умолчанию `1–5` (или иной, заданный конфигом).
- Уникальность:
  - одна активная оценка на `(user_id, target_type, target_id)` — новая запись заменяет/обновляет старую.

---

### `short_review`

- `payload.text`:
  - обязателен,
  - длина: например, 1–500 символов (конфигурируемо).

---

### `feedback`

- `payload.text`:
  - обязателен,
  - длина может быть больше, чем у `short_review` (например, до 2000 символов).

---

### `completed`

- Используется для отметки завершения квеста/миссии:
  - `target_type = "quest"` или другой тип.
- Уникальность:
  - один `completed` на `(user_id, target_type, target_id)`.

---

### `bookmark`

- Уникальность:
  - один `bookmark` на `(user_id, target_type, target_id)`.

---

### `question` / `contact_request`

- `payload.text` или `payload.message`:
  - обязательны (минимальный текст запросов).
- `payload.to_user_id`:
  - желательно обязательное поле — адресат вопроса.
- Создание:
  - влечёт создание `Thread` (если ещё нет связанной ветки),
  - привязка реакции к `thread_id`.

---

### `thread_reply`

- `payload.thread_id`:
  - обязателен,
  - должен ссылаться на существующий `Thread`.
- `payload.text`:
  - обязателен,
  - разумные ограничения по длине.
- Пользователь должен быть участником ветки:
  - либо `initiator_user_id`,
  - либо `target_user_id` ветки.

---

## Статусы и модерация

- `status`:
  - при создании — `active`;
  - пользователь может менять на `hidden_by_user` (soft delete для себя);
  - модератор/админ — на `hidden_by_moderator` или `deleted`.
- Для реакций с типами `short_review`, `feedback`, `question`, `thread_reply`:
  - возможно использование дополнительной модерации (pre/post-moderation).

---

## Idempotency

- Для типов `like`, `bookmark`, `completed`, `was_here`, `want_to_visit`, `going`, `interested`:
  - `POST /reactions` должен быть идемпотентным:
    - при повторе не создавать дубликаты.
- Для `rating`:
  - `POST /reactions` обновляет значение при повторе.

---

## Rate limiting

- Лимиты на частоту:
  - `short_review` / `feedback` / `question` / `thread_reply` — чтобы избежать спама.
- Возможные сложности:
  - защита от массовых лайков/оценок с одной учётки/устройства/IP.
