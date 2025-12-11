# Media Service — Модель данных

## 1. Article (Статья)

Базовая сущность блога.

### Основные поля

- `id` (uuid)
- `slug` (string, unique per language) — человекочитаемый URL.
- `title` (string)
- `subtitle` (string, nullable)
- `description_short` (string) — анонс/лид для карточки и мета.
- `content` (rich text / JSON / markdown) — основной текст статьи.
- `language` (string, напр. `ru`, `en`).

### Классификация и типы

- `type` (enum):
  - `news` — новости/апдейты,
  - `guide` — путеводители/инструкции,
  - `story` — истории/заметки,
  - `review` — обзоры мест/сервисов,
  - `opinion` — мнения/колонки,
  - `ugc` — отобранный пользовательский контент.
- `category_id` (fk → ArticleCategory)
- `tags` (array<string> или связь через ArticleTag)

### Статус и управление

- `status` (enum):
  - `draft`
  - `pending_review`
  - `scheduled`
  - `published`
  - `rejected`
  - `archived`
- `scheduled_at` (timestamp, nullable) — время отложенной публикации.
- `published_at` (timestamp, nullable)
- `archived_at` (timestamp, nullable)
- `version` (int) — текущая версия контента.

### Медиа и SEO

- `cover_image_url` (string, nullable)
- `gallery` (array<ArticleMedia> или отдельная таблица)
- SEO:
  - `seo_title` (string, nullable)
  - `seo_description` (string, nullable)
  - `og_image_url` (string, nullable)

### Авторство и источники

- `author_user_id` (uuid, fk → User Service, nullable) — автор в системе.
- `author_display_name` (string) — отображаемое имя (для внешних авторов).
- `source_type` (enum):
  - `editorial`
  - `pro`
  - `partner`
  - `ugc_space_post`
- `source_space_post_id` (uuid, nullable) — ID поста в Content Service, если статья создана из UGC.  
- `partner_id` (uuid, fk → RF Service, nullable) — если материал от партнёра.

### Привязки к экосистеме

- `country_id` (string, fk → Atlas.Country.id, nullable)
- `city_id` (string, fk → Atlas.City.id, nullable)
- `place_id` (string, fk → Atlas.Place.id, nullable)
- `event_id` (string, fk → Pulse.Event.id, nullable)
- `quest_id` (uuid, fk → Quest.Service, nullable)

Позволяет строить блоки вроде:
- "Статьи по Фукуоку",
- "Материалы по пляжу Long Beach",
- "Репортаж по событию X".  

### Мета и аналитика

- `read_time_minutes` (int, nullable) — оценка времени чтения.
- `views_count` (int, default 0)
- `likes_count` (int, default 0, с Reactions Service, но может кэшироваться)
- `shares_count` (int, default 0)

### Служебные поля

- `created_by` (uuid, fk → User)
- `updated_by` (uuid, fk → User)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 2. ArticleCategory

- `id` (string) — машинное имя, напр. `news`, `guides`, `stories`.
- `name` (string)
- `slug` (string)
- `description` (string, nullable)
- `order` (int) — позиция в списках.

---

## 3. ArticleTag

Если нужен отдельный справочник:

- `id` (uuid)
- `name` (string)
- `slug` (string)
- связь многие-ко-многим: `article_tags (article_id, tag_id)`.

На раннем MVP теги можно хранить как массив строк в Article.

---

## 4. ArticleMedia

- `id` (uuid)
- `article_id` (uuid)
- `type` (enum: `image`, `video`, `embed`)
- `url` (string)
- `caption` (string, nullable)
- `order` (int)

---

## 5. ArticleVersion (Фаза 2)

- `id` (uuid)
- `article_id` (uuid)
- `version` (int)
- снапшот полей `title`, `content`, `tags`, `seo_...`
- `created_at`, `created_by`

Используется для истории изменений и откатов.

---

## 6. ArticleStats (Фаза 2–3)

Либо отдельная таблица, либо колонки в Article:

- `article_id`
- `views_total`
- `views_last_30d`
- `likes_total`
- `shares_total`
- дополнительные метрики (дочитывания и т.п.).

Может обновляться асинхронно по событиям от Reactions/Logging/Analytics.  

---

## Индексы и оптимизация

Рекомендуемые индексы:

- `status`, `published_at DESC` — для лент.
- `category_id`, `published_at` — ленты по рубрикам.
- `city_id`, `place_id`, `event_id` — для привязок к Atlas/Pulse.
- `source_type`, `partner_id` — выборка материалов партнёров.
- полнотекстовый индекс по:

  - `title`, `subtitle`, `description_short`, `content` (при выносе в поисковый движок).  
