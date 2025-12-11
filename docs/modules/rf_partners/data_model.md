# Russian Friendly Asia — Data Model

## Partner (Заведение)
- id: UUID
- name: string
- description: text
- category: enum (cafe, restaurant, shop, coworking, service, hotel, other)
- tags: string[]
- city_id: FK → Atlas.city
- address: string
- geo: { lat, lng }
- phone: string
- email: string
- telegram: string
- website: string
- opening_hours: JSON
- cover_image: URL
- gallery: URL[]
- rating: float
- reviews_count: number
- rf_status: boolean (дружественный русским)
- pro_verified: boolean
- pro_verified_date: date
- created_by_pro_id: FK → PRO.id
- created_at, updated_at

---

## Voucher
- id: UUID
- partner_id: FK → Partner
- title: string
- description: text
- type: enum (discount, gift, bonus, cashback)
- value: number | string
- conditions: text
- price_points: number (если платно)
- price_g2a: number (если премиум)
- limit: number
- redeemed: number
- valid_from: date
- valid_to: date
- is_active: boolean
- created_at, updated_at

---

## Review
- id: UUID
- partner_id: FK → Partner
- user_id: FK → Space.user
- rating: int (1–5)
- text: string
- photos: URL[]
- created_at

---

## PRO Supervisor
- id
- user_id
- level: enum (junior, middle, senior)
- reward_balance_points
- reward_balance_g2a

---

## Business Onboarding Request
- id
- business_name
- contact_name
- contact_email
- contact_phone
- category
- city_id
- created_by_pro
- status: enum (new, approved, rejected)
- created_at

---

## PRO Rewards Transaction
- id
- pro_id
- type: enum (onboarding, verification, activation)
- amount_points
- amount_g2a
- partner_id
- created_at
