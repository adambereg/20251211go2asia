# User Service — Модель данных

## 1. User

Базовая учётная запись.

- `id` (uuid, pk)
- `email` (string, unique, indexed, lowercased)
- `email_verified` (bool, default: false)
- `password_hash` (string, nullable для соц.логина)
- `status` (enum):
  - `active`,
  - `blocked`,
  - `deleted` (soft-delete).
- `primary_role` (enum):
  - `user`,
  - `vip`,
  - `pro`,
  - `business_partner_owner`,
  - `moderator`,
  - `admin`.
- `created_at`
- `updated_at`
- `last_login_at` (nullable)
- `referral_code` (string, unique, nullable) — персональный код (генерируется Referral Service или самим User Service).

> Права и доступ обычно строятся по `primary_role` + доп.ролям.

---

## 2. UserRole (доп.роли, если нужно)

- `user_id` (fk → User)
- `role` (enum, дублирует набор из `primary_role` + спец.роли)
- `granted_by` (admin user id, nullable)
- `created_at`

---

## 3. UserProfile

Отдельная таблица профиля.

- `user_id` (pk, fk → User)
- `display_name` (string)
- `username` (string, unique, optional) — @handle для Space/Guru.
- `avatar_url` (string, nullable)
- `bio` (string, nullable, ограниченной длины)

- `languages` (array<string>) — предпочитаемые языки общения (`["ru","en"]`).
- `home_country_id` (string, nullable)
- `home_city_id` (string, nullable)

- `current_country_id` (string, nullable)
- `current_city_id` (string, nullable)
- `current_lat` / `current_lng` (float, nullable) — последний известный гео-контекст (обновляется фронтом, используется Guru/Space).

- `visible_in_guru` (bool, default: false) — флаг “показывать меня как гида-PRO”.
- `guru_specialties` (array<string>, nullable) — специализации гида (guide, relocation, kids, nightlife …).
- `guru_languages` (array<string>, nullable) — языки для консультаций (если отличаются от базовых).
- `guru_hourly_rate_from` (numeric, nullable)
- `guru_currency` (string, nullable)

- `contacts_public` (jsonb):
  - `telegram` (string, nullable)
  - `phone` (string, nullable)
  - `whatsapp` (string, nullable)
  - `website` (string, nullable)
  - (всё это показывается в Guru/Space, если `visible_in_guru = true` или по другим правилам приватности).

---

## 4. UserPrivacySettings

- `user_id` (pk, fk → User)
- `profile_visibility` (enum):
  - `public`,
  - `registered_only`,
  - `friends_only`.
- `show_in_search` (bool, default: true)
- `show_current_location` (bool, default: false)
- `allow_friend_requests` (bool, default: true)
- `allow_messages_from` (enum, на будущее — если появятся общения/ветки, сейчас можно зарезервировать)
  - `all`, `friends`, `none`.
- `allow_guru_visibility` (bool) — дублирует/синхронизируется с `visible_in_guru` (чётко описать в бизнес-правилах).

---

## 5. UserNotificationSettings

- `user_id` (pk)
- `email_notifications_enabled` (bool)
- `push_notifications_enabled` (bool)
- `language` (string) — язык писем/уведомлений.
- `digest_frequency` (enum: `none`, `daily`, `weekly`)
- Типы уведомлений (bool флаги):
  - `notify_new_follower`,
  - `notify_quest_rewards`,
  - `notify_guru_requests` (если PRO),
  - и т.д.

---

## 6. SocialGraph (друзья/подписки/блокировки)

Опция А: “подписки” (как Twitter):

**UserFollow**

- `follower_id` (fk → User)
- `followee_id` (fk → User)
- `status`:
  - `active`,
  - `muted`,
  - `blocked` (или отдельная таблица блокировок).
- `created_at`

Опция Б: “дружба” (симметрично). Можно начать с follow-модели и в Space интерпретировать взаимную подписку как “дружбу”.

---

## 7. Auth Tokens

**UserSession / RefreshToken**

- `id` (uuid)
- `user_id`
- `refresh_token_hash` (string)
- `user_agent` (string, nullable)
- `ip` (string, nullable)
- `expires_at`
- `created_at`
- `revoked_at` (nullable)

Access-токены не храним (JWT stateless), но может быть blacklist.

---

## 8. OAuthAccount (если используем соц.логин)

- `user_id`
- `provider` (enum: `google`, `vk`, `facebook`, `apple` …)
- `provider_user_id` (string)
- `access_token_encrypted` (string, nullable)
- `refresh_token_encrypted` (string, nullable)
- `expires_at` (nullable)

---

## Индексы

- `user.email` (unique)
- `user_profile.username` (unique)
- `user_profile.visible_in_guru`
- `user_profile.current_city_id`
- `user_profile.current_lat/current_lng` (геоиндекс — по мере необходимости)
- `user_follow.follower_id`, `user_follow.followee_id`
