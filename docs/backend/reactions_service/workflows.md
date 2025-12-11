# Reactions Service — Workflows (без комментариев, с репостами и threads)

## 1. Репост поста в Space (с мнением)

1. Пользователь видит пост в ленте Space.
2. Нажимает «Репост» и добавляет свой текст.
3. Фронтенд:
   - создаёт новый пост в Space (через Content/Space Service);
   - получает `space_post_id` нового поста;
   - обращается к Reactions Service:
     - `POST /reactions` с:
       - `target_type = "space_post"`,
       - `target_id = original_post_id`,
       - `type = "repost"`,
       - `payload = { "space_post_id": "new-post-id", "comment_text": "..." }`.
4. Reactions Service:
   - сохраняет реакцию,
   - обновляет агрегаты (reposts_count),
   - публикует событие `reaction.created` (type=repost).
5. Notification Service:
   - уведомляет автора оригинального поста о репосте.

---

## 2. Отзыв и рейтинг RF-партнёра

1. Пользователь посещает заведение и хочет оставить отзыв.
2. Фронтенд вызывает:
   - `POST /reactions` с `type = "rating"`:
     - `payload = { "value": 5 }`;
   - `POST /reactions` с `type = "short_review"`:
     - `payload = { "text": "Отличная кухня и сервис" }`.
3. Reactions Service:
   - сохраняет обе реакции,
   - обновляет агрегаты:
     - `rating_sum`, `rating_count`, `short_reviews_count`.
4. RF Service:
   - при отображении карточек партнёров запрашивает `/stats/batch`,
   - показывает средний рейтинг и число отзывов.

---

## 3. «Я был здесь» и «Хочу посетить» в Atlas

1. Путешественник открывает карточку места в Atlas.
2. Нажимает «Я был здесь»:
   - `POST /reactions` с:
     - `type = "was_here"`.
3. Нажимает «Хочу посетить»:
   - `POST /reactions` с:
     - `type = "want_to_visit"`.
4. Reactions Service:
   - фиксирует реакции (с учетом уникальности на пользователя),
   - обновляет `was_here_count` и `want_to_visit_count`.
5. На странице профиля пользователь может видеть:
   - список всех `was_here` / `want_to_visit` реакций через `GET /reactions/user`.

---

## 4. Завершение квеста и пост-отчёт

1. Пользователь проходит квест.
2. После завершения:
   - Quest Service или фронтенд вызывает:
     - `POST /reactions` с:
       - `target_type = "quest"`,
       - `target_id = quest_id`,
       - `type = "completed"`.
   - Пользователь может добавить короткий отзыв:
     - `type = "short_review"`.
3. Reactions Service:
   - фиксирует факт завершения и отзыв,
   - агрегирует `completed_count`, `short_reviews_count`,
   - публикует `reaction.created` (type=completed).
4. Connect / Points / NFT:
   - начисляют награды за прохождение квеста и за отзыв.
5. (Опционально) Space Service:
   - создаёт пост-отчёт на основе этих реакций.

---

## 5. Ветка общения «Арендатор ↔ Хозяин жилья»

1. Пользователь находит объявление жилья (`rielt_listing`) и хочет задать вопрос:
   - `POST /reactions` с:
     - `target_type = "rielt_listing"`,
     - `target_id = listing_id`,
     - `type = "question"`,
     - `payload = { "to_user_id": "host-id", "text": "Можно ли заехать раньше?" }`.
2. Reactions Service:
   - создаёт `Reaction` типа `question`,
   - создаёт `Thread` (`topic_type = "booking_inquiry"`, `initiator_user_id`, `target_user_id = host-id`),
   - связывает реакцию с `thread_id`,
   - публикует событие `reaction.created` и, при необходимости, специализированное `thread.reply.created`.
3. Notification Service:
   - уведомляет хоста о новом вопросе.
4. Хозяин отвечает:
   - `POST /reactions` с:
     - `type = "thread_reply"`,
     - `payload = { "thread_id": "...", "text": "Да, это возможно", "is_from_initiator": false }`.
5. Reactions Service:
   - добавляет реакцию,
   - обновляет `ThreadAggregate`,
   - публикует `thread.reply.created`.
6. Оба участника видят ветку через:
   - `GET /threads` и `GET /threads/{id}`.

---

## 6. Жаловня на отзыв

1. Пользователь видит оскорбительный short_review.
2. Нажимает «Пожаловаться».
3. Фронтенд:
   - `POST /reports`:
     - `reaction_id`, `reason_code`, `details`.
4. Reactions Service:
   - создаёт `ReactionReport` со статусом `new`,
   - публикует `reaction.flagged`.
5. Moderation Service:
   - анализирует репорт,
   - при необходимости инициирует скрытие реакции:
     - `DELETE /reactions/{id}` от имени модератора.

---

## 7. Лента активности пользователя

1. Пользователь открывает личный кабинет.
2. Фронтенд делает несколько запросов:
   - `GET /reactions/user?type=repost` — все репосты,
   - `GET /reactions/user?type=short_review` — все отзывы,
   - `GET /reactions/user?type=completed` — все завершённые квесты.
3. Используя эти данные, Space/личный кабинет строит:
   - «историю активности» пользователя в экосистеме.
