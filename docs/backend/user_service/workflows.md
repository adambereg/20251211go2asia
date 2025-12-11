# User Service — Основные сценарии (Workflows)

## 1. Регистрация нового пользователя

1. Пользователь заполняет форму регистрации.
2. Frontend → `POST /auth/register`.
3. User Service:
   - создаёт `User` + `UserProfile`,
   - генерирует `email_verify_token`,
   - вызывает Notification Service (отправить письмо).
4. Пользователь переходит по ссылке → токен → `POST /auth/verify-email`.
5. Email помечается как `verified`.

---

## 2. Логин и сессии

1. Пользователь вводит email/пароль → `POST /auth/login`.
2. User Service:
   - проверяет email + пароль,
   - создаёт/обновляет запись в `UserSession`,
   - возвращает `access_token` + `refresh_token`.
3. Все последующие запросы в другие сервисы → с `Authorization: Bearer access_token`.

---

## 3. Сброс пароля

1. Пользователь запрашивает сброс → `POST /auth/request-password-reset`.
2. User Service:
   - генерирует одноразовый токен,
   - сохраняет его в кеш,
   - отправляет email через Notification Service.
3. Пользователь переходит по ссылке → вводит новый пароль → `POST /auth/reset-password`.
4. Токен инвалидируется, пароль обновляется, старые сессии могут быть отключены.

---

## 4. Обновление профиля и включение PRO/Guru

1. Пользователь (уже PRO или кандидат) открывает настройки профиля.
2. Обновляет:
   - `display_name`, `bio`,
   - `visible_in_guru`,
   - `contacts_public`, `guru_specialties`.
3. Frontend → `PATCH /me`.
4. User Service:
   - валидирует данные,
   - сохраняет изменения,
   - по необходимости:
     - публикует событие `user.profile_changed`,
     - пингует Guru Service для обновления кеша PRO.

---

## 5. Подписки и блокировки

1. Пользователь нажимает “Подписаться” на другом пользователе.
2. Frontend → `POST /me/follow/{id}`.
3. User Service:
   - создаёт запись `UserFollow`,
   - опционально публикует событие (`user.followed`),
   - Notification Service может отправить уведомление.

---

## 6. Смена роли админом

1. Админ в админке меняет роль пользователя (например, с user на pro).
2. Frontend → `PATCH /admin/users/{id}/role`.
3. User Service:
   - обновляет `primary_role`,
   - публикует событие `user.role_changed`,
   - Connect/Points может начислить бонусы, Guru — пересчитать видимость.

---

## 7. Удаление / деактивация аккаунта

1. Пользователь инициирует удаление аккаунта.
2. Frontend → `DELETE /me` (или `POST /me/delete-request`).
3. User Service:
   - помечает `status = deleted`,
   - публикует `user.deleted`,
   - (в будущем) запускает процессы де-идентификации/обезличивания контента.
