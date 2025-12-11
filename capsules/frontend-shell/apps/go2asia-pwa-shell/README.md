# Go2Asia PWA Shell

Next.js 15 приложение с App Router для Go2Asia платформы. 

## Установка

```bash
pnpm install
```

## Разработка

```bash
pnpm dev
```

Приложение будет доступно на `http://localhost:3000`

## Интеграция с Clerk

См. [документацию по интеграции Clerk](../../docs/frontend/CLERK_INTEGRATION.md)

## Использование SDK

SDK автоматически генерируется из OpenAPI спецификаций. После генерации используйте hooks:

```tsx
import { useGetBalance } from '@go2asia/sdk';

function MyComponent() {
  const { data, isLoading } = useGetBalance();
  // ...
}
```

## Переменные окружения

Создайте `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_API_URL=https://api-staging.go2asia.space
```

