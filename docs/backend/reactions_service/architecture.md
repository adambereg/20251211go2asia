# Reactions Service — Architecture (Unified Reactions + Threads)

## Основные компоненты

1. **API Layer**
   - REST API `/api/reactions/v1/...`
   - Основные группы endpoint’ов:
     - `POST /reactions`, `DELETE /reactions/{id}`, `GET /reactions/list`, `GET /reactions/user`
     - `POST /stats/batch`, `GET /stats`
     - `GET /threads`, `GET /threads/{id}`, `POST /threads/{id}/close`
     - `POST /reports`
   - Аутентификация и базовая авторизация.

2. **Application Layer**
   - Use-cases:
     - `CreateReaction`, `DeleteReaction`, `HideReactionByUser`, `ModerateReaction`
     - `ComputeAggregates`, `GetStatsBatch`
     - `CreateThreadOnQuestionOrContactRequest`, `AddThreadReply`, `CloseThread`
     - `CreateReport`, `ProcessReport`
   - Бизнес-правила:
     - валидация типов реакций,
     - связи реакций с ветками,
     - правила уникальности и идемпотентности.

3. **Domain Layer**
   - Модели:
     - `Reaction`
     - `Thread`
     - `ReactionAggregate`
     - `ThreadAggregate`
     - `ReactionReport`
   - Локальные value-объекты:
     - `ReactionType`,
     - `TargetRef` (`target_type`, `target_id`),
     - `ThreadStatus`, `ReactionStatus`.

4. **Persistence Layer**
   - БД PostgreSQL:
     - таблицы для всех доменных сущностей,
     - индексы для основных запросов и агрегаций.

5. **Event / Integration Layer**
   - Публикация событий:
     - `reaction.created`, `reaction.deleted`, `reaction.flagged`, `thread.reply.created`
   - Подписчики:
     - Notification Service,
     - Connect / Points / NFT / Token,
     - Moderation / Trust & Safety,
     - Space / Content (для репостов и сигналов вовлечённости).

---

## Потоки данных

- **Синхронный путь:**
  - Пользователь отправляет реакцию → API → валидация → сохранение в БД → обновление агрегатов → ответ.
- **Асинхронный путь:**
  - После сохранения реакции формируется событие для Event Bus;
  - Воркер или внешний сервис обрабатывает:
    - уведомления,
    - начисления,
    - модерацию.

---

## Масштабирование

- Ожидается высокая частота операций записи (лайки, просмотры, репосты, реакции).
- Для MVP:
  - горизонтальное масштабирование API-инстансов,
  - продуманная индексация,
  - кеширование агрегатов.
- Далее:
  - вынесение тяжёлых подсчётов и аналитики в отдельные воркеры и DWH;
  - возможное шардирование по `target_type`/`target_id` или по `user_id`.

---

## Граница ответственности

Reactions Service:

- хранит **только реакции и лёгкие ветки общения**;
- **не** хранит:
  - сам контент (посты, места, объявления, события),
  - профили пользователей (кроме идентификаторов);
- **не** отвечает за:
  - сложную модерацию (решения принимает Moderation Service),
  - сложную аналитику (это задача Analytics/DWH).

При этом он является **единым формальным слоем**, через который проходят:

- социальные сигналы (лайки, репосты, оценки),
- отзывы и короткие тексты,
- асинхронные взаимодействия между пользователями.
