# System Architecture — Общая архитектура платформы Go2Asia

Этот документ описывает высокоуровневую архитектуру экосистемы Go2Asia: слои, основные компоненты и связи между ними.

---

## 1. Цели архитектуры

- Поддержка модульной экосистемы (Atlas, Pulse, Blog, Guru, RF, Rielt, Space и др.).
- Возможность независимой эволюции модулей (микрофронтенды + микросервисы).
- Готовность к масштабированию по нагрузке и по количеству функциональных блоков.
- Интеграция токеномики (Points, NFT, G2A, Blockchain Gateway).
- Возможность глубокой AI-интеграции (AI Gateway, рекомендации, автогенерация контента).

---

## 2. Уровни системы

Архитектура делится на несколько уровней:

1. **Клиентский уровень (Frontend PWA)**
   - PWA-оболочка (Go2Asia Shell).
   - Модульные микрофронтенды (Atlas, Pulse, Blog, Guru, RF Partners, Rielt, Space, Quest, Connect и др.).
   - Единая дизайн-система и навигация.

2. **Edge/API Gateway уровень**
   - Лёгкий gateway-слой на краю сети (например, edge-функции/Cloudflare Worker/Netlify Edge).
   - Ответственность:
     - терминация запросов от PWA;
     - аутентификация/авторизация JWT;
     - маршрутизация к соответствующим backend-микросервисам;
     - базовый rate limiting и логирование.

3. **Backend-микросервисы**
   - Набор доменных сервисов:
     - User / Auth / Profile
     - Atlas Service
     - Pulse Service
     - Media (Blog) Service
     - Guru Service
     - RF Service (Russian Friendly)
     - Rielt Service
     - Quest Service
     - Referral/Connect Service
     - Points Service
     - NFT Service
     - Blockchain Gateway Service
     - Notification Service
     - Logging/Analytics Service
   - Каждый сервис имеет собственную зону ответственности и ограниченный контекст.

4. **Хранилища данных**
   - Основная реляционная БД (PostgreSQL).
   - Объектное хранилище для медиаконтента (изображения, видео).
   - Ключ-значение хранилища / кеши для ускорения чтения.
   - Event-лог/очереди (для асинхронных событий, уведомлений, логов).

5. **Инфраструктура и DevOps**
   - CI/CD пайплайны для фронтенда и каждого сервиса.
   - Мониторинг, алертинг, логирование.
   - Secrets management.

6. **AI-слой**
   - AI Gateway (прокси над LLM-провайдерами).
   - AI-агенты (Atlas-рекомендации, Guru-подбор, автогенерация контента, внутренняя мультиагентная разработка).

---

## 3. Взаимодействие уровней (общее)

- Пользователь взаимодействует с PWA через браузер/мобильное устройство.
- PWA отправляет запросы к API Gateway (edge-слой).
- Gateway:
  - проверяет токен пользователя;
  - маршрутизирует запрос в нужный backend-сервис.
- Backend-сервис:
  - работает с БД, кешами и внешними сервисами;
  - возвращает ответ через Gateway обратно во фронтенд.

---

## 4. Принципы архитектуры

- **Модульность:** каждый модуль (Atlas, Pulse, Blog и т.д.) — отдельный фронтенд-микрофронтенд и (по возможности) отдельный backend-сервис.
- **Чёткие границы контекстов:** микросервисы не «залезают» в БД друг друга — взаимодействие только через API/события.
- **API-first:** публичные и внутренние API проектируются явно, документируются.
- **Scalability-by-design:** возможность масштабировать отдельные сервисы независимо.
- **Observability:** логирование, метрики, трассировка запросов.

---

## 5. Типовой пользовательский сценарий (пример)

1. Пользователь открывает PWA Go2Asia и заходит в модуль **Atlas Asia**.
2. PWA вызывает `GET /api/atlas/countries/vietnam`.
3. Edge/API Gateway валидирует JWT, отправляет запрос в **Atlas Service**.
4. Atlas Service обращается к PostgreSQL за данными о стране + к кешу.
5. Ответ возвращается по цепочке → Gateway → PWA.
6. Пользователь нажимает на место и покупает ваучер:
   - фронтенд дергает **RF Service** / **Voucher Service**;
   - при успешной покупке → событие в **Points Service** и **Notification Service**;
   - позже может быть отражено в **Blockchain Gateway Service** (если нужны on-chain операции).

---

## 6. Связанные документы

- `architecture/fe_architecture.md`
- `architecture/be_architecture.md`
- `architecture/api_architecture.md`
- `architecture/data_flow.md`
- `architecture/microfrontends.md`
- `architecture/microservices.md`
- `architecture/caching_and_performance.md`
