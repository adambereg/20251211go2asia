# NFT Service — Integrations

NFT Service находится в центре «слоя достижений» и связан с несколькими основными сервисами.

---

## 1. Connect Service (главный оркестратор наград)

Connect:

- слушает события от Quest, RF, Rielt, Referral, Voucher и др.;
- на основе RewardRules создаёт **RewardAction** типа `nft` или `nft+points`;
- вызывает `POST /internal/reward` NFT Service.

NFT Service:

- обновляет прогресс (NFTProgress),
- создаёт или апгрейдит NFTInstance,
- опционально ставит задачу в NFTMintQueue, если нужно on‑chain.

Связка:

- за один и тот же бизнес-сценарий (например, `quest.completed`) может:
  - начисляться Points через Points Service,
  - выдаваться/апгрейдиться NFT через NFT Service.

---

## 2. Quest Service

Примеры событий:

- `quest.completed` — пользователь прошёл квест;
- `quest.created` — PRO создал квест;
- `quest.completed_first_in_city` — первый, кто прошёл квест в этом городе.

Quest Service:

- публикует события в Event Bus (или напрямую Connect),
- Connect:
  - считает награды (Points, NFT),
  - вызывает NFT Service.

NFT Service может также:

- хранить в `metadata` ссылки на `quest_id`, `city_id` и др.

---

## 3. Points Service

NFT Service не меняет балансы, но может:

- опираться на данные Points (через Connect):
  - «выдать бейдж, если пользователь накопил 1000 Points»;
- в будущем — инициировать RewardActions через Connect на основе перехода NFT на новый уровень.

На уровне интеграции:

- Points → Connect → NFT;
- NFT → (в будущем) Connect → Points (например, бонус за достижение редкого бейджа).

---

## 4. RF Service (Russian Friendly)

RF Service:

- собирает и агрегирует пользовательские отзывы и рейтинги по партнёрам,
- публикует события:
  - `rf.review_added`,
  - `rf.review_count_threshold_reached`,
  - `rf.partner_promoted_by_pro` и т.п.

Connect:

- интерпретирует эти события в контексте NFT:
  - выдача `rf_reviewer`,
  - бейджей для PRO за успешное продвижение партнёров.

NFT Service:

- на основании RewardAction обновляет `rf_reviewer`, `partner_curator` и др.

---

## 5. Voucher Service

Сценарии:

- покупка и использование премиум-ваучеров;
- успешное использование премиум-возможности.

Connect:

- выдаёт RewardAction типа `nft`:
  - `premium_voucher_user`,
  - дополнительные прогресс-бейджи типа «Premium Voyager».

NFT Service:

- фиксирует в метаданных связь с конкретными ваучерами.

---

## 6. Referral Service

Referral Service:

- управляет деревом рефералов/субрефералов;
- публикует события:
  - `referral.joined_level1`,
  - `referral.joined_level2`,
  - `referral.user_upgraded_to_vip_or_pro`,
  - `referral.milestone_reached` (N рефералов).

Connect:

- превращает события в RewardActions,
- NFT Service выдаёт бейджи:
  - `top_referrer`,
  - `referral_builder`, уровни I/II/III.

---

## 7. Blockchain Gateway Service

NFT Service:

- формирует задачи на ончейн-минт (NFTMintQueue),
- вызывает Gateway (через отдельный API Gateway или прямой s2s):

  - запрос: «Минтнуть NFT типа explorer level 3 для пользователя X».

Gateway:

- взаимодействует с TON,
- после транзакции вызывает callback:
  - `onchain_status = minted`/`failed`,
  - `onchain_token_id` / `tx_hash`.

NFT Service:

- обновляет запись,
- логирует событие в NFTAuditLog.

---

## 8. Space / Connect UI, Profile

Фронтенд:

- через API Gateway обращается к NFT Service (или агрегирующему BFF) за:
  - списком NFT пользователя;
  - прогрессом к следующему уровню;
  - разделом «Достижения» в профиле PRO, VIP, обычного спейсера.

NFT Service отдаёт:

- структурированные данные, удобные для рендера:
  - сгруппированные по категориям/типу,
  - с иконками, уровнями, редкостью и т.п.
