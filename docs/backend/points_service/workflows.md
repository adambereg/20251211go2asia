# Points Service — Workflows

В этом разделе описаны ключевые сценарии, в которых участвует Points Service.

---

## 1. Награда за прохождение квеста (через Connect Service)

1. Пользователь завершает квест.
2. Quest Service публикует событие `quest.completed`.
3. Connect Service:
   - получает событие,
   - находит `RewardRule` и рассчитывает награду,
   - создаёт `RewardAction` с `reward_type = points` и суммой.
4. Connect Service вызывает:
   - `POST /api/points/v1/internal/credit` с:
     - `external_id = reward_action_id`,
     - `user_id = player`,
     - `amount` (например, 150 Points),
     - `reason = "quest.completed_reward"`.
5. Points Service:
   - проверяет `external_id`,
   - создаёт транзакцию `credit`,
   - обновляет баланс.
6. Пользователь в Space Asia видит:
   - новый баланс Points,
   - запись в истории наград.

---

## 2. Покупка квеста за Points

1. Пользователь (VIP/PRO) выбирает квест и жмёт «купить».
2. Quest Service:
   - вызывает `POST /internal/debit` или цепочку `hold` → `capture`.
3. Points Service:
   - проверяет `available_balance`,
   - при недостатке Points:
     - возвращает ошибку `INSUFFICIENT_FUNDS`,
   - при успехе:
     - создаёт транзакцию `debit`,
     - обновляет баланс.
4. Quest Service:
   - активирует квест для пользователя.

При отмене/ошибке, если использовался `hold`:

- вызывается `release`,
- Points возвращаются в доступный баланс.

---

## 3. Покупка премиум-ваучера

1. Пользователь (VIP) нажимает «купить премиум-ваучер».
2. Voucher Service:
   - создаёт `hold` на сумму Points,
   - пытается провести все остальные шаги (выпуск ваучера, запись в БД и т.п.).
3. Если всё прошло успешно:
   - Voucher вызывает `capture`:
     - холд конвертируется в `debit`,
     - баланс уменьшается.
4. Если что-то пошло не так:
   - Voucher вызывает `release`:
     - холд снимается,
     - Points становятся снова доступными.
5. Параллельно Connect:
   - на основе события `voucher.premium_purchased`:
     - начисляет Points бизнес-партнёру, PRO и др. (через `Points.credit`).

---

## 4. Бронирование жилья через Rielt Service

1. Путешественник бронирует жильё, используя Points как часть оплаты.
2. Rielt Service:
   - создаёт `hold` на нужную сумму Points;
   - проводит внешнюю/денежную часть операции (если есть).
3. При успешной фиксации брони:
   - Rielt вызывает `capture`:
     - холд становится списанием.
4. При отмене:
   - Rielt вызывает `release`.

Дальше:

- Rielt публикует событие `rielt.booking_paid`,
- Connect начисляет бонусные Points нужным ролям через `Points.credit`.

---

## 5. Отложенные награды за субрефералов

1. Пользователь A приглашает B (реферал), B приглашает C (субреферал).
2. До апгрейда A до VIP/PRO:
   - Referral + Connect могут создавать `RewardAction` в режиме «отложенной награды»,
   - но не выполнять `Points.credit`.
3. Когда A становится VIP или PRO:
   - Referral публикует `referral.user_upgraded_to_vip/pro`.
4. Connect:
   - находит все отложенные `RewardAction` для A,
   - вызывает `Points.credit` для каждой награды.
5. Points Service:
   - обрабатывает кредиты как обычные операции.

---

## 6. Админский сценарий расследования спорного списания

1. Пользователь жалуется, что у него «пропали Points».
2. Поддержка:
   - использует админку поверх `GET /internal/balance/{user_id}` и `GET /internal/transactions`;
   - фильтрует все операции за интересующий период.
3. Находит:
   - точные суммы `debit`, `credit`, `hold`, `release`,
   - происхождение транзакций (`source_service`, `reason`, `metadata`).
4. При необходимости:
   - Connect/доменные сервисы корректируют неверную бизнес-операцию через отдельные корректирующие `credit`/`debit`.

Это закрепляет роль Points Service как прозрачного и проверяемого ядра учёта баллов.
