# Frontend Deployment Architecture — Архитектура деплоя фронтенда Go2Asia

Документ описывает архитектуру деплоя фронтенда Go2Asia, включая App Shell, микрофронтенды, версионирование и кеширование.

---

## 1. Общая архитектура деплоя

### 1.1. Компоненты фронтенда

```
┌─────────────────────────────────────────────────┐
│           Cloudflare (DNS + CDN)                │
│  - go2asia.app (production)                     │
│  - staging.go2asia.app (staging)                 │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│              Netlify (Hosting)                   │
│  - App Shell (Next.js 15 App Router)            │
│  - Static Assets (_next/static/*)               │
│  - API Routes (Next.js API Routes)              │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│         Backend Services (Cloudflare)           │
│  - API Gateway (Workers)                        │
│  - Auth Service                                 │
│  - Content Service                              │
│  - Token Service                                │
└─────────────────────────────────────────────────┘
```

### 1.2. App Shell как основное приложение

**App Shell** (`apps/go2asia-pwa-shell`) — это единая точка входа, которая:

- Рендерит общий layout (TopAppBar, BottomNav, SideDrawer)
- Управляет аутентификацией через Clerk
- Обеспечивает роутинг между модулями
- Загружает модули динамически (lazy loading)
- Предоставляет общие утилиты и хуки

**Деплой App Shell:**
- Собирается через Next.js build (`next build`)
- Деплоится на Netlify как единое приложение
- Использует Next.js App Router для SSR/SSG

### 1.3. Микрофронтенды как статические ассеты

**Текущая фаза (Phase 0):**
- Модули интегрированы в App Shell как обычные Next.js страницы
- Code splitting происходит автоматически через `next/dynamic`
- Каждый модуль имеет свой маршрут (`/atlas`, `/pulse`, `/blog` и т.д.)

**Будущая фаза (после Phase 0):**
- Модули могут быть вынесены в отдельные пакеты
- Возможна интеграция через Module Federation (Webpack 5)
- Статические ассеты модулей могут деплоиться на CDN отдельно

---

## 2. Версионирование и кеширование

### 2.1. Версионирование статических ассетов

Next.js автоматически версионирует статические файлы через content-based hashing:

```
/_next/static/chunks/main-abc123.js
/_next/static/chunks/main-def456.js  ← новая версия после деплоя
```

**Стратегия кеширования:**

| Тип ресурса | Cache-Control | Edge TTL (Cloudflare) | Описание |
|------------|---------------|----------------------|----------|
| `/_next/static/*` | `public, max-age=31536000, immutable` | 1 месяц | Версионированные JS/CSS |
| `/*.html` | `public, max-age=0, must-revalidate` | 0 (bypass) | HTML страницы |
| `/images/*` | `public, max-age=86400` | 1 день | Изображения |
| `/manifest.webmanifest` | `public, max-age=3600` | 1 час | PWA manifest |
| `/sw.js` | `public, max-age=0, must-revalidate` | 0 (bypass) | Service Worker |

### 2.2. Кеширование на уровне Cloudflare

**Page Rules / Rulesets:**

1. **Статические ассеты Next.js:**
   ```
   Pattern: *go2asia.app/_next/static/*
   Cache Level: Cache Everything
   Edge TTL: 1 месяц
   Browser TTL: 1 месяц
   ```

2. **HTML страницы:**
   ```
   Pattern: *go2asia.app/*
   Cache Level: Bypass
   Edge TTL: 0
   Browser TTL: 0
   ```

3. **Изображения:**
   ```
   Pattern: *go2asia.app/images/*
   Cache Level: Cache Everything
   Edge TTL: 1 день
   Browser TTL: 1 день
   ```

### 2.3. Инвалидация кеша

**Автоматическая инвалидация:**
- При новом деплое Netlify автоматически инвалидирует HTML страницы
- Статические ассеты с новыми хешами загружаются автоматически

**Ручная инвалидация (при необходимости):**
- Через Cloudflare Dashboard → Caching → Purge Everything
- Или через Cloudflare API

---

## 3. Структура деплоя

### 3.1. Production деплой

**Триггер:**
- Push в ветку `main` → автоматический деплой на Netlify

**Процесс:**
1. GitHub webhook → Netlify
2. Netlify запускает build: `pnpm install --frozen-lockfile && pnpm build`
3. Next.js собирает приложение в `.next/`
4. Netlify деплоит `.next/` на CDN
5. Cloudflare проксирует трафик с `go2asia.app` на Netlify

**Домен:**
- Production: `go2asia.app` (через Cloudflare CNAME на Netlify)

### 3.2. Staging деплой

**Триггер:**
- Push в ветку `develop` → автоматический деплой на Netlify (branch deploy)

**Процесс:**
- Аналогичен production, но использует staging переменные окружения

**Домен:**
- Staging: `staging.go2asia.app` (через Cloudflare CNAME на Netlify staging URL)

### 3.3. Preview деплои

**Триггер:**
- Открытие Pull Request → автоматический preview деплой

**Процесс:**
- Netlify создаёт уникальный URL для каждого PR
- Использует staging переменные окружения

**Домен:**
- Preview: `deploy-preview-{pr-number}--go2asia.netlify.app`

---

## 4. Переменные окружения

### 4.1. Production переменные

**В Netlify Dashboard → Site settings → Environment variables:**

| Переменная | Описание | Пример значения |
|-----------|----------|-----------------|
| `NODE_ENV` | Окружение | `production` |
| `NEXT_PUBLIC_API_URL` | Базовый URL API Gateway | `https://api.go2asia.space` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Публичный ключ Clerk | `pk_live_...` |
| `CLERK_SECRET_KEY` | Секретный ключ Clerk (server-side) | `sk_live_...` |
| `NEXT_PUBLIC_APP_URL` | URL приложения | `https://go2asia.app` |

**Важно:**
- Все переменные с префиксом `NEXT_PUBLIC_` доступны в браузере
- Не хранить секреты в `NEXT_PUBLIC_*` переменных

### 4.2. Staging переменные

| Переменная | Описание | Пример значения |
|-----------|----------|-----------------|
| `NODE_ENV` | Окружение | `production` (для Next.js) |
| `NEXT_PUBLIC_API_URL` | Базовый URL API Gateway | `https://api-staging.go2asia.space` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Публичный ключ Clerk | `pk_test_...` |
| `CLERK_SECRET_KEY` | Секретный ключ Clerk | `sk_test_...` |
| `NEXT_PUBLIC_APP_URL` | URL приложения | `https://staging.go2asia.app` |

### 4.3. Local переменные

Хранятся в `.env.local` (не коммитится):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8787
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 5. Build процесс

### 5.1. Команда сборки

**Netlify Build Command:**
```bash
pnpm install --frozen-lockfile && pnpm build
```

**Локальная сборка:**
```bash
cd apps/go2asia-pwa-shell
pnpm install
pnpm build
```

### 5.2. Build output

Next.js 15 App Router создаёт:

```
.next/
├── static/          # Статические ассеты (JS, CSS, images)
│   └── chunks/      # Code-split chunks
├── server/          # Server-side код
├── cache/           # Build cache
└── standalone/      # Standalone build (для Docker, не используется в Netlify)
```

**Publish directory для Netlify:**
- `.next/` (корневая директория Next.js build)

### 5.3. Оптимизации сборки

**Next.js оптимизации:**
- Automatic code splitting
- Tree shaking
- Image optimization (через `next/image`)
- Font optimization

**Дополнительные оптимизации:**
- `optimizePackageImports` в `next.config.js` для уменьшения bundle size
- `transpilePackages` для workspace пакетов

---

## 6. Безопасность

### 6.1. Security Headers

Настраиваются в `netlify.toml` и `next.config.js`:

- **Strict-Transport-Security (HSTS):** только для production
- **X-Content-Type-Options:** `nosniff`
- **X-Frame-Options:** `DENY`
- **X-XSS-Protection:** `1; mode=block`
- **Referrer-Policy:** `strict-origin-when-cross-origin`
- **Permissions-Policy:** ограничения для camera, microphone, geolocation

### 6.2. Content Security Policy (CSP)

**Production CSP (черновая версия):**

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk.accounts.dev;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https: blob:;
connect-src 'self' https://*.clerk.com https://api.go2asia.space https://*.go2asia.space;
frame-src 'self' https://*.clerk.com;
```

**Важно:**
- CSP будет дорабатываться после тестирования в staging
- `'unsafe-inline'` и `'unsafe-eval'` могут быть удалены после оптимизации

### 6.3. HSTS (HTTP Strict Transport Security)

**Production only:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**Staging:**
- HSTS не включается (для удобства разработки)

---

## 7. Мониторинг и логирование

### 7.1. Netlify Analytics

- Build logs
- Deploy logs
- Function logs (если используются Netlify Functions)

### 7.2. Cloudflare Analytics

- Traffic analytics
- Security events (WAF, DDoS)
- Caching reports

### 7.3. Frontend мониторинг (будущее)

- Sentry для error tracking
- Analytics (Google Analytics / Plausible)
- Performance monitoring (Web Vitals)

---

## 8. Rollback стратегия

### 8.1. Netlify Rollback

**Через Netlify Dashboard:**
1. Site settings → Deploys
2. Выбрать предыдущий успешный деплой
3. Нажать "Publish deploy"

**Через Netlify CLI:**
```bash
netlify deploy --prod --dir=.next
```

### 8.2. Cloudflare Rollback

Если проблема в Cloudflare конфигурации:
- Откатить изменения через Cloudflare Dashboard
- Или использовать Cloudflare API

---

## 9. Связанные документы

- `ops/phase0_7_plan.md` — план Phase 0.7
- `ops/phase0_7_checklist.md` — чеклист запуска деплоя
- `ops/netlify_setup.md` — настройка Netlify
- `ops/cloudflare_setup.md` — настройка Cloudflare
- `ops/environments.md` — описание окружений

---

**Дата создания:** 2025-01-12  
**Последнее обновление:** 2025-01-12
