# User Service — API Contracts

Версия: **v1**  
Базовый путь: **`/api/user/v1/`**

User Service — центральный сервис идентификации и профилей в экосистеме Go2Asia.

---

## 1. Аутентификация

### 1.1. POST `/api/user/v1/auth/register`

Регистрация по email + пароль.

**Request (JSON):**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd",
  "display_name": "Иван",
  "language": "ru",
  "referral_code": "INVITE123"
}
```

**Response 201:**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "email_verified": false
}
```

---

### 1.2. POST `/api/user/v1/auth/login`

Логин по email + пароль.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "StrongP@ssw0rd"
}
```

**Response 200:**
```json
{
  "access_token": "jwt_access",
  "refresh_token": "opaque_or_jwt_refresh",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

---

### 1.3. POST `/api/user/v1/auth/refresh`

Обновление access-токена по refresh-токену.

**Request:**
```json
{
  "refresh_token": "string"
}
```

**Response 200:**
```json
{
  "access_token": "new_jwt_access",
  "refresh_token": "new_refresh_token",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

---

### 1.4. POST `/api/user/v1/auth/logout`

Инвалидировать refresh-токен (выход из аккаунта).

**Request:**
```json
{
  "refresh_token": "string"
}
```

**Response:** `204 No Content`

---

### 1.5. POST `/api/user/v1/auth/request-password-reset`

Запрос ссылки на сброс пароля.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:** `204 No Content`

---

### 1.6. POST `/api/user/v1/auth/reset-password`

Сброс пароля по токену из письма.

**Request:**
```json
{
  "token": "reset_token_from_email",
  "new_password": "NewStrongP@ssw0rd"
}
```

**Response:** `204 No Content`

---

### 1.7. POST `/api/user/v1/auth/verify-email`

Подтверждение email по токену из письма.

**Request:**
```json
{
  "token": "email_verify_token"
}
```

**Response:** `204 No Content`

---

## 2. Текущий пользователь

Все эндпоинты из этого блока требуют заголовка `Authorization: Bearer {access_token}`.

### 2.1. GET `/api/user/v1/me`

Получить профиль текущего пользователя.

**Response 200:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "email_verified": true,
  "primary_role": "pro",
  "status": "active",
  "profile": {
    "display_name": "Алексей",
    "username": "phuquoc_guru",
    "avatar_url": "https://cdn.go2asia/avatars/user-uuid.jpg",
    "bio": "Гид по Фукуоку, помогу с зимовкой.",
    "languages": ["ru", "en"],
    "home_country_id": "ru",
    "home_city_id": "novosibirsk",
    "current_country_id": "vn",
    "current_city_id": "phu-quoc",
    "current_lat": 10.212,
    "current_lng": 103.967,
    "visible_in_guru": true,
    "guru_specialties": ["guide", "relocation", "kids"],
    "guru_languages": ["ru", "en"],
    "guru_hourly_rate_from": 1500000,
    "guru_currency": "VND",
    "contacts_public": {
      "telegram": "@phuquoc_guru",
      "phone": "+84-123-456-789",
      "whatsapp": "+84-123-456-789",
      "website": "https://phuquoc-guru.com"
    }
  },
  "privacy": {
    "profile_visibility": "public",
    "show_in_search": true,
    "show_current_location": false
  },
  "notification_settings": {
    "email_notifications_enabled": true,
    "push_notifications_enabled": true,
    "language": "ru",
    "digest_frequency": "weekly"
  }
}
```

---

### 2.2. PATCH `/api/user/v1/me`

Частичное обновление профиля и настроек.

**Request (пример):**
```json
{
  "profile": {
    "display_name": "Алексей (Phu Quoc)",
    "bio": "Живу на Фукуоке, провожу экскурсии и помогаю с релокацией.",
    "visible_in_guru": true,
    "guru_specialties": ["guide", "relocation"],
    "guru_languages": ["ru", "en"],
    "guru_hourly_rate_from": 1500000,
    "guru_currency": "VND",
    "contacts_public": {
      "telegram": "@phuquoc_guru",
      "phone": "+84-123-456-789"
    }
  },
  "privacy": {
    "show_in_search": true,
    "show_current_location": false
  }
}
```

**Response 200:** обновлённый объект `/me`.

---

### 2.3. DELETE `/api/user/v1/me` (Фаза 3–4)

Запрос на удаление/деактивацию аккаунта (soft-delete).

**Response:** `204 No Content`

---

## 3. Публичные профили и поиск

### 3.1. GET `/api/user/v1/users/{id}`

Получить публичный профиль пользователя с учётом настроек приватности.

**Response (пример):**
```json
{
  "id": "uuid",
  "primary_role": "pro",
  "profile": {
    "display_name": "Алексей",
    "username": "phuquoc_guru",
    "avatar_url": "https://cdn.go2asia/avatars/user-uuid.jpg",
    "bio": "Гид по Фукуоку.",
    "languages": ["ru", "en"]
  },
  "is_guru_visible": true
}
```

---

### 3.2. GET `/api/user/v1/users/by-username/{username}`

Получить пользователя по username (для Space и ссылок вида @username).

**Response:** аналогично `/users/{id}`.

---

### 3.3. GET `/api/user/v1/users/search`

Поиск пользователей (ограниченная публичная выдача).

**Query params:**
- `q` — строка (имя, username)
- `role` — `user` | `vip` | `pro`
- `country_id` — фильтр по стране
- `city_id` — фильтр по городу
- `is_guru` — `true` / `false` (только PRO c `visible_in_guru = true`)
- `page` — номер страницы (по умолчанию 1)
- `page_size` — размер страницы (по умолчанию 20, максимум 100)

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "display_name": "Алексей",
      "username": "phuquoc_guru",
      "avatar_url": "https://cdn.go2asia/avatars/user-uuid.jpg",
      "primary_role": "pro",
      "is_guru_visible": true,
      "current_city_id": "phu-quoc"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

## 4. Социальный граф (follow/block)

Все эндпоинты требуют авторизации.

### 4.1. GET `/api/user/v1/me/following`

Список пользователей, на которых подписан текущий пользователь.

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "display_name": "Мария",
      "username": "saigon_foodie",
      "avatar_url": "https://cdn.go2asia/avatars/user-2.jpg",
      "primary_role": "vip"
    }
  ],
  "total": 1
}
```

---

### 4.2. GET `/api/user/v1/me/followers`

Список подписчиков.

---

### 4.3. POST `/api/user/v1/me/follow/{id}`

Подписаться на пользователя `{id}`.

**Response:** `204 No Content`

---

### 4.4. POST `/api/user/v1/me/unfollow/{id}`

Отписаться.

**Response:** `204 No Content`

---

### 4.5. POST `/api/user/v1/me/block/{id}`

Заблокировать пользователя (для скрытия контента/взаимодействий).

**Response:** `204 No Content`

---

## 5. Настройки уведомлений

### 5.1. GET `/api/user/v1/me/notification-settings`

Получить текущие настройки уведомлений.

**Response:**
```json
{
  "email_notifications_enabled": true,
  "push_notifications_enabled": true,
  "language": "ru",
  "digest_frequency": "weekly",
  "notify_new_follower": true,
  "notify_quest_rewards": true,
  "notify_guru_requests": true
}
```

---

### 5.2. PUT `/api/user/v1/me/notification-settings`

Полное обновление настроек уведомлений.

**Request:**
```json
{
  "email_notifications_enabled": true,
  "push_notifications_enabled": false,
  "language": "ru",
  "digest_frequency": "daily",
  "notify_new_follower": true,
  "notify_quest_rewards": true,
  "notify_guru_requests": true
}
```

**Response:** `204 No Content`

---

## 6. Админ/Модерация (admin, moderator)

Все эндпоинты требуют роли `admin` или `moderator`.

### 6.1. GET `/api/user/v1/admin/users`

Поиск пользователей для админки.

**Query params:**
- `email`
- `primary_role`
- `status` — `active` | `blocked` | `deleted`
- `created_from`, `created_to` (ISO8601)
- `page`, `page_size`

**Response:**
```json
{
  "items": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "primary_role": "pro",
      "status": "active",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "page": 1,
  "page_size": 20,
  "total": 1
}
```

---

### 6.2. PATCH `/api/user/v1/admin/users/{id}/role`

Изменение основной роли пользователя.

**Request:**
```json
{
  "primary_role": "pro"
}
```

**Response:** `204 No Content`

---

### 6.3. PATCH `/api/user/v1/admin/users/{id}/status`

Изменить статус пользователя (блокировка/разблокировка/удаление).

**Request:**
```json
{
  "status": "blocked"
}
```

**Response:** `204 No Content`

---

## 7. Сервисные (internal) API

Эти эндпоинты используются другими микросервисами Go2Asia (через сервисные токены/mTLS).

### 7.1. GET `/api/user/v1/internal/users/{id}/basic`

Минимальный профиль пользователя для других сервисов.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "primary_role": "pro",
  "status": "active",
  "languages": ["ru", "en"],
  "profile": {
    "display_name": "Алексей",
    "username": "phuquoc_guru",
    "avatar_url": "https://cdn.go2asia/avatars/user-uuid.jpg",
    "visible_in_guru": true,
    "current_country_id": "vn",
    "current_city_id": "phu-quoc",
    "contacts_public": {
      "telegram": "@phuquoc_guru",
      "phone": "+84-123-456-789"
    }
  }
}
```

---

### 7.2. GET `/api/user/v1/internal/users/{id}/notification-profile`

Набор данных для Notification Service.

**Response:**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "language": "ru",
  "email_notifications_enabled": true,
  "push_notifications_enabled": true
}
```

---

### 7.3. GET `/api/user/v1/internal/users/{id}/roles`

(Опционально, если нужно отдельно.)

**Response:**
```json
{
  "primary_role": "pro",
  "roles": ["pro", "quest_creator"]
}
```

---

## 8. Версионирование

- Текущая версия: **v1** (`/api/user/v1/...`).
- При появлении ломающих изменений добавляется `/api/user/v2/...` с параллельной поддержкой v1.

---

## 9. Статус документа

Этот файл — **единый источник правды по публичному REST API User Service**.  
Любые изменения в коде, влияющие на контракты, должны сопровождаться обновлением этого документа.
