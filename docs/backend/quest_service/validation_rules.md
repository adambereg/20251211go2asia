# Quest Service — Validation Rules

## Quest

- `title`:
  - обязательное поле,
  - длина 3–200 символов.
- `quest_type`:
  - `single` или `group`.
- `mode`:
  - `location` или `online`.
- `price_points`:
  - `>= 0`, но для платных квестов `> 0`.
- `reward_points`:
  - `>= 0`.
- `pro_reward_points_per_purchase`:
  - `>= 0`.
- `country_id` / `city_id`:
  - обязательны для `mode=location` (MVP).
- `space_group_id`:
  - обязательна, если `requires_space_post = true`.

Статусы:

- допустимые переходы:
  - `draft` → `pending_review` → `published` → `hidden`/`archived`.
- Публиковать (`published`) может только:
  - `admin` (для квестов PRO — после модерации),
  - либо PRO при определённых правилах (опционально позже).

---

## QuestStep

- `order_index`:
  - обязательное для `structure_type=linear`,
  - уникальное в рамках одного `quest_id`.
- `checkpoint_type`:
  - одно из: `gps`, `photo`, `qr`, `quiz`, `premium_voucher`.
- Для `checkpoint_type=gps`:
  - должны быть заданы `latitude`, `longitude`, `radius_meters > 0`.
- Для `checkpoint_type=quiz`:
  - `quiz_question` обязательно,
  - `quiz_correct_answers` не пустое.
- Для `checkpoint_type=qr`:
  - `qr_code_value` обязателен (может храниться в хэшированном виде).
- Для `checkpoint_type=premium_voucher`:
  - `required_premium_voucher_id` обязателен,
  - `rf_partner_id` желателен (партнёр-владелец ваучера).

---

## QuestRun

- Создание `QuestRun`:
  - `quest.status` должен быть `published`,
  - пользователь должен соответствовать уровню (VIP+),
  - `start_at`/`end_at` не должны запрещать участие.
- Один пользователь:
  - не может иметь более `max_runs_per_user` активных/завершённых `QuestRun` по одному и тому же квесту (если лимит задан).

---

## CheckpointProgress

- Для каждого `QuestRun` + `QuestStep` должно быть не более одной активной записи прогресса.
- Автопроверка:
  - если данные не соответствуют условиям (например, GPS за пределами радиуса) → `status = rejected`.
- Manual review:
  - для финального поста или сложных кейсов можно выставлять `awaiting_review`.

---

## Награды

- Повторная выдача награды:
  - не допускается при повторном вызове `/complete` для того же `QuestRun`,
  - проверяется флагами `reward_points_granted` / `reward_nft_granted`.
