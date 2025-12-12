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

## 🔧 Настройка Clerk Application

### 1. Создание приложения в Clerk

1. Перейти в [Clerk Dashboard](https://dashboard.clerk.com/)
2. Создать новое приложение: **"Go2Asia"**
3. Выбрать регион (рекомендуется EU для РФ-аудитории)

### 2. Настройка доменов

#### Production домены:
- **Frontend URL:** `https://go2asia.space`
- **Backend URL:** `https://api.go2asia.space`
- **Auth URL:** `https://auth.go2asia.space`

#### Staging домены:
- **Frontend URL:** `https://staging.go2asia.space`
- **Backend URL:** `https://staging-api.go2asia.space`
- **Auth URL:** `https://auth.go2asia.space` (может использоваться общий)

### 3. Настройка Redirect URIs

В Clerk Dashboard → **Paths** → **Redirect URLs** добавить:

**Production:**
```
https://go2asia.space/*
https://www.go2asia.space/*
https://api.go2asia.space/*
https://auth.go2asia.space/*
```

**Staging:**
```
https://staging.go2asia.space/*
https://staging-api.go2asia.space/*
```

**Development (локально):**
```
http://localhost:3000/*
http://localhost:3001/*
```

### 4. Настройка Cookie Domain

Для SSO между поддоменами `*.go2asia.space`:

1. Перейти в **Settings** → **Domains**
2. Включить **"Use shared cookies"** или настроить **Cookie Domain** на `.go2asia.space`
3. Это позволит Clerk устанавливать cookies на уровне домена, обеспечивая SSO между всеми поддоменами

---

## 🔐 Получение API Keys и Secrets

### Frontend Keys (для Next.js приложения)

1. Перейти в **API Keys**
2. Скопировать:
   - **Publishable Key** (`pk_...`) — публичный ключ для фронтенда
   - **Secret Key** (`sk_...`) — секретный ключ для backend (хранить в secrets!)

### Backend Keys (для Workers)

1. Перейти в **API Keys** → **Backend API**
2. Создать новый Backend API (если еще не создан)
3. Скопировать:
   - **Secret Key** (`sk_live_...` или `sk_test_...`) — для валидации JWT в backend

### Webhook Secrets

1. Перейти в **Webhooks**
2. Создать новый webhook endpoint:
   - **URL:** `https://auth.go2asia.space/webhooks/clerk` (staging: `https://auth.go2asia.space/webhooks/clerk`)
   - **Events:** Выбрать все события пользователей (user.created, user.updated, user.deleted)
3. Скопировать **Signing Secret** (`whsec_...`) — для валидации webhook запросов

---

## 📝 Роли пользователей

### Определение ролей в Clerk

В Clerk Dashboard → **Users** → **Roles** создать следующие роли:

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

### Переменные окружения для Workers

Добавить в Cloudflare Workers (через Dashboard или wrangler.toml):

**Staging:**
```bash
CLERK_SECRET_KEY=sk_test_...          # Backend API Secret Key
CLERK_WEBHOOK_SECRET=whsec_...        # Webhook Signing Secret
CLERK_PUBLISHABLE_KEY=pk_test_...     # Publishable Key (если нужен)
```

**Production:**
```bash
CLERK_SECRET_KEY=sk_live_...          # Backend API Secret Key
CLERK_WEBHOOK_SECRET=whsec_...        # Webhook Signing Secret
CLERK_PUBLISHABLE_KEY=pk_live_...     # Publishable Key (если нужен)
```

### GitHub Secrets

Добавить в GitHub Secrets для использования в CI/CD:

- `CLERK_SECRET_KEY_STAGING` — для staging окружения
- `CLERK_SECRET_KEY_PRODUCTION` — для production окружения
- `CLERK_WEBHOOK_SECRET_STAGING` — для staging webhooks
- `CLERK_WEBHOOK_SECRET_PRODUCTION` — для production webhooks

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

Webhook endpoint будет реализован в `services/auth-service`:

- **URL:** `https://auth.go2asia.space/webhooks/clerk`
- **Method:** POST
- **Events:** 
  - `user.created`
  - `user.updated`
  - `user.deleted`
  - `session.created`
  - `session.ended`

### Валидация webhook запросов

Использовать `CLERK_WEBHOOK_SECRET` для валидации подписи запросов от Clerk.

Пример валидации (будет реализовано в Auth Service):

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

---

## ✅ Чек-лист настройки Clerk

### В Clerk Dashboard:
- [ ] Приложение создано
- [ ] Домены настроены (production и staging)
- [ ] Redirect URIs добавлены для всех поддоменов
- [ ] Cookie Domain настроен на `.go2asia.space` для SSO
- [ ] Роли пользователей созданы (spacer, vip, pro-curator, partner, admin)
- [ ] API Keys получены (Publishable Key, Secret Key)
- [ ] Webhook создан и настроен
- [ ] Webhook Secret скопирован

### В Cloudflare Workers:
- [ ] Переменные окружения добавлены в Auth Service:
  - [ ] `CLERK_SECRET_KEY`
  - [ ] `CLERK_WEBHOOK_SECRET`
- [ ] Переменные окружения добавлены в другие сервисы (если нужны)

### В GitHub Secrets:
- [ ] `CLERK_SECRET_KEY_STAGING` добавлен
- [ ] `CLERK_SECRET_KEY_PRODUCTION` добавлен
- [ ] `CLERK_WEBHOOK_SECRET_STAGING` добавлен
- [ ] `CLERK_WEBHOOK_SECRET_PRODUCTION` добавлен

### В Frontend (когда будет создан):
- [ ] `@clerk/nextjs` установлен
- [ ] Environment variables настроены
- [ ] Middleware создан
- [ ] Auth pages созданы (`/sign-in`, `/sign-up`)

---

## 📚 Связанные документы

- `docs/ops/secrets_management.md` - Управление секретами
- `docs/ops/github_actions_setup.md` - Настройка GitHub Actions
- `services/auth-service/README.md` - Auth Service документация
- `docs/plans/IMPLEMENTATION_PLAN_V1.md` - План реализации

---

## 🔍 Troubleshooting

### Проблема: Cookies не работают между поддоменами

**Решение:**
- Проверить настройку Cookie Domain в Clerk Dashboard
- Убедиться, что все поддомены используют один домен верхнего уровня
- Проверить настройки CORS в Cloudflare

### Проблема: Webhook не доходит до Auth Service

**Решение:**
- Проверить URL webhook в Clerk Dashboard
- Проверить, что Worker доступен по адресу `auth.go2asia.space`
- Проверить логи в Cloudflare Dashboard → Workers → Logs
- Проверить валидацию подписи webhook

### Проблема: JWT не валидируется в backend

**Решение:**
- Проверить, что используется правильный `CLERK_SECRET_KEY`
- Убедиться, что токен не истёк
- Проверить алгоритм подписи (Clerk использует RS256)

---

**Последнее обновление:** 2025-12-12

