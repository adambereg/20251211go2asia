# Notification Service — Search & Filtering

## История уведомлений пользователя

`GET /user/notifications`:

Фильтры:

- `status`:
  - `sent`, `delivered`, `opened`, `failed` и т.п.;
- `type`:
  - `user.welcome`, `reaction.like_received`, `thread.new_message`, `points.awarded` и т.д.;
- `channel`:
  - `email`, `push`, `telegram`, `in_app`;
- `date_from`, `date_to` (опционально, для расширенного поиска);
- пагинация:
  - `page`, `page_size`.

Используется для:

- in-app ленты уведомлений,
- раздела «Мои уведомления» в личном кабинете.

---

## Админ-поиск

Административный интерфейс (отдельный consumer/панель) может использовать
разрешённые internal endpoint’ы типа:

- `GET /admin/notifications`:

  - фильтры:
    - `user_id`,
    - `type`,
    - `channel`,
    - `status`,
    - `created_at` диапазоны.

Использование:

- проверка доставки,
- отладка шаблонов,
- анализ массовых кампаний.

---

## Индексация

Рекомендуемые индексы:

- `Notification`:
  - по `user_id`, `status`, `created_at`,
  - по `type` и `channel` (комбинированные индексы для аналитики и выборки).
- `NotificationPreference`:
  - уникальный индекс по `user_id`.

На MVP достаточно индексов по `user_id + created_at`.
