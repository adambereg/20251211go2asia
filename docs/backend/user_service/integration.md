# User Service — Интеграции

## Notification Service

- Отправка писем:
  - при регистрации (подтверждение email),
  - при запросе сброса пароля,
  - при смене важной информации (email/роль).

**События / вызовы:**

- `POST /api/notifications/send-email` с payload:
  - `to`, `template`, `locale`, `params`.

---

## Referral Service

- При регистрации, если указан `referral_code`, User Service:
  - дергает Referral Service:
    - `POST /api/referral/v1/attach` с `user_id` и `referral_code`.
- Referral Service хранит связи и в будущем инициирует награды через Token/Connect.

---

## Connect / Points / Token Service

- При смене роли (user → vip → pro):
  - публикуется событие `user.role_changed` (Event Bus) или вызывается Connect API.
- При удалении/блокировке пользователя:
  - событие `user.status_changed`.

---

## Guru Service

- Guru Service получает из User Service:
  - список PRO с `visible_in_guru = true`,
  - их контакты (`contacts_public`) и специализации.
- Способы:
  - `GET /internal/users/{id}/basic`;
  - либо подписка Guru на события `user.profile_changed` и построение своей денормализованной таблицы GuruProPresence.

---

## Atlas / Pulse / Media / Rielt / RF / Quest / Content (Space)

- Все эти сервисы:
  - принимают `user_id` из JWT, выданного User Service;
  - иногда запрашивают базовый профиль для отображения имени/аватара:
    - `GET /internal/users/{id}/basic`.

Примеры:

- Atlas:
  - `created_by_user_id` для контента.
- Quest:
  - автор квеста — PRO (проверка роли).
- RF:
  - бизнес-партнёр — отдельный аккаунт в User Service (роль `business_partner_owner`).
- Content (Space):
  - авторы постов/реакций.

---

## Notification Preferences

- Notification Service запрашивает:
  - `GET /api/user/v1/internal/users/{id}/notification-profile`
  - и решает, отправлять ли уведомление.

---

## Event Bus (опционально)

События, публикуемые User Service:

- `user.created`
- `user.email_verified`
- `user.role_changed`
- `user.deleted`
- `user.profile_changed`
