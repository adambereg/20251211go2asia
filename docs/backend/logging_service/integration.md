# Logging & Analytics Service — Integration

Каждый микросервис Go2Asia должен быть интегрирован с Logging & Analytics Service по единым правилам.

---

## 1. Общие принципы интеграции

- Все сервисы используют:
  - единый логгер (JSON),
  - middleware для генерации/прокидывания `correlation_id`,
  - tracing-инструменты (OpenTelemetry/Jaeger),
  - Prometheus экспортер для метрик,
  - Analytics SDK для продуктовых событий (где нужно).

---

## 2. Примеры по сервисам

### 2.1. User Service

- Логи:
  - успешная регистрация,
  - неудачная регистрация (ошибка отправки email),
  - авторизация, сброс пароля (без PII).
- Метрики:
  - `user_signup_total`,
  - `user_signup_failures_total`,
  - `user_auth_latency_ms`.
- Аналитика:
  - `user_signup_completed`,
  - `user_onboarding_step_passed`.

---

### 2.2. Atlas Service

- Логи:
  - `place_not_found`,
  - ошибки обращения к внешним справочникам/OSM.
- Трассы:
  - `atlas_lookup` в рамках `trace_id` запроса Guru/Atlas.
- Метрики:
  - `atlas_place_lookup_latency_ms`,
  - `atlas_cache_hit_ratio`.

---

### 2.3. Guru Service

- Логи:
  - запросы «рядом со мной»,
  - ошибки геолокации.
- Трассы:
  - `guru_geo_search` → `atlas_lookup` → `pulse_events_nearby`.
- Метрики:
  - `guru_geo_search_latency_ms`,
  - `guru_geo_search_errors_total`.
- Аналитика:
  - `guru_nearby_opened`,
  - `guru_recommendation_clicked`.

---

### 2.4. Rielt Service

- Логи:
  - создание/просмотр объявлений,
  - запросы на контакт (через реакционную модель),
  - ошибки интеграций с внешними источниками.
- Метрики:
  - `rielt_listing_view_count`,
  - `rielt_contact_request_count`.
- Security-логи:
  - подозрительные активности (аномальные запросы, фрод-паттерны).

---

### 2.5. Voucher Service

- Логи:
  - `voucher_purchased`,
  - `voucher_redeemed`,
  - ошибки списания Points/G2A.
- Метрики:
  - `voucher_purchase_total`,
  - `voucher_redeem_total`,
  - доля успешных/неуспешных.
- Аналитика:
  - `voucher_purchased` (с контекстом города, партнёра, типа ваучера).

---

### 2.6. RF Service (Russian Friendly)

- Логи:
  - активности партнёров,
  - изменения статуса заведений,
  - отклики пользователей (через Reactions).
- Метрики:
  - `rf_partner_view_count`,
  - `rf_partner_click_through_rate`.

---

### 2.7. Quest Service

- Логи:
  - создание квестов PRO,
  - попытки прохождения,
  - завершение квеста.
- Метрики:
  - `quest_completed_total`,
  - `quest_purchase_total`.
- Аналитика:
  - `quest_completed` (ключевое продуктовое событие).

---

### 2.8. Connect / Points / NFT

- Логи:
  - начисления/списывания Points,
  - выдача оффчейн NFT,
  - пересчёт наград.
- Метрики:
  - объём выданных Points/NFT по дням/городу/типу активности.
- Аналитика:
  - `reward_earned` (по типу вознаграждения).

---

### 2.9. Blockchain Gateway Service

- Security-логи:
  - все операции с ончейн-токенами G2A,
  - транзакции NFT,
  - ошибки TonAPI/ноды.
- Трассы:
  - `connect_reward` → `blockchain_gateway_g2a_mint` / `transfer`.
- Метрики:
  - `blockchain_tx_latency_ms`,
  - `blockchain_tx_failures_total`.

---

## 3. Стандарты интеграции

- Все сервисы:
  - используют единый формат логов (описан в data_model.md),
  - обязательно прокидывают `correlation_id`,
  - не логируют PII,
  - экспортируют базовый набор метрик (RPS, latency, errors).
