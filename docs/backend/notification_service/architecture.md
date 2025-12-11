# Notification Service — Architecture

## Компоненты

1. **API Layer**
   - REST API `/api/notifications/v1/...`
   - Группы endpoint’ов:
     - internal: `/internal/enqueue`, `/internal/enqueue_batch`, `/internal/delivery/webhook/{provider}`
     - user: `/user/notifications`, `/user/notifications/{id}/open`, (Фаза 2) `/user/preferences`
     - service/testing: `/test/send`
   - Авторизация и аутентификация.

2. **Application Layer**
   - Use-cases:
     - `EnqueueNotification`, `EnqueueNotificationBatch`
     - `ProcessProviderWebhook`
     - `MarkNotificationOpened`
     - `GetUserNotifications`
     - (Фаза 2) `UpdateNotificationPreferences`, `GetNotificationPreferences`
   - Логика:
     - выбор канала и проверки предпочтений,
     - правила по quiet hours,
     - троттлинг/anti-spam.

3. **Domain Layer**
   - Модели:
     - `Notification`
     - `NotificationPreference`
     - `NotificationTemplate`
     - (опционально) `ProviderConfig`
   - Value-объекты:
     - `NotificationType`, `NotificationChannel`, `NotificationStatus`.

4. **Delivery Layer**
   - Адаптеры для провайдеров:
     - Email Provider (Postbox/Mailgun/SMTP),
     - Push Provider (OneSignal/FCM/APNs),
     - Telegram Provider.
   - Обработка:
     - создание запросов к внешним API,
     - обработка ответов и ошибок.

5. **Queue / Worker Layer**
   - Очередь задач:
     - для отправки уведомлений (и повторных попыток),
     - для массовых рассылок/дайджестов.
   - Воркеры:
     - принимают записи `Notification` со статусом `queued`,
     - отправляют через провайдеров,
     - обновляют статусы (`sent`, `failed` и т.п.).

---

## Потоки данных

- **Событийный поток:**
  - Event Bus → Notification Service:
    - события (`reaction.created`, `thread.reply.created`, `quest.completed` и др.)
      обрабатываются подписчиками внутри Notification Service;
    - на их основе вызывается `EnqueueNotification` с нужным типом/шаблоном.

- **Синхронный внутренний API:**
  - доменный сервис напрямую вызывает `/internal/enqueue`
    (например, User Service при регистрации/сбросе пароля).

- **Доставка:**
  - воркер выбирает `Notification` со статусом `queued`,
  - отправляет через провайдера,
  - обновляет статус и временные поля (`sent_at`, `delivered_at`).

---

## Масштабирование

- API-инстансы:
  - масштабируются горизонтально.
- Worker-инстансы:
  - масштабируются отдельно, в зависимости от нагрузки рассылки.
- Очередь:
  - используется внешний брокер (например, Redis streams, RabbitMQ, Cloud queue).

---

## Граница ответственности

Notification Service:

- отвечает за:
  - формирование, отправку, логирование и управление уведомлениями,
  - предпочтения и политики уведомлений (на поздних этапах),
- **не отвечает** за:
  - сам бизнес-событие (создание реакции, квеста, брони и т.п.),
  - хранение сущностей домена (места, посты, события).

Доменные сервисы описывают **что произошло**, Notification Service решает **как об этом уведомить**.
