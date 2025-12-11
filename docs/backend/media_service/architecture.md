# Media Service — Архитектура

## Роль в экосистеме

Media Service — контентный микросервис уровня **Blog Asia**.

Он:

- хранит и отдаёт статьи (редакционные, партнёрские, UGC),
- связывает контент с гео-данными Atlas и событиями Pulse,
- взаимодействует со Space, Guru и Connect/Token.  

## Слои сервиса

1. **API Layer (HTTP)**  
   - REST-эндпоинты `/api/media/v1/...`;
   - авторизация по JWT;
   - DTO ↔ доменные модели;
   - централизованная обработка ошибок и валидация.

2. **Application Layer (Use Cases)**  
   Кейс-методы:
   - `CreateArticle`
   - `UpdateArticle`
   - `SubmitArticle`
   - `PublishArticle`
   - `ScheduleArticle`
   - `ArchiveArticle`
   - `ImportFromSpacePost`
   - `GetArticlesFeed`
   - `GetArticleByIdOrSlug`
   - `GetArticlesByLocation/ByEvent`

3. **Domain Layer**  
   - Модели:
     - `Article`, `ArticleCategory`, `ArticleTag`, `ArticleMedia`, `ArticleVersion` (Ф2).
   - Бизнес-правила:
     - статусные переходы (draft → pending_review → published/archived),
     - ограничения по ролям,
     - валидность привязок к Atlas/Pulse.

4. **Persistence Layer**  
   - Postgres (ORM — Drizzle/Prisma):
     - таблицы `articles`, `article_categories`, `article_tags`, `article_media`, optional `article_versions`, `article_stats`.
   - Индексация по статусу, времени публикации, категориям, геопривязкам.

5. **Integration Layer**

   - HTTP-клиенты:
     - Atlas Service — проверка `city_id`/`place_id`,
     - Pulse Service — валидация `event_id`,
     - User Service — авторство/роли,
     - Content Service — импорт UGC постов,
     - RF Service — партнёры,
     - Connect/Token Service — награды,
     - Notification Service — рассылки.  

   - Event Bus:
     - публикация `media.article_*`,
     - подписка (по необходимости) на события из других сервисов (например, удаление партнёра/места).

6. **Caching Layer**

   - Redis / in-memory:
     - главная лента,
     - популярные статьи,
     - статьи по городу/стране (для Atlas/Guru),
     - метаданные категорий и тегов.

## Масштабирование и нагрузка

- Профиль: **read-heavy**, похож на Media/News-систему.
- Запись: сравнительно редко (редакция/PRO/партнёры).
- Масштабирование:
  - горизонтальное на уровне сервиса,
  - реплики БД для чтения,
  - вынесение поиска в отдельный движок (Meilisearch/OpenSearch) на следующих этапах.  

## Надёжность и безопасность

- mTLS и ролевой доступ между сервисами.:contentReference[oaicite:23]{index=23}  
- Аудит модераторских действий.
- Логи с `correlation-id` через Logging Service.
- Graceful degradation:
  - при недоступности Atlas/Pulse/Content/Connect Media продолжает отдавать уже опубликованные статьи (read), а интеграции выполняются асинхронно позже.
