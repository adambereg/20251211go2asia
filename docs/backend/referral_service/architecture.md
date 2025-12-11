# Referral Service — Architecture

## Компоненты

1. **API Layer**
   - REST API `/api/referral/v1/...`.
   - Три сегмента:
     - user (пользовательские эндпоинты),
     - internal (для других сервисов),
     - admin (для админов).

2. **Application Layer**
   - Use-cases:
     - `GenerateReferralLink`,
     - `RegisterUserReferral`,
     - `RegisterPartnerOnboardingReferral`,
     - `RegisterReferralEvent`,
     - `ComputeRewardsForEvent`,
     - `UnlockRewardsOnRoleUpgrade`,
     - `QueryUserStats`,
     - `ManageCampaign`.
   - Здесь сосредоточены бизнес-правила двухуровневой рефералки.

3. **Domain Layer**
   - Модели:
     - `ReferralCampaign`,
     - `ReferralLink`,
     - `ReferralRelation`,
     - `PartnerReferralRelation`,
     - `ReferralEvent`,
     - `ReferralReward`,
     - `ReferralStats`.

4. **Persistence Layer**
   - БД: PostgreSQL (таблицы для всех сущностей).
   - Возможность расширения для аналитических витрин (через отдельный DWH).

5. **Reward Worker (async компонент)**
   - Периодически читает `ReferralReward` со статусом `pending`,
   - вызывает Points Service / Token Gateway,
   - обновляет статус (`completed` / `failed`).

---

## Границы ответственности

Referral Service:

- определяет, кому, за что и сколько начислять поинтов/токенов в рамках реферальных кампаний;
- хранит реферальные связи и события;
- инициирует начисление наград;
- поддерживает двухуровневую логику (реферал/субреферал), блокировку и разблокировку наград.

Не делает:

- не хранит балансы счётов пользователей;
- не выполняет платежные операции напрямую (это ответственность Points/Token/Blockchain Gateway);
- не решает, какие события считать реферальными — это договорённость с вызывающими сервисами (которые дергают `/internal/event`).
