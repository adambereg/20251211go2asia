# Media Service — Интеграции

## Atlas Service

- Media хранит ссылки:
  - `country_id`, `city_id`, `place_id`.  
- При создании/редактировании:
  - при необходимости валидирует существование локаций (через API Atlas),
  - может опускать проверку в MVP, если фронт гарантирует корректные ID (Atlas UI).

**Использование:**

- Atlas фронтенд запрашивает:
  - `GET /articles?city_id=...`,
  - `GET /articles/by-location?...`  
  для блоков “Статьи по этому городу/месту”.

---

## Pulse Service

- Статьи могут быть привязаны к событиям:
  - `event_id` (репортажи/анонсы).
- Страница события в Pulse:
  - вызывает Media: `GET /articles?event_id=...` для блока “Материалы по событию”.  

---

## Space / Content Service

### Импорт UGC (Space → Media)

- Лучшие посты Space (по данным Feed/Reactions) импортируются в Media как статьи (`source_type = ugc_space_post`).  

### Анонсы (Media → Space)

- При `media.article_published`:
  - Media генерирует событие; Space/Content создаёт пост-анонс;
  - в посте — ссылка на статью Blog Asia.:contentReference[oaicite:27]{index=27}  

---

## Guru Service

- Guru агрегирует новости рядом с пользователем:
  - `GET /api/media/v1/articles?city_id=...&type=news&status=published&limit=N`.
- На карте/в ленте Guru новости показываются как сущность `type = news` (EntityCard).:contentReference[oaicite:28]{index=28}  

---

## Connect / Token / Points / NFT

- Media публикует события:
  - `media.article_published`,
  - `media.article_popular`.
- Connect/Token Service слушает их:
  - для начисления Points авторам/партнёрам за популярный контент (по правилам токеномики).  

---

## RF Service (Партнёры)

- Партнёры могут размещать новости/статьи:
  - статьи имеют `source_type = partner`, `partner_id`.
- RF UI может:
  - показать партнёру список его материалов (через фильтр `partner_id`),
  - embed-ить блок “Материалы от партнёра” в его карточке.:contentReference[oaicite:30]{index=30}  

---

## Notification Service

(Фаза 2)

- События Media → Notification:
  - `media.article_published` — триггер дайджестов и рассылок,
  - `media.article_popular` — спец-уведомления, “топ-материал”.:contentReference[oaicite:31]{index=31}  

---

## Logging & Analytics

- Все ключевые действия логируются:
  - создание, изменение статуса, публикация, импорт из Space, награды.
- Analytics/Logging могут использовать статистику просмотров/лайков статей для:
  - формирования топов,
  - отчётов для редакции и партнёров.  
