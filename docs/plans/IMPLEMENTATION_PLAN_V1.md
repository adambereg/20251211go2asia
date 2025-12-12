# Implementation Plan v1.0 — Go2Asia v2

**Дата создания:** 2025-12-11  
**Версия:** 1.0  
**Статус:** Утверждено

---

## Обзор плана

План реализации Go2Asia v2 разбит на 5 фаз от начальной инфраструктуры до полной экосистемы. Каждая фаза имеет чёткие входные критерии, задачи и выходные критерии готовности.

**Общая длительность:** ~16-20 недель (4-5 месяцев)  
**Подход:** Мультиагентная разработка с параллельной работой над модулями

---

## Фаза 0: Bootstrap + Архитектура монорепо

**Цель:** Заложить прочный фундамент проекта с чистыми контрактами и готовностью к масштабированию.

**Длительность:** 1-2 недели

### Входные критерии:
- ✅ Репозиторий инициализирован
- ✅ Команда определена (мультиагентная модель)

### Задачи:

#### 0.1 Инициализация монорепо
- [ ] Настроить структуру: `apps/`, `services/`, `packages/`, `docs/`
- [ ] Настроить pnpm + Turborepo
- [ ] Создать базовые конфиги (TypeScript, ESLint, Prettier)
- [ ] Настроить Git hooks (lint-staged, commitlint)

#### 0.2 OpenAPI каркас
- [ ] Описать базовую структуру OpenAPI (`docs/openapi/openapi.yaml`)
- [ ] Настроить Orval для генерации типов и SDK
- [ ] Создать скрипты: `gen:types`, `gen:sdk`, `validate:openapi`
- [ ] Интегрировать проверку в CI

#### 0.3 CI/CD Pipeline
- [ ] Настроить GitHub Actions для PR: lint, typecheck, build
- [ ] Добавить проверку OpenAPI (spectral)
- [ ] Настроить генерацию типов/SDK с проверкой diffs
- [ ] Настроить preview deployments на Netlify
- [ ] Настроить автоматический деплой в staging

#### 0.4 Облачная инфраструктура
- [ ] Зарегистрировать домен go2asia.space
- [ ] Настроить DNS через Cloudflare
- [ ] Включить Cloudflare CDN и WAF
- [ ] Подключить Cloudflare R2 для медиа
- [ ] Инициализировать Cloudflare Workers (пустые)

#### 0.5 Единая аутентификация (SSO)
- [ ] Интегрировать Clerk
- [ ] Настроить redirect URI для *.go2asia.space
- [ ] Определить роли пользователей в Clerk
- [ ] Подключить Clerk SDK во все модули

#### 0.6 Каркас PWA Shell
- [ ] Создать Next.js 15 приложение (App Router)
- [ ] Настроить базовую навигацию и layout
- [ ] Реализовать PWA Manifest
- [ ] Настроить Service Worker (Workbox)
- [ ] Подготовить структуру для Feature Capsules

#### 0.7 Безопасность и логирование
- [ ] Внедрить Zod-валидацию в Gateway
- [ ] Настроить jose для JWT (единственная библиотека)
- [ ] Создать единый логгер с requestId
- [ ] Реализовать `/health` и `/ready` endpoints
- [ ] Настроить сквозную трассировку (X-Request-Id)

#### 0.8 Neon и данные
- [ ] Поднять Neon staging окружение
- [ ] Настроить Drizzle Kit для миграций
- [ ] Создать структуру миграций (SQL-файлы)
- [ ] Настроить PITR бэкапы
- [ ] Оформить rollback playbook

#### 0.9 Кэширование и алёрты
- [ ] Реализовать кэш-матрицу в Gateway (Cache-Control заголовки)
- [ ] Настроить Edge-кэш для публичных GET
- [ ] Написать тесты для проверки заголовков кеша
- [ ] Настроить Cloudflare Alerts (error rate, latency, availability)
- [ ] Создать базовые runbooks

### Выходные критерии (Definition of Done):
- ✅ Единый монорепо со строгими капсулами
- ✅ OpenAPI-first: спецификации готовы, генерация работает
- ✅ CI/CD: превью-деплои, staging, contract-тесты
- ✅ Observability Day-1: логи, метрики, алёрты, health endpoints
- ✅ Базовая безопасность: jose для JWT, Zod-валидация, rate-limit
- ✅ Кэш-политика: зафиксирована и частично включена
- ✅ Neon: миграции, семена, бэкапы проверены
- ✅ PWA Shell: SSR/SSG готовность, базовый layout

---

## Фаза 1: Построение Core Backend Services

**Цель:** Реализовать базовые микросервисы и контентные модули для MVP.

**Длительность:** 3-4 недели

### Входные критерии:
- ✅ Фаза 0 завершена
- ✅ OpenAPI спецификации готовы

### Задачи:

#### 1.1 Auth Service
- [ ] Реализовать приём вебхуков от Clerk
- [ ] Сохранение дополнительных полей профиля (реферальный код, роли)
- [ ] Эндпоинты для получения JWT и информации о пользователе
- [ ] Подготовить задел для админ-функций

#### 1.2 Content API Service (Агрегатор)
- [ ] **Важно:** Content API Service — это агрегатор/фасад, а не хранилище данных. Он объединяет данные из доменных сервисов (Atlas, Pulse, Media) в унифицированные фиды.
- [ ] Спроектировать унифицированные схемы для агрегации: EntityCard, UnifiedFeed
- [ ] REST API для чтения агрегированных данных (GET /feed, GET /entities)
- [ ] Интеграция с Atlas/Pulse/Media Service через HTTP
- [ ] Базовые фильтры и пагинация
- [ ] Кэширование агрегированных результатов

#### 1.3 Referral Service
- [ ] Генерация реферальных кодов
- [ ] Отслеживание связей "кто кого пригласил"
- [ ] Начисление базовых бонусов (через Token Service)
- [ ] API для получения реферального дерева

#### 1.4 Token Service (базовый — только Points)
- [ ] **Важно:** В Фазе 1 реализуем только базовый Token Service для Points. Points Service и NFT Service будут созданы позже (Фаза 3).
- [ ] Модель хранения баланса Points
- [ ] Таблица транзакций (начисление, списание)
- [ ] Определение событий для начисления Points
- [ ] API: GET /balance (Points), POST /add (Points), POST /subtract (Points)
- [ ] Идемпотентность транзакций
- [ ] Подготовка архитектуры для расширения на G2A и NFT в Фазе 3

#### 1.5 Atlas Service (MVP)
- [ ] **Важно:** Atlas Service — доменный сервис, владеет данными о локациях. Content API Service агрегирует эти данные.
- [ ] Миграции для стран, городов, мест
- [ ] API: GET /countries, /cities, /places
- [ ] Поиск по местам
- [ ] Предоставление данных для Content API Service (через HTTP)

#### 1.6 Pulse Service (MVP)
- [ ] Миграции для событий
- [ ] API: GET /events, /events/nearby
- [ ] Фильтрация по дате, локации, категории
- [ ] Интеграция с Atlas для мест проведения

#### 1.7 Media/Blog Service (MVP)
- [ ] Миграции для статей
- [ ] API: GET /articles, /articles/:slug
- [ ] Категории и теги
- [ ] SSR/SSG для SEO

### Выходные критерии:
- ✅ Все базовые сервисы запущены и доступны через API Gateway
- ✅ OpenAPI спецификации обновлены и типы сгенерированы
- ✅ Миграции применены на staging
- ✅ Health endpoints работают
- ✅ Базовые тесты пройдены

---

## Фаза 2: MVP UI-модулей

**Цель:** Реализовать фронтенд-модули для контентных разделов и базовую интеграцию.

**Длительность:** 3-4 недели

### Входные критерии:
- ✅ Фаза 1 завершена
- ✅ Backend API работают

### Задачи:

#### 2.1 Atlas UI Feature Capsule
- [ ] Создать структуру `features/atlas-ui/`
- [ ] Компоненты: CountryCard, CityCard, PlaceCard
- [ ] Хуки: useCountries, useCities, usePlaces
- [ ] Страницы: Overview, Country Details, Place Details
- [ ] Интеграция с Atlas Service API

#### 2.2 Pulse UI Feature Capsule
- [ ] Создать структуру `features/pulse-ui/`
- [ ] Компоненты: EventCard, EventFilters
- [ ] Хуки: useEvents, useEventDetails
- [ ] Страницы: Events List, Event Details
- [ ] Интеграция с Pulse Service API

#### 2.3 Blog UI Feature Capsule
- [ ] Создать структуру `features/blog-ui/`
- [ ] Компоненты: ArticleCard, ArticleContent
- [ ] Хуки: useArticles, useArticle
- [ ] Страницы: Articles List, Article Page (SSR)
- [ ] Интеграция с Media Service API

#### 2.4 Интеграция модулей в PWA Shell
- [ ] Добавить роуты в App Router: `/atlas`, `/pulse`, `/blog`
- [ ] Настроить навигацию между модулями
- [ ] Реализовать единый стиль карточек
- [ ] Настроить переходы между модулями (deeplinks)

#### 2.5 Базовый Connect UI
- [ ] Страница баланса Points
- [ ] История транзакций
- [ ] Реферальная статистика (базовая)
- [ ] Интеграция с Token + Referral Service

### Выходные критерии:
- ✅ Три контентных модуля работают в PWA Shell
- ✅ Данные загружаются из реальных API
- ✅ SSR/SSG для публичных страниц работает
- ✅ Навигация между модулями бесшовная
- ✅ Lighthouse ≥ 85 (Performance, SEO, Best Practices)

---

## Фаза 3: Интеграция токенов и бизнес-логики

**Цель:** Внедрить полную токеномику, социальные функции и партнёрские программы.

**Длительность:** 4-5 недель

### Входные критерии:
- ✅ Фаза 2 завершена
- ✅ Базовые пользователи есть

### Задачи:

#### 3.1 Space Service + UI
- [ ] **Важно:** Content Service здесь — это доменный сервис для социального контента Space (посты, комментарии), не путать с Content API Service из Фазы 1.
- [ ] Content Service (Space): модели Post, Comment — доменный сервис, владеет данными
- [ ] Feed Service: формирование персональных лент из Content Service
- [ ] Reactions Service: универсальная система реакций
- [ ] Space UI Feature Capsule
- [ ] Интеграция с Token Service для начисления Points

#### 3.2 Quest Service + UI
- [ ] Модели Quest, Mission, QuestProgress
- [ ] API: создание квестов (PRO), прохождение, награды
- [ ] Quest UI Feature Capsule
- [ ] Интеграция с Atlas/Pulse/RF для точек квестов
- [ ] Интеграция с Token Service для наград

#### 3.3 RF Service + UI
- [ ] Модели Partner, Voucher
- [ ] Voucher Service: создание, выдача, погашение
- [ ] RF UI Feature Capsule (каталог партнёров)
- [ ] Личный кабинет партнёра (базовый)
- [ ] Интеграция с Atlas для мест

#### 3.4 Rielt Service + UI
- [ ] Модели Listing, RentRequest
- [ ] API: поиск жилья, создание объявлений
- [ ] Rielt UI Feature Capsule
- [ ] Интеграция с Atlas для геоданных

#### 3.5 Guru Service + UI
- [ ] Агрегация данных из всех сервисов
- [ ] Нормализация в EntityCard формат
- [ ] Ранжирование и фильтрация
- [ ] Guru UI Feature Capsule (карта + список)
- [ ] Геолокация и кэширование

#### 3.6 Расширение Token Service и выделение специализированных сервисов
- [ ] **Разделение зон ответственности:**
  - **Token Service:** Агрегированный view по всем токенам (Points, G2A, NFT), бизнес-правила, конвертации
  - **Points Service:** Выделяется для частых микротранзакций баллов (оптимизация нагрузки)
  - **NFT Service:** Управление Local NFT (off-chain), интеграция с Blockchain Gateway для on-chain NFT
- [ ] Поддержка G2A токенов (off-chain) в Token Service
- [ ] Конвертация Points → G2A через Token Service
- [ ] Создание NFT Service: управление Local NFT-бейджами
- [ ] Правила начислений для всех событий (централизованы в Token Service)

#### 3.7 Blockchain Gateway (базовый)
- [ ] Интеграция с TON SDK
- [ ] Mint G2A токенов
- [ ] Mint NFT
- [ ] Отслеживание транзакций
- [ ] Безопасное хранение ключей (HSM/Vault)

#### 3.8 Монетизация VIP/PRO
- [ ] Интеграция рублёвого эквайринга
- [ ] Покупка VIP (1000 ₽/мес)
- [ ] Покупка PRO (30000 ₽/год)
- [ ] Применение преимуществ в токеномике
- [ ] Интерфейсы покупки и управления статусами

### Выходные критерии:
- ✅ Все модули работают и интегрированы
- ✅ Токеномика функционирует (Points → NFT → G2A)
- ✅ Blockchain Gateway подключён к TON testnet
- ✅ VIP/PRO статусы работают
- ✅ Реферальная система расширена до 2 уровней

---

## Фаза 4: Полная экосистема

**Цель:** Оптимизация, масштабирование и финальная полировка перед релизом.

**Длительность:** 3-4 недели

### Входные критерии:
- ✅ Фаза 3 завершена
- ✅ Все модули интегрированы

### Задачи:

#### 4.1 Edge-функции
- [ ] Вынос нагруженных задач на Cloudflare Workers
- [ ] Кэширование популярных запросов на Edge
- [ ] JWT-валидация на Edge
- [ ] Оптимизация Guru Service через Edge

#### 4.2 Масштабирование Neon
- [ ] **Важно:** Neon уже используется с Фазы 0 (staging). В Фазе 4 масштабируем существующую инфраструктуру.
- [ ] Настройка production Neon кластера (serverless Postgres)
- [ ] Настройка репликации и бэкапов для production
- [ ] Внедрение Redis для кэша (снижение нагрузки на Neon)
- [ ] Масштабирование поискового движка (Meilisearch/Elastic)
- [ ] Оптимизация запросов и индексов для больших объёмов данных

#### 4.3 Оптимизация фронтенда
- [ ] Cloudflare Image Resizing
- [ ] Длинное кэширование статики
- [ ] Минимизация и разделение бандлов
- [ ] Оптимизация изображений (WebP, lazy loading)

#### 4.4 Усиление безопасности
- [ ] JWT-авторизация на Edge
- [ ] Rate Limiting и Bot Management
- [ ] Полный аудит безопасности
- [ ] CSP, HSTS, Security Headers

#### 4.5 Рефакторинг и технический долг
- [ ] Замена временных заглушек
- [ ] Оптимизация тяжёлых запросов БД
- [ ] Повышение устойчивости микросервисов
- [ ] Обновление контрактной типизации

#### 4.6 Расширенная аналитика и Notification Service
- [ ] Централизованный сбор логов (ClickHouse)
- [ ] Метрики через Prometheus/Grafana
- [ ] Дашборды для команды
- [ ] Алерты на ключевые показатели
- [ ] Notification Service: базовая реализация (email, push через OneSignal/FCM, Telegram webhook wrapper)

#### 4.7 Финальное тестирование
- [ ] Регрессионное тестирование всех сценариев
- [ ] Нагрузочные тесты
- [ ] Penetration tests
- [ ] Окончательный аудит безопасности

#### 4.8 Документация
- [ ] User Guide для пользователей
- [ ] Developer Documentation
- [ ] API Reference
- [ ] Deployment Guide
- [ ] Security Whitepaper

### Выходные критерии:
- ✅ Производительность соответствует NFR
- ✅ Безопасность проверена и усилена
- ✅ Масштабируемость обеспечена
- ✅ Документация готова
- ✅ Все тесты пройдены

---

## Зависимости между фазами

### Критичные зависимости:
1. **Фаза 0 → Фаза 1:** Без монорепо и CI/CD невозможна эффективная разработка
2. **Фаза 1 → Фаза 2:** Frontend требует работающие API
3. **Фаза 2 → Фаза 3:** Социальные функции требуют базовых пользователей
4. **Фаза 3 → Фаза 4:** Оптимизация требует реальной нагрузки

### Параллельные возможности:
- В Фазе 1: Atlas, Pulse, Blog Service могут разрабатываться параллельно
- В Фазе 2: UI модули могут создаваться независимо
- В Фазе 3: Space, Quest, RF, Rielt могут разрабатываться параллельно

---

## Предлагаемая структура репозитория

```
go2asia-monorepo/
├── apps/
│   ├── go2asia-pwa-shell/     # Next.js 15 App Shell
│   └── api-gateway/           # Cloudflare Worker
├── services/
│   ├── auth-service/          # Cloudflare Worker
│   ├── atlas-service/         # Cloudflare Worker
│   ├── pulse-service/         # Cloudflare Worker
│   ├── content-service/       # Cloudflare Worker
│   ├── media-service/         # Cloudflare Worker
│   ├── guru-service/          # Cloudflare Worker
│   ├── rf-service/            # Cloudflare Worker
│   ├── voucher-service/       # Cloudflare Worker
│   ├── rielt-service/         # Cloudflare Worker
│   ├── quest-service/         # Cloudflare Worker
│   ├── referral-service/      # Cloudflare Worker
│   ├── token-service/         # Cloudflare Worker
│   ├── points-service/        # Cloudflare Worker
│   ├── nft-service/           # Cloudflare Worker
│   ├── blockchain-gateway/    # Cloudflare Worker
│   ├── notification-service/   # Cloudflare Worker
│   └── reactions-service/     # Cloudflare Worker
├── packages/
│   ├── ui/                    # Shared UI компоненты
│   ├── design-system/         # Дизайн-система
│   ├── types/                 # Автогенерируемые типы из OpenAPI
│   ├── sdk/                   # Автогенерируемый SDK
│   ├── config/                # ESLint, TSConfig, Prettier
│   ├── logger/                # Единый логгер + requestId
│   └── schemas/               # Zod-схемы
├── apps/go2asia-pwa-shell/
│   └── features/              # Feature Capsules
│       ├── atlas-ui/
│       ├── pulse-ui/
│       ├── blog-ui/
│       ├── guru-ui/
│       ├── space-ui/
│       ├── quest-ui/
│       ├── rf-ui/
│       ├── rielt-ui/
│       └── connect-ui/
└── docs/
    ├── openapi/               # OpenAPI спецификации
    ├── ops/                   # Runbooks, SLO/SLA
    └── architecture/          # Архитектурные документы
```

---

## Какие капсулы открывать и когда

### Фаза 0:
- ✅ `packages/ui` — базовые компоненты
- ✅ `packages/design-system` — дизайн-токены
- ✅ `packages/types` — автогенерируемые типы
- ✅ `packages/sdk` — автогенерируемый SDK

### Фаза 1:
- ✅ `services/auth-service`
- ✅ `services/content-service`
- ✅ `services/referral-service`
- ✅ `services/token-service`
- ✅ `services/atlas-service`
- ✅ `services/pulse-service`
- ✅ `services/media-service`

### Фаза 2:
- ✅ `features/atlas-ui`
- ✅ `features/pulse-ui`
- ✅ `features/blog-ui`
- ✅ `features/connect-ui` (базовый)

### Фаза 3:
- ✅ `services/space-service` (Content + Feed + Reactions)
- ✅ `services/quest-service`
- ✅ `services/rf-service`
- ✅ `services/voucher-service`
- ✅ `services/rielt-service`
- ✅ `services/guru-service`
- ✅ `services/points-service`
- ✅ `services/nft-service`
- ✅ `services/blockchain-gateway`
- ✅ `features/space-ui`
- ✅ `features/quest-ui`
- ✅ `features/rf-ui`
- ✅ `features/rielt-ui`
- ✅ `features/guru-ui`

### Фаза 4:
- ✅ Оптимизация всех существующих капсул
- ✅ Дополнительные пакеты для аналитики и мониторинга

---

## Метрики прогресса

### Фаза 0:
- Количество настроенных инструментов: 9/9
- Процент покрытия CI/CD: 100%

### Фаза 1:
- Количество реализованных сервисов: 7/7
- Процент покрытия OpenAPI: 100%

### Фаза 2:
- Количество реализованных UI модулей: 4/4
- Lighthouse Score: ≥ 85

### Фаза 3:
- Количество реализованных модулей: 9/9
- Процент интеграций: 100%

### Фаза 4:
- Производительность: соответствует NFR
- Безопасность: аудит пройден

---

## Риски и митигация

### Технические риски:
1. **Сложность микросервисов** → Чёткие контракты через OpenAPI, документация
2. **Производительность агрегации** → Кэширование, Edge-функции с Фазы 0
3. **Блокчейн-интеграция** → Тестирование на testnet перед mainnet

### Временные риски:
1. **Задержки в разработке** → Параллельная работа агентов, приоритизация
2. **Изменение требований** → Гибкая архитектура, версионирование API

### Операционные риски:
1. **Масштабирование инфраструктуры** → План миграции на Neon с Фазы 0
2. **Координация команды** → Мультиагентная модель, чёткие playbooks

---

**Документ подготовлен:** AI Assistant (Composer)  
**Основан на:** ENGINEERING_PLAYBOOK, roadmap, PROJECT_UNDERSTANDING_SUMMARY

