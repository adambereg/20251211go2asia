# Logging & Analytics Service — Data Model

Logging & Analytics Service сам по себе не хранит «бизнес-данные» (типа пользователей, квестов или ваучеров), но оперирует несколькими типами записей в хранилищах логов, трассировок, метрик и аналитики.

Ниже — логические модели, на которые стоит опираться.

---

## 1. LogEntry (структурированный лог)

Каждый лог от микросервиса сериализуется в JSON и выглядит как объект `LogEntry`.

### Поля LogEntry

- `timestamp` (datetime) — момент возникновения события.
- `service` (string) — короткое имя сервиса:
  - `user_service`, `atlas_service`, `guru_service`,
  - `rielt_service`, `voucher_service`, `rf_service`,
  - `quest_service`, `connect_service`, `points_service`,
  - `nft_service`, `blockchain_gateway_service` и т.п.
- `level` (enum):
  - `debug`, `info`, `warn`, `error`, `security`.
- `correlation_id` (string, UUID/ULID) — сквозной ID цепочки запросов.
- `request_id` (string) — локальный ID запроса внутри конкретного сервиса.
- `message` (string) — краткое текстовое описание.
- `context` (json) — структурированный контекст:
  - `http_method`, `http_path`, `status_code`,
  - `db_query`, `latency_ms`,
  - `entity_id` и др.
- `user_id` (string, nullable) — если событие связано с конкретным пользователем.
- `error_stack` (string, nullable) — stacktrace исключения.
- `tags` (json, nullable) — произвольные пометки (например, `{"subsystem": "geo_search"}`).

### Хранилище LogEntry

Чаще всего:

- **ElasticSearch** или **ClickHouse**:
  - быстрый поиск по тексту и полям,
  - агрегации (количество ошибок по сервису и т.д.).

---

## 2. TraceSpan (распределённая трассировка, Jaeger/Tempo)

TraceSpan описывает отрезок выполнения работы в конкретном сервисе.

### Поля TraceSpan

- `trace_id` (string) — сквозной ID трассы.
- `span_id` (string) — ID конкретного span.
- `parent_span_id` (string, nullable) — родительский span.
- `service_name` (string) — имя сервиса.
- `operation_name` (string) — название операции:
  - `HTTP GET /api/v1/quests`,
  - `DB SELECT listings`,
  - `CALL blockchain_gateway /g2a/transfer`.
- `start_time` (datetime).
- `duration_ms` (int).
- `tags` (json):
  - `http.method`, `http.url`, `http.status_code`,
  - `db.system`, `db.statement` (может быть обрезан),
  - `error=true`, `error.message`.
- `logs` (array<json>, optional) — внутренняя временная шкала событий в span.

---

## 3. MetricPoint (Prometheus / time series DB)

Хотя Prometheus использует свой формат, логическая модель выглядит так:

- `metric_name` (string) — например:
  - `http_request_duration_seconds`,
  - `guru_geo_search_latency_ms`,
  - `voucher_purchase_count`,
  - `blockchain_gateway_tx_failures_total`.
- `labels` (map<string,string>):
  - `service="guru_service"`,
  - `endpoint="/api/v1/guru/nearby"`,
  - `status_code="200"`,
  - `city="Nha Trang"`.
- `value` (float/int) — значение.
- `timestamp` (datetime).

Технически это может храниться:

- в **Prometheus** (pull-модель),
- аггрегированные данные — в **VictoriaMetrics / Thanos / ClickHouse**.

---

## 4. AnalyticsEvent (событие аналитики)

Модель для продуктовой аналитики (воронки, поведение пользователей).

### Поля AnalyticsEvent

- `event_name` (string):
  - `quest_completed`,
  - `voucher_purchased`,
  - `rf_place_viewed`,
  - `city_page_opened`,
  - `blog_article_read`,
  - `rf_partner_profile_click`.
- `anonymous_user_id` (string):
  - стабильный ID, не содержащий PII,
  - чаще всего генерируется на фронтенде и передаётся в BFF.
- `payload` (json):
  - `{"quest_id": "...", "city": "Da Nang", "source": "Guru"}`,
  - `{"voucher_id": "...", "partner_id": "...", "price_points": 500}` и т.п.
- `occurred_at` (datetime).

### Хранилище

- **ClickHouse** (как вариант) — идеально подходит для больших объёмов аналитических событий с агрегациями по времени и сегментам.

---

## 5. Дополнительные модели (логические)

### 5.1. CorrelationContext

Необязательная концепция, но полезная:

- `correlation_id`
- `root_service`
- `entry_point` (например, `web_pwa`, `mobile_app`)
- `started_at`, `finished_at`
- `status` (success/fail)

Может быть виртуальной, собираемой из спанов и логов.

### 5.2. ServiceHealthCheckRecord

Хранение слепков состояния:

- `service_name`
- `status` (up/down/degraded)
- `checked_at`
- `latency_ms`

Обычно реализуется через метрики / health-endpoints, но может логироваться в отдельный стрим.
