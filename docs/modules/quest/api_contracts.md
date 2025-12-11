# Quest Asia — API Contracts

Базовый префикс:
/api/quests

---

# 1. Quest Listing API

## GET /quests  
Поиск и фильтрация квестов.

Параметры:
- city_id
- user_id
- type
- difficulty
- nearby

Ответ:
{
  "items": [
    {
      "id": "uuid",
      "title": "Исследуй центр Пу-Куока",
      "type": "route",
      "difficulty": "easy",
      "reward_points": 200
    }
  ]
}

---

# 2. Quest Details

## GET /quests/{id}
{
  "quest": {
    "id": "uuid",
    "title": "...",
    "description": "...",
    "type": "route",
    "reward_points": 200
  },
  "steps": [
    {
      "id": "step1",
      "type": "visit_place",
      "place_id": "abc",
      "order_index": 1
    }
  ]
}

---

# 3. Quest Progress API

## POST /progress/start  
Начать квест.

{
  "quest_id": "uuid"
}

Ответ:
{
  "progress_id": "uuid",
  "status": "in_progress"
}

---

## POST /progress/step/submit  
Отправить выполнение шага.

{
  "progress_id": "uuid",
  "step_id": "uuid",
  "proof_url": "https://...",
  "quiz_answer": "..."
}

Ответ:
{
  "status": "completed",
  "step_id": "uuid"
}

---

## POST /progress/finish  
Завершить весь квест.

{
  "progress_id": "uuid"
}

Ответ:
{
  "status": "completed",
  "reward": {
    "points": 200,
    "nft_id": null
  }
}

---

# 4. Quest Creation API (PRO/Business)

## POST /quests  

{
  "title": "...",
  "type": "route",
  "city_id": "phu-quoc",
  "reward_points": 300,
  "steps": [
    {
      "order_index": 1,
      "type": "visit_place",
      "place_id": "pq_center"
    }
  ]
}

---

# 5. AI Quest API

## POST /ai/generate  
AI создаёт квест.

{
  "title": "Встреча с культурой Вьетнама",
  "city": "Hanoi",
  "theme": "food"
}

Ответ:
{
  "quest_id": "uuid",
  "steps_generated": 4
}

---

# 6. Errors  
{
  "error": {
    "code": "STEP_VALIDATION_FAILED",
    "message": "Incorrect answer."
  }
}
