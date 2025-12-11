# Environments — Рабочие окружения Go2Asia

Документ описывает, какие окружения используются для разработки, тестирования и продакшна Go2Asia.

---

## 1. Список окружений

1. **Local (Developer Machines)**
2. **Dev / Sandbox (по необходимости)**
3. **Staging**
4. **Production**

---

## 2. Local

Используется для разработки на машине разработчика.

- Фронтенд:
  - `pnpm dev` (PWA shell + модули).
- Backend:
  - локальный запуск нужных сервисов;
  - подключение к локальной или dev-БД.
- Средства:
  - `.env.local` (не коммитится);
  - минимальный набор сервисов.

Назначение:
- быстрые итерации;
- отладка фронтенда и API.

---

## 3. Dev / Sandbox (опционально)

Может использоваться как «песочница» для экспериментов.

- Отдельные домены / поддомены:
  - `dev.go2asia.app`
- Необязательное окружение, включается при необходимости сложных экспериментов.

---

## 4. Staging

Почти полная копия production с отдельной БД/ресурсами.

- Домен:
  - `staging.go2asia.app`
- Использование:
  - интеграционные тесты;
  - приёмка новых фич перед релизом;
  - нагрузочные тесты (по возможности).
- Настройки:
  - тот же стек, что и production;
  - отдельные ключи и секреты;
  - включён мониторинг и логирование как в проде.

---

## 5. Production

Основное боевое окружение.

- Домен:
  - `go2asia.app` (через Cloudflare + Netlify).
- Все реальные пользователи и данные.
- Требования:
  - высокое uptime;
  - минимизация ручных изменений;
  - все изменения проходят через CI/CD.

---

## 6. Разделение конфигураций

Для каждого окружения:

- свои переменные окружения:
  - URL БД,
  - API ключи внешних сервисов,
  - параметры кеширования,
  - уровень логирования.
- отдельные секции в Secret Manager / Netlify / Cloudflare.

---

## 7. Связанные документы

- `ops/ci_cd.md`
- `ops/secrets_management.md`
- `ops/cloudflare_setup.md`
- `ops/netlify_setup.md`

---

## Staging окружение (уже настроено)

- Cloudflare Workers:
  - go2asia-api-gateway-staging
  - go2asia-auth-service-staging
  - go2asia-content-service-staging
  - go2asia-referral-service-staging
  - go2asia-token-service-staging
- Домен: go2asia.space
  - api.go2asia.space → api-gateway Worker
  - auth.go2asia.space → auth-service Worker
  - content.go2asia.space → content-service Worker
  - token.go2asia.space → token-service Worker
  - rf-api.go2asia.space → rf-service (если нужен)
- R2:
  - bucket: `go2asia-media`
  - папки: `country/`, `city/`, `place/`
- Neon:
  - проект: go2asia-staging
  - схема: таблицы countries, cities, events, places, users и т.д. (как на скрине)
- Clerk:
  - приложение: `go2asia` (development)
