# Connect Service — Validation Rules

Валидация важна для того, чтобы Connect Service:

- не принимал «грязные» или неконсистентные события,
- предсказуемо применял правила,
- не создавал некорректные `RewardAction`.

## 1. Валидация входящих событий (`/internal/events`)

Обязательные поля:

- `event_type` — не пустой, строковый.
- `source_service` — не пустой, строковый.
- `external_id` — рекомендуется, особенно для событий, связанных с платежами/бронированиями/покупками.
- `context` — может быть пустым json, но должен быть валидным JSON.

Бизнес-валидация (пример):

- для `referral.joined`:
  - `context.level` ∈ {1, 2},
  - `actor_user_id` (новый пользователь) обязателен,
  - `primary_subject_user_id` (спонсор) обязателен.
- для `quest.completed`:
  - `context.quest_id` обязателен,
  - `actor_user_id` обязателен,
  - `primary_subject_user_id` = PRO-автор квеста (опционально, но желательно).
- для `voucher.premium_purchased`:
  - `context.voucher_id`, `context.rf_partner_id`, `context.is_premium_voucher = true`.
- для `rielt.booking_paid`:
  - `context.listing_id`, `context.amount_fiat` и т.п.

Если критические поля отсутствуют или `event_type` неизвестен,
событие может быть:

- либо отклонено с ошибкой (4xx),
- либо записано как `status = failed` для дальнейшего анализа.

---

## 2. Валидация RewardRule

При создании/обновлении правила:

- `event_type` должен быть:
  - либо в заранее определённом списке поддерживаемых событий,
  - либо зарегистрированным «типом события» (конфигурация).
- `rewards`:
  - каждый элемент должен иметь:
    - `type` ∈ {`points`, `nft`, `g2a_offchain`, `g2a_onchain`},
    - `target` ∈ {`actor`, `sponsor`, `sponsor2`, `pro_author`, `rf_owner`, ...},
    - для `type = points` — поле `amount > 0`,
    - для `type = nft` — `badge_type` не пустой.
  - `locked_until` (если есть):
    - допустимые значения: `vip_or_pro`, `none`, `manual_approval`.

Некорректные правила не должны сохраняться в БД.

---

## 3. Валидация RewardAction

RewardAction создаётся только после:

- успешного сохранения `EconomicEvent`,
- успешного подбора и применения `RewardRule`.

Проверки:

- `target_user_id` не пустой,
- для `reward_type = points`:
  - `amount > 0`,
  - `currency = "points"` (или другое допустимое значение),
- для `reward_type = nft`:
  - `badge_type` не пустой.

---

## 4. Idempotency (идемпотентность)

- `external_id` используется для защиты от повторного получения одного и того же события.
- При повторном запросе:
  - Connect Service может вернуть уже существующий `economic_event_id`,
  - не создаёт новые `RewardAction` для того же `external_id`,
    если событие уже обработано.

Это особенно важно для:

- событий, связанных с оплатой (double spending),
- нестабильных интеграций (повторные HTTP/Message-поставки).

---

## 5. Ограничения и лимиты

- Возможные бизнес-ограничения:
  - максимум N наград одного типа на пользователя в день,
  - лимиты по кампаниям (например, суммарный пул Points для кампании).
- Эти лимиты могут быть реализованы:
  - в логике Connect,
  - либо как отдельный Anti-Abuse/Quota Service (на более поздних этапах).
