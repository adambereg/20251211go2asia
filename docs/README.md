# Go2Asia Documentation — Overview

Документация Go2Asia организована как модульная система знаний, отражающая архитектуру всей экосистемы: от высокоуровневой концепции до дизайна, DevOps, микросервисов и мультиагентной разработки.

Этот документ служит навигационной картой по структуре `docs/`.

---

# 1. Структура директорий

```
docs/
│
├── overview/                    # Высокоуровневые документы (смысл и концепция проекта)
├── ai/                          # Мультиагентная разработка (Cursor / AI Actors)
├── modules/                     # Все клиентские модули Go2Asia (микрофронтенды)
├── backend/                     # Микросервисы backend (доменная логика)
├── architecture/                # Поперечные архитектурные слои системы
├── ops/                         # CI/CD, окружения, деплой, DevOps
├── design/                      # Дизайн-система Go2Asia (UI/UX)
├── content/                     # Контентные стандарты, SEO, локализация
└── decisions/                   # Architectural Decision Records (ADR)
```

Ниже — подробное описание каждой директории.

---

# 2. overview/ — высокоуровневые документы

```
docs/overview/
│   go2asia_overview.md
│   go2asia_architecture.md
│   go2asia_vibecoding_methodology.md
│   go2asia_ai_team_protocol.md
│   go2asia_modules_map.md
│   go2asia_infrastructure_overview.md
│   go2asia_style_guide.md
│   glossary.md
```

Содержит:
- общую концепцию платформы,
- архитектурный обзор,
- принципы вайб-кодинга,
- структуру модулей,
- словарь терминов.

Это точка входа для понимания проекта.

---

# 3. ai/ — мультиагентная система разработки Go2Asia

```
docs/ai/
│   roles_overview.md
│   agents_index.md
│   workflows.md
│
├── roles/          # системные промты всех AI-агентов
├── workflows/      # пайплайны, правила, iteration-loop
└── decisions/      # ADR по мультиагентной архитектуре
```

Здесь описано:
- как работают ИИ-агенты,
- какие роли есть (Оrchestrator, Architect, Dev, QA…),
- как построен цикл разработки,
- какие ограничения действуют (например, запрет на новые директории в MVP).

Эта директория критична для Cursor.

---

# 4. modules/ — описание всех клиентских модулей (микрофронтенды)

Каждый модуль имеет одинаковую структуру:

```
modules/{moduleName}/
│   overview.md
│   data_model.md
│   api_contracts.md
│   ui_structure.md
│   roadmap.md
```

Где `{moduleName}` — atlas, pulse, blog, guru, space, quest, connect, rielt, rf_partners.

Файлы описывают:
- бизнес-логику,
- какие страницы есть в модуле,
- какие данные он использует,
- какие API вызывает,
- структуру UI,
- план развития.

---

# 5. backend/ — backend-микросервисы

```
backend/
│   user_service/
│   guru_service/
│   atlas_service/
│   ...
```

Каждая папка представляет отдельный доменный микросервис.

Тут будут находиться:
- README сервиса,
- контракты API,
- схемы данных,
- интеграционные схемы.

---

# 6. architecture/ — архитектура всей платформы

```
architecture/
│   system_architecture.md
│   fe_architecture.md
│   be_architecture.md
│   api_architecture.md
│   data_flow.md
│   microfrontends.md
│   microservices.md
│   caching_and_performance.md
```

Эта папка описывает:
- общую систему,
- фронтенд-архитектуру,
- backend-архитектуру,
- маршруты API,
- жизненный цикл данных,
- паттерны микросервисов,
- производительность и кеши.

---

# 7. ops/ — DevOps, окружения и деплой

```
ops/
│   ci_cd.md
│   environments.md
│   secrets_management.md
│   monitoring.md
│   logging.md
│   cloudflare_setup.md
│   netlify_setup.md
│
└── deployment_guides/
       frontend_deploy.md
       backend_deploy.md
       zero_downtime_updates.md
```

Здесь:
- окружения Dev / Staging / Prod,
- деплой фронтенда и backend,
- стратегия zero-downtime,
- мониторинг,
- логи,
- работа с Cloudflare и Netlify.

---

# 8. design/ — дизайн-система

```
design/
│   ui_kit.md
│   design_tokens.md
│   mobile_vs_desktop.md
│
├── components/
│   ├── cards.md
│   ├── hero_sections.md
│   └── forms.md
│
└── layouts/
    ├── pwa_shell.md
    └── module_layouts.md
```

Содержит:
- дизайн-токены,
- компоненты,
- карточки,
- формы,
- hero-блоки,
- PWA shell,
- layout всех модулей.

Эта директория — основа для AI-фронтенд-разработчика.

---

# 9. content/ — контентные правила, SEO и локализация

```
content/
│   writing_guidelines.md
│   atlas_content_rules.md
│   pulse_event_rules.md
│   blog_editorial_guide.md
│   seo_strategy.md
│   localization.md
```

Здесь хранится:

- единый стиль контента,
- требования к Atlas, Pulse, Blog,
- SEO-правила,
- стандарты локализации.

Обязательно для AI, который пишет контент.

---

# 10. decisions/ — глобальные ADR (архитектурные решения)

```
decisions/
│   adr_0001_choose_microfrontends.md
│   adr_0002_choose_drizzle.md
│   adr_0003_content_service_pattern.md
│   adr_0004_monorepo_architecture.md
│   adr_0005_cloudflare_as_global_edge.md
│   adr_0006_api_gateway_strategy.md
│   adr_0007_microservice_boundary_rules.md
│   adr_0008_tokenomics_dual_contour_design.md
│   adr_0009_ai_multiactor_development_model.md
```

Каждый ADR фиксирует важное решение — чтобы архитектура не «ползла» и не распадалась.

---

# 11. Для Cursor и AI-агентов

Перед выполнением задачи AI должен:

1. Определить тему задачи.  
2. Найти нужный раздел в `docs/`.  
3. Проверить существующие ADR (особенно если задача архитектурная).  
4. Посмотреть карту контекста:  
   `docs/ai/context_map_for_cursor.md`.

Это обеспечивает согласованность разработки.

---

# 12. Как развивать документацию дальше

Не добавлять новые директории до выхода MVP.  
Все будущие изменения фиксируются через ADR.

---
