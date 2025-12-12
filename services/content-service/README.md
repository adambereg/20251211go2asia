# Content Service

Content API Service для Go2Asia - агрегирует контент из доменных сервисов (Atlas, Pulse, Media).

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
- `GET /feed` - Aggregated content feed (Phase 1)

