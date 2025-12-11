Обзор инфраструктуры экосистемы Go2Asia

Этот документ описывает реальную, актуальную и используемую инфраструктуру платформы Go2Asia, основанную на:
•	Netlify — фронтенд, PWA Shell, Edge Functions
•	Cloudflare Workers — API Gateway, routing, protection
•	GitHub Actions — CI/CD для backend
•	Neon — PostgreSQL база данных для всех микросервисов
•	Clerk — аутентификация и управление пользователями
•	Object Storage (S3-совместимое) — хранение медиа
•	TON Blockchain (фаза 2) — ончейн-токеномика через Blockchain Gateway
Документ отражает текущую архитектуру Go2Asia, внедрённую в проект, без ссылок на Yandex.Cloud или любые резервные контуры, которые не используются.
________________________________________
1. Основные принципы инфраструктуры
1.1. Микросервисная архитектура
Каждый сервис (Atlas, Pulse, Quest, Rielt, Connect, Points, NFT и т. д.) работает независимо, имеет своё хранилище, CI/CD и API.

1.2. Edge-first архитектура
Все запросы сначала проходят через Edge-слой Netlify/Cloudflare.

1.3. API Gateway на Cloudflare
Обеспечивает:
•	маршрутизацию,
•	rate limiting,
•	защиту,
•	авторизацию,
•	кэширование.

1.4. Серверлесс-модель бэкенда
Микросервисы выполняются как:
•	Cloudflare Workers
•	Netlify Functions

1.5. Независимые базы данных
Neon Postgres используется как кластер, где каждый микросервис получает свою схему или отдельную БД.

1.6. Наблюдаемость, логирование и метрики — встроены
Через Logging & Analytics Service + внешние тулзы.

1.7. CI/CD автоматизирован
GitHub Actions управляет сборкой, тестами и развёртыванием backend-сервисов.

1.8. Минимизация периметра безопасности
Публичные API — только через Gateway.
Все внутренние сервисы — по сервисным токенам.
________________________________________
2. Общая схема инфраструктуры
              ┌──────────────────────────┐
              │        PWA Shell         │
              │  Next.js (Netlify Edge)  │
              └─────────────┬────────────┘
                            │
                Netlify Edge Middleware
                            │
                  Cloudflare API Gateway
           (Routing • Rate Limits • Auth • Security)
                            │
          ┌─────────────────┴──────────────────┐
          │        Backend Microservices       │
          │ (Cloudflare Workers / Netlify Fn)  │
          └───────────────┬───────────┬────────┘
                          │           │
               Neon Postgres       Object Storage
                          │           │
               Tokenomics Cluster (Phase 2)
          Connect • Points • NFT • Blockchain Gateway
                          │
                       TON Blockchain
________________________________________
3. Хостинг и окружения
3.1. Frontend (PWA Shell)
Netlify:
•	Хостинг Next.js
•	Static + SSR + Edge middleware
•	CDN кеширование
•	Интеграция с GitHub

3.2. Backend
Backend выполняется в двух средах:
Cloudflare Workers
•	API Gateway
•	Лёгкие микросервисы
•	Edge routing и security
•	WEB API с минимальной задержкой
Netlify Functions
•	Микросервисы, требующие Node-среду
•	Более комплексные операции
•	Доступ к Neon через Node-пул
________________________________________
4. Окружения (Environments)
Development
•	Автодеплой из feature-веток
•	Полный доступ к логам
•	Используется для работы Cursor
Staging
•	Ручные approve для деплоя
•	Интеграционные тесты
•	Smoke/Contract testing
Production
•	Cloudflare + Netlify глобальная сеть
•	Кэширование на Edge
•	Ограниченные логи
________________________________________
5. API Gateway Layer — Cloudflare Workers
Gateway выполняет:
✔ JWT-валидацию (через Clerk)
✔ маршрутизацию запросов
✔ rate limiting
✔ проверку прав доступа
✔ защиту от DDoS
✔ кэширование ответов
✔ удаление чувствительных заголовков
Gateway никогда не содержит бизнес-логики — только сетевую инфраструктуру.
________________________________________
6. Data Layer — Neon PostgreSQL
Neon — современная облачная Postgres-платформа, обеспечивающая:
•	мгновенное масштабирование
•	независимые схемы для каждого микросервиса
•	поддержку read replicas в будущем
•	низкие задержки
•	удобную интеграцию с drizzle ORM / prisma
Принцип «одна БД на сервис» реализуется через несколько схем в кластере Neon.
________________________________________
7. Взаимодействие сервисов
Связь между микросервисами осуществляется через:
•	HTTP API (через Gateway)
•	События (event-based подход)
•	Webhooks между внутренними сервисами
Сервисы не имеют прямого доступа к БД друг друга.
________________________________________
8. Токеномика и Blockchain Layer
Текущий статус:
•	В Phase 1 используется только Points (оффчейн)
•	В Phase 2 запускается:
o	Connect Service
o	G2A токен (on-chain)
o	NFT Service
o	Blockchain Gateway Service
Blockchain Gateway подключается к TON blockchain и обеспечивает:
•	mint/burn/transfer G2A
•	mint/upgrade NFT
•	кастодиальные кошельки
________________________________________
9. Logging, Monitoring, Observability
Используются:
Logging
•	Central Logging Service (собственная реализация)
•	Структурированные JSON-логи
Tracing
•	OpenTelemetry
•	Distributed Tracing Service
Metrics
•	Prometheus-compatible exporter (Phase 2)
•	Grafana dashboards
Alerts
•	Email / Telegram (DevOps)
________________________________________
10. CI/CD — GitHub Actions
Pipeline:
Commit → Lint → Tests → Build → Deploy Preview (Netlify)
PR → Checks → Merge → Deploy backend (Cloudflare/Netlify)
Staging → Manual approve → Production deployment
Backend деплоится автоматом через GitHub Actions → Cloudflare API / Netlify API.
________________________________________
11. Authentication — Clerk
Clerk обеспечивает:
•	email/password auth
•	social OAuth
•	session tokens
•	service tokens
•	webhooks
•	secure JWT для Gateway
Clerk = единый источник истины по пользователям.
________________________________________
12. Media Layer
Медиа-файлы (фото мест, постов, профилей) хранятся в:
•	S3-совместимом Object Storage (в Phase 1 — Supabase Storage / AWS S3 / Cloudflare R2)
•	CDN-доставка через Cloudflare
________________________________________
13. Интеграции
•	OneSignal — push-уведомления
•	Netlify Email / Postmark — email-рассылки
•	TON — on-chain операции
•	OSM/Mapbox — карты
•	Mixpanel (Phase 2) — аналитика поведения
________________________________________
14. Резюме
Инфраструктура Go2Asia основана на:
•	Netlify
•	Cloudflare
•	Neon PostgreSQL
•	GitHub Actions
•	Clerk
•	Object Storage
•	TON blockchain
Yandex.Cloud полностью исключён.
Техническая архитектура теперь соответствует реальному, используемому стеку Go2Asia и готова для интеграции в мультиагентную разработку.

