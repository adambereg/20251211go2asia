# Тестовый деплой сервисов в Cloudflare Workers

Инструкция по выполнению тестового деплоя всех backend-сервисов в staging окружение.

---

## Предварительные требования

1. ✅ GitHub Secrets настроены:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

2. ✅ Workers созданы в Cloudflare Dashboard:
   - `go2asia-api-gateway-staging`
   - `go2asia-auth-service-staging`
   - `go2asia-content-service-staging`
   - `go2asia-referral-service-staging`
   - `go2asia-token-service-staging`

3. ✅ Переменные окружения настроены в Cloudflare Workers (через Dashboard)

---

## Способ 1: Деплой через GitHub Actions (рекомендуется)

### Автоматический деплой при push в master

1. Создайте коммит и запушьте в `master`:
   ```bash
   git add .
   git commit -m "test: trigger staging deployment"
   git push origin master
   ```

2. Перейдите в GitHub → Actions → "Deploy Backend to Staging"

3. Проверьте логи деплоя

### Ручной запуск через workflow_dispatch

1. Перейдите в GitHub → Actions → "Deploy Backend to Staging"

2. Нажмите "Run workflow" → выберите ветку `master` → "Run workflow"

3. Дождитесь завершения деплоя

---

## Способ 2: Локальный деплой через Wrangler CLI

### Установка зависимостей

```bash
pnpm install
```

### Настройка переменных окружения

Экспортируйте переменные окружения (или используйте `.env` файл):

```bash
export CLOUDFLARE_API_TOKEN="your-api-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

**Важно:** Не коммитьте `.env` файл в репозиторий!

### Деплой всех сервисов

Используйте скрипт из корня проекта:

```bash
# Linux/Mac
chmod +x scripts/test-deploy.sh
./scripts/test-deploy.sh

# Windows (PowerShell)
# Используйте Wrangler напрямую или Git Bash
```

Или деплой каждого сервиса отдельно:

```bash
# API Gateway
cd services/api-gateway
pnpm deploy:staging
cd ../..

# Auth Service
cd services/auth-service
pnpm deploy:staging
cd ../..

# Content Service
cd services/content-service
pnpm deploy:staging
cd ../..

# Referral Service
cd services/referral-service
pnpm deploy:staging
cd ../..

# Token Service
cd services/token-service
pnpm deploy:staging
cd ../..
```

Или используйте команду из корня:

```bash
pnpm deploy:staging
```

---

## ✅ Проверка деплоя

После успешного деплоя проверьте health check endpoints:

### Автоматическая проверка (скрипт)

Используйте скрипт для проверки всех сервисов:

```bash
# Linux/Mac
chmod +x scripts/check-health.sh
./scripts/check-health.sh

# Windows (PowerShell)
# Используйте curl команды ниже или Git Bash
```

### Ручная проверка

### Workers.dev URLs (для тестирования):

```bash
# API Gateway
curl https://go2asia-api-gateway-staging.fred89059599296.workers.dev/health

# Auth Service
curl https://go2asia-auth-service-staging.fred89059599296.workers.dev/health

# Content Service
curl https://go2asia-content-service-staging.fred89059599296.workers.dev/health

# Referral Service
curl https://go2asia-referral-service-staging.fred89059599296.workers.dev/health

# Token Service
curl https://go2asia-token-service-staging.fred89059599296.workers.dev/health
```

### Ожидаемый ответ:

```json
{
  "status": "ok",
  "service": "service-name",
  "environment": "staging",
  "timestamp": "2025-12-12T..."
}
```

### Custom Domain URLs (если настроены routes):

```bash
# API Gateway
curl https://api.go2asia.space/health

# Auth Service
curl https://auth.go2asia.space/health

# Content Service
curl https://content.go2asia.space/health

# Token Service
curl https://token.go2asia.space/health
```

---

## Troubleshooting

### Ошибка: "Authentication error"

**Причина:** Неверный `CLOUDFLARE_API_TOKEN` или отсутствует доступ.

**Решение:**
1. Проверьте токен в Cloudflare Dashboard → My Profile → API Tokens
2. Убедитесь, что токен имеет права на редактирование Workers
3. Проверьте, что токен добавлен в GitHub Secrets (для CI/CD)

### Ошибка: "Account ID mismatch"

**Причина:** Неверный `CLOUDFLARE_ACCOUNT_ID`.

**Решение:**
1. Проверьте Account ID в Cloudflare Dashboard (правый сайдбар)
2. Убедитесь, что Account ID добавлен в GitHub Secrets

### Ошибка: "Worker name already exists"

**Причина:** Worker с таким именем уже существует, но в другом аккаунте или с другими настройками.

**Решение:**
1. Проверьте имя Worker в `wrangler.toml`
2. Убедитесь, что используете правильный аккаунт Cloudflare

### Ошибка: "Route conflict"

**Причина:** Route уже используется другим Worker.

**Решение:**
1. Проверьте routes в Cloudflare Dashboard → Workers & Pages → Routes
2. Удалите конфликтующий route или измените pattern в `wrangler.toml`

### Health check возвращает ошибку

**Причина:** Worker не задеплоился или код содержит ошибки.

**Решение:**
1. Проверьте логи в Cloudflare Dashboard → Workers & Pages → [Worker] → Logs
2. Проверьте синтаксис TypeScript: `pnpm typecheck`
3. Проверьте локально: `pnpm dev` в директории сервиса

---

## Следующие шаги

После успешного тестового деплоя:

1. ✅ Проверьте все health check endpoints
2. ✅ Проверьте логи в Cloudflare Dashboard
3. ✅ Настройте routes для custom domains (если нужно)
4. ✅ Обновите документацию с реальными URLs
5. ✅ Переходите к реализации бизнес-логики (Phase 1)

---

## Связанные документы

- `docs/ops/github_actions_setup.md` - Настройка GitHub Actions
- `docs/ops/cloudflare_setup.md` - Настройка Cloudflare
- `docs/ops/phase0_4_checklist.md` - Чек-лист этапа 0.4

