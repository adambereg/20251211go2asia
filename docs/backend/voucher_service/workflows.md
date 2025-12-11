# Voucher Service — Основные сценарии (Workflows)

## 1. Публичная промо-акция RF

1. Админ создаёт ваучер:
   - `code = "RF-PHUQUOC-10"`,
   - `scope_module = "rf"`,
   - `scope_action = "rf_bill_payment"`,
   - `type = "percent_discount"`, `value = 10`,
   - `valid_from` / `valid_to`,
   - `max_uses_total = 1000`, `max_uses_per_user = 3`.
2. Код распространяется в соцсетях/почте.
3. В RF-интерфейсе, при оплате счёта:
   - пользователь вводит код,
   - RF Service вызывает `POST /validate` или `POST /redeem`.
4. Voucher Service проверяет ограничения и считает скидку.
5. RF отображает сумму со скидкой, завершает оплату, сохраняет `redemption_id`.

---

## 2. Персональный ваучер за квест

1. Пользователь успешно завершает квест (Quest Service).
2. Quest Service или Points Service:
   - вызывает internal API `CreateVoucher`:
     - `is_personal = true`,
     - `assigned_user_id = <user_id>`,
     - `scope_module = "rf"`,
     - `value = 10`, `type = "percent_discount"`, и т.п.
3. Voucher Service создаёт персональный ваучер.
4. Отправляется событие `voucher.personal_issued`.
5. Notification Service отправляет пользователю уведомление/письмо.
6. Пользователь видит ваучер в `/my/vouchers` и может применить при оплате у партнёра.

---

## 3. Скидка на бронирование жилья (Rielt)

1. Rielt запускает акцию:
   - “-5% на сервисный сбор при бронировании в январе”.
2. Создаётся ваучер:
   - `scope_module = "rielt"`,
   - `scope_action = "rielt_booking"`,
   - `type = "percent_discount"`, `value = 5`,
   - `min_order_amount` = определенный минимум.
3. При оформлении бронирования:
   - пользователь вводит промокод,
   - Rielt Service делает `validate`:
     - если успех — показывает скидку и финальную сумму,
   - при подтверждении оплаты:
     - вызывает `redeem` с тем же контекстом (`target_entity_id = booking:123`).
4. Voucher Service сохраняет `VoucherRedemption` и возвращает `discount_amount`.

---

## 4. Мои ваучеры в Space Asia

1. Пользователь открывает раздел “Мои ваучеры”.
2. PWA Shell/Space фронт вызывает:
   - `GET /api/voucher/v1/my/vouchers?scope_module=rf`.
3. Пользователь видит:
   - список ваучеров,
   - дату истечения,
   - краткое описание.
4. При клике на ваучер — дополнительные детали и подсказка, где его можно применить (на основе `scope_module`, `scope_action`, `allowed_partner_ids`).

---

## 5. Отмена операции/возврат (future scenario)

1. Пользователь оплатил счёт/бронирование с ваучером.
2. Сервис (RF/Rielt) отменяет операцию, делая возврат.
3. Для симметрии:
   - сервис может вызвать специальный internal endpoint:
     - `/internal/redemptions/{id}/rollback` или `/internal/revert`,
   - Voucher Service помечает `VoucherRedemption.status = "rolled_back"` и возвращает лимит использования (если бизнес-логика это допускает).

(Для MVP можно не реализовывать rollback, а предусмотреть его в roadmap.)

---

## 6. Покупка Премиум-ваучера VIP-спейсером

1. VIP-спейсер выбирает у партнёра Премиум-ваучер (class = `premium`).
2. Фронтенд запрашивает детали ваучера у Voucher Service:
   - `GET /api/voucher/v1/vouchers/{id}` (через BFF/admin-proxy),
   - показывает цену в G2A/Points и требования по NFT.

3. При нажатии “Купить Премиум-ваучер”:
   - фронт формирует запрос в Token/Points/NFT слой (в зависимости от настроек economics):
     - списать `price_in_g2a` с баланса пользователя;
     - (опционально) списать/запереть Points;
     - проверить/изменить NFT-статус (`requires_nft_level`, `nft_reward_template`).

4. После успешного платежа:
   - Token / Points / NFT сервисы возвращают результат (tx-id, новые балансы).
   - BFF вызывает internal API Voucher Service, например:
     - `POST /internal/premium-purchase` с данными:
       - `voucher_id`, `user_id`, `payment_tx_id`, `nft_tx_id` (если есть).

5. Voucher Service:
   - создаёт персональный экземпляр ваучера для пользователя (или просто привязывает `Voucher` к `user_id`),
   - пишет `VoucherRedemption` с типом `purchase` (покупка Премиум-ваучера),
   - в `economics`/`metadata` фиксирует:
     - бизнес-партнёра,
     - PRO-спейсера,
     - суммы G2A-компенсаций.

6. Token Service на основании `economics` уже распределил:
   - **компенсацию бизнес-партнёру** в токенах G2A,
   - **вознаграждение PRO-спейсера** в токенах G2A.

7. Пользователь видит купленный Премиум-ваучер в `/my/vouchers`,
   может предъявить его в RF/Rielt/Quest при оплате услуги/товара.


