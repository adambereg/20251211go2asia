# Blog Asia — Data Model

## Article

Основная сущность модуля — статья.

Поля:

- `id` — UUID.
- `slug` — человекочитаемый идентификатор для URL (`/blog/10-luchshih-koworkingov-bangkoka`).
- `title` — заголовок.
- `subtitle` — подзаголовок / лид.
- `cover_image_url` — обложка статьи (hero‑изображение).
- `status` — состояние: `draft | in_review | published | archived`.
- `visibility` — видимость: `public | unlisted | internal`.
- `content_rich` — сериализованный контент (например, JSON из редактора или markdown).
- `reading_time_minutes` — оценочное время чтения.
- `language` — язык материала (например, `ru`, позже `en`).
- `created_at`, `updated_at`, `published_at`.

Связи:

- `author_id` → User (PRO, редактор или партнёр).
- `editor_id` → User (кто утвердил публикацию).
- `origin_post_id` → SpacePost (если статья выросла из поста/дискуссии в Space).
- `country_ids[]` → связанный список стран Atlas.
- `city_ids[]` → список городов Atlas.
- `place_ids[]` → список мест Atlas.
- `event_ids[]` → список событий из Pulse.
- `quest_ids[]` → список квестов из Quest Asia.
- `partner_ids[]` → список бизнес‑партнёров Russian Friendly / Rielt.Market.

Метаданные:

- `is_editorial` — флаг редакционного материала (vs. UGC‑основанного).
- `is_partner` — флаг партнёрского/спонсорского материала.
- `priority` — приоритет для размещения в блоках на главной.
- `featured_until` — дата, до которой материал считается «выделенным».

## Category

Рубрика уровня раздела:

- `id`
- `slug`
- `name`
- `description`
- `position` — порядок на главной.
- `icon` — опциональная пиктограмма.
- `is_primary` — основная рубрика (для навигации).

Примеры:
- Путешествия
- Работа и доход
- Жить здесь
- Бизнес и партнёры
- События и фестивали
- Практика и документы

## Tag

Тонкие тематические метки:

- `id`
- `slug`
- `name`
- `category` — опциональная категоризация тегов (например, `visa_type`, `audience`, `budget_level`).
- `description`.

Примеры тегов:
- `digital-nomad`, `семья`, `переезд`, `longstay`, `до-1000$`, `коворкинги`, `кофейни`, `дети`, `healthcare`.

## ArticleCategory (связь многие-ко-многим)

- `article_id`
- `category_id`
- `is_primary` — основная рубрика статьи.

## ArticleTag (связь многие-ко-многим)

- `article_id`
- `tag_id`.

## Series / Hub

Тематические серии и хабы:

- `id`
- `slug`
- `title`
- `description`
- `cover_image_url`
- `type` — `series | hub | special_project`.
- `is_active`.
- `created_at`, `updated_at`.

Связь:

- `articles[]` через таблицу `SeriesArticle`:
  - `series_id`
  - `article_id`
  - `order_index`.

## ArticleStats

Агрегированные показатели статьи:

- `article_id`
- `views_total`
- `views_30d`
- `reactions_total` — все типы реакций.
- `shares_total` — количество репостов.
- `bookmarks_total`.
- `avg_read_depth` — средняя глубина дочитывания (если есть отслеживание).
- `last_viewed_at`.

Обновляется асинхронно на основе логов/событий.

## ArticleSEO

SEO‑блок (может быть отдельной таблицей/JSON):

- `article_id`
- `meta_title`
- `meta_description`
- `og_title`
- `og_description`
- `og_image_url`
- `canonical_url`
- `noindex` — флаг скрытия от поисковиков.

## EditorialQueue

Очередь материалов, ожидающих редакторской обработки:

- `id`
- `origin_type` — `space_post | draft | external_request`.
- `origin_id` — идентификатор исходного материала.
- `proposed_by_user_id` — кто предложил статью (PRO/редактор/партнёр).
- `assigned_editor_id` — ответственный редактор.
- `status` — `new | in_review | needs_changes | approved | rejected | converted_to_article`.
- `notes` — служебные комментарии редактора.
- `created_at`, `updated_at`.

## PartnerPlacement

Дополнительные данные по партнёрским материалам:

- `article_id`
- `partner_id`
- `placement_type` — `native`, `case`, `selection`, `interview`.
- `contract_id` — ссылка на договор/кампанию (внешний ID).
- `start_date`, `end_date`.
- `is_paid` — платное размещение или бартер/органическое.
- `utm_source_default` — базовый UTM‑хвост для ссылок.

## Связь с другими модулями

Blog Asia сам не хранит сущности стран/городов/мест/событий — он ссылается на них по внешним ID:

- `country_ids[]` → `atlas.countries`.
- `city_ids[]` → `atlas.cities`.
- `place_ids[]` → `atlas.places`.
- `event_ids[]` → `pulse.events`.
- `quest_ids[]` → `quest.quests`.
- `partner_ids[]` → `rf_service.partners` / `rielt_service.agents`.

Это важно для унифицированного поиска и контентных рекомендаций в PWA‑shell.