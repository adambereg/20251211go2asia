# Logging & Analytics Service — Architecture

Logging & Analytics Service — это не один бинарник, а набор связанных компонентов, образующих слой наблюдаемости.

---

## 1. Общая схема

Уровни:

1. **Producers (микросервисы)**:
   - Atlas, Pulse, Guru, Rielt, Voucher, RF, Quest, Referral, Connect, Points, NFT, Blockchain Gateway, User и т.д.
   - Пишут:
     - JSON-логи,
     - метрики,
     - спаны,
     - аналитические события.

2. **Collectors / Agents**:
   - лог-агенты (например, Filebeat/Vector/Fluent Bit),
   - Jaeger agents,
   - Prometheus scrapers.

3. **Storage & Processing**:
   - хранилище логов (ElasticSearch / ClickHouse / Loki),
   - хранилище метрик (Prometheus + remote storage),
   - хранилище трассировок (Jaeger/Tempo),
   - аналитическое хранилище (ClickHouse / BigQuery-аналоги).

4. **Dashboards & Tools**:
   - Grafana (метрики + бизнес-дашборды),
   - Kibana / ClickHouse UI (логи),
   - Jaeger UI (трассы).

---

## 2. Logging поток

1. Микросервис пишет лог в stdout/stderr в формате JSON или шлёт на HTTP `/logs/write`.
2. Log Collector (агент) собирает логи:
   - добавляет поля (env, pod_name, region),
   - при необходимости очищает PII.
3. Логи отправляются в хранилище:
   - ElasticSearch / ClickHouse.

---

## 3. Tracing поток

1. Микросервис использует библиотеки tracing (OpenTelemetry/Jaeger).
2. Для каждого входящего запроса создаётся `trace_id`.
3. При вызове другого сервиса `trace_id` прокидывается в заголовках.
4. Spans отправляются в Jaeger Agent рядом с приложением.
5. Agent отправляет данные в Jaeger Collector → Storage → UI.

---

## 4. Metrics поток

1. Каждый сервис предоставляет `/metrics` endpoint (Prometheus формат).
2. Prometheus периодически (scrape) забирает метрики.
3. Alertmanager анализирует правила алертинга.
4. Grafana визуализирует:
   - системные (CPU, memory, RPS, latency),
   - бизнес (quests, vouchers, tokens).

---

## 5. Analytics Events поток

1. Фронтенд (PWA) отправляет события в BFF:
   - `quest_completed`,
   - `voucher_purchased`,
   - `rf_place_viewed` и др.
2. BFF добавляет:
   - env, версию клиента, регион и др.
3. События отправляются в Analytics Ingestion.
4. Хранятся в ClickHouse.
5. Используются в BI-дашбордах (воронки, retention, cohort analysis).

---

## 6. Связь с микросервисами Go2Asia

- Все микросервисы используют общий **logging/tracing/metrics SDK**, описанный в style guide.
- Correlation-id генерируется на уровне:
  - либо API Gateway / BFF,
  - либо первого сервисного входа (User Service).

---

## 7. Масштабирование и отказоустойчивость

- Лог-хранилище скейлится горизонтально.
- Prometheus может быть федеративным.
- Jaeger/Tempo — с шардированием и репликацией.
- Потоки ingestion должны быть устойчивыми к всплескам нагрузки:
  - использование очередей (Kafka/RabbitMQ/SQS) при необходимости.
