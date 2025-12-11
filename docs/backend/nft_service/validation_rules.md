# NFT Service — Validation Rules

Валидация нужна для:

- корректной работы с RewardAction,
- предотвращения дубликатов,
- гарантии валидности метаданных и прогресса.

---

## 1. Общие правила

Для всех внутренних запросов:

- `user_id` — обязателен и должен быть валидным UUID;
- `type_code` — обязателен и должен ссылаться на существующий NFTType;
- `external_id`:
  - обязателен для вызовов со стороны Connect,
  - используется как идемпотентный ключ,
  - должен быть уникален по сочетанию (`external_id`, `source_service`).

При нарушении:

- возвращается `400 Bad Request` или `409 Conflict` (для конфликтов idempotency).

---

## 2. Валидация Reward-запроса (`/internal/reward`)

Проверяется:

1. `type_code` существует.
2. Если есть `increment`:
   - структура соответствует ожидаемому формату:
     - только известные счётчики (quest_completed_count, city_count и т.п.);
     - значения — целые числа `>= 0`.
3. Если есть `metadata_overrides`:
   - валидируется по `metadata_schema` для NFTType:
     - обязательные поля присутствуют,
     - типы (string, number, integer, boolean, object) корректны,
     - допустимые диапазоны (если указаны).
4. Если `external_id` уже использован:
   - возвращается ранее созданный/обновлённый NFTInstance.

---

## 3. Валидация уровня и прогресса

При каждой попытке изменения уровня:

- вычисляется текущий прогресс (`NFTProgress.counters`),
- сравнивается с `NFTLevelRule.conditions`,
- если условия для следующего уровня ещё не выполнены:
  - уровень не повышается,
  - но прогресс обновляется.

Типичные проверки:

- `quest_completed_count >= required_count`,
- `unique_cities_visited >= N`,
- `rf_reviews_posted >= M`,
- `partners_invited >= K`.

---

## 4. Валидация ончейн-минта (`submit_onchain`)

Перед постановкой NFTInstance в очередь:

- `status = active` — нельзя минтить revoked/burned;
- `onchain_status in (not_minted, failed)` — повторное минтование minted-токена запрещено (если не предусмотрено бизнес-логикой);
- `is_onchain_capable = true` или override флагом `force`.

---

## 5. Валидация callback от Blockchain Gateway

При получении callback:

- `nft_id` должен существовать;
- `status` ∈ {`minted`, `failed`};
- при `status = minted`:
  - `onchain_token_id` должен быть непустым,
  - `onchain_token_id` уникален в пределах системы;
- при `status = failed`:
  - `error` должен содержать краткое описание ошибки.

---

## 6. Валидация админских операций

Для изменения NFTType и NFTLevelRule:

- проверка уникальности `code` и корректности `level`;
- валидация `metadata_schema` (например, через JSON Schema validator);
- проверки консистентности:
  - уровни для типа должны иметь уникальные значения `level`,
  - `order` уровней должен быть согласован.

Ошибки:

- `400 Bad Request` — некорректные данные;
- `409 Conflict` — конфликт кодов/уровней;
- `403 Forbidden` — при отсутствии прав (обрабатывается на уровне Auth/BFF).
