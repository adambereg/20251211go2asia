Карта клиентских модулей и их связей с микросервисами

Документ описывает карту всех клиентских модулей Go2Asia (микрофронтендов), их назначение, входные и выходные данные, используемые микросервисы, типы событий, роли пользователей, а также связи между модулями экосистемы.
Этот файл является ключевым интеграционным документом для мультиагентной разработки.
________________________________________
1. Обзор модульной структуры Go2Asia
Go2Asia состоит из набора независимых микрофронтендов, которые подключаются к общей PWA Shell:
PWA Shell (Next.js)
  ├── Atlas
  ├── Pulse
  ├── Blog
  ├── Russian Friendly (RF)
  ├── Quest Asia
  ├── Rielt Asia
  ├── Space Asia
  ├── Guru Asia
  ├── Connect UI (профиль пользователя + экономика)
  └── Settings / Profile / Auth
Все модули используют общий UI Kit и общие дизайн-токены.
Каждый модуль связан с одним или несколькими микросервисами backend.
________________________________________
2. Карта модулей и соответствующих микросервисов
Ниже представлена подробная таблица:
2.1. Полная таблица соответствия FE-модулей и backend-сервисов
Клиентский модуль	Основные микросервисы	Дополнительные интеграции	Основные сущности
Atlas Asia	atlas_service	reactions_service, guru_service	страны, города, места
Pulse Asia	pulse_service	atlas_service, reactions_service, guru_service	события, расписания
Blog Asia	media_service	reactions_service, space/content	статьи, категории
Russian Friendly	rf_service	voucher_service, reactions_service, connect_service, atlas_service, guru_service	партнёры, ваучеры
Voucher Store	voucher_service	rf_service, connect_service, nft_service	ваучеры и премиум-ваучеры
Quest Asia	quest_service	reactions_service, atlas_service, pulse_service, connect_service, nft_service	квесты, чекпоинты, награды
Rielt Asia	rielt_service	reactions_service, guru_service, connect_service	объявления, контактные запросы
Guru Asia	guru_service	atlas_service, pulse_service, rf_service, rielt_service, quest_service, user_service	места рядом, события рядом, PRO рядом
Space Asia	content_service	reactions_service, notification_service, connect_service	посты, репосты, треды
Profile / Connect UI	user_service	points_service, nft_service, connect_service	профиль, баланс, NFT, достижения
________________________________________
3. Подробные карты модулей
Теперь — развернутая структура каждого модуля.

3.1. Atlas Asia
Назначение
Главный справочник ЮВА: страны, города, места, достопримечательности, тематические хабы.
Используемые микросервисы
•	atlas_service — источник всех данных.
•	reactions_service — лайки, рейтинги, отзывы.
•	guru_service — привязка мест к геолокации.
•	media_service — статьи, связанные с местами.
Примеры API:
GET /atlas/countries
GET /atlas/cities?country_id=
GET /atlas/places/{id}
GET /reactions/stats?target=place:{id}
Порождаемые события
•	реакция на место → reaction.created
•	просмотр → (в будущем ML-события)

3.2. Pulse Asia
Назначение
Календарь событий ЮВА: фестивали, активности, концерты, мастер-классы.
Используемые микросервисы
•	pulse_service — события.
•	atlas_service — геоданные.
•	reactions_service — короткие отзывы.
•	guru_service — события рядом.
Сущности:
•	event
•	schedule
•	category
Примеры API:
GET /pulse/events?city_id=
GET /pulse/events/{id}
GET /reactions/list?target=event:{id}

3.3. Blog Asia
Назначение
Редакционный и пользовательский медиа-контент.
Используемые сервисы
•	media_service
•	reactions_service
•	content_service (репосты статей)
Примеры API:
GET /blog/articles
GET /blog/articles/{id}
POST /reactions (repost)

3.4. Russian Friendly (RF)
Назначение
Каталог партнёрских сервисов, работающих с русскоязычной аудиторией.
Используемые сервисы
•	rf_service
•	voucher_service
•	connect_service
•	reactions_service
•	atlas_service
•	guru_service
Основные функции
•	Показ заведений партнёров
•	Покупка ваучеров
•	Использование премиум-ваучеров
•	PRO-наставничество бизнесов

3.5. Voucher Store
Назначение
Покупка ваучеров и премиум-ваучеров.
Используемые сервисы
•	voucher_service
•	connect_service
•	rf_service
•	nft_service
События:
•	voucher.purchased
•	premium_voucher.purchased

3.6. Quest Asia
Назначение
Квесты, миссии, челленджи, экскурсии — полностью управляются PRO.
Используемые сервисы
•	quest_service
•	atlas_service
•	pulse_service
•	rf_service (заведения в квестах)
•	voucher_service (премиум-ваучеры внутри квестов)
•	connect_service (награды Points/G2A)
•	nft_service (награды NFT)
События
•	quest.completed
•	quest.purchased
•	quest.checkpoint.reached

3.7. Rielt Asia
Назначение
Сервис поиска жилья.
Используемые сервисы
•	rielt_service
•	reactions_service (contact_request → thread)
•	guru_service
•	connect_service (рефералка за активации)
Сценарии
•	просмотр объявлений
•	запрос контакта (создание thread)
•	отзывы о жилье (short_review)

3.8. Guru Asia
Назначение
Главный центр рекомендаций:
места рядом → события рядом → люди рядом → жильё рядом → партнёры рядом → активности рядом.
Используемые сервисы
•	guru_service — агрегация.
•	atlas_service — места.
•	pulse_service — события.
•	rf_service — партнёры.
•	quest_service — квесты.
•	rielt_service — жильё.
•	user_service — PRO-спейсеры.

3.9. Space Asia
Назначение
Социальная сеть экосистемы.
Используемые сервисы
•	content_service
•	reactions_service
•	notification_service
•	connect_service
Главные сущности
•	пост
•	репост
•	short_review
•	thread_reply

3.10. Connect UI (Профиль пользователя)
Назначение
Профиль, балансы, NFT, статистика.
Используемые сервисы
•	user_service
•	points_service
•	nft_service
•	connect_service
________________________________________
4. Интеграционная диаграмма модулей
Atlas ─┬─► Guru ◄─┬─ Pulse
       │          │
       │          ├─ RF
       │          │
       │          ├─ Rielt
       │          │
       │          └─ Quest
       │
Space ◄────────── Reactions
        ▲
        └──────── Blog

RF ─────────────► Voucher ──────► Connect
Quest ───────────► Connect ─────► Points/NFT/Gateway
Rielt ───────────► Connect ─────► Points (за активации)

Guru — главный узел UX.
Connect — главный узел экономики.
Reactions — главный узел коммуникаций.
________________________________________
5. Карта типов данных по модулям
Модуль	Основные данные	Вспомогательные
Atlas	countries, cities, places	reactions
Pulse	events	atlas_places
Blog	articles	reactions
RF	partners, vouchers	guru_location
Quest	quests, checkpoints	vouchers, nft
Rielt	listings	reactions, threads
Guru	geo-feed	all nearby domains
Space	posts	reactions, threads
Connect UI	balances, nft	referrals
________________________________________
6. Карта событий по модулям
Модуль	Генерируемые события
Quest	quest.completed / quest.purchased
RF	voucher.purchased / premium_voucher.purchased
Rielt	rielt.inquiry.created
Space	repost.created
Reactions	reaction.created
Referral	referral.joined / referral.activated
User	user.vip_upgraded
________________________________________
7. Модули и их зависимости
Сильные зависимости
•	Guru зависит практически от всех доменов.
•	Connect зависит от всех событий.
•	RF зависит от Voucher Service.
Слабые зависимости
•	Blog ← Space (репосты).
•	Pulse → Atlas.
Симметричные связи
•	RF ↔ Space (отзывы).
•	Quest ↔ Atlas (локационные квесты).
________________________________________
8. Использование файла в разработке
Этот документ служит:
•	картой микрофронтендов,
•	картой API-связей,
•	картой данных,
•	основой для генерации BFF,
•	основой для тестов,
•	контекстом для Cursor и мультиагентной разработки,
•	документом для DevOps и архитекторов.

