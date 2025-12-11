# RF Service — Data Model

## 1. BusinessPartner

Represents a Russian Friendly business partner (brand-level entity), without transport or API details.

### Fields

- `id` (uuid, pk)
- `slug` (string, unique) — human-readable identifier used in URLs.
- `name` (string)
- `short_name` (string, nullable)
- `description` (text, nullable)
- `category` (enum/string) — business type (e.g. `cafe`, `restaurant`, `bar`, `hotel`, `coworking`, `tour_agency`, `spa`, `fitness`, `services`, `other`).
- `tags` (string[], nullable) — free-form or from PartnerTag dictionary.
- `country_id` (string) — references Atlas / geo dictionary.
- `city_id` (string) — references Atlas / geo dictionary.
- `primary_language` (string, nullable) — ISO language code.
- `supports_russian` (bool) — Russian-speaking staff available.
- `website` (string, nullable)
- `phone` (string, nullable)
- `telegram` (string, nullable)
- `whatsapp` (string, nullable)
- `instagram` (string, nullable)
- `other_contacts` (jsonb, nullable) — additional channels.

Status and level:

- `rf_level` (enum: `basic`, `silver`, `gold`, `platinum`)
- `is_verified` (bool)
- `status` (enum: `draft`, `pending_review`, `active`, `suspended`, `archived`)

Ownership and onboarding:

- `onboarding_pro_user_id` (uuid, nullable) — PRO-spacer who brought the partner.
- `curator_pro_user_id` (uuid, nullable) — current PRO-curator.
- `created_by_user_id` (uuid)

Loyalty defaults:

- `default_discount_percent` (numeric, nullable) — default discount for RF users.
- `default_cashback_points_percent` (numeric, nullable) — default cashback in Points.
- `default_voucher_ids` (string[], nullable) — IDs of standard vouchers (Voucher Service).
- `default_premium_voucher_ids` (string[], nullable) — IDs of premium vouchers (Voucher Service).

Economics configuration (no token balances):

- `economics` (jsonb, nullable), for example:
  ```json
  {
    "premium_business_reward_g2a": 200,
    "premium_pro_reward_g2a": 50,
    "max_premium_voucher_per_month": 100
  }
  ```

Timestamps:

- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 2. PartnerLocation

Represents a specific physical location / branch of a business partner.

### Fields

- `id` (uuid, pk)
- `business_partner_id` (uuid, fk → BusinessPartner)
- `name` (string) — optional name of this location (e.g. “Main hall”, “Branch Karon”).
- `address` (string)
- `latitude` (numeric, nullable)
- `longitude` (numeric, nullable)
- `atlas_place_id` (string, nullable) — link to Place in Atlas Asia.
- `working_hours` (jsonb, nullable) — structured opening hours.
- `is_main` (bool, default: false)
- `status` (enum: `active`, `temporarily_closed`, `archived`)
- `show_in_rf_catalog` (bool, default: true)
- `show_on_map` (bool, default: true)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 3. PartnerUserRole

Links a user to a business partner (partner dashboard access).

### Fields

- `id` (uuid, pk)
- `business_partner_id` (uuid, fk)
- `user_id` (uuid, fk → User Service)
- `role` (enum: `owner`, `manager`, `staff`)
- `status` (enum: `active`, `invited`, `revoked`)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 4. PartnerStats

Aggregated statistics for a business partner. This is a derived/analytical model, not a core domain entity.

### Fields

- `business_partner_id` (uuid, pk)
- `total_visits` (int)
- `total_vouchers_redeemed` (int)
- `total_premium_vouchers_sold` (int)
- `average_rating` (numeric)
- `last_visit_at` (timestamp, nullable)
- `updated_at` (timestamp)

---

## 5. PartnerTag (optional)

Reference table for standardized tags (optional, may be part of shared dictionaries service).

### Fields

- `id` (uuid, pk)
- `code` (string, unique)
- `label` (jsonb) — localized labels.
- `category` (string, nullable) — tag category (e.g. `cuisine`, `format`, `atmosphere`).
