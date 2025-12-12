# Referral Service

Сервис реферальной программы для Go2Asia - управляет реферальными кодами и связями.

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
- `GET /codes` - Referral codes management (Phase 1)

