# Notification Service — Data Model

## 1. Notification

Запись о конкретном уведомлении, отправленном (или планируемом к отправке) пользователю.

### Поля

- `id` (uuid, pk)
- `user_id` (uuid, fk → User) — получатель.
- `channel` (enum/string):
  - `email`,
  - `push`,
  - `telegram`,
  - `in_app` (для внутренней ленты уведомлений).
- `type` (string) — тип уведомления (бизнес-метка), например:
  - `user.welcome`,
  - `user.password_reset`,
  - `reaction.like_received`,
  - `reaction.repost_received`,
  - `reaction.short_review_received`,
  - `thread.new_message`,
  - `quest.completed`,
  - `points.awarded`,
  - `rf_partner.review_received`,
  - `rielt.inquiry_received`,
  - и т.д.
- `template_key` (string) — ключ шаблона для визуального оформления/контента.
- `payload` (jsonb) — данные, подставляемые в шаблон:
  - имя пользователя,
  - название места/квеста/события,
  - ссылки (deeplink / web link),
  - флаги (например, important).
- `priority` (enum/string):
  - `low`, `normal`, `high`.
- `status` (enum/string):
  - `queued`, `sending`, `sent`, `delivered`, `opened`, `failed`, `cancelled`.
- `error_code` (string, nullable) — код ошибки провайдера (если есть).
- `created_at` (timestamp)
- `scheduled_at` (timestamp, nullable) — если уведомление отложенное/плановое.
- `sent_at` (timestamp, nullable)
- `delivered_at` (timestamp, nullable)
- `opened_at` (timestamp, nullable)

---

## 2. NotificationPreference (Фаза 2)

Настройки предпочтений пользователя.

### Поля

- `id` (uuid, pk)
- `user_id` (uuid, fk → User, unique)
- `channels_enabled` (jsonb) — глобальные выключатели:
  - `{ "email": true, "push": true, "telegram": false, "in_app": true }`
- `types_enabled` (jsonb) — более тонкие настройки по типам:
  ```json
  {
    "reaction.like_received": true,
    "reaction.repost_received": true,
    "thread.new_message": true,
    "marketing.digest_weekly": false
  }
  ```
- `quiet_hours` (jsonb, nullable):
  - `{ "start": "22:00", "end": "08:00", "timezone": "Asia/Ho_Chi_Minh" }`
- `created_at`, `updated_at`

---

## 3. NotificationTemplate (опционально в MVP)

Шаблоны для различных типов уведомлений.

### Поля

- `id` (uuid, pk)
- `template_key` (string, unique)
- `channel` (string) — `email` | `push` | `telegram` | `in_app`
- `locale` (string) — `ru-RU`, `en-US`, и т.д.
- `subject` (string, nullable) — для email.
- `body` (text/json) — текст или структура шаблона.
- `created_at`, `updated_at`

На MVP часть шаблонов может жить в коде, а не в БД.

---

## 4. ProviderConfig (опционально)

Конфигурация для внешних провайдеров (email, push, telegram).

### Поля

- `id` (uuid, pk)
- `provider_type` (string) — `email_postbox`, `email_mailgun`, `push_onesignal`, `telegram_bot`.
- `config` (jsonb) — ключи API, URL, параметры.
- `is_active` (bool)

---

## 5. NotificationEventLog (упрощённо — можно использовать саму Notification)

Для аналитики можно использовать:

- таблицу `Notification`,
- либо отдельную лог-таблицу (если нужно хранить больше технических деталей по каждому вызову).
