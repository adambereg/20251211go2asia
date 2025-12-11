# Notification Service — Workflows

## 1. Приветственное письмо при регистрации пользователя

1. User Service создаёт пользователя и публикует событие `user.registered`.
2. Notification Service получает событие через Event Bus.
3. Внутри:
   - определяет тип уведомления: `user.welcome`,
   - выбирает канал: `email`,
   - подбирает `template_key` и локаль.
4. Вызывает use-case `EnqueueNotification`:
   - создаёт запись `Notification` со статусом `queued`.
5. Worker:
   - забирает уведомление из очереди,
   - отправляет email через email-провайдера,
   - обновляет статус (`sent`/`delivered`).

---

## 2. Уведомление о репосте поста

1. В Reactions Service создаётся реакция `repost` на `space_post`.
2. Reactions Service публикует `reaction.created` (type=repost).
3. Notification Service:
   - получает событие,
   - определяет автора оригинального поста,
   - формирует уведомление (`type = "reaction.repost_received"`) для автора.
4. В зависимости от предпочтений:
   - отправляет push,
   - добавляет in_app-уведомление,
   - возможно, email (если включены).

---

## 3. Новый отзыв о заведении RF-партнёра

1. Пользователь оставляет `short_review` и `rating` на `rf_partner`.
2. Reactions Service генерирует `reaction.created`.
3. Notification Service:
   - определяет владельца RF-аккаунта,
   - формирует `type = "rf_partner.review_received"`,
   - подставляет в payload название заведения, текст отзыва и ссылку в кабинет.
4. Отправка:
   - push/in_app для владельца,
   - при необходимости — email.

---

## 4. Новый ответ в ветке общения (Thread)

1. Пользователь (арендодатель или арендатор) пишет ответ (`type = "thread_reply"`) в ветке.
2. Reactions Service публикует `thread.reply.created`.
3. Notification Service:
   - определяет, кто является вторым участником ветки,
   - создаёт уведомление `type = "thread.new_message"` для этого участника.
4. Каналы:
   - push,
   - in_app (в ленту уведомлений),
   - (Фаза 2) Telegram.

---

## 5. Начисление Points и бейджа

1. Connect/Points Service публикует событие `points.awarded` и/или `badge.earned`.
2. Notification Service:
   - формирует уведомление для пользователя:
     - `type = "points.awarded"` или `badge.earned`,
   - подставляет количество Points, название бейджа и ссылку на профиль/кабинет.
3. Отправка:
   - push/in_app для мгновенной обратной связи,
   - email — в рамках регулярного дайджеста (еженедельный отчёт о достижениях).

---

## 6. Напоминание о событии Pulse

1. Pulse Service планирует напоминания:
   - за 24 часа и за 1 час до начала события.
2. Для каждого участника события:
   - Pulse либо напрямую вызывает `/internal/enqueue`,
   - либо публикует событие `event.reminder_due`.
3. Notification Service:
   - формирует `type = "pulse.event_reminder"`,
   - отправляет push или in_app.

---

## 7. Сброс пароля

1. Пользователь инициирует сброс пароля.
2. User Service генерирует токен и либо:
   - публикует событие `user.password_reset_requested`,
   - либо вызывает `/internal/enqueue` у Notification Service.
3. Notification Service:
   - создаёт email-уведомление с `template_key = "user_password_reset_email"`,
   - подставляет ссылку для сброса.

---

## 8. Просмотр списка уведомлений и отметка о прочтении

1. Пользователь открывает раздел «Мои уведомления» в Space Asia.
2. Фронтенд вызывает:
   - `GET /user/notifications?page=1&page_size=20`.
3. Пользователь кликает уведомление:
   - фронтенд отправляет `POST /user/notifications/{id}/open`.
4. Notification Service:
   - обновляет `status = "opened"`,
   - при необходимости может использовать эти данные для аналитики (CTR, активность пользователей).
