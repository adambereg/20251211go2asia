# Auth Service

Сервис аутентификации для Go2Asia - обрабатывает вебхуки Clerk и управление пользователями.

## Развёртывание

### Staging
```bash
pnpm deploy:staging
```

### Production
```bash
pnpm deploy:prod
```

## Локальная разработка

```bash
pnpm dev
```

## Endpoints

- `GET /health` - Health check
- `GET /ready` - Readiness check
- `POST /webhooks/clerk` - Clerk webhook handler (Phase 1)

