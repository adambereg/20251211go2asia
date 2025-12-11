# Voucher Service — Модель данных

## 1. Voucher (определение ваучера)

Сущность, описывающая **правила ваучера**.

- `id` (uuid, pk)
- `code` (string, nullable):
  - человекочитаемый промокод (`WELCOME10`, `RF-PHUQUOC-2025`);
  - может быть `null` для скрытых/автоматически применяемых ваучеров.
- `type` (enum):
  - `percent_discount` — процентная скидка,
  - `fixed_discount` — фиксированная сумма скидки,
  - `bonus_points` — выдача Points (можно реализовать позже),
  - `free_item` — будущие сценарии.
- `scope_module` (enum):
  - `rf`,
  - `rielt`,
  - `quest`,
  - `atlas`,
  - `other`.
- `scope_action` (string):
  - `rf_bill_payment`, `rielt_booking`, `quest_ticket`, и т.п.
- `title` (string) — человекочитаемое название (“10% скидка в RF-партнёрах на Пхукете”).
- `description` (text, nullable).

### Дополнительные поля для Премиум-ваучеров

- `class` (enum):
  - `standard` — обычный ваучер,
  - `premium` — Премиум-ваучер бизнес-партнёра (с G2A/NFT-экономикой).
- `price_in_points` (numeric, nullable) — стоимость ваучера в Points (если используется).
- `price_in_g2a` (numeric, nullable) — стоимость ваучера в токенах G2A (off-chain учёт).
- `requires_nft_level` (int, nullable) — минимальный уровень NFT, необходимый для покупки/активации (если требуется).
- `economics` (jsonb, nullable) — агрегированная “экономика” ваучера, в том числе:
  - `business_reward_g2a` — размер компенсации бизнес-партнёру за одну покупку Премиум-ваучера;
  - `pro_reward_g2a` — размер вознаграждения PRO-спейсера за одну покупку Премиум-ваучера;
  - `nft_reward_template` — шаблон NFT, который нужно заминтить/апгрейдить при покупке;
  - другие параметры распределения (проценты, лимиты и т.п.).

Эти поля не заставляют Voucher Service самому выполнять переводы средств —  
они описывают, **какие операции должны быть выполнены Token/NFT сервисами** при покупке/погашении.


### Условия и ограничения

- `value` (numeric) — величина скидки:
  - для `percent_discount` — процент (например, `10`),
  - для `fixed_discount` — сумма в валюте.
- `currency` (string, nullable):
  - `RUB`, `VND`, `THB`, `USD` и т.п. (для фиксированной скидки);
  - может быть `null` для процента (берём валюту заказа).
- `min_order_amount` (numeric, nullable) — минимальная сумма заказа для применения.
- `max_discount_amount` (numeric, nullable) — ограничение на максимальную скидку (для процентов).

- `valid_from` (timestamp, nullable).
- `valid_to` (timestamp, nullable).

Лимиты использования:

- `max_uses_total` (int, nullable) — общий лимит использований (если `null` → без лимита по количеству, но ограничен временем).
- `max_uses_per_user` (int, nullable) — лимит на пользователя.

Аудит и статус:

- `status` (enum):
  - `draft`,
  - `active`,
  - `inactive`,
  - `expired`,
  - `archived`.
- `created_by_user_id` (uuid, fk → User Service).
- `created_at`, `updated_at`.

Персонализация:

- `is_personal` (bool, default: false) — персональный ваучер (закреплён за конкретным пользователем).
- `assigned_user_id` (uuid, nullable) — если `is_personal = true`.

Доп. правила/metadata:

- `allowed_partner_ids` (jsonb, nullable) — список партнёров (RF или иные), на которых действует ваучер.
- `allowed_object_ids` (jsonb, nullable) — список `rielt_listing_id`/`quest_id` и т.п.
- `metadata` (jsonb, nullable) — произвольные расширения.

---

## 2. VoucherRedemption (погашение ваучера)

Факт использования ваучера в конкретной операции.

- `id` (uuid, pk)
- `voucher_id` (uuid, fk → Voucher)
- `user_id` (uuid, fk → User) — кто применил.
- `scope_module` (enum) — дублируем для удобства аналитики.
- `scope_action` (string)
- `target_entity_type` (string, nullable) — `rf_bill`, `rielt_booking`, `quest_order`.
- `target_entity_id` (string, nullable) — идентификатор операции/сделки в соответствующем сервисе.
- `order_amount` (numeric) — исходная сумма заказа.
- `discount_amount` (numeric) — фактически применённая скидка.
- `currency` (string)
- `status` (enum):
  - `success`,
  - `failed`,
  - `rolled_back` (если отмена).
- `created_at`, `updated_at`.

---

## 3. UserVoucherView (опционально)

Упрощённое представление “моих ваучеров”:

- можно реализовать как materialized view или отдельную таблицу, которая связывает:

  - `voucher_id`,
  - `user_id`,
  - `remaining_uses_for_user`.

На MVP достаточно вычислять это “на лету” (через `Voucher` + `VoucherRedemption`).
