# Content Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/content/v1/`**

Content Service отвечает за CRUD постов, комментариев и базовую выдачу лент в экосистеме Go2Asia.

---

## 1. Посты

### 1.1. POST `/api/content/v1/posts`

Создать пост.

**Требует авторизации.**

**Request (пример):**
```json
{
  "type": "review",
  "body": "Очень понравился пляж Long Beach, тихо утром и красивые закаты.",
  "body_format": "markdown",
  "lang": "ru",
  "module": "atlas",
  "context_entity_type": "place",
  "context_entity_id": "atlas_place:long-beach",
  "visibility": "public",
  "attachments": [
    { "media_id": "uuid-image-1", "kind": "image" }
  ]
}
```

**Response 201:**
```json
{
  "id": "post-uuid",
  "author_id": "user-uuid",
  "type": "review",
  "body": "Очень понравился пляж Long Beach, тихо утром и красивые закаты.",
  "body_format": "markdown",
  "lang": "ru",
  "module": "atlas",
  "context_entity_type": "place",
  "context_entity_id": "atlas_place:long-beach",
  "visibility": "public",
  "attachments": [
    { "media_id": "uuid-image-1", "kind": "image" }
  ],
  "status": "published",
  "created_at": "2025-01-01T10:00:00Z",
  "updated_at": "2025-01-01T10:00:00Z"
}
```

---

### 1.2. GET `/api/content/v1/posts/{id}`

Получить пост (опционально с комментариями).

**Query params:**

- `include_comments` — `true|false` (по умолчанию `false`).

**Response (пример):**
```json
{
  "id": "post-uuid",
  "author_id": "user-uuid",
  "type": "review",
  "body": "Очень понравился пляж Long Beach...",
  "body_format": "markdown",
  "lang": "ru",
  "module": "atlas",
  "context_entity_type": "place",
  "context_entity_id": "atlas_place:long-beach",
  "visibility": "public",
  "attachments": [],
  "status": "published",
  "created_at": "2025-01-01T10:00:00Z",
  "updated_at": "2025-01-01T10:00:00Z",
  "comments_count": 5,
  "comments": []
}
```

---

### 1.3. PATCH `/api/content/v1/posts/{id}`

Обновить пост (если автор или модератор).

**Request (пример):**
```json
{
  "body": "Обновлённый текст отзыва.",
  "visibility": "registered"
}
```

**Response 200:** обновлённый пост.

---

### 1.4. DELETE `/api/content/v1/posts/{id}`

Удалить/скрыть пост.

- Если автор → `status = "hidden_by_author"`.
- Если модератор → `status = "hidden_by_moderator"`.

**Response:** `204 No Content`

---

## 2. Комментарии

### 2.1. POST `/api/content/v1/posts/{post_id}/comments`

Создать комментарий к посту.

**Request:**
```json
{
  "body": "Полностью согласен, пляж шикарный!",
  "body_format": "markdown",
  "parent_comment_id": null
}
```

**Response 201:**
```json
{
  "id": "comment-uuid",
  "post_id": "post-uuid",
  "author_id": "user-uuid",
  "body": "Полностью согласен, пляж шикарный!",
  "body_format": "markdown",
  "status": "published",
  "created_at": "2025-01-01T11:00:00Z",
  "updated_at": "2025-01-01T11:00:00Z"
}
```

---

### 2.2. GET `/api/content/v1/posts/{post_id}/comments`

Список комментариев к посту.

**Query params:**

- `parent_comment_id` — для выборки только ответов на конкретный комментарий (опционально);
- `page`, `page_size`.

**Response:**
```json
{
  "items": [
    {
      "id": "comment-uuid",
      "post_id": "post-uuid",
      "author_id": "user-uuid",
      "body": "Полностью согласен, пляж шикарный!",
      "body_format": "markdown",
      "status": "published",
      "created_at": "2025-01-01T11:00:00Z",
      "updated_at": "2025-01-01T11:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 2.3. PATCH `/api/content/v1/comments/{id}`

Обновить комментарий (автор или модератор).

**Request (пример):**
```json
{
  "body": "Чуть поправил комментарий."
}
```

**Response 200:** обновлённый комментарий.

---

### 2.4. DELETE `/api/content/v1/comments/{id}`

Удалить/скрыть комментарий.

**Response:** `204 No Content`

---

## 3. Ленты и списки

### 3.1. GET `/api/content/v1/feed/user/{user_id}`

Лента постов автора.

**Query params:**

- `module` — фильтр по модулю (опционально);
- `type` — фильтр по типу поста (`note`, `review`, `question`, ...);
- `visibility_scope` —
  - `public_only` — для просмотра чужого профиля,
  - `all` — для просмотра самим автором;
- `page`, `page_size`.

**Response (пример):**
```json
{
  "items": [
    {
      "id": "post-uuid",
      "author_id": "user-uuid",
      "type": "note",
      "body": "Моя заметка о зимовке на Фукуоке.",
      "module": "space",
      "visibility": "friends",
      "status": "published",
      "created_at": "2025-01-02T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 3.2. GET `/api/content/v1/feed/context`

Лента постов по контекстной сущности (место, событие, квест, объявление и т.п.).

**Query params:**

- `module` — `atlas` | `pulse` | `rielt` | `rf` | `quest` | `space`
- `context_entity_type` — строка (например, `place`, `event`, `housing_offer`)
- `context_entity_id` — идентификатор сущности в соответствующем сервисе
- `type` — фильтр по типу поста (`review`, `question`, `note`, ...)
- `order` — `newest` | `oldest` | `top` (в будущем)
- `page`, `page_size`

**Response (пример):**
```json
{
  "items": [
    {
      "id": "post-uuid",
      "author_id": "user-uuid",
      "type": "review",
      "body": "Очень понравился пляж Long Beach...",
      "body_format": "markdown",
      "module": "atlas",
      "context_entity_type": "place",
      "context_entity_id": "atlas_place:long-beach",
      "visibility": "public",
      "status": "published",
      "created_at": "2025-01-01T10:00:00Z",
      "comments_count": 5
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 12
}
```

---

### 3.3. GET `/api/content/v1/feed/my` (Фаза 2–3)

Персональная лента текущего пользователя (базовый вариант, финальную бизнес-логику может дополнять Space/Feed Service).

**Query params (черновой набор):**

- `scope` — `all` | `my_posts` | `friends` | `context_followed`
- `page`, `page_size`.

**Response:** аналогичен `feed/user`, но с разными источниками постов.

---

## 4. Жалобы и модерация

### 4.1. POST `/api/content/v1/reports`

Создать жалобу на пост/комментарий.

**Требует авторизации.**

**Request:**
```json
{
  "reported_object_type": "post",
  "reported_object_id": "post-uuid",
  "reason": "spam",
  "comment": "Реклама казино"
}
```

**Response 201:**
```json
{
  "id": "report-uuid",
  "status": "new"
}
```

---

### 4.2. GET `/api/content/v1/admin/reports`

(Только для ролей `admin` / `moderator`.)

Список жалоб для модерации.

**Query params:**

- `status` — `new` | `in_review` | `resolved` | `rejected`
- `reported_object_type` — `post` | `comment`
- `created_from`, `created_to` (ISO8601)
- `page`, `page_size`

**Response:** список жалоб с базовой информацией.

---

### 4.3. PATCH `/api/content/v1/admin/reports/{id}`

Обновить статус жалобы и, при необходимости, связанный контент.

**Request (пример):**
```json
{
  "status": "resolved",
  "moderator_action": {
    "action": "hide_post",
    "post_id": "post-uuid"
  }
}
```

**Response:** `204 No Content`

---

## 5. Сервисные (internal) API

### 5.1. GET `/api/content/v1/internal/stats/context`

Статистика по контенту для контекстной сущности.

**Query params:**

- `module`
- `context_entity_type`
- `context_entity_id`

**Response:**
```json
{
  "post_count": 12,
  "comment_count": 47,
  "review_count": 8
}
```

---

## 6. Версионирование

- Текущая версия: **v1** (`/api/content/v1/...`).
- При появлении ломающих изменений вводится новая версия `/api/content/v2/...` с параллельной поддержкой v1.

---

## 7. Статус документа

Этот файл — **единый источник правды по публичному REST API Content Service**.  
Любые изменения в коде, влияющие на контракты, должны сопровождаться обновлением этого документа.
