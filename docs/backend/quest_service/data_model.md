# Quest Service — Data Model

## 1. Quest

Основная сущность квеста/миссии.

### Поля

- `id` (uuid, pk)
- `slug` (string, unique) — человекочитаемый идентификатор.
- `title` (string)
- `subtitle` (string, nullable)
- `description` (text) — полное описание.
- `short_description` (text, nullable) — для карточек.

Тип и формат:

- `quest_type` (enum):
  - `single` — одиночный;
  - `group` — групповой.
- `mode` (enum):
  - `location` — локационный (есть гео-чекпоинты / atlas_place_id);
  - `online` — онлайн-миссия (без гео).
- `structure_type` (enum):
  - `linear` — линейный (шаги по порядку);
  - `open` — свободный (можно выполнять чекпоинты в любом порядке);
  - `campaign` — большой многоэтапный квест/кампания.
- `difficulty` (enum): `easy`, `medium`, `hard`.
- `duration_estimate_minutes` (int, nullable).

География и контекст:

- `country_id` (string, nullable)
- `city_id` (string, nullable)
- `main_atlas_place_id` (string, nullable) — ключевое место (старт/центр).

Авторство и статус:

- `created_by_user_id` (uuid) — PRO или admin.
- `author_role` (enum): `pro`, `admin`.
- `status` (enum):
  - `draft`, `pending_review`, `published`, `hidden`, `archived`.
- `is_featured` (bool) — выделенный квест.

Ценообразование и ограничения:

- `price_points` (int) — стоимость покупки квеста в Points (VIP+).
- `max_participants_per_run` (int, nullable) — лимит в группе.
- `max_runs_per_user` (int, default: 1) — сколько раз один пользователь может купить/пройти.
- `start_at` (timestamp, nullable) — начало доступности.
- `end_at` (timestamp, nullable) — конец доступности.

Награды:

- `reward_points` (int, nullable) — доп. Points пользователю за прохождение (если используется).
- `reward_nft_template_id` (string, nullable) — шаблон NFT награды.
- `reward_badge_label` (string, nullable) — человекочитаемый бейдж.
- `pro_reward_points_per_purchase` (int, nullable) — вознаграждение PRO за каждую покупку квеста (Points, фактически обрабатывается Points Service).

Условия публикации отчёта:

- `requires_space_post` (bool, default: true) — требуется ли финальный пост.
- `space_group_id` (string, nullable) — ID тематической группы в Space Asia, куда нужно постить.

Привязка к RF:

- `primary_rf_partner_id` (uuid, nullable) — основной бизнес-партнёр (если есть).
- `rf_partner_ids` (uuid[], nullable) — список задействованных партнёров.

Мета:

- `tags` (string[], nullable) — тематики, типы активности.
- `created_at`, `updated_at`, `published_at` (timestamps)

---

## 2. QuestStep

Шаг / чекпоинт квеста.

### Поля

- `id` (uuid, pk)
- `quest_id` (uuid, fk → Quest)
- `order_index` (int) — позиция в линейном квесте.
- `title` (string)
- `description` (text, nullable)

Тип чекпоинта:

- `checkpoint_type` (enum):
  - `gps` — геолокация;
  - `photo` — загрузка фото;
  - `qr` — QR/код;
  - `quiz` — вопрос/ответ;
  - `premium_voucher` — шаг, требующий покупки премиум-ваучера (по сути, комбинация с одним из выше, но выносим явно для конфигурации).

Гео и места:

- `atlas_place_id` (string, nullable) — место в Atlas Asia.
- `latitude` (numeric, nullable)
- `longitude` (numeric, nullable)
- `radius_meters` (int, nullable) — радиус допусков для GPS-чека.

Партнёры и ваучеры:

- `rf_partner_id` (uuid, nullable) — бизнес-партнёр Russian Friendly, задействованный в шаге.
- `required_voucher_id` (string, nullable) — требуемый ваучер (обычный).
- `required_premium_voucher_id` (string, nullable) — требуемый премиум-ваучер.

Q&A / Quiz:

- `quiz_question` (text, nullable)
- `quiz_answer_type` (enum: `text`, `single_choice`, `multiple_choice`)
- `quiz_correct_answers` (jsonb, nullable) — структура вариантов и правильных ответов.

QR/код:

- `qr_code_value` (string, nullable) — ожидаемый код (зашифрован или хэширован).

Фото:

- `photo_requirements` (jsonb, nullable) — текст/маска требований (не полный AI-анализ на MVP).

Флаги:

- `is_required` (bool, default: true) — обязательно ли выполнение шага.
- `auto_complete_on_check` (bool, default: true) — авто-зачёт при успешной проверке.

Мета:

- `created_at`, `updated_at`

---

## 3. QuestRun (QuestPurchase / QuestSession)

Факт покупки и прохождения квеста конкретным пользователем / группой.

### Поля

- `id` (uuid, pk)
- `quest_id` (uuid, fk)
- `user_id` (uuid, fk → User) — владелец / капитан группы.
- `group_id` (uuid, nullable) — идентификатор группы (если групповой квест).
- `purchase_points` (int) — сколько Points было списано.
- `purchase_time` (timestamp)
- `status` (enum):
  - `active`, `completed`, `failed`, `expired`, `cancelled`.
- `completed_at` (timestamp, nullable)
- `reward_points_granted` (bool, default: false)
- `reward_nft_granted` (bool, default: false)
- `space_post_id` (string, nullable) — ID поста-отчёта в Space (если требуется).
- `space_post_approved_by_pro` (bool, default: false)
- `space_post_approved_at` (timestamp, nullable)
- `space_post_approved_by_user_id` (uuid, nullable) — PRO или модератор.

---

## 4. QuestRunParticipant

Участник группового квеста.

### Поля

- `id` (uuid, pk)
- `quest_run_id` (uuid, fk → QuestRun)
- `user_id` (uuid, fk → User)
- `role` (enum: `owner`, `member`)
- `joined_at` (timestamp)

---

## 5. QuestCheckpointProgress

Прогресс по отдельному чекпоинту в рамках QuestRun.

### Поля

- `id` (uuid, pk)
- `quest_run_id` (uuid, fk → QuestRun)
- `quest_step_id` (uuid, fk → QuestStep)
- `status` (enum):
  - `pending`, `auto_verified`, `awaiting_review`, `rejected`, `completed`.
- `completed_at` (timestamp, nullable)

Данные для проверки:

- `gps_latitude` (numeric, nullable)
- `gps_longitude` (numeric, nullable)
- `gps_recorded_at` (timestamp, nullable)
- `photo_media_id` (string, nullable) — ID медиа в Media/Content.
- `qr_value_submitted` (string, nullable)
- `quiz_answer_payload` (jsonb, nullable)

Служебные поля:

- `auto_validation_result` (jsonb, nullable) — результат авто-проверки.
- `manual_reviewed_by_user_id` (uuid, nullable)
- `manual_reviewed_at` (timestamp, nullable)

---

## 6. QuestRewardLog

Факт выдачи награды за квест.

### Поля

- `id` (uuid, pk)
- `quest_run_id` (uuid, fk)
- `user_id` (uuid, fk)
- `reward_type` (enum: `points`, `nft`)
- `amount` (int, nullable) — для Points.
- `nft_template_id` (string, nullable)
- `external_tx_id` (string, nullable) — ID операции в Points/NFT сервисе.
- `created_at` (timestamp)

---

## 7. QuestTag (опционально)

Справочник тегов квестов.

- `id` (uuid, pk)
- `code` (string, unique)
- `label` (jsonb)
- `category` (string, nullable)
