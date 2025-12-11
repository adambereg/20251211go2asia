# Rielt Service — Интеграции

## User Service

- Автор объявления (`author_user_id`) и владелец объекта (`owner_user_id`) — ссылки на User Service.
- Заявки (`tenant_user_id`) — арендаторы из User Service.
- Авторизация:
  - по JWT access-token от User Service.

**Сценарии:**

- В кабинете арендодателя:
  - фронт получает `my/listings` → затем при необходимости подтягивает профили авторов/арендаторов через User Service.
- В списках заявок:
  - только минимальные данные: `display_name`, контакт — через User Service или через фронт.

---

## Media Service

- Все фото/видео объявлений и объектов хранятся в Media Service.
- Rielt Service хранит только `media_id` и порядок.

**Процесс:**

1. Фронтенд загружает фото → Media Service → получает `media_id`.
2. В `POST /listings` передаются `photos: [{ media_id, order }, ...]`.
3. При выводе карточки объявления фронт дергает Media Service, чтобы получить URL.

---

## Content Service

- Отзывы и обсуждения по объектам/объявлениям:
  - `module = "rielt"`,
  - `context_entity_type = "housing_offer"` или `"listing"`,
  - `context_entity_id = "rielt_listing:{id}"`.

**Примеры:**

- Страница объявления:
  - `GET /api/content/v1/feed/context?module=rielt&context_entity_id=rielt_listing:{listing_id}` — отзывы/комментарии.
- Пользовательский пост в Space, привязанный к конкретному жилью.

---

## RF Service (Russian Friendly)

- Rielt Service может отмечать объявления/объекты как партнёрские:
  - `is_partner_object = true`.
- RF Service:
  - хранит данные о партнёре (юридическое лицо, тарифы и т.п.),
  - может через internal API Rielt Service получить список объявлений партнёра:
    - `GET /api/rielt/v1/internal/partner/{partner_id}/listings`.

---

## Atlas / Guru

- Rielt Service использует `country_id`, `city_id` совместимые с Atlas.
- На карте:
  - Atlas может показывать объекты Rielt как слой с пинами, дергая API Rielt:
    - `/catalog/map?city_id=...`.
- Guru:
  - PRO-гуру могут быть указаны в описании объекта/объявления как “локальный консультант” (это, скорее, UI/контентный уровень, не прямое API-соединение).

---

## Notification Service

События:

- `tenant_request.created` — уведомить автора объявления о новой заявке.
- `tenant_request.status_changed` — уведомить арендатора об изменении статуса.

Способ:

- либо Rielt Service делает прямые вызовы:
  - `POST /api/notifications/v1/events`,
- либо публикует события в Event Bus (`rielt.tenant_request_created` и т.п.), а Notification Service подписывается.

---

## Search Service (будущее)

- Для улучшенного поиска по объявлениям:
  - Rielt Service генерирует события:
    - `rielt.listing_created`,
    - `rielt.listing_updated`,
    - `rielt.listing_archived`.
- Search Service индексирует:
  - город, район, цену, параметры, текст описания, теги (если появятся).
- Фронтенд может ходить напрямую в Search Service или через Rielt Service (проксировать запросы).

