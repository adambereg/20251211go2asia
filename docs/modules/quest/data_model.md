# Quest Asia — Data Model

## 1. Основные сущности

### Quest
- id
- creator_id (user / pro / business)
- type: story | route | daily | weekly | brand | pro
- title
- description
- city_id
- difficulty: easy / medium / hard
- reward_points
- reward_nft_id?
- reward_coupon_id?
- is_active
- created_at

### QuestStep
- id
- quest_id
- order_index
- type: visit_place | take_photo | answer_question | find_object | checkin | attend_event | buy_item | custom
- place_id?
- event_id?
- coordinates?
- prompt_text
- validation_type: photo | gps | quiz | manual | receipt
- validation_data (например: правильный ответ)

### QuestProgress
- id
- quest_id
- user_id
- status: not_started | in_progress | completed | failed
- started_at
- completed_at

### StepProgress
- id
- quest_progress_id
- step_id
- status: pending | completed | skipped
- proof_url?
- validated_at

### RewardsHistory
- id
- user_id
- quest_id
- points
- nft_id?
- coupon_id?
- timestamp

### User
- id
- xp
- level
- completed_quests
- available_coupons

---

## 2. Связи

- Quest 1 — N QuestStep  
- Quest 1 — N QuestProgress  
- QuestProgress 1 — N StepProgress  
- User 1 — N QuestProgress  
- Quest → Place/Event интеграция через Atlas/Pulse  

---

## 3. Примеры типов шагов

### visit_place
Дойти до точки и отметиться GPS.

### take_photo
Нужно загрузить фото.

### quiz
Ответ на вопрос.

### attend_event
Участие в событии Pulse.

### route
Последовательность геометок.

