# Reactions Service — API Contracts (без классических комментариев)

Версия: **v1**  
Базовый путь: **`/api/reactions/v1/`**

Сервис предоставляет:

- универсальный API для создания реакций к любым объектам;
- API для запросов агрегированной статистики по объектам;
- API для управления ветками общения (threads);
- вспомогательные методы для получения реакций пользователя.

---

## 1. Общий endpoint создания реакций

### 1.1. POST `/reactions`

Создать реакцию.  
В зависимости от `type` изменяется ожидаемая структура `payload`.

**Request (пример лайка):**
```json
{
  "target_type": "space_post",
  "target_id": "post-uuid",
  "type": "like",
  "payload": {}
}
```

**Request (пример репоста с мнением):**
```json
{
  "target_type": "space_post",
  "target_id": "post-uuid",
  "type": "repost",
  "payload": {
    "comment_text": "Мой комментарий к посту",
    "space_post_id": "new-post-uuid"
  }
}
```

**Request (пример рейтинга):**
```json
{
  "target_type": "rf_partner",
  "target_id": "partner-uuid",
  "type": "rating",
  "payload": {
    "value": 4
  }
}
```

**Request (пример short_review):**
```json
{
  "target_type": "atlas_place",
  "target_id": "place-uuid",
  "type": "short_review",
  "payload": {
    "text": "Очень атмосферное место!"
  }
}
```

**Request (пример вопроса/инициации ветки общения):**
```json
{
  "target_type": "rielt_listing",
  "target_id": "listing-uuid",
  "type": "question",
  "payload": {
    "to_user_id": "host-user-uuid",
    "text": "Можно ли заехать раньше?"
  }
}
```

**Request (пример ответа в ветке):**
```json
{
  "target_type": "rielt_listing",
  "target_id": "listing-uuid",
  "type": "thread_reply",
  "payload": {
    "thread_id": "thread-uuid",
    "text": "Да, это возможно",
    "is_from_initiator": false
  }
}
```

**Response 201 (общая форма):**
```json
{
  "id": "reaction-uuid",
  "user_id": "user-uuid",
  "target_type": "atlas_place",
  "target_id": "place-uuid",
  "type": "short_review",
  "payload": {
    "text": "Очень атмосферное место!"
  },
  "thread_id": null,
  "status": "active",
  "created_at": "2025-01-01T10:00:00Z"
}
```

---

### 1.2. DELETE `/reactions/{id}`

Удалить/скрыть реакцию.

- Для обычного пользователя:
  - помечает `status = hidden_by_user`.
- Для модератора/админа (через admin-флаг/роль):
  - помечает `status = hidden_by_moderator` или `deleted`.

**Response:**
```json
{
  "success": true
}
```

---

### 1.3. GET `/reactions/list`

Список реакций к объекту.

**Query-параметры:**

- `target_type` — обязательный,
- `target_id` — обязательный,
- `type` — опционально (фильтр по типу реакции: `like`, `rating`, `short_review`, `feedback`, `repost`, ...),
- `page`, `page_size`.

**Пример:**
- `GET /reactions/list?target_type=atlas_place&target_id=place-uuid&type=short_review`

**Response:**
```json
{
  "items": [
    {
      "id": "reaction-uuid",
      "user_id": "user-uuid",
      "type": "short_review",
      "payload": {
        "text": "Очень атмосферное место!"
      },
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 1.4. GET `/reactions/user`

Реакции конкретного пользователя (для профиля и личного кабинета).

**Query-параметры:**

- `user_id` — если не указан, используется текущий авторизованный пользователь;
- `type` — опционально (например, вывести все `repost` или все `short_review`);
- `target_type` — опционально;
- `page`, `page_size`.

---

## 2. Статистика по объектам

### 2.1. POST `/stats/batch`

Батч-запрос агрегатов по списку объектов.

**Request:**
```json
{
  "targets": [
    { "target_type": "atlas_place", "target_id": "place-1" },
    { "target_type": "atlas_place", "target_id": "place-2" }
  ]
}
```

**Response:**
```json
{
  "items": [
    {
      "target_type": "atlas_place",
      "target_id": "place-1",
      "likes_count": 12,
      "reposts_count": 3,
      "bookmarks_count": 10,
      "short_reviews_count": 4,
      "rating_count": 4,
      "rating_avg": 4.5,
      "was_here_count": 7,
      "want_to_visit_count": 10,
      "completed_count": 2
    },
    {
      "target_type": "atlas_place",
      "target_id": "place-2",
      "likes_count": 0,
      "reposts_count": 0,
      "bookmarks_count": 0,
      "short_reviews_count": 0,
      "rating_count": 0,
      "rating_avg": null,
      "was_here_count": 0,
      "want_to_visit_count": 0,
      "completed_count": 0
    }
  ]
}
```

---

### 2.2. GET `/stats`

Быстрый запрос агрегатов по одному объекту.

**Query-параметры:**

- `target_type`,
- `target_id`.

---

## 3. Thread / Inquiry API

### 3.1. GET `/threads/{id}`

Получить информацию о ветке общения и список сообщений.

**Response:**
```json
{
  "id": "thread-uuid",
  "initiator_user_id": "user-a",
  "target_user_id": "user-b",
  "target_type": "rielt_listing",
  "target_id": "listing-uuid",
  "topic_type": "booking_inquiry",
  "status": "open",
  "messages": [
    {
      "reaction_id": "r1",
      "type": "question",
      "user_id": "user-a",
      "payload": {
        "text": "Можно ли заехать раньше?"
      },
      "created_at": "2025-01-01T10:00:00Z"
    },
    {
      "reaction_id": "r2",
      "type": "thread_reply",
      "user_id": "user-b",
      "payload": {
        "text": "Да, это возможно",
        "is_from_initiator": false
      },
      "created_at": "2025-01-01T11:00:00Z"
    }
  ]
}
```

---

### 3.2. GET `/threads`

Список веток для пользователя.

**Query-параметры:**

- `role` — `initiator` | `target` | `all` (по умолчанию `all`);
- `status` — опционально (`open`, `archived` и т.п.);
- `target_type` / `target_id` — опционально;
- `page`, `page_size`.

---

### 3.3. POST `/threads/{id}/close`

Закрыть ветку (инициатор/target/система).

**Request:**
```json
{
  "reason": "resolved_by_host"
}
```

---

## 4. Репорты / жалобы

### 4.1. POST `/reports`

Создать жалобу на реакцию.

**Request:**
```json
{
  "reaction_id": "reaction-uuid",
  "reason_code": "spam",
  "details": "Похоже на рекламу"
}
```

**Response:**
```json
{
  "id": "report-uuid",
  "status": "new"
}
```

---

## 5. Event Bus (внешний контракт)

При ключевых событиях Reactions Service публикует сообщения (event-driven интеграция):

- `reaction.created`
- `reaction.deleted`
- `reaction.flagged`
- `thread.reply.created`

Потребители:

- Notification Service:
  - уведомления о репостах, вопросах, отзывах, ответах;
- Connect / Points / NFT / Token:
  - начисления за реакции (репосты, отзывы, завершения квестов и т.д.);
- Moderation / Trust & Safety:
  - анализ отзывов, вопросов, веток общения;
- Space Service:
  - обработка `repost` (создание поста / связывание с исходным).

Форматы событий фиксируются отдельно (в event-контрактах).
