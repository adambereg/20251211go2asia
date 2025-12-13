# Phase 0.7 Checklist — Чеклист запуска деплоя фронтенда

**ВАЖНО:** Этот чеклист используется **ПОСЛЕ завершения Phase 0** для фактического запуска деплоя фронтенда на Netlify.

**Текущий статус:** Phase 0.7 — подготовка завершена, деплой **НЕ выполнен**.

---

## 📋 Предварительные требования

Перед началом деплоя убедитесь, что:

- [ ] Phase 0 полностью завершён
- [ ] Фронтенд в `apps/go2asia-pwa-shell` готов к production
- [ ] Все тесты пройдены
- [ ] Код проверен и залит в репозиторий
- [ ] Документация актуальна

---

## 🚀 Шаг 1: Подготовка Netlify

### 1.1. Создание Netlify сайта

- [ ] Войти в Netlify Dashboard
- [ ] Создать новый сайт (Add new site → Import an existing project)
- [ ] Подключить GitHub репозиторий Go2Asia
- [ ] Выбрать ветку `main` для production деплоя

### 1.2. Настройка Build Settings

- [ ] **Base directory:** оставить пустым (или указать корень репозитория)
- [ ] **Build command:** `cd apps/go2asia-pwa-shell && pnpm install --frozen-lockfile && pnpm build`
- [ ] **Publish directory:** `apps/go2asia-pwa-shell/.next`
- [ ] **Node version:** 20
- [ ] **PNPM version:** 8

**Проверка:**
- [ ] Убедиться, что `netlify.toml` находится в `apps/go2asia-pwa-shell/`
- [ ] Netlify должен автоматически подхватить настройки из `netlify.toml`

### 1.3. Настройка переменных окружения

**Production переменные (Netlify Dashboard → Site settings → Environment variables):**

- [ ] `NODE_ENV` = `production`
- [ ] `NEXT_PUBLIC_API_URL` = `https://api.go2asia.space`
- [ ] `NEXT_PUBLIC_APP_URL` = `https://go2asia.app`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_...` (production ключ Clerk)
- [ ] `CLERK_SECRET_KEY` = `sk_live_...` (production секрет Clerk)

**Staging переменные (для branch deploy `develop`):**

- [ ] `NODE_ENV` = `production`
- [ ] `NEXT_PUBLIC_API_URL` = `https://api-staging.go2asia.space`
- [ ] `NEXT_PUBLIC_APP_URL` = `https://staging.go2asia.app`
- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_test_...` (staging ключ Clerk)
- [ ] `CLERK_SECRET_KEY` = `sk_test_...` (staging секрет Clerk)

**Проверка:**
- [ ] Все переменные с префиксом `NEXT_PUBLIC_` доступны в браузере
- [ ] Секреты (`CLERK_SECRET_KEY`) НЕ имеют префикса `NEXT_PUBLIC_`

### 1.4. Настройка Deploy Contexts

- [ ] **Production:** ветка `main` → автоматический деплой
- [ ] **Staging:** ветка `develop` → branch deploy на `staging.go2asia.app`
- [ ] **Preview:** Pull Requests → автоматические preview деплои

**Проверка:**
- [ ] Настройки в `netlify.toml` соответствуют настройкам в Netlify Dashboard

---

## 🌐 Шаг 2: Настройка DNS в Cloudflare

### 2.1. Production домен

- [ ] В Cloudflare Dashboard → DNS → Records
- [ ] Создать CNAME запись:
  - **Name:** `go2asia.app` (или `@` для корневого домена)
  - **Target:** `{netlify-site-name}.netlify.app`
  - **Proxy status:** 🟧 Proxied (включено)
  - **TTL:** Auto

### 2.2. Staging домен

- [ ] Создать CNAME запись:
  - **Name:** `staging.go2asia.app`
  - **Target:** `{netlify-staging-site-name}.netlify.app`
  - **Proxy status:** 🟧 Proxied (включено)
  - **TTL:** Auto

### 2.3. WWW редирект (опционально)

- [ ] Создать CNAME запись:
  - **Name:** `www.go2asia.app`
  - **Target:** `go2asia.app`
  - **Proxy status:** 🟧 Proxied (включено)
- [ ] Настроить редирект через Cloudflare Page Rules или Netlify redirects

**Проверка:**
- [ ] DNS записи применены (может занять несколько минут)
- [ ] Проверить через `dig` или онлайн DNS checker

---

## 🔒 Шаг 3: Настройка SSL/TLS в Cloudflare

### 3.1. SSL/TLS режим

- [ ] Cloudflare Dashboard → SSL/TLS → Overview
- [ ] Установить режим: **Full (strict)**
- [ ] Убедиться, что Netlify предоставляет валидный SSL сертификат

### 3.2. Always Use HTTPS

- [ ] Cloudflare Dashboard → SSL/TLS → Edge Certificates
- [ ] Включить **Always Use HTTPS**
- [ ] Проверить, что HTTP запросы редиректятся на HTTPS

**Проверка:**
- [ ] Открыть `http://go2asia.app` → должен редиректить на `https://go2asia.app`
- [ ] Проверить SSL сертификат в браузере

---

## 🛡️ Шаг 4: Настройка Security Headers в Cloudflare

### 4.1. HTTP Headers через Transform Rules

- [ ] Cloudflare Dashboard → Rules → Transform Rules → Modify Response Header
- [ ] Создать правила для добавления security headers:

**Правило 1: Базовые Security Headers**
- **Rule name:** `Security Headers - Frontend`
- **When:** `(http.host eq "go2asia.app") or (http.host eq "staging.go2asia.app")`
- **Then:** Set static
  - `X-Content-Type-Options`: `nosniff`
  - `X-Frame-Options`: `DENY`
  - `X-XSS-Protection`: `1; mode=block`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`
  - `Permissions-Policy`: `camera=(), microphone=(), geolocation=(self)`

**Правило 2: CSP (Content Security Policy)**
- **Rule name:** `CSP - Frontend`
- **When:** `(http.host eq "go2asia.app") or (http.host eq "staging.go2asia.app")`
- **Then:** Set static
  - `Content-Security-Policy`: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.clerk.com https://api.go2asia.space https://*.go2asia.space; frame-src 'self' https://*.clerk.com;`

**Важно:**
- CSP может быть переопределена из `netlify.toml`
- Если CSP настроена в `netlify.toml`, можно не дублировать в Cloudflare
- CSP будет дорабатываться после тестирования

**Проверка:**
- [ ] Открыть DevTools → Network → проверить Response Headers
- [ ] Убедиться, что все security headers присутствуют

### 4.2. HSTS (HTTP Strict Transport Security)

**⚠️ ВАЖНО: HSTS включается ТОЛЬКО после полной стабилизации!**

- [ ] Cloudflare Dashboard → SSL/TLS → Edge Certificates
- [ ] Найти раздел **HTTP Strict Transport Security (HSTS)**
- [ ] Включить HSTS
- [ ] Настроить:
  - **Max Age:** 12 месяцев (31536000 секунд)
  - **Include Subdomains:** включено
  - **Preload:** включено (опционально, требует регистрации в HSTS preload list)

**Когда включать:**
- [ ] После успешного тестирования в staging
- [ ] После проверки всех поддоменов
- [ ] После финальной проверки HTTPS на всех страницах
- [ ] После проверки, что нет проблем с mixed content

**Проверка:**
- [ ] Открыть DevTools → Network → проверить `Strict-Transport-Security` header
- [ ] Проверить через [SSL Labs](https://www.ssllabs.com/ssltest/)

---

## 📦 Шаг 5: Настройка кеширования в Cloudflare

### 5.1. Page Rules / Configuration Rules

- [ ] Cloudflare Dashboard → Rules → Configuration Rules (или Page Rules для legacy)

**Правило 1: Статические ассеты Next.js**
- **Rule name:** `Cache - Next.js Static Assets`
- **When:** `(http.host eq "go2asia.app" or http.host eq "staging.go2asia.app") and (http.request.uri.path matches "^/_next/static/.*")`
- **Then:**
  - **Cache Level:** Cache Everything
  - **Edge TTL:** 1 месяц (2592000 секунд)
  - **Browser TTL:** 1 месяц (2592000 секунд)

**Правило 2: HTML страницы (bypass cache)**
- **Rule name:** `Cache - HTML Bypass`
- **When:** `(http.host eq "go2asia.app" or http.host eq "staging.go2asia.app") and (http.request.uri.path matches ".*\\.html$" or http.request.uri.path eq "/")`
- **Then:**
  - **Cache Level:** Bypass
  - **Edge TTL:** 0
  - **Browser TTL:** 0

**Правило 3: Изображения**
- **Rule name:** `Cache - Images`
- **When:** `(http.host eq "go2asia.app" or http.host eq "staging.go2asia.app") and (http.request.uri.path matches "^/images/.*")`
- **Then:**
  - **Cache Level:** Cache Everything
  - **Edge TTL:** 1 день (86400 секунд)
  - **Browser TTL:** 1 день (86400 секунд)

**Проверка:**
- [ ] Открыть DevTools → Network → проверить Cache-Control headers
- [ ] Убедиться, что статика кешируется, HTML — нет

---

## 🧪 Шаг 6: Тестирование деплоя

### 6.1. Первый деплой

- [ ] Запустить деплой в Netlify (через push в `main` или вручную)
- [ ] Проверить логи сборки в Netlify Dashboard
- [ ] Убедиться, что сборка успешна

### 6.2. Проверка production

- [ ] Открыть `https://go2asia.app`
- [ ] Проверить:
  - [ ] Главная страница загружается
  - [ ] Навигация работает
  - [ ] API запросы проходят (DevTools → Network)
  - [ ] Аутентификация работает (Clerk)
  - [ ] PWA функциональность работает (manifest, service worker)

### 6.3. Проверка staging

- [ ] Открыть `https://staging.go2asia.app`
- [ ] Проверить те же пункты, что и для production

### 6.4. Проверка Security Headers

- [ ] Открыть DevTools → Network → любой запрос
- [ ] Проверить Response Headers:
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Content-Security-Policy` присутствует
  - [ ] `Strict-Transport-Security` присутствует (если HSTS включена)

### 6.5. Проверка кеширования

- [ ] Открыть DevTools → Network
- [ ] Перезагрузить страницу несколько раз
- [ ] Проверить:
  - [ ] Статические ассеты (`/_next/static/*`) кешируются
  - [ ] HTML страницы не кешируются
  - [ ] Изображения кешируются

### 6.6. Проверка SSL

- [ ] Проверить через [SSL Labs](https://www.ssllabs.com/ssltest/)
- [ ] Убедиться, что рейтинг A или A+
- [ ] Проверить, что нет проблем с mixed content

---

## 🔄 Шаг 7: Настройка мониторинга (опционально)

### 7.1. Netlify Analytics

- [ ] Включить Netlify Analytics (если доступно)
- [ ] Настроить алерты на ошибки сборки

### 7.2. Cloudflare Analytics

- [ ] Проверить Cloudflare Analytics → Traffic
- [ ] Настроить алерты на аномалии (если нужно)

### 7.3. Frontend мониторинг (будущее)

- [ ] Настроить Sentry для error tracking (если нужно)
- [ ] Настроить Analytics (Google Analytics / Plausible) (если нужно)

---

## ✅ Финальная проверка

Перед объявлением деплоя успешным:

- [ ] Production сайт доступен и работает
- [ ] Staging сайт доступен и работает
- [ ] Все security headers присутствуют
- [ ] Кеширование работает корректно
- [ ] SSL/TLS настроен правильно
- [ ] DNS настроен правильно
- [ ] Нет ошибок в консоли браузера
- [ ] Нет ошибок в Netlify логах
- [ ] Нет ошибок в Cloudflare логах

---

## 📝 Документация

После успешного деплоя:

- [ ] Обновить `docs/ops/phase0_7_status.md` (если создан)
- [ ] Задокументировать любые отклонения от плана
- [ ] Задокументировать настройки, которые были изменены

---

## 🆘 Troubleshooting

### Проблема: Сборка падает в Netlify

**Решение:**
- Проверить логи сборки в Netlify Dashboard
- Убедиться, что все зависимости установлены
- Проверить переменные окружения
- Проверить, что `netlify.toml` находится в правильной директории

### Проблема: Сайт не доступен после деплоя

**Решение:**
- Проверить DNS записи в Cloudflare
- Проверить, что Netlify деплой успешен
- Проверить SSL/TLS настройки
- Проверить, что домен правильно подключен в Netlify

### Проблема: Security Headers не работают

**Решение:**
- Проверить, что правила в Cloudflare применены
- Проверить, что `netlify.toml` содержит правильные headers
- Убедиться, что нет конфликтов между Netlify и Cloudflare headers

### Проблема: Кеширование не работает

**Решение:**
- Проверить Page Rules / Configuration Rules в Cloudflare
- Проверить Cache-Control headers в ответах
- Очистить кеш Cloudflare (Purge Everything)

---

## 📚 Связанные документы

- `docs/ops/phase0_7_plan.md` — план Phase 0.7
- `docs/architecture/frontend_deployment.md` — архитектура деплоя
- `docs/ops/netlify_setup.md` — настройка Netlify
- `docs/ops/cloudflare_setup.md` — настройка Cloudflare
- `apps/go2asia-pwa-shell/netlify.toml` — Netlify конфигурация

---

**Дата создания:** 2025-01-12  
**Последнее обновление:** 2025-01-12
