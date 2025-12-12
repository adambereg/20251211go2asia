# Task Breakdown — Go2Asia v2

**Дата создания:** 2025-12-11  
**Версия:** 1.0  
**Статус:** Утверждено

---

## Обзор

Этот документ содержит детальную разбивку задач по фазам с указанием:
- Что делает Backend
- Что делает Frontend
- Что делают агенты
- Как использовать Playbooks

---

## Фаза 0: Bootstrap + Архитектура монорепо

### Этап 0.1: Инициализация монорепо

#### Backend задачи:
- [ ] Создать структуру `services/` с шаблонами сервисов
- [ ] Настроить базовые конфиги для Cloudflare Workers
- [ ] Подготовить шаблоны для микросервисов

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 2

#### Frontend задачи:
- [ ] Создать структуру `apps/go2asia-pwa-shell/`
- [ ] Настроить Next.js 15 с App Router
- [ ] Создать базовую структуру `features/`

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 2

#### Общие задачи:
- [ ] Настроить pnpm workspace
- [ ] Настроить Turborepo
- [ ] Создать базовые конфиги (TypeScript, ESLint, Prettier)

**Агент:** Architect  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 2

---

### Этап 0.2: OpenAPI каркас

#### Backend задачи:
- [ ] Описать базовую структуру OpenAPI (`docs/openapi/openapi.yaml`)
- [ ] Создать схемы для основных сущностей (User, Place, Event, Post)
- [ ] Настроить Orval конфигурацию

**Агент:** Backend Dev  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 4

#### Frontend задачи:
- [ ] Настроить генерацию типов в `packages/types/`
- [ ] Настроить генерацию SDK в `packages/sdk/`
- [ ] Создать скрипты: `gen:types`, `gen:sdk`, `gen:all`

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 9

#### Общие задачи:
- [ ] Настроить валидацию OpenAPI (spectral) в CI
- [ ] Проверить генерацию типов/SDK

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 4

---

### Этап 0.3: CI/CD Pipeline

#### DevOps задачи:
- [ ] Настроить GitHub Actions для PR: lint, typecheck, build
- [ ] Добавить проверку OpenAPI (spectral)
- [ ] Настроить генерацию типов/SDK с проверкой diffs
- [ ] Настроить preview deployments на Netlify
- [ ] Настроить автоматический деплой в staging

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 5

#### Тестирование:
- [ ] Настроить базовые тесты (Vitest)
- [ ] Настроить contract-тесты (Schemathesis)
- [ ] Настроить E2E тесты (Playwright)

**Агент:** QA  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 5

---

### Этап 0.4: Облачная инфраструктура

#### DevOps задачи:
- [ ] Зарегистрировать домен go2asia.space
- [ ] Настроить DNS через Cloudflare
- [ ] Включить Cloudflare CDN и WAF
- [ ] Подключить Cloudflare R2 для медиа
- [ ] Инициализировать Cloudflare Workers (пустые)

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 10

---

### Этап 0.5: Единая аутентификация (SSO)

#### Backend задачи:
- [ ] Интегрировать Clerk в Auth Service
- [ ] Настроить приём вебхуков от Clerk
- [ ] Определить роли пользователей в Clerk метаданных

**Агент:** Backend Dev (Auth)  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 7

#### Frontend задачи:
- [ ] Подключить Clerk SDK в PWA Shell
- [ ] Настроить SSO для всех модулей
- [ ] Реализовать единый вход/выход

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 4

---

### Этап 0.6: Каркас PWA Shell

#### Frontend задачи:
- [ ] Создать базовый layout (header, footer, navigation)
- [ ] Настроить роутинг для модулей
- [ ] Реализовать PWA Manifest
- [ ] Настроить Service Worker (Workbox)
- [ ] Подготовить структуру для Feature Capsules

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, разделы 2, 3, 5

---

### Этап 0.7: Безопасность и логирование

#### Backend задачи:
- [ ] Внедрить Zod-валидацию в API Gateway
- [ ] Настроить jose для JWT (единственная библиотека)
- [ ] Создать единый логгер с requestId (`packages/logger/`)
- [ ] Реализовать `/health` и `/ready` endpoints во всех сервисах

**Агент:** Backend Dev  
**Playbook:** ENGINEERING_PLAYBOOK.md, разделы 6, 7

#### Общие задачи:
- [ ] Настроить сквозную трассировку (X-Request-Id)
- [ ] Настроить CORS политики

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 7

---

### Этап 0.8: Neon и данные

#### Backend задачи:
- [ ] Поднять Neon staging окружение
- [ ] Настроить Drizzle Kit для миграций
- [ ] Создать структуру миграций (SQL-файлы)
- [ ] Настроить PITR бэкапы
- [ ] Оформить rollback playbook

**Агент:** Backend Dev + DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 9

---

### Этап 0.9: Кэширование и алёрты

#### Backend задачи:
- [ ] Реализовать кэш-матрицу в Gateway (Cache-Control заголовки)
- [ ] Настроить Edge-кэш для публичных GET
- [ ] Написать тесты для проверки заголовков кеша

**Агент:** Backend Dev  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 8

#### DevOps задачи:
- [ ] Настроить Cloudflare Alerts (error rate, latency, availability)
- [ ] Создать базовые runbooks

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 6

---

## Фаза 1: Построение Core Backend Services

### Этап 1.1: Auth Service

#### Backend задачи:
- [ ] Реализовать приём вебхуков от Clerk
- [ ] Сохранение дополнительных полей профиля (реферальный код, роли)
- [ ] Эндпоинты: GET /profile, POST /profile/update
- [ ] Подготовить задел для админ-функций

**Агент:** Backend Dev (Auth)  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 7  
**OpenAPI:** Описать endpoints в `docs/openapi/auth.yaml`

---

### Этап 1.2: Content API Service (Агрегатор)

#### Backend задачи:
- [ ] **Важно:** Content API Service — это агрегатор/фасад, а не хранилище данных. Он объединяет данные из доменных сервисов (Atlas, Pulse, Media) в унифицированные фиды.
- [ ] Спроектировать унифицированные схемы для агрегации: EntityCard, UnifiedFeed
- [ ] REST API: GET /feed, GET /entities (агрегированные данные)
- [ ] Интеграция с Atlas/Pulse/Media Service через HTTP
- [ ] Базовые фильтры и пагинация
- [ ] Кэширование агрегированных результатов

**Агент:** Backend Dev (Content)  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 9  
**OpenAPI:** Описать endpoints в `docs/openapi/content.yaml`

---

### Этап 1.3: Referral Service

#### Backend задачи:
- [ ] Генерация реферальных кодов
- [ ] Отслеживание связей "кто кого пригласил"
- [ ] Начисление базовых бонусов (через Token Service)
- [ ] API: GET /referrals/tree, POST /referrals/register

**Агент:** Backend Dev (Referral)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/referral.yaml`

---

### Этап 1.4: Token Service (базовый — только Points)

#### Backend задачи:
- [ ] **Важно:** В Фазе 1 реализуем только базовый Token Service для Points. Points Service и NFT Service будут созданы позже (Фаза 3).
- [ ] Модель хранения баланса Points
- [ ] Таблица транзакций (начисление, списание)
- [ ] Определение событий для начисления Points
- [ ] API: GET /balance (Points), POST /add (Points), POST /subtract (Points)
- [ ] Идемпотентность транзакций
- [ ] Подготовка архитектуры для расширения на G2A и NFT в Фазе 3

**Агент:** Backend Dev (Token)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/token.yaml`

---

### Этап 1.5: Atlas Service (MVP)

#### Backend задачи:
- [ ] **Важно:** Atlas Service — доменный сервис, владеет данными о локациях. Content API Service агрегирует эти данные.
- [ ] Миграции для стран, городов, мест
- [ ] API: GET /countries, /cities, /places
- [ ] Поиск по местам: GET /search?q=...
- [ ] Предоставление данных для Content API Service (через HTTP)

**Агент:** Backend Dev (Atlas)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/atlas.yaml`

---

### Этап 1.6: Pulse Service (MVP)

#### Backend задачи:
- [ ] Миграции для событий
- [ ] API: GET /events, /events/nearby
- [ ] Фильтрация по дате, локации, категории
- [ ] Интеграция с Atlas для мест проведения

**Агент:** Backend Dev (Pulse)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/pulse.yaml`

---

### Этап 1.7: Media/Blog Service (MVP)

#### Backend задачи:
- [ ] Миграции для статей
- [ ] API: GET /articles, /articles/:slug
- [ ] Категории и теги
- [ ] Поддержка SSR/SSG данных

**Агент:** Backend Dev (Media)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/media.yaml`

---

## Фаза 2: MVP UI-модулей

### Этап 2.1: Atlas UI Feature Capsule

#### Frontend задачи:
- [ ] Создать структуру `features/atlas-ui/`
  - [ ] `components/`: CountryCard, CityCard, PlaceCard
  - [ ] `hooks/`: useCountries, useCities, usePlaces
  - [ ] `types/`: Country, City, Place
  - [ ] `pages/`: AtlasOverviewPage, CountryDetailsPage, PlaceDetailsPage
- [ ] Интеграция с Atlas Service API через SDK
- [ ] Применить UX-паттерны из FRONTEND_PLAYBOOK.md

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, разделы 2, 3, 4, 5  
**Референс:** Изучить `capsules/frontend-shell/` для UX-паттернов

#### Интеграция:
- [ ] Добавить роуты в App Router: `/atlas`, `/atlas/countries/:id`, `/atlas/places/:id`
- [ ] Настроить SSR для публичных страниц

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 2

---

### Этап 2.2: Pulse UI Feature Capsule

#### Frontend задачи:
- [ ] Создать структуру `features/pulse-ui/`
  - [ ] `components/`: EventCard, EventFilters
  - [ ] `hooks/`: useEvents, useEventDetails
  - [ ] `types/`: Event
  - [ ] `pages/`: PulseOverviewPage, EventDetailsPage
- [ ] Интеграция с Pulse Service API
- [ ] Применить карточный паттерн EventCard

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, разделы 2, 5.2

---

### Этап 2.3: Blog UI Feature Capsule

#### Frontend задачи:
- [ ] Создать структуру `features/blog-ui/`
  - [ ] `components/`: ArticleCard, ArticleContent
  - [ ] `hooks/`: useArticles, useArticle
  - [ ] `types/`: Article
  - [ ] `pages/`: BlogOverviewPage, ArticlePage (SSR)
- [ ] Интеграция с Media Service API
- [ ] Настроить SSR/SSG для SEO

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, разделы 2, 5.3

---

### Этап 2.4: Интеграция модулей в PWA Shell

#### Frontend задачи:
- [ ] Добавить роуты в App Router: `/atlas`, `/pulse`, `/blog`
- [ ] Настроить навигацию между модулями
- [ ] Реализовать единый стиль карточек
- [ ] Настроить переходы между модулями (deeplinks)

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 2

---

### Этап 2.5: Базовый Connect UI

#### Frontend задачи:
- [ ] Страница баланса Points: `/connect`
- [ ] История транзакций
- [ ] Реферальная статистика (базовая)
- [ ] Интеграция с Token + Referral Service

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md

---

## Фаза 3: Интеграция токенов и бизнес-логики

### Этап 3.1: Space Service + UI

#### Backend задачи:
- [ ] **Важно:** Content Service здесь — это доменный сервис для социального контента Space (посты, комментарии), не путать с Content API Service из Фазы 1.
- [ ] Content Service (Space): модели Post, Comment — доменный сервис, владеет данными
- [ ] Feed Service: формирование персональных лент из Content Service
- [ ] Reactions Service: универсальная система реакций
- [ ] API: POST /posts, GET /feed, POST /reactions

**Агент:** Backend Dev (Space)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/space.yaml`

#### Frontend задачи:
- [ ] Space UI Feature Capsule
- [ ] Компоненты: PostCard, Feed, Reactions
- [ ] Интеграция с Content + Feed + Reactions Service

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 5.7

---

### Этап 3.2: Quest Service + UI

#### Backend задачи:
- [ ] Модели Quest, Mission, QuestProgress
- [ ] API: POST /quests (PRO), POST /quests/:id/start, POST /quests/:id/complete
- [ ] Интеграция с Atlas/Pulse/RF для точек квестов
- [ ] Интеграция с Token Service для наград

**Агент:** Backend Dev (Quest)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/quest.yaml`

#### Frontend задачи:
- [ ] Quest UI Feature Capsule
- [ ] Компоненты: QuestCard, QuestProgress, MissionList
- [ ] Страницы: QuestListPage, QuestDetailsPage, QuestPlayPage

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 5.6

---

### Этап 3.3: RF Service + UI

#### Backend задачи:
- [ ] Модели Partner, Voucher
- [ ] Voucher Service: создание, выдача, погашение
- [ ] API: GET /partners, POST /vouchers, POST /vouchers/:id/redeem
- [ ] Интеграция с Atlas для мест

**Агент:** Backend Dev (RF)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/rf.yaml`

#### Frontend задачи:
- [ ] RF UI Feature Capsule
- [ ] Компоненты: PartnerCard, VoucherCard
- [ ] Страницы: RFOverviewPage, PartnerDetailsPage
- [ ] Личный кабинет партнёра (базовый)

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 5.4

---

### Этап 3.4: Rielt Service + UI

#### Backend задачи:
- [ ] Модели Listing, RentRequest
- [ ] API: GET /listings, GET /listings/nearby, POST /listings
- [ ] Интеграция с Atlas для геоданных

**Агент:** Backend Dev (Rielt)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/rielt.yaml`

#### Frontend задачи:
- [ ] Rielt UI Feature Capsule
- [ ] Компоненты: ListingCard
- [ ] Страницы: RieltOverviewPage, ListingDetailsPage

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 5.5

---

### Этап 3.5: Guru Service + UI

#### Backend задачи:
- [ ] Агрегация данных из всех сервисов
- [ ] Нормализация в EntityCard формат
- [ ] Ранжирование и фильтрация
- [ ] API: GET /nearby?lat=...&lng=...

**Агент:** Backend Dev (Guru)  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/guru.yaml`

#### Frontend задачи:
- [ ] Guru UI Feature Capsule
- [ ] Компоненты: MapView, EntityCard, NearbyList
- [ ] Страницы: GuruOverviewPage
- [ ] Геолокация и кэширование

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md

---

### Этап 3.6: Расширение Token Service и выделение специализированных сервисов

#### Backend задачи:
- [ ] **Разделение зон ответственности:**
  - **Token Service:** Агрегированный view по всем токенам (Points, G2A, NFT), бизнес-правила, конвертации
  - **Points Service:** Выделяется для частых микротранзакций баллов (оптимизация нагрузки)
  - **NFT Service:** Управление Local NFT (off-chain), интеграция с Blockchain Gateway для on-chain NFT
- [ ] Поддержка G2A токенов (off-chain) в Token Service
- [ ] Конвертация Points → G2A через Token Service
- [ ] Создание NFT Service: управление Local NFT-бейджами
- [ ] Правила начислений для всех событий (централизованы в Token Service)
- [ ] API: POST /convert/points-to-g2a, GET /nfts

**Агент:** Backend Dev (Token)  
**Playbook:** ENGINEERING_PLAYBOOK.md, tokenomics.md  
**OpenAPI:** Обновить `docs/openapi/token.yaml`, создать `docs/openapi/nft.yaml`

---

### Этап 3.7: Blockchain Gateway (базовый)

#### Backend задачи:
- [ ] Интеграция с TON SDK
- [ ] Mint G2A токенов: POST /g2a/mint
- [ ] Mint NFT: POST /nft/mint
- [ ] Отслеживание транзакций: GET /tx/:id/status
- [ ] Безопасное хранение ключей (HSM/Vault)

**Агент:** Backend Dev (Blockchain)  
**Playbook:** ENGINEERING_PLAYBOOK.md, tokenomics.md, backend_microservice.md  
**OpenAPI:** Описать endpoints в `docs/openapi/blockchain.yaml`

---

### Этап 3.8: Монетизация VIP/PRO

#### Backend задачи:
- [ ] Интеграция рублёвого эквайринга
- [ ] Покупка VIP (1000 ₽/мес): POST /subscriptions/vip
- [ ] Покупка PRO (30000 ₽/год): POST /subscriptions/pro
- [ ] Применение преимуществ в токеномике
- [ ] Обновление ролей в User Service

**Агент:** Backend Dev (Auth + Token)  
**Playbook:** ENGINEERING_PLAYBOOK.md, user_roles.md

#### Frontend задачи:
- [ ] Интерфейсы покупки статусов: `/connect/status`
- [ ] Отображение VIP/PRO бейджей в Space
- [ ] Управление статусами

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md

---

## Фаза 4: Полная экосистема

### Этап 4.1: Edge-функции

#### Backend задачи:
- [ ] Вынос нагруженных задач на Cloudflare Workers
- [ ] Кэширование популярных запросов на Edge
- [ ] JWT-валидация на Edge
- [ ] Оптимизация Guru Service через Edge

**Агент:** Backend Dev + DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 10

---

### Этап 4.2: Масштабирование Neon

#### DevOps задачи:
- [ ] **Важно:** Neon уже используется с Фазы 0 (staging). В Фазе 4 масштабируем существующую инфраструктуру.
- [ ] Настройка production Neon кластера (serverless Postgres)
- [ ] Настройка репликации и бэкапов для production
- [ ] Внедрение Redis для кэша (снижение нагрузки на Neon)
- [ ] Масштабирование поискового движка (Meilisearch/Elastic)
- [ ] Оптимизация запросов и индексов для больших объёмов данных

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 9

---

### Этап 4.3: Оптимизация фронтенда

#### Frontend задачи:
- [ ] Cloudflare Image Resizing
- [ ] Длинное кэширование статики
- [ ] Минимизация и разделение бандлов
- [ ] Оптимизация изображений (WebP, lazy loading)

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md, раздел 3

---

### Этап 4.4: Усиление безопасности

#### Backend задачи:
- [ ] JWT-авторизация на Edge
- [ ] Rate Limiting и Bot Management
- [ ] Полный аудит безопасности

**Агент:** Backend Dev + Security Specialist  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 7

---

### Этап 4.5: Рефакторинг и технический долг

#### Backend задачи:
- [ ] Замена временных заглушек
- [ ] Оптимизация тяжёлых запросов БД
- [ ] Повышение устойчивости микросервисов

**Агент:** Backend Dev  
**Playbook:** ENGINEERING_PLAYBOOK.md

#### Frontend задачи:
- [ ] Обновление контрактной типизации
- [ ] Оптимизация компонентов

**Агент:** Frontend Dev  
**Playbook:** FRONTEND_PLAYBOOK.md

---

### Этап 4.6: Расширенная аналитика и Notification Service

#### DevOps задачи:
- [ ] Централизованный сбор логов (ClickHouse)
- [ ] Метрики через Prometheus/Grafana
- [ ] Дашборды для команды
- [ ] Алерты на ключевые показатели

**Агент:** DevOps Engineer  
**Playbook:** ENGINEERING_PLAYBOOK.md, раздел 6

#### Backend задачи:
- [ ] Notification Service: базовая реализация
  - [ ] Email уведомления (через SendGrid/SES)
  - [ ] Push уведомления (OneSignal/FCM)
  - [ ] Telegram webhook wrapper
  - [ ] API: POST /notifications/send

**Агент:** Backend Dev  
**Playbook:** ENGINEERING_PLAYBOOK.md  
**OpenAPI:** Описать endpoints в `docs/openapi/notification.yaml`

---

### Этап 4.7: Финальное тестирование

#### QA задачи:
- [ ] Регрессионное тестирование всех сценариев
- [ ] Нагрузочные тесты
- [ ] Penetration tests

**Агент:** QA  
**Playbook:** ENGINEERING_PLAYBOOK.md

---

### Этап 4.8: Документация

#### Технический писатель задачи:
- [ ] User Guide для пользователей
- [ ] Developer Documentation
- [ ] API Reference
- [ ] Deployment Guide
- [ ] Security Whitepaper

**Агент:** Tech Writer  
**Playbook:** Общие стандарты документации

---

## Правила работы агентов

### Общие принципы:
1. **Не придумывать ничего нового** — использовать документацию как источник истины
2. **Следовать Playbooks** — ENGINEERING_PLAYBOOK и FRONTEND_PLAYBOOK обязательны
3. **OpenAPI-first** — любые изменения API начинаются с OpenAPI спецификации
4. **Проверка типов** — CI должен проверять соответствие сгенерированных типов

### Для Backend агентов:
- Использовать только утверждённый стек (ENGINEERING_PLAYBOOK, раздел 3)
- Только `jose` для JWT
- Все миграции через Drizzle Kit, SQL-файлы в репо
- Health endpoints обязательны

### Для Frontend агентов:
- Использовать Feature Capsules архитектуру (FRONTEND_PLAYBOOK, раздел 2)
- Применять UX-паттерны из Playbook (раздел 4)
- Использовать дизайн-систему из `packages/ui`
- Референс: `capsules/frontend-shell/` для UX, но не для кода

### Для DevOps агентов:
- Следовать CI/CD процессу (ENGINEERING_PLAYBOOK, раздел 5)
- Настраивать observability с первого дня (раздел 6)
- Проверять кэш-политику (раздел 8)

---

## Чек-листы готовности для каждой фазы

### Фаза 0:
- [ ] Монорепо настроен
- [ ] OpenAPI спецификации готовы
- [ ] CI/CD работает
- [ ] Health endpoints работают
- [ ] Кэш-политика зафиксирована

### Фаза 1:
- [ ] Все базовые сервисы запущены
- [ ] OpenAPI обновлены, типы сгенерированы
- [ ] Миграции применены
- [ ] Тесты пройдены

### Фаза 2:
- [ ] UI модули работают в PWA Shell
- [ ] Данные загружаются из API
- [ ] SSR/SSG работает
- [ ] Lighthouse ≥ 85

### Фаза 3:
- [ ] Все модули интегрированы
- [ ] Токеномика функционирует
- [ ] Blockchain Gateway подключён
- [ ] VIP/PRO статусы работают

### Фаза 4:
- [ ] Производительность соответствует NFR
- [ ] Безопасность проверена
- [ ] Масштабируемость обеспечена
- [ ] Документация готова

---

**Документ подготовлен:** AI Assistant (Composer)  
**Основан на:** ENGINEERING_PLAYBOOK, FRONTEND_PLAYBOOK, IMPLEMENTATION_PLAN_V1

