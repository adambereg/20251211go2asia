# NFT Service — Architecture

NFT Service — это специализированный доменный сервис с внутренним rule-engine для прогресса и уровней.

---

## 1. Слои сервиса

### API Layer

- Обрабатывает входящие HTTP-запросы:
  - `/internal/reward`,
  - `/internal/mint_simple`,
  - `/internal/nft/*`,
  - `/internal/types/*`, `/internal/levels/*`.
- Выполняет:
  - аутентификацию сервисов,
  - авторизацию по ролям клиентских сервисов,
  - базовую валидацию входных данных.

### Progress & Level Engine

- Ядро бизнес-логики:
  - обновляет NFTProgress по `increment`,
  - определяет, достигнут ли новый уровень по NFTLevelRule,
  - создаёт или апгрейдит NFTInstance,
  - формирует `metadata` и корректирует её по schema.

### Mint Orchestrator

- Решает, когда и какие NFT нужно минтить в блокчейне TON:
  - на основе:
    - `NFTType.default_onchain_policy`,
    - `NFTLevelRule.auto_mint_onchain`,
    - явных запросов пользователя (через BFF).
- Добавляет задачи в `NFTMintQueue`,
- управляет воркерами, которые:
  - вызывают Blockchain Gateway,
  - отслеживают статусы и повторные попытки.

### Storage Layer

- Работает с таблицами:
  - `nft_types`,
  - `nft_level_rules`,
  - `nft_instances`,
  - `nft_progress`,
  - `nft_mint_queue`,
  - `nft_audit_log`.

---

## 2. Типичный поток: награда за квест

1. Пользователь проходит квест.
2. Quest Service публикует событие `quest.completed`.
3. Connect получает событие, применяет правила:
   - `+100 Points` (через Points Service),
   - `+1 к счётчику quest_completed_count` для типа `explorer` (через NFT Service).
4. Connect вызывает:
   - `POST /internal/reward` NFT Service.
5. NFT Service:
   - обновляет `NFTProgress` (quest_completed_count += 1),
   - проверяет `NFTLevelRule` для `explorer`:
     - если пользователь впервые достиг порога (например, 1 квест):
       - создаётся `NFTInstance` уровня 1,
     - если ранее был уровень 1 и теперь достигнут порог для уровня 2:
       - обновляется `current_level` и `metadata.level`.
6. При необходимости:
   - Mint Orchestrator добавляет задачу в `NFTMintQueue`.

---

## 3. Поток ончейн-минта

1. Worker NFT Service берёт задачу из `NFTMintQueue` (`status = pending`).
2. Формирует запрос в Blockchain Gateway:
   - id пользователя,
   - характеристики NFT (type_code, level, metadata),
   - link на картинку, описание.
3. Gateway вызывает TON smart-contract → получает `token_id`.
4. Gateway отправляет callback в NFT Service:
   - `/internal/onchain/callback`.
5. NFT Service:
   - обновляет `NFTInstance.onchain_status` и `onchain_token_id`,
   - пишет запись в `NFTAuditLog`.

---

## 4. Масштабирование

- API Layer и Engine могут горизонтально масштабироваться по HTTP.
- Точки нагрузки:
  - массовая выдача наград (кампании),
  - массовый ончейн-минт.
- Для очередей:
  - `NFTMintQueue` может быть реализована на БД или внешнем брокере (RabbitMQ, Kafka, SQS и др.).

---

## 5. Консистентность

- Оффчейн-учёт NFT — источник истины для репутации внутри Go2Asia.
- Ончейн-токены — публичное отображение части достижений:
  - связи offchain ↔ onchain хранятся в NFTInstance.
- При расхождениях:
  - запускаются процедуры reconciliation (сверка списков NFTInstance с данными блокчейна).
