# Token Service

Сервис токеномики для Go2Asia - управляет балансами Points, G2A Token и NFT.

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
- `GET /balance` - Get user balance (Points in Phase 1)

## Фазы реализации

- **Phase 1**: Только Points
- **Phase 3**: Расширение на G2A Token и NFT

