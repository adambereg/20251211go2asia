# Points Service — Integrations

## 1. Connect Service

Основной источник **начислений** Points.

- Для каждого `RewardAction` типа `points` Connect:
  - вызывает `/internal/credit` с:
    - `external_id = reward_action_id`,
    - `reason` и `metadata` с деталями.
- Points Service:
  - создает транзакцию,
  - обновляет баланс,
  - возвращает `transaction_id` и новый баланс.

Благодаря `external_id = reward_action_id` обеспечивается строгая идемпотентность:
- повторный вызов Connect с тем же `reward_action_id` не создаст двойное начисление.

---

## 2. Quest Service

Использует Points Service для:

- **покупки квестов**:
  - опция 1: `hold` → `capture` при успешном подтверждении квеста,
  - опция 2: напрямую `debit`, если нет сложной двухфазной логики;
- отмены квеста:
  - `release` холда, если квест не стартовал или отменён.

Связь с Connect:

- Connect начисляет награды за `quest.completed` (credit),
- Quest обеспечивает корректные списания за покупки.

---

## 3. Voucher Service

Сценарии:

- **покупка премиум-ваучера за Points**:
  - выставляет `hold` или `debit` на сумму, оплачиваемую Points,
  - при успехе:
    - фиксирует `debit`,
    - Connect Service отдельно начисляет бонусы бизнес-партнёру, PRO-спейсерам и т.п.;
- **отмена покупки**:
  - `release` холда, если операция не завершилась.

Вся бизнес-логика, связанная с тем, кто сколько получает (партнёр, PRO и т.д.), живёт в Connect + Voucher.

---

## 4. Rielt Service (сервис бронирования жилья)

Сценарии:

- оплата части или всей стоимости бронирования Points:
  - `hold` при инициации брони,
  - `capture` при подтверждении,
  - `release` при отмене.
- начисление Points за успешную бронь:
  - происходит через Connect Service (credit),
  - Rielt лишь публикует `rielt.booking_paid` → Connect → Points.credit.

---

## 5. Referral + Connect

Referral Service:
- отслеживает дерево «рефералы/субрефералы»,
- публикует события:
  - `referral.joined_level1`,
  - `referral.joined_level2`,
  - `referral.user_upgraded_to_vip/pro`.

Connect:
- интерпретирует события,
- создаёт `RewardAction` (points),
- вызывает Points Service `/internal/credit`.

Points Service не знает о реферальной механике — он просто проводит операции.

---

## 6. Другие сервисы

Любой доменный сервис может:

- списывать Points за премиум-функции,
- ставить их в холд до завершения операции.

Рекомендуется:
- все **начисления** (credit) делать только через Connect,
- а прямые списания и холды — только там, где есть реальная «покупка/оплата».
