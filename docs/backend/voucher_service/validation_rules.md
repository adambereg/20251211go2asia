# Voucher Service — Validation Rules

## Поля ваучера

- `code`:
  - строка 3–64 символов,
  - только разрешённые символы (буквы, цифры, `-`, `_`),
  - уникальный среди активных ваучеров (можно расширить до глобальной уникальности).
- `type`:
  - `percent_discount`, `fixed_discount`, `bonus_points`, `free_item` (последние два можно отложить).
- `scope_module`:
  - один из: `rf`, `rielt`, `quest`, `atlas`, `other`.
- `scope_action`:
  - не пустая строка, длина до, например, 100 символов.

### Скидка

- `value`:
  - для `percent_discount`: `0 < value <= 100` (можно ограничить, например, до 80).
  - для `fixed_discount`: `value > 0`.
- `currency`:
  - обязателен для `fixed_discount`,
  - должен быть из списка поддерживаемых кодов валют.

### Сроки

- `valid_from`:
  - опционален, если ваучер действует “сразу”.
- `valid_to`:
  - если задан, должен быть > `valid_from` (если `valid_from` есть).
- При создании:
  - можно запретить `valid_to` в прошлом.

### Лимиты

- `max_uses_total`:
  - `>= 0` (0 может означать “нельзя использовать”, но лучше не создавать такой ваучер).
- `max_uses_per_user`:
  - `>= 0` (0 — не использовать).
- Если оба `null`:
  - ваучер ограничен только сроком действия и статусом → ок, но нужно осознанное решение.

### Персональные ваучеры

- Если `is_personal = true`:
  - `assigned_user_id` обязателен.
- Если `is_personal = false`:
  - `assigned_user_id` должен быть `null`.

---

## Правила валидации при `validate/redeem`

- Ваучер должен:
  - существовать,
  - иметь статус `active`,
  - находиться внутри `valid_from` / `valid_to` (если заданы).
- Лимиты:
  - `usage_total < max_uses_total` (если задан),
  - `usage_by_user < max_uses_per_user` (если задан).
- Scope:
  - `scope_module` совпадает с переданным,
  - `scope_action` совпадает (или лежит в допустимом наборе, если будет).
- Partner/object:
  - если указаны `allowed_partner_ids` → `partner_id` должен входить в список.
  - если указаны `allowed_object_ids` → `target_entity_id` должен входить в список.
- `order_amount >= min_order_amount` (если задано).
- Дополнительно:
  - для процента — итоговая `discount_amount` не должна превышать `max_discount_amount` (если задан).

---

## Правила идемпотентности

- При `redeem`:
  - если уже существует `VoucherRedemption` со статусом `success` с тем же `voucher_id` + `target_entity_id` + `user_id`, то:
    - повторный вызов возвращает **тот же** `redemption_id` и `discount_amount`,
    - не создаётся новая запись.
