# Voucher Service — Интеграции

## User Service

- Все операции с ваучерами (кроме публичных `validate` по коду) привязаны к `user_id`.
- JWT от User Service даёт:
  - `sub` → `user_id`,
  - `role` → `user`, `partner`, `admin`.

**Примеры:**

- `/my/vouchers`, `/my/redemptions` → используют `current_user_id` из токена.
- Создание ваучера → `created_by_user_id` = `current_user_id`.

---

## RF Service (Russian Friendly)

- Использует ваучеры для:
  - скидок на оплату счёта у партнёров (`rf_bill_payment`),
  - спец-акций для конкретного списка партнёров (`allowed_partner_ids`).

**Сценарий применения:**

1. Пользователь вводит промокод в RF-интерфейсе или сканирует QR.
2. RF Service:
   - собирает контекст заказа (сумма, валюта, партнёр),
   - вызывает `POST /api/voucher/v1/validate` или сразу `redeem`.
3. Voucher Service возвращает размер скидки.
4. RF Service:
   - применяет скидку в своей логике расчёта счета,
   - сохраняет `redemption_id` для дальнейшего аудита.

---

## Rielt Service

- Ваучеры на:
  - скидку на комиссию,
  - скидку на плату за сервис/бронирование.

**Сценарий:**

- При бронировании жилья:
  - фронт/бэкенд Rielt перед оплатой вызывает `validate/redeem`,
  - в `scope_module="rielt"`, `scope_action="rielt_booking"`.

---

## Quest Service

- Ваучеры:
  - на бесплатное участие,
  - на скидку на билет.

**Пример:**

- Пользователь участвует в конкурсе в Space и получает промокод на участие в квесте.
- При покупке билета Quest Service дергает Voucher Service для применения к сумме заказа.

---

## Points Service

- Используется для:
  - **эмиссии** ваучеров в ответ на действия пользователя (награды).
  - обмен Points на ваучеры:
    - пользователь в “магазине наград” тратит Points,
    - Points Service вызывает internal API:
      - `POST /api/voucher/v1/vouchers` с `is_personal=true` и `assigned_user_id=...`
    - или специальный internal endpoint “issuePersonalVoucher”.

- Может использоваться для:
  - покупки обычных ваучеров за Points;
  - частичной оплаты Премиум-ваучеров (если часть цены номинирована в Points).
- При покупке:
  - фронтенд/Points Service списывает Points с баланса пользователя;
  - вызывает internal API Voucher Service для выпуска/привязки ваучера к `user_id`
    (например, `issuePersonalVoucher`).

*Детальная логика выпуска/обмена описывается в Points Service, Voucher Service только создаёт записи.*

---

## Token / Blockchain Gateway Service

- Отвечает за off-chain/on-chain операции с токеном **G2A**.
- При покупке Премиум-ваучера:
  - на основании `price_in_g2a` и `economics.business_reward_g2a` / `economics.pro_reward_g2a`:
    - списывает нужное количество G2A с кошелька VIP-спейсера,
    - зачисляет G2A-компенсацию бизнес-партнёру,
    - зачисляет вознаграждение PRO-спейсеру.
  - Voucher Service со своей стороны:
    - создаёт запись `Voucher`/`VoucherRedemption` и помечает, что оплата произведена;
    - хранит ссылку на транзакцию Token Service (`payment_tx_id` в `metadata`).
	
---

## NFT Service

- Реализует логику работы c NFT-бэйджами/уровнями.

Для Премиум-ваучеров возможны сценарии:

1. **Требуется NFT уровня N**  
   - при `redeem` Voucher Service через NFT Service проверяет,
     что у пользователя есть NFT нужного шаблона/уровня.

2. **Минт/апгрейд NFT при покупке**  
   - после успешной покупки Премиум-ваучера:
     - Token Service / Voucher Service вызывают NFT Service,
     - минтится или апгрейдится NFT по `economics.nft_reward_template`.

В обоих случаях Voucher Service **не хранит** сами NFT, только ссылку
на `nft_template_id`, `required_nft_level` и идентификатор операции `nft_tx_id` в `metadata`.

---

## Notification Service

- При создании персонального ваучера:
  - Voucher Service или Points Service отправляет событие:
    - `voucher.personal_issued` (с `user_id`, `voucher_id`).
- Notification Service:
  - отправляет письмо/уведомление с описанием ваучера и промокодом.

---

## Analytics / Logging

- Использует `VoucherRedemption` как базу для:
  - анализа эффективности кампаний,
  - отчётов для партнёров (сколько скидок за их счёт),
  - контроля злоупотреблений.

---

## Event Bus (опционально)

Список событий:

- `voucher.created`
- `voucher.updated`
- `voucher.status_changed`
- `voucher.redeemed`
- `voucher.redeem_failed`
- `voucher.personal_issued`

Подписчики:

- Notification Service,
- Analytics/BI,
- Points Service (в сложных схемах),
- Anti-abuse системы.
