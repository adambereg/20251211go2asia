# Voucher Service — API Contracts (with Premium Voucher Logic)

Версия: **v1**  
Базовый путь: **`/api/voucher/v1/`**

Voucher Service предоставляет API для:
- управления ваучерами,
- просмотра “моих ваучеров”,
- проверки ваучеров (validate),
- атомарного погашения (redeem),
- внутренних операций покупки **Премиум‑ваучеров** с использованием **G2A токенов** и **NFT**.

---

# 1. Управление ваучерами (Admin / Partner)

## 1.1. POST `/vouchers`
Создание обычного или премиум‑ваучера.

### Request
```json
{
  "code": "RF-PHUQUOC-10",
  "class": "standard",
  "type": "percent_discount",
  "scope_module": "rf",
  "scope_action": "rf_bill_payment",
  "title": "10% скидка в RF-партнёрах",
  "description": "Действует на оплату в RF-партнёрах",
  "value": 10,
  "currency": null,
  "min_order_amount": 500,
  "max_discount_amount": 2000,
  "valid_from": "2025-01-01T00:00:00Z",
  "valid_to": "2025-03-01T00:00:00Z",
  "max_uses_total": 1000,
  "max_uses_per_user": 3,
  "is_personal": false,
  "assigned_user_id": null,
  "allowed_partner_ids": ["rf_partner:phuket_coffee_1"],
  "allowed_object_ids": null,
  "price_in_points": null,
  "price_in_g2a": null,
  "requires_nft_level": null,
  "economics": {
    "pro_reward_g2a": 50,
    "business_reward_g2a": 200,
    "nft_reward_template": "premium_level_1"
  }
}
```

### Response 201
```json
{
  "id": "voucher-uuid",
  "code": "RF-PHUQUOC-10",
  "status": "active"
}
```

---

## 1.2. PATCH `/vouchers/{id}`
Обновление ваучера.

---

## 1.3. GET `/vouchers/{id}`
Получение полной информации о ваучере.

Пример ответа включает Premium‑поля:
```json
{
  "id": "voucher-uuid",
  "code": "PREMIUM-PQ-2025",
  "class": "premium",
  "type": "fixed_discount",
  "value": 50000,
  "price_in_g2a": 1200,
  "requires_nft_level": 2,
  "economics": {
    "pro_reward_g2a": 50,
    "business_reward_g2a": 200,
    "nft_reward_template": "premium_level_2"
  }
}
```

---

## 1.4. GET `/vouchers`
Поиск/листинг ваучеров (admin/partner). Фильтры — `status`, `class`, `scope_module`, `assigned_user_id`.

---

# 2. Пользовательские операции (User)

## 2.1. GET `/my/vouchers`
Список доступных пользователю ваучеров.

Пример:
```json
{
  "items": [
    {
      "id": "voucher-uuid",
      "class": "premium",
      "title": "Премиум‑скидка в RF‑партнёрах",
      "value": 15,
      "price_in_g2a": 1200,
      "requires_nft_level": 2,
      "valid_to": "2025-03-01"
    }
  ]
}
```

---

# 3. Проверка ваучера

## 3.1. POST `/validate`
Проверка условий перед оплатой.

### Request
```json
{
  "code": "PREMIUM-PQ-2025",
  "user_id": "user-uuid",
  "scope_module": "rf",
  "scope_action": "rf_bill_payment",
  "order_amount": 2500,
  "currency": "RUB",
  "partner_id": "rf_partner:001"
}
```

### Response (успех)
```json
{
  "valid": true,
  "voucher_id": "voucher-uuid",
  "discount_amount": 375,
  "final_amount": 2125
}
```

### Response (ошибка)
```json
{
  "valid": false,
  "reason": "nft_level_required"
}
```

---

# 4. Погашение (Redeem)

## 4.1. POST `/redeem`
Атомарная операция: проверка + фиксация погашения.

### Request
```json
{
  "code": "PREMIUM-PQ-2025",
  "user_id": "user-uuid",
  "scope_module": "rf",
  "scope_action": "rf_bill_payment",
  "target_entity_type": "rf_bill",
  "target_entity_id": "rf_bill:789",
  "order_amount": 2500,
  "currency": "RUB",
  "partner_id": "rf_partner:001"
}
```

### Response
```json
{
  "success": true,
  "voucher_id": "voucher-uuid",
  "redemption_id": "redeem-uuid",
  "discount_amount": 375,
  "final_amount": 2125
}
```

---

# 5. История погашений

## 5.1. GET `/my/redemptions`
История пользователя.

---

# 6. **Покупка Премиум‑ваучера** (Internal API)

## 6.1. POST `/internal/premium-purchase`
Вызывается **после успешного списания G2A и/или NFT‑транзакции**.

### Request
```json
{
  "voucher_id": "voucher-uuid",
  "user_id": "user-uuid",
  "payment_tx_id": "g2a-tx-123",
  "nft_tx_id": "nft-tx-456",
  "extra": {
    "business_partner_id": "rf_partner:001",
    "pro_user_id": "pro-uuid"
  }
}
```

### Response
```json
{
  "success": true,
  "user_voucher_id": "user-voucher-uuid"
}
```

---

# 7. Версионирование

- Текущая версия: **v1**
- Ломающие изменения перейдут в `/v2/`.

---

# 8. Статус документа

Этот файл является **единственным источником правды о публичном REST API Voucher Service**.
