# Content Service — Validation Rules

## Посты

- `body`:
  - обязательное поле (кроме особых системных типов),
  - минимальная длина (например, 1–3 символа),
  - максимальная длина (например, 10–20k символов).
- `body_format`:
  - только допустимые значения: `markdown`, `plain`, `rich_json`.
- `type`:
  - `note`, `review`, `question`, `announcement`, `system`.
  - `system` — только для внутренних/админских сценариев.
- `module`:
  - один из: `space`, `atlas`, `pulse`, `rielt`, `rf`, `quest`, `system`.
- `context_entity_type`, `context_entity_id`:
  - если указаны — должны быть ненулевой длины и в адекватном формате (строка, макс. длина, без бинарного мусора).

## Видимость

- `visibility`:
  - `public`, `registered`, `friends`, `group`, `private`.
- При создании поста в рамках модуля:
  - модули `atlas`, `pulse`, `rielt`, `rf`, `quest` обычно ограничиваются `public` / `registered`, `private` — не используется (но это бизнес-логика, не строгая валидация).

## Комментарии

- `body`:
  - не пустой,
  - разумный лимит (2–5k символов).
- `parent_comment_id`:
  - если указан — должен ссылаться на существующий комментарий того же поста.

## Привязки к медиа

- `attachments[*].media_id`:
  - строка не пустая, max длина (uuid-like).
- `attachments[*].kind`:
  - `image`, `video`, `file`.

## Жалобы (reports)

- `reported_object_type`:
  - `post` или `comment`.
- `reason`:
  - `spam`, `scam`, `abuse`, `nsfw`, `other`.
- `comment`:
  - необязателен, max длина (например, 1000 символов).

## Авторство и права

- Создание/редактирование/удаление:
  - только автор или модератор (`admin`, `moderator`).
- Модерационные статусы (`hidden_by_moderator`):
  - доступны только ролям `admin`/`moderator`.

## Anti-spam базовый

(На уровне Content Service MVP можно):

- ограничить частоту:
  - `N` постов/минуту,
  - `M` комментариев/минуту.
- например, через общий rate limit по IP/пользователю.
