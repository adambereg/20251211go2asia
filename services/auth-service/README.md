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

## Clerk Integration

Auth Service интегрирован с Clerk для управления пользователями и аутентификацией.

### Environment Variables

- `CLERK_SECRET_KEY` - Backend API Secret Key из Clerk Dashboard
- `CLERK_WEBHOOK_SECRET` - Webhook Signing Secret из Clerk Dashboard

### Webhook Endpoint

Webhook endpoint `/webhooks/clerk` будет реализован в Phase 1 для обработки событий:
- `user.created` - создание нового пользователя
- `user.updated` - обновление данных пользователя
- `user.deleted` - удаление пользователя
- `session.created` - создание сессии
- `session.ended` - завершение сессии

Подробнее см. `docs/ops/clerk_setup.md`

