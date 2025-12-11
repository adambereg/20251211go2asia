# Connect Service — Workflows

В этом разделе описаны ключевые сценарии, как Connect Service реагирует
на события из разных микросервисов.

## 1. Регистрация реферала первого уровня

1. Новый пользователь регистрируется по реферальной ссылке.
2. Referral Service:
   - записывает реферальную связь,
   - публикует событие:
     ```json
     {
       "external_id": "ref-evt-1001",
       "event_type": "referral.joined",
       "source_service": "referral_service",
       "actor_user_id": "user_new",
       "primary_subject_user_id": "user_sponsor",
       "context": { "level": 1 }
     }
     ```
3. Connect Service:
   - создаёт `EconomicEvent`,
   - Rule Engine находит правило `referral_first_level_registration`,
   - создаётся `RewardAction`:
     - `target_user_id = user_sponsor`,
     - `reward_type = points`,
     - `amount = N`.
4. Reward Dispatcher:
   - отправляет команду в Points Service,
   - при успехе помечает `RewardAction.status = completed`.

---

## 2. Регистрация субреферала (2-й уровень) и «отложенные» награды

1. Новый пользователь регистрируется по ссылке реферала (становится субрефералом).
2. Referral Service публикует `referral.subjoined` c `context.level = 2`.
3. Connect:
   - по правилам:
     - создаёт `RewardAction` для спонсора 1-го уровня,
     - если спонсор пока **не VIP/PRO**, награда будет иметь:
       - `locked_until_condition = "vip_or_pro"`.
   - Награда может:
     - **не отправляться** в Points немедленно,
     - либо отправляться с особой пометкой, но логически считается «заблокированной» до апгрейда.
4. Когда спонсор апгрейдится до VIP/PRO:
   - Referral Service или User Service публикует событие `referral.user_upgraded_to_vip` / `user.upgraded_to_pro`,
   - Connect:
     - находит все «заблокированные» награды для этого пользователя,
     - переводит их в статус `pending`/`dispatched`,
     - отправляет команды Points Service для зачисления.

---

## 3. Прохождение квеста

1. Пользователь завершает квест (оплачен Points).
2. Quest Service:
   - проверяет условия,
   - фиксирует прохождение,
   - публикует событие `quest.completed` с контекстом (quest_id, pro_author_id, base_reward_points, др.).
3. Connect:
   - создаёт `EconomicEvent`,
   - Rule Engine находит правило:
     - награда пользователю (`actor_user_id`),
     - награда PRO-автору (`primary_subject_user_id`).
   - создаёт `RewardAction` для обоих.
4. Reward Dispatcher:
   - отправляет команды Points Service,
   - при необходимости:
     - генерирует `RewardAction` для NFT (например, за 10-й квест).

---

## 4. Покупка премиум-ваучера

1. VIP-спейсер покупает премиум-ваучер (оплата токенами и NFT).
2. Voucher Service:
   - проводит оплату (off-chain / on-chain),
   - публикует `voucher.premium_purchased` c указанием:
     - `actor_user_id` (покупатель),
     - `rf_partner_id`,
     - `pro_promoter_id` (если PRO-куратор привёл партнёра),
     - сумм и параметров.
3. Connect:
   - видит в правиле:
     - награда бизнес-партнёру в G2A/Points,
     - награда PRO-спейсеру (продвигающему партнёра),
     - возможные бонусы покупателю за активность.
   - генерирует несколько `RewardAction`:
     - для партнёра (`points`/`g2a_offchain`),
     - для PRO-партнёра (`points`),
     - для покупателя (опционально).
4. Reward Dispatcher:
   - вызывает Points / NFT / Gateway в зависимости от настроек.

---

## 5. Оплаченная бронь жилья (Rielt Service)

1. Пользователь оформляет и оплачивает бронь жилья.
2. Rielt Service:
   - фиксирует оплату,
   - публикует `rielt.booking_paid` c контекстом (сумма, тип жилья, город, хост и т.д.).
3. Connect:
   - применяет правила:
     - вознаграждение арендатору за активность,
     - вознаграждение хосту (если он участвует в программе),
     - вознаграждение рефералу/субрефералу и его спонсорам (через связку с Referral Service).
4. Далее — аналогично: создаются `RewardAction`, исполняются через Points/NFT.

---

## 6. Отзыв о партнёре RF (через Reactions)

1. Пользователь оставляет короткий отзыв и рейтинг на RF-место.
2. Reactions Service создаёт `reaction.short_review` и `rating`.
3. RF Service может агрегировать и опубликовать событие `rf_partner.review_created`/`rf_partner.review_high_rating`.
4. Connect:
   - начисляет Points автору отзыва,
   - может начислить бонус партнёру/PRO-куратору за качественный отзыв,
   - возможно, выдаёт NFT за набор полезных отзывов (на более поздних этапах).

---

## 7. Начисление бейджа за достижения

1. При очередном событии (например, 10-й пройденный квест) Connect видит по контексту:
   - `context.total_quests_completed = 10`.
2. В правилах есть условие:
   - при `total_quests_completed >= 10` выдать `badge_type = "quest_master_10"`.
3. Connect:
   - создаёт `RewardAction` `reward_type = "nft"`,
   - отправляет команду в NFT Service.

---

Эти сценарии — лишь основной каркас.
В дальнейшем можно добавлять новые типы событий и правил без изменения базовой архитектуры.
