# Referral Service — Workflows

## 1. Приглашение друга и welcome-бонус (1-й уровень и 2-й уровень)

1. Пользователь A получает реферальную ссылку (`GET /my/links` или `POST /my/links`).
2. Пользователь B переходит по ссылке и регистрируется:
   - User Service передаёт `referral_code` в `POST /internal/user-registered`;
   - создаётся `ReferralRelation (A → B)` — B становится рефералом A (уровень 1).
3. При регистрации C по ссылке B:
   - создаётся `ReferralRelation (B → C)` — C реферал B (уровень 1 для B);
   - при расчёте наград для A C считается субрефералом (уровень 2).
4. Referral Service создаёт `ReferralEvent (user_registered)` сначала для B, затем для C, и рассчитывает:
   - награды уровня 1 — A за B, B за C;
   - награды уровня 2 — A за C:
     - такие награды могут быть помечены как `locked`, если правила кампании требуют VIP/PRO роли.

Reward Worker:
- начисляет Points за открытую часть (`pending`);
- награды со статусом `locked` ждут апгрейда роли.

---

## 2. Апгрейд пользователя до VIP/PRO и разблокировка наград

1. Пользователь A становится VIP или PRO в User Service.
2. User Service вызывает `POST /internal/user-role-upgraded` в Referral Service.
3. Referral Service:
   - находит все `ReferralReward` со статусом `locked` для A;
   - проверяет `required_min_role` и `new_role`;
   - переводит подходящие награды в `pending`.
4. Reward Worker:
   - начисляет Points/G2A за ранее заблокированные награды.

С этого момента A также начинает получать награды за покупки рефералов/субрефералов (если это предусмотрено активными кампаниями).

---

## 3. PRO (или любой пользователь) привёл бизнес-партнёра RF

1. Пользователь A получает ссылку на онбординг партнёра (кампания `partner_onboarding`).
2. Бизнес-партнёр регистрируется и завершает онбординг в RF Service.
3. RF Service вызывает `POST /internal/partner-onboarded`:
   - передаёт `business_partner_id`, `onboarding_user_id`, `campaign_code`.
4. Referral Service:
   - создаёт `PartnerReferralRelation`,
   - фиксирует `ReferralEvent (rf_partner_onboarded)`,
   - рассчитывает `ReferralReward` для A (обычно в G2A или Points).
5. Reward Worker:
   - начисляет вознаграждение через Points/Token Service.

---

## 4. Рефералка по квестам

1. Пользователь A приглашает пользователя B (или A уже имеет реферрала B).
2. B покупает квест:
   - Quest Service определяет `referrer_user_id` (A) и его вышестоящего (при наличии) как 2-й уровень;
   - вызывает `POST /internal/event` с `event_type=quest_purchased`.
3. Referral Service:
   - создаёт `ReferralEvent`,
   - по `reward_rules` кампании формирует:
     - награды для A (уровень 1),
     - награды для вышестоящего пользователя (уровень 2, возможно `locked`).
4. Reward Worker начисляет доступные награды.

---

## 5. Реферальные награды за премиум-ваучеры и брони

1. Пользователь B (реферал A) покупает премиум-ваучер или делает бронь в Rielt:
   - Voucher/Rielt Service вызывает `POST /internal/event` с `event_type=voucher_premium_purchased` или `rielt_booking_made`.
2. Referral Service:
   - определяет структуру уровней:
     - первый уровень — пригласивший B;
     - второй уровень — пригласивший первого уровня (если есть).
   - рассчитывает награды по `reward_rules`.
3. Reward Worker:
   - начисляет Points/G2A в зависимости от статуса пользователя (и, при необходимости, блокирует часть до VIP/PRO).
