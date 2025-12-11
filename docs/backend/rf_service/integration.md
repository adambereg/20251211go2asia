# RF Service — Интеграции

## User Service

- Все пользователи, фигурирующие в RF Service (`created_by_user_id`, `onboarding_pro_user_id`, `curator_pro_user_id`, владельцы партнёрских кабинетов), приходят из User Service.
- RF Service доверяет:
  - `sub` — идентификатор пользователя,
  - `roles` — `user`, `pro`, `partner_owner`, `partner_manager`, `admin`.

---

## Guru Service

- PRO-спейсеры, которые проводят онбординг и курируют партнёров, живут в Guru/User.
- RF Service хранит только ссылки:
  - `onboarding_pro_user_id`,
  - `curator_pro_user_id`.
- Guru может:
  - показывать PRO список “его” партнёров (`GET /api/rf/v1/my/partners`),
  - использовать RF API, чтобы подтянуть информацию о партнёрах для “людей рядом и их бизнесов”.

---

## Atlas Service

- Каждая `PartnerLocation` может быть связана с местом Atlas:
  - `atlas_place_id`.
- Atlas:
  - может отображать пин “Russian Friendly партнёр” на карте;
  - может выделять RF-партнёров в списке мест по городу.
- RF:
  - использует `atlas_place_id` для поиска партнёров поблизости,
  - отдаёт `atlas_place_id` во фронт, чтобы переходить к карточке места.

---

## Voucher Service

- RF Service не создаёт ваучеры, но хранит ссылки:
  - `default_voucher_ids` — ID обычных ваучеров в Voucher Service;
  - `default_premium_voucher_ids` — ID Премиум-ваучеров.
- При отображении карточки партнёра:
  - фронтенд получает из RF Service id ваучеров,
  - при необходимости дополнительно запрашивает детали ваучеров в Voucher Service.
- При действиях пользователя:
  - RF-UI дергает REST Voucher Service (`/validate`, `/redeem`) напрямую или через BFF.

---

## Points Service

- RF Service хранит конфигурацию кэшбэков в Points:
  - `default_cashback_points_percent`;
  - возможные дополнительные правила в `economics`.
- Points Service использует RF-данные для расчёта:
  - сколько Points начислить за визит/чек у партнёра;
  - какие ваучеры доступны для покупки за Points (через `default_voucher_ids`).

---

## Token / Blockchain Gateway / NFT Service

- RF Service **не держит балансы G2A/NFT**, но:
  - хранит экономические параметры Премиум-ваучеров
    (`premium_business_reward_g2a`, `premium_pro_reward_g2a`, `requires_nft_level` и т.п.);
  - предоставляет эти данные Token/NFT сервисам для расчёта вознаграждений.

Сценарий:

1. VIP-спейсер покупает Премиум-ваучер партнёра:
   - BFF/Token Service запрашивает из RF Service:
     - `economics` партнёра,
     - связанный `premium_voucher_id`.
2. Token Service:
   - списывает G2A с пользователя,
   - начисляет G2A бизнес-партнёру и PRO согласно economics.
3. Voucher Service выпускает/привязывает Премиум-ваучер пользователю.
4. NFT Service, если нужно, минтит/апгрейдит NFT.

RF Service при этом обеспечивает **консистентный источник конфигурации**.

---

## Quest Service

- Квесты могут быть привязаны к RF-партнёрам:
  - `quest.partner_id`.
- Quest Service может:
  - запрашивать партнёрские данные для отображения,
  - использовать `default_voucher_ids` и `default_premium_voucher_ids` для наград.

---

## Rielt Service

- В будущем Rielt может использовать RF-партнёров как владельцев/управляющих объектами.
- RF Service отдаёт базовую информацию о партнёре для карточки объекта.

---

## Space / Content / Reactions

- Space / Content:
  - хранят UGC-обзоры и отчёты о заведениях;
  - привязывают посты к `business_partner_id` и/или `atlas_place_id`.
- Reactions:
  - считает рейтинги, лайки, отзывы.
- RF Service:
  - использует агрегированные данные (через Content/Reaction) для заполнения `PartnerStats`.

---
