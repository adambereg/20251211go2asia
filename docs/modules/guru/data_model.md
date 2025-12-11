# Guru Asia — Data Model

> ВНИМАНИЕ: это логическая модель данных фронтенд‑модуля Guru Asia.  
> Физическое хранение сущностей происходит в профильных микросервисах (Atlas, Pulse, RF, Quest, Voucher, Rielt и др.), а Guru только агрегирует и запрашивает их через API/SDK.

## 1. Core‑контекст сессии

### 1.1. GuruSessionContext

Описывает текущий контекст сессии пользователя на клиенте.

- **session_id**: string — UUID сессии Guru.
- **user_id**: string \| null — идентификатор пользователя (если авторизован).
- **role**: enum(`guest`, `spacer`, `vip`, `pro`) — статус в Space Asia.
- **location**: object
  - **lat**: number
  - **lng**: number
  - **accuracy**: number \| null — точность геолокации в метрах.
- **radius_m**: number — текущий радиус поиска (по умолчанию 1000 м).
- **city_id**: string \| null — текущий город из Atlas.
- **time_window**: object
  - **from**: datetime — нижняя граница окна (обычно «сейчас»).
  - **to**: datetime — верхняя граница окна (например, +24 часа).
- **filters**: GuruFilters — активные фильтры.
- **view_mode**: enum(`map+list`, `list`, `map`) — текущий режим UI.
- **sort_by**: enum(`distance`, `time`, `rating`, `price`) — сортировка.
- **ai_hint_state**: enum(`hidden`, `suggested`, `expanded`) — состояние AI‑подсказок.
- **created_at**: datetime
- **updated_at**: datetime

### 1.2. GuruFilters

Набор активных фильтров.

- **types**: array\<enum\> — типы объектов/карточек:
  - `place` — место из Atlas.
  - `event` — событие из Pulse.
  - `rf_partner` — партнер Russian Friendly.
  - `quest` — квест из Quest Asia.
  - `accommodation` — жильё (Rielt/MKПлейс).
- **categories**: string[] — доменные категории (еда, бар, экскурсии, коворкинги и т.п.).
- **price_min** / **price_max**: number \| null — диапазон цен.
- **open_now**: boolean — фильтр «открыто сейчас».
- **only_verified**: boolean — только проверенные редакцией/PRO.
- **only_rf_friendly**: boolean — только Russian Friendly места.
- **with_vouchers**: boolean — есть доступные ваучеры.
- **duration_min** / **duration_max**: number \| null — длительность активности (минуты).
- **for_whom**: string[] — теги аудитории (семья, digital nomad, пара, дети и т.д.).
- **mood**: string[] — теги настроения (тихо, тусовка, романтика и т.п.).

## 2. Карточка объекта в Guru Feed

### 2.1. GuruFeedItem

Это унифицированная «плоская» карточка, в которую приводятся данные из разных микросервисов.

- **id**: string — внутренний ID карточки в Guru (например, `<source_type>:<source_id>`).
- **source_type**: enum(`atlas_place`, `atlas_city`, `pulse_event`, `rf_partner`, `quest`, `accommodation`).
- **source_id**: string — ID объекта в исходном сервисе.
- **display_type**: enum(`place`, `event`, `activity`, `partner`, `guide`) — тип отображения.

Основные поля для UI:

- **title**: string — название.
- **subtitle**: string — подзаголовок/краткое описание.
- **hero_image_url**: string \| null — обложка.
- **distance_m**: number \| null — расстояние от текущего положения.
- **duration_min**: number \| null — время на посещение/активность.
- **rating**: number \| null — средний рейтинг (из Reactions/Reviews).
- **reviews_count**: number \| null.
- **price_from**: number \| null.
- **price_currency**: string \| null.
- **time_info**: object \| null
  - **start_time**: datetime \| null — начало (для событий).
  - **end_time**: datetime \| null — окончание.
  - **is_all_day**: boolean \| null.
  - **is_open_now**: boolean \| null.
- **location**: object
  - **lat**: number
  - **lng**: number
  - **formatted_address**: string \| null
- **tags**: string[] — теги для быстрой фильтрации (еда, кофе, бар, лекция, ярмарка и т.п.).
- **badges**: string[] — значки (`"Партнёр RF"`, `"Проверено редакцией"`, `"Событие сегодня"`).
- **rf_partner_id**: string \| null — id партнёра для RF/Voucher интеграции.
- **has_vouchers**: boolean — есть ли доступные ваучеры.
- **quest_id**: string \| null — квест, с которым связан объект.
- **is_editorial_pick**: boolean — выделено редакцией.

Метаданные:

- **source_payload**: json — облегчённая копия важных полей оригинальной сущности (для отображения без дополнительного запроса).
- **experiments**: json — флаги A/B‑тестов и AI‑рекомендаций.
- **created_at**: datetime
- **updated_at**: datetime

## 3. AI‑подсказки и сценарии

### 3.1. GuruAiSuggestion

Описывает рекомендацию от AI‑агента Guru.

- **id**: string
- **session_id**: string
- **user_id**: string \| null
- **title**: string — заголовок подсказки (например, «Вечер в радиусе 1 км»).
- **description**: string — краткое пояснение.
- **items**: GuruAiSuggestionItem[] — список предложенных карточек.
- **reasoning_short**: string — краткое объяснение (показывается пользователю).
- **reasoning_internal**: json — внутренние критерии (для дебага).
- **created_at**: datetime

### 3.2. GuruAiSuggestionItem

- **feed_item_id**: string
- **rank**: number
- **note**: string \| null — дополнительный комментарий («начните с этого места», «сюда лучше дойти до заката»).

## 4. Локальные состояния клиента

### 4.1. GuruUiState

Состояние фронтенда (Redux/Zustand).

- **active_tab**: enum(`nearby`, `plan`, `history`)
- **expanded_item_id**: string \| null
- **map_zoom**: number
- **map_center**: { lat, lng }
- **show_rf_only**: boolean
- **show_debug_overlays**: boolean (dev‑режим)

## 5. Интеграционные типы

Guru не владеет схемами Atlas/Pulse/RF/Quest, но использует их DTO через SDK. Для справки фиксируем основные поля, которые критичны для агрегации (на уровне контрактов, а не хранения).

### 5.1. AtlasPlaceDTO (read‑only)

- **id**
- **title**
- **place_type**
- **city_id**
- **location {lat,lng}**
- **rating, reviews_count**
- **rf_partner_id?**
- **has_vouchers?**
- **tags[]**

### 5.2. PulseEventDTO (read‑only)

- **id**
- **title**
- **city_id**
- **place_id?**
- **start_time, end_time**
- **price_from, currency**
- **category**
- **tags[]**
- **rf_partner_id?**

... и аналогично для RFPartnerDTO, QuestDTO, AccommodationDTO — см. соответствующие модули.

