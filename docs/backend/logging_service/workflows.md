# Logging & Analytics Service — Workflows

Здесь описаны ключевые сквозные сценарии использования Logging & Analytics Service в экосистеме Go2Asia.

---

## 1. Сценарий: прохождение квеста и награда

**Цепочка:**
User → Quest Service → Connect → Points → NFT → (опционально) Blockchain Gateway

1. Пользователь завершает квест.
2. Quest Service:
   - пишет лог `quest_completed`,
   - создаёт span `quest_completed`,
   - отправляет аналитическое событие `quest_completed`.
3. Connect:
   - обрабатывает событие,
   - логирует `reward_calculated`,
   - создаёт span `connect_reward_pipeline`.
4. Points Service:
   - начисляет Points,
   - пишет лог `points_credited`,
   - обновляет метрики.
5. NFT Service:
   - при необходимости выдаёт NFT-бейдж,
   - логирует `nft_awarded`.
6. (Фаза ончейн) Blockchain Gateway:
   - логирует транзакции G2A/NFT (security-логи),
   - создаёт отдельные трассы.
7. В аналитике:
   - событие `quest_completed` попадает в ClickHouse,
   - строится метрика активности по квестам.

Dev/DevOps может:

- по `correlation_id` найти всю цепочку в логах,
- открыть трассу в Jaeger,
- посмотреть метрики Connect/Points/NFT.

---

## 2. Сценарий: покупка премиум-ваучера

**Цепочка:**
User → BFF → Voucher Service → Connect → Points → NFT → Blockchain Gateway

1. Пользователь покупает премиум-ваучер.
2. BFF:
   - генерирует `correlation_id`,
   - логирует `voucher_purchase_started`.
3. Voucher Service:
   - обрабатывает оплату Points/NFT,
   - логирует `voucher_purchase_success` / `failure`,
   - создаёт span `voucher_purchase`.
4. Connect:
   - начисляет PRO и партнёру соответствующие Points/G2A (по правилам tokenomics),
   - логирует `reward_dispatched`.
5. Blockchain Gateway (если задействован G2A/NFT ончейн):
   - логирует транзакции,
   - обновляет security-логи.

В аналитике:

- событие `voucher_purchased` с контекстом:
  - `city`, `partner_id`, `voucher_type`, `price_points`.

---

## 3. Сценарий: деградация геопоиска в Guru

1. В какой-то момент внешний геосервис начинает отвечать медленно.
2. Guru Service:
   - для каждого запроса пишет метрики `guru_geo_search_latency_ms`,
   - в логах фиксируются `geo_provider_timeout`.
3. Prometheus:
   - замечает рост `p95(guru_geo_search_latency_ms)`,
   - Alertmanager отправляет алерт DevOps:
     - «Latency Guru Geo Search > 2s в течение 5 минут».
4. DevOps:
   - открывает Grafana:
     - видит рост latency,
   - открывает Jaeger:
     - смотрит трассы `guru_geo_search`,
     - видит, что узкое место — внешний geoprovider.
5. При необходимости:
   - переводим сервис в деградированный режим (например, fallback к кэшу).

---

## 4. Сценарий: инцидент с Blockchain Gateway

1. Из-за проблем TonAPI часть транзакций G2A начинает падать.
2. Blockchain Gateway:
   - пишет error- и security-логи,
   - увеличивается метрика `blockchain_tx_failures_total`.
3. Alertmanager:
   - триггерит алерт:
     - «Blockchain tx failure rate > X%».
4. DevOps:
   - смотрит в логи c фильтром `service=blockchain_gateway_service AND level=error`,
   - открывает трассы для конкретных `trace_id`,
   - видит, что все ошибки приходят от TonAPI.

Работа идёт через:

- логи → трассы → метрики → дашборды.

---

## 5. Сценарий: продуктовый анализ активности RF-партнёров

1. RF Service отправляет события `rf_partner_viewed`, `rf_partner_clicked`, `voucher_purchased`.
2. В ClickHouse:
   - аналитик строит:
     - сколько уникальных пользователей взаимодействовало с партнёрами,
     - какие города/партнёры наиболее активны,
     - какие ваучеры лучше конвертируются.
3. Решения продукта:
   - какие партнёрские программы усиливать,
   - где запускать дополнительные квесты/кампании.
