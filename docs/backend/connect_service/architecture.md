# Connect Service — Architecture

## 1. Высокоуровневая структура

Сервис разделён на несколько слоёв:

1. **API Layer**
   - REST-эндпоинты `/internal/events`, `/internal/rules`, `/internal/reward-actions` и т.д.
   - Авторизация service-to-service.
2. **Event Intake Layer**
   - Приём и нормализация событий,
   - проверка idempotency по `external_id`.
3. **Rule Engine**
   - Подбор подходящих правил (`RewardRule`) по `event_type` и `condition`,
   - вычисление набора `RewardAction`.
4. **Reward Dispatcher**
   - преобразование `RewardAction` в команды для:
     - Points Service,
     - NFT Service,
     - Blockchain Gateway.
   - обновление статусов `RewardAction`.
5. **Persistence Layer**
   - хранение `EconomicEvent`, `RewardRule`, `RewardAction`,
   - индексы и запросы для аналитики.

---

## 2. Обработка событий (flow)

1. Доменный сервис вызывает `POST /internal/events` или публикует сообщение в Event Bus.
2. Connect:
   - нормализует событие в `EconomicEvent`,
   - проверяет `external_id`:
     - если уже есть обработанное событие с тем же `external_id` → idempotent return.
3. Rule Engine:
   - выбирает все `RewardRule` с совпадающим `event_type`,
   - фильтрует по `enabled` и датам действия,
   - проверяет `condition` (по данным `context`, `actor_user_id`, `primary_subject_user_id`, и др.),
   - сортирует по `priority` и применяет.
4. Для каждого подходящего правила создаются `RewardAction`.
5. Reward Dispatcher:
   - для каждого `RewardAction`:
     - формирует команду для Points/NFT/Gateway,
     - ставит её в очередь или вызывает соответствующий сервис,
     - обновляет `status` (например, в `dispatched`, а затем в `completed`).

Обработка может быть:

- синхронной (для небольшого объёма),
- асинхронной (через очередь задач и воркеры) для масштабируемости.

---

## 3. Масштабирование и надёжность

- API-слой:
  - масштабируется горизонтально, стейт хранится в БД.
- Rule Engine:
  - stateless, при необходимости масштабируется отдельным пулом воркеров.
- Reward Dispatcher:
  - использует очередь задач (например, Redis Streams, RabbitMQ, Cloud Queue),
  - может иметь отдельный пул воркеров.

Connect должен быть устойчив к:

- временным ошибкам Points/NFT/Gateway:
  - при ошибках `RewardAction.status` = `failed`,
  - возможны ретраи с экспоненциальной задержкой,
  - либо ручной перезапуск через админку.

---

## 4. Границы ответственности

Connect Service:

- является **«мозгом»** офчейн-экономики,
- не занимается:
  - балансами (это Points),
  - чекаутами транзакций (это Rielt/Voucher/другие сервисы),
  - реальной блокчейн-инфраструктурой (это Blockchain Gateway),
  - хранением дерева рефералов (это Referral Service).

Благодаря этому:

- можно изменять правила экономического поведения без переписывания доменных сервисов,
- можно проводить A/B-тестирование наград и кампаний (в будущем),
- можно использовать AI/ML для динамической настройки наград (в дальнейших фазах).
