# NFT Service — Search & Filtering

Поиск и фильтрация NFT нужна:

- для админ-панели и модерации,
- для аналитики,
- для профилей PRO (например, выбор лучших авторов квестов),
- для игровых/геймификационных сценариев.

---

## 1. Поиск NFTInstance

Endpoint: `GET /internal/search`

Фильтры:

- `user_id` — найти все бейджи конкретного пользователя;
- `type_code` — по конкретному типу достижения (`explorer`, `rf_reviewer`, `top_referrer`);
- `min_level`, `max_level` — отбор по уровню;
- `status` — `active`, `revoked`, `burned_onchain`;
- `onchain_status` — `not_minted`, `pending`, `minted`, `failed`;
- `date_from`, `date_to` — по `created_at` или `updated_at`;
- `source_service` — откуда пришла награда (`connect`, `admin_panel`, др.);
- `rarity` — по `rarity` уровня (через join с NFTLevelRule).

---

## 2. Поиск NFTType и уровней

Для административного интерфейса:

- `GET /internal/types`:
  - фильтрация по `category`, `is_onchain_capable`.
- `GET /internal/types/{id}/levels`:
  - просмотр всех уровней типа.

---

## 3. Типовые сценарии фильтрации

- «Найти всех пользователей с уровнем Explorer ≥ 3 в конкретной стране»:
  - фильтр по `type_code = explorer`,
  - `current_level >= 3`,
  - join с геоданными (через внешнюю аналитическую систему/реплику).
- «Показать все редкие бейджи, которые есть хотя бы у одного PRO»:
  - фильтр по `rarity in (rare, epic, legendary)` и `user_id` из множества PRO.
- «Модерация»:
  - поиск NFT, выданных вручную (`source_service = admin_panel`),
  - выборочная проверка.
