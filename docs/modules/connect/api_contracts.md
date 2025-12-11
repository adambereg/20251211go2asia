# Connect Asia — API Contracts

Базовый префикс:
/api/connect

---

# 1. Points API

## GET /points/balance
Ответ:
{
  "points": 3500,
  "g2a": 125,
  "nft": 3
}

## GET /points/history
Параметры: module, type, period  
Ответ: [...транзакции...]

---

# 2. Levels API

### GET /levels
{
  "level": 12,
  "xp": 750,
  "xp_to_next": 1000
}

---

# 3. Achievements API

### GET /achievements  
### POST /achievements/claim  

---

# 4. Missions API

### GET /missions  
### POST /missions/start  
### POST /missions/complete_step  
### POST /missions/finish  

---

# 5. Referral API

### GET /referrals  
### POST /referrals/invite  
### GET /referrals/stats  

---

# 6. Analytics API

### GET /analytics/points  
### GET /analytics/sources  
### GET /analytics/referrals  

---

# Error format

{
  "error": {
    "code": "POINTS_NOT_ENOUGH",
    "message": "Недостаточно Points"
  }
}
