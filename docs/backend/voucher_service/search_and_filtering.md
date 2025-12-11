# Voucher Service — Search & Filtering

## Админский поиск ваучеров

Endpoint: `/api/voucher/v1/vouchers`

Фильтры:

- `code` — частичное совпадение.
- `status` — `draft`, `active`, `inactive`, `expired`, `archived`.
- `scope_module` — `rf`, `rielt`, `quest`, `atlas`, `other`.
- `type` — `percent_discount`, `fixed_discount`, …
- `is_personal` — `true|false`.
- `assigned_user_id` — для поиска персональных ваучеров.
- `valid_from <= now <= valid_to` — “текущие” ваучеры.
- `promo_campaign` — через `metadata` (опционально).

Пагинация:

- `page`, `page_size`.

Сортировки:

- по `created_at` (новые/старые),
- по `valid_to` (скорее всего истекающие).

---

## Поиск погашений (admin)

Endpoint: `/api/voucher/v1/admin/redemptions`

Фильтры:

- `voucher_id`,
- `user_id`,
- `scope_module`,
- `status`,
- `created_from`, `created_to`.

---

## “Мои ваучеры”

Endpoint: `/api/voucher/v1/my/vouchers`

Фильтры:

- `scope_module` (опционально),
- `only_active` — только ещё действующие ваучеры (по дате и статусу).

Сортировки:

- по `valid_to` (сначала истекающие),
- по `created_at` (новые сверху).
