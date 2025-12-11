# NFT Service — Workflows

В этом разделе собраны ключевые сценарии, в которых участвует NFT Service.

---

## 1. Базовый сценарий: пользователь проходит свой первый квест

1. Пользователь завершает квест в определённом городе.
2. Quest Service публикует событие `quest.completed`.
3. Connect:
   - начисляет Points через Points Service;
   - определяет, что нужно обновить прогресс по бейджу `explorer`.
4. Connect вызывает:
   - `POST /api/nft/v1/internal/reward` с:
     - `type_code = "explorer"`,
     - `increment = { "quest_completed_count": 1 }`.
5. NFT Service:
   - обновляет NFTProgress (quest_completed_count = 1),
   - проверяет уровни `explorer`:
     - обнаруживает, что threshold для Level 1 выполнен,
     - создаёт `NFTInstance` уровня 1,
     - пишет запись в NFTAuditLog (`created`).
6. UI профиля:
   - при следующем запросе к профилю показывает новый бейдж Explorer I.

---

## 2. Апгрейд бейджа: переход с Level 1 на Level 2

1. Пользователь проходит ещё 4 квеста (всего 5).
2. Для каждого квеста Connect вызывает `/internal/reward` с increment = 1.
3. На 5-м квесте NFT Service:
   - фиксирует `quest_completed_count = 5`,
   - проверяет `NFTLevelRule` для уровня 2 (например, threshold = 5),
   - обновляет:
     - `current_level` с 1 на 2,
     - `metadata.level = 2`.
   - пишет Audit: `level_up` с деталями (from 1 to 2).
4. В зависимости от `auto_mint_onchain`:
   - либо ставит задачу в `NFTMintQueue`,
   - либо ждёт явного запроса на ончейн-минт от пользователя.

---

## 3. Премиум-ваучер и NFT

1. VIP-путешественник покупает премиум-ваучер:
   - Points списываются через Points Service,
   - Voucher фиксирует покупку и использование.
2. Voucher Service публикует событие `voucher.premium_used`.
3. Connect:
   - создаёт RewardAction:
     - выдать/обновить бейдж `premium_voucher_user`.
4. NFT Service:
   - через `/internal/reward` обновляет прогресс,
   - выдаёт/апгрейдит бейдж.
5. При достижении определённого уровня `premium_voucher_user`:
   - Mint Orchestrator может автоматически инициировать ончейн-минт.

---

## 4. PRO как гуру: бейджи за создание квестов и партнёров

1. PRO создаёт квест в городе (через Quest Service).
2. Quest Service публикует событие `quest.created_by_pro`.
3. Connect:
   - создаёт RewardAction для типа `quest_author`.
4. NFT Service:
   - увеличивает счётчик `quests_created`,
   - при достижении порогов выдаёт/апгрейдит:
     - `Quest Author` → `Senior Quest Author`.

Аналогично для RF-партнёров:

- RFService/Referral публикуют события,
- Connect → `partner_curator` бейджи,
- NFT Service ведёт прогресс.

---

## 5. Ончейн-минт по запросу пользователя

1. Пользователь открывает профиль и видит бейдж `explorer` Level 3.
2. В UI — кнопка «Вывести в блокчейн TON».
3. Фронтенд:
   - через API Gateway вызывает `submit_onchain(nft_id)`.
4. NFT Service:
   - проверяет статус и политику,
   - создаёт задачу в `NFTMintQueue`.
5. Worker → Blockchain Gateway → TON → callback.
6. NFT Service:
   - обновляет `onchain_status = minted`,
   - сохраняет `onchain_token_id`, `tx_hash`,
   - пишет в AuditLog.

---

## 6. Отзыв или аннулирование NFT (модерация / antifraud)

1. Anti-fraud/Moderation Service выявляет, что пользователь накрутил квесты/отзывы.
2. Через админ-интерфейс модератор:
   - вызывает спец-эндпоинт (через BFF) для ревокации NFTInstance.
3. NFT Service:
   - помечает бейдж `status = revoked`,
   - добавляет запись в AuditLog (`revoked`, причина).
4. При необходимости:
   - может инициироваться отдельная схема по отзыву ончейн-токена (burn), через Gateway.

---

Эти сценарии показывают NFT Service как живой «движок достижений», встроенный во все основные активности Go2Asia.
