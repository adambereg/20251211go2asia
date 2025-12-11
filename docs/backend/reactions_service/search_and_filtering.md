# Reactions Service — Search & Filtering

## Поиск реакций по объекту

`GET /reactions/list`:

- фильтрует реакции по:
  - `target_type` (обязательно),
  - `target_id` (обязательно),
  - `type` (опционально — `like`, `rating`, `short_review`, `feedback`, `repost`, `completed`, и т.д.);
- пагинация:
  - `page`, `page_size`.

Примеры:

- список всех отзывов (short_review) по месту:
  - `/reactions/list?target_type=atlas_place&target_id=place-uuid&type=short_review`;
- список всех отзывов и оценок RF-партнёра:
  - фильтрация по типу на уровне сервиса (возможно, несколько типов).

---

## Реакции пользователя

`GET /reactions/user`:

- фильтры:
  - `user_id` (если отсутствует — текущий пользователь),
  - `type` (например, все `repost` или все `bookmark`),
  - `target_type` (например, только `atlas_place`),
- пагинация:
  - `page`, `page_size`.

Использование:

- страницы:
  - «Мои репосты»,
  - «Мои отзывы»,
  - «Мои сохранённые места»,
  - «Пройденные квесты» и т.д.

---

## Статистика по объектам

`POST /stats/batch`:

- батч-запрос по списку объектов;
- основной способ получить агрегаты для листингов (карточек мест, событий, квестов, партнёров).

`GET /stats`:

- быстрый запрос по одному объекту, удобен для детальных страниц.

---

## Threads / Ветки общения

`GET /threads`:

- фильтры:
  - `role` (`initiator` | `target` | `all`),
  - `status` (`open`, `archived`, ...),
  - `target_type` / `target_id` (диалог вокруг конкретного объекта),
  - `page`, `page_size`.

Это позволяет:

- строить в личном кабинете пользователя:
  - список его обращений к хостам/организаторам/партнёрам,
  - список входящих запросов (если он PRO/хост/партнёр).

---

## Индексация

Рекомендуемая индексация:

- `Reaction`:
  - индекс по (`target_type`, `target_id`, `type`, `created_at`);
  - индекс по `user_id` и `type`;
  - опционально — индекс по `thread_id`.
- `ReactionAggregate`:
  - уникальный индекс по (`target_type`, `target_id`).
- `Thread`:
  - индексы по:
    - `initiator_user_id`,
    - `target_user_id`,
    - `status`,
    - `target_type`, `target_id`.
