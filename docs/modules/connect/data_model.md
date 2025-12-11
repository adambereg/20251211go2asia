# Connect Asia — Data Model

## Основные сущности

---

## 1. PointsTransaction  
Запись о начислении или списании Points.

| Поле | Тип | Описание |
|------|------|----------|
| id | uuid | уникальная запись |
| user_id | uuid | кому начислены |
| amount | int | + / - |
| module | enum(space, atlas, blog, quest, rf, guru, system) |
| action | string | что произошло |
| created_at | timestamp | время |

---

## 2. LevelProgress  
Отслеживает прогресс уровня пользователя.

| Поле | Тип |
|------|-----|
| user_id | uuid |
| level | int |
| current_xp | int |
| xp_to_next | int |

---

## 3. Achievement  
Справочник достижений.

| Поле | Тип | Описание |
|------|------|----------|
| id | uuid |
| code | string | уникальный ключ |
| title | string |
| description | text |
| reward_points | int |
| reward_nft | string? |

---

## 4. UserAchievement  
Полученные пользователем достижения.

| Поле | Тип |
|------|-----|
| id | uuid |
| user_id | uuid |
| achievement_id | uuid |
| progress | int |
| completed | boolean |

---

## 5. NFTBadge  
NFT-награды.

| Поле | Тип |
|------|-----|
| id | uuid |
| user_id | uuid |
| metadata_url | string |
| power_bonus | int? |

---

## 6. Mission  
Миссия из набора заданий.

| Поле | Тип |
|------|-----|
| id | uuid |
| title | string |
| module | enum |
| reward | jsonb |
| conditions | jsonb |

---

## 7. MissionProgress  
Статус выполнения пользователем.

---

## 8. Referral  
Реферальные связи.

| Поле | Тип |
|------|-----|
| id | uuid |
| referrer_id | uuid |
| referred_user_id | uuid? |
| referred_partner_id | uuid? |
| reward_points | int |
| reward_g2a | int |

---

## 9. AnalyticsSnapshot  
Дневная/недельная статистика пользователя.

---

# Общая ER-диаграмма (краткая)
User ---< PointsTransaction
User ---< LevelProgress
User ---< UserAchievement >--- Achievement
User ---< Referral
User ---< NFTBadge
User ---< MissionProgress >--- Mission