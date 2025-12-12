# Настройка GitHub Actions для Go2Asia

Этот документ описывает настройку CI/CD pipelines через GitHub Actions.

---

## 📋 Архитектура деплоя

**Важно:** В проекте используется раздельная архитектура деплоя:

- **Frontend** → деплоится через **Netlify** (автоматически при пуше в GitHub)
- **Backend** → деплоится через **GitHub Actions** (staging → production)

Netlify автоматически создаёт preview-деплои для каждого PR. GitHub Actions не управляют деплоем фронтенда.

---

## 📋 Обзор Workflows

### 1. CI (`ci.yml`)
Запускается на каждый PR и push в `main`/`master`:
- ✅ Lint, Typecheck, Build
- ✅ Валидация OpenAPI через Spectral
- ✅ Генерация типов/SDK с проверкой diffs

### 2. Staging Deployment (`staging.yml`)
Запускается при push в `main`/`master`:
- 🚀 Автоматический деплой backend-сервисов в staging окружение (Cloudflare Workers)
- ✅ Smoke тесты после деплоя

### 3. Production Deployment (`production.yml`)
Запускается вручную через `workflow_dispatch`:
- 🚀 Деплой backend-сервисов в production (Cloudflare Workers)
- 🏷️ Создание GitHub Release

---

## 🔐 Настройка Secrets

Необходимо добавить следующие secrets в GitHub репозиторий:

**Settings → Secrets and variables → Actions → New repository secret**

### Cloudflare Secrets (для backend-деплоя)

1. **CLOUDFLARE_API_TOKEN**
   - Получить: Cloudflare Dashboard → My Profile → API Tokens → Create Token
   - Права: Account → Cloudflare Workers → Edit
   - Описание: Токен для деплоя Cloudflare Workers

2. **CLOUDFLARE_ACCOUNT_ID**
   - Получить: Cloudflare Dashboard → Right sidebar → Account ID
   - Описание: ID аккаунта Cloudflare

3. **CLOUDFLARE_STAGING_ACCOUNT_ID** (опционально, если staging в другом аккаунте)
   - Описание: ID staging аккаунта Cloudflare

### Database Secrets (для миграций)

4. **DATABASE_URL_STAGING**
   - Получить: Neon Dashboard → Project → Connection String
   - Описание: Connection string для staging базы данных

5. **DATABASE_URL_PRODUCTION**
   - Получить: Neon Dashboard → Project → Connection String
   - Описание: Connection string для production базы данных

---

## 🛠️ Настройка Environments

### Staging Environment

1. Перейти в **Settings → Environments**
2. Создать environment `staging`
3. Добавить secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `DATABASE_URL_STAGING`
4. Настроить protection rules (опционально):
   - Required reviewers
   - Wait timer

### Production Environment

1. Создать environment `production`
2. Добавить secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `DATABASE_URL_PRODUCTION`
3. Обязательно настроить protection rules:
   - ✅ Required reviewers (минимум 1)
   - ⏱️ Wait timer (рекомендуется 5 минут)
   - 🔒 Deployment branches: только `main`

---

## 🌐 Настройка Netlify (Frontend)

**Примечание:** Netlify настраивается отдельно и не требует GitHub Actions workflows.

1. Подключить репозиторий в Netlify Dashboard
2. Настроить автоматический деплой:
   - **Build command:** `pnpm build --filter='./capsules/frontend-shell/apps/go2asia-pwa-shell'`
   - **Publish directory:** `.next` (или соответствующий output директории)
3. Netlify автоматически создаст preview-деплои для каждого PR

Подробнее см. `ops/netlify_setup.md`

---

## ✅ Проверка настройки

После настройки secrets и environments:

1. Создать тестовый PR
2. Проверить, что:
   - ✅ CI workflow запустился и прошёл успешно
   - ✅ Netlify автоматически создал preview-деплой (проверить в Netlify Dashboard)

3. После merge в `main`:
   - ✅ Staging deployment запустился автоматически
   - ✅ Backend-сервисы задеплоились в Cloudflare Workers
   - ✅ Деплой прошёл успешно

---

## 🔍 Troubleshooting

### CI не запускается
- Проверить, что файлы workflows находятся в `.github/workflows/`
- Проверить синтаксис YAML файлов
- Проверить триггеры (`on:` секция)

### Backend deployment не работает
- Проверить наличие Cloudflare secrets в GitHub Environments
- Проверить права токена в Cloudflare (должен иметь права на Workers)
- Проверить логи в Actions → конкретный workflow run

### Генерация типов/SDK падает
- Убедиться, что `pnpm gen:all` работает локально
- Проверить, что OpenAPI файлы валидны (`pnpm validate:openapi`)
- Проверить, что все зависимости установлены

### Netlify preview не создаётся
- Проверить настройки Continuous Deployment в Netlify Dashboard
- Проверить, что репозиторий подключен к Netlify
- Проверить build logs в Netlify Dashboard

---

## 📚 Связанные документы

- `ops/netlify_setup.md` - Настройка Netlify для фронтенда
- `ops/cloudflare_setup.md` - Настройка Cloudflare для backend
- `ops/ci_cd.md` - Общий подход к CI/CD
- `playbooks/ENGINEERING_PLAYBOOK.md` - Раздел 5: CI/CD Pipeline
