# Content Service — Интеграции

## 1. User Service

Content Service не хранит собственных данных о пользователях.  
Он опирается на User Service:

- для аутентификации — по JWT (на уровне API Gateway / middleware);
- для RICH-отображения авторов (имя, аватар, роль).

### 1.1. Аутентификация

- Все операции создания/изменения/удаления постов и комментариев требуют:
  - заголовок `Authorization: Bearer {access_token}`,
  - токен выдан User Service.
- Content Service доверяет:
  - `sub` → `user_id`,
  - `role` → базовая роль (`user`, `vip`, `pro`, `moderator`, `admin`).

Проверка ролей (`admin`, `moderator`) используется для модерационных эндпоинтов (`/admin/...`).

### 1.2. Профили авторов

Отображение имени/аватара автора поста/комментария можно организовать двумя способами:

1. **Фронтенд сам обращается в User Service** по списку `author_id` и агрегирует данные.
2. Content Service предоставляет только `author_id` и (опционально) кешированный “снэпшот” автора.

В базовой архитектуре для упрощения:

- Content Service возвращает только `author_id`;
- фронт сам ходит в User Service за отображаемыми данными (или через BFF/GraphQL-агрегатор, если появится).

---

## 2. Reactions Service

Reactions Service отвечает за лайки/эмодзи/оценки.  
Content Service не хранит количества лайков, он только знает `post_id`/`comment_id`.

### 2.1. Как взаимодействуют сервисы

- Content Service — владелец сущностей `post` и `comment`.
- Reactions Service — владелец сущности `reaction` (на любую `entity_type` + `entity_id`).

При формировании ленты фронтенд может:

1. Сначала запросить посты у Content Service (`/feed/context` или `/feed/user`).
2. Затем запросить summary-реакций у Reactions Service по списку `post_id`.

Альтернатива — Content Service внутри себя дергает Reactions Service и возвращает уже обогащённый ответ:

```json
{
  "id": "post-uuid",
  "body": "Очень понравился пляж Long Beach...",
  "reactions_summary": {
    "like": 12,
    "dislike": 1
  },
  "user_reaction": "like"
}
```

Рекомендуется оставить агрегацию на фронтенд/BFF, чтобы не раздувать связность Content Service в MVP.

---

## 3. Media Service

Content Service не хранит сами файлы, только **ссылки на медиа**.

### 3.1. Процесс работы с медиа

1. Пользователь загружает изображения/видео через фронтенд в Media Service.
2. Media Service возвращает `media_id` (и, возможно, URL/метаданные).
3. При создании поста/комментария фронтенд передаёт в Content Service:

```json
"attachments": [
  { "media_id": "uuid-image-1", "kind": "image" },
  { "media_id": "uuid-video-2", "kind": "video" }
]
```

4. Content Service сохраняет `attachments` как jsonb.

### 3.2. Валидация media_id

В MVP можно:

- либо доверять `media_id` (проверка только формата строки),
- либо (чуть сложнее) дергать Media Service и проверять, что такой `media_id` существует и принадлежит текущему пользователю.

В будущем возможно введение фоновой задачи, чистящей “битые” ссылки на медиа.

---

## 4. Notification Service

Content Service — источник событий для уведомлений:

- новый комментарий к посту,
- ответ на комментарий,
- (в будущем) упоминания пользователей (@username).

### 4.1. Вариант A — прямые HTTP-вызовы

При создании комментария:

1. Content Service определяет автора поста и/или родительского комментария.
2. Формирует payload для уведомления:
   ```json
   {
     "type": "comment_created",
     "recipient_user_id": "author-id",
     "actor_user_id": "comment-author-id",
     "context": {
       "post_id": "post-uuid",
       "comment_id": "comment-uuid",
       "module": "atlas",
       "context_entity_id": "atlas_place:long-beach"
     }
   }
   ```
3. Вызывает Notification Service (`POST /api/notifications/v1/events`).

### 4.2. Вариант B — Event Bus

- Content Service публикует события:
  - `content.post_created`,
  - `content.comment_created`,
  - `content.comment_replied`,
  - `content.post_deleted` и др.
- Notification Service подписывается на эти события и сам решает, кому и какой канал уведомлений использовать (email/push/in-app).

Рекомендуется:

- на старте — использовать Event Bus или упрощённый HTTP-вызов;
- не смешивать бизнес-логику уведомлений в Content Service.

---

## 5. Atlas / Pulse / Rielt / RF / Quest / Space

Content Service обеспечивает **общую UGC-слойку** поверх модулей.

### 5.1. Кто к кому ходит

- Модули (Atlas/Pulse/…):
  - не хранят посты/комментарии,
  - используют Content Service для работы с UGC.

Примеры:

- **Atlas**:
  - “Отзывы о месте” — `GET /api/content/v1/feed/context?module=atlas&context_entity_id=atlas_place:long-beach`.
- **Pulse**:
  - “Обсуждение события” — аналогичный запрос с `module=pulse`.
- **Rielt**:
  - “Отзывы о квартире” — `module=rielt`, `context_entity_type=housing_offer`.
- **RF** (Russian Friendly):
  - “Отзывы о партнёрском заведении” — `module=rf`, `context_entity_type=partner_venue`.
- **Quest**:
  - “Обсуждение квеста” — `module=quest`, `context_entity_type=quest`.
- **Space**:
  - “Личная лента” и посты в группах/темах — `module=space`.

### 5.2. Валидация контекста

Варианты:

1. **MVP** — доверять фронтенду и не проверять существование `context_entity_id` (быстрее, но есть риск “висячих” связей).
2. **Строгий режим** — Content Service при создании контента:
   - дергает соответствующий сервис (Atlas/Pulse/…),
   - проверяет, что такой объект существует.
3. **Отложенная валидация** — фоновые джобы:
   - проходят по постам,
   - валидируют `context_entity_id`,
   - помечают проблемные записи.

Для MVP разумно реализовать вариант 1 с аккуратными ограничениями и подготовкой к варианту 3.

---

## 6. Search Service (будущее)

При внедрении отдельного поискового сервиса:

- Content Service генерирует события:
  - `content.post_created`,
  - `content.post_updated`,
  - `content.post_deleted`,
  - `content.comment_created`,
  - ...
- Search Service получает эти события и обновляет индекс (Meilisearch/OpenSearch/Postgres FTS и т.п.).

Модули (Atlas/Pulse/Space/Rielt/RF/Quest) уже смогут пользоваться:

- `/search` API Search Service,
- а Content Service — останется источником правды по UGC.

---

## 7. Event Bus (опционально)

Content Service может публиковать события в общую шину (Kafka/NATS/Cloud Pub/Sub).

Базовый список событий:

- `content.post_created`
- `content.post_updated`
- `content.post_deleted`
- `content.comment_created`
- `content.comment_updated`
- `content.comment_deleted`
- `content.report_created`

Подписчики:

- Notification Service — уведомления о комментариях/ответах.
- Search Service — индексирование.
- Anti-Abuse/Analytics — поведенческий анализ и метрики.
