# 🚀 Фаза 0 — Перезапуск: Инженерный Playbook

**Дата создания:** 2025-11-09  
**Статус:** Готов к реализации  
**Версия:** 1.0

> **Цель:** Создать предсказуемый каркас проекта с чистыми контрактами и готовностью к масштабированию, избежав всех выявленных проблем из предыдущей итерации.

> Перепроверено для новой итерации Go2Asia (2025-12-11).
> Используется как основной инженерный Playbook для Фазы 0.

---

## 📋 Содержание

1. [Определение готовности (Definition of Done)](#1-определение-готовности-definition-of-done)
2. [Структура монорепо (Capsules Policy)](#2-структура-монорепо-capsules-policy)
3. [Approved Stack и версии](#3-approved-stack-и-версии)
4. [OpenAPI-first процесс](#4-openapi-first-процесс)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Observability Day-1](#6-observability-day-1)
7. [Безопасность и анти-абьюз](#7-безопасность-и-анти-абьюз)
8. [Кэш-политика](#8-кэш-политика)
9. [Neon и данные](#9-neon-и-данные)
10. [Netlify + Cloudflare](#10-netlify--cloudflare)
11. [Фронт (PWA + SEO)](#11-фронт-pwa--seo)
12. [Exit-критерии Фазы 0](#12-exit-критерии-фазы-0)
13. [План работ на 7 дней](#13-план-работ-на-7-дней)
14. [Типичные проблемы и их предотвращение](#14-типичные-проблемы-и-их-предотвращение)

---

## 1. Определение готовности (Definition of Done)

### ✅ Критерии завершения Фазы 0

- [ ] **Единый монорепо** (pnpm + Turborepo) со строгими капсулами
- [ ] **OpenAPI-first:** спецификация всех публичных маршрутов, автогенерация типов и SDK
- [ ] **CI/CD:** превью-деплои на Netlify, staging и prod; contract-тесты + E2E
- [ ] **Observability Day-1:** логи, метрики, алёрты, `/health` и `/ready`
- [ ] **Базовая безопасность:** jose для JWT, валидация схем (Zod) на вход/выход, rate-limit на API Gateway
- [ ] **Кэш-политика:** зафиксирована в таблице TTL/инвалидации и частично включена
- [ ] **Neon:** миграции, семена, бэкапы и проверенный rollback
- [ ] **PWA-оболочка:** SSR/SSG для публичных страниц (Atlas/Blog) ради SEO

---

## 2. Структура монорепо (Capsules Policy)

### 📁 Структура директорий

```
go2asia-monorepo/
├── apps/
│   ├── go2asia-pwa-shell/     # Frontend (Next.js 15 App Router)
│   └── api-gateway/           # Cloudflare Worker/Pages Functions
├── services/
│   ├── auth-service/          # Cloudflare Worker
│   ├── content-service/       # Cloudflare Worker
│   ├── token-service/         # Cloudflare Worker
│   └── referral-service/      # Cloudflare Worker
├── packages/
│   ├── ui/                    # Дизайн-система (React/Tailwind/shadcn)
│   ├── types/                 # Общие TS-типы (генерятся из OpenAPI)
│   ├── sdk/                   # Автогенерируемый клиент по OpenAPI
│   ├── config/                # eslint, tsconfig, prettier, lint-staged
│   ├── logger/                # Единый логгер + requestId
│   └── schemas/               # Zod-схемы (дубли/гварды для рантайма)
└── docs/
    ├── openapi/               # Спецификации сервисов
    ├── ops/                   # Runbooks, SLO/SLA, кэш-матрица, миграции
    └── architecture/          # Диаграммы, решения
```

### 🔒 Правила капсул

1. **1 сервис = 1 капсула**
   - Межсервисные импорты запрещены (только HTTP/API Gateway)
   - Каждый сервис независим и может деплоиться отдельно

2. **Общий код только "без состояния"**
   - Типы, SDK, UI, схемы, логгер, конфиг
   - Никакой бизнес-логики в общих пакетах

3. **Единые JWT-утилиты**
   - Только `jose` везде
   - Трассировка через `/packages/logger`

4. **Зависимости между капсулами**
   - Apps могут использовать packages
   - Services могут использовать packages
   - Apps и Services общаются только через HTTP/API Gateway

---

## 3. Approved Stack и версии

### ✅ Утверждённый стек

| Категория | Технология | Версия | Примечание |
|-----------|------------|--------|------------|
| **Рантайм** | Cloudflare Workers/Pages | Latest | Gateway и все сервисы |
| **БД** | Neon PostgreSQL | Latest | SQL-миграции через Drizzle Kit |
| **ORM** | Drizzle ORM | Latest | SQL-файлы коммитим в репо |
| **Auth** | Clerk | Latest | OIDC, JWT через jose |
| **JWT** | jose | Latest | **Единственная** JWT библиотека |
| **Фронт** | Next.js | 15.x | App Router для SSR/SSG |
| **UI** | Tailwind CSS + shadcn/ui | Latest | Дизайн-система |
| **Валидация** | Zod | Latest | Вход/выход в Gateway |
| **Контракты** | OpenAPI | 3.1 | Orval для генерации |
| **Тесты** | Vitest | Latest | Unit тесты |
| **Contract Tests** | Schemathesis | Latest | API контракты |
| **E2E** | Playwright | Latest | End-to-end тесты |
| **Логи** | console + requestId | - | Стандартный для Workers |
| **Метрики** | Cloudflare Analytics | - | p95 latency, error rate |

### 🚫 Запрещённые библиотеки

- ❌ `winston` (несовместим с Cloudflare Workers)
- ❌ `@tsndr/cloudflare-worker-jwt` (используем только `jose`)
- ❌ Любые библиотеки с Node.js streams (не работают в Workers)

### 📦 Package Manager

- **pnpm** (быстрее npm, лучше для монорепо)
- **Turborepo** (для кэширования сборок)

---

## 4. OpenAPI-first процесс

### 📝 Процесс разработки API

1. **Описываем публичные маршруты** в `/docs/openapi/*.yaml`
   - Каждый сервис имеет свой файл: `content.yaml`, `auth.yaml`, `token.yaml`, `referral.yaml`
   - Все endpoints должны быть описаны до начала разработки

2. **Генерируем типы и клиент:**
   ```bash
   pnpm gen:types   # → /packages/types
   pnpm gen:sdk     # → /packages/sdk
   ```

3. **В каждом PR:**
   - CI валидирует OpenAPI (spectral)
   - Генерит типы и SDK
   - Проверяет на diffs (типы должны совпадать)
   - Гоняет contract-тесты на превью-деплое

4. **Правило:** Любое изменение API начинается с PR в OpenAPI → только затем код

### 🔧 Настройка генерации

**Использовать Orval:**

```typescript
// orval.config.ts
export default {
  content: {
    input: './docs/openapi/content.yaml',
    output: {
      target: './packages/sdk/src/content.ts',
      client: 'react-query',
      mode: 'tags-split',
    },
    types: {
      output: './packages/types/src/content.ts',
    },
  },
  // ... другие сервисы
};
```

**Скрипты в `package.json`:**
```json
{
  "scripts": {
    "gen:types": "orval --types",
    "gen:sdk": "orval --sdk",
    "gen:all": "pnpm gen:types && pnpm gen:sdk",
    "validate:openapi": "spectral lint docs/openapi/**/*.yaml"
  }
}
```

---

## 5. CI/CD Pipeline

### 🔄 GitHub Actions Workflow

#### PR Pipeline

```yaml
name: PR Checks

on: [pull_request]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build

  validate-openapi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          npm install -g @stoplight/spectral-cli
          spectral lint docs/openapi/**/*.yaml

  generate-and-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm gen:all
      - run: |
          if [ -n "$(git diff --exit-code)" ]; then
            echo "Generated types/SDK differ from committed files"
            exit 1
          fi

  contract-tests:
    runs-on: ubuntu-latest
    needs: [deploy-preview]
    steps:
      - uses: actions/checkout@v4
      - run: |
          pip install schemathesis
          schemathesis run \
            --base-url ${{ env.PREVIEW_URL }} \
            --checks all \
            docs/openapi/content.yaml

  e2e-tests:
    runs-on: ubuntu-latest
    needs: [deploy-preview]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm test:e2e
```

#### Merge → Staging (автоматически)

```yaml
name: Deploy to Staging

on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build
      - run: pnpm db:migrate:staging
      - run: pnpm deploy:staging
      - run: pnpm test:smoke:staging
```

#### Promote → Prod (вручную)

```yaml
name: Promote to Production

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to deploy'
        required: true

jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm build
      - run: pnpm db:migrate:prod
      - run: pnpm deploy:prod
      - run: pnpm test:smoke:prod
      # Автоматический откат при ошибках
      - run: |
          if [ $? -ne 0 ]; then
            pnpm db:rollback:prod
            pnpm deploy:rollback:prod
          fi
```

---

## 6. Observability Day-1

### 📊 Обязательные компоненты

#### 1. RequestId (сквозная трассировка)

```typescript
// packages/logger/src/index.ts
export function generateRequestId(): string {
  return crypto.randomUUID();
}

export function logRequest(
  requestId: string,
  method: string,
  path: string,
  duration: number,
  status: number
) {
  console.log(JSON.stringify({
    requestId,
    method,
    path,
    duration,
    status,
    timestamp: new Date().toISOString(),
  }));
}
```

**Использование в Gateway:**
```typescript
app.use('*', async (c, next) => {
  const requestId = c.req.header('X-Request-Id') || generateRequestId();
  c.set('requestId', requestId);
  c.header('X-Request-Id', requestId);
  
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  
  logRequest(requestId, c.req.method, c.req.path, duration, c.res.status);
});
```

#### 2. Health и Ready endpoints

```typescript
// В каждом сервисе
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/ready', async (c) => {
  // Проверка подключения к БД
  try {
    await db.query('SELECT 1');
    return c.json({ status: 'ready' });
  } catch (error) {
    return c.json({ status: 'not ready', error: error.message }, 503);
  }
});
```

#### 3. SLO/SLI и Error Budgets

**Service Level Objectives:**

| Сервис | Availability | Latency p95 | Error Rate |
|--------|--------------|-------------|------------|
| API Gateway | 99.9% | <200ms (GET), <500ms (POST) | <0.1% |
| Content Service | 99.5% | <300ms | <0.2% |
| Auth Service | 99.95% | <150ms | <0.05% |
| Token Service | 99.9% | <200ms | <0.1% |

**Error Budget:**
- Месячный budget = 100% - SLO
- При исчерпании 50% → предупреждение
- При исчерпании 100% → блокировка новых фич

#### 4. Алерты Cloudflare

**Критические (P0):**
- Error rate > 1% в течение 5 минут
- Availability < 99% в течение 10 минут
- Latency p95 > 1000ms в течение 5 минут

**Предупреждающие (P1):**
- Error rate > 0.5% в течение 15 минут
- Latency p95 > 500ms в течение 15 минут
- Error budget исчерпан на 50%

#### 5. Runbooks

Создать в `/docs/ops/runbooks.md`:
- Runbook: Ошибки 5xx в Content Service
- Runbook: Всплеск латентности
- Runbook: Ошибки Clerk Webhook
- Runbook: Проблемы с БД

---

## 7. Безопасность и анти-абьюз

### 🔒 Обязательные меры

#### 1. Валидация на Gateway

```typescript
// API Gateway middleware
import { z } from 'zod';

const requestSchema = z.object({
  // ... схема
});

app.use('*', async (c, next) => {
  if (c.req.method === 'POST' || c.req.method === 'PUT') {
    try {
      const body = await c.req.json();
      const validated = requestSchema.parse(body);
      c.set('validatedBody', validated);
    } catch (error) {
      return c.json({ error: 'Validation failed', details: error.errors }, 400);
    }
  }
  await next();
});
```

#### 2. JWT только через jose

```typescript
// packages/logger/src/jwt.ts
import * as jose from 'jose';

export async function verifyJWT(token: string, secret: string) {
  const secretKey = new TextEncoder().encode(secret);
  const { payload } = await jose.jwtVerify(token, secretKey);
  return payload;
}

export async function signJWT(payload: object, secret: string) {
  const secretKey = new TextEncoder().encode(secret);
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);
}
```

#### 3. Rate Limiting

**Матрица лимитов:**

| Endpoint | Лимит | Период | По чему |
|----------|-------|--------|---------|
| Публичные GET | 100 req | 1 мин | IP |
| Приватные GET | 200 req | 1 мин | User ID |
| POST /token/add | 10 req | 1 мин | User ID |
| POST /referral/register | 5 req | 1 час | User ID |
| Webhook Clerk | 100 req | 1 мин | IP |

**Реализация через Cloudflare Rate Limiting Rules**

#### 4. Анти-накрутка Points/Referral

```typescript
// Token Service
async function addPoints(userId: string, amount: number, reason: string) {
  // Velocity limit: максимум 1000 поинтов в час
  const hourlyTotal = await getHourlyTotal(userId);
  if (hourlyTotal + amount > 1000) {
    throw new Error('Hourly limit exceeded');
  }
  
  // Sanity check: максимум 100 поинтов за одно действие
  if (amount > 100) {
    throw new Error('Amount too large');
  }
  
  // Проверка на автоматизацию
  const lastRequest = await getLastRequestTime(userId);
  if (Date.now() - lastRequest < 1000) {
    throw new Error('Too many requests');
  }
  
  // ... остальная логика
}
```

#### 5. CORS

```typescript
// API Gateway
app.use('*', cors({
  origin: [
    'https://go2asia.space',
    'https://*.netlify.app', // Preview deployments
    'http://localhost:3000', // Development
  ],
  credentials: true,
}));
```

---

## 8. Кэш-политика

### 📋 Таблица стартовых TTL

| Ресурс | Вид | TTL Edge | SWR | Инвалидация |
|--------|-----|----------|-----|-------------|
| Atlas: страны/города/места | публичный GET | 600 c | 600 | ручная (админ-панель) |
| Pulse: события (списки) | публичный GET | 300 c | 600 | на изменение/публикацию |
| Blog: посты (списки/деталь) | публичный GET | 600 c | 600 | на публикацию/редактирование |
| Профиль/баланс/рефералы | персональные | 0 | 0 | Cache-Control: no-store |

### 🔧 Реализация

**В Gateway:**
```typescript
app.get('/v1/api/content/countries', async (c) => {
  const response = await fetchContentService('/countries');
  
  // Установить заголовки кеширования
  c.header('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=600');
  c.header('Vary', 'Accept, Accept-Encoding');
  
  return c.json(response);
});

app.get('/v1/api/token/balance', async (c) => {
  const response = await fetchTokenService('/balance');
  
  // Персональные данные - не кешировать
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate');
  
  return c.json(response);
});
```

**Тестирование кеша:**
```typescript
// tests/cache.test.ts
test('public endpoints have cache headers', async () => {
  const response = await fetch('/v1/api/content/countries');
  expect(response.headers.get('Cache-Control')).toContain('s-maxage=600');
});

test('private endpoints have no-store', async () => {
  const response = await fetch('/v1/api/token/balance', {
    headers: { Authorization: `Bearer ${token}` }
  });
  expect(response.headers.get('Cache-Control')).toContain('no-store');
});
```

---

## 9. Neon и данные

### 📦 Миграции

**Структура:**
```
services/content-service/
├── migrations/
│   ├── 001_create_countries.sql
│   ├── 002_create_cities.sql
│   └── 003_create_places.sql
└── drizzle.config.ts
```

**Команды:**
```bash
pnpm db:migrate:generate    # Генерирует миграцию из schema.ts
pnpm db:migrate:up         # Применить миграции
pnpm db:migrate:down       # Откатить последнюю миграцию
pnpm db:migrate:status     # Статус миграций
```

**Правила:**
- Все миграции должны быть обратимыми
- SQL-файлы коммитим в репо
- Тестировать откат на staging перед production

### 🌱 Семена

**Структура:**
```
services/content-service/
└── seeds/
    ├── countries.sql
    ├── cities.sql
    └── places.sql
```

**Требования:**
- UTF-8 кодировка (проверка в CI)
- Идемпотентность (можно запускать многократно)
- Коммитить в репо

**CI проверка:**
```bash
# .github/workflows/check-seeds.yml
- name: Check seed encoding
  run: |
    file -bi services/*/seeds/*.sql | grep -q "charset=utf-8" || exit 1
```

### 💾 Бэкапы

**Настройка Neon:**
- Включить Point-in-Time Recovery (PITR)
- Автоматические бэкапы каждые 24 часа
- Хранение минимум 30 дней

**Документация восстановления:**
- `/docs/ops/backup-recovery.md`
- Тестировать восстановление на staging раз в месяц

### 🔄 Rollback план

**Playbook:**
1. Сохранить схему БД версии N
2. Деплой кода версии N+1
3. Применить миграции
4. Smoke-тест
5. При фейле → автоматический `db:migrate:down` до версии N

---

## 10. Netlify + Cloudflare

### 🌐 Netlify (Frontend)

**Настройка:**
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "apps/go2asia-pwa-shell/.next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

**Окружения:**
- Preview deployments для каждого PR
- Staging: `staging.go2asia.space`
- Production: `go2asia.space`

### ☁️ Cloudflare (Backend)

**Настройка:**
- DNS для всех поддоменов
- Workers/Pages Functions для Gateway и сервисов
- Rate Limiting Rules
- Cache Rules
- Analytics и Alerts

**Безопасные заголовки:**
- Настроить через Cloudflare Transform Rules
- Или в коде каждого Worker

---

## 11. Фронт (PWA + SEO)

### ⚡ Next.js App Router

**Структура:**
```
apps/go2asia-pwa-shell/
├── app/
│   ├── (public)/           # Публичные страницы (SSR/SSG)
│   │   ├── atlas/
│   │   ├── blog/
│   │   └── pulse/
│   ├── (private)/          # Приватные страницы (SPA)
│   │   ├── connect/
│   │   └── profile/
│   └── layout.tsx
```

**SSR для публичных страниц:**
```typescript
// app/(public)/atlas/countries/[id]/page.tsx
export async function generateStaticParams() {
  const countries = await fetchCountries();
  return countries.map((country) => ({ id: country.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const country = await fetchCountry(params.id);
  return {
    title: `${country.name} - Go2Asia Atlas`,
    description: country.description,
    openGraph: {
      title: country.name,
      description: country.description,
      images: [country.flag],
    },
  };
}

export default async function CountryPage({ params }: { params: { id: string } }) {
  const country = await fetchCountry(params.id);
  return <CountryDetails country={country} />;
}
```

**SSG для статических страниц:**
```typescript
// app/(public)/blog/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const articles = await fetchArticles();
  return <ArticlesList articles={articles} />;
}
```

### 📄 SEO компоненты

**Sitemap:**
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const countries = await fetchCountries();
  const articles = await fetchArticles();
  
  return [
    ...countries.map((country) => ({
      url: `https://go2asia.space/atlas/countries/${country.id}`,
      lastModified: country.updatedAt,
    })),
    ...articles.map((article) => ({
      url: `https://go2asia.space/blog/${article.slug}`,
      lastModified: article.publishedAt,
    })),
  ];
}
```

**Robots.txt:**
```typescript
// app/robots.ts
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/connect/', '/profile/'],
      },
    ],
    sitemap: 'https://go2asia.space/sitemap.xml',
  };
}
```

### 🎨 UI компоненты

**Skeleton UI:**
```typescript
// components/skeletons/CountrySkeleton.tsx
export function CountrySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
```

**Обработка ошибок:**
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Что-то пошло не так</h2>
      <button onClick={reset}>Попробовать снова</button>
    </div>
  );
}
```

### 🌍 I18n и темы

**Настройка:**
- Использовать `next-intl` для интернационализации
- `next-themes` для dark/light темы
- Настроить с первого дня

---

## 12. Exit-критерии Фазы 0

### ✅ Проверочный список

- [ ] Все публичные маршруты описаны в OpenAPI; типы/SDK генерятся автоматически
- [ ] CI гоняет lint/typecheck/build + OpenAPI validate + contract + E2E
- [ ] Превью-деплои на каждую ветку; staging/prod — раздельные окружения
- [ ] `/health` и `/ready` у всех сервисов; алёрты включены
- [ ] Кэш-матрица действует; публичные GET отдают нужные заголовки
- [ ] Единственная JWT-библиотека (`jose`); Zod-валидация на Gateway
- [ ] Neon: миграции/семена/бэкап/rollback проверены на staging
- [ ] Фронт: SSR/SSG публичных страниц, Lighthouse ≥ 85 (Perf/SEO/Best)

---

## 13. План работ на 7 дней

### 📅 День 1: Инициализация

**Задачи:**
- [ ] Инициализировать монорепо (pnpm + Turborepo)
- [ ] Настроить структуру капсул
- [ ] Настроить базовые скрипты и линтеры
- [ ] Создать каркас Next.js (PWA shell)
- [ ] Создать каркас API Gateway (Cloudflare Worker)

**Результат:** Базовая структура монорепо готова

---

### 📅 День 2: OpenAPI каркас

**Задачи:**
- [ ] Описать OpenAPI схемы для всех сервисов:
  - [ ] `content.yaml` (countries, cities, places, events, articles)
  - [ ] `auth.yaml` (profile, webhook)
  - [ ] `token.yaml` (balance, transactions, add, subtract)
  - [ ] `referral.yaml` (stats, tree, register)
- [ ] Настроить Orval для генерации типов и SDK
- [ ] Проверить генерацию типов/SDK

**Результат:** OpenAPI спецификации готовы, генерация работает

---

### 📅 День 3: Безопасность и логирование

**Задачи:**
- [ ] Внедрить Zod-валидацию в Gateway
- [ ] Настроить jose для JWT (единственная библиотека)
- [ ] Создать единый логгер с requestId
- [ ] Реализовать `/health` и `/ready` endpoints
- [ ] Настроить сквозную трассировку (X-Request-Id)

**Результат:** Безопасность и логирование настроены

---

### 📅 День 4: CI/CD

**Задачи:**
- [ ] Настроить GitHub Actions для PR:
  - [ ] Lint/Typecheck/Build
  - [ ] Validate OpenAPI (spectral)
  - [ ] Generate types/SDK и проверка diffs
  - [ ] Contract-тесты (Schemathesis) на превью
  - [ ] Playwright smoke-тесты
- [ ] Настроить автоматический деплой в staging при merge
- [ ] Настроить ручной promote в prod

**Результат:** CI/CD pipeline работает

---

### 📅 День 5: Neon и данные

**Задачи:**
- [ ] Поднять Neon staging окружение
- [ ] Настроить миграции (Drizzle Kit)
- [ ] Создать seed файлы (UTF-8 проверка)
- [ ] Настроить PITR бэкапы
- [ ] Оформить rollback playbook
- [ ] Протестировать восстановление на staging

**Результат:** БД настроена, миграции и бэкапы работают

---

### 📅 День 6: Кэширование и алёрты

**Задачи:**
- [ ] Реализовать кэш-матрицу в Gateway (заголовки Cache-Control)
- [ ] Включить частичный Edge-кэш для публичных GET
- [ ] Написать тесты для проверки заголовков кеша
- [ ] Настроить Cloudflare Alerts:
  - [ ] Error rate > 1%
  - [ ] Latency p95 > порога
  - [ ] Availability < 99%
- [ ] Создать базовые runbooks

**Результат:** Кэширование работает, алёрты настроены

---

### 📅 День 7: Фронт и финализация

**Задачи:**
- [ ] Реализовать SSR/SSG для публичных страниц Atlas/Blog
- [ ] Настроить мета-теги (OpenGraph, Twitter)
- [ ] Создать sitemap.xml и robots.txt
- [ ] Настроить Skeleton UI и обработку ошибок
- [ ] Запустить финальный smoke + E2E + Lighthouse
- [ ] Проверить все exit-критерии

**Результат:** Фаза 0 завершена, готовность к Фазе 1

---

## 14. Типичные проблемы и их предотвращение

### 🚨 Проблема 1: Несовпадение типов фронт/бэк

**Причина:** Ручное поддержание типов, рассинхрон

**Решение:**
- ✅ OpenAPI-генерация типов обязательна
- ✅ PR падает при расхождении типов
- ✅ CI проверяет, что сгенерированные типы совпадают с коммитом

**Автоматизация:**
```yaml
# .github/workflows/check-types.yml
- name: Check generated types
  run: |
    pnpm gen:all
    if [ -n "$(git diff --exit-code)" ]; then
      echo "Types differ! Run 'pnpm gen:all' and commit"
      exit 1
    fi
```

---

### 🚨 Проблема 2: JWT/библиотеки несовместимы

**Причина:** Разные библиотеки для генерации и проверки

**Решение:**
- ✅ Только `jose` везде
- ✅ Запретить другие JWT пакеты в lock-правилах
- ✅ Проверка в CI

**Автоматизация:**
```json
// package.json
{
  "pnpm": {
    "overrides": {
      "jsonwebtoken": "npm:jose@latest",
      "@tsndr/cloudflare-worker-jwt": "npm:jose@latest"
    }
  }
}
```

---

### 🚨 Проблема 3: Кэш "случайно" кеширует приватку

**Причина:** Неправильные заголовки Cache-Control

**Решение:**
- ✅ `no-store` по умолчанию в личных маршрутах
- ✅ Автотест заголовков в CI
- ✅ Документированная матрица TTL

**Автоматизация:**
```typescript
// tests/cache-headers.test.ts
test('private endpoints have no-store', async () => {
  const privateEndpoints = [
    '/v1/api/token/balance',
    '/v1/api/token/transactions',
    '/v1/api/referral/stats',
  ];
  
  for (const endpoint of privateEndpoints) {
    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    expect(response.headers.get('Cache-Control')).toContain('no-store');
  }
});
```

---

### 🚨 Проблема 4: Семена "съезжают" кодировкой

**Причина:** Файлы не в UTF-8

**Решение:**
- ✅ UTF-8-чекер в CI
- ✅ Миграции и семена строго через SQL-файлы
- ✅ Документировать требования

**Автоматизация:**
```yaml
# .github/workflows/check-encoding.yml
- name: Check file encoding
  run: |
    for file in services/*/seeds/*.sql services/*/migrations/*.sql; do
      if [ -f "$file" ]; then
        encoding=$(file -bi "$file" | grep -o "charset=[^;]*" | cut -d= -f2)
        if [ "$encoding" != "utf-8" ]; then
          echo "File $file is not UTF-8"
          exit 1
        fi
      fi
    done
```

---

### 🚨 Проблема 5: Незаметные 5xx

**Причина:** Нет мониторинга и алертов

**Решение:**
- ✅ Алёрты + SLO/SLI панели с первого дня
- ✅ Правило: без dashboards в prod — не деплоим
- ✅ Runbooks для типичных инцидентов

**Автоматизация:**
```yaml
# .github/workflows/deploy-prod.yml
- name: Check observability
  run: |
    if [ -z "$CLOUDFLARE_ALERTS_ENABLED" ]; then
      echo "Alerts not configured! Cannot deploy to prod"
      exit 1
    fi
```

---

## 📋 Чек-лист прогресса

### Неделя 1

- [ ] День 1: Инициализация монорепо
- [ ] День 2: OpenAPI каркас
- [ ] День 3: Безопасность и логирование
- [ ] День 4: CI/CD
- [ ] День 5: Neon и данные
- [ ] День 6: Кэширование и алёрты
- [ ] День 7: Фронт и финализация

### Проверка готовности

- [ ] Все exit-критерии выполнены
- [ ] Все типичные проблемы предотвращены
- [ ] Документация обновлена
- [ ] Команда обучена новым процессам

---

## 🎯 Следующие шаги после Фазы 0

После завершения Фазы 0 можно переходить к:

1. **Фаза 1:** Разработка сервисов (Auth, Content, Token, Referral)
2. **Интеграция:** Подключение фронтенда к API
3. **Тестирование:** Расширение тестового покрытия
4. **Масштабирование:** Оптимизация производительности

---

**Дата создания:** 2025-11-09  
**Автор:** AI Assistant (Composer)  
**Версия:** 1.0

