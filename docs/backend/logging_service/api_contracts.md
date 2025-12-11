# Logging & Analytics Service — API Contracts

Хотя большая часть интеграций идёт через агенты/SDK (логгер, трассер, Prometheus-экспортер), полезно формализовать основные REST-контракты для ingestion и административного доступа.

Все эндпоинты **internal-only**, доступны только из приватной сети и защищены mTLS + service JWT.

Базовый префикс:
`/internal/logging-analytics/v1`

---

## 1. Логирование (Logs Ingestion)

### 1.1. Единичный лог

**POST** `/logs/write`

#### Request

```json
{
  "service": "guru_service",
  "level": "error",
  "timestamp": "2025-12-08T12:00:00Z",
  "correlation_id": "b9e7e3a0-1234-4c3a-9bd9-aaaabbbbcccc",
  "request_id": "req-123",
  "message": "Geo provider timeout",
  "context": {
    "endpoint": "/api/v1/guru/nearby",
    "radius_m": 3000,
    "city": "Da Nang",
    "timeout_ms": 2000
  },
  "user_id": "user-uuid-123",
  "tags": {
    "subsystem": "geo_search"
  }
}
```

#### Response

```json
{ "status": "ok" }
```

---

### 1.2. Пакет логов (Bulk)

**POST** `/logs/bulk`

#### Request

```json
{
  "entries": [
    {
      "service": "atlas_service",
      "level": "info",
      "timestamp": "2025-12-08T12:00:00Z",
      "message": "cache_miss",
      "correlation_id": "b9e7e3a0-1234-4c3a-9bd9-aaaabbbbcccc",
      "context": { "place_id": "place-123" }
    },
    {
      "service": "atlas_service",
      "level": "info",
      "timestamp": "2025-12-08T12:00:01Z",
      "message": "cache_fill",
      "correlation_id": "b9e7e3a0-1234-4c3a-9bd9-aaaabbbbcccc",
      "context": { "place_id": "place-123" }
    }
  ]
}
```

#### Response

```json
{ "status": "ok", "accepted": 2 }
```

---

## 2. Трассировки (Tracing) — fallback API

Обычно спаны отправляются напрямую в Jaeger agent. Но на случай fallback/проксирования можно иметь:

**POST** `/traces/span`

```json
{
  "trace_id": "abcd-1234",
  "span_id": "span-1",
  "parent_span_id": null,
  "service_name": "voucher_service",
  "operation_name": "POST /api/v1/vouchers/purchase",
  "start_time": "2025-12-08T12:00:00Z",
  "duration_ms": 120,
  "tags": {
    "http.method": "POST",
    "http.status_code": 200
  }
}
```

---

## 3. Аналитика (Analytics Events)

**POST** `/analytics/event`

#### Request

```json
{
  "event_name": "voucher_purchased",
  "anonymous_user_id": "anon-xyz-123",
  "occurred_at": "2025-12-08T12:01:30Z",
  "payload": {
    "voucher_id": "v-123",
    "partner_id": "rfp-987",
    "city": "Nha Trang",
    "price_points": 500,
    "channel": "Guru"
  }
}
```

#### Response

```json
{ "status": "queued" }
```

**POST** `/analytics/events/bulk` — аналогично, массив событий.

---

## 4. Admin / DevTools API (read side)

### 4.1. Поиск логов

**GET** `/admin/logs`

Параметры query:

- `service` (optional)
- `level` (optional)
- `correlation_id` (optional)
- `from`, `to` (optional, ISO datetime)
- `text` (optional, substring поиска в message/context)

#### Пример

`GET /admin/logs?service=rielt_service&level=error&from=2025-12-08T00:00:00Z`

---

### 4.2. Получение трассы

**GET** `/admin/traces/{trace_id}`

Проксирует/оборачивает запрос в Jaeger/Tempo.

---

### 4.3. Метрики (прокси к Prometheus / агрегатору)

**GET** `/admin/metrics/query?metric=guru_geo_search_latency_ms&from=...&to=...`

---

### 4.4. Поиск аналитики

**GET** `/admin/analytics/events`

Параметры:

- `event_name`
- `from`, `to`
- `limit`

---

## 5. Ограничения

- Все `/admin/*` эндпоинты доступны только:
  - из доверенных подсетей,
  - с особыми admin-токенами/ролями.
