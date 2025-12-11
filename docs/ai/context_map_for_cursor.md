# Context Map for Cursor — как ориентироваться в docs/ для Go2Asia

Этот документ предназначен **для Cursor и ИИ-агентов**.  
Задача — быстро понимать, какие документы читать перед работой над задачей.

---

## 1. Приоритет чтения

Перед тем как что-то менять в коде или документации, придерживайся такого порядка:

1. **ADR (решения)**  
   - Глобальные: `docs/decisions/adr_*.md`  
   - AI-специфичные: `docs/ai/decisions/adr_*.md`  
   → Они описывают, *почему* система устроена именно так. Их нельзя игнорировать.

2. **Высокоуровневый обзор**  
   - `docs/overview/go2asia_overview.md`  
   - `docs/overview/go2asia_architecture.md`  
   - `docs/overview/go2asia_modules_map.md`  

3. **Профильная область задачи**  
   - архитектура → `docs/architecture/`  
   - фронтенд-модули → `docs/modules/`  
   - backend-сервисы → `docs/backend/`  
   - DevOps → `docs/ops/`  
   - дизайн → `docs/design/`  
   - контент / SEO → `docs/content/`  
   - мультиагентка → `docs/ai/`

---

## 2. Карта по типам задач

### 2.1. Архитектура системы

Когда задача про архитектуру, границы сервисов, диаграммы:

- Читай:
  - `docs/overview/go2asia_architecture.md`
  - `docs/architecture/system_architecture.md`
  - `docs/architecture/microfrontends.md`
  - `docs/architecture/microservices.md`
  - `docs/decisions/adr_0001_choose_microfrontends.md`
  - `docs/decisions/adr_0004_monorepo_architecture.md`
  - `docs/decisions/adr_0007_microservice_boundary_rules.md`

---

### 2.2. Фронтенд и PWA-модули

Когда задача про UI, страницы, роутинг, данные в Atlas/Pulse/Blog и т.п.:

- Общие правила:
  - `docs/design/ui_kit.md`
  - `docs/design/design_tokens.md`
  - `docs/design/mobile_vs_desktop.md`
  - `docs/design/components/*.md`
  - `docs/design/layouts/*.md`

- Конкретный модуль (пример Atlas):
  - `docs/modules/atlas/overview.md`
  - `docs/modules/atlas/ui_structure.md`
  - `docs/modules/atlas/data_model.md`
  - `docs/modules/atlas/api_contracts.md`
  - `docs/modules/atlas/roadmap.md`

Аналогично для `pulse/`, `blog/`, `guru/`, `space/`, `quest/`, `connect/`, `rielt/`, `rf_partners/`.

---

### 2.3. Backend-микросервисы

Когда задача про API, модели БД, интеграции, бизнес-логику:

- Читай:
  - `docs/architecture/be_architecture.md`
  - `docs/architecture/api_architecture.md`
  - `docs/architecture/data_flow.md`
  - профильный ADR:  
    - content → `adr_0003_content_service_pattern.md`  
    - токены → `adr_0008_tokenomics_dual_contour_design.md`  
    - Cloudflare / API → `adr_0005_cloudflare_as_global_edge.md`, `adr_0006_api_gateway_strategy.md`

- По конкретному сервису:
  - соответствующую папку в `docs/backend/` (например, `docs/backend/rielt_service/`)  
    → здесь будут README, схемы данных и контракты для конкретного микросервиса.

---

### 2.4. DevOps / CI/CD / Deploy

Когда задача про окружения, деплой, Cloudflare, Netlify:

- Читай:
  - `docs/ops/ci_cd.md`
  - `docs/ops/environments.md`
  - `docs/ops/secrets_management.md`
  - `docs/ops/monitoring.md`
  - `docs/ops/logging.md`
  - `docs/ops/cloudflare_setup.md`
  - `docs/ops/netlify_setup.md`
  - `docs/ops/deployment_guides/frontend_deploy.md`
  - `docs/ops/deployment_guides/backend_deploy.md`
  - `docs/ops/deployment_guides/zero_downtime_updates.md`

---

### 2.5. Дизайн и UX

Когда задача про визуал, карточки, адаптив, новые компоненты:

- Читай:
  - `docs/design/ui_kit.md`
  - `docs/design/design_tokens.md`
  - `docs/design/components/cards.md`
  - `docs/design/components/hero_sections.md`
  - `docs/design/components/forms.md`
  - `docs/design/layouts/pwa_shell.md`
  - `docs/design/layouts/module_layouts.md`
  - `docs/design/mobile_vs_desktop.md`

---

### 2.6. Контент, редактура, SEO, локализация

Когда нужно текстовое наполнение, правила для Atlas/Pulse/Blog, SEO:

- Читай:
  - `docs/content/writing_guidelines.md`
  - `docs/content/atlas_content_rules.md`
  - `docs/content/pulse_event_rules.md`
  - `docs/content/blog_editorial_guide.md`
  - `docs/content/seo_strategy.md`
  - `docs/content/localization.md`

---

### 2.7. Мультиагентная разработка (AI-команда)

Когда задача про роли ИИ-агентов, пайплайны, оркестрацию:

- Обзор:
  - `docs/ai/roles_overview.md`
  - `docs/ai/workflows.md`
  - `docs/ai/agents_index.md`

- Роли:
  - `docs/ai/roles/*.md`

- Пайплайны:
  - `docs/ai/workflows/pipeline_overview.md`
  - `docs/ai/workflows/iteration_rules.md`
  - `docs/ai/workflows/agent_lifecycle.md`
  - `docs/ai/workflows/auto_routing.md`

- AI-ADR:
  - `docs/ai/decisions/adr_0001_multiagent_architecture.md`
  - `docs/ai/decisions/adr_0002_roles_vs_workflows_structure.md`
  - `docs/ai/decisions/adr_0003_no_extra_directories_for_mvp.md`

---

## 3. Как выбирать «капсулу контекста»

При работе над задачей Cursor должен:

1. Определить домен задачи:
   - архитектура / фронтенд / backend / ops / дизайн / контент / мультиагентка.
2. Выбрать **минимальный набор папок**, которые нужны:
   - например, только `docs/modules/atlas/` + `docs/backend/atlas_service/` + `docs/architecture/api_architecture.md`.
3. Не подтягивать «всё подряд» — снижать шум.  

Это помогает удерживать контекст и ускоряет работу.

---

## 4. Правила для Cursor

- **Сначала читай ADR**, потом — имплементируй.
- Не придумывай новые директории и слои без согласования (см. `docs/ai/decisions/adr_0003_no_extra_directories_for_mvp.md`).
- Используй существующие структуры модулей и сервисов — не ломай их.
- Указывай в PR/коммитах, на какие doc/ADR опираешься.

---

## Ops & Infrastructure

- Cloudflare, DNS, R2, Workers → см. `docs/ops/cloudflare_setup.md`, `docs/ops/environments.md`
- Neon DB → см. `docs/ops/environments.md` + `docs/backend/*`
- Clerk Auth → см. `docs/ops/environments.md`

**Важно:** инфраструктура уже развёрнута. Cursor не должен создавать новые Workers/базы/аппликации, а должен подключаться к существующим.
