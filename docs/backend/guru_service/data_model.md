# Guru Service — Модель данных

Guru почти не хранит “контент” (это задача Atlas/Pulse/Rielt/RF/Quest/User/Space).  
Основной фокус — **агрегация, нормализация и пользовательские настройки**.

## 1. GuruEntity (нормализованная сущность в выдаче)

Чаще формируется “на лету”, но важен как контракт:

- `id` (string) — глобальный идентификатор вида `{source}:{source_id}`, например:
  - `atlas_place:long-beach`,
  - `pulse_event:phu-quoc-sunset-tour-2025-01-01`,
  - `rielt_offer:apartment-123`,
  - `guru_pro:user-uuid`.
- `source` (enum):
  - `atlas_place`
  - `pulse_event`
  - `rielt_offer`
  - `rf_venue`
  - `quest`
  - `guru_pro` — **локальный PRO-спейсер, видимый в Guru**.
- `entity_type` (enum):
  - `place`,
  - `event`,
  - `housing`,
  - `partner_venue`,
  - `quest`,
  - `guru` — **человек-гуру (PRO)**.
- `title` (string)  
  - для `guru`: отображаемое имя PRO (ник/имя).
- `subtitle` (string, nullable)  
  - для `guru`: короткое позиционирование (“Гид по Фукуоку”, “Эксперт по вечернему Нячангу” и т.п.).
- `description_short` (string, nullable) — мини-описание.
- `lat`, `lng` (float) — координаты:
  - для `guru` это не обязательно точное местоположение, а “база” в городе (можно центр района).
- `distance_m` (int) — расстояние от точки запроса.
- `city_id`, `country_id`
- `is_rf` (bool) — объект отмечен как Russian Friendly (для партнёров/событий).
- `is_open_now` (bool, nullable):
  - для мест/заведений,
  - для `guru` можно использовать как “доступен сейчас” (если в будущем будет статус онлайн-/оффлайн-доступности).
- `tags` (array<string>):
  - для `guru`: специализации (`guide`, `kids`, `nightlife`, `food`, `photo`, `relocation` и т.п.).
- `image_url` (string, nullable):
  - для `guru` — аватар/фото из Space/User.
- `rating` (float, nullable):
  - агрегированный рейтинг (если есть система отзывов).
- `price_level` (enum, nullable):
  - для `guru` можно использовать оценочный диапазон цен: `low`, `medium`, `high`.

- `payload` (object) — дополнительные поля в зависимости от `entity_type`:
  - `place`: `place_kind`, расписание и т.п.;
  - `event`: `starts_at`, `min_price`, `currency`;
  - `housing`: цена, тип жилья;
  - `quest`: уровень сложности, награды;
  - **`guru`:**
    - `pro_user_id` — uuid пользователя,
    - `languages` — массив языков общения,
    - `specialties` — массив специализаций,
    - `hourly_rate_from` — минимальный ориентировочный тариф,
    - `currency` — валюта тарифов,
    - `contact_via` — способ связи (`space_chat`, `tg`, и т.п. — лучше ссылкой в Space/внутренний чат).

## 2. GuruUserPreferences

Настройки пользователя для персонального фильтра и выдачи:

- `user_id` (uuid, pk)
- `language` (string) — предпочитаемый язык.
- `home_city_id` (string, nullable)
- `travel_profile` (enum, nullable):
  - `solo`, `couple`, `family`, `digital_nomad`, `party_lover`, `explorer`, …
- `budget_level` (enum, nullable): `low`, `medium`, `high`.
- `interests` (array<string>): `beaches`, `food`, `coffee`, `nightlife`, `kids`, `culture`, `sport`, …
- `excluded_categories` (array<string>)
- (Фаза 2) `prefer_guru_help` (bool, nullable) — склонность обращаться к живому гиду/PRO.
- `last_location` (`lat`, `lng`, `updated_at`)

## 3. GuruProPresence (опционально — отражение PRO-гуру в Guru)

Для ускорения выборок “гуру рядом” может быть денормализованная таблица:

- `pro_user_id` (uuid, pk)
- `city_id`
- `country_id`
- `base_lat`, `base_lng` — координаты базовой точки (район, любимое место встречи и т.п.).
- `visible_in_guru` (bool)
- `status` (enum):
  - `active`,
  - `temporarily_unavailable`,
  - `hidden`.
- `specialties` (array<string>)
- `languages` (array<string>)
- `hourly_rate_from` (numeric, nullable)
- `currency` (string, nullable)
- `updated_at`

Данные синхронизируются из User/Space/Connect, где PRO задаёт:

- “Я PRO” (роль),
- “Показывать меня в Guru” (флажок),
- базовый город и специализации.

## 4. GuruSearchHistory (Фаза 2)

(без изменений — фиксирует запросы `/nearby`)

## 5. GuruSavedPlaces / SavedEntities (Фаза 2–3)

(без изменений, но `entity_id` может быть и `guru_pro:...`)

## Индексы

- `guru_user_preferences.user_id`
- `guru_pro_presence.city_id, visible_in_guru` — быстрый выбор PRO-гуру по городу.
- `guru_pro_presence.base_lat/base_lng` — для гео-запросов (через GiST/геоиндекс).
