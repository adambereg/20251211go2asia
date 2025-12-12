# API Gateway Service

API Gateway для Go2Asia - маршрутизирует запросы к соответствующим backend микросервисам.

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

## Структура

- `src/index.ts` - основной Worker код
- `wrangler.toml` - конфигурация Cloudflare Workers

## Environment Variables

- `ENVIRONMENT` - окружение (staging/production)

