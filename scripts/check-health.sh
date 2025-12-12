#!/bin/bash
# Скрипт для проверки health check endpoints всех сервисов

set -e

echo "🔍 Checking health endpoints for all Go2Asia services..."
echo ""

SERVICES=(
  "api-gateway:go2asia-api-gateway-staging"
  "auth-service:go2asia-auth-service-staging"
  "content-service:go2asia-content-service-staging"
  "referral-service:go2asia-referral-service-staging"
  "token-service:go2asia-token-service-staging"
)

SUBDOMAIN="fred89059599296.workers.dev"

for service_info in "${SERVICES[@]}"; do
  IFS=':' read -r service_name worker_name <<< "$service_info"
  url="https://${worker_name}.${SUBDOMAIN}/health"
  
  echo "📡 Checking $service_name..."
  echo "   URL: $url"
  
  if response=$(curl -s -w "\n%{http_code}" "$url" 2>/dev/null); then
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" = "200" ]; then
      echo "   ✅ Status: OK (HTTP $http_code)"
      echo "   Response: $body" | jq '.' 2>/dev/null || echo "   Response: $body"
    else
      echo "   ⚠️  Status: HTTP $http_code"
      echo "   Response: $body"
    fi
  else
    echo "   ❌ Failed to connect"
  fi
  echo ""
done

echo "✅ Health check complete!"

