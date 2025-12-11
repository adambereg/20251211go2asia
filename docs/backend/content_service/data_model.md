# Content Service — Модель данных

## 1. Post

Базовая сущность пользовательского контента.

- `id` (uuid, pk)
- `author_id` (uuid, fk → User Service)
- `type` (enum):
  - `note` — обычный пост в личной ленте,
  - `review` — отзыв (к месту/событию/объекту),
  - `question` — вопрос,
  - `announcement` — объявление (для групп/сообществ),
  - `system` — системный/служебный пост (ограниченно).
- `body` (text) — основной текст поста (markdown / structured text).
- `body_format` (enum): `markdown`, `plain`, `rich_json`.
- `lang` (string, nullable): `ru`, `en`, `vi` и т.п.

### Контекст (привязка к модулю/объекту)

- `module` (enum):
  - `space`,
  - `atlas`,
  - `pulse`,
  - `rielt`,
  - `rf`,
  - `quest`,
  - `system` (по необходимости).
- `context_entity_type` (string, nullable)  
  Например:
  - `place`,
  - `event`,
  - `housing_offer`,
  - `partner_venue`,
  - `quest`.
- `context_entity_id` (string, nullable)  
  Идентификатор сущности в соответствующем сервисе:
  - `atlas_place:long-beach`,
  - `pulse_event:phu-quoc-sunset-tour-2025-01-01`,
  - `rielt_offer:12345` и т.п.

Таким образом, один пост может быть:

- “Пост об опыте отдыха на Long Beach” → `module=atlas`, `context_entity_type=place`, `context_entity_id=atlas_place:long-beach`;
- “Отзыв о квартире” → `module=rielt`, `context_entity_type=housing_offer`.

### Видимость

- `visibility` (enum):
  - `public` — всем,
  - `registered` — только залогиненным,
  - `friends` — друзья/подписчики (Space),
  - `group` — участники группы/сообщества (опция, если будут группы),
  - `private` — только автор.
- `space_feed_scope` (enum, nullable):
  - `my_notes` — личные заметки,
  - `shared` — расшаренный в ленту Space,
  - `group_only` — только в группе (если группы появятся),
  - используется в логике Space Asia.

### Медиа

- `attachments` (array/jsonb) — список ссылок на Media Service:
  - `[{ "media_id": "uuid", "kind": "image" | "video" | "file" }]`.

### Модерация и статусы

- `status` (enum):
  - `draft`,
  - `published`,
  - `hidden_by_author`,
  - `hidden_by_moderator`,
  - `deleted`.
- `moderation_flags` (array<string>, nullable)  
  Например: `["spam", "abuse", "nsfw"]`.
- `created_at`, `updated_at`, `published_at`.
- `deleted_at` (nullable).

---

## 2. Comment

Комментарий к посту или к контекстной сущности.

- `id` (uuid, pk)
- `post_id` (uuid, fk → Post) — опционален, если модель допускает комменты к “контексту без поста” (но обычно привязываем всё к посту).
- `parent_comment_id` (uuid, nullable) — для дерева комментариев.
- `author_id` (uuid, fk → User)
- `body` (text)
- `body_format` (enum)
- `lang` (string, nullable)

Контекст (на случай, если комментарий напрямую привязан к сущности, а не только посту):

- `module` (enum, nullable)
- `context_entity_type` (string, nullable)
- `context_entity_id` (string, nullable)

Статусы/модерация:

- `status` (enum): `published`, `hidden_by_author`, `hidden_by_moderator`, `deleted`.
- `moderation_flags` (array<string>, nullable)
- `created_at`, `updated_at`, `deleted_at`.

---

## 3. PostTag / TopicLink (Фаза 2–3)

Чтобы можно было строить тематические ленты:

**PostTag**

- `post_id`
- `tag` (string) — `phu-quoc`, `relocation`, `kids`, `coffee`.

**PostTopicLink**

- `post_id`
- `topic_id` (из отдельного Topic Service / Space Topics).

---

## 4. ContentReport (жалобы)

Жалобы на посты/комменты.

- `id`
- `reported_object_type` (enum): `post`, `comment`.
- `reported_object_id`
- `reported_by_user_id`
- `reason` (enum/string): `spam`, `scam`, `abuse`, `nsfw`, `other`.
- `comment` (text, nullable) — пояснение.
- `status` (enum): `new`, `in_review`, `resolved`, `rejected`.
- `created_at`, `updated_at`.
- `moderator_id` (nullable) — кто обработал.

---

## 5. Индексы

Рекомендуемые индексы:

- `post.author_id`, `post.module, context_entity_id`
- `post.visibility, status, created_at`
- `comment.post_id`, `comment.parent_comment_id`
- `content_report.reported_object_type, reported_object_id`
