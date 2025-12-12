# Настройка GitHub Actions для Go2Asia

Этот документ описывает настройку CI/CD pipelines через GitHub Actions.

---

## 📋 Обзор Workflows

### 1. CI (`ci.yml`)
Запускается на каждый PR и push в `main`/`master`:
- ✅ Lint, Typecheck, Build
- ✅ Валидация OpenAPI через Spectral
- ✅ Генерация типов/SDK с проверкой diffs

### 2. Preview Deployment (`preview.yml`)
Запускается на каждый PR:
- 🚀 Автоматический деплой preview на Netlify
- 💬 Комментарий в PR с уведомлением о preview

**Примечание:** Для автоматических preview deployments рекомендуется использовать встроенную интеграцию Netlify с GitHub (Site settings → Build & deploy → Continuous Deployment). GitHub Actions workflow можно использовать для дополнительных проверок или кастомных деплоев.

### 3. Staging Deployment (`staging.yml`)
Запускается при push в `main`/`master`:
- 🚀 Автоматический деплой в staging окружение
- ✅ Smoke тесты после деплоя

### 4. Production Deployment (`production.yml`)
Запускается вручную через `workflow_dispatch`:
- 🚀 Деплой в production
- 🏷️ Создание GitHub Release

---

## 🔐 Настройка Secrets

Необходимо добавить следующие secrets в GitHub репозиторий:

**Settings → Secrets and variables → Actions → New repository secret**

### Netlify Secrets

1. **NETLIFY_AUTH_TOKEN**
   - Получить: Netlify Dashboard → User settings → Applications → New access token
   - Описание: Токен для авторизации в Netlify API

2. **NETLIFY_SITE_ID** (для preview)
   - Получить: Netlify Dashboard → Site settings → General → Site details → Site ID
   - Описание: ID сайта для preview deployments

3. **NETLIFY_SITE_ID_STAGING** (для staging)
   - Получить: Создать отдельный сайт в Netlify для staging
   - Описание: ID staging сайта

4. **NETLIFY_SITE_ID_PROD** (для production)
   - Получить: Создать production сайт в Netlify
   - Описание: ID production сайта

---

## 🛠️ Настройка Environments

### Staging Environment

1. Перейти в **Settings → Environments**
2. Создать environment `staging`
3. Настроить protection rules (опционально):
   - Required reviewers
   - Wait timer

### Production Environment

1. Создать environment `production`
2. Обязательно настроить protection rules:
   - ✅ Required reviewers (минимум 1)
   - ⏱️ Wait timer (рекомендуется 5 минут)
   - 🔒 Deployment branches: только `main`

---

## ✅ Проверка настройки

После настройки secrets и environments:

1. Создать тестовый PR
2. Проверить, что:
   - ✅ CI workflow запустился и прошёл успешно
   - ✅ Preview deployment создался
   - ✅ Комментарий с preview URL появился в PR

3. После merge в `main`:
   - ✅ Staging deployment запустился автоматически
   - ✅ Деплой прошёл успешно

---

## 🔍 Troubleshooting

### CI не запускается
- Проверить, что файлы workflows находятся в `.github/workflows/`
- Проверить синтаксис YAML файлов
- Проверить триггеры (`on:` секция)

### Preview deployment не работает
- Проверить наличие `NETLIFY_AUTH_TOKEN` и `NETLIFY_SITE_ID` в secrets
- Проверить права токена в Netlify
- Проверить логи в Actions → конкретный workflow run

### Генерация типов/SDK падает
- Убедиться, что `pnpm gen:all` работает локально
- Проверить, что OpenAPI файлы валидны (`pnpm validate:openapi`)
- Проверить, что все зависимости установлены

---

## 📚 Связанные документы

- `ops/netlify_setup.md` - Настройка Netlify
- `ops/ci_cd.md` - Общий подход к CI/CD
- `playbooks/ENGINEERING_PLAYBOOK.md` - Раздел 5: CI/CD Pipeline

