# Notification Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/notifications/v1/`**

Notification Service предоставляет:

- внутренний API для других микросервисов,
- ограниченный пользовательский API (история уведомлений, настройки — позже),
- служебный API для тестов и админ-задач.

---

## 1. Внутренний API (микросервисы → Notification)

### 1.1. POST `/internal/enqueue`

Поставить уведомление в очередь на отправку (для другого сервиса).

**Request:**
```json
{
  "user_id": "user-uuid",
  "channel": "email",
  "type": "user.welcome",
  "template_key": "user_welcome_email",
  "payload": {
    "user_name": "Иван",
    "confirm_link": "https://go2asia.app/confirm?token=..."
  },
  "priority": "normal",
  "scheduled_at": null
}
```

**Response 202:**
```json
{
  "notification_id": "notif-uuid",
  "status": "queued"
}
```

Принцип:

- доменный сервис **не форматирует письмо/текст**, а лишь передаёт `type`, `template_key` и `payload`;
- логика выбора канала, языка и обработка предпочтений — на стороне Notification Service.

---

### 1.2. POST `/internal/enqueue_batch`

Пакетная постановка уведомлений (для дайджестов, рассылок).

**Request:**
```json
{
  "items": [
    {
      "user_id": "user-1",
      "channel": "push",
      "type": "quest.completed",
      "template_key": "quest_completed_push",
      "payload": { "quest_title": "Ночной Сайгон" },
      "priority": "normal"
    },
    {
      "user_id": "user-2",
      "channel": "email",
      "type": "points.awarded",
      "template_key": "points_awarded_email",
      "payload": { "points": 100 },
      "priority": "low"
    }
  ]
}
```

**Response:**
```json
{
  "enqueued": 2
}
```

---

### 1.3. POST `/internal/delivery/webhook/{provider}`

Endpoint для приёма callback’ов от провайдера (например, Mailgun, OneSignal).

- Используется для обновления статусов:
  - `delivered`,
  - `opened`,
  - `failed`,
  - и хранения кода ошибки.

---

## 2. Пользовательский API

### 2.1. GET `/user/notifications`

Список уведомлений для текущего пользователя (для in-app ленты и истории).

**Query-параметры:**

- `status` — опционально (`sent`, `delivered`, `opened` и т.п.);
- `type` — опционально (фильтр по типу уведомления);
- `channel` — опционально (`in_app`, `email`, `push`);
- `page`, `page_size`.

**Response:**
```json
{
  "items": [
    {
      "id": "notif-uuid",
      "channel": "in_app",
      "type": "thread.new_message",
      "template_key": "thread_new_message_in_app",
      "payload": {
        "from_user_name": "Анна",
        "preview_text": "Можно ли заселиться в 9 утра?",
        "target_type": "rielt_listing",
        "target_id": "listing-uuid"
      },
      "status": "delivered",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 2.2. POST `/user/notifications/{id}/open`

Отметить уведомление как прочитанное/открытое.

**Response:**
```json
{
  "success": true
}
```

---

### 2.3. (Фаза 2) GET `/user/preferences`

Получить настройки уведомлений пользователя.

---

### 2.4. (Фаза 2) PATCH `/user/preferences`

Обновить настройки уведомлений пользователя.

**Request:**
```json
{
  "channels_enabled": {
    "email": true,
    "push": true,
    "telegram": false,
    "in_app": true
  },
  "types_enabled": {
    "reaction.like_received": true,
    "reaction.repost_received": true,
    "marketing.digest_weekly": false
  },
  "quiet_hours": {
    "start": "23:00",
    "end": "08:00",
    "timezone": "Asia/Bangkok"
  }
}
```

---

## 3. Служебный API

### 3.1. POST `/test/send`

Отправка тестового уведомления (для операций и отладки).

**Request:**
```json
{
  "user_id": "user-uuid",
  "channel": "email",
  "template_key": "test_notification",
  "payload": {
    "message": "Это тестовое уведомление Notification Service"
  }
}
```

---

## 4. Event Bus (внешний контракт)

Notification Service подписывается на события:

- `reaction.created`
- `thread.reply.created`
- `quest.completed`
- `points.awarded`
- `badge.earned`
- `user.registered`
- `user.password_reset`
- `post.published`
- `rf_partner.review_received` (может приходить как производное событие)
- и другие.

Для каждого события:

- внутри Notification Service настроены **маршруты**:
  - какие типы уведомлений генерировать (`type`),
  - шаблоны (`template_key`),
  - каналы (`channel` → email/push/telegram/in_app),
  - учёт пользовательских предпочтений (Фаза 2).
