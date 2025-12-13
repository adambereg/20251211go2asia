# Исправление проблемы с pnpm-lock.yaml в CI

**Дата:** 2025-01-14  
**Проблема:** CI не может установить зависимости из-за несовместимости версии lockfile

---

## Проблема

В логах GitHub Actions видна ошибка:
```
WARN  Ignoring not compatible lockfile at /home/runner/work/20251211go2asia/20251211go2asia/pnpm-lock.yaml
ERR_PNPM_NO_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is absent
```

**Причина:** Lockfile версии 9.0 несовместим с версией pnpm, используемой в CI.

---

## Решения

### Вариант 1: Обновить версию pnpm в CI (Рекомендуется)

В workflow файле (например, `.github/workflows/staging.yml`) нужно использовать pnpm версии 9.x или выше:

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 9.0.0  # или последняя стабильная версия 9.x
```

### Вариант 2: Перегенерировать lockfile с совместимой версией

Если нужно использовать более старую версию pnpm в CI:

1. Установить нужную версию pnpm локально:
   ```bash
   npm install -g pnpm@8.15.0  # или другая версия
   ```

2. Удалить старый lockfile:
   ```bash
   rm pnpm-lock.yaml
   ```

3. Перегенерировать lockfile:
   ```bash
   pnpm install
   ```

4. Закоммитить новый lockfile:
   ```bash
   git add pnpm-lock.yaml
   git commit -m "fix: regenerate pnpm-lock.yaml with compatible version"
   ```

### Вариант 3: Использовать --no-frozen-lockfile (НЕ рекомендуется)

Можно временно использовать `--no-frozen-lockfile` в CI, но это не рекомендуется для production:

```yaml
- name: Install dependencies
  run: pnpm install --no-frozen-lockfile
```

**⚠️ Внимание:** Это может привести к неконсистентным установкам зависимостей.

---

## Рекомендуемое решение

**Использовать Вариант 1** — обновить версию pnpm в CI до 9.x, так как:
- Lockfile уже сгенерирован с версией 9.0
- Это обеспечит консистентность между локальной разработкой и CI
- `--frozen-lockfile` будет работать корректно

---

## Проверка

После применения решения:
1. Проверить, что workflow файл использует правильную версию pnpm
2. Запустить CI pipeline
3. Убедиться, что установка зависимостей проходит успешно

---

**Дата создания:** 2025-01-14


