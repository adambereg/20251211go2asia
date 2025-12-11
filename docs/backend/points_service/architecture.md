# Points Service — Architecture

## 1. Слои сервиса

### API Layer

- Принимает HTTP-запросы от других микросервисов.
- Проводит:
  - аутентификацию (service JWT),
  - авторизацию (разрешённые методы для `source_service`),
  - базовую валидацию входных данных.

### Ledger Engine

- Ядро Points Service:
  - реализует операции `credit`, `debit`, `hold`, `release`, `capture`,
  - применяет бизнес-ограничения (баланс, статусы холдов),
  - обеспечивает идемпотентность по `external_id`,
  - ведёт журнал транзакций (`PointsTransaction`),
  - обновляет агрегированный баланс (`UserBalance`),
  - следит за статусами `PointsHold`.

### Balance/Query Layer

- Упрощает доступ к:
  - текущему балансу (`GET /internal/balance/{user_id}`),
  - истории транзакций (`GET /internal/transactions`).
- Может использовать:
  - прямые запросы в БД,
  - кеш (Redis) для ускорения.

### Persistence Layer

- Реляционная БД (Postgres или аналог):
  - таблицы `points_transactions`, `points_holds`, `user_balances`,
  - строгие ограничения и индексы.

---

## 2. Поток обработки типичных операций

### Credit

1. API Layer принимает запрос `/internal/credit`.
2. Проводит базовую валидацию.
3. Ledger Engine:
   - проверяет `external_id`:
     - если уже есть `completed` транзакция — возвращает её;
   - создаёт новую `PointsTransaction` типа `credit`;
   - обновляет `UserBalance`;
4. Возвращает:
   - `transaction_id`,
   - `new_balance`.

---

### Debit

1. API Layer принимает `/internal/debit`.
2. Ledger Engine:
   - читает текущий `available_balance`;
   - если средств недостаточно → ошибка `INSUFFICIENT_FUNDS`;
   - иначе создаёт транзакцию `debit`;
   - обновляет `UserBalance`.

---

### Hold → Capture / Release

1. `hold`:
   - проверяется `available_balance`;
   - создаётся `PointsHold` + транзакция `hold`;
   - `available_balance` уменьшается.
2. `capture`:
   - создаётся транзакция `debit` на сумму холда;
   - холд → `captured`;
   - `total_balance` уменьшается.
3. `release`:
   - холд → `released`;
   - `available_balance` увеличивается.

---

## 3. Масштабирование

- Points Service может масштабироваться горизонтально:
  - несколько инстансов API/Engine,
  - общая БД как источник истины.
- Важно:
  - грамотно настроенный уровень изоляции транзакций,
  - защита от гонок при параллельных операциях с одним и тем же `user_id`.

---

## 4. Консистентность и reconciliation

- Периодические задачи:
  - пересчёт баланса пользователя по журналу транзакций,
  - сравнение с `UserBalance`,
  - исправление аномалий (при их наличии),
  - логирование и алерты.

Таким образом, Points Service архитектурно прост, но построен как надёжное финансовое ядро офчейн-экономики.
