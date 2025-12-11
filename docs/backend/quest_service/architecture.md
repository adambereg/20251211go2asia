# Quest Service — Architecture

## Основные компоненты

1. **API Layer**
   - REST API `/api/quest/v1/...`.
   - Авторизация, DTO, валидация запросов.

2. **Application Layer**
   - Use-cases:
     - `CreateQuest`, `UpdateQuest`, `PublishQuest`,
     - `CreateQuestRun`, `SubmitCheckpoint`, `CompleteQuestRun`,
     - `AttachSpacePost`, `ApproveSpacePost`.
   - Содержит бизнес-правила:
     - кто может что делать,
     - последовательность шагов,
     - триггеры наград.

3. **Domain Layer**
   - Модели: `Quest`, `QuestStep`, `QuestRun`, `QuestRunParticipant`,
     `QuestCheckpointProgress`, `QuestRewardLog`.
   - Правила перехода статусов:
     - квестов, раннов, чекпоинтов.

4. **Persistence Layer**
   - Основная БД — Postgres.
   - Возможное использование JSONB для гибких полей (quiz, requirements).

5. **Integration Layer**
   - Клиенты к:
     - User/Guru,
     - RF,
     - Atlas,
     - Points,
     - Voucher,
     - NFT,
     - Content/Space.

6. **Caching Layer**
   - Кеш каталога квестов и детальных описаний.

---

## Границы ответственности

Quest Service:

- *Да*:
  - хранит определения квестов и прогресса,
  - знает, какие награды должны быть выданы,
  - инициирует внешние операции (Points/NFT),
  - проверяет чекпоинты на уровне логики.
- *Не*:
  - не управляет балансами токенов/поинтов,
  - не хранит медиа-файлы,
  - не создаёт ваучеры/премиум-ваучеры.

---

## Масштабирование

- Каталог квестов — read-heavy,
- чекпоинты и прогресс — write-heavy.

Стратегия:

- несколько API-инстансов за балансировщиком,
- при росте:
  - read-replica БД для каталогов;
  - отдельные очереди/воркеры для наград (Points/NFT).

---

## Observability

- Метрики:
  - количество активных квестов,
  - количество покупок/завершений,
  - `success rate` выдачи наград.
- Трассировка:
  - интеграции с Points/NFT/Content/Space.
