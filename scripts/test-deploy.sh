#!/bin/bash
# Тестовый скрипт для деплоя всех сервисов в staging

set -e

echo "🚀 Starting test deployment to Cloudflare Workers (staging)..."

# Проверка наличия необходимых переменных окружения
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ Error: CLOUDFLARE_API_TOKEN is not set"
  exit 1
fi

if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "❌ Error: CLOUDFLARE_ACCOUNT_ID is not set"
  exit 1
fi

# Список сервисов для деплоя
SERVICES=(
  "api-gateway"
  "auth-service"
  "content-service"
  "referral-service"
  "token-service"
)

# Деплой каждого сервиса
for service in "${SERVICES[@]}"; do
  echo ""
  echo "📦 Deploying $service..."
  cd "services/$service"
  pnpm deploy:staging
  cd ../..
  echo "✅ $service deployed successfully"
done

echo ""
echo "✅ All services deployed successfully!"
echo ""
echo "🌐 Test endpoints:"
echo "  - API Gateway: https://go2asia-api-gateway-staging.fred89059599296.workers.dev/health"
echo "  - Auth Service: https://go2asia-auth-service-staging.fred89059599296.workers.dev/health"
echo "  - Content Service: https://go2asia-content-service-staging.fred89059599296.workers.dev/health"
echo "  - Referral Service: https://go2asia-referral-service-staging.fred89059599296.workers.dev/health"
echo "  - Token Service: https://go2asia-token-service-staging.fred89059599296.workers.dev/health"

