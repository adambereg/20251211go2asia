Модуль: Pulse Asia (календарь событий и мероприятий)

Назначение документа: описать, какие API использует фронтенд-модуль Pulse для чтения данных и работы с пользовательским состоянием (RSVP, избранное и т.п.), а также как он интегрируется с другими микросервисами.
Важно:
Pulse Asia не реализует собственный чат и не хранит комментарии.
Взаимодействия пользователей с событиями (RSVP, bookmark, short_review, репост) реализуются через Reactions Service.
________________________________________
1. Общие принципы
•	Все запросы идут через API Gateway (Cloudflare Workers → backend microservices).
•	Базовый префикс для событий:
GET /api/pulse/...
•	Ответы — в формате application/json.
•	Идентификаторы событий (event_id) соответствуют сущностям Event в pulse_service.
•	Фронтенд Pulse использует:
o	списки событий (для календаря и списка),
o	аггрегацию по датам (для точек в календаре),
o	детальные данные события,
o	пользовательское состояние (RSVP, bookmark) — через Reactions Service.
________________________________________
2. Список событий (List / Search)
2.1. GET /api/pulse/events
Получить список событий с учётом фильтров и пагинации.
Пример запроса
GET /api/pulse/events?date_mode=month&date_from=2025-11-01&date_to=2025-11-30&country_id=th&city_id=bangkok&categories=music,community&format=offline&page=1&page_size=20
Authorization: Bearer <access_token?>
Параметры запроса (query)
•	date_mode — "month" | "week" | "day" | "range"
•	date_from — ISO-дата начала (обязателен при range, опционален при других режимах).
•	date_to — ISO-дата конца.
•	country_id — atlas_country_id.
•	city_id — atlas_city_id.
•	place_id — atlas_place_id.
•	categories — список slug категорий через запятую.
•	tags — список тегов через запятую.
•	format — "offline" | "online" | "hybrid".
•	price_type — "all" | "free | paid".
•	only_verified — true/false.
•	only_editorial — true/false.
•	with_kids — true/false.
•	search_query — поисковая строка.
•	page — номер страницы (по умолчанию 1).
•	page_size — размер страницы (по умолчанию 20, максимум, например, 50).
Структура ответа
{
  "items": [
    {
      "id": "evt_123",
      "slug": "open-mic-saigon-november",
      "title": "Open Mic Night Saigon",
      "date_label": "Пт, 14 ноября, 20:00",
      "location_label": "Saigon Social Club, Ho Chi Minh City",
      "main_category": {
        "id": "music",
        "slug": "music",
        "name": "Музыка",
        "icon": "music",
        "color_token": "category-music",
        "is_primary": true
      },
      "tags": ["open-mic", "live-music"],
      "cover_image": {
        "url": "https://cdn.go2asia.app/pulse/events/evt_123/cover.jpg",
        "alt": "Open Mic Night Saigon"
      },
      "is_verified": true,
      "is_editorial": false,
      "is_featured": true,
      "price_label": "от 200 000 VND",
      "rsvp_badge": "Вы идёте",
      "user_state": {
        "rsvp_status": "going",
        "is_bookmarked": true
      }
    }
  ],
  "page": 1,
  "page_size": 20,
  "total_items": 134,
  "total_pages": 7
}
Модель элемента списка соответствует проекции EventListItem из data_model.md.
________________________________________
3. Календарная агрегация
3.1. GET /api/pulse/calendar
Получить агрегированную информацию о событиях по дням для построения
календаря месяца/недели.
Пример запроса
GET /api/pulse/calendar?date_from=2025-11-01&date_to=2025-11-30&country_id=th&city_id=bangkok&categories=music,community
Authorization: Bearer <access_token?>
Параметры
Те же, что для /events, но обычно:
•	date_mode — опционален (по умолчанию month).
•	date_from / date_to — диапазон календаря.
Структура ответа
{
  "days": [
    {
      "date": "2025-11-01",
      "total_events": 5,
      "by_category": [
        { "category_slug": "music", "count": 2 },
        { "category_slug": "community", "count": 1 },
        { "category_slug": "food", "count": 2 }
      ],
      "highlight_events": [
        {
          "id": "evt_100",
          "title": "Saigon Jazz Festival",
          "start_time": "20:00",
          "category_slug": "music",
          "is_featured": true
        }
      ]
    }
  ]
}
highlight_events — лёгкие объекты вида CalendarCellEvent (см. data_model.md).
________________________________________
4. Детальная страница события
4.1. GET /api/pulse/events/{id}
Получить полную информацию о событии.
Пример
GET /api/pulse/events/evt_123
Authorization: Bearer <access_token?>
Ответ
{
  "id": "evt_123",
  "slug": "open-mic-saigon-november",
  "title": "Open Mic Night Saigon",
  "subtitle": "Музыкальный вечер для музыкантов и слушателей",
  "description": "Развёрнутое описание...",
  "status": "published",
  "start_at": "2025-11-14T20:00:00+07:00",
  "end_at": "2025-11-14T23:00:00+07:00",
  "timezone": "Asia/Ho_Chi_Minh",
  "format": "offline",
  "location": {
    "type": "place",
    "atlas_country_id": "vn",
    "atlas_city_id": "hcm",
    "atlas_place_id": "place_456",
    "label": "Saigon Social Club, District 1",
    "address_line": "123 Nguyen Hue, District 1",
    "lat": 10.123456,
    "lng": 106.987654,
    "map_provider": "osm"
  },
  "categories": [
    {
      "id": "music",
      "slug": "music",
      "name": "Музыка",
      "icon": "music",
      "color_token": "category-music",
      "is_primary": true
    }
  ],
  "tags": ["open-mic", "live-music"],
  "is_editorial": false,
  "is_community": true,
  "is_featured": true,
  "is_verified": true,
  "organizer": {
    "id": "user_999",
    "type": "user",
    "display_name": "Alex / Saigon Music",
    "avatar_url": "https://cdn.go2asia.app/avatars/user_999.jpg",
    "space_profile_id": "space_999",
    "website_url": "https://saigon-music.example.com",
    "social_links": [
      {
        "type": "instagram",
        "url": "https://instagram.com/saigonmusic"
      }
    ],
    "contact_reaction_target": {
      "target_type": "event",
      "target_id": "evt_123"
    }
  },
  "tickets": [
    {
      "id": "tier_free",
      "name": "Вход свободный",
      "description": "Заказ напитков в баре приветствуется",
      "is_free": true,
      "is_donation": false,
      "sales_status": "available"
    }
  ],
  "min_price": 0,
  "max_price": 0,
  "currency": "VND",
  "atlas_country_id": "vn",
  "atlas_city_id": "hcm",
  "atlas_place_id": "place_456",
  "rf_partner_id": "rf_111",
  "quest_id": null,
  "voucher_ids": ["vch_001", "vch_002"],
  "cover_image": {
    "url": "https://cdn.go2asia.app/pulse/events/evt_123/cover.jpg",
    "alt": "Open Mic Night Saigon"
  },
  "gallery": [],
  "stats": {
    "views": 542,
    "reactions": {
      "likes": 48,
      "bookmarks": 32,
      "reposts": 7,
      "short_reviews": 4
    },
    "rsvp_count": 15
  },
  "language": "ru",
  "created_at": "2025-10-20T11:00:00Z",
  "updated_at": "2025-10-25T09:30:00Z",
  "user_state": {
    "event_id": "evt_123",
    "user_id": "u_abc",
    "rsvp_status": "interested",
    "is_bookmarked": true,
    "notifications_enabled": true,
    "last_seen_at": "2025-10-30T18:20:00Z"
  }
}
________________________________________
5. Похожие события / рекомендации
5.1. GET /api/pulse/events/{id}/related
Список похожих событий для отображения в нижнем блоке карточки.
Пример запроса
GET /api/pulse/events/evt_123/related?limit=6
Authorization: Bearer <access_token?>
Ответ
{
  "items": [
    {
      "id": "evt_124",
      "slug": "live-jazz-hcm",
      "title": "Live Jazz Night Ho Chi Minh",
      "date_label": "Сб, 15 ноября, 21:00",
      "location_label": "Jazz Bar HCM, District 3",
      "main_category": {
        "id": "music",
        "slug": "music",
        "name": "Музыка"
      },
      "cover_image": {
        "url": "https://cdn.go2asia.app/pulse/events/evt_124/cover.jpg",
        "alt": "Live Jazz Night HCM"
      },
      "is_verified": true,
      "is_featured": false,
      "price_label": "от 250 000 VND"
    }
  ]
}
________________________________________
6. Категории, словари и метаданные
6.1. GET /api/pulse/meta
Вернуть справочную информацию для UI:
GET /api/pulse/meta
Ответ
{
  "categories": [
    {
      "id": "music",
      "slug": "music",
      "name": "Музыка",
      "icon": "music",
      "color_token": "category-music",
      "is_primary": true
    },
    {
      "id": "food",
      "slug": "food",
      "name": "Еда",
      "icon": "food",
      "color_token": "category-food",
      "is_primary": true
    }
  ],
  "formats": [
    { "id": "offline", "label": "Офлайн" },
    { "id": "online",  "label": "Онлайн" },
    { "id": "hybrid",  "label": "Гибрид" }
  ],
  "price_types": [
    { "id": "all",  "label": "Все" },
    { "id": "free", "label": "Бесплатно" },
    { "id": "paid", "label": "Платно" }
  ]
}
________________________________________
7. Пользовательское состояние (через Reactions Service)
Pulse сам не создаёт состояния RSVP / избранного — он использует Reactions Service.
7.1. RSVP (интерес / пойду)
Создать/обновить RSVP
POST /api/reactions
Authorization: Bearer <access_token?>
Content-Type: application/json
{
  "type": "rsvp",
  "target_type": "event",
  "target_id": "evt_123",
  "payload": {
    "status": "going"        // "none" | "interested" | "going" | "maybe"
  }
}
Удалить RSVP (сбросить)
DELETE /api/reactions/{reaction_id}
Authorization: Bearer <access_token?>
В UI: чаще всего будет обновление существующей реакции type = "rsvp" для конкретного события.
________________________________________
7.2. Сохранить событие в избранное
POST /api/reactions
Authorization: Bearer <access_token?>
Content-Type: application/json
{
  "type": "bookmark",
  "target_type": "event",
  "target_id": "evt_123"
}
Удаление избранного — DELETE конкретной реакции.
________________________________________
7.3. Короткий отзыв / отчёт (short_review / repost)
Отчёты сообщества и короткие отзывы для блока «Отчёты» на странице события:
POST /api/reactions
Authorization: Bearer <access_token?>
Content-Type: application/json
{
  "type": "short_review",
  "target_type": "event",
  "target_id": "evt_123",
  "payload": {
    "rating": 5,
    "text": "Очень ламповый вечер, рекомендую!"
  }
}
Репост события в Space:
{
  "type": "repost",
  "target_type": "event",
  "target_id": "evt_123",
  "payload": {
    "with_comment": true,
    "comment_text": "Идём сегодня сюда!",
    "visibility": "friends"   // или "public"
  }
}
________________________________________
8. Уведомления (Notification Service)
Pulse напрямую уведомления не шлёт — он генерирует события для Notification Service.
Примеры событий:
•	event.rsvp.created
•	event.rsvp.reminder (генерируется кроном/сервисом)
•	event.starting_soon
Архитектурно это через Event Bus, а не публичное API.
Для фронтенда важно: пользователь может настраивать notifications_enabled
в UserEventState (часть профиля / реакций).
________________________________________
9. Ошибки и коды ответов
9.1. Общие
•	200 OK — успешный запрос.
•	400 Bad Request — некорректные параметры (например, date_from > date_to).
•	401 Unauthorized — требуется авторизация.
•	403 Forbidden — пользователь не имеет прав (например, видеть скрытое событие).
•	404 Not Found — событие не найдено.
•	429 Too Many Requests — ограничение по частоте запросов.
•	500 Internal Server Error — внутренняя ошибка.
9.2. Пример ошибки
{
  "error": {
    "code": "INVALID_DATE_RANGE",
    "message": "date_from must be before date_to"
  }
}
________________________________________
10. Резюме для фронтенда
Фронтенд модуля Pulse Asia для работы с данными использует:
1.	Списки событий
GET /api/pulse/events → EventListItem[]
2.	Календарную агрегацию
GET /api/pulse/calendar → агрегированные события по дням
3.	Детальную карточку события
GET /api/pulse/events/{id} → Event + UserEventState
4.	Похожие события
GET /api/pulse/events/{id}/related
5.	Справочники / метаданные
GET /api/pulse/meta
6.	Реакции (RSVP, избранное, отзывы, репосты)
через POST /api/reactions и DELETE /api/reactions/{id}
Этот файл определяет контракт между фронтендом Pulse Asia и backend-частью экосистемы Go2Asia и должен использоваться Cursor как источник истины при генерации кода для модуля Pulse.

