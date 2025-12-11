# Content Service — Основные сценарии (Workflows)

## 1. Пользователь пишет пост-отзыв о месте (Atlas)

1. Пользователь открывает карточку места в Atlas.
2. Нажимает “Написать отзыв”.
3. Frontend собирает данные:
   - `module = "atlas"`,
   - `context_entity_type = "place"`,
   - `context_entity_id = "atlas_place:long-beach"`,
   - тип поста `review`.
4. Отправляет `POST /api/content/v1/posts`.
5. Content Service:
   - создаёт пост,
   - возвращает его ID.
6. Atlas обновляет блок “Отзывы”:
   - вызывает `GET /feed/context?module=atlas&context_entity_id=atlas_place:long-beach`.

---

## 2. Обсуждение события (Pulse)

1. Пользователь заходит на страницу события в Pulse.
2. Вкладка “Обсуждение” тянет:
   - `GET /feed/context?module=pulse&context_entity_id=pulse_event:...`.
3. Пользователь пишет комментарий/пост.
4. Content Service сохраняет пост/коммент, возвращает данные.
5. Notification Service уведомляет автора события (если нужно) и других участников (фаза 2+).

---

## 3. Личная заметка в Space

1. Пользователь в Space создаёт заметку:
   - `module = "space"`,
   - `type = "note"`,
   - `visibility = "private"` или `friends`.
2. Content Service создаёт пост.
3. Space использует `/feed/my` и `/feed/user/{user_id}` для отображения.

---

## 4. Жалоба на контент

1. Пользователь видит подозрительный пост/комментарий.
2. Нажимает “Пожаловаться”.
3. Frontend → `POST /api/content/v1/reports` с:
   - `reported_object_type`, `reported_object_id`, `reason`, `comment`.
4. Content Service создаёт запись `ContentReport` со статусом `new`.
5. Модератор в админке использует:
   - `GET /admin/reports` для просмотра,
   - `PATCH /admin/reports/{id}` для изменения статуса.
6. При необходимости:
   - меняет статус поста/комментария на `hidden_by_moderator`.

---

## 5. Удаление/скрытие поста автором

1. Пользователь решает скрыть свой старый пост.
2. Frontend → `DELETE /posts/{id}`.
3. Content Service:
   - проверяет, что `author_id` = текущий `user_id`,
   - меняет `status` на `hidden_by_author`,
   - soft-delete (данные остаются в БД, но не отображаются обычным пользователям).

---

## 6. Обновление контекста (редкий сценарий)

1. Если в других сервисах меняется идентификатор сущности (редко, но возможно при миграциях),
2. Пишется миграционный job, который:
   - обновляет `context_entity_id` у связанных постов/комментариев в Content Service.
3. Для MVP можно считать идентификаторы стабильными и не переносить.
