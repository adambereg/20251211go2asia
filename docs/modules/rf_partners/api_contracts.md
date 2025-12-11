# Russian Friendly Asia — API Contracts

Base URL: `/api/rf`

---

## PARTNERS

### GET /partners
Список партнёров с фильтрами  
Query:
- city
- category
- rf_only
- pro_verified
- q (search)

Response:
{
  partners: Partner[]
}

---

### GET /partners/:id
Детали заведения.

Response:
{
  partner: Partner,
  vouchers: Voucher[],
  reviews: Review[]
}

---

### POST /partners (PRO only)
Создание партнёра.

Body: PartnerCreatePayload

---

### PATCH /partners/:id (Partner owner or PRO)
Обновление профиля.

---

## VOUCHERS

### GET /vouchers
Список всех ваучеров.

### GET /vouchers/:id
Детали ваучера.

### POST /vouchers (Partner)
Создание.

### PATCH /vouchers/:id
Обновление.

### POST /vouchers/:id/redeem
Погашение ваучера (ввод кода).

Body:
- code: string

---

## REVIEWS

### POST /partners/:id/reviews
Создать отзыв.

### GET /partners/:id/reviews
Список отзывов.

---

## PRO DASHBOARD

### GET /pro/dashboard
Карточка эффективности PRO.

Returns:
{
  partners_count,
  month_checks,
  month_onboardings,
  reward_points,
  reward_g2a
}

---

### GET /pro/partners
Список партнёров, закреплённых за PRO.

---

### GET /pro/onboarding
Заявки на онбординг.

---

### POST /pro/onboarding/:id/approve
---

### POST /pro/onboarding/:id/reject
---

### POST /pro/verify/:id
Проверка бизнеса.

---

## REWARDS

### GET /pro/rewards
История транзакций.

