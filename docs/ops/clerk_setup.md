# Настройка Clerk для Go2Asia

Clerk используется как единый SSO-провайдер для всех модулей Go2Asia, обеспечивая централизованную аутентификацию и управление пользователями.

---

## 📋 Обзор

Clerk обеспечивает:
- Email/password аутентификацию
- Social OAuth (Google, VK, Facebook и др.)
- Session tokens и JWT
- Service tokens для backend-to-backend коммуникации
- Webhooks для синхронизации данных пользователей
- Единый источник истины по пользователям

---

## ✅ Текущий статус настройки

### Уже настроено:

- [x] **Приложение Clerk создано** — "go2asia" (Free • Development)
- [x] **Satellite domain настроен** — `go2asia.space` (Verified)
- [x] **Webhook endpoint создан** — `https://go2asia-auth-service-staging.fred89059599296.workers.dev/v1/webhook`
- [x] **Секреты добавлены в Cloudflare Workers:**
  - [x] `go2asia-auth-service-staging` — CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET
  - [x] `go2asia-token-service-staging` — CLERK_SECRET_KEY
  - [x] `go2asia-referral-service-staging` — CLERK_SECRET_KEY
- [x] **Email аутентификация настроена:**
  - [x] Sign-up with email — включен
  - [x] Sign-in with email — включен
  - [x] Email verification code — включен
  - [x] Verify at sign-up — включен
- [x] **SSO connections настроены:**
  - [x] Google Social provider — настроен (Used for sign-in, Shared Credentials)
- [x] **Attack Protection настроен:**
  - [x] Lockout Policy — включен (100 попыток, 1 час блокировки)
  - [x] Bot sign-up protection — включен (Cloudflare Turnstile)
  - [x] User enumeration protection — включен (Bulk protection)
- [x] **Sessions настроены:**
  - [x] Maximum lifetime — 7 дней (Pro feature)
  - [x] Multi-session handling — включен (Add-on)
  - [x] Customize session token — настроен (`__session`)

### Требуется донастройка:

- [ ] **Redirect URIs для production окружения** (когда будет готово)
- [ ] **Роли пользователей** — создать в Clerk Dashboard (spacer, vip, pro-curator, partner, admin)
- [ ] **Webhook events** — проверить подписку на события (user.created, user.updated, user.deleted)
- [ ] **Production секреты** — добавить в production Workers когда будет готово

---

## 🔧 Детали текущей конфигурации

### 1. Домены

**Satellite Domain:**
- `go2asia.space` — Verified ✅
- Используется для SSO между поддоменами

**Primary Domain:**
- `upward-marmot-95.clerk.accounts.dev` — основной домен Clerk

### 2. Webhook Endpoint

**Текущий URL:**
```
https://go2asia-auth-service-staging.fred89059599296.workers.dev/v1/webhook
```

**Статус:**
- Endpoint создан: 2 ноября 2025 г. в 23:09
- Последнее обновление: 14 ноября 2025 г. в 21:24
- Error Rate: 16.7% (требует внимания — возможно, endpoint не реализован полностью)

**Подписанные события:**
- `user.created` — создание нового пользователя
- `user.updated` — обновление данных пользователя
- `user.deleted` — удаление пользователя

**Примечание:** В коде Auth Service endpoint должен быть реализован по пути `/v1/webhook` для соответствия настройке в Clerk.

### 3. Секреты в Cloudflare Workers

**Staging окружение:**

| Worker | CLERK_SECRET_KEY | CLERK_WEBHOOK_SECRET | DATABASE_URL |
|--------|------------------|----------------------|--------------|
| `go2asia-auth-service-staging` | ✅ | ✅ | ✅ |
| `go2asia-token-service-staging` | ✅ | ❌ | ✅ |
| `go2asia-referral-service-staging` | ✅ | ❌ | ✅ |

**Production окружение:**
- Секреты будут добавлены при настройке production окружения

---

## 📝 Роли пользователей (требуется создать)

В Clerk Dashboard → **Users** → **Roles** необходимо создать следующие роли:

1. **spacer** (обычный пользователь)
   - Базовая роль для всех зарегистрированных пользователей
   - Доступ к основным функциям платформы

2. **vip**
   - VIP пользователи с расширенными возможностями
   - Приоритетная поддержка

3. **pro-curator** (PRO-куратор)
   - Кураторы контента с правами модерации
   - Могут редактировать контент в своих разделах

4. **partner** (партнёр)
   - Партнёры платформы
   - Доступ к партнёрским функциям

5. **admin** (администратор)
   - Полный доступ ко всем функциям
   - Управление пользователями и контентом

### Настройка метаданных пользователя

В Clerk можно добавить custom metadata для хранения дополнительной информации:

- `referral_code` — реферальный код пользователя
- `referrer_id` — ID пользователя, который пригласил
- `points_balance` — баланс Points (синхронизируется с Token Service)
- `g2a_balance` — баланс G2A Token (синхронизируется с Token Service)
- `nft_count` — количество NFT (синхронизируется с NFT Service)

**Примечание:** Эти данные будут синхронизироваться через webhooks с Auth Service и храниться в базе данных.

---

## 🔗 Интеграция с Backend (Cloudflare Workers)

### Текущая структура секретов

Секреты уже добавлены в Cloudflare Workers через Dashboard. Для добавления новых секретов используйте:

**Через Cloudflare Dashboard:**
1. Перейти в Workers & Pages → выбранный Worker → Settings
2. В разделе "Variables and Secrets" нажать "+ Add"
3. Выбрать "Secret" и ввести имя и значение

**Через Wrangler CLI:**
```bash
cd services/auth-service
wrangler secret put CLERK_SECRET_KEY --env staging
wrangler secret put CLERK_WEBHOOK_SECRET --env staging
```

### Переменные окружения для Workers

**Staging:**
```bash
CLERK_SECRET_KEY=sk_test_...          # Backend API Secret Key
CLERK_WEBHOOK_SECRET=whsec_...        # Webhook Signing Secret
DATABASE_URL=postgresql://...         # Database connection string
ENVIRONMENT=staging                    # Plaintext variable
```

**Production:**
```bash
CLERK_SECRET_KEY=sk_live_...          # Backend API Secret Key
CLERK_WEBHOOK_SECRET=whsec_...        # Webhook Signing Secret
DATABASE_URL=postgresql://...         # Database connection string
ENVIRONMENT=production                 # Plaintext variable
```

---

## 🌐 Интеграция с Frontend (Next.js)

### Установка Clerk SDK

```bash
pnpm add @clerk/nextjs
```

### Настройка в Next.js

Создать файл `.env.local` (не коммитить в репозиторий):

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### Middleware для защиты routes

Создать `middleware.ts` в корне Next.js приложения:

```typescript
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/api/health', '/api/public'],
  ignoredRoutes: ['/api/webhooks/clerk'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

---

## 🔔 Настройка Webhooks

### Endpoint для webhooks

Webhook endpoint реализован в `services/auth-service`:

- **URL:** `https://go2asia-auth-service-staging.fred89059599296.workers.dev/v1/webhook`
- **Method:** POST
- **Events:** 
  - `user.created`
  - `user.updated`
  - `user.deleted`

### Валидация webhook запросов

Использовать `CLERK_WEBHOOK_SECRET` для валидации подписи запросов от Clerk.

Пример валидации (реализовано в Auth Service):

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';

const webhookSecret = env.CLERK_WEBHOOK_SECRET;

const svixHeaders = {
  'svix-id': headers().get('svix-id')!,
  'svix-timestamp': headers().get('svix-timestamp')!,
  'svix-signature': headers().get('svix-signature')!,
};

const wh = new Webhook(webhookSecret);
const payload = await wh.verify(body, svixHeaders);
```

### Текущие проблемы с webhook

**Error Rate: 16.7%** — некоторые запросы не проходят. Возможные причины:
1. Endpoint не реализован полностью в Auth Service
2. Неправильная валидация подписи
3. Проблемы с обработкой событий

**Рекомендации:**
- Проверить логи в Cloudflare Dashboard → Workers → Logs
- Убедиться, что endpoint `/v1/webhook` правильно обрабатывает запросы
- Проверить валидацию подписи webhook

---

## ✅ Чек-лист донастройки Clerk

### В Clerk Dashboard:
- [ ] Создать роли пользователей (spacer, vip, pro-curator, partner, admin)
- [ ] Проверить подписку на webhook события (user.created, user.updated, user.deleted)
- [ ] Настроить redirect URIs для production окружения (когда будет готово)
- [ ] Проверить настройки метаданных пользователя

### В Cloudflare Workers:
- [ ] Проверить, что все секреты добавлены в staging Workers
- [ ] Добавить секреты в production Workers (когда будет готово)
- [ ] Проверить, что webhook endpoint работает корректно

### В Auth Service:
- [ ] Реализовать обработку webhook событий по пути `/v1/webhook`
- [ ] Добавить валидацию подписи webhook
- [ ] Обработать события: user.created, user.updated, user.deleted
- [ ] Снизить Error Rate webhook до 0%

### В Frontend (когда будет создан):
- [ ] Установить `@clerk/nextjs`
- [ ] Настроить environment variables
- [ ] Создать middleware для защиты routes
- [ ] Создать auth pages (`/sign-in`, `/sign-up`)

---

## 📚 Связанные документы

- `docs/ops/secrets_management.md` - Управление секретами
- `docs/ops/github_actions_setup.md` - Настройка GitHub Actions
- `services/auth-service/README.md` - Auth Service документация
- `docs/plans/PHASE_0_PROGRESS.md` - План реализации

---

## 🔍 Troubleshooting

### Проблема: Webhook Error Rate 16.7%

**Решение:**
- Проверить логи в Cloudflare Dashboard → Workers → Logs
- Убедиться, что endpoint `/v1/webhook` реализован в Auth Service
- Проверить валидацию подписи webhook
- Убедиться, что все события обрабатываются корректно

### Проблема: Cookies не работают между поддоменами

**Решение:**
- Проверить настройку Satellite Domain в Clerk Dashboard
- Убедиться, что все поддомены используют один домен верхнего уровня
- Проверить настройки CORS в Cloudflare

### Проблема: JWT не валидируется в backend

**Решение:**
- Проверить, что используется правильный `CLERK_SECRET_KEY`
- Убедиться, что токен не истёк
- Проверить алгоритм подписи (Clerk использует RS256)

---

**Последнее обновление:** 2025-12-12  
**Статус:** Частично настроено (Development окружение готово, требуется донастройка)

