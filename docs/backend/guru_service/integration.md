# Guru Service — Интеграции

## Atlas Service

- Основная интеграция для мест:
  - `GET /api/atlas/v1/places/nearby?lat=...&lng=...&radius=...`.
- Atlas отдаёт свои сущности, Guru маппит их в `GuruEntity` типа `place`.
- Дополнительно:
  - можно использовать `/places/{id}` для получения деталей при deep link.

## Pulse Service

- Интеграция для событий:
  - `GET /api/pulse/v1/events/nearby?lat=...&lng=...&radius=...&time_window=...`.
- Guru маппит события в `GuruEntity` типа `event`:
  - добавляет `payload.starts_at`, `payload.min_price` и т.д.

## Rielt Service (Фаза 2)

- Интеграция для жилья:
  - `GET /api/rielt/v1/offers/nearby`.
- Маппинг в `GuruEntity` типа `housing`:
  - `payload` может содержать цену за ночь, тип жилья, минимальный срок и т.п.

## RF Service (Фаза 2)

- Интеграция для партнёрских заведений:
  - либо через Atlas (места с RF-флагом),
  - либо через отдельный эндпоинт RF: `/venues/nearby`.
- Guru:
  - помечает объекты как `is_rf = true`,
  - может поднимать RF-объекты чуть выше в выдаче.

## Quest Service (Фаза 3)

- Интеграция для квестов:
  - `GET /api/quest/v1/quests/nearby`.
- Маппинг в `GuruEntity` типа `quest`:
  - `payload` → название квеста, сложность, награды.

## User Service

- Для preferences:
  - через JWT узнаём `user_id`,
  - прав доступа к preferences достаточно минимум (user ↔ свои настройки).

## Space / Content Service

- (Фаза 2–3) косвенная интеграция:
  - сохранённые места/объекты могут храниться в Space,
  - Guru может либо дергать Space, либо иметь свой минимальный слой “saved”.

## Connect / Token Service

- На первых этапах — не обязательная интеграция.
- В будущем:
  - Guru может отправлять события “пользователь открыл nearby” / “перешёл в объект” / “достиг точки квеста”,
  - для геймификации и начисления Points.

## Notification Service

- Потенциально:
  - уведомления “рядом появилось новое интересное событие/место/квест”,
  - но это уже функциональность Pulse/Quest/Atlas + Notification; Guru может только рассчитывать, что считать “рядом”.

## Event Bus

- Guru в минимальном варианте больше **слушатель**, чем генератор.
- Может подписываться на события:
  - `atlas.place_updated`, `pulse.event_published` и т.п.,
  - чтобы инвалидировать кеши по соответствующим гео-областям.
  
## User/Space

- эндпоинт/шину событий вида user.pro_visibility_changed, user.location_updated.
- синхронизация таблицы GuruProPresence.
