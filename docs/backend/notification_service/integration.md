# Notification Service — Integrations

## Event Bus

Notification Service — подписчик на ключевые события платформы:

- от **Reactions Service**:
  - `reaction.created` (likes, reposts, short_review, feedback, rating, question, contact_request, completed),
  - `thread.reply.created`;
- от **Quest Service**:
  - `quest.completed`;
- от **Connect / Points / NFT / Token Services**:
  - `points.awarded`,
  - `badge.earned`,
  - `voucher.bonus_granted`;
- от **User Service**:
  - `user.registered`,
  - `user.email_confirm_required`,
  - `user.password_reset_requested`;
- от **Space / Blog / Media / Atlas / Pulse / RF / Rielt**:
  - `post.published`,
  - `event.reminder_due`,
  - `rf_partner.approved`,
  - `rielt.booking_status_changed`, и т.п.

Каждое событие сопоставляется с одним или несколькими уведомлениями.

---

## Reactions Service

Основной источник событий для:

- социального взаимодействия,
- уведомлений о новых реакциях и ветках общения.

Примеры:

- `reaction.created` с `type = "repost"`:
  - Notification → автор исходного контента: "Ваш пост репостнули".
- `reaction.created` с `type = "short_review"` на `rf_partner`:
  - Notification → владелец партнёрского аккаунта: "Новый отзыв о вашем заведении".
- `reaction.created` с `type = "question"`:
  - Notification → владелец объявления/события/квеста: "Новый вопрос".
- `thread.reply.created`:
  - Notification → собеседник в ветке: "Новый ответ в ветке общения".

---

## User Service

- Email-уведомления:
  - confirmation / welcome:
    - `type = "user.welcome"` / `user.email_confirm_required`;
  - password reset:
    - `type = "user.password_reset"`.
- При регистрации:
  - User Service генерирует событие `user.registered`,
  - Notification Service создаёт и отправляет email/приветственное уведомление.

---

## Connect / Points / NFT / Token Services

- События:
  - `points.awarded` — пользователь получил Points,
  - `badge.earned` — новый NFT-бейдж,
  - `tier.upgraded` — переход в VIP/PRO.
- Notification Service:
  - отправляет уведомления о достижениях и наградах:
    - push/in_app,
    - email (например, еженедельный дайджест достижений).

---

## Quest Service

- Когда квест завершён (`quest.completed`):
  - Notification Service информирует пользователя о наградах (Points/NFT),
  - может уведомить PRO-автора квеста об успешном прохождении другими пользователями.

---

## Rielt Service

- События:
  - `rielt.inquiry_created` (инициирована ветка общения → зависит от Reactions/Thread),
  - `rielt.booking_status_changed` (подтверждение/отмена брони).
- Notification:
  - арендодатель получает уведомления о новых запросах и изменениях статуса,
  - арендатор — о подтверждении/отмене брони.

---

## RF Service

- События:
  - `rf_partner.approved` — заведение прошло модерацию,
  - `rf_partner.suspended` — заведению ограничен доступ,
  - производные события от Reactions (новый отзыв, высокая оценка и т.п.).
- Notification:
  - уведомляет бизнес-партнёров о важных событиях, связанных с их заведением.

---

## Atlas / Pulse / Blog / Guru

- Напоминания и дайджесты:
  - новые события в городе (Pulse),
  - новые статьи по избранным тематикам (Blog),
  - новые места рядом (Atlas/Guru),
  - «сегодня в городе» подборки.
- Notification:
  - отправляет push/email/telegram по заранее настроенным правилам и/или AI-подборке.

---

## Внешние провайдеры

- Email:
  - Postbox, Mailgun или другой провайдер — через `/internal/delivery/webhook/{provider}`.
- Push:
  - OneSignal/FCM/APNs — провайдер SDK/HTTP API.
- Telegram:
  - Telegram Bot API (Фаза 2).
