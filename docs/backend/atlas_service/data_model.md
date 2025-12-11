# Atlas Service — Data Model

## Общий принцип

Atlas — это иерархическая модель:

`Country → City → (District/Area) → Place`

При этом **Place** — главная сущность, к которой привязываются другие сервисы (Pulse, RF, Rielt, Quest и др.). :contentReference[oaicite:4]{index=4}  

## Сущности

### Country

Минимальный справочник стран.

Основные поля:

- `id` — UUID / int;
- `iso_code` — строка, например `"VN"`, `"TH"`;
- `name` — человекочитаемое название (локализуемое);
- `slug` — URL-идентификатор;
- `center_lat`, `center_lng` — координаты «центра» страны (для базовой карты);
- `status` — `active` / `hidden`.

### City

Город внутри страны.

Основные поля:

- `id`;
- `country_id` — FK → Country;
- `name`;
- `slug`;
- `type` — `city`, `island`, `region` (для особых случаев: Фукуок как остров и т.п.);
- `center_lat`, `center_lng`;
- `zoom_level_default` — рекомендованный zoom для карт;
- `population` (опционально, если нужно для UI/фактов);
- `status` — `active` / `hidden`.

### District / Area (опционально)

Используется там, где детализированная привязка по районам важна (например, районы Бангкока).

Основные поля:

- `id`;
- `city_id` — FK → City;
- `name`;
- `slug`;
- `polygon` (опционально, геометрия района);
- `status`.

### Place

Ключевая сущность Atlas — конкретное место.

Основные поля:

- `id`;
- `city_id` — FK → City;
- `district_id` — FK → District (nullable);
- `type` — `sight`, `beach`, `district`, `park`, `cafe`, `restaurant`, `shopping_mall`, `co_working`, `accommodation`, `transport_hub`, `rf_partner_placeholder` и т.п.;
- `name`;
- `slug`;
- `description_short`;
- `description_full`;
- `latitude`, `longitude`;
- `address_line`;
- `opening_hours` (структурированно или текстом);
- `tags` — список тегов (см. Tag);
- `photos` — ссылки на медиа (через отдельную таблицу);
- `rating_avg` — агрегированный рейтинг (из Reactions/RF);
- `rating_count`;
- `rf_badge` — boolean (place является RF-партнёром);
- `rf_place_id` — FK в RF Service (nullable);
- `metadata` — JSON (доп. поля для расширения).

### PlaceCategory

Справочник типов/категорий мест (для UI-фильтров).

- `id`;
- `code` — `beach`, `cafe`, `temple`, `market` и т.д.;
- `name`;
- `icon` — идентификатор иконки для фронтенда;
- `sort_order`.

### Tag

Семантические теги для мест.

- `id`;
- `code` — `wifi`, `vegan`, `family_friendly`, `nightlife`, `russian_speaking_staff` и т.п.;
- `name`;
- `group` — логическая группа (`features`, `vibe`, `price_segment`, `diet` и т.д.).

### PlaceTag (link table)

Связь `Place` ↔ `Tag`.

- `place_id`;
- `tag_id`.

### PlaceMedia

Фотографии/видео для места.

- `id`;
- `place_id`;
- `media_url`;
- `type` — `image`, `video`;
- `position` — сортировка;
- `caption`.

### Audit / Moderation

Для поддержки редакционной и UGC-модели:

- `created_at`, `updated_at`;
- `created_by_user_id` — кто создал (User Service);
- `updated_by_user_id`;
- `status` — `draft`, `pending_review`, `published`, `archived`;
- `source` — `editorial`, `ugc_pro`, `ugc_user`, `import`.

## Связи с другими сервисами (логически)

- `place.rf_place_id` → RF Place (подробности партнёрского заведения); :contentReference[oaicite:5]{index=5}  
- `Pulse.event.place_id` → Atlas Place;
- `Rielt.listing.city_id` / `district_id` / `place_id` → Atlas;
- `Quest.step.place_id` → Atlas;
- `Media.article.place_id` / `city_id` → Atlas.

Atlas — **владелец** сущностей Country/City/District/Place/Tag/Category. Остальные сервисы хранят только FK.
