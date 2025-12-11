# Logging & Analytics Service — Search & Filtering

Для эффективной работы DevOps, разработчиков и аналитиков важно уметь быстро находить нужные логи, трассы, метрики и события.

---

## 1. Поиск логов

Хранилище: ElasticSearch / ClickHouse / Loki (зависит от реализации).

Основные ключи фильтрации:

- `service` — конкретный микросервис (например, `voucher_service`).
- `level` — по уровню логов (например, `error` или `security`).
- `correlation_id` — для сквозной цепочки.
- `user_id` — для поиска истории действий конкретного пользователя (внутренний ID, не PII).
- `time range` — от/до (например, последние 15 минут).
- `message` / `context` — full-text поиск по тексту.

Примеры запросов:

- «Все ошибки в `blockchain_gateway_service` за последние 10 минут»
- «Всё по correlation_id = X из цепочки Rielt → Voucher → Connect»

---

## 2. Поиск трассировок (Jaeger/Tempo)

Основные фильтры:

- `trace_id` — напрямую, если известен.
- `service_name` — например, `guru_service`.
- `operation_name` — `GET /api/v1/guru/nearby`.
- `min_duration_ms` — искать только «долгие» запросы.
- `time range`.

Можно:

- найти все трассы, где `guru_geo_search` > 1 секунды;
- просмотреть граф зависимостей между сервисами.

---

## 3. Поиск метрик (Grafana/Prometheus)

Типичный сценарий:

- выбираем метрику, например `voucher_purchase_total`;
- применяем фильтры (label selectors):
  - `{service="voucher_service", city="Nha Trang"}`;
- строим граф за период.

То же для latency, error rate, нагрузочных метрик.

---

## 4. Поиск событий аналитики (ClickHouse/BI)

Фильтры:

- `event_name` — например, `quest_completed`.
- `date range`.
- срез по сегментам:
  - город,
  - страна,
  - тип пользователя (guest/VIP/PRO),
  - источник (Atlas/Guru/Blog и т.д.).

Используется для:

- анализа воронок,
- оценки активности модулей (Atlas, Guru, Quest, RF, Voucher),
- проверки гипотез продукта.
